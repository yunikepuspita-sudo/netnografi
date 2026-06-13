import type { Metadata, Viewport } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "NETRA AI — Netnography Research & Analytics",
  description:
    "Platform netnografi end-to-end: crawling → coding → analisis AI → visualisasi → publikasi ilmiah.",
  manifest: "/manifest.webmanifest",
  applicationName: "NETRA AI",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NETRA AI",
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a5cf5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <ServiceWorkerRegister />
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Header />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </main>
            <footer className="border-t border-white/5 px-6 py-4 text-center text-xs text-ink-500">
              NETRA AI · Netnography Research &amp; Analytics — prototipe PWA untuk
              riset akademik. Data yang ditampilkan bersifat ilustratif.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
