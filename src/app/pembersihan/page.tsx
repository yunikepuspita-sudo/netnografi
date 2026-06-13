import Panel from "@/components/Panel";
import StatCard from "@/components/StatCard";

const steps = [
  { name: "Remove spam", removed: 8420, desc: "Deteksi pola promosi & tautan berulang" },
  { name: "Remove duplicate", removed: 12110, desc: "Hashing konten + near-duplicate (MinHash)" },
  { name: "Remove bot accounts", removed: 5340, desc: "Skor perilaku akun (Botometer-like)" },
  { name: "Remove emoji & noise", removed: 0, desc: "Normalisasi simbol, URL, mention" },
  { name: "Stopword removal", removed: 0, desc: "Daftar stopword ID + EN" },
  { name: "Stemming Indonesia", removed: 0, desc: "Sastrawi stemmer" },
  { name: "Lemmatization Inggris", removed: 0, desc: "spaCy lemmatizer" },
];

export default function Pembersihan() {
  const raw = 198840;
  const clean = raw - steps.reduce((a, s) => a + s.removed, 0);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Data Mentah" value="198.840" icon="📥" />
        <StatCard label="Setelah Dibersihkan" value={clean.toLocaleString("id-ID")} icon="✨" tone="green" />
        <StatCard label="Dibuang" value={(raw - clean).toLocaleString("id-ID")} icon="🗑️" tone="red" />
        <StatCard label="Rasio Bersih" value={`${Math.round((clean / raw) * 100)}%`} icon="📊" tone="amber" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel title="Pipeline Preprocessing" subtitle="Layer 2 — otomatis & berurutan" className="lg:col-span-2">
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={s.name} className="flex items-start gap-3 rounded-xl border border-white/5 bg-ink-950/40 p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-600/20 text-xs font-bold text-brand-200">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink-100">{s.name}</span>
                    {s.removed > 0 ? (
                      <span className="badge bg-rose-500/15 text-rose-300">
                        −{s.removed.toLocaleString("id-ID")}
                      </span>
                    ) : (
                      <span className="badge bg-emerald-500/15 text-emerald-300">transformasi</span>
                    )}
                  </div>
                  <p className="text-xs text-ink-400">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>

        <div className="space-y-4">
          <Panel title="Framework / Pustaka" subtitle="Stack NLP">
            <div className="flex flex-wrap gap-2">
              {["Python", "NLTK", "spaCy", "Sastrawi", "scikit-learn", "pandas"].map((f) => (
                <span key={f} className="badge bg-white/5 text-ink-200">{f}</span>
              ))}
            </div>
          </Panel>
          <Panel title="Contoh Transformasi">
            <div className="space-y-2 text-xs">
              <div className="rounded-lg bg-ink-950 p-3">
                <div className="text-ink-500">Sebelum</div>
                <div className="text-ink-200">
                  &quot;Saya sangat puasss dgn pelayanannya 😍😍 https://t.co/x #KPU&quot;
                </div>
              </div>
              <div className="text-center text-ink-500">↓</div>
              <div className="rounded-lg bg-ink-950 p-3">
                <div className="text-ink-500">Sesudah</div>
                <div className="text-emerald-200">puas layan kpu</div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
