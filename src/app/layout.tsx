import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

/**
 * 根布局组件
 * 
 * 在 Next.js App Router + next-intl 架构中：
 * - app/layout.tsx 是根布局（必须包含 html 和 body）
 * - app/[locale]/layout.tsx 是嵌套布局（不能包含 html 和 body）
 * 
 * 这个根布局作为 [locale] 动态路由的父级
 */
export default function RootLayout({ children }: Props) {
  return children;
}
