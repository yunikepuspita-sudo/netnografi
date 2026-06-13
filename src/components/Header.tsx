"use client";

import { usePathname } from "next/navigation";
import { navItems } from "./nav";

export default function Header() {
  const pathname = usePathname();
  const current =
    navItems.find((n) =>
      n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)
    ) ?? navItems[0];

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/5 bg-ink-950/80 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="pl-10 lg:pl-0">
        <h1 className="text-base font-semibold text-white sm:text-lg">
          {current.icon} {current.label}
        </h1>
        {current.layer && (
          <p className="text-[11px] text-ink-400">{current.layer}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-ink-900 px-3 py-1.5 text-xs text-ink-300 sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Crawler aktif
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-bold text-white">
          YP
        </div>
      </div>
    </header>
  );
}
