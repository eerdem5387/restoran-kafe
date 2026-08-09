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

  const categoryCards = categories
    .map((category) => ({
      category,
      itemCount: available.filter((i) => i.categoryId === category.id).length,
    }))
    .filter((c) => c.itemCount > 0);

  return <MenuView categories={categoryCards} />;
}
