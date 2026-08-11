import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getMenuEnabled, setMenuEnabled } from "@/lib/data";

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function GET() {
  try {
    const menuEnabled = await getMenuEnabled();
    return NextResponse.json({ menuEnabled });
  } catch (error) {
    console.error("[api/settings/menu GET]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Menü durumu alınamadı.") },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { menuEnabled?: boolean };
    if (typeof body.menuEnabled !== "boolean") {
      return NextResponse.json({ error: "menuEnabled gerekli." }, { status: 400 });
    }
    const menuEnabled = await setMenuEnabled(body.menuEnabled);
    return NextResponse.json({ menuEnabled });
  } catch (error) {
    console.error("[api/settings/menu PATCH]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Menü durumu güncellenemedi.") },
      { status: 500 }
    );
  }
}
