// Data contoh (mock) untuk NETRA AI.
// Semua angka di sini bersifat ilustratif untuk demonstrasi antarmuka,
// bukan hasil crawling nyata. Pada produksi, data ini berasal dari
// Layer 1 (Data Collection) → Layer 2 (Cleaning) → Layer 3 (AI Engine).

export type Sentiment = "positif" | "netral" | "negatif";

export interface Post {
  id: string;
  platform: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  shares: number;
  sentiment: Sentiment;
  emotion: string;
  topic: string;
}

export const platforms = [
  "X/Twitter",
  "Facebook",
  "Instagram",
  "TikTok",
  "YouTube",
  "Reddit",
  "Kaskus",
  "Kompas",
  "Detik",
  "Tribun",
];

export const platformCounts: { name: string; value: number }[] = [
  { name: "X/Twitter", value: 48230 },
  { name: "TikTok", value: 31980 },
  { name: "Instagram", value: 22140 },
  { name: "Facebook", value: 18760 },
  { name: "YouTube", value: 12450 },
  { name: "Detik", value: 8120 },
  { name: "Kompas", value: 6890 },
  { name: "Tribun", value: 5980 },
  { name: "Kaskus", value: 4310 },
  { name: "Reddit", value: 2110 },
];

export const summary = {
  totalPosts: 160970,
  totalAuthors: 84230,
  totalEngagement: 2_940_000,
  activeProjects: 7,
  sentiment: { positif: 62, netral: 23, negatif: 15 },
  dateRange: "1 Jan 2026 – 13 Jun 2026",
};

export const emotions: { name: string; value: number }[] = [
  { name: "Senang", value: 28 },
  { name: "Antusias", value: 22 },
  { name: "Netral", value: 18 },
  { name: "Kecewa", value: 12 },
  { name: "Marah", value: 9 },
  { name: "Sedih", value: 7 },
  { name: "Takut", value: 4 },
];

// Tren sentimen harian (ilustratif)
export const sentimentTrend = {
  dates: [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  ],
  positif: [55, 58, 60, 57, 63, 62],
  netral: [28, 25, 24, 26, 22, 23],
  negatif: [17, 17, 16, 17, 15, 15],
};

export const topics: { name: string; value: number; keywords: string[] }[] = [
  { name: "Integritas Pemilu", value: 100, keywords: ["jujur", "adil", "rekapitulasi", "kecurangan"] },
  { name: "Partisipasi Pemilih", value: 82, keywords: ["golput", "antusias", "tps", "pemilih muda"] },
  { name: "Kinerja KPU", value: 76, keywords: ["sirekap", "logistik", "petugas", "kpu"] },
  { name: "Disinformasi", value: 64, keywords: ["hoaks", "fitnah", "klarifikasi", "viral"] },
  { name: "Transparansi", value: 58, keywords: ["terbuka", "data", "audit", "publik"] },
];

// Evolusi topik per bulan (untuk timeline)
export const topicEvolution = {
  dates: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
  series: [
    { name: "Integritas Pemilu", data: [40, 52, 61, 70, 88, 100] },
    { name: "Partisipasi Pemilih", data: [30, 38, 45, 55, 72, 82] },
    { name: "Kinerja KPU", data: [50, 48, 55, 60, 68, 76] },
    { name: "Disinformasi", data: [20, 35, 48, 52, 60, 64] },
    { name: "Transparansi", data: [25, 28, 33, 41, 50, 58] },
  ],
};

