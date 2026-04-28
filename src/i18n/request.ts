import { getRequestConfig } from "next-intl/server";
import { normalizeLocale } from "@/lib/utils/locale";
import { APP } from "@/lib/app";

export default getRequestConfig(async ({ requestLocale }) => {
  // ✅ next-intl v4 使用 requestLocale（是 Promise）而不是 locale
  const locale = await requestLocale;
  
  // ✅ 使用统一的 normalizeLocale 函数处理
  const safeLocale = normalizeLocale(locale);

  return {
    locale: safeLocale,
    messages: (await import(`@/messages/${safeLocale}.json`)).default
  };
});
