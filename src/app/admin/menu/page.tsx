import type { Metadata } from "next";
import { AdminShell, requireAdmin } from "@/components/admin/AdminShell";
import { MenuManager } from "@/components/admin/MenuManager";
import { MenuVisibilityToggle } from "@/components/admin/MenuVisibilityToggle";
import { getCategories, getMenuEnabled, getMenuItems } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menü Yönetimi",
};

export default async function AdminMenuPage() {
  await requireAdmin();
  const [items, categories, menuEnabled] = await Promise.all([
    getMenuItems(),
    getCategories(),
    getMenuEnabled(),
  ]);

  return (
    <AdminShell>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-3xl text-primary sm:text-4xl">Menü Yönetimi</h1>
        <p className="mt-2 text-sm text-on-surface-variant sm:text-base">
          Sitede görünen yemekleri ekleyin, görsel yükleyin, düzenleyin veya kaldırın. Fiyat
          güncellerken menüyü geçici olarak kapatabilirsiniz.
        </p>
      </div>
      <MenuVisibilityToggle initialEnabled={menuEnabled} />
      <MenuManager initialItems={items} categories={categories} />
    </AdminShell>
  );
}
