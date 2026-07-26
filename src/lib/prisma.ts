import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getPrisma(): PrismaClient {
  if (!hasDatabaseUrl()) {
    throw new Error(
      "DATABASE_URL is not set. Add your Neon pooled connection string to .env / Vercel env."
    );
  }

  if (!globalForPrisma.prisma) {
    const adapter = new PrismaNeon({
      connectionString: process.env.DATABASE_URL!,
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
