import createMiddleware from "next-intl/middleware";
import { APP } from "@/lib/app";
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
  //// 如果第一个段不是有效语言，保持原 URL 但显示 404 内容
  //return NextResponse.rewrite(new URL(`/${APP.defaultLocale}/not-found`, req.url));
  // ✅ 修复：如果访问根路径或没有语言前缀，重定向到默认语言
  if (pathname === '/' || pathname === '') {
    return NextResponse.redirect(new URL(`/${APP.defaultLocale}`, req.url));
  }
  
  // 使用默认的 next-intl middleware 处理所有其他情况
  // next-intl 会自动处理：
  // - 无效 locale 的重定向
  // - 缺失 locale 的补全
  // - not-found 页面的显示
  return middleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
