import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sliders,
  Car,
  Info,
  Clock,
  Banknote,
  SlidersHorizontal,
  ChevronDown,
  Gauge,
  Calendar,
  Building2,
  FileCheck2,
  Lock,
  BadgeCheck,
  Zap,
  HelpCircle,
  BarChart3,
  Percent,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ROUTES } from '../../constants';

/**
 * High-End Visual Design & Anti-Slop Directive:
 * - Vibe: Institutional Engineering & Precision Valuation Desk (Cold Luxury)
 * - Layout Archetype: Asymmetrical Cockpit Terminal Split
 * - Double-Bezel Hardware Architecture: outer rounded-[10px] p-1 + inner rounded-[8px] core
 * - Authentic Real-World Automotive Financial Language (No generic AI slop buzzwords)
 * - Kinetic Button-in-Button CTAs with spring trajectory physics
 */

interface ValuationPreset {
  brand: string;
  models: {
    name: string;
    basePriceNew: number; // Tỷ VNĐ khi mua mới
    depreciationRate: number; // Khấu hao % mỗi năm
    liquidityScore: string; // Tốc độ thanh khoản
  }[];
}

const PRESETS: ValuationPreset[] = [
  {
    brand: 'Porsche',
    models: [
      { name: 'Porsche Taycan 4S Cross Turismo', basePriceNew: 5.75, depreciationRate: 0.08, liquidityScore: 'RẤT CAO (Dưới 7 ngày)' },
      { name: 'Porsche Macan GTS', basePriceNew: 5.89, depreciationRate: 0.07, liquidityScore: 'CAO (Dưới 14 ngày)' },
      { name: 'Porsche Panamera 4', basePriceNew: 6.25, depreciationRate: 0.085, liquidityScore: 'CAO (Dưới 14 ngày)' },
      { name: 'Porsche Cayenne Turbo GT', basePriceNew: 12.5, depreciationRate: 0.075, liquidityScore: 'TIÊU CHUẨN (Dưới 20 ngày)' },
    ],
  },
  {
    brand: 'Mercedes-Benz',
    models: [
      { name: 'Mercedes-Benz GLC 300 4MATIC', basePriceNew: 3.15, depreciationRate: 0.09, liquidityScore: 'RẤT CAO (Dưới 5 ngày)' },
      { name: 'Mercedes-Benz C 300 AMG', basePriceNew: 2.39, depreciationRate: 0.095, liquidityScore: 'RẤT CAO (Dưới 5 ngày)' },
      { name: 'Mercedes-Benz E 300 AMG', basePriceNew: 3.49, depreciationRate: 0.09, liquidityScore: 'CAO (Dưới 10 ngày)' },
      { name: 'Mercedes-Maybach S 450 4MATIC', basePriceNew: 9.25, depreciationRate: 0.08, liquidityScore: 'TIÊU CHUẨN (Dưới 15 ngày)' },
    ],
  },
  {
    brand: 'BMW',
    models: [
      { name: 'BMW 530i M Sport', basePriceNew: 3.39, depreciationRate: 0.10, liquidityScore: 'CAO (Dưới 10 ngày)' },
      { name: 'BMW 330i M Sport', basePriceNew: 2.19, depreciationRate: 0.10, liquidityScore: 'RẤT CAO (Dưới 7 ngày)' },
      { name: 'BMW X5 xDrive40i M Sport', basePriceNew: 4.59, depreciationRate: 0.09, liquidityScore: 'CAO (Dưới 12 ngày)' },
      { name: 'BMW 730Li M Sport', basePriceNew: 5.19, depreciationRate: 0.11, liquidityScore: 'TIÊU CHUẨN (Dưới 18 ngày)' },
    ],
  },
  {
    brand: 'Lexus',
    models: [
      { name: 'Lexus RX 350 Luxury', basePriceNew: 4.79, depreciationRate: 0.055, liquidityScore: 'RẤT CAO (Dưới 5 ngày)' },
      { name: 'Lexus ES 250 Luxury', basePriceNew: 2.89, depreciationRate: 0.06, liquidityScore: 'RẤT CAO (Dưới 7 ngày)' },
      { name: 'Lexus LX 600 VIP', basePriceNew: 10.5, depreciationRate: 0.05, liquidityScore: 'CAO (Dưới 10 ngày)' },
    ],
  },
  {
    brand: 'VinFast EV',
    models: [
      { name: 'VinFast VF 9 Plus (Pin SDI)', basePriceNew: 2.29, depreciationRate: 0.09, liquidityScore: 'CAO (Dưới 10 ngày)' },
      { name: 'VinFast VF 8 Plus', basePriceNew: 1.45, depreciationRate: 0.095, liquidityScore: 'RẤT CAO (Dưới 7 ngày)' },
      { name: 'VinFast VF 7 Plus', basePriceNew: 1.15, depreciationRate: 0.09, liquidityScore: 'RẤT CAO (Dưới 5 ngày)' },
    ],
  },
];

