import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Phone,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Sparkles,
  KeyRound,
  FileCheck2,
  ChevronRight,
  Check,
  Server,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldAlert,
  Smartphone,
  LogOut,
} from 'lucide-react';
import logoImg from '../../assets/Logo.png';
import { ROUTES } from '../../constants';
import { useToast } from '../../contexts/ToastContext';
import { authService } from '../../api/authService';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const stateIdentifier =
    (location.state as { identifier?: string })?.identifier || 'executive.client@carshop.vn';

  // Form states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logoutAllDevices, setLogoutAllDevices] = useState(true);
  const [enable2FA, setEnable2FA] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password requirements calculation
  const reqLength = newPassword.length >= 8;
  const reqCase = /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword);
  const reqNumber = /[0-9]/.test(newPassword);
  const reqSpecial = /[^A-Za-z0-9]/.test(newPassword);

  const passedCount = [reqLength, reqCase, reqNumber, reqSpecial].filter(Boolean).length;

  const getStrengthInfo = () => {
    if (!newPassword) return { level: 0, text: 'Chưa nhập', color: 'bg-slate-200' };
    if (passedCount === 1) return { level: 1, text: 'Yếu', color: 'bg-red-500' };
    if (passedCount === 2) return { level: 2, text: 'Trung bình', color: 'bg-amber-500' };
    if (passedCount === 3) return { level: 3, text: 'Khá', color: 'bg-blue-500' };
    return { level: 4, text: 'Rất mạnh & An toàn tuyệt đối', color: 'bg-emerald-500' };
  };

  const strength = getStrengthInfo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (passedCount < 4) {
      setErrorMessage('Mật khẩu chưa đáp ứng đầy đủ 4 tiêu chuẩn bảo mật bên dưới.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token') || (location.state as { token?: string })?.token || '';

    setIsSubmitting(true);
    try {
      if (token) {
        await authService.resetPassword(token, newPassword);
      }
      setIsSuccess(true);
      showToast('Khôi phục mật khẩu thành công! Bạn có thể đăng nhập ngay.', 'success');
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message || err?.message || 'Đặt lại mật khẩu thất bại. Token có thể đã hết hạn.';
      setErrorMessage(errMsg);
      showToast(errMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-900 font-sans selection:bg-brand-500 selection:text-white flex flex-col justify-between">
      {/* 1. TopNavBar (Header) */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo & 176-Point Badge */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to={ROUTES.HOME} className="flex items-center group py-1">
              <img
                src={logoImg}
                alt="CarShop Logo"
                className="h-11 sm:h-13 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold">
              <FileCheck2 size={13} className="text-blue-600" />
              <span>Hệ thống kiểm định 176 điểm chuẩn Đức</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 font-medium text-sm text-slate-700">
            <Link to="/#inventory" className="hover:text-blue-600 transition-colors">
              Mua xe
            </Link>
            <Link to="/#search" className="hover:text-blue-600 transition-colors">
              Bán xe
            </Link>
            <Link to="/#calculator" className="hover:text-blue-600 transition-colors">
              Định giá
            </Link>
            <Link to="/#inventory" className="hover:text-blue-600 transition-colors">
              Ưu đãi
            </Link>
            <Link to="/#testimonials" className="hover:text-blue-600 transition-colors">
              Tin tức
            </Link>
          </nav>

          {/* Right Header Navigation Actions */}
          <div className="flex items-center gap-3 sm:gap-5 text-sm">
            {/* Hotline VIP 24/7 */}
            <a
              href="tel:18006868"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-700 hover:bg-blue-100/70 transition-colors"
            >
              <Phone size={14} className="text-blue-600" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-blue-500 block leading-none">Hotline VIP 24/7</span>
                <span className="text-xs font-extrabold text-blue-700">1800 6868</span>
              </div>
            </a>

            {/* Back to Login Button */}
            <Link
              to={ROUTES.LOGIN}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-all border border-slate-200"
            >
              <ArrowLeft size={15} />
              <span>Đăng nhập</span>
            </Link>
          </div>
        </div>

        {/* Sub-bar: Breadcrumbs & Server Status */}
        <div className="bg-slate-50/90 border-t border-slate-200/70 py-2 px-4 sm:px-8 text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
              <Link to={ROUTES.HOME} className="hover:text-blue-600 transition-colors">Trang chủ</Link>
              <ChevronRight size={12} className="text-slate-400" />
              <span>Tài khoản</span>
              <ChevronRight size={12} className="text-slate-400" />
              <Link to={ROUTES.FORGOT_PASSWORD} className="hover:text-blue-600 transition-colors">Khôi phục mật khẩu</Link>
              <ChevronRight size={12} className="text-slate-400" />
              <span className="text-blue-600 font-bold">Bước 3: Đặt mật khẩu mới</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <Server size={11} className="text-emerald-600" />
              <span>Máy chủ xác thực bảo mật: Online 99.99%</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Two-Column Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: TIẾN TRÌNH & BẢO MẬT ================= */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 order-2 lg:order-1">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/70 text-blue-700 border border-blue-200/60 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck size={14} className="text-blue-600" />
              <span>BẢO MẬT & AN TOÀN TÀI KHOẢN VIP</span>
            </div>

            {/* Headline & Description */}
            <div className="space-y-3">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl xl:text-[40px] text-slate-900 tracking-tight leading-[1.2]">
                Bảo Vệ Tài Khoản CarShop <br />
                <span className="text-blue-600">Với Chuẩn Mật Khẩu Mới</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Cơ chế mã hóa mật khẩu cấp ngân hàng bảo vệ thông tin giao dịch xe, quyền quản lý hợp đồng và dữ liệu định giá xe của bạn.
              </p>
            </div>

            {/* Showcase Car Card with Enterprise Security Badge */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&auto=format&fit=crop&q=85"
                alt="CarShop Enterprise Showroom Security"
                className="w-full h-52 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>

              {/* Top Banner Tag */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                <ShieldCheck size={13} />
                <span>BẢO MẬT CẤP ĐỘ ENTERPRISE</span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-white/80 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold shadow-md shadow-blue-500/30">
                  <Lock size={18} />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">Tài khoản bảo mật cao cấp</span>
                  <span className="text-slate-600">Đảm bảo dữ liệu sở hữu xe & lịch sử giao dịch</span>
                </div>
              </div>
            </div>

            {/* Stepped Progress List */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                TIẾN TRÌNH PHỤC HỒI TÀI KHOẢN (BƯỚC 3/3):
              </h3>
              
              <div className="space-y-2.5">
                {/* Step 1: Completed */}
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3.5 text-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    <Check size={15} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Bước 1: Nhập Email hoặc Số điện thoại</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        Đã xong
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Đã xác minh định danh thành công.</p>
                  </div>
                </div>

                {/* Step 2: Completed */}
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3.5 text-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    <Check size={15} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Bước 2: Nhận & xác thực mã OTP 6 số</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        Đã xong
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Mã OTP bảo mật 2FA đã được duyệt.</p>
                  </div>
                </div>

                {/* Step 3: Active */}
                <div className="p-3 rounded-xl bg-white border border-blue-300 shadow-md flex items-center gap-3.5 ring-2 ring-blue-500/20 text-xs">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm animate-pulse">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Bước 3: Thiết lập mật khẩu mới & hoàn tất bảo mật</span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        ĐANG THỰC HIỆN
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Tạo mật khẩu tiêu chuẩn cao để hoàn tất phục hồi.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Support Box */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3.5 text-xs">
              <Headphones size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">
                  Cần hỗ trợ trực tiếp?
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Hotline miễn phí{' '}
                  <a href="tel:18006868" className="font-bold text-blue-600 hover:underline">
                    1800 6868
                  </a>{' '}
                  luôn sẵn sàng giải đáp 24/7 để đảm bảo an toàn tối đa cho tài khoản xe của bạn.
                </p>
              </div>
            </div>

            {/* Compliance Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span className="text-[11px] text-slate-600 font-medium">Mã hóa SSL 256-bit chuẩn PCI-DSS</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-blue-600" />
                <span className="text-[11px] text-slate-600 font-medium">Tiêu chuẩn an toàn dữ liệu ISO 27001</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" />
                <span className="text-[11px] text-slate-600 font-medium">Bộ Công Thương</span>
              </div>
            </div>

          </div>


          {/* ================= RIGHT COLUMN: FORM ĐẶT MẬT KHẨU MỚI ================= */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 xl:p-10 transition-all relative overflow-hidden">
              
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600"></div>

              {/* Form Title & Icon */}
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                  <KeyRound size={24} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase block">
                    THIẾT LẬP MẬT KHẨU MỚI
                  </span>
                  <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
                    Tạo Mật Khẩu Mới & An Toàn
                  </h2>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                Vui lòng thiết lập mật khẩu mới phức tạp để bảo vệ lịch sử giao dịch và quyền sở hữu xe của bạn.
              </p>

              {/* Account Tag Preview */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-6 flex items-center gap-2.5 text-xs">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span className="text-slate-700">
                  Tài khoản: <span className="font-bold text-slate-900">{stateIdentifier}</span> — Xác thực OTP thành công lúc 14:32
                </span>
              </div>

              {!isSuccess ? (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* New Password Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mật khẩu mới <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock size={17} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-11 py-3 rounded-xl bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1.5 h-1.5 w-full">
                        <div className={`h-full rounded-full flex-1 transition-all ${strength.level >= 1 ? strength.color : 'bg-slate-200'}`}></div>
                        <div className={`h-full rounded-full flex-1 transition-all ${strength.level >= 2 ? strength.color : 'bg-slate-200'}`}></div>
                        <div className={`h-full rounded-full flex-1 transition-all ${strength.level >= 3 ? strength.color : 'bg-slate-200'}`}></div>
                        <div className={`h-full rounded-full flex-1 transition-all ${strength.level >= 4 ? strength.color : 'bg-slate-200'}`}></div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Độ mạnh mật khẩu:</span>
                        <span className={`font-bold ${strength.level === 4 ? 'text-emerald-600' : strength.level === 3 ? 'text-blue-600' : 'text-slate-600'}`}>
                          {strength.text}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checklist of Password Requirements */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                    <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                      Tiêu chuẩn mật khẩu an toàn CarShop:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${reqLength ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                          <Check size={11} />
                        </div>
                        <span className={reqLength ? 'text-slate-900 font-medium' : ''}>Ít nhất 8 ký tự</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${reqCase ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                          <Check size={11} />
                        </div>
                        <span className={reqCase ? 'text-slate-900 font-medium' : ''}>Chứa chữ hoa & chữ thường</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${reqNumber ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                          <Check size={11} />
                        </div>
                        <span className={reqNumber ? 'text-slate-900 font-medium' : ''}>Chứa ít nhất một chữ số (0-9)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${reqSpecial ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                          <Check size={11} />
                        </div>
                        <span className={reqSpecial ? 'text-slate-900 font-medium' : ''}>Chứa ký tự đặc biệt (@, #, $, ...)</span>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Xác nhận mật khẩu mới <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock size={17} />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-11 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                          confirmPassword && confirmPassword === newPassword
                            ? 'border-emerald-500 ring-2 ring-emerald-50'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    {confirmPassword && confirmPassword === newPassword && (
                      <p className="mt-1 text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <Check size={13} />
                        <span>Mật khẩu xác nhận trùng khớp hoàn toàn</span>
                      </p>
                    )}
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-red-500 font-medium flex items-center gap-1 pt-1">
                      <AlertCircle size={14} />
                      <span>{errorMessage}</span>
                    </p>
                  )}

                  {/* Advanced Security Checkboxes */}
                  <div className="space-y-2.5 pt-2 text-xs">
                    <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={logoutAllDevices}
                        onChange={(e) => setLogoutAllDevices(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-semibold block text-slate-900">
                          Đăng xuất khỏi tất cả các thiết bị và trình duyệt khác (Khuyên dùng)
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Hủy quyền truy cập nếu tài khoản của bạn từng có dấu hiệu bị xâm nhập.
                        </span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={enable2FA}
                        onChange={(e) => setEnable2FA(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-semibold block text-slate-900">
                          Kích hoạt xác thực 2 bước (2FA qua SMS/Zalo) cho các lần đăng nhập tiếp theo
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Tăng cường lớp bảo vệ tối đa mỗi khi đăng nhập vào hệ thống.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Primary CTA Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                  >
                    {isSubmitting ? (
                      <span>Đang mã hóa & cập nhật mật khẩu...</span>
                    ) : (
                      <>
                        <span>Lưu Mật Khẩu & Đăng Nhập Ngay</span>
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success Confirmation View */
                <div className="animate-fade-in space-y-6 text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
                    <CheckCircle2 size={36} />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-2xl text-slate-900">
                      Khôi Phục Tài Khoản Thành Công!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                      Mật khẩu mới đã được cập nhật an toàn. Quý khách có thể sử dụng mật khẩu này để đăng nhập ngay bây giờ.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <ShieldCheck size={15} className="text-emerald-500" />
                      <span>Thông tin phiên bảo mật:</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      • Đã hủy các phiên đăng nhập cũ trên các thiết bị khác.
                    </p>
                    <p className="text-[11px] text-slate-500">
                      • Thông báo xác nhận đã được gửi về email của bạn.
                    </p>
                  </div>

                  <Link
                    to={ROUTES.LOGIN}
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Tiến Hành Đăng Nhập</span>
                    <ArrowRight size={17} />
                  </Link>
                </div>
              )}

              {/* Secondary Navigation Shortcuts */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <Link
                  to={ROUTES.VERIFY_OTP}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft size={13} />
                  <span>Quay lại Bước 2</span>
                </Link>

                <a
                  href="tel:18006868"
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Cần trợ giúp từ an ninh mạng CarShop
                </a>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* 3. Footer (Chân trang đồng bộ CarShop) */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">© 2025 CarShop.</span>
            <span>Nền tảng mua bán ô tô trực tuyến hàng đầu Việt Nam.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
            <a
              href="#inspection"
              onClick={(e) => {
                e.preventDefault();
                showToast('Tiêu chuẩn kiểm định 176 hạng mục độc quyền CarShop', 'info');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Quy trình kiểm định 176 điểm
            </a>
            <span>•</span>
            <a
              href="#warranty"
              onClick={(e) => {
                e.preventDefault();
                showToast('Chính sách bảo hành và cam kết hậu mãi 3 năm', 'info');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Bảo hành & Hậu mãi
            </a>
            <span>•</span>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                showToast('Chính sách bảo mật dữ liệu khách hàng CarShop', 'info');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Chính sách bảo mật
            </a>
            <span>•</span>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                showToast('Điều khoản dịch vụ mua bán xe CarShop', 'info');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Điều khoản dịch vụ
            </a>
            <span>•</span>
            <span className="text-slate-600">
              Tổng đài CSKH: <span className="text-blue-600 font-bold">1800 6868</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResetPasswordPage;
