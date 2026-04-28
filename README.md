# Vape Store - ToB SEO 站点

基于 Next.js 16 和 React 19 构建的现代化多语言 B2B 电商站点。

## 🚀 核心特性 (Features)

### ✅ SEO 优化 (SEO Optimizations)
- **Sitemap**: 自动生成于 `/sitemap.xml`，包含所有页面
- **Robots.txt**: 配置于 `/robots.txt`，控制爬虫行为
- **Hreflang Tags**: 多语言支持，正确的 SEO 标签
- **Open Graph & Twitter Cards**: 社交媒体分享优化
- **Structured Data Ready**: 易于添加 JSON-LD 结构化数据

### ✅ 性能优化 (Performance)
- **Static Generation**: 预渲染页面，加载速度快
- **Image Optimization**: 使用 `next/image` 自动优化图片
- **LCP Optimization**: 首屏图片使用 `loading="eager"` 提升 LCP 指标
- **Server Components**: 默认 RSC 架构，性能更优

### ✅ 国际化 (Internationalization)
- **Multi-language Support**: 英语、德语、荷兰语 (en/de/nl)
- **URL Structure**: 始终显示语言前缀 (`/en/`, `/de/`, `/nl/`)
- **Localized Content**: 每种语言独立的翻译文件

### ✅ 线索收集 (Lead Generation)
- **Contact Form**: 功能完整的询盘表单，带验证
- **API Endpoint**: `/api/lead` 使用 Zod 进行数据验证
- **Ready for Integration**: 已预留邮件服务接口 (Resend, SendGrid)

### ✅ 用户体验 (User Experience)
- **Breadcrumbs Navigation**: 清晰的网站导航层级
- **Responsive Design**: 移动端友好的响应式布局
- **Product Pages**: 动态路由，Markdown 内容管理
- **Error Handling**: 完善的错误边界和 404 页面

## 📁 项目结构 (Project Structure)

```
src/
├── app/
│   ├── [locale]/           # 多语言路由
│   │   ├── products/       # 产品页面
│   │   │   ├── [slug]/     # 动态产品详情
│   │   │   └── page.tsx    # 产品列表
│   │   ├── contact/        # 联系表单页面
│   │   └── page.tsx        # 首页
│   ├── api/
│   │   └── lead/           # 线索提交 API
│   ├── sitemap.ts          # SEO sitemap（根目录）
│   └── robots.ts           # SEO robots.txt（根目录）
├── components/
│   ├── Breadcrumbs.tsx     # 面包屑导航组件
│   └── ContactForm.tsx     # 线索收集表单
├── content/
│   └── products/           # Markdown 产品数据
├── lib/
│   ├── content/
│   │   └── product.ts      # 产品数据工具函数
│   └── env.ts              # 环境变量验证模块
├── types/                  # TypeScript 类型定义（集中管理）
│   ├── index.ts            # 统一导出
│   ├── product.ts          # 产品类型
│   ├── navigation.ts       # 导航相关类型
│   ├── form.ts             # 表单相关类型
│   └── common.ts           # 通用类型
└── messages/               # 翻译文件
```

## 🛠️ 环境搭建 (Setup)

### 1. 安装依赖 (Install Dependencies)
```bash
npm install
```

### 2. 环境变量配置 (Environment Variables)
复制 `.env.example` 到 `.env.local`：
```bash
cp .env.example .env.local
```

更新变量值：
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
# RESEND_API_KEY=re_xxx (可选)
# DATABASE_URL=postgresql://... (可选)
```

**重要提示**: 项目启动时会自动验证环境变量，如果缺少关键变量会终止进程并给出明确错误提示。

### 3. 运行开发服务器 (Run Development Server)
```bash
npm run dev
```

访问 `http://localhost:3000/en`

### 4. 生产环境构建 (Build for Production)
```bash
npm run build
npm run start
```

## 📝 添加产品 (Adding Products)

在 `src/content/products/` 目录下创建新的 Markdown 文件：

```markdown
---
slug: product-name
price: 19.99
image: /product-image.jpg
title:
  en: Product Name
  de: Produktname
  nl: Productnaam
desc:
  en: Product description in English
  de: Produktbeschreibung auf Deutsch
  nl: Productbeschrijving in het Nederlands
---
```

