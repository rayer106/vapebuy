import { Locale } from "@/lib/app";

/**
 * 面包屑导航项
 */
export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/**
 * 面包屑导航组件 Props
 */
export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  locale: Locale;
};
