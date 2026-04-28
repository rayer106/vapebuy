import ContactForm from "@/components/ContactForm";
import { resolveLocale } from "@/lib/utils/locale";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const locale = await resolveLocale(params);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Breadcrumbs 
        locale={locale}
        items={[
          { label: "Home", href: "" },
          { label: "Contact" }
        ]}
      />
      
      <ContactForm locale={locale} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact Us - Vape Store",
    description: "Get in touch with our team for wholesale inquiries and partnerships"
  };
}
