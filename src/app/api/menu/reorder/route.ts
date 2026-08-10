import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { reorderMenuItems } from "@/lib/data";

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { orderedIds?: string[] };
    if (!Array.isArray(body.orderedIds) || body.orderedIds.length === 0) {
      return NextResponse.json({ error: "Sıralama listesi gerekli." }, { status: 400 });
    }
    const items = await reorderMenuItems(body.orderedIds);
    return NextResponse.json(items);
  } catch (error) {
    console.error("[api/menu/reorder PUT]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Sıralama kaydedilemedi.") },
      { status: 500 }
    );
  }
}
