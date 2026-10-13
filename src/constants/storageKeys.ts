const PREFIX = 'carshop_';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: `${PREFIX}access_token`,
  REFRESH_TOKEN: `${PREFIX}refresh_token`,
  USER_INFO: `${PREFIX}user_info`,
  THEME: `${PREFIX}theme_mode`,
  SIDEBAR_COLLAPSED: `${PREFIX}sidebar_collapsed`,
  CAR_INVENTORY: `${PREFIX}cars_inventory_v1`,
} as const;
