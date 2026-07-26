import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createMenuItem, getMenuItems } from "@/lib/data";
import type { CreateMenuItemInput } from "@/lib/types";

export async function GET() {
  const items = await getMenuItems();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as CreateMenuItemInput;
    if (!body.name || !body.description || body.price == null || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const item = await createMenuItem(body);
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}
