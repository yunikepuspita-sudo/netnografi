import type { EChartsOption } from "echarts";
import {
  sentimentTrend,
  topicEvolution,
  wordCloud,
  provinces,
  heatmapMetrics,
  heatmapData,
  graphNodes,
  graphLinks,
  graphCategories,
  sankey,
  emotions,
  platformCounts,
} from "@/data/mock";

export const palette = [
  "#327dff", "#22c55e", "#f59e0b", "#ef4444", "#a855f7",
  "#06b6d4", "#ec4899", "#84cc16",
];

const base = {
  textStyle: { color: "#aeb7c8", fontFamily: "inherit" },
  grid: { left: 40, right: 20, top: 40, bottom: 30 },
  tooltip: {
    backgroundColor: "#1f2433",
    borderColor: "#373e50",
    textStyle: { color: "#eceef2" },
  },
};

const axisStyle = {
  axisLine: { lineStyle: { color: "#373e50" } },
  splitLine: { lineStyle: { color: "#262b38" } },
  axisLabel: { color: "#8290a8" },
};

export function sentimentTrendOption(): EChartsOption {
  return {
    ...base,
    color: ["#22c55e", "#8290a8", "#ef4444"],
    legend: { top: 0, textStyle: { color: "#aeb7c8" } },
    tooltip: { ...base.tooltip, trigger: "axis" },
    xAxis: { type: "category", data: sentimentTrend.dates, ...axisStyle },
    yAxis: { type: "value", max: 100, ...axisStyle },
    series: [
      { name: "Positif", type: "line", smooth: true, areaStyle: { opacity: 0.12 }, data: sentimentTrend.positif },
      { name: "Netral", type: "line", smooth: true, data: sentimentTrend.netral },
      { name: "Negatif", type: "line", smooth: true, areaStyle: { opacity: 0.12 }, data: sentimentTrend.negatif },
    ],
  };
}

export function sentimentDonutOption(s: { positif: number; netral: number; negatif: number }): EChartsOption {
  return {
    ...base,
    color: ["#22c55e", "#8290a8", "#ef4444"],
    tooltip: { ...base.tooltip, trigger: "item", formatter: "{b}: {c}%" },
    legend: { bottom: 0, textStyle: { color: "#aeb7c8" } },
    series: [
      {
        type: "pie",
        radius: ["55%", "78%"],
        center: ["50%", "44%"],
        avoidLabelOverlap: false,
        label: { show: false },
        data: [
          { name: "Positif", value: s.positif },
          { name: "Netral", value: s.netral },
          { name: "Negatif", value: s.negatif },
        ],
      },
    ],
  };
}

export function emotionOption(): EChartsOption {
  return {
    ...base,
    color: palette,
    tooltip: { ...base.tooltip, trigger: "item", formatter: "{b}: {c}%" },
    radar: {
      indicator: emotions.map((e) => ({ name: e.name, max: 30 })),
      axisName: { color: "#aeb7c8" },
      splitLine: { lineStyle: { color: "#262b38" } },
      splitArea: { areaStyle: { color: ["#171b26", "#1c212e"] } },
      axisLine: { lineStyle: { color: "#373e50" } },
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: emotions.map((e) => e.value),
            name: "Emosi (%)",
            areaStyle: { opacity: 0.2 },
            lineStyle: { color: "#327dff" },
            itemStyle: { color: "#327dff" },
          },
        ],
      },
    ],
  };
}

