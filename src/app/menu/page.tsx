import type { Metadata } from "next";
import { MenuView } from "@/components/MenuView";
import { getCategories, getMenuItems } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menü",
};

export default async function MenuPage() {
  const [items, categories] = await Promise.all([getMenuItems(), getCategories()]);
  const available = items.filter((i) => i.available);

  const byCategory = categories
    .map((category) => ({
      category,
      items: available.filter((i) => i.categoryId === category.id),
    }))
    .filter((g) => g.items.length > 0);

  return <MenuView byCategory={byCategory} />;
}
