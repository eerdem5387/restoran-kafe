import { getStoreMode } from "@/lib/store-mode";

export function AdminStorageBanner() {
  const mode = getStoreMode();

  if (mode === "database") {
    return (
      <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950 sm:px-5">
        <p className="font-semibold">Veritabanı bağlı (Neon)</p>
        <p className="mt-1 text-emerald-900/80">
          Menü, kategori ve rezervasyon değişiklikleri kalıcı olarak kaydedilir.
        </p>
      </div>
    );
  }

  if (mode === "local") {
    return (
      <div className="mb-6 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950 sm:px-5">
        <p className="font-semibold">Yerel JSON modu</p>
        <p className="mt-1">
          Değişiklikler <code className="text-xs">data/*.json</code> dosyalarına yazılır. Canlıda
          Neon <code className="text-xs">DATABASE_URL</code> kullanın.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 sm:px-5">
      <p className="font-semibold">Veritabanı bağlı değil</p>
      <p className="mt-1 leading-relaxed">
        Canlı ortamda menü ve rezervasyon düzenlemek için Vercel → Settings → Environment
        Variables altına Neon bağlantısını ekleyin: <code className="text-xs">DATABASE_URL</code>{" "}
        (pooler) ve <code className="text-xs">DIRECT_URL</code> (direct). Sonra yeniden deploy
        edin.
      </p>
    </div>
  );
}
