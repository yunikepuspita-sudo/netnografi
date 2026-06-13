import StatCard from "@/components/StatCard";
import Panel from "@/components/Panel";
import ChartBlock from "@/components/ChartBlock";
import { summary, samplePosts, projects, topics } from "@/data/mock";
import { sentimentBadge } from "@/components/sentiment";

function fmt(n: number) {
  return new Intl.NumberFormat("id-ID").format(n);
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Ringkasan Riset Netnografi</h2>
        <p className="text-sm text-ink-400">
          Periode {summary.dateRange} · alur end-to-end: crawling → coding →
          analisis AI → visualisasi → publikasi.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Posting" value={fmt(summary.totalPosts)} icon="🗂️" delta="+8,2% vs bulan lalu" />
        <StatCard label="Akun Unik" value={fmt(summary.totalAuthors)} icon="👥" tone="green" delta="+5,1%" />
        <StatCard label="Total Engagement" value={`${(summary.totalEngagement / 1e6).toFixed(2)} jt`} icon="❤️" tone="amber" delta="+12,4%" />
        <StatCard label="Proyek Aktif" value={String(summary.activeProjects)} icon="📁" tone="brand" delta="4 kolaborator rata-rata" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel title="Tren Sentimen" subtitle="6 bulan terakhir" className="lg:col-span-2">
          <ChartBlock kind="sentimentTrend" height={300} />
        </Panel>
        <Panel title="Distribusi Sentimen" subtitle={`Positif ${summary.sentiment.positif}% · Negatif ${summary.sentiment.negatif}%`}>
          <ChartBlock kind="sentimentDonut" height={300} />
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel title="Volume per Platform" subtitle="Layer 1 — Data Collection" className="lg:col-span-2">
          <ChartBlock kind="platformBar" height={320} />
        </Panel>
        <Panel title="Topik Dominan" subtitle="Topic Modeling (LDA/BERTopic)">
          <ul className="space-y-3">
            {topics.map((t, i) => (
              <li key={t.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-200">{t.name}</span>
                  <span className="text-ink-400">{t.value}</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                    style={{ width: `${(t.value / topics[0].value) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel
          title="Posting Terbaru"
          subtitle="Sampel hasil crawling + klasifikasi AI"
        >
          <div className="space-y-3">
            {samplePosts.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-white/5 bg-ink-950/40 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-ink-400">
                    <span className="font-medium text-ink-200">@{p.author}</span>
                    <span>·</span>
                    <span>{p.platform}</span>
                    <span>·</span>
                    <span>{p.date}</span>
                  </div>
                  {sentimentBadge(p.sentiment)}
                </div>
                <p className="mt-2 text-sm text-ink-200">{p.content}</p>
                <div className="mt-2 flex gap-4 text-[11px] text-ink-500">
                  <span>❤️ {p.likes}</span>
                  <span>🔁 {p.shares}</span>
                  <span className="badge bg-white/5 text-ink-300">{p.emotion}</span>
                  <span className="badge bg-white/5 text-ink-300">{p.topic}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Proyek Penelitian" subtitle="Layer 4 — Research Workspace">
          <div className="overflow-hidden rounded-xl border border-white/5">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-xs text-ink-400">
                <tr>
                  <th className="px-3 py-2 text-left">Proyek</th>
                  <th className="px-3 py-2 text-right">Posting</th>
                  <th className="px-3 py-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((pr) => (
                  <tr key={pr.id} className="border-t border-white/5">
                    <td className="px-3 py-2">
                      <div className="text-ink-100">{pr.name}</div>
                      <div className="text-[11px] text-ink-500">
                        {pr.coders} kolaborator · diperbarui {pr.updated}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right text-ink-300">
                      {fmt(pr.posts)}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className="badge bg-brand-600/20 text-brand-200">
                        {pr.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
