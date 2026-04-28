export const APP = {
  name: "Vape Store",

  locales: ["en", "de", "nl"] as const,

  defaultLocale: "en"
} as const;

// ✅ 关键：从 locales 推导类型
export type Locale = typeof APP.locales[number];
