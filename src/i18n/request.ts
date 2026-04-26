import { getRequestConfig } from "next-intl/server";
import { normalizeLocale } from "@/lib/utils/locale";

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = normalizeLocale(locale);

  return {
    locale: safeLocale,
    messages: (await import(`@/messages/${safeLocale}.json`)).default
  };
});