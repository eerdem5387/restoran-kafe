import type {
  Category as PrismaCategory,
  MenuItem as PrismaMenuItem,
  Reservation as PrismaReservation,
  ReservationStatus as PrismaReservationStatus,
} from "@/generated/prisma";
import {
  createCategoryLocal,
  createMenuItemLocal,
  createReservationLocal,
  deleteCategoryLocal,
  deleteMenuItemLocal,
  deleteReservationLocal,
  getCategoriesLocal,
  getMenuItemByIdLocal,
  getMenuItemsLocal,
  getReservationsLocal,
  updateCategoryLocal,
  updateMenuItemLocal,
  updateReservationStatusLocal,
} from "@/lib/local-store";
import { getPrisma, hasDatabaseUrl } from "@/lib/prisma";
import { ensureDatabaseSeeded } from "@/lib/seed-from-json";
import { assertMutableStore } from "@/lib/store-mode";
import type {
  Category,
  CreateCategoryInput,
  CreateMenuItemInput,
  CreateReservationInput,
  MenuItem,
  Reservation,
  ReservationStatus,
} from "@/lib/types";

type MenuItemWithCategory = PrismaMenuItem & { category?: PrismaCategory | null };

function mapCategory(category: PrismaCategory): Category {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    sortOrder: category.sortOrder,
  };
}

function mapMenuItem(item: MenuItemWithCategory): MenuItem {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    categoryId: item.categoryId,
    categoryName: item.category?.name,
    tags: item.tags,
    featured: item.featured,
    available: item.available,
    image: item.image ?? undefined,
  };
}

function mapReservation(reservation: PrismaReservation): Reservation {
  return {
    id: reservation.id,
    firstName: reservation.firstName,
    lastName: reservation.lastName,
    email: reservation.email,
    phone: reservation.phone,
    date: reservation.date.toISOString().slice(0, 10),
    time: reservation.time,
    guests: reservation.guests,
    specialRequests: reservation.specialRequests ?? undefined,
    status: reservation.status as ReservationStatus,
    createdAt: reservation.createdAt.toISOString(),
  };
}

function parseReservationDate(date: string): Date {
  return new Date(`${date}T00:00:00.000Z`);
}

export async function getCategories(): Promise<Category[]> {
  if (!hasDatabaseUrl()) return getCategoriesLocal();

  await ensureDatabaseSeeded();
  const categories = await getPrisma().category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return categories.map(mapCategory);
}

export async function createCategory(input: CreateCategoryInput): Promise<Category> {
  assertMutableStore();
  if (!hasDatabaseUrl()) return createCategoryLocal(input);

  const count = await getPrisma().category.count();
  const category = await getPrisma().category.create({
    data: {
      name: input.name.trim(),
      description: (input.description ?? "").trim(),
      sortOrder: input.sortOrder ?? count,
    },
  });
  return mapCategory(category);
}

export async function updateCategory(
  id: string,
  updates: Partial<CreateCategoryInput>
): Promise<Category | null> {
  assertMutableStore();
  if (!hasDatabaseUrl()) return updateCategoryLocal(id, updates);

  try {
    const category = await getPrisma().category.update({
      where: { id },
      data: {
        ...(updates.name !== undefined && { name: updates.name.trim() }),
        ...(updates.description !== undefined && {
          description: updates.description.trim(),
        }),
        ...(updates.sortOrder !== undefined && { sortOrder: updates.sortOrder }),
      },
    });
    return mapCategory(category);
  } catch {
    return null;
  }
}

export async function deleteCategory(id: string): Promise<boolean> {
  assertMutableStore();
  if (!hasDatabaseUrl()) return deleteCategoryLocal(id);

  const itemCount = await getPrisma().menuItem.count({ where: { categoryId: id } });
  if (itemCount > 0) {
    throw new Error("Bu kategoride ürün var. Önce ürünleri silin veya taşıyın.");
  }

  try {
    await getPrisma().category.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  if (!hasDatabaseUrl()) return getMenuItemsLocal();

  await ensureDatabaseSeeded();
  const items = await getPrisma().menuItem.findMany({
    include: { category: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { name: "asc" }],
  });
  return items.map(mapMenuItem);
}

export async function getMenuItemById(id: string): Promise<MenuItem | undefined> {
  if (!hasDatabaseUrl()) return getMenuItemByIdLocal(id);

  const item = await getPrisma().menuItem.findUnique({
    where: { id },
    include: { category: true },
  });
  return item ? mapMenuItem(item) : undefined;
}

export async function createMenuItem(input: CreateMenuItemInput): Promise<MenuItem> {
  assertMutableStore();
  if (!hasDatabaseUrl()) return createMenuItemLocal(input);

  const item = await getPrisma().menuItem.create({
    data: {
      name: input.name,
      description: input.description ?? "",
      price: input.price,
      categoryId: input.categoryId,
      tags: input.tags ?? [],
      featured: input.featured ?? false,
      available: input.available ?? true,
      image: input.image || null,
    },
    include: { category: true },
  });
  return mapMenuItem(item);
}

export async function updateMenuItem(
  id: string,
  updates: Partial<CreateMenuItemInput>
): Promise<MenuItem | null> {
  assertMutableStore();
  if (!hasDatabaseUrl()) return updateMenuItemLocal(id, updates);

  try {
    const item = await getPrisma().menuItem.update({
      where: { id },
      data: {
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.price !== undefined && { price: updates.price }),
        ...(updates.categoryId !== undefined && { categoryId: updates.categoryId }),
        ...(updates.tags !== undefined && { tags: updates.tags }),
        ...(updates.featured !== undefined && { featured: updates.featured }),
        ...(updates.available !== undefined && { available: updates.available }),
        ...(updates.image !== undefined && { image: updates.image || null }),
      },
      include: { category: true },
    });
    return mapMenuItem(item);
  } catch {
    return null;
  }
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  assertMutableStore();
  if (!hasDatabaseUrl()) return deleteMenuItemLocal(id);

  const existing = await getPrisma().menuItem.findUnique({ where: { id } });
  if (!existing) return false;
  await getPrisma().menuItem.delete({ where: { id } });
  return true;
}

export async function getReservations(): Promise<Reservation[]> {
  if (!hasDatabaseUrl()) return getReservationsLocal();

  await ensureDatabaseSeeded();
  const reservations = await getPrisma().reservation.findMany({
    orderBy: { createdAt: "desc" },
  });
  return reservations.map(mapReservation);
}

export async function createReservation(
  input: CreateReservationInput
): Promise<Reservation> {
  assertMutableStore();
  if (!hasDatabaseUrl()) return createReservationLocal(input);

  const reservation = await getPrisma().reservation.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      date: parseReservationDate(input.date),
      time: input.time,
      guests: input.guests,
      specialRequests: input.specialRequests,
      status: "pending",
    },
  });
  return mapReservation(reservation);
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus
): Promise<Reservation | null> {
  assertMutableStore();
  if (!hasDatabaseUrl()) return updateReservationStatusLocal(id, status);

  try {
    const reservation = await getPrisma().reservation.update({
      where: { id },
      data: { status: status as PrismaReservationStatus },
    });
    return mapReservation(reservation);
  } catch {
    return null;
  }
}

export async function deleteReservation(id: string): Promise<boolean> {
  assertMutableStore();
  if (!hasDatabaseUrl()) return deleteReservationLocal(id);

  try {
    await getPrisma().reservation.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
