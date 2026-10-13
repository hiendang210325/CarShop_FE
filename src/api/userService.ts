import { User, ApiResponse } from '../types';
import { axiosClient } from './axiosClient';
import { ENDPOINTS } from './endpoints';

export interface UserFilterParams {
  search?: string;
  role?: string;
  isActive?: boolean;
}

export const userService = {
  async getUsers(params?: UserFilterParams): Promise<User[]> {
    const response = await axiosClient.get<any, ApiResponse<User[]>>(ENDPOINTS.USERS.BASE, {
      params,
    });
    return response.data || [];
  },

  async getUserById(id: string): Promise<User> {
    const response = await axiosClient.get<any, ApiResponse<User>>(ENDPOINTS.USERS.DETAIL(id));
    return response.data;
  },

  async updateUserStatus(id: string, isActive: boolean): Promise<User> {
    const response = await axiosClient.patch<any, ApiResponse<User>>(
      ENDPOINTS.USERS.STATUS(id),
      { isActive }
    );
    return response.data;
  },

  async updateUserRole(id: string, role: string): Promise<User> {
    const response = await axiosClient.patch<any, ApiResponse<User>>(
      ENDPOINTS.USERS.ROLE(id),
      { role }
    );
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await axiosClient.delete(ENDPOINTS.USERS.DETAIL(id));
  },
};
