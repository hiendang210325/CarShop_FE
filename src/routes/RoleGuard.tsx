import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores';
import { Role } from '../types';
import { ROUTES } from '../constants';

interface RoleGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { user, hasRole } = useAuthStore();

  if (!user || !hasRole(allowedRoles)) {
    if (user?.role === 'CUSTOMER') {
      return <Navigate to={ROUTES.HOME} replace />;
    }
    return <Navigate to={ROUTES.FORBIDDEN} replace />;
  }

  return <>{children}</>;
};
