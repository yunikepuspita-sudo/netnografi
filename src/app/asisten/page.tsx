"use client";

import { useState } from "react";
import Panel from "@/components/Panel";
import ChartBlock from "@/components/ChartBlock";

const examples = [
  "Apa isu dominan terkait integritas KPU Jawa Barat dalam 6 bulan terakhir?",
  "Bandingkan sentimen pemilih muda vs umum soal Sirekap.",
  "Tunjukkan narasi disinformasi yang paling cepat menyebar.",
];

export default function Asisten() {
  const [q, setQ] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ask = (question: string) => {
    if (!question.trim()) return;
    setAsked(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAsked(question);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Panel title="AI Research Assistant" subtitle="Tanyakan apa pun tentang data Anda — jawaban disertai statistik, kutipan & grafik">
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask(q)}
              placeholder="Tulis pertanyaan riset Anda…"
              className="flex-1 rounded-xl border border-white/10 bg-ink-950 px-3 py-2.5 text-sm text-ink-100 outline-none focus:border-brand-500"
            />
            <button
              onClick={() => ask(q)}
              className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-500"
            >
              Tanya
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => {
                  setQ(ex);
                  ask(ex);
                }}
                className="rounded-full border border-white/10 px-3 py-1 text-left text-xs text-ink-400 hover:text-ink-200"
              >
                {ex}
              </button>
            ))}
          </div>
        </Panel>

        {loading && (
          <Panel>
            <div className="flex items-center gap-3 text-sm text-ink-400">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
              Menganalisis 84.230 posting & menyusun jawaban…
            </div>
          </Panel>
        )}

        {asked && (
          <Panel title="Jawaban AI" right={<span className="badge bg-brand-600/20 text-brand-200">GPT · IndoBERT</span>}>
            <p className="text-xs text-ink-500">Pertanyaan: &quot;{asked}&quot;</p>
            <div className="mt-3 space-y-4 text-sm text-ink-300">
              <p>
                Dalam 6 bulan terakhir, isu dominan terkait integritas adalah{" "}
                <strong className="text-ink-100">transparansi rekapitulasi</strong>{" "}
                (Sirekap) dan <strong className="text-ink-100">netralitas penyelenggara</strong>.
                Sentimen bersih berada di kisaran +47, dengan puncak diskusi pada
                Mei–Juni.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-ink-950/50 p-3 text-center">
                  <div className="text-xl font-bold text-emerald-300">62%</div>
                  <div className="text-[11px] text-ink-500">Positif</div>
                </div>
                <div className="rounded-xl bg-ink-950/50 p-3 text-center">
                  <div className="text-xl font-bold text-ink-200">23%</div>
                  <div className="text-[11px] text-ink-500">Netral</div>
                </div>
                <div className="rounded-xl bg-ink-950/50 p-3 text-center">
                  <div className="text-xl font-bold text-rose-300">15%</div>
                  <div className="text-[11px] text-ink-500">Negatif</div>
                </div>
              </div>
              <blockquote className="border-l-2 border-brand-500 pl-3 text-ink-300">
                &quot;Datanya bisa dipantau publik, apresiasi untuk KPU.&quot;
                <span className="ml-2 text-[11px] text-ink-500">— @user_jakarta, X/Twitter</span>
              </blockquote>
              <div className="rounded-xl border border-white/5 p-2">
                <ChartBlock kind="sentimentTrend" height={240} />
              </div>
              <p className="text-xs text-ink-500">
                Interpretasi akademik: persepsi transparansi digital berasosiasi
                positif dengan kepercayaan publik, sejalan dengan kerangka
                <em> procedural justice</em>.
              </p>
            </div>
          </Panel>
        )}
      </div>

      <Panel title="Kapabilitas" subtitle="AI Premium">
        <ul className="space-y-2 text-sm text-ink-300">
          {[
            "Statistik otomatis dari korpus",
            "Kutipan posting representatif",
            "Grafik kontekstual",
            "Interpretasi akademik & sitasi",
            "Multi-model: GPT, Llama, DeepSeek, Qwen",
          ].map((c) => (
            <li key={c} className="flex items-start gap-2">
              <span className="text-brand-400">▹</span> {c}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
