import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '../constants';
import { storage } from '../utils';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const axiosClient = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach Authorization Bearer Token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error and Token Refresh Handling
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response) {
      const { status } = error.response;

      // Handle 401 Unauthorized - Attempt Token Refresh or Logout
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);

        if (refreshToken) {
          try {
            const refreshResponse = await axios.post(
              `${baseURL}/auth/refresh-token`,
              { refreshToken },
              { withCredentials: true }
            );
            const resData = (refreshResponse.data as any)?.data || refreshResponse.data;
            const newAccessToken = resData.accessToken;
            const newRefreshToken = resData.refreshToken;

            if (newAccessToken) {
              storage.set(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
              if (newRefreshToken) {
                storage.set(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
              }
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              }
              return axiosClient(originalRequest);
            }
          } catch (refreshErr) {
            // Refresh token expired or revoked -> Clear auth and redirect to login
            storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
            storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
            storage.remove(STORAGE_KEYS.USER_INFO);
            window.location.href = '/login?session_expired=true';
            return Promise.reject(refreshErr);
          }
        } else {
          storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
          storage.remove(STORAGE_KEYS.USER_INFO);
          window.location.href = '/login';
        }
      }

      // Handle 403 Forbidden
      if (status === 403) {
        console.warn('[API 403] Access Denied:', error.response.data);
      }

      // Handle 500 Server Error
      if (status >= 500) {
        console.error('[API 500] Internal Server Error:', error.response.data);
      }
    } else if (error.request) {
      console.error('[API Network] No response received from server. Is Backend running on port 5000?');
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
