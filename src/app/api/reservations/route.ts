import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createReservation, getReservations } from "@/lib/data";
import { checkRateLimit, getClientIp, recordRateLimitHit } from "@/lib/rate-limit";
import type { CreateReservationInput } from "@/lib/types";

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const reservations = await getReservations();
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("[api/reservations GET]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Rezervasyonlar yüklenemedi.") },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateKey = `reservation:${ip}`;

  try {
    const limit = await checkRateLimit(rateKey);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Çok fazla rezervasyon denemesi. Lütfen daha sonra tekrar deneyin." },
        { status: 429 },
      );
    }
    await recordRateLimitHit(rateKey);

    const body = (await request.json()) as CreateReservationInput;
    const required = ["firstName", "lastName", "email", "phone", "date", "time", "guests"] as const;
    for (const field of required) {
      if (body[field] == null || body[field] === "") {
        return NextResponse.json({ error: `Eksik alan: ${field}` }, { status: 400 });
      }
    }
    const reservation = await createReservation({
      ...body,
      guests: Number(body.guests),
    });
    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("[api/reservations POST]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Rezervasyon oluşturulamadı.") },
      { status: 500 }
    );
  }
}
