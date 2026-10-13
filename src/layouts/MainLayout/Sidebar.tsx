import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  FileSpreadsheet,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  UserCheck,
} from 'lucide-react';
import { ROUTES } from '../../constants';
import { useAuthStore } from '../../stores';
import { storage } from '../../utils';
import { STORAGE_KEYS } from '../../constants';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { user } = useAuthStore();

  const navItems = [
    {
      label: 'Bảng Điều Khiển (KPI)',
      path: ROUTES.DASHBOARD,
      icon: <LayoutDashboard size={20} />,
      roles: ['ADMIN', 'SALES_MANAGER', 'STAFF'],
    },
    {
      label: 'Kho xe & Danh mục',
      path: ROUTES.CARS,
      icon: <Car size={20} />,
      roles: ['ADMIN', 'SALES_MANAGER', 'STAFF'],
    },
    {
      label: 'Đơn hàng & Giao dịch',
      path: ROUTES.ORDERS,
      icon: <FileSpreadsheet size={20} />,
      roles: ['ADMIN', 'SALES_MANAGER'],
    },
    {
      label: 'Khách hàng & Leads',
      path: ROUTES.CUSTOMERS,
      icon: <Users size={20} />,
      roles: ['ADMIN', 'SALES_MANAGER', 'STAFF'],
    },
    {
      label: 'Quản Lý Người Dùng',
      path: ROUTES.USERS,
      icon: <UserCheck size={20} />,
      roles: ['ADMIN'],
    },
    {
      label: 'Cài đặt hệ thống',
      path: ROUTES.SETTINGS,
      icon: <Settings size={20} />,
      roles: ['ADMIN'],
    },
    {
      label: 'Trang Chủ Showroom',
      path: ROUTES.HOME,
      icon: <ExternalLink size={20} />,
      roles: ['ADMIN', 'SALES_MANAGER', 'STAFF'],
    },
  ];

  const handleToggle = () => {
    storage.set(STORAGE_KEYS.SIDEBAR_COLLAPSED, !collapsed);
    onToggleCollapse();
  };

  return (
    <aside
      style={{
        width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-sidebar)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
        transition: 'width var(--transition-smooth)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        userSelect: 'none',
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: collapsed ? '0' : '0 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
              flexShrink: 0,
            }}
          >
            <Car size={22} color="#ffffff" />
          </div>
          {!collapsed && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>
                CAR<span style={{ color: '#60a5fa' }}>SHOP</span>
              </span>
              <span style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Enterprise Auto
              </span>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={handleToggle}
            style={{
              color: '#94a3b8',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Thu gọn"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Nav Menu */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {!collapsed && (
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0 8px 10px',
            }}
          >
            Menu Chính
          </p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const hasAccess = user && item.roles.includes(user.role);
            if (!hasAccess) return null;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: collapsed ? '12px 0' : '10px 14px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.875rem',
                  transition: 'all var(--transition-fast)',
                })}
                title={collapsed ? item.label : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Collapse button at bottom when collapsed */}
      {collapsed && (
        <div style={{ padding: '12px', display: 'flex', justifyContent: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={handleToggle}
            style={{
              color: '#94a3b8',
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Mở rộng Sidebar"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* User Mini Card in Sidebar */}
      {!collapsed && user && (
        <div
          style={{
            padding: '16px',
            margin: '12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt={user.fullName}
            style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
          />
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {user.fullName}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={12} color="#60a5fa" />
              <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                {user.role}
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
