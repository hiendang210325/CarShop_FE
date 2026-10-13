import { Order, OrderStatus, ApiResponse } from '../types';
import { MOCK_ORDERS } from '../constants';
import { axiosClient } from './axiosClient';
import { ENDPOINTS } from './endpoints';

let ordersCache = [...MOCK_ORDERS];

export const orderService = {
  async getOrders(): Promise<Order[]> {
    try {
      const response = await axiosClient.get<any, any>(ENDPOINTS.ORDERS.BASE);
      // Unwrap from { success: true, data: { items: [...], total: ... } } or { items: [...] } or array
      const raw = response?.data !== undefined ? response.data : response;
      if (Array.isArray(raw)) {
        return raw.length > 0 ? raw : [...ordersCache];
      }
      if (raw && Array.isArray(raw.items)) {
        return raw.items.length > 0 ? raw.items : [...ordersCache];
      }
      if (Array.isArray(response)) {
        return response.length > 0 ? response : [...ordersCache];
      }
    } catch {
      // Fallback to cache if offline
    }
    return [...ordersCache];
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    try {
      const response = await axiosClient.patch<any, ApiResponse<Order>>(
        ENDPOINTS.ORDERS.STATUS(id),
        { status }
      );
      if (response?.data) return response.data;
    } catch {
      // Fallback
    }
    const order = ordersCache.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');

    order.status = status;
    order.updatedAt = new Date().toISOString();
    return { ...order };
  },

  async createOrder(
    orderData: Omit<Order, 'id' | 'orderCode' | 'createdAt' | 'updatedAt'>
  ): Promise<Order> {
    try {
      const response = await axiosClient.post<any, ApiResponse<Order>>(
        ENDPOINTS.ORDERS.BASE,
        orderData
      );
      if (response?.data) return response.data;
    } catch {
      // Fallback
    }
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderCode: `HD-2404-${String(ordersCache.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    ordersCache = [newOrder, ...ordersCache];
    return newOrder;
  },
};
