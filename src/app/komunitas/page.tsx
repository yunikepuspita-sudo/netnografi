import Panel from "@/components/Panel";
import ChartBlock from "@/components/ChartBlock";
import StatCard from "@/components/StatCard";
import { graphNodes } from "@/data/mock";

export default function Komunitas() {
  const leaders = [...graphNodes].sort((a, b) => b.value - a.value).slice(0, 6);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Komunitas Terdeteksi" value="5" icon="🧩" />
        <StatCard label="Opinion Leaders" value="12" icon="📣" tone="green" />
        <StatCard label="Echo Chamber" value="2" icon="🔁" tone="amber" />
        <StatCard label="Densitas Jaringan" value="0,34" icon="🕸️" tone="brand" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel
          title="Community Detection — Network Graph"
          subtitle="Modularitas (Louvain) · seret simpul untuk eksplorasi"
          className="lg:col-span-2"
        >
          <ChartBlock kind="community" height={460} />
        </Panel>

        <div className="space-y-4">
          <Panel title="Top Influencer / Opinion Leader" subtitle="Berdasarkan skor pengaruh">
            <ul className="space-y-2">
              {leaders.map((n, i) => (
                <li
                  key={n.id}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-ink-950/40 p-2.5"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-600/20 text-xs font-bold text-brand-200">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm text-ink-100">{n.name}</div>
                    <div className="text-[11px] text-ink-500">{n.role}</div>
                  </div>
                  <span className="text-xs font-semibold text-ink-300">{n.value}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Catatan Echo Chamber">
            <p className="text-xs text-ink-400">
              Dua klaster (Kritis &amp; Pro-KPU) menunjukkan interaksi internal
              tinggi dengan sedikit jembatan antar-kelompok — indikasi
              polarisasi. Akun fact-checker berperan sebagai penghubung utama.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
