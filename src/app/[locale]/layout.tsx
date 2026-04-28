import { NextIntlClientProvider } from "next-intl";
import { APP } from "@/lib/app";
import { env } from "@/lib/env";
import { Metadata } from "next";
import { resolveLocale } from "@/lib/utils/locale";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  // ✅ 使用统一的 locale 解析器，自动处理类型转换和验证
  const locale = await resolveLocale(params);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* SEO: 添加 hreflang 标签，告诉搜索引擎多语言版本关系 */}
        {APP.locales.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`${env.NEXT_PUBLIC_SITE_URL}/${lang}`}
          />
        ))}
        {/* x-default 指向默认语言版本 */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${env.NEXT_PUBLIC_SITE_URL}/${APP.defaultLocale}`}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  
  return {
    title: {
      template: `%s | ${APP.name}`,
      default: APP.name,
    },
    description: `Welcome to ${APP.name} - Your trusted B2B partner`,
    alternates: {
      canonical: `${env.NEXT_PUBLIC_SITE_URL}/${locale}`,
      languages: Object.fromEntries(
        APP.locales.map((lang) => [lang, `${env.NEXT_PUBLIC_SITE_URL}/${lang}`])
      ),
    },
  };
}
