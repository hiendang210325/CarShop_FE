import { create } from 'zustand';
import { User, Role, LoginCredentials } from '../types';
import { STORAGE_KEYS, ROLE_PERMISSIONS } from '../constants';
import { storage } from '../utils';
import { authService } from '../api/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    department?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  setUser: (user: User | null) => void;
  hasRole: (roles: Role | Role[]) => boolean;
  hasPermission: (permission: keyof typeof ROLE_PERMISSIONS['ADMIN']) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: storage.get<User>(STORAGE_KEYS.USER_INFO),
  isAuthenticated: Boolean(storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN)),
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng nhập thất bại';
      set({ isLoading: false, error: msg });
      throw err;
    }
  },

  register: async (data: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    department?: string;
  }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register(data);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng ký thất bại';
      set({ isLoading: false, error: msg });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  checkAuth: () => {
    const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    const user = storage.get<User>(STORAGE_KEYS.USER_INFO);
    if (token && user) {
      set({ user, isAuthenticated: true });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: Boolean(user) });
  },

  hasRole: (roles: Role | Role[]) => {
    const { user } = get();
    if (!user) return false;
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    return requiredRoles.includes(user.role);
  },

  hasPermission: (permission) => {
    const { user } = get();
    if (!user) return false;
    const permissions = ROLE_PERMISSIONS[user.role];
    return Boolean(permissions && permissions[permission]);
  },
}));
