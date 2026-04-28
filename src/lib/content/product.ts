import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Locale } from "@/lib/app";
import { Product } from "@/types";

const DIR = path.join(process.cwd(), "src/content/products");

/**
 * 获取单个产品信息
 * 
 * @param slug - 产品 slug
 * @param locale - 语言代码
 * @returns Product 对象，如果文件不存在则返回 null
 */
export function getProduct(slug: string, locale: Locale): Product | null {
  const filePath = path.join(DIR, `${slug}.md`);
  
  // 检查文件是否存在，不存在则返回 null
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  try {
    const file = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(file);

    return {
      slug: data.slug || slug,
      price: data.price || 0,
      image: data.image || null,
      title: data.title?.[locale] || `Product ${slug}`,
      desc: data.desc?.[locale] || "No description available"
    };
  } catch (error) {
    console.error(`Error reading product file ${slug}:`, error);
    return null;
  }
}

// ✅ 新增：获取所有产品列表
export function getAllProducts(locale: Locale): Product[] {
  const files = fs.readdirSync(DIR);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace('.md', '');
      try {
        return getProduct(slug, locale);
      } catch (error) {
        console.error(`Error loading product ${slug}:`, error);
        return null;
      }
    })
    .filter((product): product is Product => product !== null);
}
