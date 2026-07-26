import type { Metadata } from "next";
import { ReservationsView } from "@/components/ReservationsView";

export const metadata: Metadata = {
  title: "Rezervasyon",
};

export default function ReservationsPage() {
  return <ReservationsView />;
}
