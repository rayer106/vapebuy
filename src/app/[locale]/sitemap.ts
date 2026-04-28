import { MetadataRoute } from 'next';
import { APP } from '@/lib/app';
import { env } from '@/lib/env';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  
  // 读取所有产品
  const dir = path.join(process.cwd(), 'src/content/products');
  const files = fs.readdirSync(dir);
  const slugs = files.map(f => f.replace('.md', ''));
  
  const routes: MetadataRoute.Sitemap = [];
  
  // ✅ 添加首页（每个语言版本）
  APP.locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  });
  
  // ✅ 添加产品列表页（每个语言版本）
  APP.locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });
  
  // ✅ 添加产品详情页（每个语言版本）
  slugs.forEach(slug => {
    APP.locales.forEach(locale => {
      routes.push({
        url: `${baseUrl}/${locale}/products/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });
  
  // ✅ 添加联系页面（每个语言版本）
  APP.locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });
  
  return routes;
}
