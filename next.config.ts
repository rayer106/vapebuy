import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // ✅ SEO 优化配置
  images: {
    unoptimized: true, // 如果使用外部图片，保持此设置
    // 如果使用本地图片，建议改为：
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**',
    //   },
    // ],
  },
  
  // ✅ 生成 sitemap.xml 和 robots.txt（已通过 app/sitemap.ts 和 app/robots.ts 实现）
  
  // ✅ 压缩 HTML 输出，减小文件大小
  compress: true,
  
  // ✅ 启用 React 严格模式（开发环境）
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
