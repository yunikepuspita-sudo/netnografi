"""
NETRA AI — Backend FastAPI (versi gratis / ringan)

Menyediakan analisis netnografi tanpa model ML berat:
- Unggah CSV/Excel berisi data media sosial -> ringkasan, sentimen, emosi,
  kata kunci, topik, distribusi platform.
- Analisis teks langsung (JSON).

Jalankan lokal:
    pip install -r requirements.txt
    uvicorn main:app --reload

Dokumentasi interaktif otomatis tersedia di /docs (Swagger UI).
"""

from __future__ import annotations

import io
from typing import List, Optional

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import analysis

app = FastAPI(
    title="NETRA AI API",
    description="Backend netnografi ringan: sentimen, emosi, topik, kata kunci.",
    version="1.0.0",
)

# CORS: izinkan dipanggil dari frontend (Netlify) & localhost.
# Untuk produksi sebaiknya ganti "*" dengan domain spesifik Anda.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Kolom yang dikenali (fleksibel terhadap penamaan umum)
TEXT_COLS = ["content", "text", "teks", "tweet", "komentar", "isi", "caption"]
PLATFORM_COLS = ["platform", "sumber", "source", "media"]
AUTHOR_COLS = ["author", "user", "username", "akun", "penulis"]
DATE_COLS = ["date", "tanggal", "waktu", "created_at", "time"]
LIKES_COLS = ["likes", "like", "suka", "favorites"]
SHARES_COLS = ["shares", "share", "retweets", "bagikan"]


def _pick(columns: List[str], candidates: List[str]) -> Optional[str]:
    low = {c.lower().strip(): c for c in columns}
    for cand in candidates:
        if cand in low:
            return low[cand]
    return None


# --------------------------------------------------------------------------- #
# Skema request/response
# --------------------------------------------------------------------------- #

class TextRequest(BaseModel):
    texts: List[str]


class TextResultItem(BaseModel):
    text: str
    sentiment: str
    score: float
    emotion: str


@app.get("/")
def root():
    return {
        "name": "NETRA AI API",
        "status": "ok",
        "endpoints": ["/health", "/api/analyze-text", "/api/analyze-file", "/docs"],
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/api/analyze-text", response_model=List[TextResultItem])
def analyze_text(req: TextRequest):
    """Analisis daftar teks secara langsung (tanpa unggah file)."""
    if not req.texts:
        raise HTTPException(status_code=400, detail="Daftar teks kosong.")
    results = []
    for t in req.texts:
        label, score = analysis.analyze_sentiment(t)
        results.append(TextResultItem(
            text=t, sentiment=label, score=score, emotion=analysis.detect_emotion(t)
        ))
    return results


@app.post("/api/analyze-file")
async def analyze_file(file: UploadFile = File(...)):
    """
    Unggah CSV atau Excel berisi data media sosial.
    Minimal harus ada kolom teks (content/text/teks/komentar/...).
    Mengembalikan ringkasan analisis siap dipakai dashboard.
    """
    import pandas as pd  # impor di sini agar startup cepat

    raw = await file.read()
    name = (file.filename or "").lower()

    try:
        if name.endswith((".xlsx", ".xls")):
            df = pd.read_excel(io.BytesIO(raw))
        else:
            # coba beberapa encoding & pemisah umum
            try:
                df = pd.read_csv(io.BytesIO(raw))
            except Exception:
                df = pd.read_csv(io.BytesIO(raw), sep=";", encoding="latin-1")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Gagal membaca file: {e}")

    if df.empty:
        raise HTTPException(status_code=400, detail="File tidak berisi data.")

    cols = list(df.columns)
    text_col = _pick(cols, TEXT_COLS)
    if not text_col:
        raise HTTPException(
            status_code=400,
            detail=f"Kolom teks tidak ditemukan. Gunakan salah satu: {TEXT_COLS}. Kolom Anda: {cols}",
        )

    platform_col = _pick(cols, PLATFORM_COLS)
    author_col = _pick(cols, AUTHOR_COLS)
    date_col = _pick(cols, DATE_COLS)
    likes_col = _pick(cols, LIKES_COLS)
    shares_col = _pick(cols, SHARES_COLS)

    texts = df[text_col].fillna("").astype(str).tolist()

    # Sentimen & emosi per baris
    sent_counts = {"positif": 0, "netral": 0, "negatif": 0}
    emotion_counts: dict = {}
    sample_posts = []

    for i, t in enumerate(texts):
        label, score = analysis.analyze_sentiment(t)
        emo = analysis.detect_emotion(t)
        sent_counts[label] += 1
        emotion_counts[emo] = emotion_counts.get(emo, 0) + 1

        if len(sample_posts) < 20:
            sample_posts.append({
                "platform": str(df[platform_col].iloc[i]) if platform_col else "—",
                "author": str(df[author_col].iloc[i]) if author_col else "anonim",
                "content": t[:280],
                "date": str(df[date_col].iloc[i]) if date_col else "",
                "likes": int(_to_int(df[likes_col].iloc[i])) if likes_col else 0,
                "shares": int(_to_int(df[shares_col].iloc[i])) if shares_col else 0,
                "sentiment": label,
                "emotion": emo,
            })

    total = len(texts)
    sentiment_pct = {
        k: round(v / total * 100, 1) for k, v in sent_counts.items()
    }

    # Distribusi platform
    platform_counts = []
    if platform_col:
        vc = df[platform_col].fillna("—").astype(str).value_counts()
        platform_counts = [{"name": str(k), "value": int(v)} for k, v in vc.items()]

    keywords = analysis.top_keywords(texts, n=30)
    topics = analysis.simple_topics(keywords, k=5)
    emotions = [{"name": k, "value": v} for k, v in
                sorted(emotion_counts.items(), key=lambda x: -x[1])]

    return {
        "summary": {
            "totalPosts": total,
            "uniqueAuthors": int(df[author_col].nunique()) if author_col else None,
            "textColumn": text_col,
            "detectedColumns": {
                "platform": platform_col, "author": author_col,
                "date": date_col, "likes": likes_col, "shares": shares_col,
            },
        },
        "sentiment": sentiment_pct,
        "sentimentCounts": sent_counts,
        "emotions": emotions,
        "platformCounts": platform_counts,
        "keywords": keywords,
        "topics": topics,
        "samplePosts": sample_posts,
    }


def _to_int(v) -> int:
    try:
        return int(float(v))
    except (ValueError, TypeError):
        return 0
