import { promises as fs } from "fs";
import path from "path";
import type {
  Category,
  CreateCategoryInput,
  CreateMenuItemInput,
  CreateReservationInput,
  MenuItem,
  Reservation,
  ReservationStatus,
} from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const MENU_FILE = path.join(DATA_DIR, "menu.json");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");
const RESERVATIONS_FILE = path.join(DATA_DIR, "reservations.json");

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getCategoriesLocal(): Promise<Category[]> {
  const categories = await readJson<Category[]>(CATEGORIES_FILE);
  return categories.sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

export async function createCategoryLocal(input: CreateCategoryInput): Promise<Category> {
  const categories = await getCategoriesLocal();
  const category: Category = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    description: (input.description ?? "").trim(),
    sortOrder: input.sortOrder ?? categories.length,
  };
  categories.push(category);
  await writeJson(CATEGORIES_FILE, categories);
  return category;
}

export async function updateCategoryLocal(
  id: string,
  updates: Partial<CreateCategoryInput>
): Promise<Category | null> {
  const categories = await getCategoriesLocal();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  categories[index] = {
    ...categories[index],
    ...(updates.name !== undefined && { name: updates.name.trim() }),
    ...(updates.description !== undefined && { description: updates.description.trim() }),
    ...(updates.sortOrder !== undefined && { sortOrder: updates.sortOrder }),
  };
  await writeJson(CATEGORIES_FILE, categories);
  return categories[index];
}

export async function deleteCategoryLocal(id: string): Promise<boolean> {
  const items = await getMenuItemsLocal();
  if (items.some((item) => item.categoryId === id)) {
    throw new Error("Bu kategoride ürün var. Önce ürünleri silin veya taşıyın.");
  }
  const categories = await getCategoriesLocal();
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length === categories.length) return false;
  const reindexed = filtered
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c, index) => ({ ...c, sortOrder: index }));
  await writeJson(CATEGORIES_FILE, reindexed);
  return true;
}

export async function reorderCategoriesLocal(orderedIds: string[]): Promise<Category[]> {
  const categories = await getCategoriesLocal();
  const byId = new Map(categories.map((c) => [c.id, c]));
  const reordered: Category[] = [];

  orderedIds.forEach((id, index) => {
    const category = byId.get(id);
    if (category) {
      reordered.push({ ...category, sortOrder: index });
      byId.delete(id);
    }
  });

  // Keep any leftover categories at the end
  for (const leftover of byId.values()) {
    reordered.push({ ...leftover, sortOrder: reordered.length });
  }

  await writeJson(CATEGORIES_FILE, reordered);
  return reordered;
}

export async function getMenuItemsLocal(): Promise<MenuItem[]> {
  const [items, categories] = await Promise.all([
    readJson<MenuItem[]>(MENU_FILE),
    getCategoriesLocal(),
  ]);
  const names = new Map(categories.map((c) => [c.id, c.name]));
  const categoryOrder = new Map(categories.map((c) => [c.id, c.sortOrder]));

  return items
    .map((item) => ({
      ...item,
      sortOrder: item.sortOrder ?? 0,
      categoryName: names.get(item.categoryId),
    }))
    .sort((a, b) => {
      const catDiff =
        (categoryOrder.get(a.categoryId) ?? 0) - (categoryOrder.get(b.categoryId) ?? 0);
      if (catDiff !== 0) return catDiff;
      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name);
    });
}

export async function getMenuItemByIdLocal(id: string): Promise<MenuItem | undefined> {
  const items = await getMenuItemsLocal();
  return items.find((item) => item.id === id);
}

export async function createMenuItemLocal(input: CreateMenuItemInput): Promise<MenuItem> {
  const items = await readJson<MenuItem[]>(MENU_FILE);
  const categories = await getCategoriesLocal();
  const category = categories.find((c) => c.id === input.categoryId);
  if (!category) throw new Error("Kategori bulunamadı.");

  const countInCategory = items.filter((i) => i.categoryId === input.categoryId).length;
  const item: MenuItem = {
    id: crypto.randomUUID(),
    name: input.name,
    description: input.description ?? "",
    price: input.price,
    categoryId: input.categoryId,
    categoryName: category.name,
    tags: input.tags ?? [],
    featured: input.featured ?? false,
    available: input.available ?? true,
    image: input.image ?? undefined,
    sortOrder: input.sortOrder ?? countInCategory,
  };
  items.push(item);
  await writeJson(
    MENU_FILE,
    items.map(({ categoryName: _, ...rest }) => rest)
  );
  return item;
}

export async function updateMenuItemLocal(
  id: string,
  updates: Partial<CreateMenuItemInput>
): Promise<MenuItem | null> {
  const items = await readJson<MenuItem[]>(MENU_FILE);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;

  if (updates.categoryId) {
    const categories = await getCategoriesLocal();
    if (!categories.some((c) => c.id === updates.categoryId)) {
      throw new Error("Kategori bulunamadı.");
    }
  }

  items[index] = {
    ...items[index],
    ...updates,
    tags: updates.tags ?? items[index].tags,
    image: updates.image === null ? undefined : (updates.image ?? items[index].image),
  };
  await writeJson(MENU_FILE, items);

  const categories = await getCategoriesLocal();
  const categoryName = categories.find((c) => c.id === items[index].categoryId)?.name;
  return { ...items[index], categoryName };
}

export async function deleteMenuItemLocal(id: string): Promise<boolean> {
  const items = await readJson<MenuItem[]>(MENU_FILE);
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson(MENU_FILE, filtered);
  return true;
}

export async function reorderMenuItemsLocal(orderedIds: string[]): Promise<MenuItem[]> {
  const items = await readJson<MenuItem[]>(MENU_FILE);
  const byId = new Map(items.map((item) => [item.id, item]));

  orderedIds.forEach((id, index) => {
    const item = byId.get(id);
    if (item) {
      item.sortOrder = index;
    }
  });

  await writeJson(MENU_FILE, items);
  return getMenuItemsLocal();
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
