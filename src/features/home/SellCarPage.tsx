import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Banknote,
  FileCheck2,
  Phone,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Car,
  Award,
  AlertCircle,
  HelpCircle,
  MapPin,
  Check,
  SlidersHorizontal,
  ChevronDown,
  Building2,
  FileText,
  BadgeCheck,
  Zap,
  Lock,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ROUTES } from '../../constants';
import { useToast } from '../../contexts/ToastContext';

/**
 * High-End Visual Design & Anti-Slop Directive:
 * - Vibe Archetype: Soft Structuralism & Precision Engineering (Cold Luxury)
 * - Layout Archetype: Asymmetrical Editorial Split & Interactive Cockpit Appraisal Station
 * - Double-Bezel Architecture: outer rounded-[10px] p-1 / p-1.5 shell + inner rounded-[8px] core
 * - Kinetic Button-in-Button CTA trailing arrow physics
 * - Real automotive liquidity & certified 176-point inspection vocabulary (Zero AI slop buzzwords)
 */

export const SellCarPage: React.FC = () => {
  const { showToast } = useToast();
  const [tradeType, setTradeType] = useState<'trade_in' | 'sell_only'>('trade_in');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    brand: 'Mercedes-Benz',
    model: '',
    year: '2023',
    odo: '',
    plateCity: 'Hà Nội',
    conditionTag: 'Bảo dưỡng hãng 100%',
    expectedPrice: '',
    targetCar: 'Porsche Taycan 4S Cross Turismo',
    fullName: '',
    phone: '',
    location: '',
  });

  const conditionOptions = [
    'Bảo dưỡng hãng 100%',
    'Xe lướt nguyên bản',
    'Một chủ từ đầu',
    'Đã dán PPF cao cấp',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.model.trim() || !formData.phone.trim()) {
      showToast('Vui lòng nhập tên dòng xe và số điện thoại liên hệ!', 'error');
      return;
    }
    setSubmitted(true);
    showToast(
      'Hồ sơ thẩm định đã được khởi tạo! Trưởng phòng thẩm định CarShop sẽ liên hệ qua điện thoại trong 15 phút.',
      'success'
    );
  };

  const faqs = [
    {
      q: 'Xe đang thế chấp vay ngân hàng có bán hoặc đổi xe tại CarShop được không?',
      a: 'Hoàn toàn được. Đội ngũ pháp lý CarShop sẽ trực tiếp cùng quý khách đến ngân hàng làm thủ tục tất toán nợ gốc, rút đăng ký gốc trong 60 phút và giải ngân phần chênh lệch còn lại vào tài khoản của bạn ngay lập tức.',
    },
    {
      q: 'Chuyên gia đến thẩm định tận nhà có thu phí nếu tôi quyết định chưa bán?',
      a: '100% miễn phí. Quá trình kiểm định 176 hạng mục tận nơi và xuất phiếu định giá chi tiết là dịch vụ đặc quyền miễn phí của CarShop. Quý khách hoàn toàn tự do quyết định giao dịch mà không chịu bất kỳ ràng buộc nào.',
    },
    {
      q: 'Thời gian hoàn tất thủ tục và nhận đủ 100% tiền xe mất bao lâu?',
      a: 'Đúng 120 phút kể từ khi hai bên thống nhất mức giá. CarShop có phòng công chứng lưu động hỗ trợ ký tá tận nhà hoặc tại Showroom, và tiến hành lệnh chuyển khoản bảo lãnh qua hệ thống ngân hàng trước khi bàn giao xe.',
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 flex-1 w-full">
        {/* Breadcrumb with Micro-Typography */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <Link to={ROUTES.HOME} className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-900 font-bold">Bán Xe & Thu Cũ Đổi Mới</span>
        </nav>

        {/* Anti-Slop Asymmetrical Split Hero Section (Matches BuyCarPage Viewport Stability) */}
        <div className="p-1 rounded-[10px] bg-slate-900 shadow-2xl">
          <div className="rounded-[8px] overflow-hidden bg-[#070b14] text-white p-7 sm:p-10 lg:p-12 relative border border-white/10">
            {/* Luminous Environmental Lighting (Subtle Atmospheric Depth) */}
            <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Headline & Editorial Copy */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>THU CŨ ĐỔI MỚI & THẨM ĐỊNH 176 HẠNG MỤC CHÍNH HÃNG</span>
                </div>

                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12]">
                  Bán Xe Giá Tốt Nhất, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                    Giải Ngân Trong 2 Giờ
                  </span>
                </h1>

                <p className="text-slate-300/95 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
                  Thu mua xe sang đã qua sử dụng với mức giá cao hơn thị trường 5 - 10%. Thẩm định 176 hạng mục tận nơi và chuyển khoản 100% tức thì.
                </p>

                {/* Telemetry Strip */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-cyan-400" />
                    <span>Không ép giá / Chi phí ẩn</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-cyan-400" />
                    <span>Giải ngân trong 120 phút</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap size={15} className="text-cyan-400" />
                    <span>Trợ giá thu cũ đổi mới 50 Triệu</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-End Cockpit Inspection Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[16/10] rounded-[10px] overflow-hidden border border-white/15 shadow-2xl bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&auto=format&fit=crop&q=85"
                    alt="Chuyên viên kiểm định xe CarShop"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Floating Telemetry Pill */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[8px] bg-slate-950/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block">
                        DỊCH VỤ ĐẶC QUYỀN
                      </span>
                      <div className="font-display font-extrabold text-sm text-white truncate">
                        Thẩm Định 176 Hạng Mục Tận Nơi
                      </div>
                    </div>
                    <span className="font-display font-black text-sm text-cyan-300 shrink-0">
                      MIỄN PHÍ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Asymmetrical Grid: Appraisal Terminal (7 cols) + Protocol & Benchmark (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column A (7 Cols): The Valuation & Trade Terminal (Double-Bezel Architecture) */}
          <div className="lg:col-span-7 p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-xl">
            <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-5 border border-slate-100">
              {/* Terminal Header */}
              <div className="space-y-1.5 border-b border-slate-100 pb-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-[6px] border border-blue-100">
                    PHIẾU KHỞI TẠO ĐỊNH GIÁ & THANH LÝ
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Clock size={12} className="text-blue-600" />
                    Phản hồi ưu tiên trong 15 phút
                  </span>
                </div>
                <h2 className="font-display font-black text-2xl text-slate-900 tracking-tight">
                  Nhận Báo Giá Thẩm Định Trực Tiếp
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Cung cấp thông tin xe để hệ thống dữ liệu giao dịch CarShop xuất biên bản định giá sơ bộ cao nhất cho bạn.
                </p>
              </div>

              {/* Tactile Dual-Segment Toggle (Trade-In vs Liquidation) */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-[10px] bg-slate-100/90 border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setTradeType('trade_in')}
                  className={`py-3 px-3 rounded-[8px] font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    tradeType === 'trade_in'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <RotateCcw size={15} />
                  <span className="truncate">Thu Cũ Đổi Xe Mới</span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-blue-500 text-white font-extrabold">
                    +50Tr
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTradeType('sell_only')}
                  className={`py-3 px-3 rounded-[8px] font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    tradeType === 'sell_only'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Banknote size={15} />
                  <span className="truncate">Bán Đứt Giải Ngân</span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-emerald-500 text-white font-extrabold">
                    2 Giờ
                  </span>
                </button>
              </div>

              {/* Form Content / State Switch */}
              {submitted ? (
                <div className="py-10 px-4 text-center space-y-5 rounded-[10px] bg-slate-50 border border-slate-200/80">
                  <div className="w-16 h-16 rounded-[10px] bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600">
                      MÃ HỒ SƠ: CS-APP-{Math.floor(100000 + Math.random() * 900000)}
                    </span>
                    <h3 className="font-display font-black text-xl text-slate-900">
                      Khởi Tạo Hồ Sơ Thẩm Định Thành Công!
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Cảm ơn quý khách <strong className="text-slate-900">{formData.fullName || 'bạn'}</strong>. Trưởng phòng thẩm định xe sang CarShop sẽ liên hệ trực tiếp qua số <strong className="text-slate-900">{formData.phone}</strong> trong vòng 15 phút để xuất phiếu định giá và xác nhận lịch xem xe tận nơi.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Định giá thêm phương tiện khác
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Brand & Model Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Hãng sản xuất <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-semibold bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                      >
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Porsche">Porsche</option>
                        <option value="BMW">BMW</option>
                        <option value="Audi">Audi</option>
                        <option value="Lexus">Lexus</option>
                        <option value="VinFast">VinFast</option>
                        <option value="Land Rover">Land Rover</option>
                        <option value="Hãng khác">Thương hiệu khác</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Dòng xe & Phiên bản <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: C300 AMG, Taycan 4S, X5 xDrive40i..."
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Year, ODO, Plate Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Năm sản xuất
                      </label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-semibold bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                      >
                        {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Số ODO (Km)
                      </label>
                      <input
                        type="text"
                        placeholder="VD: 18,500 km"
                        value={formData.odo}
                        onChange={(e) => setFormData({ ...formData, odo: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Nơi đăng ký biển
                      </label>
                      <select
                        value={formData.plateCity}
                        onChange={(e) => setFormData({ ...formData, plateCity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-semibold bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                      >
                        <option value="Hà Nội">Hà Nội (29/30)</option>
                        <option value="TP.HCM">TP. Hồ Chí Minh (50/51)</option>
                        <option value="Đà Nẵng">Đà Nẵng (43)</option>
                        <option value="Hải Phòng">Hải Phòng (15)</option>
                        <option value="Tỉnh khác">Tỉnh / Thành khác</option>
                      </select>
                    </div>
                  </div>

                  {/* Condition Quick Select Pills */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Tình trạng xe sơ bộ
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {conditionOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, conditionTag: opt })}
                          className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
                            formData.conditionTag === opt
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Expected Price Input */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Mức giá mong muốn bán (Tỷ VNĐ)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 2.35 Tỷ (Để trống nếu bạn muốn CarShop định giá theo thị trường)"
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Trade-In Model Target (Shown if trade_in active) */}
                  {tradeType === 'trade_in' && (
                    <div className="p-4 rounded-[10px] bg-blue-50/80 border border-blue-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                          Mẫu xe bạn muốn lên đời tại CarShop:
                        </label>
                        <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          Trợ giá +50.000.000 ₫
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formData.targetCar}
                        onChange={(e) => setFormData({ ...formData, targetCar: e.target.value })}
                        placeholder="VD: Porsche Taycan 4S, Mercedes S450, Lexus RX 350..."
                        className="w-full px-3.5 py-2.5 rounded-[8px] bg-white border border-blue-200 text-xs sm:text-sm font-semibold text-slate-900 focus:border-blue-600 outline-none"
                      />
                      <p className="text-[11px] text-blue-800 leading-relaxed font-normal">
                        Chính sách Trade-in độc quyền: Áp dụng voucher trừ thẳng 50.000.000 VNĐ vào hợp đồng mua xe mới tại toàn bộ showroom hệ thống.
                      </p>
                    </div>
                  )}

                  {/* Contact Information Group */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                      THÔNG TIN LIÊN HỆ THẨM ĐỊNH
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-slate-700">
                          Họ và tên chủ xe <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="VD: Nguyễn Tuấn Anh"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-slate-700">
                          Số điện thoại liên hệ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0988 ••• •••"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700">
                        Địa chỉ xem xe (Tại nhà riêng hoặc Showroom)
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Khu đô thị Ciputra, Tây Hồ, Hà Nội"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Primary Nested CTA Button-in-Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group w-full py-2.5 pl-6 pr-3 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-between shadow-lg shadow-blue-500/20 active:scale-[0.99] cursor-pointer"
                    >
                      <span className="font-extrabold tracking-wide">
                        Khởi Tạo Hồ Sơ Thẩm Định Ngay
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                        <ArrowRight size={15} className="text-white" />
                      </span>
                    </button>
                  </div>

                  {/* Legal Guarantee Micro-Copy */}
                  <div className="flex items-center gap-2 justify-center text-[11px] text-slate-500 pt-1">
                    <Lock size={13} className="text-slate-400" />
                    <span>Cam kết bảo mật 100% danh tính chủ xe theo tiêu chuẩn pháp lý.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Column B (5 Cols): The 4-Stage Liquidity Protocol & Direct Benchmark */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. The 4-Stage Protocol (Double-Bezel Architecture) */}
            <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-xl">
              <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-4 border border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                    QUY TRÌNH THU MUA CHUẨN MỰC
                  </span>
                  <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">
                    4 Bước Hoàn Tất Giao Dịch Trong 2 Giờ
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {[
                    {
                      num: '01',
                      title: 'Khởi Tạo Hồ Sơ & Báo Giá Sơ Bộ',
                      desc: 'Hệ thống đối chiếu lịch sử đấu giá thị trường và chuyên viên gửi báo giá trong 15 phút.',
                    },
                    {
                      num: '02',
                      title: 'Thẩm Định 176 Hạng Mục Tận Nơi',
                      desc: 'Kỹ sư CarShop mang máy quét chuyên dụng đến tận nhà kiểm tra khung gầm, máy móc và hồ sơ pháp lý.',
                    },
                    {
                      num: '03',
                      title: 'Chốt Biểu Giá Cao Hơn 5 - 10%',
                      desc: 'Đưa ra mức giá thu mua cao nhất thị trường, không trừ phí thẩm định hay ép giá phát sinh.',
                    },
                    {
                      num: '04',
                      title: 'Công Chứng & Giải Ngân 100%',
                      desc: 'Văn phòng công chứng lưu động ký tá tại chỗ. Tiền chuyển thẳng tài khoản trước khi nhận xe.',
                    },
                  ].map((st) => (
                    <div key={st.num} className="flex items-start gap-3 group">
                      <span className="w-8 h-8 rounded-[8px] bg-slate-900 text-white font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {st.num}
                      </span>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                          {st.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Direct Liquidity Benchmark (CarShop vs Tự Bán Ngoài Chợ) */}
            <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-xl">
              <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-4 border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                  BẢNG ĐỐI CHIẾU THANH KHOẢN
                </span>

                <div className="overflow-hidden rounded-[8px] border border-slate-200 text-xs">
                  <div className="grid grid-cols-3 bg-slate-100/80 p-2.5 font-bold text-slate-700 text-[11px]">
                    <div>Tiêu chí</div>
                    <div className="text-blue-600 font-black">Tại CarShop</div>
                    <div className="text-slate-400">Tự bán ngoài</div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    <div className="grid grid-cols-3 p-2.5 items-center">
                      <div className="font-semibold text-slate-600">Thời gian</div>
                      <div className="font-bold text-emerald-600">Chỉ 2 giờ</div>
                      <div className="text-slate-500">30 - 45 ngày</div>
                    </div>

                    <div className="grid grid-cols-3 p-2.5 items-center">
                      <div className="font-semibold text-slate-600">Thanh toán</div>
                      <div className="font-bold text-emerald-600">100% tức thì</div>
                      <div className="text-slate-500">Chia nhiều đợt</div>
                    </div>

                    <div className="grid grid-cols-3 p-2.5 items-center">
                      <div className="font-semibold text-slate-600">Pháp lý & Cọc</div>
                      <div className="font-bold text-slate-900">Bảo lãnh A-Z</div>
                      <div className="text-slate-500">Rủi ro tranh chấp</div>
                    </div>

                    <div className="grid grid-cols-3 p-2.5 items-center">
                      <div className="font-semibold text-slate-600">Phí trung gian</div>
                      <div className="font-bold text-emerald-600">0 VNĐ</div>
                      <div className="text-slate-500">Mất 2% - 3%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Executive VIP Direct Hotline Box (OLED Slate Deep Night) */}
            <div className="p-1 rounded-[10px] bg-slate-950 shadow-xl">
              <div className="rounded-[8px] bg-[#070b14] p-5 sm:p-6 text-white space-y-3.5 border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Phone size={13} />
                    <span>ĐƯỜNG DÂY NÓNG THẨM ĐỊNH TRƯỞNG 24/7</span>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>

                <div className="space-y-1">
                  <div className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                    1900 8888 <span className="text-sm font-normal text-slate-400">(Nhánh 2)</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                    Cần định giá bảo mật khẩn cấp hoặc ký hợp đồng giải ngân trong ngày? Kết nối trực tiếp với Trưởng phòng thẩm định.
                  </p>
                </div>

                <a
                  href="tel:19008888"
                  className="group py-2.5 px-4 rounded-[8px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-between transition-all border border-white/15 cursor-pointer"
                >
                  <span>Gọi Hotline Khẩn Cấp Ngay</span>
                  <ArrowRight size={14} className="text-cyan-400 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Titanium Trust Matrix: 3 Institutional Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm">
            <div className="p-5 rounded-[8px] bg-slate-50/60 space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-blue-600 text-white flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-display font-extrabold text-sm text-slate-900">
                Không Ép Giá - Cam Kết Minh Bạch
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Biên bản định giá dựa trên phân tích dữ liệu 10,000+ giao dịch xe sang thực tế, bảo đảm quyền lợi tối đa cho người bán.
              </p>
            </div>
          </div>

          <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm">
            <div className="p-5 rounded-[8px] bg-slate-50/60 space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-emerald-600 text-white flex items-center justify-center">
                <Banknote size={20} />
              </div>
              <h4 className="font-display font-extrabold text-sm text-slate-900">
                Giải Ngân Tức Thì 100%
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thanh toán toàn bộ giá trị giao dịch qua chuyển khoản liên ngân hàng 24/7 ngay khi hoàn tất hợp đồng công chứng.
              </p>
            </div>
          </div>

          <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm">
            <div className="p-5 rounded-[8px] bg-slate-50/60 space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-slate-900 text-white flex items-center justify-center">
                <FileCheck2 size={20} />
              </div>
              <h4 className="font-display font-extrabold text-sm text-slate-900">
                Thủ Tục Pháp Lý Tận Nơi
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Đội ngũ pháp lý CarShop hỗ trợ rút hồ sơ gốc, giải chấp ngân hàng và sang tên trọn gói mà không làm mất thời gian của bạn.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Practical FAQ Accordion (Addressing Real Transaction Concerns) */}
        <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-lg">
          <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-5 border border-slate-100">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                GIẢI ĐÁP PHÁP LÝ & THANH TOÁN
              </span>
              <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">
                Câu Hỏi Thường Gặp Khi Bán & Thu Cũ Đổi Mới
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="py-3.5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pt-2.5 text-xs text-slate-600 leading-relaxed font-normal animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
};
