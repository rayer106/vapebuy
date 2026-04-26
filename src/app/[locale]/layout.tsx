import { NextIntlClientProvider } from "next-intl";
import { LayoutParams } from "@/types/layout";

type Props = {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}