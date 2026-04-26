import { NextIntlClientProvider } from "next-intl";
import { LayoutParams } from "@/types/layout";
import { APP } from "@/lib/app";

type Props = {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        {/* ✅ SEO: 添加 hreflang 标签，告诉搜索引擎多语言版本关系 */}
        {APP.locales.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${lang}`}
          />
        ))}
        {/* x-default 指向默认语言版本 */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${APP.defaultLocale}`}
        />
      </head>
      <body>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