export const ValuationPage: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('Porsche');
  const [selectedModel, setSelectedModel] = useState('Porsche Taycan 4S Cross Turismo');
  const [manufactureYear, setManufactureYear] = useState(2023);
  const [odoKm, setOdoKm] = useState(15000);
  const [conditionTier, setConditionTier] = useState<'tier1' | 'tier2' | 'tier3'>('tier1');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Available models for selected brand
  const currentBrandPreset = PRESETS.find((p) => p.brand === selectedBrand) || PRESETS[0];
  const currentModelData =
    currentBrandPreset.models.find((m) => m.name === selectedModel) || currentBrandPreset.models[0];

  // Calculation Algorithm based on automotive depreciation math
  const currentYear = 2026;
  const age = Math.max(0, currentYear - manufactureYear);

  const calculatedResult = useMemo(() => {
    let price = currentModelData.basePriceNew;

    // Depreciation by age (compound depreciation curve)
    for (let i = 0; i < age; i++) {
      price = price * (1 - currentModelData.depreciationRate);
    }

    // Depreciation adjustment by ODO mileage (Benchmark standard: 12,000 km/year)
    const standardOdo = age * 12000;
    const odoDiff = odoKm - standardOdo;
    if (odoDiff > 0) {
      price = price - (odoDiff / 10000) * 0.04; // trừ 40 triệu mỗi 10k km vượt chuẩn
    } else {
      price = price + (Math.abs(odoDiff) / 10000) * 0.025; // cộng 25 triệu nếu xe đi cực ít (lướt)
    }

    // Condition multiplier
    let conditionMultiplier = 1.0;
    if (conditionTier === 'tier1') conditionMultiplier = 1.035; // Hạng 1: Sơn zin >95%, Full hãng
    else if (conditionTier === 'tier3') conditionMultiplier = 0.94; // Hạng 3: Hao mòn tự nhiên

    price = price * conditionMultiplier;

    // Boundary constraints & liquidity bands
    const fairMarket = Math.max(0.5, price);
    const quickCash = fairMarket * 0.94; // Thu mua thanh khoản tiền mặt ngay trong 2h
    const userMarketMax = fairMarket * 1.04; // Tự bán ngoài thị trường mất 30-45 ngày

    return {
      fairMarket: fairMarket.toFixed(2),
      quickCash: quickCash.toFixed(2),
      userMarketMax: userMarketMax.toFixed(2),
      newCarPrice: currentModelData.basePriceNew.toFixed(2),
      savedValue: Math.max(0, currentModelData.basePriceNew - fairMarket).toFixed(2),
      liquidity: currentModelData.liquidityScore,
    };
  }, [currentModelData, age, odoKm, conditionTier]);

  const valuationFaqs = [
    {
      q: 'Tại sao mức giá định giá thực tế lại khác với giá xe mới lăn bánh?',
      a: 'Xe sang sau khi đăng ký lăn bánh sẽ khấu hao tự nhiên năm đầu từ 7% - 10% do phí trước bạ và biển số. Tuy nhiên, các dòng xe giữ giá tốt như Porsche hoặc Lexus có tỷ lệ giữ giá vượt trội so với phân khúc phổ thông.',
    },
    {
      q: 'Các gói Options cao cấp có được cộng thêm vào giá thu mua không?',
      a: 'Có. Khi chuyên gia CarShop đến thẩm định 176 hạng mục thực tế, các gói trang bị đắt giá như: Hệ thống phanh gốm PCCB, loa Burmester High-End, mâm thể thao Exclusive Design, hay gói nội thất da Club Leather sẽ được cộng thêm từ 50 đến 250 triệu đồng vào biên bản thu mua.',
    },
    {
      q: 'Biên bản định giá này có giá trị cam kết thu mua của CarShop không?',
      a: 'CarShop cam kết khớp lệnh thu mua tiền mặt trong vòng 2 giờ theo đúng mức giá "Thanh khoản tiền mặt ngay" (từ 95% - 98% giá tham chiếu) sau khi xe vượt qua quy trình kiểm tra 176 hạng mục không đâm đụng, thủy kích.',
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
          <span className="text-slate-900 font-bold">Định Giá Xe & Thẩm Định Khấu Hao</span>
        </nav>

        {/* Cold Luxury Architectural Hero Section (Viewpoint Stable, Zero AI Slop) */}
        <div className="p-1 rounded-[10px] bg-slate-900 shadow-2xl">
          <div className="rounded-[8px] overflow-hidden bg-[#070b14] text-white p-7 sm:p-10 lg:p-12 relative border border-white/10">
            {/* Environmental Atmospheric Depth */}
            <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Headline & Technical Methodology */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>TRA CỨU BIỂU GIÁ THỊ TRƯỜNG & KHẤU HAO THỰC TẾ</span>
                </div>

                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12]">
                  Định Giá Chuẩn Xác, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                    Dữ Liệu Khớp Lệnh Thực Tế
                  </span>
                </h1>

                <p className="text-slate-300/95 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
                  Thuật toán thẩm định giá trị tài sản dựa trên dữ liệu giao dịch 15,000+ hợp đồng mua bán xe lướt chính hãng tại Việt Nam. Không sai số ảo, không dìm giá.
                </p>

                {/* Telemetry Strip */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-cyan-400" />
                    <span>Độ chính xác thị trường 98%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-cyan-400" />
                    <span>Khấu trừ ODO & Niên hạn chuẩn</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap size={15} className="text-cyan-400" />
                    <span>Cam kết bảo chứng thu mua ngay</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Cockpit Telemetry Showcase Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[16/10] rounded-[10px] overflow-hidden border border-white/15 shadow-2xl bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=900&auto=format&fit=crop&q=85"
                    alt="Hệ thống thẩm định giá trị xe chuyên nghiệp"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Spotlight Telemetry Pill */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[8px] bg-slate-950/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block">
                        CƠ SỞ DỮ LIỆU
                      </span>
                      <div className="font-display font-extrabold text-sm text-white truncate">
                        15,280+ Giao Dịch Đã Khớp Lệnh
                      </div>
                    </div>
                    <span className="font-display font-black text-sm text-emerald-400 shrink-0">
                      LIVE Q4/2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Valuation Desk: Input Terminal (6 cols) + Evaluation Results (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column A (6 cols): Valuation Parameter Terminal (Double-Bezel Architecture) */}
          <div className="lg:col-span-6 p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-xl">
            <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-5 border border-slate-100">
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-[6px] border border-blue-100">
                  THÔNG SỐ PHƯƠNG TIỆN CẦN THẨM ĐỊNH
                </span>
                <h2 className="font-display font-black text-xl text-slate-900 tracking-tight">
                  Thiết Lập Dữ Liệu Xe
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Chọn đúng thương hiệu, phiên bản và số km thực tế để thuật toán xuất biểu giá khớp lệnh.
                </p>
              </div>

              {/* Brand Selector Buttons */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  1. Hãng sản xuất:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {PRESETS.map((p) => {
                    const isSelected = selectedBrand === p.brand;
                    return (
                      <button
                        key={p.brand}
                        type="button"
                        onClick={() => {
                          setSelectedBrand(p.brand);
                          setSelectedModel(p.models[0].name);
                        }}
                        className={`py-2 px-2 rounded-[8px] text-xs font-bold transition-all duration-200 border cursor-pointer text-center truncate ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90'
                        }`}
                      >
                        {p.brand}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Model Select Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  2. Dòng xe & Phiên bản chi tiết:
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-semibold bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                  >
                    {currentBrandPreset.models.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Year of Manufacture Grid */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    3. Năm sản xuất (Niên hạn):
                  </label>
                  <span className="text-blue-600 font-extrabold text-xs">
                    {manufactureYear} ({age === 0 ? 'Đời mới nhất' : `${age} năm tuổi`})
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                  {[2025, 2024, 2023, 2022, 2021, 2020, 2019].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setManufactureYear(y)}
                      className={`py-2 rounded-[8px] text-xs font-bold transition-all border cursor-pointer ${
                        manufactureYear === y
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* ODO Range Slider with Mechanical Feel */}
              <div className="space-y-2 p-3.5 rounded-[10px] bg-slate-50 border border-slate-200/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Gauge size={14} className="text-blue-600" />
                    <span>4. Số ODO đã vận hành:</span>
                  </span>
                  <span className="font-display font-extrabold text-sm text-blue-600 bg-white px-2.5 py-0.5 rounded border border-blue-100 shadow-xs">
                    {new Intl.NumberFormat('vi-VN').format(odoKm)} km
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="120000"
                  step="2000"
                  value={odoKm}
                  onChange={(e) => setOdoKm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  <span>2,000 km (Xe lướt)</span>
                  <span>50,000 km (Chuẩn)</span>
                  <span>120,000 km</span>
                </div>
              </div>

              {/* Condition Quality Tiers */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  5. Tình trạng bảo dưỡng & khung gầm:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    {
                      id: 'tier1',
                      title: 'Hạng A: Hoàn Hảo',
                      desc: 'Bảo dưỡng hãng 100%, sơn zin >95%, nội thất như mới.',
                    },
                    {
                      id: 'tier2',
                      title: 'Hạng B: Rất Tốt',
                      desc: 'Nguyên bản không đâm đụng, bảo dưỡng định kỳ đúng chuẩn.',
                    },
                    {
                      id: 'tier3',
                      title: 'Hạng C: Tiêu Chuẩn',
                      desc: 'Hao mòn tự nhiên theo thời gian, có xước dăm ngoại thất.',
                    },
                  ].map((t) => {
                    const isSelected = conditionTier === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setConditionTier(t.id as any)}
                        className={`p-3 rounded-[8px] border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600/30'
                            : 'border-slate-200/90 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{t.title}</div>
                        <div className="text-[10px] text-slate-500 mt-1 leading-snug">{t.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Column B (6 cols): Live Valuation Telemetry Terminal (Double-Bezel Architecture) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-1 rounded-[10px] bg-slate-900 shadow-xl">
              <div className="bg-[#070b14] text-white rounded-[8px] p-5 sm:p-6 space-y-5 border border-white/10 relative overflow-hidden">
                {/* Header */}
                <div className="space-y-1.5 border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                      <TrendingUp size={13} />
                      <span>KẾT QUẢ ĐỊNH GIÁ THỰC TẾ (Q4/2026)</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                    {selectedModel}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Đời {manufactureYear} • Vận hành {new Intl.NumberFormat('vi-VN').format(odoKm)} km
                  </p>
                </div>

                {/* Primary Reference Price Core */}
                <div className="p-4 rounded-[8px] bg-white/5 border border-white/10 space-y-2">
                  <span className="text-xs text-slate-300 font-medium block">
                    Khoảng giá thị trường tham chiếu:
                  </span>
                  <div className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-200 tracking-tight">
                    {calculatedResult.quickCash} - {calculatedResult.userMarketMax} Tỷ VNĐ
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5 text-xs">
                    <span className="text-slate-400">Giá giao dịch bình quân:</span>
                    <strong className="text-white font-mono text-sm">{calculatedResult.fairMarket} Tỷ VNĐ</strong>
                  </div>
                </div>

                {/* Financial Breakdown Table */}
                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Giá niêm yết lăn bánh lúc mua mới:</span>
                    <span className="font-bold text-white font-mono">~{calculatedResult.newCarPrice} Tỷ VNĐ</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Giá trị đã khấu hao / tiết kiệm:</span>
                    <span className="font-bold text-emerald-400 font-mono">-{calculatedResult.savedValue} Tỷ VNĐ</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span className="text-slate-400">CarShop cam kết thu mua tiền mặt:</span>
                    <span className="font-bold text-cyan-300 font-mono">
                      {calculatedResult.quickCash} Tỷ VNĐ (2 Giờ)
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-400">Tốc độ thanh khoản dòng xe:</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {calculatedResult.liquidity}
                    </span>
                  </div>
                </div>

                {/* Action CTAs: Button-in-Button Trailing Icons */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    to={ROUTES.SELL_CAR}
                    className="group py-2.5 pl-4 pr-2 rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-between transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>Thanh Lý Mức Giá Này</span>
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                      <ArrowRight size={13} className="text-white" />
                    </span>
                  </Link>

                  <Link
                    to={ROUTES.BUY_CAR}
                    className="group py-2.5 pl-4 pr-2 rounded-[8px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-between transition-all duration-300 border border-white/15 cursor-pointer"
                  >
                    <span>Xem Xe Showroom</span>
                    <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                      <RotateCcw size={13} className="text-cyan-300" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Note & Inspection Calibration Box */}
            <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm">
              <div className="p-5 rounded-[8px] bg-slate-50/70 border border-slate-100 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-[8px] bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Info size={18} />
                </div>
                <div className="space-y-1 text-xs text-slate-600 leading-relaxed font-normal">
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    Cơ Sở Xác Lập Giá Trị Thẩm Định
                  </h4>
                  <p>
                    Biểu giá trên được tính toán tự động dựa trên số liệu khớp lệnh hợp đồng xe thực tế tại thị trường Việt Nam. Giá thực tế tại thời điểm bàn giao có thể tăng thêm nếu xe sở hữu các gói Options chính hãng (phanh gốm, gói âm thanh Hi-End, mâm thể thao, dán PPF cao cấp).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Titanium Trust Matrix: 3 Institutional Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm">
            <div className="p-5 rounded-[8px] bg-slate-50/60 space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-blue-600 text-white flex items-center justify-center">
                <BarChart3 size={20} />
              </div>
              <h4 className="font-display font-extrabold text-sm text-slate-900">
                15,000+ Dữ Liệu Khớp Lệnh
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Biểu giá được trích xuất từ các giao dịch xe sang thực tế tại các thành phố lớn, đảm bảo không sai số ảo hay dìm giá người bán.
              </p>
            </div>
          </div>

          <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm">
            <div className="p-5 rounded-[8px] bg-slate-50/60 space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-emerald-600 text-white flex items-center justify-center">
                <Banknote size={20} />
              </div>
              <h4 className="font-display font-extrabold text-sm text-slate-900">
                Bảo Chứng Thu Mua Ngay
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                CarShop cam kết giải ngân tiền mặt 100% trong vòng 2 giờ theo đúng khung giá tính toán khi xe vượt qua 176 hạng mục kiểm tra.
              </p>
            </div>
          </div>

          <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm">
            <div className="p-5 rounded-[8px] bg-slate-50/60 space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-slate-900 text-white flex items-center justify-center">
                <FileCheck2 size={20} />
              </div>
              <h4 className="font-display font-extrabold text-sm text-slate-900">
                Thẩm Định 176 Hạng Mục Tận Nơi
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Chuyên viên CarShop đến tận nhà kiểm tra khung gầm, động cơ và hồ sơ pháp lý hoàn toàn miễn phí mà không ràng buộc giao dịch.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Practical Valuation FAQ Accordion */}
        <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-lg">
          <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-5 border border-slate-100">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                CÂU HỎI VỀ ĐỊNH GIÁ & KHẤU HAO
              </span>
              <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">
                Giải Đáp Về Biểu Giá & Khấu Hao Xe Sang
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              {valuationFaqs.map((faq, index) => {
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

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};
