import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { ROUTES } from '../constants';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../stores';

export const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-primary)',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-danger-light)',
          color: 'var(--color-danger)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <ShieldAlert size={40} />
      </div>

      <h1 style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--color-danger)', lineHeight: 1 }}>
        403
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '12px 0 8px' }}>
        Từ Chối Truy Cập (Forbidden)
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', marginBottom: '24px', fontSize: '0.9375rem' }}>
        Tài khoản hiện tại của bạn ({user?.fullName} - Vai trò: <strong>{user?.role}</strong>) không được cấp thẩm quyền truy cập tính năng này.
      </p>

      <Button
        variant="primary"
        size="lg"
        leftIcon={<ArrowLeft size={18} />}
        onClick={() => navigate(ROUTES.DASHBOARD)}
      >
        Quay Lại Dashboard
      </Button>
    </div>
  );
};
