import { LoginCredentials, AuthResponse, User, ApiResponse } from '../types';
import { axiosClient } from './axiosClient';
import { ENDPOINTS } from './endpoints';
import { storage } from '../utils';
import { STORAGE_KEYS } from '../constants';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosClient.post<any, ApiResponse<AuthResponse>>(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    const data = response.data;

    if (data?.tokens) {
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, data.tokens.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, data.tokens.refreshToken);
    }
    if (data?.user) {
      storage.set(STORAGE_KEYS.USER_INFO, data.user);
    }

    return data;
  },

  async register(registerData: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    department?: string;
  }): Promise<AuthResponse> {
    const response = await axiosClient.post<any, ApiResponse<AuthResponse>>(
      ENDPOINTS.AUTH.REGISTER,
      registerData
    );
    const data = response.data;

    if (data?.tokens) {
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, data.tokens.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, data.tokens.refreshToken);
    }
    if (data?.user) {
      storage.set(STORAGE_KEYS.USER_INFO, data.user);
    }

    return data;
  },

  async logout(): Promise<void> {
    try {
      const refreshToken = storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
      await axiosClient.post(ENDPOINTS.AUTH.LOGOUT, { refreshToken });
    } catch {
      // Ignore network error on logout
    } finally {
      storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      storage.remove(STORAGE_KEYS.USER_INFO);
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await axiosClient.get<any, ApiResponse<User>>(ENDPOINTS.AUTH.ME);
      const user = response.data;
      if (user) {
        storage.set(STORAGE_KEYS.USER_INFO, user);
        return user;
      }
      return storage.get<User>(STORAGE_KEYS.USER_INFO, null);
    } catch {
      return storage.get<User>(STORAGE_KEYS.USER_INFO, null);
    }
  },

  async forgotPassword(email: string): Promise<{ message: string; resetToken?: string }> {
    const response = await axiosClient.post<any, ApiResponse<{ message: string; resetToken?: string }>>(
      ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email }
    );
    return response.data;
  },

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await axiosClient.post<any, ApiResponse<{ message: string }>>(
      ENDPOINTS.AUTH.RESET_PASSWORD,
      { token, newPassword }
    );
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const response = await axiosClient.post<any, ApiResponse<{ message: string }>>(
      ENDPOINTS.AUTH.CHANGE_PASSWORD,
      { currentPassword, newPassword }
    );
    return response.data;
  },
};
