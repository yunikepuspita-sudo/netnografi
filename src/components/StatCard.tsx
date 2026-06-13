export default function StatCard({
  label,
  value,
  delta,
  icon,
  tone = "brand",
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: string;
  tone?: "brand" | "green" | "amber" | "red";
}) {
  const toneMap: Record<string, string> = {
    brand: "from-brand-500/20 to-brand-700/10 text-brand-200",
    green: "from-emerald-500/20 to-emerald-700/10 text-emerald-200",
    amber: "from-amber-500/20 to-amber-700/10 text-amber-200",
    red: "from-rose-500/20 to-rose-700/10 text-rose-200",
  };
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-ink-400">{label}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
        {icon && (
          <div
            className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-lg ${toneMap[tone]}`}
          >
            {icon}
          </div>
        )}
      </div>
      {delta && <p className="mt-2 text-xs text-ink-400">{delta}</p>}
    </div>
  );
}
