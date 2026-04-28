import { Locale } from "@/lib/app";

/**
 * 联系表单 Props
 */
export type ContactFormProps = {
  locale: Locale;
  product?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

/**
 * 表单数据类型
 */
export type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
};
