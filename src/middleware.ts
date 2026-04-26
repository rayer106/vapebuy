import createMiddleware from "next-intl/middleware";
import { APP } from "@/lib/app";

export default createMiddleware({
  locales: APP.locales,
  defaultLocale: APP.defaultLocale
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};