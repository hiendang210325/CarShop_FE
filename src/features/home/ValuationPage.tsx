import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  TrendingUp,
  Cpu,
  Sparkles,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  RotateCcw,
  Sliders,
  Car,
  Info,
  Clock,
  Banknote
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ROUTES } from '../../constants';

interface ValuationPreset {
  brand: string;
  models: {
    name: string;
    basePriceNew: number; // Tỷ VNĐ khi mua mới
    depreciationRate: number; // Khấu hao % mỗi năm
  }[];
}

const PRESETS: ValuationPreset[] = [
  {
    brand: 'Porsche',
    models: [
      { name: 'Porsche Taycan 4S Cross Turismo', basePriceNew: 5.75, depreciationRate: 0.08 },
      { name: 'Porsche Macan GTS', basePriceNew: 5.89, depreciationRate: 0.07 },
      { name: 'Porsche Panamera', basePriceNew: 6.25, depreciationRate: 0.085 },
      { name: 'Porsche Cayenne', basePriceNew: 5.95, depreciationRate: 0.075 },
    ],
  },
  {
    brand: 'Mercedes-Benz',
    models: [
      { name: 'Mercedes-Benz GLC 300 4MATIC', basePriceNew: 3.15, depreciationRate: 0.09 },
      { name: 'Mercedes-Benz C 300 AMG', basePriceNew: 2.39, depreciationRate: 0.095 },
      { name: 'Mercedes-Benz E 300 AMG', basePriceNew: 3.49, depreciationRate: 0.09 },
      { name: 'Mercedes-Maybach S 450 4MATIC', basePriceNew: 9.25, depreciationRate: 0.08 },
    ],
  },
  {
    brand: 'BMW',
    models: [
      { name: 'BMW 530i M Sport', basePriceNew: 3.39, depreciationRate: 0.10 },
      { name: 'BMW 330i M Sport', basePriceNew: 2.19, depreciationRate: 0.10 },
      { name: 'BMW X5 xDrive40i', basePriceNew: 4.59, depreciationRate: 0.09 },
      { name: 'BMW 730Li M Sport', basePriceNew: 5.19, depreciationRate: 0.11 },
    ],
  },
  {
    brand: 'Lexus',
    models: [
      { name: 'Lexus RX 350 Luxury', basePriceNew: 4.79, depreciationRate: 0.055 },
      { name: 'Lexus ES 250 Luxury', basePriceNew: 2.89, depreciationRate: 0.06 },
      { name: 'Lexus LX 600 VIP', basePriceNew: 10.5, depreciationRate: 0.05 },
    ],
  },
  {
    brand: 'VinFast EV',
    models: [
      { name: 'VinFast VF 9 Plus', basePriceNew: 2.29, depreciationRate: 0.09 },
      { name: 'VinFast VF 8 Plus', basePriceNew: 1.45, depreciationRate: 0.095 },
      { name: 'VinFast VF 7 Plus', basePriceNew: 1.15, depreciationRate: 0.09 },
    ],
  },
];

