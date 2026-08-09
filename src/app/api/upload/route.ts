import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN tanımlı değil. Vercel Blob store oluşturup token'ı Environment Variables'a ekleyin.",
      },
      { status: 503 }
    );
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Dosya gerekli." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Yalnızca görsel yüklenebilir." }, { status: 400 });
    }

    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "Görsel 4 MB'dan küçük olmalı." }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase() || "image.jpg";
    const blob = await put(`menu/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type || "image/jpeg",
    });

    return NextResponse.json({ url: blob.url, pathname: blob.pathname });
  } catch (error) {
    console.error("[api/upload POST]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Görsel yüklenemedi.") },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ success: true });
  }

  try {
    const body = (await request.json()) as { url?: string };
    if (!body.url || !body.url.includes("blob.vercel-storage.com")) {
      return NextResponse.json({ success: true });
    }
    await del(body.url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/upload DELETE]", error);
    return NextResponse.json(
      { error: errorMessage(error, "Görsel silinemedi.") },
      { status: 500 }
    );
  }
}
