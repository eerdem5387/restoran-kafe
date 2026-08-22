import { getPrisma, hasDatabaseUrl } from "@/lib/prisma";

const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSec?: number;
};

function getMemoryBucket(key: string, windowMs: number): RateLimitResult {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    memoryBuckets.set(key, { count: 0, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (bucket.count >= getMaxForKey(key)) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  return { allowed: true };
}

function incrementMemory(key: string, windowMs: number): void {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  bucket.count += 1;
}

function clearMemory(key: string): void {
  memoryBuckets.delete(key);
}

function getMaxForKey(key: string): number {
  if (key.startsWith("login:")) return 5;
  if (key.startsWith("reservation:")) return 8;
  return 10;
}

function getWindowMsForKey(key: string): number {
  if (key.startsWith("login:")) return 15 * 60 * 1000;
  if (key.startsWith("reservation:")) return 60 * 60 * 1000;
  return 15 * 60 * 1000;
}

async function getDbBucket(key: string): Promise<{ count: number; resetAt: Date } | null> {
  if (!hasDatabaseUrl()) return null;

  try {
    return await getPrisma().rateLimitBucket.findUnique({ where: { key } });
  } catch {
    return null;
  }
}

export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  const windowMs = getWindowMsForKey(key);
  const max = getMaxForKey(key);
  const now = Date.now();

  const dbBucket = await getDbBucket(key);
  if (dbBucket) {
    if (dbBucket.resetAt.getTime() <= now) {
      return { allowed: true };
    }
    if (dbBucket.count >= max) {
      return {
        allowed: false,
        retryAfterSec: Math.ceil((dbBucket.resetAt.getTime() - now) / 1000),
      };
    }
    return { allowed: true };
  }

  return getMemoryBucket(key, windowMs);
}

export async function recordRateLimitHit(key: string): Promise<void> {
  const windowMs = getWindowMsForKey(key);
  const now = Date.now();

  if (hasDatabaseUrl()) {
    try {
      const existing = await getPrisma().rateLimitBucket.findUnique({ where: { key } });

      if (!existing || existing.resetAt.getTime() <= now) {
        await getPrisma().rateLimitBucket.upsert({
          where: { key },
          create: { key, count: 1, resetAt: new Date(now + windowMs) },
          update: { count: 1, resetAt: new Date(now + windowMs) },
        });
        return;
      }

      await getPrisma().rateLimitBucket.update({
        where: { key },
        data: { count: { increment: 1 } },
      });
      return;
    } catch {
      // fall through to memory store
    }
  }

  incrementMemory(key, windowMs);
}

export async function clearRateLimit(key: string): Promise<void> {
  if (hasDatabaseUrl()) {
    try {
      await getPrisma().rateLimitBucket.delete({ where: { key } }).catch(() => undefined);
    } catch {
      // ignore
    }
  }
  clearMemory(key);
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
