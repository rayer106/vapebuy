import { NextIntlClientProvider } from "next-intl";
import { LayoutParams } from "@/types";
import { APP } from "@/lib/app";
import { env } from "@/lib/env";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale}>
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
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
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
