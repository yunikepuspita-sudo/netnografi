export const metadata = { title: "Offline — NETRA AI" };

export default function Offline() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <div className="text-5xl">📡</div>
        <h1 className="mt-4 text-xl font-bold text-white">Anda sedang offline</h1>
        <p className="mt-2 max-w-md text-sm text-ink-400">
          NETRA AI adalah PWA offline-first. Halaman yang pernah dibuka tetap
          dapat diakses. Sambungkan kembali ke internet untuk memuat data terbaru
          dan menjalankan crawler.
        </p>
      </div>
    </div>
  );
}
