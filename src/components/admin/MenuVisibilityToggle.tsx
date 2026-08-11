"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Switch } from "@/components/admin/Switch";

export function MenuVisibilityToggle({ initialEnabled }: { initialEnabled: boolean }) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(initialEnabled);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(next: boolean) {
    setLoading(true);
    setError("");
    const previous = enabled;
    setEnabled(next);

    try {
      const res = await fetch("/api/settings/menu", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuEnabled: next }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        menuEnabled?: boolean;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || "Menü durumu güncellenemedi.");
      setEnabled(data.menuEnabled ?? next);
      router.refresh();
    } catch (err) {
      setEnabled(previous);
      setError(err instanceof Error ? err.message : "Menü durumu güncellenemedi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-6 space-y-2 sm:mb-8">
      <div className={loading ? "pointer-events-none opacity-70" : undefined}>
        <Switch
          checked={enabled}
          onChange={handleChange}
          label="Sitede menü"
          activeLabel="Açık — ziyaretçiler menüyü görebilir"
          inactiveLabel="Kapalı — ziyaretçiler menüyü göremez"
        />
      </div>
      {!enabled && (
        <p className="rounded border border-secondary-container bg-secondary-container/40 px-3 py-2 text-sm text-on-secondary-container">
          Menü şu an sitede kapalı. Fiyat güncellemesi bitince tekrar açmayı unutmayın.
        </p>
      )}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
