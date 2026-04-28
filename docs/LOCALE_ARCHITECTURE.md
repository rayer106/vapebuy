# Locale 处理架构说明 (Locale Handling Architecture)

## 概述

本项目采用统一的 locale 处理方案，确保类型安全和代码一致性。

## 核心设计原则

1. **Next.js 层面**: `params.locale` 类型为 `string`（Next.js 15+ 要求）
2. **业务逻辑层面**: 使用严格的 `Locale` 类型 (`"en" | "de" | "nl"`)
3. **统一转换**: 通过 `resolveLocale()` 工具函数安全地转换类型
4. **单一数据源**: `Locale` 类型仅在 `src/lib/app.ts` 中定义一次

## Locale 类型使用规范

### ✅ 应该导入 Locale 的场景

**在类型定义文件中** (需要用于定义 Props 接口):
```typescript
// src/types/form.ts
import { Locale } from "@/lib/app";

export type ContactFormProps = {
  locale: Locale; // ✅ 正确：用于类型定义
};
```

**在工具函数中** (需要用于类型守卫):
```typescript
// src/lib/utils/locale.ts
import { APP, Locale } from "@/lib/app";

export function isLocale(value: string): value is Locale {
  return (APP.locales as readonly string[]).includes(value);
}
```

**在业务逻辑函数中** (需要用于参数类型):
```typescript
// src/lib/content/product.ts
import { Locale } from "@/lib/app";

export function getProduct(slug: string, locale: Locale): Product {
  // ...
}
```

### ❌ 不应该导入 Locale 的场景

**在 Server Components 页面中**:
```
// ❌ 错误：不要直接导入 Locale
import { Locale } from "@/lib/app";

type Props = {
  params: Promise<{ locale: Locale }>; // 会导致类型错误
};

// ✅ 正确：使用 string 类型 + resolveLocale()
import { resolveLocale } from "@/lib/utils/locale";

type Props = {
  params: Promise<{ locale: string }>; // Next.js 期望的类型
};

export default async function Page({ params }: Props) {
  const locale = await resolveLocale(params); // 转换为严格的 Locale 类型
}
```

**在 layout.tsx 中**:
```
// ❌ 错误：不要导入 Locale
import { Locale } from "@/lib/app";

// ✅ 正确：只导入 APP（如果需要）
import { APP } from "@/lib/app";
import { resolveLocale } from "@/lib/utils/locale";
```

### 📋 已废弃的类型

**LayoutParams** (`src/types/layout.ts`):
- ❌ **已删除** - 完全未被使用
- 原因：所有页面组件都使用内联的 Props 类型定义
- 替代方案：直接在组件中定义 `type Props = { params: Promise<{ locale: string }> }`

**ProductParams** (`src/types/route.ts`):
- ❌ **已废弃** - 仅保留空模块以避免导入错误
- 原因：所有页面组件都使用内联的 Props 类型定义
- 替代方案：直接在组件中定义 `type Props = { params: Promise<{ locale: string; slug?: string }> }`

### 📁 当前有效的类型文件

| 文件 | 用途 | 状态 |
|------|------|------|
| `types/product.ts` | Product 类型定义 | ✅ 使用中 |
| `types/navigation.ts` | BreadcrumbsProps, BreadcrumbItem | ✅ 使用中 |
| `types/form.ts` | ContactFormProps, ContactFormData | ✅ 使用中 |
| `types/common.ts` | ApiResponse, Status, PaginationParams | ✅ 使用中 |
| `types/route.ts` | 空模块（保持兼容性） | ⚠️ 已废弃 |
| `types/layout.ts` | - | ❌ 已删除 |

## 文件结构

```
src/
├── lib/
│   ├── app.ts              # APP 配置和 Locale 类型定义
│   └── utils/
│       └── locale.ts       # ✅ 核心：统一的 locale 处理工具
├── i18n/
│   └── request.ts          # next-intl 配置（使用 normalizeLocale）
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx      # 使用 resolveLocale()
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx    # 使用 resolveLocale()
│   │   │   └── [slug]/
│   │   │       └── page.tsx # 使用 resolveLocale()
│   │   └── contact/
│   │       └── page.tsx    # 使用 resolveLocale()
│   └── ...
└── proxy.ts                # Middleware（简化逻辑）
```

## 核心工具函数

### `src/lib/utils/locale.ts`

