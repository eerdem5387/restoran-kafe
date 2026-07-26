"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { MenuCategory, MenuItem } from "@/lib/types";
import { CATEGORY_LABELS, formatPrice } from "@/lib/types";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "main-courses" as MenuCategory,
  tags: "",
  featured: false,
  available: true,
};

export function MenuManager({ initialItems }: { initialItems: MenuItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function startEdit(item: MenuItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      price: String(item.price),
      category: item.category,
      tags: item.tags.join(", "),
      featured: item.featured,
      available: item.available,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured: form.featured,
      available: form.available,
    };

    try {
      const res = await fetch(editingId ? `/api/menu/${editingId}` : "/api/menu", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      const saved = (await res.json()) as MenuItem;

      if (editingId) {
        setItems((prev) => prev.map((i) => (i.id === editingId ? saved : i)));
      } else {
        setItems((prev) => [...prev, saved]);
      }
      resetForm();
      router.refresh();
    } catch {
      setError("Ürün kaydedilemedi.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu menü ürününü silmek istiyor musunuz?")) return;
    const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (editingId === id) resetForm();
      router.refresh();
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      <form
        onSubmit={handleSubmit}
        className="soft-shadow rounded-lg bg-surface-container-lowest p-4 sm:p-6 lg:col-span-2"
      >
        <h2 className="mb-5 font-display text-xl text-primary sm:mb-6 sm:text-2xl">
          {editingId ? "Ürünü Düzenle" : "Ürün Ekle"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Ad
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-input-ledger min-h-11 text-base"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Açıklama
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="form-input-ledger resize-none text-base"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Fiyat (₺)
              </label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="form-input-ledger min-h-11 text-base"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Kategori
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as MenuCategory })
                }
                className="form-input-ledger min-h-11 appearance-none text-base"
              >
                {(Object.keys(CATEGORY_LABELS) as MenuCategory[]).map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Etiketler (virgülle ayırın)
            </label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="Vejetaryen, Glutensiz"
              className="form-input-ledger min-h-11 text-base"
            />
          </div>
          <div className="flex flex-wrap gap-4 pt-2 sm:gap-6">
            <label className="flex min-h-11 items-center gap-2 text-sm text-on-surface-variant">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Öne çıkan
            </label>
            <label className="flex min-h-11 items-center gap-2 text-sm text-on-surface-variant">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => setForm({ ...form, available: e.target.checked })}
              />
              Mevcut
            </label>
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
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
            Menü Ürünleri ({items.length})
          </h2>
        </div>
        <div className="divide-y divide-outline-variant/20">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-6"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg text-primary sm:text-xl">{item.name}</h3>
                  {!item.available && (
                    <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-red-800">
                      Yok
                    </span>
                  )}
                  {item.featured && (
                    <span className="rounded bg-secondary-container/40 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                      Öne çıkan
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-secondary">
                  {CATEGORY_LABELS[item.category]} · {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="min-h-10 flex-1 rounded border border-outline-variant px-3 py-2 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-surface-container-low sm:flex-none"
                >
                  Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="min-h-10 flex-1 rounded border border-red-200 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-red-700 hover:bg-red-50 sm:flex-none"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="px-6 py-8 text-center text-on-surface-variant">Henüz menü ürünü yok.</p>
          )}
        </div>
      </div>
    </div>
  );
}
