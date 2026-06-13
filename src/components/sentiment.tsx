import type { Sentiment } from "@/data/mock";

export function sentimentBadge(s: Sentiment) {
  const map: Record<Sentiment, string> = {
    positif: "bg-emerald-500/15 text-emerald-300",
    netral: "bg-ink-500/20 text-ink-300",
    negatif: "bg-rose-500/15 text-rose-300",
  };
  const label: Record<Sentiment, string> = {
    positif: "Positif",
    netral: "Netral",
    negatif: "Negatif",
  };
  return <span className={`badge ${map[s]}`}>{label[s]}</span>;
}
