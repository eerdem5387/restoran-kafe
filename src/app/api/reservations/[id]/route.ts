import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteReservation, updateReservationStatus } from "@/lib/data";
import type { ReservationStatus } from "@/lib/types";

type Params = { params: Promise<{ id: string }> };

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as { status: ReservationStatus };
    if (!body.status) {
      return NextResponse.json({ error: "Durum gerekli." }, { status: 400 });
    }
    const reservation = await updateReservationStatus(id, body.status);
    if (!reservation) {
      return NextResponse.json({ error: "Rezervasyon bulunamadı." }, { status: 404 });
    }
    return NextResponse.json(reservation);
  } catch (error) {
    console.error("[api/reservations PATCH]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Rezervasyon güncellenemedi.") },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const deleted = await deleteReservation(id);
    if (!deleted) {
      return NextResponse.json({ error: "Rezervasyon bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/reservations DELETE]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Rezervasyon silinemedi.") },
      { status: 500 }
    );
  }
}
