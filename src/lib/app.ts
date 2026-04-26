export const APP = {
  name: "Vape Store",

  locales: ["en", "de", "nl"] as const,

  defaultLocale: "en"
};

export type Locale = typeof APP.locales[number];