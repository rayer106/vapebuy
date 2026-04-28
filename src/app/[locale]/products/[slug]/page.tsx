import fs from "fs";
import path from "path";
import { getProduct } from "@/lib/content/product";
import { ProductParams, Product } from "@/types";
import { APP } from "@/lib/app";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<ProductParams>;
};

export default async function ProductPage({ params }: Props) {
  const { slug, locale } = await params;
  
  let product: Product | null = null;
  
  try {
    product = getProduct(slug, locale);
  } catch (error) {
    console.error("Error loading product:", error);
    notFound();
  }
  
  // 如果产品不存在，返回 404
  if (!product || !product.title) {
    notFound();
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* ✅ 添加面包屑导航 */}
      <Breadcrumbs 
        locale={locale}
        items={[
          { label: "Home", href: "" },
          { label: "Products", href: "/products" },
          { label: product.title }
        ]}
      />
      
      <h1>{product.title}</h1>
      
      {/* ✅ 使用 next/image 优化图片 - 添加 loading="eager" 优化 LCP */}
      {product.image && (
        <div style={{ 
          position: "relative", 
          width: "100%", 
          maxWidth: "600px", 
          height: "400px",
          marginBottom: "20px"
        }}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: "cover", borderRadius: "8px" }}
            sizes="(max-width: 768px) 100vw, 600px"
            priority
            loading="eager"
          />
        </div>
      )}
      
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>{product.desc}</p>
      <span style={{ fontSize: "24px", fontWeight: "bold", color: "#ff3d00" }}>
        ${product.price}
      </span>
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = getProduct(slug, locale);

  return {
    title: product.title,
    description: product.desc,
    // 添加 Open Graph 标签
    openGraph: {
      title: product.title,
      description: product.desc,
      images: product.image ? [{ url: product.image }] : [],
    },
    // 添加 Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.desc,
    }
  };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/content/products");

  const files = fs.readdirSync(dir);

  const slugs = files.map((f) =>
    f.replace(".md", "")
  );

  return slugs.flatMap((slug) =>
    APP.locales.map((locale) => ({
      slug,
      locale
    }))
  );
}
