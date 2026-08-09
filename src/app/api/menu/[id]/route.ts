import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteMenuItem, updateMenuItem } from "@/lib/data";
import type { CreateMenuItemInput } from "@/lib/types";

type Params = { params: Promise<{ id: string }> };

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<CreateMenuItemInput>;
    const item = await updateMenuItem(id, body);
    if (!item) {
      return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error("[api/menu PUT]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Ürün güncellenemedi.") },
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
    const deleted = await deleteMenuItem(id);
    if (!deleted) {
      return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/menu DELETE]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Ürün silinemedi.") },
      { status: 500 }
    );
  }
}
