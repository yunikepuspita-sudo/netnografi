import Panel from "@/components/Panel";
import ChartBlock from "@/components/ChartBlock";
import { electionIndices, disinformationAlerts } from "@/data/mock";

function Gauge({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="card">
      <p className="text-xs text-ink-400">{label}</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="mb-1 text-xs text-ink-500">/ 100</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

const levelColor: Record<string, string> = {
  Tinggi: "bg-rose-500/15 text-rose-300",
  Sedang: "bg-amber-500/15 text-amber-300",
  Rendah: "bg-emerald-500/15 text-emerald-300",
};

export default function Pemilu() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-brand-500/20 bg-gradient-to-r from-brand-600/15 to-transparent p-5">
        <h2 className="text-lg font-bold text-white">🗳️ Election Netnography Monitor</h2>
        <p className="mt-1 text-sm text-ink-300">
          Modul khusus penyelenggara: memantau disinformasi, hoaks, sentimen
          publik, partisipasi pemilih, isu logistik, dan etik penyelenggara
          secara real-time.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Gauge label="Election Trust Index" value={electionIndices.trust} tone="bg-gradient-to-r from-emerald-400 to-emerald-600" />
        <Gauge label="Election Sentiment Index" value={electionIndices.sentiment} tone="bg-gradient-to-r from-brand-400 to-brand-600" />
        <Gauge label="Public Engagement Index" value={electionIndices.engagement} tone="bg-gradient-to-r from-amber-400 to-amber-600" />
        <div className="card">
          <p className="text-xs text-ink-400">Disinformation Alerts</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-3xl font-bold text-rose-300">{electionIndices.disinformationAlerts}</span>
            <span className="mb-1 text-xs text-ink-500">aktif</span>
          </div>
          <p className="mt-3 text-xs text-ink-400">3 berstatus prioritas tinggi</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel title="Tren Sentimen Pemilu" subtitle="Pemantauan harian" className="lg:col-span-2">
          <ChartBlock kind="sentimentTrend" height={300} />
        </Panel>
        <Panel title="Distribusi Sentimen Publik">
          <ChartBlock kind="sentimentDonut" height={300} />
        </Panel>
      </div>

      <Panel
        title="Disinformation Alert"
        subtitle="Deteksi & verifikasi hoaks pemilu"
        right={<span className="badge bg-rose-500/15 text-rose-300">Live</span>}
      >
        <div className="overflow-hidden rounded-xl border border-white/5">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-xs text-ink-400">
              <tr>
                <th className="px-3 py-2 text-left">Level</th>
                <th className="px-3 py-2 text-left">Isu</th>
                <th className="px-3 py-2 text-left">Platform</th>
                <th className="px-3 py-2 text-right">Jangkauan</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-right">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {disinformationAlerts.map((a) => (
                <tr key={a.id} className="border-t border-white/5">
                  <td className="px-3 py-2">
                    <span className={`badge ${levelColor[a.level]}`}>{a.level}</span>
                  </td>
                  <td className="px-3 py-2 text-ink-200">{a.topic}</td>
                  <td className="px-3 py-2 text-ink-400">{a.platform}</td>
                  <td className="px-3 py-2 text-right text-ink-300">
                    {a.reach.toLocaleString("id-ID")}
                  </td>
                  <td className="px-3 py-2 text-ink-300">{a.status}</td>
                  <td className="px-3 py-2 text-right text-ink-500">{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
