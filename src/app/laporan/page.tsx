"use client";

import { useState } from "react";
import Panel from "@/components/Panel";

const sections = [
  { key: "Introduction", text: "Pendahuluan: konteks pemilu digital & urgensi netnografi." },
  { key: "Method", text: "Metode: netnografi + text mining (crawling, preprocessing, IndoBERT, BERTopic)." },
  { key: "Findings", text: "Temuan: sentimen 62% positif; tema integritas & partisipasi dominan." },
  { key: "Discussion", text: "Diskusi: kaitan transparansi digital dengan kepercayaan publik." },
  { key: "Conclusion", text: "Simpulan & rekomendasi kebijakan untuk penyelenggara." },
];

const slrSources = [
  { name: "Scopus", count: 142, color: "text-orange-300" },
  { name: "Crossref", count: 318, color: "text-blue-300" },
  { name: "OpenAlex", count: 506, color: "text-emerald-300" },
];

export default function Laporan() {
  const [generating, setGenerating] = useState(false);
  const [ready, setReady] = useState(false);

  const generate = () => {
    setGenerating(true);
    setReady(false);
    setTimeout(() => {
      setGenerating(false);
      setReady(true);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel
          title="Generator Laporan Netnografi"
          subtitle="Otomatis menyusun artikel ilmiah dari hasil analisis"
          className="lg:col-span-2"
        >
          <ol className="space-y-3">
            {sections.map((s, i) => (
              <li key={s.key} className="flex items-start gap-3 rounded-xl border border-white/5 bg-ink-950/40 p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-600/20 text-xs font-bold text-brand-200">
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-medium text-ink-100">{s.key}</div>
                  <p className="text-xs text-ink-400">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={generate}
              disabled={generating}
              className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60"
            >
              {generating ? "Menyusun laporan…" : "Generate Laporan"}
            </button>
            <button className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-ink-200 hover:bg-white/5">
              Ekspor PDF
            </button>
            <button className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-ink-200 hover:bg-white/5">
              Ekspor DOCX
            </button>
          </div>

          {ready && (
            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm">
              <div className="font-semibold text-emerald-300">
                ✓ Laporan siap: &quot;Persepsi Publik atas Integritas Pemilu — Studi Netnografi&quot;
              </div>
              <p className="mt-1 text-xs text-ink-400">
                5 bagian · 8.420 kata · 18 sitasi tertaut · 6 visualisasi
                disematkan. Siap diunduh sebagai PDF/DOCX dengan gaya sitasi APA.
              </p>
            </div>
          )}
        </Panel>

        <div className="space-y-4">
          <Panel title="Integrasi SLR" subtitle="Tautkan temuan dengan literatur">
            <div className="space-y-3">
              {slrSources.map((s) => (
                <div key={s.name} className="flex items-center justify-between rounded-lg bg-ink-950/40 px-3 py-2">
                  <span className={`text-sm font-medium ${s.color}`}>{s.name}</span>
                  <span className="text-xs text-ink-400">{s.count} artikel relevan</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-400">
              Sistematic Literature Review otomatis mengambil metadata dari API
              Scopus, Crossref, dan OpenAlex untuk menghubungkan hasil netnografi
              dengan kajian terdahulu.
            </p>
          </Panel>

          <Panel title="Format Output">
            <div className="flex flex-wrap gap-2">
              {["PDF Laporan", "Artikel Ilmiah", "Dataset CSV", "Visualisasi PNG", "BibTeX"].map((f) => (
                <span key={f} className="badge bg-white/5 text-ink-200">{f}</span>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
