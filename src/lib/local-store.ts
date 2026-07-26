import { promises as fs } from "fs";
import path from "path";
import type {
  CreateMenuItemInput,
  CreateReservationInput,
  MenuItem,
  Reservation,
  ReservationStatus,
} from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const MENU_FILE = path.join(DATA_DIR, "menu.json");
const RESERVATIONS_FILE = path.join(DATA_DIR, "reservations.json");

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getMenuItemsLocal(): Promise<MenuItem[]> {
  return readJson<MenuItem[]>(MENU_FILE);
}

export async function getMenuItemByIdLocal(id: string): Promise<MenuItem | undefined> {
  const items = await getMenuItemsLocal();
  return items.find((item) => item.id === id);
}

export async function createMenuItemLocal(input: CreateMenuItemInput): Promise<MenuItem> {
  const items = await getMenuItemsLocal();
  const item: MenuItem = {
    id: crypto.randomUUID(),
    name: input.name,
    description: input.description,
    price: input.price,
    category: input.category,
    tags: input.tags ?? [],
    featured: input.featured ?? false,
    available: input.available ?? true,
    image: input.image,
  };
  items.push(item);
  await writeJson(MENU_FILE, items);
  return item;
}

export async function updateMenuItemLocal(
  id: string,
  updates: Partial<CreateMenuItemInput>
): Promise<MenuItem | null> {
  const items = await getMenuItemsLocal();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...updates,
    tags: updates.tags ?? items[index].tags,
  };
  await writeJson(MENU_FILE, items);
  return items[index];
}

export async function deleteMenuItemLocal(id: string): Promise<boolean> {
  const items = await getMenuItemsLocal();
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson(MENU_FILE, filtered);
  return true;
}

export async function getReservationsLocal(): Promise<Reservation[]> {
  const reservations = await readJson<Reservation[]>(RESERVATIONS_FILE);
  return reservations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createReservationLocal(
  input: CreateReservationInput
): Promise<Reservation> {
  const reservations = await readJson<Reservation[]>(RESERVATIONS_FILE);
  const reservation: Reservation = {
    id: crypto.randomUUID(),
    ...input,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  reservations.push(reservation);
  await writeJson(RESERVATIONS_FILE, reservations);
  return reservation;
}

export async function updateReservationStatusLocal(
  id: string,
  status: ReservationStatus
): Promise<Reservation | null> {
  const reservations = await readJson<Reservation[]>(RESERVATIONS_FILE);
  const index = reservations.findIndex((r) => r.id === id);
  if (index === -1) return null;
  reservations[index] = { ...reservations[index], status };
  await writeJson(RESERVATIONS_FILE, reservations);
  return reservations[index];
}

export async function deleteReservationLocal(id: string): Promise<boolean> {
  const reservations = await readJson<Reservation[]>(RESERVATIONS_FILE);
  const filtered = reservations.filter((r) => r.id !== id);
  if (filtered.length === reservations.length) return false;
  await writeJson(RESERVATIONS_FILE, filtered);
  return true;
}
