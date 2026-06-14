"""
Analisis teks Bahasa Indonesia berbasis leksikon — tanpa model ML berat,
sehingga ringan, cepat, dan gratis dijalankan di tier hosting apa pun.

Mencakup:
- Pembersihan teks (URL, mention, hashtag, emoji, tanda baca)
- Analisis sentimen (positif / netral / negatif) dengan penanganan negasi
- Deteksi emosi (senang, antusias, marah, sedih, takut, kecewa)
- Ekstraksi kata kunci & topik sederhana (frekuensi setelah stopword removal)
"""

from __future__ import annotations

import re
from collections import Counter
from typing import Dict, List, Tuple

# --------------------------------------------------------------------------- #
# Leksikon (dapat diperluas sesuai domain penelitian)
# --------------------------------------------------------------------------- #

POSITIVE_WORDS = {
    "baik", "bagus", "hebat", "mantap", "puas", "suka", "senang", "setuju",
    "dukung", "apresiasi", "terbaik", "keren", "sukses", "berhasil", "adil",
    "jujur", "transparan", "transparansi", "amanah", "bersih", "damai",
    "aman", "lancar", "tepat", "cepat", "ramah", "profesional", "kompeten",
    "percaya", "kepercayaan", "optimis", "harapan", "solusi", "maju",
    "meningkat", "unggul", "berkualitas", "memuaskan", "menang", "bangga",
    "antusias", "semangat", "akuntabel", "kredibel", "netral", "independen",
    "efektif", "efisien", "inovatif", "terbuka", "responsif", "membantu",
}

NEGATIVE_WORDS = {
    "buruk", "jelek", "gagal", "kecewa", "marah", "benci", "kesal", "curang",
    "kecurangan", "korup", "korupsi", "bohong", "hoaks", "hoax", "fitnah",
    "menipu", "tipu", "lambat", "ribet", "rumit", "mahal", "rusak", "parah",
    "masalah", "krisis", "konflik", "ricuh", "rusuh", "protes", "demo",
    "tolak", "menolak", "menentang", "menentang", "tidakadil", "manipulasi",
    "manipulatif", "diskriminasi", "lemah", "buntu", "kacau", "amburadul",
    "menyesatkan", "disinformasi", "provokasi", "ancaman", "takut", "khawatir",
    "cemas", "sedih", "kecewa", "frustrasi", "menyebalkan", "payah",
    "tidaktransparan", "tidaknetral", "bias", "memihak", "intimidasi",
}

NEGATION_WORDS = {"tidak", "tak", "bukan", "belum", "jangan", "kurang", "tanpa", "gak", "ga", "nggak", "enggak"}

BOOSTER_WORDS = {"sangat", "amat", "sekali", "banget", "paling", "begitu", "terlalu", "lebih"}

EMOTION_LEXICON: Dict[str, set] = {
    "senang": {"senang", "bahagia", "gembira", "suka", "puas", "syukur", "lega", "bangga", "ceria"},
    "antusias": {"antusias", "semangat", "optimis", "harapan", "excited", "termotivasi", "yakin", "dukung"},
    "marah": {"marah", "kesal", "geram", "benci", "emosi", "murka", "jengkel", "muak", "berang"},
    "sedih": {"sedih", "kecewa", "duka", "pilu", "menyesal", "prihatin", "terpuruk", "muram"},
    "takut": {"takut", "khawatir", "cemas", "was-was", "ngeri", "panik", "gelisah", "waspada"},
    "kecewa": {"kecewa", "frustrasi", "menyesal", "putus asa", "gagal", "mengecewakan"},
}

