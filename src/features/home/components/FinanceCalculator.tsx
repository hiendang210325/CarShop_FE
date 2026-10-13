import React, { useState } from 'react';
import { Zap, Calculator, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
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
    showToast('Đã gửi thông tin dự toán vay! Chuyên viên tài chính CarShop sẽ liên hệ hỗ trợ bạn.', 'success');
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-slate-50/70 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-[10px] p-6 sm:p-9 border border-slate-200/90 shadow-2xs space-y-8">
          {/* Header */}
          <div className="border-b border-slate-100 pb-5">
            <div className="text-[11px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Calculator size={13} />
              <span>CÔNG CỤ TÀI CHÍNH THÔNG MINH</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Dự Toán Trả Góp & Hỗ Trợ Ngân Hàng
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Chủ động chuẩn bị nguồn lực tài chính với lãi suất ưu đãi đặc quyền từ mạng lưới 12 ngân hàng liên kết.
            </p>
          </div>

          {/* 2 Columns: Sliders & Results */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Sliders */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Giá xe */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-700">Giá trị xe dự kiến:</span>
                  <span className="font-display font-extrabold text-blue-600 text-sm sm:text-base">
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
                  className="w-full h-2 bg-slate-100 rounded-[6px] appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>500 Triệu</span>
                  <span>4 Tỷ</span>
                  <span>8 Tỷ</span>
                </div>
              </div>

              {/* Slider 2: Tỷ lệ trả trước */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-700">Tỷ lệ trả trước ban đầu:</span>
                  <span className="font-display font-extrabold text-blue-600 text-sm sm:text-base">
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
                  className="w-full h-2 bg-slate-100 rounded-[6px] appearance-none cursor-pointer accent-blue-600"
                />
                {/* Preset Chips */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400">Chọn nhanh:</span>
                  {[20, 30, 50].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDownPaymentPercent(pct)}
                      className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold transition-all cursor-pointer ${
                        downPaymentPercent === pct
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 3: Thời hạn vay */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-700">Thời gian vay ngân hàng:</span>
                  <span className="font-display font-extrabold text-blue-600 text-sm sm:text-base">
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
                  className="w-full h-2 bg-slate-100 rounded-[6px] appearance-none cursor-pointer accent-blue-600"
                />
                {/* Term Chips */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400">Chọn nhanh:</span>
                  {[24, 36, 60, 84].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setLoanTermMonths(m)}
                      className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold transition-all cursor-pointer ${
                        loanTermMonths === m
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {m / 12} Năm
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Result Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-[10px] p-6 sm:p-7 border border-slate-800 shadow-md space-y-5">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                  ƯỚC TÍNH THANH TOÁN HÀNG THÁNG
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  {formatVND(monthlyPayment)}
                </div>
                <p className="text-[11px] text-slate-400">
                  Lãi suất 6.9%/năm cố định tại các ngân hàng đối tác liên kết CarShop.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Khoản vay dự kiến:</span>
                  <strong className="font-semibold text-white">{formatVND(loanAmount)}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Khoản trả trước ({downPaymentPercent}%):</span>
                  <strong className="font-semibold text-white">{formatVND(downPaymentAmount)}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Thời gian vay:</span>
                  <strong className="font-semibold text-white">{loanTermMonths} Tháng ({loanTermMonths / 12} Năm)</strong>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={handleApplyEstimate}
                  disabled={isSubmitted}
                  className="w-full py-3 px-4 rounded-[10px] bg-blue-600 hover:bg-blue-500 disabled:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Đã Gửi Hồ Sơ Phê Duyệt!</span>
                    </>
                  ) : (
                    <>
                      <Zap size={16} />
                      <span>Nhận Phê Duyệt Hồ Sơ Nhanh</span>
                    </>
                  )}
                </button>
                <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} className="text-cyan-400" />
                  <span>Cam kết bảo mật thông tin hồ sơ 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
