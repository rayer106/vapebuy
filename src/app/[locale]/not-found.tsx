import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>404</h1>
      <p>{t("message")}</p>
    </div>
  );
}
