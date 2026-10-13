import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Headphones,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  KeyRound,
  FileCheck2,
  Clock,
  Sparkles,
} from 'lucide-react';
import logoImg from '../../assets/Logo.png';
import { ROUTES } from '../../constants';
import { useToast } from '../../contexts/ToastContext';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Method tab: 'phone' | 'email'
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('');
  const [channel, setChannel] = useState<'sms' | 'zalo'>('sms');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError(
        method === 'phone'
          ? 'Vui lòng nhập số điện thoại đã đăng ký'
          : 'Vui lòng nhập địa chỉ email đã đăng ký'
      );
      return;
    }

    if (method === 'phone' && !/^[0-9+ ]{9,15}$/.test(identifier.trim())) {
      setError('Số điện thoại không hợp lệ (9-11 chữ số)');
      return;
    }

    if (method === 'email' && !identifier.includes('@')) {
      setError('Địa chỉ email không đúng định dạng');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      showToast(
        channel === 'zalo'
          ? 'Mã OTP khôi phục đã được gửi qua Zalo Official Account CarShop!'
          : 'Mã OTP khôi phục đã được gửi đến số điện thoại của quý khách!',
        'success'
      );
    }, 1000);
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
            {/* Hotline 24/7 */}
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
      </header>

      {/* 2. Main Two-Column Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: TRUNG TÂM TRỢ GIÚP & BẢO MẬT ================= */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 order-2 lg:order-1">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/70 text-blue-700 border border-blue-200/60 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck size={14} className="text-blue-600" />
              <span>BẢO MẬT & AN TOÀN TÀI KHOẢN VIP</span>
            </div>

            {/* Headline & Intro */}
            <div className="space-y-3">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl xl:text-[40px] text-slate-900 tracking-tight leading-[1.2]">
                Khôi Phục Tài Khoản CarShop <br />
                <span className="text-blue-600">Dễ Dàng & An Toàn Tuyệt Đối</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Hệ thống bảo vệ dữ liệu khách hàng đa lớp. Chúng tôi sẽ hỗ trợ bạn thiết lập lại quyền truy cập chỉ trong vài phút mà vẫn bảo mật tuyệt đối thông tin xe và lịch sử kiểm định.
              </p>
            </div>

            {/* Luxury Car & Security Showcase Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&auto=format&fit=crop&q=85"
                alt="CarShop VIP Security Showcase"
                className="w-full h-52 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>

              {/* Overlay Caption Badge */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-white/80 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold shadow-md shadow-blue-500/30">
                  <KeyRound size={18} />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">Tài khoản bảo mật cao cấp</span>
                  <span className="text-slate-600">Đảm bảo an toàn dữ liệu sở hữu xe, hồ sơ cọc & lịch sử giao dịch</span>
                </div>
              </div>
            </div>

            {/* 3-Step Clear Indicator */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                3 BƯỚC KHÔI PHỤC TÀI KHOẢN MINH BẠCH:
              </h3>
              
              <div className="space-y-2.5">
                {/* Step 1: Active */}
                <div className="p-3 rounded-xl bg-white border border-blue-200 shadow-sm flex items-center gap-3.5 ring-1 ring-blue-500/20">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    1
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Nhập Email hoặc Số điện thoại đã đăng ký</span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        Đang thực hiện
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">Xác định danh tính tài khoản cần thiết lập lại mật khẩu.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3 rounded-xl bg-white/70 border border-slate-200/80 flex items-center gap-3.5 text-slate-500">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-slate-700 block">Nhận & xác thực mã OTP 6 số</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Mã OTP bảo mật được gửi qua SMS/Zalo hoặc đường link bảo mật.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3 rounded-xl bg-white/70 border border-slate-200/80 flex items-center gap-3.5 text-slate-500">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-slate-700 block">Tạo mật khẩu mới & kích hoạt phiên đăng nhập</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Thiết lập mật khẩu an toàn và đăng nhập lại hệ thống ngay lập tức.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Support Assistance Box */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3.5 text-xs">
              <Headphones size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">
                  Không còn truy cập được số điện thoại hoặc email cũ?
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Vui lòng liên hệ Chuyên viên Chăm sóc VIP qua Hotline miễn cước{' '}
                  <a href="tel:18006868" className="font-bold text-blue-600 hover:underline">
                    1800 6868
                  </a>{' '}
                  hoặc mang CCCD/Giấy tờ xe đến Showroom CarShop gần nhất để được xác minh danh tính trực tiếp.
                </p>
              </div>
            </div>

            {/* Bottom Security Compliance Badges */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span className="text-[11px] text-slate-600 font-medium">Mã hóa SSL 256-bit chuẩn PCI-DSS</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-blue-600" />
                <span className="text-[11px] text-slate-600 font-medium">Tiêu chuẩn an toàn dữ liệu ISO 27001</span>
              </div>
            </div>

          </div>


          {/* ================= RIGHT COLUMN: CARD FORM KHÔI PHỤC MẬT KHẨU ================= */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 xl:p-10 transition-all relative overflow-hidden">
              
              {/* Top Blue Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600"></div>

              {/* Form Title & Icon */}
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                  <KeyRound size={24} />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
                    Quên Mật Khẩu?
                  </h2>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Cổng Khôi Phục & Xác Minh Danh Tính
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Vui lòng nhập Địa chỉ Email hoặc Số điện thoại liên kết với tài khoản CarShop của bạn. Chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu ngay lập tức.
              </p>

              {/* Method Switcher Tabs */}
              <div className="p-1 rounded-xl bg-slate-100 border border-slate-200/80 grid grid-cols-2 gap-1 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMethod('phone');
                    setError(null);
                    setIdentifier('');
                  }}
                  className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    method === 'phone'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone size={16} />
                  <span>Qua Số Điện Thoại</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMethod('email');
                    setError(null);
                    setIdentifier('');
                  }}
                  className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    method === 'email'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mail size={16} />
                  <span>Qua Địa Chỉ Email</span>
                </button>
              </div>

              {/* Form Body */}
              {!isSent ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Input Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {method === 'phone' ? 'Số điện thoại đã đăng ký' : 'Địa chỉ Email đã đăng ký'}{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        {method === 'phone' ? <Phone size={17} /> : <Mail size={17} />}
                      </div>
                      <input
                        type={method === 'phone' ? 'tel' : 'email'}
                        value={identifier}
                        onChange={(e) => {
                          setIdentifier(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder={
                          method === 'phone'
                            ? '0912 345 678'
                            : 'executive.client@carshop.vn'
                        }
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                          error
                            ? 'border-red-500 ring-2 ring-red-100'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                        }`}
                      />
                    </div>
                    {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
                  </div>

                  {/* Channel Selection (SMS vs Zalo) */}
                  {method === 'phone' && (
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Kênh nhận mã OTP nhanh:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label
                          onClick={() => setChannel('sms')}
                          className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 cursor-pointer transition-all ${
                            channel === 'sms'
                              ? 'border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-500/20'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="channel"
                            checked={channel === 'sms'}
                            onChange={() => setChannel('sms')}
                            className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                          />
                          <div>
                            <span className="block font-bold">Tin nhắn SMS OTP</span>
                            <span className="text-[10px] text-slate-500 font-normal">Miễn cước viễn thông</span>
                          </div>
                        </label>

                        <label
                          onClick={() => setChannel('zalo')}
                          className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 cursor-pointer transition-all ${
                            channel === 'zalo'
                              ? 'border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-500/20'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="channel"
                            checked={channel === 'zalo'}
                            onChange={() => setChannel('zalo')}
                            className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                          />
                          <div>
                            <span className="block font-bold">Zalo Official Account</span>
                            <span className="text-[10px] text-slate-500 font-normal">Gửi tức thì & bảo mật</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Primary CTA Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                  >
                    {isSubmitting ? (
                      <span>Đang tạo phiên mã xác thực...</span>
                    ) : (
                      <>
                        <span>Gửi Mã Khôi Phục Tài Khoản</span>
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>

                  {/* Helpful Tips Box */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
                    <Clock size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block">Lưu ý an toàn:</span>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        Mã OTP có hiệu lực trong 5 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai, kể cả nhân viên tư vấn CarShop.
                      </p>
                    </div>
                  </div>
                </form>
              ) : (
                /* Success State View */
                <div className="animate-fade-in space-y-5 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900">
                      Mã Xác Thực Đã Được Gửi!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                      Chúng tôi đã gửi mã xác thực 6 số đến{' '}
                      <span className="font-bold text-slate-900">{identifier}</span>. Vui lòng kiểm tra điện thoại/email của bạn.
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="button"
                      onClick={() => navigate(ROUTES.VERIFY_OTP, { state: { identifier } })}
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Tiếp Tục Nhập Mã OTP 6 Số</span>
                      <ArrowRight size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSent(false);
                        showToast('Đã gửi lại mã xác minh mới!', 'info');
                      }}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer block mx-auto"
                    >
                      Không nhận được mã? Gửi lại mã OTP
                    </button>
                  </div>
                </div>
              )}

              {/* Secondary Navigation Links */}
              <div className="mt-8 pt-5 border-t border-slate-100 space-y-3 text-center text-xs">
                <div>
                  <span className="text-slate-600">Nhớ lại mật khẩu? </span>
                  <Link
                    to={ROUTES.LOGIN}
                    className="text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    Đăng nhập ngay
                  </Link>
                </div>

                <div>
                  <span className="text-slate-600">Chưa có tài khoản CarShop? </span>
                  <Link
                    to={`${ROUTES.LOGIN}?tab=register`}
                    className="text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    Đăng ký thành viên mới
                  </Link>
                </div>
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
            <a
              href="#showrooms"
              onClick={(e) => {
                e.preventDefault();
                showToast('Hệ thống Showroom CarShop tại Hà Nội, Đà Nẵng, TP.HCM', 'info');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Hệ thống Showroom
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPasswordPage;
