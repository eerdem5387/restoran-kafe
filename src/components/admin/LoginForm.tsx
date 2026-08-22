"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.status === 429) {
        setError("Çok fazla deneme. Lütfen bir süre bekleyip tekrar deneyin.");
        return;
      }

      if (!res.ok) {
        setError("Şifre hatalı.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Giriş başarısız. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="soft-shadow w-full max-w-md rounded-xl bg-almond p-6 sm:p-8 md:p-10"
    >
      <h1 className="mb-2 font-display text-2xl text-primary sm:text-3xl">Yönetici Girişi</h1>
      <p className="mb-6 text-sm text-on-surface-variant sm:mb-8">
        Menü ve rezervasyonları yönetmek için şifrenizi girin.
      </p>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
        Şifre
      </label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-input-ledger mb-6 min-h-11 text-base"
        autoFocus
      />
      {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="flex min-h-12 w-full items-center justify-center rounded bg-primary-container py-4 text-xs font-semibold uppercase tracking-wider text-on-primary disabled:opacity-60"
      >
        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}
