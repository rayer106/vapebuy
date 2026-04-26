import { getRequestConfig } from "next-intl/server";
import { normalizeLocale } from "@/lib/utils/locale";
import { APP } from "@/lib/app";

export default getRequestConfig(async ({ locale }) => {
  // ✅ 关键：先处理 undefined
  const safeLocale = normalizeLocale(
    locale ?? APP.defaultLocale
  );

  return {
    locale: safeLocale,
    messages: (await import(`@/messages/${safeLocale}.json`)).default
  };
});