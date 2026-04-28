# SEO 优化架构指南 (SEO Optimization Architecture Guide)

## 📊 当前项目渲染策略分析

### 现状：混合模式（SSG + SSR）

| 页面 | 渲染策略 | 说明 |
|------|---------|------|
| **产品详情页** (`/products/[slug]`) | ✅ **SSG** (静态生成) | 有 `generateStaticParams()`，构建时预渲染所有产品 |
| **产品列表页** (`/products`) | ⚠️ **SSR → ISR** (已优化) | 添加了 `revalidate = 3600`，每小时更新 |
| **首页** ([/](file://d:\workspace\vape-buy\next.config.ts)) | ⚠️ **SSR → SSG** (已优化) | 添加了 `revalidate = false`，纯静态生成 |
| **联系页** (`/contact`) | ⚠️ **SSR** (服务端渲染) | 表单页面，需要动态处理 |

---

## 🎯 SEO 最佳架构方案

### 核心原则

```
静态内容 → SSG (构建时生成)
动态内容 → ISR (定时重新验证)
用户交互 → CSR (客户端 hydration)
```

### 1. **SSG (Static Site Generation) - 静态生成**

**适用场景**:
- ✅ 产品详情页（内容固定或低频更新）
- ✅ 博客文章页
- ✅ 关于我们、服务介绍等静态页面
- ✅ 首页（翻译文件在构建时确定）

**优势**:
- 🚀 最快的 TTFB (Time to First Byte)
- 🌍 CDN 友好，全球加速
- 🔍 搜索引擎爬虫抓取效率最高
- 💪 服务器负载最低

**配置方式**:
```typescript
// 纯静态（永不重新验证）
export const revalidate = false;

// 带 ISR（定时重新验证）
export const revalidate = 86400; // 秒数：24小时
```

### 2. **ISR (Incremental Static Regeneration) - 增量静态再生**

**适用场景**:
- 📦 产品列表页（可能频繁增删）
- 💰 价格会变的产品页
- 📊 库存信息页面

**优势**:
- ✅ 保持 SSG 的性能优势
- ✅ 自动更新内容，无需重新构建
- ✅ 后台异步重新生成，不影响用户体验

**推荐重新验证周期**:
- 产品列表：3600 秒（1 小时）
- 产品详情：86400 秒（24 小时）
- 博客/新闻：300 秒（5 分钟）

### 3. **SSR (Server-Side Rendering) - 服务端渲染**

**适用场景**:
- 👤 用户个性化页面（需要 Cookie/Session）
- 📈 实时数据展示（股票、天气）
- 📝 表单提交后的结果页

**劣势**:
- ❌ TTFB 较慢（每次请求都需服务器处理）
- ❌ 服务器负载高
- ❌ CDN 缓存效果差

**建议**: SEO 关键页面应尽量避免使用 SSR

---

## ✅ 已实施的优化

### 1. 产品详情页 - SSG + ISR

```typescript
// src/app/[locale]/products/[slug]/page.tsx

export async function generateStaticParams() {
  // 构建时预渲染所有产品页面
  const slugs = getAllProductSlugs();
  return slugs.flatMap((slug) =>
    APP.locales.map((locale) => ({ slug, locale }))
  );
}

// ISR：每 24 小时重新验证一次
export const revalidate = 86400;
```

### 2. 产品列表页 - ISR

```typescript
// src/app/[locale]/products/page.tsx

// ISR：每 1 小时重新验证一次
export const revalidate = 3600;
```

### 3. 首页 - SSG

```typescript
// src/app/[locale]/page.tsx

// 纯静态生成，永不重新验证
export const revalidate = false;
```

### 4. Next.js 配置优化

```typescript
// next.config.ts

const nextConfig: NextConfig = {
  compress: true,              // ✅ 启用 gzip/brotli 压缩
  reactStrictMode: true,       // ✅ 开发环境严格模式
  images: {
    unoptimized: true,         // ✅ 外部图片配置
  },
};
```

---

## 📋 SEO 最佳实践清单

### 1. 元数据优化 ✅

- [x] 每个页面有唯一的 `<title>` 和 `<meta description>`
- [x] 使用 `generateMetadata()` 动态生成本地化元数据
- [x] 添加 Open Graph 标签（Facebook、LinkedIn 分享）
- [x] 添加 Twitter Card 标签

**示例**:
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct(slug, locale);
  
  return {
    title: product.title,
    description: product.desc,
    openGraph: {
      title: product.title,
      description: product.desc,
      images: product.image ? [{ url: product.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.desc,
    }
  };
}
```

### 2. 结构化数据 (Schema.org) ⏳ 待实施

- [ ] 产品页添加 `Product` schema
- [ ] 面包屑导航添加 `BreadcrumbList` schema
- [ ] 组织信息添加 `Organization` schema

**示例**（待添加到产品详情页）:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.desc,
      image: product.image,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "USD"
      }
    })
  }}
/>
```

### 3. 性能优化 ✅

- [x] 使用 `next/image` 优化图片（LCP 指标）
- [x] 首屏图片设置 `priority` 和 `loading="eager"`
- [x] 启用 gzip/brotli 压缩
- [ ] 使用 CDN 加速静态资源（部署时配置）

### 4. 多语言 SEO ✅

- [x] URL 包含语言前缀 (`/en/products`)
- [x] 添加 `hreflang` 标签（在 layout.tsx 中）
- [x] 设置 `<html lang={locale}>`
- [x] 为每个语言生成独立的 sitemap

**示例**:
```tsx
// app/[locale]/layout.tsx
{APP.locales.map((lang) => (
  <link
    key={lang}
    rel="alternate"
    hrefLang={lang}
    href={`${env.NEXT_PUBLIC_SITE_URL}/${lang}`}
  />
))}
```

### 5. 技术 SEO ✅

- [x] 生成 `sitemap.xml`（app/sitemap.ts）
- [x] 配置 `robots.txt`（app/robots.ts）
- [x] 确保所有页面返回正确的 HTTP 状态码
- [x] 避免软 404（内容不存在时返回 404 状态）

---

## 📊 Core Web Vitals 目标

| 指标 | 目标值 | 当前状态 |
|------|--------|---------|
| **LCP** (Largest Contentful Paint) | < 2.5s | ⏳ 待测试 |
| **FID** (First Input Delay) | < 100ms | ⏳ 待测试 |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ⏳ 待测试 |

---

## 🔧 监控与优化工具

### 推荐工具
1. **Google PageSpeed Insights** - 在线性能测试
2. **Lighthouse** (Chrome DevTools) - 本地性能审计
3. **Google Search Console** - SEO 监控
4. **Screaming Frog SEO Spider** - 网站爬取分析

### 本地测试命令
```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 访问 http://localhost:3000 并使用 Lighthouse 测试
```

---

## ⚠️ 注意事项

1. **避免过度 ISR**: 重新验证频率过高会增加服务器负载
2. **缓存策略**: 配合 CDN 缓存头（Cache-Control）使用
3. **构建时间**: SSG 页面过多会延长构建时间，考虑按需生成
4. **内存管理**: ISR 会在服务器内存中缓存页面，注意内存限制

---

## 📈 下一步优化建议

### 短期（1-2 周）
1. ✅ 添加结构化数据（Schema.org）
2. ✅ 优化图片格式（WebP/AVIF）
3. ✅ 添加懒加载（非首屏图片）

### 中期（1 个月）
1. 📊 部署到 Vercel 并配置 CDN
2. 🔍 提交 sitemap 到 Google Search Console
3. 📈 监控 Core Web Vitals 指标

### 长期（3 个月）
1. 🌐 配置自定义域名和 HTTPS
2. 📱 优化移动端体验
3. 🎯 A/B 测试不同元数据策略

---

## 📚 参考资料

- [Next.js Rendering Strategies](https://nextjs.org/docs/app/building-your-application/rendering)
- [Google Search Central - SEO Basics](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Web.dev - Core Web Vitals](https://web.dev/vitals/)
