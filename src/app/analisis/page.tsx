import Panel from "@/components/Panel";
import ChartBlock from "@/components/ChartBlock";
import { topics } from "@/data/mock";

const narratives = [
  { type: "Narasi Dominan", text: "KPU transparan dalam rekapitulasi", share: 48, tone: "positif" },
  { type: "Narasi Kontra", text: "KPU tidak independen", share: 31, tone: "negatif" },
  { type: "Isu Berkembang", text: "Keterlambatan logistik di daerah 3T", share: 14, tone: "netral" },
  { type: "Potensi Krisis", text: "Tudingan manipulasi Sirekap (belum terbukti)", share: 7, tone: "alert" },
];

const toneColor: Record<string, string> = {
  positif: "border-emerald-500/30 bg-emerald-500/5",
  negatif: "border-rose-500/30 bg-rose-500/5",
  netral: "border-ink-500/30 bg-white/5",
  alert: "border-amber-500/40 bg-amber-500/5",
};

export default function Analisis() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="1 · Sentiment Analysis" subtitle="Klasifikasi 3 kelas (fine-tuned IndoBERT)">
          <ChartBlock kind="sentimentDonut" height={300} />
        </Panel>
        <Panel title="2 · Emotion Detection" subtitle="Marah · Takut · Sedih · Senang · Kecewa · Antusias">
          <ChartBlock kind="emotion" height={300} />
        </Panel>
      </div>

      <Panel title="3 · Topic Modeling" subtitle="Tema otomatis (BERTopic / LDA) + kata kunci representatif">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <div key={t.name} className="rounded-xl border border-white/5 bg-ink-950/40 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-ink-100">{t.name}</h3>
                <span className="badge bg-brand-600/20 text-brand-200">{t.value}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {t.keywords.map((k) => (
                  <span key={k} className="badge bg-white/5 text-[10px] text-ink-300">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="5 · Narrative Analysis" subtitle="Deteksi narasi utama, kontra-narasi & potensi krisis">
          <div className="space-y-3">
            {narratives.map((n) => (
              <div key={n.text} className={`rounded-xl border p-3 ${toneColor[n.tone]}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wide text-ink-400">
                    {n.type}
                  </span>
                  <span className="text-xs font-semibold text-ink-200">{n.share}%</span>
                </div>
                <p className="mt-1 text-sm text-ink-100">&quot;{n.text}&quot;</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="6 · AI Insight Generator"
          subtitle="GPT · Llama · DeepSeek · Qwen"
          right={<span className="badge bg-brand-600/20 text-brand-200">Auto-generated</span>}
        >
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-300">
                Executive Summary
              </h4>
              <p className="mt-1 text-ink-300">
                Sentimen publik terhadap penyelenggaraan pemilu cenderung positif
                (62%), didorong persepsi transparansi rekapitulasi dan partisipasi
                pemilih muda. Risiko utama berasal dari narasi keterlambatan
                logistik dan tudingan terhadap Sirekap yang berpotensi menjadi
                krisis bila tidak diklarifikasi cepat.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-300">
                Research Gap
              </h4>
              <p className="mt-1 text-ink-300">
                Minim studi netnografi yang menautkan persepsi transparansi digital
                dengan tingkat kepercayaan lintas-provinsi secara longitudinal.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-300">
                Policy Recommendation
              </h4>
              <p className="mt-1 text-ink-300">
                Perkuat kanal klarifikasi real-time &amp; dasbor data terbuka untuk
                meredam disinformasi; prioritaskan komunikasi logistik di wilayah
                berskor sentimen rendah.
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