```typescript
// 1. 类型守卫
export function isLocale(value: string): value is Locale

// 2. 标准化（用于 i18n/request.ts）
export function normalizeLocale(value: string | undefined | null): Locale

// 3. 安全解析器（用于 Server Components）⭐ 核心函数
export async function resolveLocale(
  params: Promise<{ locale: string }>
): Promise<Locale>
```

**注意**: 已移除未使用的 `extractLocaleFromPathname` 函数，保持工具集精简。

## 使用规范

### ✅ 正确用法

**在 Server Components 中:**
```typescript
import { resolveLocale } from "@/lib/utils/locale";

type Props = {
  params: Promise<{ locale: string }>; // Next.js 期望的类型
};

export default async function Page({ params }: Props) {
  const locale = await resolveLocale(params); // ✅ 自动转换和验证
  
  return <div>{locale}</div>; // locale 类型为 "en" | "de" | "nl"
}
```

**在 i18n/request.ts 中:**
```typescript
import { normalizeLocale } from "@/lib/utils/locale";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const safeLocale = normalizeLocale(locale); // ✅ 处理 undefined/null
  
  return {
    locale: safeLocale,
    messages: (await import(`@/messages/${safeLocale}.json`)).default
  };
});
```

### ❌ 错误用法

```
// ❌ 不要手动验证
const { locale } = await params;
if (!["en", "de", "nl"].includes(locale)) {
  throw new Error("Invalid locale");
}

// ❌ 不要直接使用 string 类型的 locale
const product = getProduct(slug, locale); // 类型错误

// ✅ 应该使用
const locale = await resolveLocale(params);
const product = getProduct(slug, locale); // 类型正确
```

## Middleware 处理

`src/proxy.ts` 已简化，依赖 `next-intl` middleware 自动处理：

- 根路径 `/` → 重定向到 `/{defaultLocale}`
- 无效 locale → next-intl 自动处理重定向或 404
- 有效 locale → 正常渲染页面

## 类型流转图

```
URL: /en/products
     ↓
proxy.ts (Middleware)
     ↓
params.locale: string (Next.js 类型)
     ↓
resolveLocale(params)
     ↓
locale: "en" | "de" | "nl" (业务类型)
     ↓
getProduct(slug, locale) ✅ 类型安全
```

## 优势

1. **类型安全**: 所有业务代码中使用严格的 Locale 类型
2. **统一管理**: 所有 locale 转换逻辑集中在 `locale.ts`
3. **易于维护**: 新增语言只需修改 `APP.locales`
4. **符合规范**: 遵循 Next.js 15+ 和 next-intl v4 最佳实践

## 常见问题

### Q: 为什么不在 params 类型中直接使用 Locale?
A: Next.js 15+ 的类型系统要求 `params.locale` 为 `string`，强制使用严格类型会导致编译错误。

### Q: resolveLocale 会抛出错误吗?
A: 不会。如果 locale 无效，会自动 fallback 到 `defaultLocale`，确保应用始终可用。

### Q: 如何添加新语言?
A: 
1. 在 `src/lib/app.ts` 中添加语言代码到 `locales` 数组
2. 创建对应的 `src/messages/{lang}.json` 文件
3. 完成！所有类型会自动更新

### 📁 Next.js 特殊文件放置规范

根据 Next.js App Router 规范，以下特殊文件**必须**放在 `app/` 根目录：

| 文件 | 访问路径 | 说明 |
|------|---------|------|
| `app/sitemap.ts` | `/sitemap.xml` | XML 站点地图（自动添加 `.xml`） |
| `app/robots.ts` | `/robots.txt` | robots.txt 文件 |
| `app/manifest.ts` | `/manifest.webmanifest` | PWA manifest |
| `app/favicon.ico` | `/favicon.ico` | 网站图标 |

**重要规则**:
- ❌ **不要**在 `[locale]` 或其他动态路由下放置这些文件
- ✅ **必须**在 `app/` 根目录下
- 🌍 **多语言支持**: 在根文件中通过 `APP.locales` 生成所有语言版本的 URL

**示例 - sitemap.ts**:
```
// app/sitemap.ts (正确位置)
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];
  
  // 为每个语言生成首页 URL
  APP.locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      changeFrequency: 'weekly',
      priority: 1,
    });
  });
  
  return routes;
}
```

**访问方式**:
- 浏览器访问: `http://localhost:3000/sitemap.xml`
- Next.js 自动将 [sitemap.ts](file://d:\workspace\vape-buy\src\app\[locale]\sitemap.ts) 转换为 `/sitemap.xml`
- Content-Type 自动设置为 `application/xml`
