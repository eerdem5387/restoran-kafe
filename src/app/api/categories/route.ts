import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createCategory, getCategories } from "@/lib/data";
import type { CreateCategoryInput } from "@/lib/types";

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("[api/categories GET]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Kategoriler yüklenemedi.") },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as CreateCategoryInput;
    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Kategori adı gerekli." }, { status: 400 });
    }
    const category = await createCategory(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("[api/categories POST]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Kategori eklenemedi.") },
      { status: 500 }
    );
  }
}
