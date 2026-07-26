import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell, requireAdmin } from "@/components/admin/AdminShell";
import { getMenuItems, getReservations } from "@/lib/data";
import { STATUS_LABELS } from "@/lib/types";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
};

export default async function AdminDashboardPage() {
  await requireAdmin();
  const [menu, reservations] = await Promise.all([getMenuItems(), getReservations()]);

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

      <div className="mb-8 grid grid-cols-2 gap-3 sm:mb-10 sm:gap-4 lg:grid-cols-4">
        {[
          { label: "Menü Ürünü", value: menu.length, href: "/admin/menu" },
          { label: "Mevcut", value: available, href: "/admin/menu" },
          { label: "Bekleyen", value: pending, href: "/admin/reservations" },
          { label: "Onaylı", value: confirmed, href: "/admin/reservations" },
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
        </div>

        <div className="soft-shadow rounded-lg bg-surface-container-lowest p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-xl text-primary sm:text-2xl">Öne Çıkan Menü</h2>
            <Link
              href="/admin/menu"
              className="shrink-0 text-xs font-semibold uppercase tracking-wider text-secondary hover:text-primary"
            >
              Yönet
            </Link>
          </div>
          <ul className="divide-y divide-outline-variant/20">
            {menu
              .filter((m) => m.featured)
              .slice(0, 5)
              .map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-primary">{m.name}</p>
                    <p className="line-clamp-1 text-sm text-on-surface-variant">{m.description}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-primary">
                    {m.price.toFixed(0)} ₺
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
