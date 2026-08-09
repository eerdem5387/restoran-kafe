import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createMenuItem, getMenuItems } from "@/lib/data";
import type { CreateMenuItemInput } from "@/lib/types";

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function GET() {
  try {
    const items = await getMenuItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error("[api/menu GET]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Menü yüklenemedi.") },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as CreateMenuItemInput;
    if (!body.name || !body.description || body.price == null || !body.categoryId) {
      return NextResponse.json({ error: "Eksik alanlar var." }, { status: 400 });
    }
    const item = await createMenuItem(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("[api/menu POST]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Ürün eklenemedi.") },
      { status: 500 }
    );
  }
}
