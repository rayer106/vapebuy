import { APP, Locale } from "@/lib/app";

/**
 * 类型守卫：检查字符串是否为有效的 Locale
 */
export function isLocale(value: string): value is Locale {
  return (APP.locales as readonly string[]).includes(value);
}

/**
 * 标准化 locale：将任意字符串转换为有效的 Locale
 * - 如果输入是有效的 locale，直接返回
 * - 否则返回 defaultLocale
 */
export function normalizeLocale(value: string | undefined | null): Locale {
  if (!value || !isLocale(value)) {
    return APP.defaultLocale;
  }
  return value;
}

/**
 * 安全的 locale 解析器（用于 Server Components）
 * 结合 await params 和类型守卫，确保类型安全
 */
export async function resolveLocale(
  params: Promise<{ locale: string }>
): Promise<Locale> {
  const { locale } = await params;
  return normalizeLocale(locale);
}
