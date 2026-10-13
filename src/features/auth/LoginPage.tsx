import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  Phone,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Star,
  ArrowLeft,
  Headphones,
  Check,
  Award,
  Zap,
} from 'lucide-react';
import logoImg from '../../assets/Logo.png';
import { useAuthStore } from '../../stores';
import { useToast } from '../../contexts/ToastContext';
import { ROUTES, MOCK_USERS } from '../../constants';
import { validators } from '../../utils';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isLoading } = useAuthStore();
  const { showToast } = useToast();

  // Active Tab state: 'login' | 'register'
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(
    location.search.includes('tab=register') ? 'register' : 'login'
  );

  useEffect(() => {
    if (location.search.includes('tab=register')) {
      setActiveTab('register');
    } else if (location.search.includes('tab=login')) {
      setActiveTab('login');
    }
  }, [location.search]);

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState('admin@carshop.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginErrors, setLoginErrors] = useState<{ identifier?: string; password?: string }>({});

  // Register Form States
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [receiveOffers, setReceiveOffers] = useState(true);
  const [regErrors, setRegErrors] = useState<{
    fullName?: string;
    phone?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  // Password strength calculator
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: 'Chưa nhập', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, text: 'Yếu (Thêm chữ hoa & số)', color: 'bg-red-500' };
    if (score === 2 || score === 3) return { score: 2, text: 'Trung bình', color: 'bg-amber-500' };
    return { score: 3, text: 'Mạnh & An toàn tuyệt đối', color: 'bg-emerald-500' };
  };

  const passStrength = calculatePasswordStrength(regPassword);

  // Validate Login Form
  const validateLogin = (): boolean => {
    const errs: { identifier?: string; password?: string } = {};
    if (!loginIdentifier.trim()) {
      errs.identifier = 'Vui lòng nhập Email hoặc Số điện thoại';
    } else if (
      loginIdentifier.includes('@') &&
      !validators.isValidEmail(loginIdentifier.trim())
    ) {
      errs.identifier = 'Địa chỉ email không đúng định dạng';
    }
    if (!loginPassword) {
      errs.password = 'Vui lòng nhập mật khẩu';
    } else if (loginPassword.length < 6) {
      errs.password = 'Mật khẩu phải chứa ít nhất 6 ký tự';
    }
    setLoginErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Register Form
  const validateRegister = (): boolean => {
    const errs: {
      fullName?: string;
      phone?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      terms?: string;
    } = {};

    if (!regFullName.trim()) {
      errs.fullName = 'Vui lòng nhập họ và tên của bạn';
    }
    if (!regPhone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại liên hệ';
    } else if (!/^[0-9+ ]{9,15}$/.test(regPhone.trim())) {
      errs.phone = 'Số điện thoại không hợp lệ (9-11 chữ số)';
    }
    if (!regEmail.trim()) {
      errs.email = 'Vui lòng nhập địa chỉ email';
    } else if (!validators.isValidEmail(regEmail.trim())) {
      errs.email = 'Địa chỉ email không hợp lệ';
    }
    if (!regPassword) {
      errs.password = 'Vui lòng tạo mật khẩu';
    } else if (regPassword.length < 8) {
      errs.password = 'Mật khẩu phải có tối thiểu 8 ký tự';
    }
    if (regPassword !== regConfirmPassword) {
      errs.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    if (!agreeTerms) {
      errs.terms = 'Bạn cần đồng ý với Điều khoản dịch vụ và Chính sách bảo mật';
    }

    setRegErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    try {
      await login({
        email: loginIdentifier.includes('@') ? loginIdentifier : 'admin@carshop.com',
        password: loginPassword,
        rememberMe,
      });
      showToast('Đăng nhập thành công! Chào mừng trở lại CarShop.', 'success');

      const currentUser = useAuthStore.getState().user;
      // Only ADMIN, SALES_MANAGER or STAFF go to Dashboard
      if (currentUser?.role === 'ADMIN' || currentUser?.role === 'SALES_MANAGER' || currentUser?.role === 'STAFF') {
        navigate(ROUTES.DASHBOARD, { replace: true });
      } else {
        // Normal user / customer goes to website showroom to view cars
        const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
        const target = from && !from.includes('/dashboard') ? from : ROUTES.BUY_CAR;
        navigate(target, { replace: true });
      }
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.';
      showToast(errMsg, 'error');
    }
  };

  // Handle Register
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;

    try {
      await register({
        fullName: regFullName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
      });
      showToast('Đăng ký tài khoản thành công! Bạn đã được đăng nhập.', 'success');
      navigate(ROUTES.BUY_CAR, { replace: true });
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || 'Đăng ký tài khoản thất bại.';
      showToast(errMsg, 'error');
    }
  };

  // Presets Quick Fill for Fast Testing
  const handleSelectPreset = (presetEmail: string) => {
    setLoginIdentifier(presetEmail);
    setLoginPassword('password123');
    setLoginErrors({});
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-900 font-sans selection:bg-brand-500 selection:text-white flex flex-col justify-between">
      {/* 1. Header / Top Navigation */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to={ROUTES.HOME} className="flex items-center group py-1">
              <img
                src={logoImg}
                alt="CarShop Logo"
                className="h-11 sm:h-13 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="hidden md:block h-6 w-px bg-slate-200"></div>
            <span className="hidden md:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Cổng Xác Thực Thành Viên CarShop
            </span>
          </div>

          {/* Right Header Navigation Actions */}
          <div className="flex items-center gap-3 sm:gap-5 text-sm">
            {/* Hotline Link */}
            <a
              href="tel:18006868"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-700 hover:bg-blue-100/70 transition-colors"
            >
              <Phone size={14} className="text-blue-600" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-blue-500 block leading-none">Hotline VIP</span>
                <span className="text-xs font-extrabold text-blue-700">1800 6868</span>
              </div>
            </a>

            {/* Support link */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium hover:text-blue-600 transition-colors cursor-pointer">
              <Headphones size={15} />
              <span>Hỗ trợ 24/7</span>
            </div>

            {/* Back to Home Button */}
            <Link
              to={ROUTES.HOME}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-all border border-slate-200"
            >
              <ArrowLeft size={15} />
              <span>Về Trang Chủ</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Split Showcase Screen */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: HERO & BRAND SHOWCASE ================= */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 order-2 lg:order-1">
            
            {/* Kicker Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/70 text-blue-700 border border-blue-200/60 text-xs font-bold tracking-wide uppercase">
              <Sparkles size={14} className="text-blue-600" />
              <span>Gia Nhập Cộng Đồng Tinh Hoa CarShop</span>
            </div>

            {/* Headline & Value Proposition */}
            <div className="space-y-3">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl xl:text-[42px] text-slate-900 tracking-tight leading-[1.2]">
                Trải Nghiệm Mua Bán Xe Sang <br />
                <span className="text-blue-600">Đẳng Cấp & Đặc Quyền</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Khám phá hơn 15.000+ xe kiểm định 176 điểm chất lượng chuẩn quốc tế, đặc quyền lái thử tận nhà và dịch vụ tài chính ưu đãi 6.9%.
              </p>
            </div>

            {/* Showcase Car Card with Porsche Taycan in Showroom */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&auto=format&fit=crop&q=85"
                alt="Porsche Taycan Showroom VIP"
                className="w-full h-56 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

              {/* Top Banner Tag */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                <Award size={13} />
                <span>ĐẶC QUYỀN THÀNH VIÊN VIP 2025</span>
              </div>

              {/* Bottom Voucher Overlay Badge */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-white/80 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold shadow-md shadow-blue-500/30">
                  <Zap size={20} />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">Ưu đãi chào mừng thành viên mới</span>
                  <span className="text-slate-600">Tặng voucher dịch vụ kiểm định 2.000.000đ khi hoàn tất đăng ký</span>
                </div>
              </div>
            </div>

            {/* VIP Privileges List */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ĐẶC QUYỀN DÀNH RIÊNG CHO THÀNH VIÊN CARSHOP:
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-1.5 hover:border-blue-300 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <CheckCircle2 size={18} />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Quản lý xe yêu thích</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Theo dõi tiến độ kiểm định 176 hạng mục theo thời gian thực.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-1.5 hover:border-blue-300 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Phone size={18} />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Lái thử tận nhà 24/7</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Đặt lịch giao xe lái thử tận nơi trong 2h, chuyên viên riêng.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-1.5 hover:border-blue-300 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Sparkles size={18} />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Ưu tiên xe lướt độc bản</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">Nhận thông báo sớm trước 48h khi có xe hiếm mở bán.</p>
                </div>
              </div>
            </div>

            {/* VIP Customer Testimonial Card */}
            <div className="p-4 rounded-xl bg-white/90 border border-slate-200 shadow-sm flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
                alt="Doanh nhân Trần Nam Anh"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30 shrink-0"
              />
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                  <span className="text-[11px] font-bold text-slate-700 ml-1.5">5.0 / 5.0</span>
                </div>
                <p className="text-slate-700 italic font-medium leading-snug">
                  "Trải nghiệm mua xe tại CarShop vượt xa mong đợi. Quy trình minh bạch, kiểm định 176 điểm chuẩn chỉ và hậu mãi chu đáo."
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-bold text-slate-900">Doanh nhân Trần Nam Anh</span>
                  <span>•</span>
                  <span>Sở hữu Porsche Taycan 4S</span>
                  <span className="inline-flex items-center gap-0.5 text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded text-[10px]">
                    <Check size={11} /> Đã xác thực
                  </span>
                </div>
              </div>
            </div>

          </div>


          {/* ================= RIGHT COLUMN: INTERACTIVE AUTH FORM CARD ================= */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 xl:p-10 transition-all relative overflow-hidden">
              
              {/* Subtle Blue Gradient Accent on top */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600"></div>

              {/* Segmented Control / Tab Switcher */}
              <div className="p-1 rounded-xl bg-slate-100 border border-slate-200/80 grid grid-cols-2 gap-1 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setLoginErrors({});
                  }}
                  className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lock size={15} />
                  <span>Đăng Nhập</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setRegErrors({});
                  }}
                  className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'register'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User size={15} />
                  <span>Đăng Ký Tài Khoản</span>
                </button>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Google Login */}
                  <button
                    type="button"
                    onClick={() => showToast('Đang kết nối cổng xác thực bảo mật Google...', 'info')}
                    className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Tiếp tục với Google</span>
                  </button>

                  {/* Apple Login */}
                  <button
                    type="button"
                    onClick={() => showToast('Đang kết nối cổng xác thực bảo mật Apple ID...', 'info')}
                    className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-slate-900" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.62 1.35-.57.65-1.06 1.72-.93 2.74 1 .08 2.01-.5 2.62-1.24z" />
                    </svg>
                    <span>Tiếp tục với Apple ID</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center py-2">
                  <div className="w-full border-t border-slate-200"></div>
                  <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
                    Hoặc với Email / Số điện thoại
                  </span>
                </div>
              </div>

              {/* ================= TAB 1: ĐĂNG NHẬP (SIGN IN) ================= */}
              {activeTab === 'login' && (
                <div className="animate-fade-in space-y-5">
                  {/* Quick role presets for fast demonstration */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
                      <span className="flex items-center gap-1.5 text-blue-600">
                        <Sparkles size={13} />
                        TÀI KHOẢN MẪU ĐĂNG NHẬP NHANH:
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {MOCK_USERS.map((u) => (
                        <button
                          key={u.role}
                          type="button"
                          onClick={() => handleSelectPreset(u.email)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all border text-center cursor-pointer ${
                            loginIdentifier === u.email
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                          }`}
                        >
                          {u.role === 'ADMIN' ? 'Admin' : u.role === 'SALES_MANAGER' ? 'Quản lý' : 'Khách hàng'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {/* Identifier Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Số điện thoại hoặc Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail size={17} />
                        </div>
                        <input
                          type="text"
                          value={loginIdentifier}
                          onChange={(e) => {
                            setLoginIdentifier(e.target.value);
                            if (loginErrors.identifier) setLoginErrors({ ...loginErrors, identifier: undefined });
                          }}
                          placeholder="0912 345 678 hoặc name@example.com"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                            loginErrors.identifier
                              ? 'border-red-500 ring-2 ring-red-100'
                              : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                      </div>
                      {loginErrors.identifier && (
                        <p className="mt-1 text-xs text-red-500 font-medium">{loginErrors.identifier}</p>
                      )}
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Mật khẩu <span className="text-red-500">*</span>
                        </label>
                        <Link
                          to={ROUTES.FORGOT_PASSWORD}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                        >
                          Quên mật khẩu?
                        </Link>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock size={17} />
                        </div>
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => {
                            setLoginPassword(e.target.value);
                            if (loginErrors.password) setLoginErrors({ ...loginErrors, password: undefined });
                          }}
                          placeholder="••••••••"
                          className={`w-full pl-10 pr-11 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                            loginErrors.password
                              ? 'border-red-500 ring-2 ring-red-100'
                              : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                        >
                          {showLoginPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                      </div>
                      {loginErrors.password && (
                        <p className="mt-1 text-xs text-red-500 font-medium">{loginErrors.password}</p>
                      )}
                    </div>

                    {/* Remember me row */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-600 select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                        <span>Ghi nhớ đăng nhập trên thiết bị này</span>
                      </label>
                    </div>

                    {/* Primary CTA */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isLoading ? (
                        <span>Đang xác thực thông tin...</span>
                      ) : (
                        <>
                          <span>Đăng Nhập Vào CarShop</span>
                          <ArrowRight size={17} />
                        </>
                      )}
                    </button>

                    {/* Fast OTP alternative button */}
                    <button
                      type="button"
                      onClick={() => showToast('Mã OTP xác thực đăng nhập 6 số đã được gửi qua Zalo/SMS.', 'success')}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Phone size={15} className="text-blue-600" />
                      <span>Đăng nhập bảo mật nhanh bằng mã OTP (Zalo / SMS)</span>
                    </button>
                  </form>
                </div>
              )}


              {/* ================= TAB 2: ĐĂNG KÝ TÀI KHOẢN (SIGN UP) ================= */}
              {activeTab === 'register' && (
                <div className="animate-fade-in space-y-4">
                  <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Họ và tên quý khách <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User size={16} />
                        </div>
                        <input
                          type="text"
                          value={regFullName}
                          onChange={(e) => {
                            setRegFullName(e.target.value);
                            if (regErrors.fullName) setRegErrors({ ...regErrors, fullName: undefined });
                          }}
                          placeholder="Nguyễn Văn A"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                            regErrors.fullName
                              ? 'border-red-500 ring-2 ring-red-100'
                              : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                      </div>
                      {regErrors.fullName && (
                        <p className="mt-1 text-xs text-red-500 font-medium">{regErrors.fullName}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Số điện thoại liên hệ <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          Nhận OTP kích hoạt
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone size={16} />
                        </div>
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={(e) => {
                            setRegPhone(e.target.value);
                            if (regErrors.phone) setRegErrors({ ...regErrors, phone: undefined });
                          }}
                          placeholder="0912 345 678"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                            regErrors.phone
                              ? 'border-red-500 ring-2 ring-red-100'
                              : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                      </div>
                      {regErrors.phone && (
                        <p className="mt-1 text-xs text-red-500 font-medium">{regErrors.phone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Địa chỉ Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail size={16} />
                        </div>
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => {
                            setRegEmail(e.target.value);
                            if (regErrors.email) setRegErrors({ ...regErrors, email: undefined });
                          }}
                          placeholder="name@example.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                            regErrors.email
                              ? 'border-red-500 ring-2 ring-red-100'
                              : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                      </div>
                      {regErrors.email && (
                        <p className="mt-1 text-xs text-red-500 font-medium">{regErrors.email}</p>
                      )}
                    </div>

                    {/* Password with Strength Meter */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Tạo mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock size={16} />
                        </div>
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          value={regPassword}
                          onChange={(e) => {
                            setRegPassword(e.target.value);
                            if (regErrors.password) setRegErrors({ ...regErrors, password: undefined });
                          }}
                          placeholder="Tối thiểu 8 ký tự, chữ hoa, số & ký tự đặc biệt"
                          className={`w-full pl-10 pr-11 py-2.5 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                            regErrors.password
                              ? 'border-red-500 ring-2 ring-red-100'
                              : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                        >
                          {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>

                      {/* Password strength indicators */}
                      {regPassword && (
                        <div className="mt-2 space-y-1">
                          <div className="flex gap-1 h-1.5 w-full">
                            <div className={`h-full rounded-full flex-1 transition-all ${passStrength.score >= 1 ? passStrength.color : 'bg-slate-200'}`}></div>
                            <div className={`h-full rounded-full flex-1 transition-all ${passStrength.score >= 2 ? passStrength.color : 'bg-slate-200'}`}></div>
                            <div className={`h-full rounded-full flex-1 transition-all ${passStrength.score >= 3 ? passStrength.color : 'bg-slate-200'}`}></div>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium">Độ bảo mật: {passStrength.text}</p>
                        </div>
                      )}
                      {regErrors.password && (
                        <p className="mt-1 text-xs text-red-500 font-medium">{regErrors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Xác nhận lại mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock size={16} />
                        </div>
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          value={regConfirmPassword}
                          onChange={(e) => {
                            setRegConfirmPassword(e.target.value);
                            if (regErrors.confirmPassword) setRegErrors({ ...regErrors, confirmPassword: undefined });
                          }}
                          placeholder="Nhập lại mật khẩu vừa tạo"
                          className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                            regErrors.confirmPassword
                              ? 'border-red-500 ring-2 ring-red-100'
                              : regConfirmPassword && regConfirmPassword === regPassword
                              ? 'border-emerald-500 ring-2 ring-emerald-50'
                              : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        {regConfirmPassword && regConfirmPassword === regPassword && (
                          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-500">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                      {regErrors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-500 font-medium">{regErrors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Agreements Checkboxes */}
                    <div className="space-y-2 pt-1 text-xs">
                      <label className="flex items-start gap-2.5 cursor-pointer text-slate-600 select-none">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="w-4 h-4 mt-0.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                        <span>
                          Tôi đồng ý với{' '}
                          <span className="text-blue-600 font-semibold hover:underline">Điều khoản dịch vụ</span> và{' '}
                          <span className="text-blue-600 font-semibold hover:underline">Chính sách bảo mật dữ liệu</span> khách hàng CarShop.
                        </span>
                      </label>
                      {regErrors.terms && (
                        <p className="text-xs text-red-500 font-medium pl-6">{regErrors.terms}</p>
                      )}

                      <label className="flex items-start gap-2.5 cursor-pointer text-slate-600 select-none">
                        <input
                          type="checkbox"
                          checked={receiveOffers}
                          onChange={(e) => setReceiveOffers(e.target.checked)}
                          className="w-4 h-4 mt-0.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                        <span>
                          Đăng ký nhận thông báo độc quyền về xe lướt giá tốt & sự kiện lái thử VIP hàng tuần.
                        </span>
                      </label>
                    </div>

                    {/* Register CTA */}
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>Đăng Ký Tài Khoản Khách Hàng</span>
                      <ArrowRight size={17} />
                    </button>

                    {/* Switch back to Login */}
                    <div className="text-center pt-2">
                      <span className="text-xs text-slate-600">
                        Bạn đã có tài khoản CarShop?{' '}
                        <button
                          type="button"
                          onClick={() => setActiveTab('login')}
                          className="text-blue-600 font-bold hover:underline cursor-pointer"
                        >
                          Đăng nhập ngay
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Standards Badge Footer */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-4 text-slate-400 text-xs text-center">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-[11px] font-medium text-slate-500">Mã hoá SSL 256-bit & PCI-DSS</span>
                </div>
                <span>•</span>
                <span className="text-[11px] font-medium text-slate-500">Bảo mật thông tin khách hàng 100%</span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* 3. Mini Synchronized CarShop Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-slate-700">© 2025 CarShop Vietnam</span>
            <span className="hidden sm:inline">•</span>
            <span>Hệ thống phân phối & kiểm định ô tô cao cấp toàn quốc</span>
          </div>

          <div className="flex items-center gap-5 font-medium">
            <a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Điều khoản dịch vụ tiêu chuẩn CarShop 2025', 'info'); }} className="hover:text-blue-600 transition-colors">
              Điều khoản sử dụng
            </a>
            <span>•</span>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('Chính sách bảo mật dữ liệu người dùng được mã hoá an toàn', 'info'); }} className="hover:text-blue-600 transition-colors">
              Chính sách bảo mật
            </a>
            <span>•</span>
            <a href="tel:18006868" className="hover:text-blue-600 font-bold text-blue-600 transition-colors">
              Tổng đài CSKH: 1800 6868
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
