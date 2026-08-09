import { hasDatabaseUrl } from "@/lib/prisma";

/** Local JSON writes work on a real filesystem; Vercel serverless is read-only. */
export function canPersistLocally(): boolean {
  return !process.env.VERCEL;
}

export function assertMutableStore(): void {
  if (hasDatabaseUrl()) return;
  if (canPersistLocally()) return;

  throw new Error(
    "Veritabanı bağlı değil. Vercel'de menü/rezervasyon düzenlemek için DATABASE_URL (Neon) ekleyin."
  );
}

export function getStoreMode(): "database" | "local" | "read-only" {
  if (hasDatabaseUrl()) return "database";
  if (canPersistLocally()) return "local";
  return "read-only";
}
