import { getStoreMode } from "@/lib/store-mode";

export function AdminStorageBanner() {
  const mode = getStoreMode();
  if (mode !== "read-only") return null;

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