export const wordCloud: { name: string; value: number }[] = [
  { name: "pemilu", value: 980 },
  { name: "kpu", value: 870 },
  { name: "integritas", value: 720 },
  { name: "transparan", value: 660 },
  { name: "sirekap", value: 610 },
  { name: "partisipasi", value: 580 },
  { name: "hoaks", value: 540 },
  { name: "golput", value: 500 },
  { name: "rekapitulasi", value: 470 },
  { name: "logistik", value: 430 },
  { name: "pemilih muda", value: 410 },
  { name: "kecurangan", value: 390 },
  { name: "demokrasi", value: 370 },
  { name: "tps", value: 350 },
  { name: "akuntabilitas", value: 320 },
  { name: "netralitas", value: 300 },
  { name: "disinformasi", value: 280 },
  { name: "kepercayaan", value: 270 },
  { name: "audit", value: 250 },
  { name: "klarifikasi", value: 240 },
  { name: "debat", value: 220 },
  { name: "kampanye", value: 210 },
  { name: "suara", value: 200 },
  { name: "publik", value: 190 },
  { name: "etik", value: 180 },
  { name: "pengawas", value: 170 },
  { name: "data", value: 160 },
  { name: "viral", value: 150 },
  { name: "bawaslu", value: 140 },
  { name: "verifikasi", value: 130 },
];

// Heatmap provinsi vs sentimen (skor sentimen bersih, -100..100)
export const provinces = [
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur",
  "Banten", "DI Yogyakarta", "Sumatera Utara", "Sumatera Barat",
  "Sulawesi Selatan", "Bali",
];
export const heatmapMetrics = ["Integritas", "Partisipasi", "Kinerja KPU", "Disinformasi", "Transparansi"];
// [metricIndex, provinceIndex, value]
export const heatmapData: [number, number, number][] = (() => {
  const seed = [
    [62, 70, 55, 40, 58, 75, 48, 60, 52, 68],
    [58, 64, 60, 45, 50, 72, 44, 56, 50, 70],
    [40, 52, 48, 38, 42, 60, 35, 48, 40, 58],
    [30, 28, 35, 25, 32, 45, 22, 38, 30, 50],
    [50, 55, 52, 42, 48, 66, 40, 54, 46, 62],
  ];
  const out: [number, number, number][] = [];
  for (let m = 0; m < heatmapMetrics.length; m++) {
    for (let p = 0; p < provinces.length; p++) {
      out.push([p, m, seed[m][p]]);
    }
  }
  return out;
})();

// Network graph komunitas (Community Detection)
export interface GraphNode {
  id: string;
  name: string;
  symbolSize: number;
  category: number;
  role: string;
  value: number;
}
export interface GraphLink { source: string; target: string }

export const graphCategories = [
  { name: "Pro-KPU" },
  { name: "Kritis" },
  { name: "Media" },
  { name: "Akademisi" },
  { name: "Netral" },
];

export const graphNodes: GraphNode[] = [
  { id: "n1", name: "@KPU_RI", symbolSize: 60, category: 0, role: "Akun Resmi", value: 100 },
  { id: "n2", name: "@warganet_jbr", symbolSize: 38, category: 1, role: "Opinion Leader", value: 64 },
  { id: "n3", name: "@kompasdotcom", symbolSize: 46, category: 2, role: "Media", value: 78 },
  { id: "n4", name: "@detikcom", symbolSize: 44, category: 2, role: "Media", value: 74 },
  { id: "n5", name: "@prof_demokrasi", symbolSize: 40, category: 3, role: "Akademisi", value: 66 },
  { id: "n6", name: "@pemilihmuda", symbolSize: 34, category: 4, role: "Komunitas", value: 52 },
  { id: "n7", name: "@kritik_sirekap", symbolSize: 36, category: 1, role: "Influencer", value: 58 },
  { id: "n8", name: "@bawaslu_ri", symbolSize: 42, category: 0, role: "Akun Resmi", value: 70 },
  { id: "n9", name: "@cekfakta", symbolSize: 32, category: 2, role: "Fact-checker", value: 48 },
  { id: "n10", name: "@suara_rakyat", symbolSize: 30, category: 1, role: "Komunitas", value: 44 },
  { id: "n11", name: "@analis_politik", symbolSize: 33, category: 3, role: "Akademisi", value: 50 },
  { id: "n12", name: "@infopemilu", symbolSize: 28, category: 4, role: "Akun Info", value: 40 },
];

