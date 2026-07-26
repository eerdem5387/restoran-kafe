import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function hasDatabaseUrl(): boolean {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    "";
  if (!url.trim()) return false;
  const lower = url.toLowerCase();
  if (lower.includes("localhost") || lower.includes("127.0.0.1")) return false;
  if (lower.includes("user:password@")) return false;
  return true;
}

function resolveDatabaseUrl(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    "";
  if (!url.trim()) {
    throw new Error(
      "DATABASE_URL is not set. Add your Neon pooled connection string to .env / Vercel env."
    );
  }
  return url;
}

export function getPrisma(): PrismaClient {
  if (!hasDatabaseUrl()) {
    throw new Error(
      "DATABASE_URL is not set. Add your Neon pooled connection string to .env / Vercel env."
    );
  }

  if (!globalForPrisma.prisma) {
    const adapter = new PrismaNeon({
      connectionString: resolveDatabaseUrl(),
    });
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }

  return globalForPrisma.prisma;
}

/**
 * @deprecated Prefer getPrisma() after checking hasDatabaseUrl().
 * Kept as a lazy proxy for scripts that already import `prisma`.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrisma();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
