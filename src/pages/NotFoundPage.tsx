import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { ROUTES } from '../constants';
import { Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

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
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <Compass size={40} />
      </div>

      <h1 style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '12px 0 8px' }}>
        Trang Không Tồn Tại
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', marginBottom: '24px', fontSize: '0.9375rem' }}>
        Đường dẫn bạn yêu cầu không khả dụng hoặc đã được di chuyển trong hệ thống quản trị CarShop.
      </p>

      <Button
        variant="primary"
        size="lg"
        leftIcon={<Home size={18} />}
        onClick={() => navigate(ROUTES.DASHBOARD)}
      >
        Quay Lại Trang Chủ
      </Button>
    </div>
  );
};
