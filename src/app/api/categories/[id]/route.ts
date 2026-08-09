import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteCategory, updateCategory } from "@/lib/data";
import type { CreateCategoryInput } from "@/lib/types";

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
    const body = (await request.json()) as Partial<CreateCategoryInput>;
    if (body.name !== undefined && !body.name.trim()) {
      return NextResponse.json({ error: "Kategori adı gerekli." }, { status: 400 });
    }
    const category = await updateCategory(id, body);
    if (!category) {
      return NextResponse.json({ error: "Kategori bulunamadı." }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error("[api/categories PUT]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Kategori güncellenemedi.") },
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
    const deleted = await deleteCategory(id);
    if (!deleted) {
      return NextResponse.json({ error: "Kategori bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/categories DELETE]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Kategori silinemedi.") },
      { status: 500 }
    );
  }
}