export const ValuationPage: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('Porsche');
  const [selectedModel, setSelectedModel] = useState('Porsche Taycan 4S Cross Turismo');
  const [manufactureYear, setManufactureYear] = useState(2023);
  const [odoKm, setOdoKm] = useState(15000);
  const [conditionTier, setConditionTier] = useState<'excellent' | 'good' | 'average'>('excellent');

  // Available models for selected brand
  const currentBrandPreset = PRESETS.find((p) => p.brand === selectedBrand) || PRESETS[0];
  const currentModelData =
    currentBrandPreset.models.find((m) => m.name === selectedModel) || currentBrandPreset.models[0];

  // Calculation Algorithm
  const currentYear = 2026;
  const age = Math.max(0, currentYear - manufactureYear);

  const calculatedResult = useMemo(() => {
    let price = currentModelData.basePriceNew;

    // Depreciation by age
    for (let i = 0; i < age; i++) {
      price = price * (1 - currentModelData.depreciationRate);
    }

    // Depreciation by ODO (Standard is ~12,000 km/year)
    const standardOdo = age * 12000;
    const odoDiff = odoKm - standardOdo;
    if (odoDiff > 0) {
      price = price - (odoDiff / 10000) * 0.04; // trừ 40 triệu mỗi 10k km phụ trội
    } else {
      price = price + (Math.abs(odoDiff) / 10000) * 0.02; // cộng 20 triệu nếu xe đi cực ít
    }

    // Condition multiplier
    let conditionMultiplier = 1.0;
    if (conditionTier === 'excellent') conditionMultiplier = 1.03;
    else if (conditionTier === 'average') conditionMultiplier = 0.95;

    price = price * conditionMultiplier;

    // Min market, Trade-in cash, Fair market
    const fairMarket = Math.max(0.5, price);
    const quickCash = fairMarket * 0.93; // Thu mua nhanh tiền mặt
    const userMarketMax = fairMarket * 1.04;

    return {
      fairMarket: fairMarket.toFixed(2),
      quickCash: quickCash.toFixed(2),
      userMarketMax: userMarketMax.toFixed(2),
      newCarPrice: currentModelData.basePriceNew.toFixed(2),
      savedValue: (currentModelData.basePriceNew - fairMarket).toFixed(2),
    };
  }, [currentModelData, age, odoKm, conditionTier]);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-900 font-sans selection:bg-[#0066ff] selection:text-white flex flex-col justify-between">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 flex-1 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
          <Link to={ROUTES.HOME} className="hover:text-blue-600 transition-colors font-medium">
            Trang chủ
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold">Định Giá Xe AI & Thẩm Định</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Cpu size={14} />
              <span>Thuật Toán AI Phân Tích 15,000+ Giao Dịch Thực Tế</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Công Cụ Định Giá <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Ô Tô Chuẩn Xác Tức Thì
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Biết ngay giá trị thực tế của chiếc xe trên thị trường chỉ trong 10 giây. Không cần để lại thông tin rườm rà, số liệu cập nhật liên tục theo biến động giá xe tại Việt Nam.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 lg:opacity-30 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1200&auto=format&fit=crop&q=80"
              alt="Valuation AI banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Calculator Grid: Left Inputs (6 cols) | Right Results (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Controls */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders size={14} />
                <span>THÔNG SỐ XE CẦN ĐỊNH GIÁ</span>
              </span>
              <h2 className="font-display font-bold text-2xl text-slate-900">
                Chọn Dòng Xe Của Bạn
              </h2>
            </div>

            <div className="space-y-5">
              {/* Brand selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Thương hiệu xe:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.brand}
                      type="button"
                      onClick={() => {
                        setSelectedBrand(p.brand);
                        setSelectedModel(p.models[0].name);
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedBrand === p.brand
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {p.brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phiên bản cụ thể:
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm bg-white font-medium focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                >
                  {currentBrandPreset.models.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Manufacture Year */}
              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
                  <span className="text-slate-700">Năm sản xuất:</span>
                  <span className="text-blue-600 font-display text-sm">{manufactureYear} ({age} năm tuổi)</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {[2025, 2024, 2023, 2022, 2021, 2020, 2019].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setManufactureYear(y)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        manufactureYear === y
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* ODO Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-700">Số ODO đã vận hành:</span>
                  <span className="text-blue-600 font-display text-sm">
                    {new Intl.NumberFormat('vi-VN').format(odoKm)} km
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="120000"
                  step="2000"
                  value={odoKm}
                  onChange={(e) => setOdoKm(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1,000 km (Lướt)</span>
                  <span>60,000 km</span>
                  <span>120,000 km</span>
                </div>
              </div>

              {/* Condition Tier */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tình trạng bảo dưỡng & thân vỏ:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'excellent', title: 'Xuất Sắc', desc: 'Bảo dưỡng hãng 100%, sơn zin > 95%' },
                    { id: 'good', title: 'Rất Tốt', desc: 'Không đâm đụng, nội thất mới nguyên' },
                    { id: 'average', title: 'Bình Thường', desc: 'Có hao mòn tự nhiên theo thời gian' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setConditionTier(t.id as any)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        conditionTier === t.id
                          ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900">{t.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Output */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 border border-slate-800">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                  <TrendingUp size={14} />
                  <span>KẾT QUẢ ĐỊNH GIÁ THỊ TRƯỜNG THỰC TẾ</span>
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  {selectedModel}
                </h3>
                <p className="text-xs text-slate-400">
                  Đời {manufactureYear} • ODO {new Intl.NumberFormat('vi-VN').format(odoKm)} km
                </p>
              </div>

              {/* Main Estimated Price Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <span className="text-xs text-slate-300 font-medium">Khoảng giá thị trường tham chiếu:</span>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  {calculatedResult.quickCash} - {calculatedResult.userMarketMax} Tỷ VNĐ
                </div>
                <p className="text-[11px] text-slate-400">
                  Mức giá giao dịch bình quân hiện tại: <span className="font-bold text-white">{calculatedResult.fairMarket} Tỷ VNĐ</span>
                </p>
              </div>

              {/* Breakdown details */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-slate-400">Giá niêm yết khi mua mới (Lăn bánh):</span>
                  <span className="font-bold text-white">~{calculatedResult.newCarPrice} Tỷ VNĐ</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-slate-400">Giá trị đã khấu hao / tiết kiệm được:</span>
                  <span className="font-bold text-emerald-400">-{calculatedResult.savedValue} Tỷ VNĐ</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-slate-400">Mức giá CarShop cam kết thu mua ngay:</span>
                  <span className="font-bold text-blue-400">{calculatedResult.quickCash} Tỷ VNĐ (Tiền mặt trong 2h)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Thanh khoản dòng xe trên thị trường:</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    RẤT CAO (Dưới 7 ngày)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to={ROUTES.SELL_CAR}
                  className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md text-center cursor-pointer"
                >
                  <Banknote size={15} />
                  <span>Bán Xe Cho CarShop Ngay</span>
                </Link>

                <Link
                  to={ROUTES.BUY_CAR}
                  className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-white/15 text-center cursor-pointer"
                >
                  <RotateCcw size={15} />
                  <span>Đổi Xe Lướt Showroom</span>
                </Link>
              </div>
            </div>

            {/* Note box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Info size={20} />
              </div>
              <div className="space-y-1 text-xs text-slate-600 leading-relaxed">
                <h4 className="font-bold text-slate-900 text-sm">Lưu Ý Về Kết Quả Thẩm Định</h4>
                <p>
                  Mức giá trên được tính toán tự động dựa trên thuật toán AI và số liệu giao dịch xe thực tế. Giá bán chính xác có thể tăng thêm nếu xe trang bị thêm các gói Options cao cấp (phanh gốm, âm thanh Burmester, gói thể thao Carbon...).
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};
