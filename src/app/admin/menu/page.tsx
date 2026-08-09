import type { Metadata } from "next";
import { AdminShell, requireAdmin } from "@/components/admin/AdminShell";
import { MenuManager } from "@/components/admin/MenuManager";
import { getCategories, getMenuItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Menü Yönetimi",
};

export default async function AdminMenuPage() {
  await requireAdmin();
  const [items, categories] = await Promise.all([getMenuItems(), getCategories()]);

  return (
    <AdminShell>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-3xl text-primary sm:text-4xl">Menü Yönetimi</h1>
        <p className="mt-2 text-sm text-on-surface-variant sm:text-base">
          Sitede görünen yemekleri ekleyin, görsel yükleyin, düzenleyin veya kaldırın.
        </p>
      </div>
      <MenuManager initialItems={items} categories={categories} />
    </AdminShell>
  );
}
