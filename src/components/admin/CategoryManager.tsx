"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/types";

export function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function startEdit(category: Category) {
    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description);
    setError("");
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setDescription("");
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(editingId ? `/api/categories/${editingId}` : "/api/categories", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      const data = (await res.json().catch(() => ({}))) as Category & { error?: string };
      if (!res.ok) throw new Error(data.error || "Kategori kaydedilemedi.");

      if (editingId) {
        setCategories((prev) => prev.map((c) => (c.id === editingId ? data : c)));
      } else {
        setCategories((prev) => [...prev, data]);
      }
      resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kategori kaydedilemedi.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu kategoriyi silmek istiyor musunuz?")) return;
    setError("");
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      if (editingId === id) resetForm();
      router.refresh();
      return;
    }
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setError(data.error || "Kategori silinemedi.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      <form
        onSubmit={handleSubmit}
        className="soft-shadow rounded-lg bg-surface-container-lowest p-4 sm:p-6 lg:col-span-2"
      >
        <h2 className="mb-5 font-display text-xl text-primary sm:mb-6 sm:text-2xl">
          {editingId ? "Kategoriyi Düzenle" : "Kategori Ekle"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Ad
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input-ledger min-h-11 text-base"
              placeholder="Örn. Tatlılar"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Açıklama
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input-ledger resize-none text-base"
              placeholder="Kısa kategori açıklaması"
            />
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="min-h-11 rounded bg-primary-container px-6 py-3 text-xs font-semibold uppercase tracking-wider text-on-primary disabled:opacity-60"
            >
              {loading ? "Kaydediliyor..." : editingId ? "Güncelle" : "Ekle"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="min-h-11 rounded border border-outline-variant px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary"
              >
                Vazgeç
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="soft-shadow overflow-hidden rounded-lg bg-surface-container-lowest lg:col-span-3">
        <div className="border-b border-outline-variant/30 px-4 py-4 sm:px-6">
          <h2 className="font-display text-xl text-primary sm:text-2xl">
            Kategoriler ({categories.length})
          </h2>
        </div>
        <div className="divide-y divide-outline-variant/20">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-6"
            >
              <div className="min-w-0">
                <h3 className="font-display text-lg text-primary sm:text-xl">{category.name}</h3>
                {category.description && (
                  <p className="mt-1 text-sm text-on-surface-variant">{category.description}</p>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(category)}
                  className="min-h-10 flex-1 rounded border border-outline-variant px-3 py-2 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-surface-container-low sm:flex-none"
                >
                  Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(category.id)}
                  className="min-h-10 flex-1 rounded border border-red-200 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-red-700 hover:bg-red-50 sm:flex-none"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="px-6 py-8 text-center text-on-surface-variant">
              Henüz kategori yok. Önce bir kategori ekleyin.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
