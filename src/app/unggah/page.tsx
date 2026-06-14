"use client";

import { useEffect, useRef, useState } from "react";
import Panel from "@/components/Panel";
import StatCard from "@/components/StatCard";
import EChart from "@/components/charts/EChart";
import { sentimentBadge } from "@/components/sentiment";
import {
  analyzeFile,
  getApiUrl,
  setApiUrl,
  type AnalyzeResult,
} from "@/lib/api";
import {
  donutFromData,
  emotionBarFromData,
  horizontalBarFromData,
  wordCloudFromData,
} from "@/components/charts/options";

export default function Unggah() {
  const [apiUrl, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrl(getApiUrl());
  }, []);

  const run = async () => {
    if (!file) {
      setError("Pilih file CSV atau Excel terlebih dahulu.");
      return;
    }
    setApiUrl(apiUrl);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await analyzeFile(file);
      setResult(r);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(
        msg.includes("Failed to fetch")
          ? `Tidak bisa terhubung ke backend di ${apiUrl}. Pastikan backend berjalan (uvicorn) dan URL benar.`
          : msg
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Panel
        title="Unggah & Analisis Data Nyata"
        subtitle="Kirim file CSV/Excel ke backend NETRA AI — hasil sentimen, emosi, topik & kata kunci dihitung langsung dari data Anda."
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs text-ink-400">Alamat backend (API)</label>
            <input
              value={apiUrl}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="http://localhost:8000"
              className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-sm text-ink-100 outline-none focus:border-brand-500"
            />
            <p className="mt-1 text-[11px] text-ink-500">
              Default: <code>http://localhost:8000</code> (saat backend dijalankan
              di komputer Anda). Setelah deploy, ganti dengan URL publik backend.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-ink-300 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-brand-500"
            />
            <button
              onClick={run}
              disabled={loading}
              className="shrink-0 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60"
            >
              {loading ? "Menganalisis…" : "Analisis"}
            </button>
          </div>

          <p className="text-[11px] text-ink-500">
            Format kolom yang dikenali otomatis: kolom teks (
            <code>content/text/teks/komentar/caption</code>) wajib; opsional{" "}
            <code>platform</code>, <code>author</code>, <code>date</code>,{" "}
            <code>likes</code>, <code>shares</code>.
          </p>

          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
              ⚠️ {error}
            </div>
          )}
        </div>
      </Panel>

      {result && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              label="Total Posting"
              value={result.summary.totalPosts.toLocaleString("id-ID")}
              icon="🗂️"
            />
            <StatCard
              label="Akun Unik"
              value={
                result.summary.uniqueAuthors != null
                  ? result.summary.uniqueAuthors.toLocaleString("id-ID")
                  : "—"
              }
              icon="👥"
              tone="green"
            />
            <StatCard
              label="Sentimen Positif"
              value={`${result.sentiment.positif}%`}
              icon="🙂"
              tone="amber"
            />
            <StatCard
              label="Sentimen Negatif"
              value={`${result.sentiment.negatif}%`}
              icon="🙁"
              tone="red"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Panel title="Distribusi Sentimen" subtitle="Hasil klasifikasi leksikon">
              <EChart option={donutFromData(result.sentiment)} height={300} />
            </Panel>
            <Panel title="Deteksi Emosi" subtitle="Frekuensi per kategori emosi">
              {result.emotions.length ? (
                <EChart option={emotionBarFromData(result.emotions)} height={300} />
              ) : (
                <Empty />
              )}
            </Panel>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Panel title="Volume per Platform" subtitle="Berdasarkan kolom platform">
              {result.platformCounts.length ? (
                <EChart
                  option={horizontalBarFromData(result.platformCounts)}
                  height={320}
                />
              ) : (
                <Empty note="Kolom platform tidak terdeteksi pada file." />
              )}
            </Panel>
            <Panel title="Word Cloud" subtitle="Kata kunci paling sering muncul">
              <EChart option={wordCloudFromData(result.keywords)} height={320} />
            </Panel>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Panel title="Topik Terdeteksi" subtitle="Klaster kata kunci">
              <ul className="space-y-3">
                {result.topics.map((t) => (
                  <li key={t.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-200">{t.name}</span>
                      <span className="text-ink-400">{t.value}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {t.keywords.map((k) => (
                        <span
                          key={k}
                          className="badge bg-white/5 text-[10px] text-ink-300"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel
              title="Sampel Posting Terklasifikasi"
              subtitle={`Kolom teks: ${result.summary.textColumn}`}
              className="lg:col-span-2"
            >
              <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                {result.samplePosts.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/5 bg-ink-950/40 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-ink-400">
                        <span className="font-medium text-ink-200">
                          @{p.author}
                        </span>
                        {p.platform !== "—" && (
                          <>
                            <span>·</span>
                            <span>{p.platform}</span>
                          </>
                        )}
                        {p.date && (
                          <>
                            <span>·</span>
                            <span>{p.date}</span>
                          </>
                        )}
                      </div>
                      {sentimentBadge(p.sentiment)}
                    </div>
                    <p className="mt-2 text-sm text-ink-200">{p.content}</p>
                    <div className="mt-2 flex gap-3 text-[11px] text-ink-500">
                      {p.likes > 0 && <span>❤️ {p.likes}</span>}
                      {p.shares > 0 && <span>🔁 {p.shares}</span>}
                      <span className="badge bg-white/5 text-ink-300">
                        {p.emotion}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </>
      )}
    </div>
  );
}

function Empty({ note }: { note?: string }) {
  return (
    <div className="grid h-[260px] place-items-center text-center text-xs text-ink-500">
      {note ?? "Tidak ada data untuk ditampilkan."}
    </div>
  );
}
