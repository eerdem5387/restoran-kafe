export type Locale = "tr" | "en" | "ar";

export const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: "tr", label: "TR", name: "Türkçe" },
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "AR", name: "العربية" },
];

export const DEFAULT_LOCALE: Locale = "tr";
export const LOCALE_STORAGE_KEY = "berrays-locale-v2";
