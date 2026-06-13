"use client";

import EChart from "./charts/EChart";
import {
  sentimentTrendOption,
  sentimentDonutOption,
  emotionOption,
  platformBarOption,
  topicEvolutionOption,
  wordCloudOption,
  heatmapOption,
  communityGraphOption,
  sankeyOption,
} from "./charts/options";
import { summary } from "@/data/mock";

export type ChartKind =
  | "sentimentTrend"
  | "sentimentDonut"
  | "emotion"
  | "platformBar"
  | "topicEvolution"
  | "wordCloud"
  | "heatmap"
  | "community"
  | "sankey";

export default function ChartBlock({
  kind,
  height = 320,
}: {
  kind: ChartKind;
  height?: number;
}) {
  const option = (() => {
    switch (kind) {
      case "sentimentTrend":
        return sentimentTrendOption();
      case "sentimentDonut":
        return sentimentDonutOption(summary.sentiment);
      case "emotion":
        return emotionOption();
      case "platformBar":
        return platformBarOption();
      case "topicEvolution":
        return topicEvolutionOption();
      case "wordCloud":
        return wordCloudOption();
      case "heatmap":
        return heatmapOption();
      case "community":
        return communityGraphOption();
      case "sankey":
        return sankeyOption();
    }
  })();

  return <EChart option={option} height={height} />;
}
