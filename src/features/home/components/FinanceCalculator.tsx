import React, { useState } from 'react';
import { Zap, Calculator, CheckCircle2, ShieldCheck, ArrowRight, Banknote } from 'lucide-react';
import { useToast } from '../../../contexts/ToastContext';

export const FinanceCalculator: React.FC = () => {
  const [carPriceVND, setCarPriceVND] = useState<number>(2000000000); // 2 tỷ VNĐ
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30%
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60); // 60 tháng (5 năm)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();
  const interestRateYearly = 6.9; // 6.9% / năm

  // Calculations
  const downPaymentAmount = (carPriceVND * downPaymentPercent) / 100;
  const loanAmount = carPriceVND - downPaymentAmount;

  // Monthly payment calculation (Amortization formula)
  const monthlyRate = interestRateYearly / 100 / 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
        (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
      : loanAmount / loanTermMonths;

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(val)) + ' VNĐ';
  };

  const handleApplyEstimate = () => {
    setIsSubmitted(true);
    showToast('Đã gửi thông tin dự toán vay! Chuyên viên tài chính CarShop sẽ liên hệ hỗ trợ bạn sau 15 phút.', 'success');
  };

  return (
    <section id="calculator" className="py-20 sm:py-24 bg-slate-50/70 border-t border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Double-Bezel Enclosure for Financial Suite */}
        <div className="p-1.5 rounded-[10px] bg-white border border-slate-200/90 shadow-xl">
          <div className="rounded-[10px] bg-white p-6 sm:p-10 space-y-9 border border-slate-100">
            {/* Header Centered */}
            <div className="text-center max-w-2xl mx-auto border-b border-slate-100 pb-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] text-[10px] uppercase tracking-[0.2em] font-extrabold text-blue-600 bg-blue-50/80 border border-blue-100/90 shadow-2xs">
                <Calculator size={11} />
                <span>CÔNG CỤ TÀI CHÍNH THÔNG MINH</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
                Dự Toán Trả Góp & Hỗ Trợ Ngân Hàng
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                Lập kế hoạch tài chính linh hoạt với gói vay ưu đãi từ mạng lưới 12 ngân hàng đối tác liên kết CarShop, giải ngân siêu tốc trong 48h.
              </p>
            </div>

            {/* 2 Columns: Sliders & Luxury OLED HUD Results */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Sliders */}
              <div className="lg:col-span-7 space-y-7 flex flex-col justify-between">
                {/* Slider 1: Giá xe */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Giá trị xe dự kiến:</span>
                    <span className="font-display font-black text-blue-600 text-base sm:text-lg tracking-tight">
                      {formatVND(carPriceVND)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000000"
                    max="8000000000"
                    step="50000000"
                    value={carPriceVND}
                    onChange={(e) => setCarPriceVND(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-100 rounded-[6px] appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>500 Triệu</span>
                    <span>4 Tỷ</span>
                    <span>8 Tỷ</span>
                  </div>
                </div>

                {/* Slider 2: Tỷ lệ trả trước */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Vốn trả trước ban đầu:</span>
                    <span className="font-display font-black text-blue-600 text-base sm:text-lg tracking-tight">
                      {downPaymentPercent}% ({formatVND(downPaymentAmount)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="70"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-100 rounded-[6px] appearance-none cursor-pointer accent-blue-600"
                  />
                  {/* Preset Chips */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] text-slate-400 font-medium">Chọn nhanh:</span>
                    {[20, 30, 50].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setDownPaymentPercent(pct)}
                        className={`px-3 py-1 rounded-[6px] text-xs font-bold transition-all duration-300 cursor-pointer ${
                          downPaymentPercent === pct
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider 3: Thời hạn vay */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Thời gian vay ngân hàng:</span>
                    <span className="font-display font-black text-blue-600 text-base sm:text-lg tracking-tight">
                      {loanTermMonths} Tháng ({loanTermMonths / 12} Năm)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="84"
                    step="12"
                    value={loanTermMonths}
                    onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-100 rounded-[6px] appearance-none cursor-pointer accent-blue-600"
                  />
                  {/* Term Chips */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] text-slate-400 font-medium">Chọn nhanh:</span>
                    {[24, 36, 60, 84].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setLoanTermMonths(m)}
                        className={`px-3 py-1 rounded-[6px] text-xs font-bold transition-all duration-300 cursor-pointer ${
                          loanTermMonths === m
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {m / 12} Năm
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Double-Bezel OLED Telemetry Result Card */}
              <div className="lg:col-span-5 p-1 rounded-[10px] bg-gradient-to-br from-blue-600/30 via-cyan-500/10 to-indigo-600/30 shadow-xl">
                <div className="rounded-[10px] bg-gradient-to-br from-slate-950 via-slate-900 to-[#070d1e] p-6 sm:p-8 text-white h-full flex flex-col justify-between border border-white/10 relative overflow-hidden space-y-6">
                  {/* Ambient Luminous Orb */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                        ƯỚC TÍNH CHI PHÍ HÀNG THÁNG
                      </span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    </div>

                    <div className="space-y-1">
                      <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                        {formatVND(monthlyPayment)}
                        <span className="text-xs font-semibold text-slate-400 block mt-1">/ tháng (Gốc + Lãi)</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-normal pt-1">
                        Lãi suất ưu đãi từ 6.9%/năm cố định tại 12 ngân hàng liên kết chính hãng CarShop.
                      </p>
                    </div>

                    {/* Breakdown Matrix */}
                    <div className="pt-4 border-t border-white/10 space-y-3 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-[11px] font-medium text-slate-400">Số tiền vay ngân hàng:</span>
                        <strong className="font-bold text-white font-display">{formatVND(loanAmount)}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-[11px] font-medium text-slate-400">Khoản trả trước ({downPaymentPercent}%):</span>
                        <strong className="font-bold text-white font-display">{formatVND(downPaymentAmount)}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-[11px] font-medium text-slate-400">Thời gian vay vốn:</span>
                        <strong className="font-bold text-white font-display">{loanTermMonths} Tháng ({loanTermMonths / 12} Năm)</strong>
                      </div>
                    </div>
                  </div>

                  {/* Nested Button-in-Button Action */}
                  <div className="pt-2 space-y-3 relative z-10">
                    <button
                      type="button"
                      onClick={handleApplyEstimate}
                      disabled={isSubmitted}
                      className="w-full inline-flex items-center justify-between pl-5 pr-2 py-2 rounded-[10px] bg-blue-600 hover:bg-blue-500 disabled:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all duration-300 cursor-pointer group active:scale-[0.98]"
                    >
                      {isSubmitted ? (
                        <>
                          <span>Đã Gửi Hồ Sơ Phê Duyệt!</span>
                          <span className="w-8 h-8 rounded-[8px] bg-white/20 flex items-center justify-center text-white">
                            <CheckCircle2 size={16} />
                          </span>
                        </>
                      ) : (
                        <>
                          <span>Nhận Phê Duyệt Hồ Sơ Nhanh</span>
                          <span className="w-8 h-8 rounded-[8px] bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                            <Zap size={15} />
                          </span>
                        </>
                      )}
                    </button>

                    <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                      <ShieldCheck size={12} className="text-cyan-400" />
                      <span>Cam kết bảo mật thông tin hồ sơ khách hàng 100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
