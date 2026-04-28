import { getAllProducts } from "@/lib/content/product";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from "next";
import { resolveLocale } from "@/lib/utils/locale";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProductsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  
  let products: Product[] = [];
  let hasError = false;
  
  try {
    products = getAllProducts(locale);
  } catch (error) {
    console.error("Error loading products:", error);
    hasError = true;
  }

  // ✅ 错误状态显示
  if (hasError) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Error</h1>
        <p>Failed to load products. Please try again later.</p>
      </div>
    );
  }

  // ✅ 正常渲染
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* ✅ 添加面包屑导航 */}
      <Breadcrumbs 
        locale={locale}
        items={[
          { label: "Home", href: "" },
          { label: "Products" }
        ]}
      />
      
      <h1>Products</h1>
      
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px" 
        }}>
          {products.map((product, index) => (
            <Link 
              key={product.slug} 
              href={`/${locale}/products/${product.slug}`}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                textDecoration: "none",
                color: "inherit",
                overflow: "hidden",
                transition: "box-shadow 0.2s",
              }}
            >
              {/* ✅ 使用 next/image 优化产品图片 - 第一个产品使用 eager 加载优化 LCP */}
              {product.image && (
                <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  height: "200px",
                  backgroundColor: "#f5f5f5"
                }}>
                  <Image
                    src={product.image}
                    alt={product.title || "Product"}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 300px"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              )}
              
              <div style={{ padding: "16px" }}>
                <h2 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>{product.title}</h2>
                <p style={{ margin: "0 0 12px 0", color: "#666", fontSize: "14px" }}>
                  {product.desc}
                </p>
                <span style={{ 
                  fontWeight: "bold", 
                  color: "#ff3d00",
                  fontSize: "20px"
                }}>
                  ${product.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  
  return {
    title: "Products - Vape Store",
    description: "Browse our collection of premium vape products"
  };
}
