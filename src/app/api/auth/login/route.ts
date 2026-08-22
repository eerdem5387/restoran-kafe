import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";
import { checkRateLimit, clearRateLimit, getClientIp, recordRateLimitHit, sleep } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateKey = `login:${ip}`;

  try {
    const limit = await checkRateLimit(rateKey);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Çok fazla deneme. Lütfen daha sonra tekrar deneyin." },
        {
          status: 429,
          headers: limit.retryAfterSec
            ? { "Retry-After": String(limit.retryAfterSec) }
            : undefined,
        },
      );
    }

    const body = (await request.json()) as { password?: string };
    const password = body.password ?? "";

    if (!password || !verifyPassword(password)) {
      await recordRateLimitHit(rateKey);
      await sleep(750 + Math.floor(Math.random() * 500));
      return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
    }

    await clearRateLimit(rateKey);
    await createSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/auth/login]", error);
    return NextResponse.json({ error: "Giriş başarısız." }, { status: 500 });
  }
}
