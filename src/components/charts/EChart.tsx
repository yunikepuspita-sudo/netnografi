"use client";

import dynamic from "next/dynamic";
import type { EChartsOption } from "echarts";

// echarts-for-react + ekstensi wordcloud hanya boleh dimuat di sisi klien
// (echarts-wordcloud mengakses `window` saat diimpor).
const ReactECharts = dynamic(
  async () => {
    await import("echarts-wordcloud");
    return import("echarts-for-react");
  },
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full min-h-[240px] w-full place-items-center text-xs text-ink-500">
        Memuat grafik…
      </div>
    ),
  }
);

export default function EChart({
  option,
  height = 320,
  className = "",
}: {
  option: EChartsOption;
  height?: number;
  className?: string;
}) {
  return (
    <ReactECharts
      option={option}
      style={{ height, width: "100%" }}
      className={className}
      opts={{ renderer: "canvas" }}
      notMerge
    />
  );
}
