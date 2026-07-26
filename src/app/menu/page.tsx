import type { Metadata } from "next";
import { MenuView } from "@/components/MenuView";
import { getMenuItems } from "@/lib/data";
import type { MenuCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menü",
};

const CATEGORY_ORDER: MenuCategory[] = ["coffee-tea", "starters", "main-courses", "desserts"];

export default async function MenuPage() {
  const items = (await getMenuItems()).filter((i) => i.available);
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: items.filter((i) => i.category === cat),
  })).filter((g) => g.items.length > 0);

  return <MenuView byCategory={byCategory} />;
}