export function platformBarOption(): EChartsOption {
  const sorted = [...platformCounts].sort((a, b) => a.value - b.value);
  return {
    ...base,
    grid: { left: 90, right: 30, top: 10, bottom: 20 },
    color: ["#327dff"],
    tooltip: { ...base.tooltip, trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: { type: "value", ...axisStyle },
    yAxis: { type: "category", data: sorted.map((p) => p.name), ...axisStyle },
    series: [
      {
        type: "bar",
        data: sorted.map((p) => p.value),
        itemStyle: { borderRadius: [0, 6, 6, 0] },
        barWidth: "60%",
      },
    ],
  };
}

export function topicEvolutionOption(): EChartsOption {
  return {
    ...base,
    color: palette,
    legend: { top: 0, type: "scroll", textStyle: { color: "#aeb7c8" } },
    tooltip: { ...base.tooltip, trigger: "axis" },
    xAxis: { type: "category", boundaryGap: false, data: topicEvolution.dates, ...axisStyle },
    yAxis: { type: "value", ...axisStyle },
    series: topicEvolution.series.map((s) => ({
      name: s.name,
      type: "line",
      stack: "total",
      smooth: true,
      areaStyle: { opacity: 0.25 },
      emphasis: { focus: "series" },
      data: s.data,
    })),
  };
}

export function wordCloudOption(): EChartsOption {
  // tipe "wordCloud" disediakan oleh ekstensi echarts-wordcloud yang
  // tidak ada di union SeriesOption bawaan, sehingga seri di-cast.
  const wordCloudSeries = {
    type: "wordCloud",
    shape: "circle",
    width: "100%",
    height: "100%",
    sizeRange: [12, 56],
    rotationRange: [-45, 45],
    gridSize: 8,
    drawOutOfBound: false,
    textStyle: {
      color: () => palette[Math.floor(Math.random() * palette.length)],
    },
    emphasis: { textStyle: { fontWeight: "bold" } },
    data: wordCloud,
  };
  return {
    tooltip: { ...base.tooltip },
    series: [wordCloudSeries] as unknown as EChartsOption["series"],
  };
}

export function heatmapOption(): EChartsOption {
  return {
    ...base,
    grid: { left: 90, right: 20, top: 20, bottom: 70 },
    tooltip: {
      ...base.tooltip,
      position: "top",
      formatter: (p: any) =>
        `${provinces[p.data[0]]} · ${heatmapMetrics[p.data[1]]}<br/>Skor: ${p.data[2]}`,
    },
    xAxis: {
      type: "category",
      data: provinces,
      axisLabel: { color: "#8290a8", rotate: 35, fontSize: 10 },
      axisLine: { lineStyle: { color: "#373e50" } },
      splitArea: { show: true },
    },
    yAxis: {
      type: "category",
      data: heatmapMetrics,
      axisLabel: { color: "#8290a8" },
      axisLine: { lineStyle: { color: "#373e50" } },
      splitArea: { show: true },
    },
    visualMap: {
      min: 20,
      max: 80,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: 0,
      textStyle: { color: "#8290a8" },
      inRange: { color: ["#7f1d1d", "#f59e0b", "#22c55e"] },
    },
    series: [
      {
        type: "heatmap",
        data: heatmapData,
        label: { show: true, color: "#0b1020", fontSize: 10 },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.5)" } },
      },
    ],
  };
}

export function communityGraphOption(): EChartsOption {
  return {
    ...base,
    tooltip: {
      ...base.tooltip,
      formatter: (p: any) =>
        p.dataType === "node"
          ? `${p.data.name}<br/>Peran: ${p.data.role}<br/>Pengaruh: ${p.data.value}`
          : "",
    },
    legend: [
      {
        data: graphCategories.map((c) => c.name),
        textStyle: { color: "#aeb7c8" },
        top: 0,
      },
    ],
    color: palette,
    series: [
      {
        type: "graph",
        layout: "force",
        roam: true,
        draggable: true,
        categories: graphCategories,
        label: { show: true, color: "#eceef2", position: "right", fontSize: 10 },
        force: { repulsion: 220, edgeLength: [60, 140], gravity: 0.08 },
        lineStyle: { color: "#3a4252", curveness: 0.15, opacity: 0.7 },
        emphasis: { focus: "adjacency", lineStyle: { width: 3 } },
        data: graphNodes,
        links: graphLinks,
      },
    ],
  };
}

export function sankeyOption(): EChartsOption {
  return {
    ...base,
    tooltip: { ...base.tooltip, trigger: "item", triggerOn: "mousemove" },
    series: [
      {
        type: "sankey",
        emphasis: { focus: "adjacency" },
        nodeAlign: "left",
        data: sankey.nodes,
        links: sankey.links,
        lineStyle: { color: "gradient", opacity: 0.4 },
        label: { color: "#d4d9e2", fontSize: 11 },
        itemStyle: { borderWidth: 0, color: "#327dff" },
      },
    ],
  };
}
