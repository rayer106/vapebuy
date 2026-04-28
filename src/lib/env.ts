import { z } from 'zod';

/**
 * 环境变量 Schema 定义
 */
export const EnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url('NEXT_PUBLIC_SITE_URL must be a valid URL'),
  RESEND_API_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
});

/**
 * 环境变量类型
 */
export type Env = z.infer<typeof EnvSchema>;

/**
 * 验证环境变量
 * 
 * 在应用启动时调用，确保所有必需的环境变量都已正确配置。
 * 如果验证失败，会抛出错误并终止进程。
 * 
 * @example
 * ```typescript
 * import { validateEnv } from '@/lib/env';
 * 
 * // 在应用启动时验证
 * validateEnv();
 * ```
 */
export function validateEnv(): Env {
  const result = EnvSchema.safeParse(process.env);
  
  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    });
    console.error('\nPlease check your .env.local file and ensure all required variables are set.');
    console.error('You can copy .env.example to .env.local as a starting point.');
    process.exit(1);
  }
  
  return result.data;
}

/**
 * 已验证的环境变量对象
 * 在模块加载时自动验证，确保整个应用使用类型安全的环境变量
 */
export const env = validateEnv();
