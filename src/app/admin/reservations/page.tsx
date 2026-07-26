import type { Metadata } from "next";
import { AdminShell, requireAdmin } from "@/components/admin/AdminShell";
import { ReservationManager } from "@/components/admin/ReservationManager";
import { getReservations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Rezervasyon Yönetimi",
};

export default async function AdminReservationsPage() {
  await requireAdmin();
  const reservations = await getReservations();

  return (
    <AdminShell>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-3xl text-primary sm:text-4xl">Rezervasyonlar</h1>
        <p className="mt-2 text-sm text-on-surface-variant sm:text-base">
          Gelen rezervasyonları görüntüleyin ve durumlarını güncelleyin.
        </p>
      </div>
      <ReservationManager initialReservations={reservations} />
    </AdminShell>
  );
}
