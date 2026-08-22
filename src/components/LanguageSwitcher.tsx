"use client";

import { LOCALES, useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Locale } from "@/lib/i18n/types";

type LanguageSwitcherProps = {
  variant?: "hero" | "dark" | "light";
  className?: string;
};

const variantStyles = {
  hero: {
    wrap: "gap-1.5",
    button:
      "min-h-9 min-w-[2.75rem] rounded-full px-3 font-body text-[11px] font-bold uppercase tracking-[0.18em] transition-colors sm:text-xs",
    active: "bg-primary text-on-primary shadow-sm",
    inactive:
      "bg-surface/80 text-primary/75 backdrop-blur-sm hover:bg-surface hover:text-primary",
  },
  dark: {
    wrap: "gap-2",
    button:
      "min-h-10 min-w-[3rem] rounded-full px-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] transition-colors",
    active: "bg-on-primary-container text-primary-container",
    inactive:
      "border border-white/15 bg-white/5 text-surface-variant hover:border-on-primary-container/40 hover:text-inverse-on-surface",
  },
  light: {
    wrap: "gap-2",
    button:
      "min-h-10 min-w-[3rem] rounded-full px-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] transition-colors",
    active: "bg-primary-container text-on-primary",
    inactive:
      "border border-outline-variant/40 bg-surface text-on-surface-variant hover:border-primary/30 hover:text-primary",
  },
} as const;

export function LanguageSwitcher({ variant = "light", className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage();
  const styles = variantStyles[variant];

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={`flex flex-row flex-wrap items-center justify-center ${styles.wrap} ${className}`}
    >
      {LOCALES.map(({ code, label, name }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code as Locale)}
            aria-pressed={active}
            aria-label={name}
            title={name}
            className={`${styles.button} ${active ? styles.active : styles.inactive}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
