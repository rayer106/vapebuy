import { getRequestConfig } from "next-intl/server";
import { normalizeLocale } from "@/lib/utils/locale";
import { APP } from "@/lib/app";

export default getRequestConfig(async ({ requestLocale }) => {
  // ✅ next-intl v4 使用 requestLocale（是 Promise）而不是 locale
  const locale = await requestLocale;
  const safeLocale = normalizeLocale(
    locale ?? APP.defaultLocale
  );

  return {
    locale: safeLocale,
    messages: (await import(`@/messages/${safeLocale}.json`)).default
  };
});
