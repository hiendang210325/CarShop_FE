import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Phone,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Clock,
  Sparkles,
  KeyRound,
  FileCheck2,
  ChevronRight,
  RotateCcw,
  Smartphone,
  Check,
  ShieldAlert,
  Server,
  Lock,
  AlertCircle,
} from 'lucide-react';
import logoImg from '../../assets/Logo.png';
import { ROUTES } from '../../constants';
import { useToast } from '../../contexts/ToastContext';

export const OtpVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  // Retrieve transferred phone or email from previous step, default to formatted preview
  const stateIdentifier =
    (location.state as { identifier?: string })?.identifier || '0912 345 678';

  const maskedIdentifier = stateIdentifier.includes('@')
    ? stateIdentifier.replace(/^(.)(.*)(@.*)$/, (_, a, b, c) => `${a}***${c}`)
    : stateIdentifier.replace(/(\d{4})\d{3}(\d{3})/, '$1 *** $2');

  // 6 OTP digits state
  const [otp, setOtp] = useState<string[]>(['8', '5', '2', '9', '4', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer in seconds (default 165s = 02:45)
  const [timeLeft, setTimeLeft] = useState(165);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Timer interval
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle single digit change
  const handleDigitChange = (index: number, value: string) => {
    setErrorMessage(null);
    const cleaned = value.replace(/\D/g, '');

    // If pasted multiple digits
    if (cleaned.length > 1) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        if (cleaned[i]) {
          newOtp[i] = cleaned[i];
        }
      }
      setOtp(newOtp);
      const nextIndex = Math.min(cleaned.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);

    // Auto advance to next box
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP submission
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length < 6) {
      setErrorMessage('Vui lòng nhập đủ 6 chữ số mã xác thực OTP.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      showToast('Xác thực mã OTP thành công! Chuyển tiếp tới bước tạo mật khẩu mới.', 'success');
      navigate(ROUTES.RESET_PASSWORD, { state: { identifier: stateIdentifier } });
    }, 1000);
  };

  // Handle Resend via Zalo
  const handleResendZalo = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(180);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      showToast('Mã OTP mới đã được gửi lại qua Zalo Official Account!', 'success');
    }, 800);
  };

  // Handle Resend via Voice OTP
  const handleResendVoice = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(180);
      showToast('Hệ thống tổng đài tự động đang gọi đến số điện thoại của quý khách để đọc mã OTP!', 'info');
    }, 800);
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
              <span>Quay lại Đăng nhập</span>
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
              <span className="text-blue-600 font-bold">Bước 2: Xác thực OTP</span>
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
          
          {/* ================= LEFT COLUMN: QUY TRÌNH & AN TOÀN TÀI KHOẢN ================= */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 order-2 lg:order-1">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/70 text-blue-700 border border-blue-200/60 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck size={14} className="text-blue-600" />
              <span>BẢO MẬT & AN TOÀN TÀI KHOẢN VIP</span>
            </div>

            {/* Headline & Description */}
            <div className="space-y-3">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl xl:text-[40px] text-slate-900 tracking-tight leading-[1.2]">
                Xác Thực Bảo Mật Đa Lớp <br />
                <span className="text-blue-600">Bảo Vệ Tài Sản & Thông Tin Xe</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Mã xác thực một lần (OTP) giúp bảo vệ tối đa dữ liệu xe đã lưu, lịch sử giao dịch và quyền sở hữu tài khoản thành viên của bạn.
              </p>
            </div>

            {/* Luxury Car & Security Showcase Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&auto=format&fit=crop&q=85"
                alt="CarShop VIP Enterprise Security"
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
                  <span className="text-slate-600">Đảm bảo dữ liệu sở hữu xe, hợp đồng & lịch sử giao dịch</span>
                </div>
              </div>
            </div>

            {/* 3-Step Clear Indicator */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                TIẾN TRÌNH KHÔI PHỤC MẬT KHẨU (BƯỚC 2/3):
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
                        Đã hoàn tất
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Đã xác định tài khoản liên kết ({maskedIdentifier}).</p>
                  </div>
                </div>

                {/* Step 2: Active */}
                <div className="p-3 rounded-xl bg-white border border-blue-300 shadow-md flex items-center gap-3.5 ring-2 ring-blue-500/20 text-xs">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm animate-pulse">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Bước 2: Nhận & xác thực mã OTP 6 số</span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        ĐANG THỰC HIỆN
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Nhập mã xác thực vừa được gửi đến thiết bị của bạn.</p>
                  </div>
                </div>

                {/* Step 3: Upcoming */}
                <div className="p-3 rounded-xl bg-white/70 border border-slate-200/80 flex items-center gap-3.5 text-slate-400 text-xs">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 block">Bước 3: Tạo mật khẩu mới & kích hoạt tài khoản</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Thiết lập lại mật khẩu an toàn và hoàn tất phiên bảo mật.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Support Assistance Box */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3.5 text-xs">
              <Headphones size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">
                  Không nhận được mã hoặc thay đổi số điện thoại?
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Vui lòng liên hệ Chuyên viên Chăm sóc VIP qua Hotline miễn cước{' '}
                  <a href="tel:18006868" className="font-bold text-blue-600 hover:underline">
                    1800 6868
                  </a>{' '}
                  hoặc yêu cầu hỗ trợ trực tiếp từ Showroom gần nhất.
                </p>
              </div>
            </div>

            {/* Bottom Security Compliance Badges */}
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
                <span className="text-[11px] text-slate-600 font-medium">Bộ Công Thương xác thực</span>
              </div>
            </div>

          </div>


          {/* ================= RIGHT COLUMN: FORM NHẬP MÃ OTP 6 SỐ ================= */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 xl:p-10 transition-all relative overflow-hidden">
              
              {/* Top Blue Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600"></div>

              {/* Form Title & Icon */}
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
                    Nhập Mã Xác Thực OTP
                  </h2>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Xác Thực Hai Yếu Tố (2FA) Bảo Mật
                  </span>
                </div>
              </div>

              {/* Subtitle & Destination */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 mb-6 text-xs text-slate-600">
                <p className="leading-relaxed">
                  Mã bảo mật gồm 6 chữ số đã được gửi tới số điện thoại/Zalo:{' '}
                  <span className="font-bold text-slate-900">{maskedIdentifier}</span>. Vui lòng kiểm tra tin nhắn.
                </p>
                <div className="mt-1.5">
                  <Link
                    to={ROUTES.FORGOT_PASSWORD}
                    className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Thay đổi số điện thoại / email</span>
                    <ArrowLeft size={11} className="rotate-180" />
                  </Link>
                </div>
              </div>

              {/* OTP Form */}
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                
                {/* 6 Digit Input Boxes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 text-center">
                    Mã xác thực gồm 6 chữ số:
                  </label>

                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          inputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={digit}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className={`w-11 sm:w-14 h-13 sm:h-16 text-center text-xl sm:text-2xl font-display font-bold rounded-xl border bg-white text-slate-900 focus:outline-none transition-all shadow-sm ${
                          digit
                            ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-100 text-blue-700'
                            : idx === otp.findIndex((d) => !d) || (otp.every((d) => d) && idx === 5)
                            ? 'border-blue-500 ring-2 ring-blue-100'
                            : 'border-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  {errorMessage && (
                    <p className="mt-2.5 text-xs text-red-500 font-medium text-center flex items-center justify-center gap-1">
                      <AlertCircle size={13} />
                      <span>{errorMessage}</span>
                    </p>
                  )}
                </div>

                {/* Countdown Timer Strip */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} className={timeLeft > 30 ? 'text-blue-600' : 'text-amber-500 animate-pulse'} />
                    <span>Mã có hiệu lực trong:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-bold text-sm ${timeLeft > 30 ? 'text-blue-600' : 'text-amber-600'}`}>
                      {formatTimer(timeLeft)}
                    </span>
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${
                          timeLeft > 30 ? 'bg-blue-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${(timeLeft / 165) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Resend Options */}
                <div className="space-y-2 pt-1 text-center text-xs">
                  <span className="text-slate-500">Chưa nhận được mã OTP?</span>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      disabled={isResending}
                      onClick={handleResendZalo}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <RotateCcw size={12} className={isResending ? 'animate-spin' : 'text-blue-600'} />
                      <span>Gửi lại mã qua Zalo</span>
                    </button>

                    <button
                      type="button"
                      disabled={isResending}
                      onClick={handleResendVoice}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <Phone size={12} className="text-emerald-600" />
                      <span>Nhận cuộc gọi Voice OTP</span>
                    </button>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isVerifying ? (
                    <span>Đang kiểm tra mã xác thực...</span>
                  ) : (
                    <>
                      <span>Xác Thực & Tiếp Tục Đặt Mật Khẩu Mới</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                {/* Security Caution Box */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
                  <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Lưu ý an toàn:</span>
                    <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                      Không chia sẻ mã OTP cho bất kỳ ai, kể cả nhân viên tư vấn showroom CarShop để bảo vệ an toàn tài khoản và thông tin xe.
                    </p>
                  </div>
                </div>

              </form>

              {/* Secondary Navigation Shortcuts */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft size={13} />
                  <span>Quay lại Bước 1</span>
                </Link>

                <Link
                  to={ROUTES.LOGIN}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Đăng nhập bằng phương thức khác
                </Link>
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
              href="#security"
              onClick={(e) => {
                e.preventDefault();
                showToast('Hệ thống bảo mật thông tin chuẩn quốc tế', 'info');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Trung tâm an toàn & Bảo mật
            </a>
            <span>•</span>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                showToast('Chính sách bảo vệ thông tin khách hàng', 'info');
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
                showToast('Điều khoản dịch vụ tiêu chuẩn', 'info');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Điều khoản dịch vụ
            </a>
            <span>•</span>
            <span className="text-slate-600">
              Email an toàn: <span className="text-blue-600 font-bold">security@carshop.vn</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OtpVerificationPage;
