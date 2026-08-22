import { promises as fs } from "fs";
import path from "path";
import { getPrisma } from "@/lib/prisma";
import type { Category, MenuItem, Reservation } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");

let seedingPromise: Promise<void> | null = null;

async function seedOnce(): Promise<void> {
  const prisma = getPrisma();

  const [categoryCount, menuCount] = await Promise.all([
    prisma.category.count(),
    prisma.menuItem.count(),
  ]);

  // Fresh database only — never re-seed after the admin clears products.
  const isFreshDatabase = categoryCount === 0 && menuCount === 0;
  if (!isFreshDatabase) {
    if (categoryCount === 0) {
      const raw = await fs.readFile(path.join(DATA_DIR, "categories.json"), "utf-8");
      const categories = JSON.parse(raw) as Category[];
      if (categories.length > 0) {
        await prisma.category.createMany({
          data: categories.map((c) => ({
            id: c.id,
            name: c.name,
            nameEn: c.nameEn ?? "",
            nameAr: c.nameAr ?? "",
            description: c.description,
            descriptionEn: c.descriptionEn ?? "",
            descriptionAr: c.descriptionAr ?? "",
            sortOrder: c.sortOrder,
          })),
        });
      }
    }
    return;
  }

  const categoryRaw = await fs.readFile(path.join(DATA_DIR, "categories.json"), "utf-8");
  const categories = JSON.parse(categoryRaw) as Category[];
  if (categories.length > 0) {
    await prisma.category.createMany({
      data: categories.map((c) => ({
        id: c.id,
        name: c.name,
        nameEn: c.nameEn ?? "",
        nameAr: c.nameAr ?? "",
        description: c.description,
        descriptionEn: c.descriptionEn ?? "",
        descriptionAr: c.descriptionAr ?? "",
        sortOrder: c.sortOrder,
      })),
    });
  }

  const menuRaw = await fs.readFile(path.join(DATA_DIR, "menu.json"), "utf-8");
  const items = JSON.parse(menuRaw) as MenuItem[];
  if (items.length > 0) {
      await prisma.menuItem.createMany({
        data: items.map((item, index) => ({
          name: item.name,
          nameEn: item.nameEn ?? "",
          nameAr: item.nameAr ?? "",
          description: item.description,
          price: item.price,
          categoryId: item.categoryId,
          tags: item.tags ?? [],
          tagsEn: item.tagsEn ?? [],
          tagsAr: item.tagsAr ?? [],
          featured: item.featured ?? false,
          available: item.available ?? true,
          image: item.image ?? null,
          sortOrder: item.sortOrder ?? index,
        })),
      });
  }

  try {
    const reservationRaw = await fs.readFile(
      path.join(DATA_DIR, "reservations.json"),
      "utf-8"
    );
    const reservations = JSON.parse(reservationRaw) as Reservation[];
    if (reservations.length === 0) return;

    await prisma.reservation.createMany({
      data: reservations.map((r) => ({
        firstName: r.firstName,
        lastName: r.lastName,
        email: r.email,
        phone: r.phone,
        date: new Date(`${r.date}T00:00:00.000Z`),
        time: r.time,
        guests: r.guests,
        specialRequests: r.specialRequests ?? null,
        status: r.status,
      })),
    });
  } catch {
    // reservations.json optional
  }
}

export async function ensureDatabaseSeeded(): Promise<void> {
  if (!seedingPromise) {
    seedingPromise = seedOnce().finally(() => {
      seedingPromise = null;
    });
  }
  await seedingPromise;
}
