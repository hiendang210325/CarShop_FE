export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_OTP: '/verify-otp',
  RESET_PASSWORD: '/reset-password',
  NEWS: '/news',
  TEST_DRIVE: '/test-drive',

  // Public Consumer Navigation Routes (Header Links)
  BUY_CAR: '/mua-xe',
  SELL_CAR: '/ban-xe',
  VALUATION: '/dinh-gia',
  PROMOTIONS: '/uu-dai',

  // Protected Business Routes
  DASHBOARD: '/dashboard',
  MASTER_DASHBOARD: '/dashboard',
  CARS: '/cars',
  CAR_DETAILS: '/cars/:id',
  ORDERS: '/orders',
  CUSTOMERS: '/customers',
  USERS: '/users',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',

  // Error Pages
  FORBIDDEN: '/403',
  NOT_FOUND: '/404',
} as const;
