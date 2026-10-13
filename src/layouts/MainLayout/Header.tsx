import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Sun,
  Moon,
  Bell,
  LogOut,
  Shield,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useAuthStore } from '../../stores';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '../../contexts/ToastContext';
import { MOCK_USERS, ROUTES } from '../../constants';
import { Role } from '../../types';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    showToast('Đã đăng xuất khỏi hệ thống', 'info');
    navigate(ROUTES.LOGIN);
  };

  const switchRole = (role: Role) => {
    const targetUser = MOCK_USERS.find((u) => u.role === role);
    if (targetUser) {
      setUser(targetUser);
      showToast(`Đã chuyển vai trò sang: ${targetUser.fullName} (${role})`, 'success');
    }
    setShowRoleDropdown(false);
  };

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-header)',
        backdropFilter: 'var(--glass-backdrop)',
        WebkitBackdropFilter: 'var(--glass-backdrop)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-header)',
      }}
    >
      {/* Search Bar */}
      <div
        style={{
          position: 'relative',
          width: '320px',
        }}
      >
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
          }}
        />
        <input
          type="text"
          placeholder="Tìm kiếm mã xe, số VIN, khách hàng..."
          style={{
            width: '100%',
            padding: '8px 12px 8px 36px',
            fontSize: '0.8125rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Shortcut to Showroom Web */}
        <Link
          to={ROUTES.HOME}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            transition: 'all var(--transition-fast)',
          }}
          title="Mở Trang Chủ Showroom B2C"
        >
          <ExternalLink size={13} color="var(--color-primary)" />
          <span>Showroom Web</span>
        </Link>

        {/* Quick RBAC Switcher for testing */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRoleDropdown((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
            }}
            title="Đổi vai trò phân quyền để kiểm thử"
          >
            <Shield size={14} />
            <span>Vai trò: {user?.role}</span>
          </button>

          {showRoleDropdown && (
            <div
              className="animate-fade-in"
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                width: '210px',
                padding: '6px',
                zIndex: 'var(--z-drawer)',
              }}
            >
              <div style={{ padding: '6px 10px', fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                CHUYỂN NHANH VAI TRÒ (RBAC)
              </div>
              {MOCK_USERS.map((mockU) => (
                <button
                  key={mockU.role}
                  onClick={() => switchRole(mockU.role)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem',
                    textAlign: 'left',
                    color: user?.role === mockU.role ? 'var(--color-primary)' : 'var(--text-primary)',
                    backgroundColor: user?.role === mockU.role ? 'var(--color-primary-light)' : 'transparent',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{mockU.role}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{mockU.fullName}</div>
                  </div>
                  {user?.role === mockU.role && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color var(--transition-fast)',
          }}
          title={theme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
        >
          {theme === 'dark' ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} />}
        </button>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => showToast('Bạn có 3 thông báo mới từ hệ thống kinh doanh', 'info')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Thông báo"
          >
            <Bell size={17} />
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--color-danger)',
                borderRadius: 'var(--radius-full)',
              }}
            />
          </button>
        </div>

        {/* User Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px',
              borderRadius: 'var(--radius-full)',
            }}
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={user?.fullName}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-full)',
                objectFit: 'cover',
                border: '2px solid var(--color-primary)',
              }}
            />
          </button>

          {showUserMenu && (
            <div
              className="animate-fade-in"
              style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-xl)',
                width: '220px',
                padding: '8px',
                zIndex: 'var(--z-drawer)',
              }}
            >
              <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', marginBottom: '6px' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {user?.fullName}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {user?.email}
                </p>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                  color: 'var(--color-danger)',
                  fontWeight: 600,
                  transition: 'background-color var(--transition-fast)',
                }}
              >
                <LogOut size={16} />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
