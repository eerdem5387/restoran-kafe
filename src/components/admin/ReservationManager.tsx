"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Reservation, ReservationStatus } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/types";

const STATUS_STYLES: Record<ReservationStatus, string> = {
  pending: "bg-amber-100 text-amber-900",
  confirmed: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-red-100 text-red-900",
  completed: "bg-stone-200 text-stone-800",
};

const FILTERS: Array<{ value: ReservationStatus | "all"; label: string }> = [
  { value: "all", label: "Tümü" },
  { value: "pending", label: "Beklemede" },
  { value: "confirmed", label: "Onaylandı" },
  { value: "cancelled", label: "İptal" },
  { value: "completed", label: "Tamamlandı" },
];

export function ReservationManager({
  initialReservations,
}: {
  initialReservations: Reservation[];
}) {
  const router = useRouter();
  const [reservations, setReservations] = useState(initialReservations);
  const [filter, setFilter] = useState<ReservationStatus | "all">("all");

  const filtered =
    filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  async function updateStatus(id: string, status: ReservationStatus) {
    const res = await fetch(`/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = (await res.json()) as Reservation;
      setReservations((prev) => prev.map((r) => (r.id === id ? updated : r)));
      router.refresh();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu rezervasyonu silmek istiyor musunuz?")) return;
    const res = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
    if (res.ok) {
      setReservations((prev) => prev.filter((r) => r.id !== id));
      router.refresh();
    }
  }

  return (
    <div>
      <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1">
        {FILTERS.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setFilter(s.value)}
            className={`min-h-10 shrink-0 rounded px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              filter === s.value
                ? "bg-primary-container text-on-primary"
                : "bg-surface-container-low text-on-surface-variant hover:text-primary"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="soft-shadow rounded-lg bg-surface-container-lowest p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-primary">
                  {r.firstName} {r.lastName}
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {r.date} · {r.time} · {r.guests} kişi
                </p>
              </div>
              <span
                className={`shrink-0 rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLES[r.status]}`}
              >
                {STATUS_LABELS[r.status]}
              </span>
            </div>
            <p className="text-sm text-on-surface-variant">{r.email}</p>
            <p className="text-sm text-on-surface-variant">{r.phone}</p>
            {r.specialRequests && (
              <p className="mt-2 text-xs text-on-surface-variant">{r.specialRequests}</p>
            )}
            <div className="mt-4 flex gap-2">
              <select
                value={r.status}
                onChange={(e) => updateStatus(r.id, e.target.value as ReservationStatus)}
                className="min-h-10 flex-1 rounded border border-outline-variant/50 bg-transparent px-2 py-2 text-xs text-primary"
              >
                {(Object.keys(STATUS_LABELS) as ReservationStatus[]).map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleDelete(r.id)}
                className="min-h-10 rounded border border-red-200 px-3 text-xs font-semibold uppercase tracking-wider text-red-700"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-on-surface-variant">Rezervasyon bulunamadı.</p>
        )}
      </div>

      {/* Desktop table */}
      <div className="soft-shadow hidden overflow-hidden rounded-lg bg-surface-container-lowest md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-outline-variant/30 bg-surface-container-low text-xs uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="px-4 py-3 font-semibold">Misafir</th>
                <th className="px-4 py-3 font-semibold">Tarih / Saat</th>
                <th className="px-4 py-3 font-semibold">Kişi</th>
                <th className="px-4 py-3 font-semibold">İletişim</th>
                <th className="px-4 py-3 font-semibold">Durum</th>
                <th className="px-4 py-3 font-semibold">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filtered.map((r) => (
                <tr key={r.id} className="align-top">
                  <td className="px-4 py-4">
                    <p className="font-medium text-primary">
                      {r.firstName} {r.lastName}
                    </p>
                    {r.specialRequests && (
                      <p className="mt-1 max-w-[200px] text-xs text-on-surface-variant">
                        {r.specialRequests}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4 text-on-surface-variant">
                    <p>{r.date}</p>
                    <p className="font-medium text-primary">{r.time}</p>
                  </td>
                  <td className="px-4 py-4 text-on-surface-variant">{r.guests}</td>
                  <td className="px-4 py-4 text-on-surface-variant">
                    <p>{r.email}</p>
                    <p>{r.phone}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLES[r.status]}`}
                    >
                      {STATUS_LABELS[r.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <select
                        value={r.status}
                        onChange={(e) =>
                          updateStatus(r.id, e.target.value as ReservationStatus)
                        }
                        className="rounded border border-outline-variant/50 bg-transparent px-2 py-1 text-xs text-primary"
                      >
                        {(Object.keys(STATUS_LABELS) as ReservationStatus[]).map((status) => (
                          <option key={status} value={status}>
                            {STATUS_LABELS[status]}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => handleDelete(r.id)}
                        className="text-left text-xs font-semibold uppercase tracking-wider text-red-700 hover:underline"
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="px-6 py-10 text-center text-on-surface-variant">
            Rezervasyon bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
}
