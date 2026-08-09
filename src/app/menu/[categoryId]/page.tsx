import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuCategoryView } from "@/components/MenuCategoryView";
import { getCategories, getMenuItems } from "@/lib/data";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ categoryId: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categoryId } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.id === categoryId);
  return {
    title: category ? category.name : "Menü",
  };
}

export default async function MenuCategoryPage({ params }: Params) {
  const { categoryId } = await params;
  const [items, categories] = await Promise.all([getMenuItems(), getCategories()]);
  const available = items.filter((i) => i.available);

  const category = categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  const categoryItems = available.filter((i) => i.categoryId === category.id);

  const siblings = categories
    .map((c) => ({
      category: c,
      itemCount: available.filter((i) => i.categoryId === c.id).length,
    }))
    .filter((c) => c.itemCount > 0);

  return (
    <MenuCategoryView category={category} items={categoryItems} siblings={siblings} />
  );
}
