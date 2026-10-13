import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/Logo.png';
import {
  Calendar,
  LogOut,
  LayoutDashboard,
  Car,
  ChevronDown,
  User as UserIcon,
  Search,
} from 'lucide-react';
import { ROUTES } from '../../../constants';
import { useAuthStore } from '../../../stores';
import { useToast } from '../../../contexts/ToastContext';
import { SearchModal } from '../../../components/SearchModal/SearchModal';

export const Navbar: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { showToast } = useToast();

  // Listen for Ctrl+K / Cmd+K global shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Active state helpers
  const isBuyCar = location.pathname.startsWith('/mua-xe') || location.pathname.startsWith('/buy-car');
  const isSellCar = location.pathname.startsWith('/ban-xe') || location.pathname.startsWith('/sell-car');
  const isValuation = location.pathname.startsWith('/dinh-gia') || location.pathname.startsWith('/valuation');
  const isPromotions = location.pathname.startsWith('/uu-dai') || location.pathname.startsWith('/promotions') || location.pathname.startsWith('/bang-gia');
  const isNews = location.pathname.startsWith('/news') || location.pathname.startsWith('/tin-tuc');
  const isTestDrive = location.pathname.startsWith('/test-drive') || location.pathname.startsWith('/lai-thu');

  const navItems = [
    { label: 'Mua xe', path: ROUTES.BUY_CAR, active: isBuyCar },
    { label: 'Bán xe', path: ROUTES.SELL_CAR, active: isSellCar },
    { label: 'Định giá AI', path: ROUTES.VALUATION, active: isValuation },
    { label: 'Ưu đãi', path: ROUTES.PROMOTIONS, active: isPromotions },
    { label: 'Đặt lịch lái thử', path: ROUTES.TEST_DRIVE, active: isTestDrive },
    { label: 'Tin tức', path: ROUTES.NEWS, active: isNews },
  ];

  // Helper to extract initial letter (e.g. "Nguyễn Văn Hiển" -> "H")
  const getUserInitial = (fullName?: string) => {
    if (!fullName) return 'U';
    const words = fullName.trim().split(' ').filter(Boolean);
    const lastWord = words[words.length - 1];
    return (lastWord || fullName).charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    showToast('Đã đăng xuất tài khoản thành công', 'info');
    navigate(ROUTES.HOME);
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Quản Trị Viên';
      case 'SALES_MANAGER':
        return 'Trưởng Phòng';
      case 'STAFF':
        return 'Chuyên Viên';
      case 'CUSTOMER':
      default:
        return 'Khách Hàng';
    }
  };

  const isStaffOrAdmin = user?.role === 'ADMIN' || user?.role === 'SALES_MANAGER' || user?.role === 'STAFF';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Navigation Links */}
        <div className="flex items-center gap-6 xl:gap-8 overflow-hidden">
          <Link to={ROUTES.HOME} className="flex items-center shrink-0 py-1" title="CarShop - Trang chủ">
            <img
              src={logoImg}
              alt="CarShop Logo"
              className="h-10 sm:h-11 w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>

          {/* Clean Navigation Links */}
          <nav className="flex items-center gap-1 xl:gap-1.5 font-medium text-sm text-slate-700 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-[8px] text-[13.5px] font-medium whitespace-nowrap transition-all shrink-0 ${
                  item.active
                    ? 'text-blue-600 font-semibold bg-blue-50/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Actions: Chỉ có Tìm kiếm & Tài khoản (Hoàn toàn không có icon 3 gạch thừa) */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-sm shrink-0 ml-4">
          {/* Nút Tìm kiếm Spotlight duy nhất */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200/80 text-xs font-medium transition-all cursor-pointer group shadow-2xs"
            title="Tìm kiếm xe (Ctrl + K)"
          >
            <Search size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="hidden sm:inline text-slate-500 group-hover:text-slate-800">Tìm kiếm xe...</span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 bg-white rounded-[5px] border border-slate-200 shadow-2xs">
              Ctrl K
            </kbd>
          </button>

          {/* ĐĂNG NHẬP / PROFILE AVATAR BUTTON */}
          {isAuthenticated && user ? (
            <div className="relative">
              {/* Profile Avatar Button Trigger */}
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 py-1 pl-1 pr-2.5 rounded-[10px] border border-slate-200 hover:border-blue-500 bg-white shadow-2xs transition-all cursor-pointer group"
                title={`Tài khoản: ${user.fullName}`}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-slate-100"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                    {getUserInitial(user.fullName)}
                  </div>
                )}

                <div className="text-left hidden lg:block max-w-[110px]">
                  <span className="block text-xs font-bold text-slate-800 truncate leading-tight group-hover:text-blue-600 transition-colors">
                    {user.fullName}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-medium leading-none">
                    {getRoleLabel(user.role)}
                  </span>
                </div>

                <ChevronDown size={13} className={`text-slate-400 group-hover:text-slate-600 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Backdrop for closing dropdown */}
              {userMenuOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />
              )}

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-[10px] shadow-xl border border-slate-100 py-2 z-50 animate-fade-in text-xs">
                  {/* User Profile Header */}
                  <div className="px-4 py-2.5 border-b border-slate-100 flex items-center gap-3">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.fullName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                        {getUserInitial(user.fullName)}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="font-bold text-slate-900 truncate text-sm">{user.fullName}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {getRoleLabel(user.role)}
                      </span>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="py-1">
                    {isStaffOrAdmin && (
                      <Link
                        to={ROUTES.DASHBOARD}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-blue-50 text-blue-700 font-semibold transition-colors"
                      >
                        <LayoutDashboard size={15} />
                        <span>Trang Quản Trị (Dashboard)</span>
                      </Link>
                    )}

                    <Link
                      to={ROUTES.BUY_CAR}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                    >
                      <Car size={15} className="text-slate-400" />
                      <span>Kho Xe Đang Bán</span>
                    </Link>

                    <Link
                      to={ROUTES.TEST_DRIVE}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                    >
                      <Calendar size={15} className="text-slate-400" />
                      <span>Lịch Hẹn Lái Thử</span>
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 font-semibold transition-colors text-left cursor-pointer"
                    >
                      <LogOut size={15} />
                      <span>Đăng Xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Khi chưa đăng nhập: Nút Đăng nhập */
            <Link
              to={ROUTES.LOGIN}
              className="flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs hover:shadow-blue-600/25 transition-all cursor-pointer whitespace-nowrap"
            >
              <UserIcon size={13} />
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </header>
  );
};
