// Konfigurasi alamat backend NETRA AI.
// Prioritas: nilai yang disimpan pengguna (localStorage) > variabel build > default lokal.

const DEFAULT_API = "http://localhost:8000";
const STORAGE_KEY = "netra_api_url";

export function getApiUrl(): string {
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) return saved.replace(/\/+$/, "");
  }
  const env = process.env.NEXT_PUBLIC_API_URL;
  return (env || DEFAULT_API).replace(/\/+$/, "");
}

export function setApiUrl(url: string) {
  if (typeof window === "undefined") return;
  const clean = url.trim().replace(/\/+$/, "");
  if (clean) window.localStorage.setItem(STORAGE_KEY, clean);
  else window.localStorage.removeItem(STORAGE_KEY);
}

export interface AnalyzeResult {
  summary: {
    totalPosts: number;
    uniqueAuthors: number | null;
    textColumn: string;
    detectedColumns: Record<string, string | null>;
  };
  sentiment: { positif: number; netral: number; negatif: number };
  sentimentCounts: { positif: number; netral: number; negatif: number };
  emotions: { name: string; value: number }[];
  platformCounts: { name: string; value: number }[];
  keywords: { name: string; value: number }[];
  topics: { name: string; value: number; keywords: string[] }[];
  samplePosts: {
    platform: string;
    author: string;
    content: string;
    date: string;
    likes: number;
    shares: number;
    sentiment: "positif" | "netral" | "negatif";
    emotion: string;
  }[];
}

export async function analyzeFile(file: File): Promise<AnalyzeResult> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${getApiUrl()}/api/analyze-file`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      if (j.detail) detail = typeof j.detail === "string" ? j.detail : JSON.stringify(j.detail);
    } catch {
      /* abaikan */
    }
    throw new Error(detail);
  }
  return res.json();
}