export const graphLinks: GraphLink[] = [
  { source: "n1", target: "n3" },
  { source: "n1", target: "n4" },
  { source: "n1", target: "n8" },
  { source: "n1", target: "n6" },
  { source: "n2", target: "n7" },
  { source: "n2", target: "n10" },
  { source: "n7", target: "n10" },
  { source: "n7", target: "n3" },
  { source: "n3", target: "n9" },
  { source: "n4", target: "n9" },
  { source: "n5", target: "n11" },
  { source: "n5", target: "n1" },
  { source: "n11", target: "n3" },
  { source: "n6", target: "n12" },
  { source: "n8", target: "n9" },
  { source: "n2", target: "n5" },
  { source: "n10", target: "n12" },
  { source: "n7", target: "n11" },
];

// Sankey: Tema → Narasi → Sentimen
export const sankey = {
  nodes: [
    { name: "Integritas Pemilu" },
    { name: "Kinerja KPU" },
    { name: "Partisipasi" },
    { name: "Narasi: KPU Transparan" },
    { name: "Narasi: KPU Tidak Independen" },
    { name: "Narasi: Ayo Memilih" },
    { name: "Positif" },
    { name: "Netral" },
    { name: "Negatif" },
  ],
  links: [
    { source: "Integritas Pemilu", target: "Narasi: KPU Transparan", value: 35 },
    { source: "Integritas Pemilu", target: "Narasi: KPU Tidak Independen", value: 25 },
    { source: "Kinerja KPU", target: "Narasi: KPU Transparan", value: 20 },
    { source: "Kinerja KPU", target: "Narasi: KPU Tidak Independen", value: 18 },
    { source: "Partisipasi", target: "Narasi: Ayo Memilih", value: 30 },
    { source: "Narasi: KPU Transparan", target: "Positif", value: 45 },
    { source: "Narasi: KPU Transparan", target: "Netral", value: 10 },
    { source: "Narasi: KPU Tidak Independen", target: "Negatif", value: 33 },
    { source: "Narasi: KPU Tidak Independen", target: "Netral", value: 10 },
    { source: "Narasi: Ayo Memilih", target: "Positif", value: 22 },
    { source: "Narasi: Ayo Memilih", target: "Netral", value: 8 },
  ],
};

export const samplePosts: Post[] = [
  {
    id: "p1",
    platform: "X/Twitter",
    author: "user_jakarta",
    content: "Proses rekapitulasi tahun ini terasa lebih terbuka, datanya bisa dipantau publik. Apresiasi untuk KPU.",
    date: "2026-06-01",
    likes: 245,
    shares: 62,
    sentiment: "positif",
    emotion: "Antusias",
    topic: "Transparansi",
  },
  {
    id: "p2",
    platform: "TikTok",
    author: "pemilihmuda.id",
    content: "Pertama kali nyoblos! Antusias banget lihat partisipasi anak muda meningkat di TPS.",
    date: "2026-06-02",
    likes: 1820,
    shares: 410,
    sentiment: "positif",
    emotion: "Senang",
    topic: "Partisipasi Pemilih",
  },
  {
    id: "p3",
    platform: "Facebook",
    author: "warga.bandung",
    content: "Sempat ada kabar simpang siur soal Sirekap, tapi setelah dicek ternyata hoaks. Hati-hati disinformasi.",
    date: "2026-06-03",
    likes: 132,
    shares: 88,
    sentiment: "netral",
    emotion: "Netral",
    topic: "Disinformasi",
  },
  {
    id: "p4",
    platform: "X/Twitter",
    author: "kritik_publik",
    content: "Logistik di beberapa daerah masih terlambat. KPU perlu evaluasi distribusi agar tidak terulang.",
    date: "2026-06-04",
    likes: 540,
    shares: 175,
    sentiment: "negatif",
    emotion: "Kecewa",
    topic: "Kinerja KPU",
  },
  {
    id: "p5",
    platform: "YouTube",
    author: "analiskebijakan",
    content: "Diskusi menarik soal independensi penyelenggara pemilu. Transparansi data jadi kunci kepercayaan publik.",
    date: "2026-06-05",
    likes: 920,
    shares: 230,
    sentiment: "netral",
    emotion: "Netral",
    topic: "Integritas Pemilu",
  },
  {
    id: "p6",
    platform: "Instagram",
    author: "infografis.pemilu",
    content: "Indeks kepercayaan terhadap pemilu naik dibanding periode sebelumnya. Bukti reformasi tata kelola berjalan.",
    date: "2026-06-06",
    likes: 760,
    shares: 198,
    sentiment: "positif",
    emotion: "Antusias",
    topic: "Integritas Pemilu",
  },
];

