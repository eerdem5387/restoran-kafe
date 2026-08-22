"use client";

import { AnimatePresence, motion } from "motion/react";
import { FormEvent, useState } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { TIME_SLOTS } from "@/lib/types";

export function ReservationForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          date: data.get("date"),
          time: data.get("time"),
          guests: Number(data.get("guests")),
          specialRequests: data.get("requests") || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      setStatus("success");
      setMessage(t.form.success);
      form.reset();
    } catch {
      setStatus("error");
      setMessage(t.form.error);
    }
  }

  const labelClass =
    "mb-2 font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant";

  return (
    <form onSubmit={handleSubmit} className="font-body text-base text-on-surface">
      <Stagger className="space-y-6 sm:space-y-8" fast>
        <StaggerItem>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <div className="flex flex-col">
              <label htmlFor="firstName" className={labelClass}>
                {t.form.firstName}
              </label>
              <input
                id="firstName"
                name="firstName"
                required
                autoComplete="given-name"
                className="form-input-ledger min-h-11 text-base"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className={labelClass}>
                {t.form.lastName}
              </label>
              <input
                id="lastName"
                name="lastName"
                required
                autoComplete="family-name"
                className="form-input-ledger min-h-11 text-base"
                type="text"
              />
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <div className="flex flex-col">
              <label htmlFor="email" className={labelClass}>
                {t.form.email}
              </label>
              <input
                id="email"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                className="form-input-ledger min-h-11 text-base"
                type="email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className={labelClass}>
                {t.form.phone}
              </label>
              <input
                id="phone"
                name="phone"
                required
                autoComplete="tel"
                inputMode="tel"
                className="form-input-ledger min-h-11 text-base"
                type="tel"
              />
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <label htmlFor="date" className={labelClass}>
                {t.form.date}
              </label>
              <input
                id="date"
                name="date"
                required
                className="form-input-ledger min-h-11 text-base"
                type="date"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="time" className={labelClass}>
                {t.form.time}
              </label>
              <select
                id="time"
                name="time"
                required
                className="form-input-ledger min-h-11 appearance-none text-base"
                defaultValue=""
              >
                <option disabled value="">
                  {t.form.selectTime}
                </option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="guests" className={labelClass}>
                {t.form.guests}
              </label>
              <select
                id="guests"
                name="guests"
                required
                className="form-input-ledger min-h-11 appearance-none text-base"
                defaultValue=""
              >
                <option disabled value="">
                  {t.form.selectGuests}
                </option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? t.form.guest : t.form.guestsLabel}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="flex flex-col">
            <label htmlFor="requests" className={labelClass}>
              {t.form.specialRequests}
            </label>
            <textarea
              id="requests"
              name="requests"
              rows={3}
              placeholder={t.form.specialRequestsPlaceholder}
              className="form-input-ledger resize-none text-base placeholder:text-outline-variant"
            />
          </div>
        </StaggerItem>

        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`text-center text-sm ${
                status === "success" ? "text-secondary" : "text-red-700"
              }`}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        <StaggerItem>
          <div className="pt-2 text-center sm:pt-6">
            <MagneticButton
              type="submit"
              disabled={status === "loading"}
              className="flex min-h-12 w-full items-center justify-center rounded bg-primary-container px-10 py-4 font-body text-xs font-semibold uppercase tracking-wider text-on-primary disabled:opacity-60 md:w-auto"
            >
              {status === "loading" ? t.form.submitting : t.form.submit}
            </MagneticButton>
          </div>
        </StaggerItem>
      </Stagger>
    </form>
  );
}
