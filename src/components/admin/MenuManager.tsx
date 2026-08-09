"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/admin/Switch";
import { TagInput } from "@/components/admin/TagInput";
import { MenuTags } from "@/components/MenuTags";
import { fileToOptimizedJpeg } from "@/lib/image";
import type { Category, MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/types";

type FormState = {
  name: string;
  tags: string[];
  price: string;
  categoryId: string;
  featured: boolean;
  available: boolean;
  image: string;
};

export function MenuManager({
  initialItems,
  categories,
}: {
  initialItems: MenuItem[];
  categories: Category[];
}) {
  const router = useRouter();
  const defaultCategoryId = categories[0]?.id ?? "";
  const emptyForm = useMemo<FormState>(
    () => ({
      name: "",
      tags: [],
      price: "",
      categoryId: defaultCategoryId,
      featured: false,
      available: true,
      image: "",
    }),
    [defaultCategoryId]
  );

  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const categoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || "Kategori yok";

  function startEdit(item: MenuItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      tags: item.tags ?? [],
      price: String(item.price),
      categoryId: item.categoryId,
      featured: item.featured,
      available: item.available,
      image: item.image ?? "",
    });
    setError("");
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function removeBlobIfNeeded(url: string) {
    if (!url.includes("blob.vercel-storage.com")) return;
    await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    }).catch(() => undefined);
  }

  async function handleImageChange(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const optimized = await fileToOptimizedJpeg(file);
      const body = new FormData();
      body.append("file", optimized);

      const res = await fetch("/api/upload", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Görsel yüklenemedi.");
      }

      if (form.image) await removeBlobIfNeeded(form.image);
      setForm((prev) => ({ ...prev, image: data.url! }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Görsel yüklenemedi.");
    } finally {
      setUploading(false);
    }
  }

  async function clearImage() {
    if (form.image) await removeBlobIfNeeded(form.image);
    setForm({ ...form, image: "" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.categoryId) {
      setError("Önce bir kategori oluşturun.");
      return;
    }
    setLoading(true);
    setError("");

    const payload = {
      name: form.name,
      description: "",
      price: Number(form.price),
      categoryId: form.categoryId,
      tags: form.tags,
      featured: form.featured,
      available: form.available,
      image: form.image || null,
    };

    try {
      const res = await fetch(editingId ? `/api/menu/${editingId}` : "/api/menu", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as MenuItem & { error?: string };
      if (!res.ok) throw new Error(data.error || "Ürün kaydedilemedi.");

      if (editingId) {
        setItems((prev) => prev.map((i) => (i.id === editingId ? data : i)));
      } else {
        setItems((prev) => [...prev, data]);
      }
      resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ürün kaydedilemedi.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu menü ürününü silmek istiyor musunuz?")) return;
    setError("");
    const item = items.find((i) => i.id === id);
    const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
    if (res.ok) {
      if (item?.image) await removeBlobIfNeeded(item.image);
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (editingId === id) resetForm();
      router.refresh();
      return;
    }
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setError(data.error || "Ürün silinemedi.");
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
              Etiketler
            </label>
            <TagInput tags={form.tags} onChange={(tags) => setForm({ ...form, tags })} />
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
                required
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="form-input-ledger min-h-11 appearance-none text-base"
                disabled={categories.length === 0}
              >
                {categories.length === 0 ? (
                  <option value="">Kategori yok</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Ürün Görseli
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-on-surface-variant file:mr-3 file:rounded file:border-0 file:bg-primary-container file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:text-on-primary"
            />
            {uploading && (
              <p className="mt-2 text-xs text-on-surface-variant">Vercel Blob&apos;a yükleniyor…</p>
            )}
            {form.image && (
              <div className="mt-3 flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.image}
                  alt="Ürün önizleme"
                  className="h-20 w-20 rounded object-cover"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="text-xs font-semibold uppercase tracking-wider text-red-700"
                >
                  Görseli kaldır
                </button>
              </div>
            )}
          </div>
          <div className="space-y-3 pt-1">
            <Switch
              label="Öne çıkan"
              checked={form.featured}
              onChange={(featured) => setForm({ ...form, featured })}
            />
            <Switch
              label="Ürün durumu"
              checked={form.available}
              onChange={(available) => setForm({ ...form, available })}
            />
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading || uploading || categories.length === 0}
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
              <div className="flex min-w-0 gap-3">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-surface-container-low text-[10px] uppercase tracking-wider text-on-surface-variant">
                    Yok
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg text-primary sm:text-xl">{item.name}</h3>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        item.available
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {item.available ? "Aktif" : "Pasif"}
                    </span>
                    {item.featured && (
                      <span className="rounded bg-secondary-container/40 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                        Öne çıkan
                      </span>
                    )}
                  </div>
                  <MenuTags tags={item.tags} className="mt-2" />
                  <p className="mt-2 text-xs uppercase tracking-wider text-secondary">
                    {item.categoryName || categoryName(item.categoryId)} ·{" "}
                    {formatPrice(item.price)}
                  </p>
                </div>
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
