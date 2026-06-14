# NETRA AI — Backend FastAPI (versi gratis)

Backend netnografi **ringan & gratis**: analisis sentimen, emosi, kata kunci,
dan topik untuk teks Bahasa Indonesia — **tanpa model ML berat**, sehingga bisa
dijalankan di tier hosting gratis mana pun.

> Pendekatan: leksikon (kamus kata positif/negatif + emosi) dengan penanganan
> negasi & booster. Cocok untuk riset/demo. Bisa di-upgrade ke model
> transformer (IndoBERT) di kemudian hari tanpa mengubah kontrak API.

## Menjalankan secara lokal

Butuh **Python 3.10+**. Di Windows (PowerShell):

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

Lalu buka **http://localhost:8000/docs** — dokumentasi interaktif (Swagger UI)
untuk mencoba semua endpoint langsung dari browser.

> macOS/Linux: ganti aktivasi venv dengan `source .venv/bin/activate`.

## Endpoint

| Method | Path | Fungsi |
| --- | --- | --- |
| GET | `/` | Info API |
| GET | `/health` | Health check |
| POST | `/api/analyze-text` | Analisis daftar teks (JSON) |
| POST | `/api/analyze-file` | Unggah CSV/Excel → ringkasan analisis lengkap |
| GET | `/docs` | Swagger UI |

### Contoh: analisis teks

```bash
curl -X POST http://localhost:8000/api/analyze-text \
  -H "Content-Type: application/json" \
  -d '{"texts":["KPU transparan, saya puas","Saya kecewa dengan kecurangan ini"]}'
```

### Contoh: unggah file

```bash
curl -X POST http://localhost:8000/api/analyze-file \
  -F "file=@data/contoh-data.csv"
```

## Format file yang didukung

CSV atau Excel (.xlsx). Kolom dikenali otomatis (fleksibel):

| Wajib | Nama kolom yang dikenali |
| --- | --- |
| ✅ Teks | `content`, `text`, `teks`, `tweet`, `komentar`, `isi`, `caption` |
| Opsional | `platform`/`sumber`, `author`/`username`, `date`/`tanggal`, `likes`, `shares` |

Lihat `data/contoh-data.csv` sebagai template.

## Deploy gratis ke Render

1. Push repo ke GitHub (sudah).
2. Buka https://render.com → daftar gratis → **New → Blueprint**.
3. Pilih repo `netnografi`. Render membaca `backend/render.yaml` otomatis.
4. Tunggu build selesai → dapat URL publik, mis. `https://netra-ai-api.onrender.com`.

> Catatan tier gratis: service "tidur" setelah ±15 menit tidak dipakai; saat
> diakses kembali butuh ±30–50 detik untuk bangun. Wajar untuk demo/riset.

Alternatif gratis lain: Hugging Face Spaces, Railway, PythonAnywhere.

## Menghubungkan ke frontend

Setelah backend punya URL publik, set variabel lingkungan di frontend Next.js:

```
NEXT_PUBLIC_API_URL=https://netra-ai-api.onrender.com
```

(Halaman unggah di frontend akan memanggil `POST {API_URL}/api/analyze-file`.)
