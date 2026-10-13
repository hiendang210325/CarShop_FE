export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  USERS: {
    BASE: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    STATUS: (id: string) => `/users/${id}/status`,
    ROLE: (id: string) => `/users/${id}/role`,
  },
  CARS: {
    BASE: '/cars',
    DETAIL: (id: string) => `/cars/${id}`,
    STATUS: (id: string) => `/cars/${id}/status`,
  },
  ORDERS: {
    BASE: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    STATUS: (id: string) => `/orders/${id}/status`,
  },
  CUSTOMERS: {
    BASE: '/customers',
    LEADS: '/customers/leads',
  },
  DASHBOARD: {
    METRICS: '/dashboard/metrics',
    RECENT_ACTIVITIES: '/dashboard/recent-activities',
  },
} as const;
