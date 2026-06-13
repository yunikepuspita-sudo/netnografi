# NETRA AI — Netnography Research & Analytics

Prototipe **PWA (Progressive Web App)** untuk netnografi: platform riset
end-to-end mulai dari *crawling* → *coding* → analisis AI → visualisasi →
publikasi ilmiah. Dirancang untuk penelitian akademik, analisis opini publik,
monitoring pemilu, kebijakan publik, dan riset pemasaran digital.

> Status: **MVP Frontend**. Seluruh data yang ditampilkan bersifat *ilustratif*
> (mock) untuk mendemonstrasikan antarmuka & alur kerja. Backend (crawler,
> model AI, basis data) disimulasikan di sisi klien.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** untuk styling (tema gelap)
- **Apache ECharts** (`echarts`, `echarts-for-react`, `echarts-wordcloud`)
  untuk line chart, stacked area, network graph, heatmap, word cloud, Sankey
- **PWA**: `manifest.webmanifest` + service worker (`public/sw.js`) offline-first

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
```

Build produksi:

```bash
npm run build
npm start
```

> Service worker hanya aktif pada build produksi (`NODE_ENV=production`).

## Struktur Aplikasi (sesuai arsitektur 6 layer)

| Halaman | Rute | Layer |
| --- | --- | --- |
| Dashboard | `/` | Ringkasan |
| Pengumpulan Data | `/pengumpulan-data` | Layer 1 — Data Collection |
| Pembersihan Data | `/pembersihan` | Layer 2 — Preprocessing |
| AI Netnography Engine | `/analisis` | Layer 3 — Sentiment, Emotion, Topic, Narrative, Insight |
| Deteksi Komunitas | `/komunitas` | Layer 3 — Community Detection (network graph) |
| Coding Workspace | `/coding` | Layer 4 — Open/Axial/Selective + collaborative coding |
| Visualisasi | `/visualisasi` | Layer 5 — Dashboard visual lengkap |
| Election Monitor | `/pemilu` | Modul KPU — indeks & disinformation alert |
| Output & Laporan | `/laporan` | Layer 6 — Generator laporan + integrasi SLR |
| AI Research Assistant | `/asisten` | Fitur AI Premium |

## Struktur Folder

```
src/
├── app/                 # Halaman (App Router)
├── components/          # Sidebar, Header, Panel, StatCard, chart wrappers
│   └── charts/          # EChart (client) + builder opsi ECharts
└── data/mock.ts         # Data contoh terpusat
public/
├── manifest.webmanifest # Manifest PWA
├── sw.js                # Service worker offline-first
└── icons/               # Ikon aplikasi (SVG)
```

## Roadmap menuju produksi

Komponen berikut disimulasikan di MVP ini dan menjadi kandidat implementasi
backend nyata sesuai arsitektur target:

- **Backend**: FastAPI (API Gateway + microservices)
- **Data Collection**: konektor X/Twitter, TikTok, Instagram, YouTube, Reddit,
  Kaskus, dan portal berita
- **NLP**: Python, NLTK, spaCy, Sastrawi (stemming Indonesia)
- **AI Engine**: IndoBERT (sentimen/emosi), BERTopic/LDA (topik), LLM
  (GPT/Llama/DeepSeek/Qwen) untuk insight & asisten riset
- **Basis data**: PostgreSQL (Users, Projects, Sources, Posts, Comments,
  Sentiments, Topics, Communities, Reports) + Elasticsearch
- **Deployment**: Docker + Kubernetes / Cloud Run

---

*NETRA AI dibangun sebagai prototipe untuk keperluan riset akademik.*
