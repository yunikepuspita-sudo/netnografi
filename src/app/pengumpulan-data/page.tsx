"use client";

import { useState } from "react";
import Panel from "@/components/Panel";
import ChartBlock from "@/components/ChartBlock";
import { platforms } from "@/data/mock";

const crawlModes = [
  "Keyword crawling",
  "Hashtag crawling",
  "Mention crawling",
  "Trend crawling",
  "Geolocation crawling",
  "Time-range crawling",
];

export default function PengumpulanData() {
  const [selected, setSelected] = useState<string[]>([
    "X/Twitter",
    "TikTok",
    "Instagram",
  ]);
  const [keyword, setKeyword] = useState("integritas KPU OR sirekap");
  const [modes, setModes] = useState<string[]>(["Keyword crawling", "Hashtag crawling"]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const start = () => {
    setRunning(true);
    setDone(false);
    setTimeout(() => {
      setRunning(false);
      setDone(true);
    }, 1600);
  };

  const sampleOutput = {
    platform: selected[0] ?? "Twitter",
    author: "user123",
    content: "Saya puas dengan transparansi rekapitulasi tahun ini...",
    date: "2026-06-01",
    likes: 45,
    shares: 12,
    query: keyword,
    modes,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel title="Konfigurasi Crawler" subtitle="Layer 1 — Social Media Collector" className="lg:col-span-2">
          <div className="space-y-5">
            <div>
              <label className="text-xs text-ink-400">Kata kunci / Query (mendukung OR, AND, "frasa")</label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-sm text-ink-100 outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <p className="text-xs text-ink-400">Platform sumber</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => toggle(selected, setSelected, p)}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      selected.includes(p)
                        ? "border-brand-500 bg-brand-600/20 text-brand-100"
                        : "border-white/10 text-ink-400 hover:text-ink-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-ink-400">Mode crawling</p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {crawlModes.map((m) => (
                  <label
                    key={m}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-ink-300"
                  >
                    <input
                      type="checkbox"
                      checked={modes.includes(m)}
                      onChange={() => toggle(modes, setModes, m)}
                      className="accent-brand-500"
                    />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-ink-400">Dari tanggal</label>
                <input type="date" defaultValue="2026-01-01" className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-sm text-ink-100 outline-none focus:border-brand-500" />
              </div>
              <div>
                <label className="text-xs text-ink-400">Sampai tanggal</label>
                <input type="date" defaultValue="2026-06-13" className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-sm text-ink-100 outline-none focus:border-brand-500" />
              </div>
            </div>

            <button
              onClick={start}
              disabled={running}
              className="w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:opacity-60"
            >
              {running ? "Mengambil data…" : "Mulai Crawling"}
            </button>
            {done && (
              <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
                ✓ Selesai. 12.480 posting baru masuk antrean Layer 2 (Pembersihan).
              </p>
            )}
          </div>
        </Panel>

        <Panel title="Contoh Output (JSON)" subtitle="Skema posting ternormalisasi">
          <pre className="overflow-auto rounded-xl border border-white/5 bg-ink-950 p-3 text-[11px] leading-relaxed text-emerald-200">
{JSON.stringify(sampleOutput, null, 2)}
          </pre>
          <p className="mt-3 text-xs text-ink-400">
            Setiap item disimpan ke tabel <code className="text-ink-200">Posts</code>{" "}
            dan diindeks ke Elasticsearch untuk pencarian cepat.
          </p>
        </Panel>
      </div>

      <Panel title="Volume Terkumpul per Platform" subtitle="Total posting periode aktif">
        <ChartBlock kind="platformBar" height={340} />
      </Panel>
    </div>
  );
}
