import Panel from "@/components/Panel";
import ChartBlock from "@/components/ChartBlock";

export default function Visualisasi() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-ink-400">
        Layer 5 — dasbor visualisasi interaktif (Apache ECharts). Mencakup tren,
        evolusi topik, jaringan komunitas, heatmap wilayah, word cloud, dan
        Sankey tema → narasi → sentimen.
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Sentiment Trend" subtitle="Line chart">
          <ChartBlock kind="sentimentTrend" height={300} />
        </Panel>
        <Panel title="Topic Evolution" subtitle="Timeline (stacked area)">
          <ChartBlock kind="topicEvolution" height={300} />
        </Panel>
      </div>

      <Panel title="Heatmap — Provinsi vs Metrik Sentimen" subtitle="Skor sentimen bersih per wilayah">
        <ChartBlock kind="heatmap" height={360} />
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Word Cloud" subtitle="Top keywords">
          <ChartBlock kind="wordCloud" height={340} />
        </Panel>
        <Panel title="Community Network" subtitle="Network graph">
          <ChartBlock kind="community" height={340} />
        </Panel>
      </div>

      <Panel title="Sankey Diagram" subtitle="Tema → Narasi → Sentimen">
        <ChartBlock kind="sankey" height={380} />
      </Panel>
    </div>
  );
}
