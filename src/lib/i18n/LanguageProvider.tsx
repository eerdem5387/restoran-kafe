"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Translations } from "./translations";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, LOCALES, type Locale } from "./types";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;

  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("tr")) return "tr";
  if (lang.startsWith("ar")) return "ar";
  if (lang.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === "tr" || stored === "en" || stored === "ar") return stored;
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredLocale();
    setLocaleState(stored ?? detectBrowserLocale());
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
  }, []);

  const dir = !isAdmin && locale === "ar" ? "rtl" : "ltr";
  const htmlLang = isAdmin ? "tr" : locale;

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = htmlLang;
    document.documentElement.dir = dir;
  }, [htmlLang, dir, ready]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
      dir,
    }),
    [locale, setLocale, dir],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export { LOCALES };