# Stopword Bahasa Indonesia (subset memadai untuk ekstraksi kata kunci)
STOPWORDS = {
    "yang", "untuk", "pada", "ke", "para", "namun", "menurut", "antara", "dia",
    "dua", "ia", "seperti", "jika", "jika", "sehingga", "kembali", "dan", "ini",
    "karena", "kepada", "oleh", "saat", "harus", "sementara", "setelah", "belum",
    "kami", "sekitar", "bagi", "serta", "di", "dari", "telah", "sebagai", "masih",
    "hal", "ketika", "adalah", "itu", "dalam", "bisa", "bahwa", "atau", "hanya",
    "kita", "dengan", "akan", "juga", "ada", "mereka", "sudah", "saya", "terhadap",
    "secara", "agar", "lain", "anda", "begitu", "mengapa", "kenapa", "yaitu",
    "yakni", "daripada", "itulah", "lagi", "maka", "tentang", "demi", "dimana",
    "kemana", "pula", "sambil", "sebelum", "sesudah", "selain", "seolah", "sejak",
    "sambil", "tetapi", "tapi", "kah", "pun", "sang", "nya", "lah", "rt", "yg",
    "dgn", "utk", "the", "a", "an", "is", "are", "of", "to", "in", "on", "and",
    "ya", "nih", "sih", "deh", "kok", "kan", "loh", "lho", "aja", "saja", "biar",
    "udah", "udh", "gitu", "gini", "banget", "bgt", "juga", "jg", "buat",
}

URL_RE = re.compile(r"https?://\S+|www\.\S+")
MENTION_RE = re.compile(r"@\w+")
HASHTAG_RE = re.compile(r"#(\w+)")
NON_ALNUM_RE = re.compile(r"[^a-z0-9\s]")
MULTISPACE_RE = re.compile(r"\s+")


def clean_text(text: str) -> str:
    """Normalisasi teks: lowercase, buang URL/mention/emoji/tanda baca."""
    if not isinstance(text, str):
        return ""
    t = text.lower()
    t = URL_RE.sub(" ", t)
    t = MENTION_RE.sub(" ", t)
    t = HASHTAG_RE.sub(r"\1", t)          # #pemilu -> pemilu
    t = NON_ALNUM_RE.sub(" ", t)
    t = MULTISPACE_RE.sub(" ", t).strip()
    return t


def tokenize(text: str) -> List[str]:
    return [w for w in clean_text(text).split() if w]


def analyze_sentiment(text: str) -> Tuple[str, float]:
    """Kembalikan (label, skor). Skor pada rentang kira-kira -1..1."""
    tokens = tokenize(text)
    if not tokens:
        return "netral", 0.0

    score = 0.0
    for i, w in enumerate(tokens):
        polarity = 0
        if w in POSITIVE_WORDS:
            polarity = 1
        elif w in NEGATIVE_WORDS:
            polarity = -1
        if polarity == 0:
            continue

        weight = 1.0
        # Booster pada kata sebelumnya memperkuat
        if i > 0 and tokens[i - 1] in BOOSTER_WORDS:
            weight = 1.5
        # Negasi dalam 2 kata sebelumnya membalik polaritas
        window = tokens[max(0, i - 2):i]
        if any(n in NEGATION_WORDS for n in window):
            polarity *= -1

        score += polarity * weight

    # Normalisasi terhadap panjang
    norm = score / (len(tokens) ** 0.5)
    if norm > 0.25:
        return "positif", round(norm, 3)
    if norm < -0.25:
        return "negatif", round(norm, 3)
    return "netral", round(norm, 3)


def detect_emotion(text: str) -> str:
    tokens = set(tokenize(text))
    best, best_count = "netral", 0
    for emotion, words in EMOTION_LEXICON.items():
        c = len(tokens & words)
        if c > best_count:
            best, best_count = emotion, c
    return best


def top_keywords(texts: List[str], n: int = 30) -> List[Dict[str, int]]:
    counter: Counter = Counter()
    skip = STOPWORDS | NEGATION_WORDS | BOOSTER_WORDS | {"banyak", "sangat", "lebih"}
    for t in texts:
        for w in tokenize(t):
            if len(w) > 2 and w not in skip and not w.isdigit():
                counter[w] += 1
    return [{"name": w, "value": c} for w, c in counter.most_common(n)]


def simple_topics(keywords: List[Dict[str, int]], k: int = 5) -> List[Dict]:
    """Topik sederhana: kelompokkan kata kunci teratas menjadi k klaster ringkas."""
    top = keywords[:15]
    topics = []
    for i in range(0, min(len(top), k * 3), 3):
        group = top[i:i + 3]
        if not group:
            break
        topics.append({
            "name": group[0]["name"].capitalize(),
            "value": sum(g["value"] for g in group),
            "keywords": [g["name"] for g in group],
        })
    return topics[:k]
