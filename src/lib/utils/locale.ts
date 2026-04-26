import { APP, Locale } from "@/lib/app";

export function isLocale(value: string): value is Locale {
  return APP.locales.includes(value as Locale);
}

export function normalizeLocale(value: string): Locale {
  return isLocale(value) ? value : APP.defaultLocale;
}