// Election module indices
export const electionIndices = {
  trust: 72,
  sentiment: 64,
  engagement: 81,
  disinformationAlerts: 14,
};

export const disinformationAlerts = [
  { id: "d1", level: "Tinggi", topic: "Klaim surat suara tercoblos", platform: "X/Twitter", reach: 184000, status: "Diverifikasi: Hoaks", time: "2 jam lalu" },
  { id: "d2", level: "Sedang", topic: "Server Sirekap diretas", platform: "TikTok", reach: 92000, status: "Klarifikasi resmi terbit", time: "5 jam lalu" },
  { id: "d3", level: "Rendah", topic: "Petugas tidak netral di TPS X", platform: "Facebook", reach: 23000, status: "Sedang ditelusuri", time: "8 jam lalu" },
  { id: "d4", level: "Sedang", topic: "Foto antrean dimanipulasi", platform: "Instagram", reach: 51000, status: "Diverifikasi: Konteks salah", time: "1 hari lalu" },
];

// Coding workspace
export const codes = {
  open: ["Kepercayaan", "Integritas", "Partisipasi", "Transparansi", "Kekecewaan", "Disinformasi"],
  axial: [
    { from: "Integritas", to: "Kepercayaan" },
    { from: "Transparansi", to: "Kepercayaan" },
    { from: "Disinformasi", to: "Kekecewaan" },
    { from: "Partisipasi", to: "Legitimasi" },
  ],
  selective: ["Governance → Public Trust"],
};

export const codedQuotes = [
  { id: "q1", quote: "Datanya bisa dipantau publik, apresiasi untuk KPU.", codes: ["Transparansi", "Kepercayaan"], coder: "Peneliti A", status: "Disetujui" },
  { id: "q2", quote: "Logistik masih terlambat, perlu evaluasi.", codes: ["Kinerja", "Kekecewaan"], coder: "Peneliti B", status: "Menunggu" },
  { id: "q3", quote: "Antusias lihat partisipasi anak muda meningkat.", codes: ["Partisipasi"], coder: "Peneliti A", status: "Disetujui" },
  { id: "q4", quote: "Setelah dicek ternyata hoaks, hati-hati disinformasi.", codes: ["Disinformasi", "Literasi"], coder: "Peneliti C", status: "Disetujui" },
];

export const intercoderReliability = 0.84; // Cohen's Kappa (ilustratif)

export const projects = [
  { id: "pr1", name: "Netnografi Pemilu 2029", posts: 84230, status: "Aktif", updated: "2026-06-12", coders: 4 },
  { id: "pr2", name: "Netnografi KPU Jabar", posts: 42110, status: "Aktif", updated: "2026-06-10", coders: 3 },
  { id: "pr3", name: "Netnografi Pilkada Serentak", posts: 21540, status: "Analisis", updated: "2026-06-08", coders: 5 },
  { id: "pr4", name: "Sentimen Kebijakan Subsidi", posts: 9870, status: "Draft", updated: "2026-05-30", coders: 2 },
];
