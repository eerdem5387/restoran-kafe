import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell, requireAdmin } from "@/components/admin/AdminShell";
import { getCategories, getMenuEnabled, getMenuItems, getReservations } from "@/lib/data";
import { STATUS_LABELS } from "@/lib/types";
import { Price } from "@/components/Price";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
};

export default async function AdminDashboardPage() {
  await requireAdmin();
  const [menu, reservations, categories, menuEnabled] = await Promise.all([
    getMenuItems(),
    getReservations(),
    getCategories(),
    getMenuEnabled(),
  ]);

  const pending = reservations.filter((r) => r.status === "pending").length;
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;
  const available = menu.filter((m) => m.available).length;

  return (
    <AdminShell>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-3xl text-primary sm:text-4xl">Panel</h1>
        <p className="mt-2 text-sm text-on-surface-variant sm:text-base">
          Berrays menü ve rezervasyon özeti.
        </p>
      </div>

      {!menuEnabled && (
        <div className="mb-6 rounded border border-secondary-container bg-secondary-container/40 px-4 py-3 text-sm text-on-secondary-container sm:mb-8">
          Sitede menü şu an kapalı.{" "}
          <Link href="/admin/menu" className="font-semibold underline underline-offset-2">
            Menü yönetimine git
          </Link>{" "}
          ve tekrar aç.
        </div>
      )}

      <div className="mb-8 grid grid-cols-2 gap-3 sm:mb-10 sm:gap-4 lg:grid-cols-4">
        {[
          { label: "Kategori", value: categories.length, href: "/admin/categories" },
          { label: "Menü Ürünü", value: menu.length, href: "/admin/menu" },
          { label: "Aktif", value: available, href: "/admin/menu" },
          { label: "Bekleyen", value: pending, href: "/admin/reservations" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="soft-shadow rounded-lg bg-surface-container-lowest p-4 transition-transform hover:-translate-y-0.5 sm:p-6"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant sm:text-xs">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-3xl text-primary sm:text-4xl">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="soft-shadow rounded-lg bg-surface-container-lowest p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-xl text-primary sm:text-2xl">Son Rezervasyonlar</h2>
            <Link
              href="/admin/reservations"
              className="shrink-0 text-xs font-semibold uppercase tracking-wider text-secondary hover:text-primary"
            >
              Tümü
            </Link>
          </div>
          <ul className="divide-y divide-outline-variant/20">
            {reservations.slice(0, 5).map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-primary">
                    {r.firstName} {r.lastName}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {r.date} · {r.time} · {r.guests} kişi
                  </p>
                </div>
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-secondary">
                  {STATUS_LABELS[r.status]}
                </span>
              </li>
            ))}
            {reservations.length === 0 && (
              <li className="py-6 text-center text-on-surface-variant">Henüz rezervasyon yok.</li>
            )}
          </ul>
          <p className="mt-3 text-xs text-on-surface-variant">Onaylı: {confirmed}</p>
        </div>

        <div className="soft-shadow rounded-lg bg-surface-container-lowest p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-xl text-primary sm:text-2xl">Son Ürünler</h2>
            <Link
              href="/admin/menu"
              className="shrink-0 text-xs font-semibold uppercase tracking-wider text-secondary hover:text-primary"
            >
              Yönet
            </Link>
          </div>
          <ul className="divide-y divide-outline-variant/20">
            {menu.slice(0, 5).map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-primary">{m.name}</p>
                  <p className="line-clamp-1 text-sm text-on-surface-variant">
                    {m.categoryName || "Kategori"}
                    {m.tags.length ? ` · ${m.tags.slice(0, 2).join(", ")}` : ""}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-primary">
                  <Price value={m.price} />
                </span>
              </li>
            ))}
            {menu.length === 0 && (
              <li className="py-6 text-center text-on-surface-variant">Henüz menü ürünü yok.</li>
            )}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
