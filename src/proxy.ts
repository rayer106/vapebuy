import createMiddleware from "next-intl/middleware";
import { APP, Locale } from "@/lib/app";
import { NextRequest, NextResponse } from "next/server";

const middleware = createMiddleware({
  locales: APP.locales,
  defaultLocale: APP.defaultLocale,
  // ✅ SEO 最佳实践：始终显示语言前缀
  // 优点：
  // 1. 每个语言版本都有明确的 URL
  // 2. 搜索引擎可以正确识别和索引各语言版本
  // 3. 便于实现 hreflang 标签
  // 4. URL 结构一致，易于管理
  localePrefix: "always"
});

export default function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  // 提取路径中的第一个段作为可能的 locale
  const pathnameParts = pathname.split('/').filter(Boolean);
  const firstSegment = pathnameParts[0];
  
  // 情况1：检查第一个段是否是有效的 locale
  if (firstSegment && !APP.locales.includes(firstSegment as Locale)) {
    //// 如果第一个段不是有效语言，保持原 URL 但显示 404 内容
    //return NextResponse.rewrite(new URL(`/${APP.defaultLocale}/not-found`, req.url));

    // ✅ 修复：如果访问根路径或没有语言前缀，重定向到默认语言
    // 而不是直接返回 404
    if (!firstSegment || pathname === '/') {
      return NextResponse.redirect(new URL(`/${APP.defaultLocale}`, req.url));
    }
    
    // 如果是其他无效路径，让 next-intl middleware 处理
    // 它会自动判断是重定向还是显示 404
  }
  
  // 使用默认的 next-intl middleware 处理
  return middleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
