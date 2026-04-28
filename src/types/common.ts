/**
 * API 响应类型
 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: unknown[];
};

/**
 * 分页参数
 */
export type PaginationParams = {
  page: number;
  limit: number;
};

/**
 * 分页响应
 */
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
};

/**
 * 状态类型
 */
export type Status = 'idle' | 'loading' | 'success' | 'error';
