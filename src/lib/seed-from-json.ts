import { promises as fs } from "fs";
import path from "path";
import { getPrisma } from "@/lib/prisma";
import type { MenuItem, Reservation } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");

let seedingPromise: Promise<void> | null = null;

function toDbCategory(category: string) {
  return category.replace(/-/g, "_") as
    | "coffee_tea"
    | "main_courses"
    | "desserts"
    | "starters";
}

async function seedOnce(): Promise<void> {
  const prisma = getPrisma();
  const menuCount = await prisma.menuItem.count();
  if (menuCount === 0) {
    const raw = await fs.readFile(path.join(DATA_DIR, "menu.json"), "utf-8");
    const items = JSON.parse(raw) as MenuItem[];
    if (items.length > 0) {
      await prisma.menuItem.createMany({
        data: items.map((item) => ({
          name: item.name,
          description: item.description,
          price: item.price,
          category: toDbCategory(item.category),
          tags: item.tags ?? [],
          featured: item.featured ?? false,
          available: item.available ?? true,
          image: item.image ?? null,
        })),
      });
    }
  }

  const reservationCount = await prisma.reservation.count();
  if (reservationCount > 0) return;

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

/**
 * If the remote DB has no menu rows yet, copy seed data from data/*.json once.
 * Safe to call on every request — no-ops when data already exists.
 */
export async function ensureDatabaseSeeded(): Promise<void> {
  if (!seedingPromise) {
    seedingPromise = seedOnce().finally(() => {
      seedingPromise = null;
    });
  }
  await seedingPromise;
}
