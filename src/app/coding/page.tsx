"use client";

import { useState } from "react";
import Panel from "@/components/Panel";
import StatCard from "@/components/StatCard";
import { codes, codedQuotes, intercoderReliability } from "@/data/mock";

export default function Coding() {
  const [quotes, setQuotes] = useState(codedQuotes);

  const approve = (id: string) =>
    setQuotes((qs) =>
      qs.map((q) => (q.id === id ? { ...q, status: "Disetujui" } : q))
    );

  const approved = quotes.filter((q) => q.status === "Disetujui").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Open Codes" value={String(codes.open.length)} icon="🏷️" />
        <StatCard label="Kutipan Terkode" value={String(quotes.length)} icon="✂️" tone="green" />
        <StatCard label="Disetujui" value={`${approved}/${quotes.length}`} icon="✅" tone="amber" />
        <StatCard label="Intercoder Reliability" value={`κ ${intercoderReliability}`} icon="🤝" tone="brand" delta="Cohen's Kappa — reliabilitas tinggi" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel title="Open Coding" subtitle="Identifikasi konsep awal">
          <div className="flex flex-wrap gap-2">
            {codes.open.map((c) => (
              <span key={c} className="badge bg-brand-600/15 text-brand-200">{c}</span>
            ))}
          </div>
        </Panel>
        <Panel title="Axial Coding" subtitle="Hubungan antar-kategori">
          <ul className="space-y-2 text-sm">
            {codes.axial.map((a, i) => (
              <li key={i} className="flex items-center gap-2 rounded-lg bg-ink-950/40 px-3 py-2">
                <span className="text-ink-200">{a.from}</span>
                <span className="text-brand-400">→</span>
                <span className="text-ink-200">{a.to}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Selective Coding" subtitle="Kategori inti / teori">
          <div className="grid place-items-center rounded-xl border border-brand-500/20 bg-brand-600/10 p-6 text-center">
            <div className="text-lg font-semibold text-brand-100">
              {codes.selective[0]}
            </div>
            <p className="mt-1 text-xs text-ink-400">Kategori inti yang mengintegrasikan seluruh tema</p>
          </div>
        </Panel>
      </div>

      <Panel
        title="Collaborative Coding"
        subtitle="Peneliti memberi kode, komentar, dan menyetujui — terhitung ke intercoder reliability"
      >
        <div className="overflow-hidden rounded-xl border border-white/5">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-xs text-ink-400">
              <tr>
                <th className="px-3 py-2 text-left">Kutipan</th>
                <th className="px-3 py-2 text-left">Kode</th>
                <th className="px-3 py-2 text-left">Coder</th>
                <th className="px-3 py-2 text-center">Status</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-t border-white/5 align-top">
                  <td className="px-3 py-2 text-ink-200">&quot;{q.quote}&quot;</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {q.codes.map((c) => (
                        <span key={c} className="badge bg-white/5 text-[10px] text-ink-300">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-ink-400">{q.coder}</td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className={`badge ${
                        q.status === "Disetujui"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-amber-500/15 text-amber-300"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    {q.status !== "Disetujui" && (
                      <button
                        onClick={() => approve(q.id)}
                        className="rounded-lg bg-brand-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-brand-500"
                      >
                        Setujui
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
