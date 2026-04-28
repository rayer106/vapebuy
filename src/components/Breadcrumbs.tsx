import Link from "next/link";
import { BreadcrumbItem, BreadcrumbsProps } from "@/types";

/**
 * 面包屑导航组件
 * 
 * @example
 * ```tsx
 * <Breadcrumbs
 *   locale={locale}
 *   items={[
 *     { label: "Home", href: "" },
 *     { label: "Products", href: "/products" },
 *     { label: "Product Name" }
 *   ]}
 * />
 * ```
 */
export default function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: "20px" }}>
      <ol style={{ 
        display: "flex", 
        listStyle: "none", 
        padding: 0, 
        margin: 0,
        gap: "8px"
      }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} style={{ display: "flex", alignItems: "center" }}>
              {index > 0 && (
                <span style={{ margin: "0 8px", color: "#666" }}>›</span>
              )}
              
              {isLast ? (
                <span style={{ 
                  fontWeight: "bold",
                  color: "#000"
                }}>
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={`/${locale}${item.href || ''}`}
                  style={{ 
                    color: "#0066cc",
                    textDecoration: "none"
                  }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
