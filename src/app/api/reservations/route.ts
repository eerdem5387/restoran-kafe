import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createReservation, getReservations } from "@/lib/data";
import type { CreateReservationInput } from "@/lib/types";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const reservations = await getReservations();
  return NextResponse.json(reservations);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateReservationInput;
    const required = ["firstName", "lastName", "email", "phone", "date", "time", "guests"] as const;
    for (const field of required) {
      if (body[field] == null || body[field] === "") {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }
    const reservation = await createReservation({
      ...body,
      guests: Number(body.guests),
    });
    return NextResponse.json(reservation, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
  }
}
