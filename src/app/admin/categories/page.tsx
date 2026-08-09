import type { Metadata } from "next";
import { AdminShell, requireAdmin } from "@/components/admin/AdminShell";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { getCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kategori Yönetimi",
};

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await getCategories();

  return (
    <AdminShell>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-3xl text-primary sm:text-4xl">Kategoriler</h1>
        <p className="mt-2 text-sm text-on-surface-variant sm:text-base">
          Menü bölümlerini ad ve açıklama ile oluşturun veya silin.
        </p>
      </div>
      <CategoryManager initialCategories={categories} />
    </AdminShell>
  );
}