⚠️ **重要**: 所有元数据 (metadata) 必须放在 Frontmatter (`---` 分隔符) 内部，不要将字段放在外部。

## 🔧 集成邮件服务 (Integrating Email Service)

启用线索通知邮件：

1. 注册 [Resend](https://resend.com/) 或 [SendGrid](https://sendgrid.com/)
2. 将 API Key 添加到 `.env.local`：
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
3. 取消注释 `src/app/api/lead/route.ts` 中的邮件发送代码

## 🎨 自定义配置 (Customization)

### 样式 (Styling)
本项目使用 inline styles。建议迁移到 Tailwind CSS 以提升可维护性。

### 添加新语言 (Adding New Languages)
1. 在 `src/lib/app.ts` 中添加语言代码：
   ```typescript
   locales: ["en", "de", "nl", "fr"] as const
   ```
2. 创建翻译文件：`src/messages/fr.json`
3. 在 Markdown 内容文件中添加法语翻译

## 📊 SEO 检查清单 (SEO Checklist)

- ✅ Sitemap.xml 自动生成
- ✅ Robots.txt 正确配置
- ✅ Hreflang 标签嵌入布局
- ✅ 动态 Meta titles/descriptions
- ✅ Open Graph 标签
- ✅ Twitter Card 标签
- ✅ 语义化 HTML 结构
- ✅ 快速加载（静态生成）
- ✅ 移动端响应式
- ✅ 面包屑导航
- ✅ LCP 图片优化
- ⏳ 添加 Google Analytics（推荐）
- ⏳ 为产品添加结构化数据 (JSON-LD)

## 🚀 部署 (Deployment)

推荐平台：[Vercel](https://vercel.com/)

```bash
# 连接 GitHub 仓库到 Vercel
# 或通过 CLI 部署：
vercel --prod
```

## 🛡️ 最佳实践与常见问题 (Best Practices & Common Issues)

### 1. React Server Components 错误处理

**❌ 错误做法**: JSX 放在 try-catch 内部
```typescript
try {
  return <Component />;  // 不要这样做
} catch (error) {
  return <Error />;
}
```

**✅ 正确做法**: 分离数据获取和渲染逻辑
```typescript
let data = null;
let hasError = false;

try {
  data = await fetchData();
} catch (error) {
  hasError = true;
}

if (hasError) {
  return <Error />;
}

return <Component data={data} />;
```

**原因**: React 的渲染是异步的，try-catch 只能捕获同步的数据获取错误，无法捕获组件渲染阶段的错误。

### 2. Next.js 特殊文件位置 (Special Files Location)

- ✅ `sitemap.ts` → `app/sitemap.ts`（根目录）
- ✅ `robots.ts` → `app/robots.ts`（根目录）
- ❌ 不要放在 `[locale]/` 目录下

**原因**: 这些文件需要在根路径（如 `/sitemap.xml`）被访问，放在子目录会导致 404。

### 3. 图片加载优化 (Image Loading Optimization)

**首屏关键图片**（如产品详情页主图）：
```tsx
<Image
  src={product.image}
  alt={product.title}
  fill
  priority
  loading="eager"  // 立即加载，优化 LCP
/>
```

**列表页第一个产品**：
```tsx
{products.map((product, index) => (
  <Image
    src={product.image}
    loading={index === 0 ? "eager" : "lazy"}  // 第一个 eager，其他 lazy
  />
))}
```

**策略说明**:
- 首屏关键图片使用 `loading="eager"` 提升 LCP 指标
- 列表页仅第一个产品使用 eager，节省带宽
- 非首屏图片保持默认懒加载

### 4. 面包屑导航规范 (Breadcrumbs Navigation)

除首页外，所有主要业务页面都应包含面包屑导航：

```tsx
<Breadcrumbs 
  locale={locale}
  items={[
    { label: "Home", href: "" },
    { label: "Products", href: "/products" },
    { label: product.title }  // 当前页面（无 href）
  ]}
/>
```

**优势**:
- 帮助用户理解网站层级结构
- 提升 SEO，搜索引擎可识别面包屑路径
- 降低跳出率，提供清晰的导航路径

### 5. Markdown Frontmatter 格式规范

所有元数据必须在 `---` 分隔符内部：

```markdown
---
slug: product-name
price: 19.99
image: /product.jpg
title:
  en: Product Name
desc:
  en: Description
---

# 这是内容正文
```

**常见错误**: 将 `title` 或 `desc` 放在 `---` 外部，导致解析失败。

## 🧪 测试指南 (Testing)

### 自动化测试脚本 (Automated Test Script)
运行测试脚本验证所有功能：

```bash
# Windows
test.bat

# 或手动检查：
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/robots.txt
```

### 手动测试清单 (Manual Testing Checklist)

- [ ] 首页正常加载
- [ ] 产品列表显示所有产品
- [ ] 产品详情页不返回 404
- [ ] 联系表单提交成功
- [ ] Sitemap.xml 可访问
- [ ] Robots.txt 可访问
- [ ] 所有页面显示面包屑导航
- [ ] 图片加载无错误
- [ ] 多语言切换正常
- [ ] Lighthouse 评分 > 90

### 性能测试 (Performance Testing)

运行 Lighthouse（F12 → Lighthouse 面板）并验证：
- ✅ Largest Contentful Paint < 2.5s
- ✅ First Input Delay < 100ms
- ✅ Cumulative Layout Shift < 0.1
- ✅ Performance Score > 90

## 🔧 故障排除 (Troubleshooting)

### 问题 1: 产品详情页返回 404
**原因**: Markdown 文件格式错误，元数据未放在 Frontmatter 内

**解决方案**: 检查 Markdown 文件，确保所有元数据在 `---` 分隔符内部。

### 问题 2: 图片不显示
**可能原因**: 
- `public/` 目录中缺少图片文件
- 外部图片 URL 配置不正确

**解决方案**: 
- 验证图片文件存在于 `public/` 目录
- 或使用外部 URL 并正确配置 Next.js `images.unoptimized`

### 问题 3: Sitemap 无法访问
**原因**: `sitemap.ts` 文件位置不正确

**解决方案**: 确保 `sitemap.ts` 在 `app/` 根目录，而不是 `[locale]/` 目录。

### 问题 4: 浏览器显示 LCP 警告
**原因**: 首屏关键图片使用了懒加载

**解决方案**: 为首屏关键图片添加 `loading="eager"` 属性。

### 问题 5: Try-catch 包裹 JSX 报错
**原因**: React Server Components 中不能在 try-catch 内直接返回 JSX

**解决方案**: 将 JSX 渲染移到 try-catch 外部，使用状态变量追踪错误。

## 📚 附加文档 (Additional Documentation)

### 核心文档 (Core Documents)
- **[README.md](./README.md)** - 完整项目指南（本文件）
- **[CODE_REVIEW.md](./CODE_REVIEW.md)** - 全面代码审核报告（评分 4.5/5.0）
- **[TESTING.md](./TESTING.md)** - 详细的手动测试指南和检查清单

### 文档整理说明 (Document Organization)
所有临时修复报告和改进笔记已整合到本 README.md 中，以保持项目根目录整洁且易于维护。

**已合并的历史文档**:
- ✅ BREADCRUMBS_FIX.md → 最佳实践章节的面包屑导航规范
- ✅ FIXES.md & FIX_REPORT.md → 故障排除章节的产品相关问题
- ✅ TRY_CATCH_FIX.md → 最佳实践的 React Server Components 错误处理
- ✅ LCP_OPTIMIZATION.md → 最佳实践的图片加载优化
- ✅ TYPESCRIPT_AUDIT.md & IMPROVEMENTS_COMPLETED.md → 项目结构和类型定义相关内容
- ✅ FILE_CLEANUP_REPORT.md → 本文档整理说明

**为什么采用这种方式？**
- 📖 开发者一站式文档
- 🔍 更容易查找信息
- 🧹 更清晰的项目根目录
- 📈 更好的可维护性

## 📄 许可证 (License)

MIT
