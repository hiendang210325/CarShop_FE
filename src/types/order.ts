import { Car } from './car';
import { User } from './auth';

export type OrderStatus = 'PENDING' | 'APPROVED' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED';
export type PaymentMethod = 'BANK_TRANSFER' | 'INSTALLMENT' | 'CASH' | 'CREDIT_CARD';

export interface Order {
  id: string;
  orderCode: string;
  carId: string;
  car?: Car;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  salesPersonId: string;
  salesPerson?: User;
  totalAmount: number;
  depositAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  deliveryDate?: string;
  createdAt: string;
  updatedAt: string;
}
