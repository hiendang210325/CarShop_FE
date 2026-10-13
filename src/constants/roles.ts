import { Role } from '../types';

export const ROLES: Record<Role, Role> = {
  ADMIN: 'ADMIN',
  SALES_MANAGER: 'SALES_MANAGER',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
};

export const ROLE_PERMISSIONS: Record<Role, {
  canManageUsers: boolean;
  canManageCars: boolean;
  canDeleteCars: boolean;
  canApproveOrders: boolean;
  canViewReports: boolean;
  canManageSettings: boolean;
}> = {
  ADMIN: {
    canManageUsers: true,
    canManageCars: true,
    canDeleteCars: true,
    canApproveOrders: true,
    canViewReports: true,
    canManageSettings: true,
  },
  SALES_MANAGER: {
    canManageUsers: false,
    canManageCars: true,
    canDeleteCars: false,
    canApproveOrders: true,
    canViewReports: true,
    canManageSettings: false,
  },
  STAFF: {
    canManageUsers: false,
    canManageCars: false, // view only or edit assigned
    canDeleteCars: false,
    canApproveOrders: false,
    canViewReports: false,
    canManageSettings: false,
  },
  CUSTOMER: {
    canManageUsers: false,
    canManageCars: false,
    canDeleteCars: false,
    canApproveOrders: false,
    canViewReports: false,
    canManageSettings: false,
  },
};
