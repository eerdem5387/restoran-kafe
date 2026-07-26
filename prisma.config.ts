import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prefer a direct (non-pooled) URL for migrations.
 * Fallbacks cover Neon + Vercel marketplace variable names.
 */
const datasourceUrl =
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL ||
  // Placeholder only for `prisma generate` when no DB is configured yet
  "postgresql://user:password@localhost:5432/larome?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: datasourceUrl,
  },
});
