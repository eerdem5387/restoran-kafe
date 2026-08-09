/** Compress an image file to a JPEG File for Vercel Blob upload (max ~1200px). */
export async function fileToOptimizedJpeg(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Yalnızca görsel dosyaları yüklenebilir.");
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Görsel 8 MB'dan küçük olmalı.");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await loadImage(objectUrl);
    const maxSide = 1200;
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Görsel işlenemedi.");
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) reject(new Error("Görsel sıkıştırılamadı."));
          else resolve(result);
        },
        "image/jpeg",
        0.82
      );
    });

    if (blob.size > 3.5 * 1024 * 1024) {
      throw new Error("Görsel çok büyük. Daha küçük bir fotoğraf deneyin.");
    }

    const baseName = file.name.replace(/\.[^.]+$/, "") || "menu-item";
    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Görsel okunamadı."));
    img.src = src;
  });
}
