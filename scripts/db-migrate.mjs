import { spawnSync } from "node:child_process";

const candidates = [
  process.env.DIRECT_URL,
  process.env.DATABASE_URL_UNPOOLED,
  process.env.POSTGRES_URL_NON_POOLING,
  process.env.DATABASE_URL,
  process.env.POSTGRES_PRISMA_URL,
  process.env.POSTGRES_URL,
].filter(Boolean);

const url = candidates[0] ?? "";

function isRemoteDatabase(connectionString) {
  if (!connectionString.trim()) return false;
  const lower = connectionString.toLowerCase();
  if (lower.includes("localhost") || lower.includes("127.0.0.1")) return false;
  if (lower.includes("user:password@")) return false;
  return true;
}

if (!isRemoteDatabase(url)) {
  console.log(
    "[db-migrate] Skipping prisma migrate deploy — set DATABASE_URL (and ideally DIRECT_URL) to your Neon connection string in Vercel env."
  );
  process.exit(0);
}

console.log("[db-migrate] Running prisma migrate deploy…");
const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
