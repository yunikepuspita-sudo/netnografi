"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "./nav";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Tombol toggle mobile */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed left-3 top-3 z-50 rounded-lg border border-white/10 bg-ink-900 p-2 text-ink-200 lg:hidden"
        aria-label="Buka menu"
      >
        <span className="block h-0.5 w-5 bg-current" />
        <span className="mt-1 block h-0.5 w-5 bg-current" />
        <span className="mt-1 block h-0.5 w-5 bg-current" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/5 bg-ink-900/80 backdrop-blur transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-white/5 px-5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-900 text-lg">
            🔭
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-wide text-white">NETRA AI</div>
            <div className="text-[10px] uppercase tracking-widest text-ink-400">
              Netnografi
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`nav-link ${active ? "nav-link-active" : ""}`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.layer && (
                  <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-ink-400">
                    {item.layer}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mx-3 mt-2 rounded-xl border border-brand-500/20 bg-brand-600/10 p-3 text-xs text-ink-300">
          <div className="font-semibold text-brand-200">Offline-first PWA</div>
          <p className="mt-1 text-ink-400">
            Dapat dipasang ke layar utama &amp; diakses tanpa koneksi.
          </p>
        </div>
      </aside>
    </>
  );
}
