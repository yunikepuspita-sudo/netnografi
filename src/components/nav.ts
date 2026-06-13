export interface NavItem {
  href: string;
  label: string;
  icon: string; // emoji ringan agar tanpa dependensi ikon
  layer?: string;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/pengumpulan-data", label: "Pengumpulan Data", icon: "🛰️", layer: "Layer 1" },
  { href: "/pembersihan", label: "Pembersihan Data", icon: "🧹", layer: "Layer 2" },
  { href: "/analisis", label: "AI Netnography Engine", icon: "🧠", layer: "Layer 3" },
  { href: "/komunitas", label: "Deteksi Komunitas", icon: "🕸️", layer: "Layer 3" },
  { href: "/coding", label: "Coding Workspace", icon: "🏷️", layer: "Layer 4" },
  { href: "/visualisasi", label: "Visualisasi", icon: "📈", layer: "Layer 5" },
  { href: "/pemilu", label: "Election Monitor", icon: "🗳️", layer: "Modul KPU" },
  { href: "/laporan", label: "Output & Laporan", icon: "📄", layer: "Layer 6" },
  { href: "/asisten", label: "AI Research Assistant", icon: "✨", layer: "Premium" },
];
