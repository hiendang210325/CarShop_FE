import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/Logo.png';
import {
  Phone,
  Menu,
  X,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { label: 'Ưu đãi & Bảng giá', path: ROUTES.PROMOTIONS, active: isPromotions },
    { label: 'Tin tức & Review', path: ROUTES.NEWS, active: isNews },
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
    setMobileMenuOpen(false);
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8 xl:gap-10">
          <Link to={ROUTES.HOME} className="flex items-center group py-1" title="CarShop - Trang chủ">
            <img
              src={logoImg}
              alt="CarShop Logo"
              className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 font-medium text-sm text-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-1 transition-colors relative ${
                  item.active
                    ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                    : 'hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 text-sm">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-[10px] bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200/90 text-xs font-medium transition-all cursor-pointer group shadow-2xs"
            title="Tìm kiếm xe (Ctrl + K)"
          >
            <Search size={14} className="text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="hidden xl:inline">Tìm kiếm xe...</span>
            <span className="inline xl:hidden">Tìm xe</span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
              Ctrl K
            </kbd>
          </button>

          {/* Hotline Pill */}
          <a
            href="tel:19008888"
            className="flex items-center gap-2 px-3 py-2 rounded-[10px] border border-slate-200 text-slate-700 font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors"
            title="Đường dây nóng hỗ trợ 24/7"
          >
            <Phone size={14} className="text-blue-600" />
            <span className="text-xs font-bold">1900 8888</span>
          </a>

          {/* Lái Thử CTA Button */}
          <Link
            to={ROUTES.TEST_DRIVE}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-xs font-bold transition-all ${
              isTestDrive
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            <Calendar size={14} className="text-blue-600" />
            <span>Đặt Lịch Lái Thử</span>
          </Link>

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
                    className="w-8 h-8 rounded-full object-cover border border-slate-100"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                    {getUserInitial(user.fullName)}
                  </div>
                )}

                <div className="text-left hidden md:block max-w-[110px]">
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
                    {/* Link to Admin Dashboard for staff/admins */}
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
              className="flex items-center justify-center px-4 py-2 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>

        {/* Mobile Header Actions */}
        <div className="lg:hidden flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="p-2 rounded-[10px] text-slate-600 hover:text-blue-600 hover:bg-slate-100 cursor-pointer transition-colors"
            title="Tìm kiếm xe"
          >
            <Search size={20} />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-[10px] text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-5 space-y-4 shadow-xl animate-fade-in">
          {/* Quick Search Bar in Mobile Menu */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setSearchModalOpen(true);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-[10px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-xs font-medium text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Search size={16} className="text-blue-600" />
              <span>Tìm kiếm mẫu xe trong showroom...</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-400">
              Tìm
            </span>
          </button>
          <nav className="flex flex-col gap-2 text-base font-medium text-slate-800">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-[10px] transition-colors ${
                  item.active
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={ROUTES.TEST_DRIVE}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-[10px] transition-colors flex items-center gap-2 ${
                isTestDrive
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Calendar size={16} className="text-blue-600" />
              <span>Đăng ký lái thử tận nơi</span>
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href="tel:19008888"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[10px] border border-slate-200 text-slate-700 font-bold text-sm"
            >
              <Phone size={15} className="text-blue-600" />
              <span>Hotline 1900 8888</span>
            </a>

            {/* Mobile Auth Section */}
            {isAuthenticated && user ? (
              <div className="p-3 rounded-[10px] bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-3">
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
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    <span className="inline-block mt-0.5 px-2 py-0.2 rounded-full text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {getRoleLabel(user.role)}
                    </span>
                  </div>
                </div>

                {isStaffOrAdmin && (
                  <Link
                    to={ROUTES.DASHBOARD}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-[8px] bg-blue-50 text-[#0066ff] font-bold text-xs border border-blue-200"
                  >
                    <LayoutDashboard size={14} />
                    <span>Vào Trang Quản Trị</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-[8px] bg-rose-50 text-rose-600 font-bold text-xs border border-rose-200 cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Đăng Xuất</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to={`${ROUTES.LOGIN}?tab=register`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-[10px] border border-slate-200 text-slate-700 font-semibold text-center text-sm"
                >
                  Đăng ký
                </Link>
                <Link
                  to={ROUTES.LOGIN}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-[10px] bg-blue-600 text-white font-semibold text-center text-sm"
                >
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </header>
  );
};
