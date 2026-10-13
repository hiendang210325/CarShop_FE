import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Calendar,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
  Gauge,
  CheckCircle2,
} from 'lucide-react';
import { ROUTES } from '../../../constants';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#080d19] via-[#0c1324] to-[#0f172a] text-white pt-10 pb-20 sm:pt-14 sm:pb-28">
      {/* Ambient Luxury Lighting Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[480px] h-[480px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            {/* Titanium Kicker Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-slate-800/80 border border-slate-700/80 text-blue-400 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>HỆ THỐNG PHÂN PHỐI XE SANG VIỆT NAM</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl xl:text-6xl text-white tracking-tight leading-[1.12]">
              Kiệt Tác Xe Sang, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                Khởi Đầu Đẳng Cấp
              </span>
            </h1>

            {/* Subheading */}
            <p className="font-sans text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
              Hơn 15,000+ dòng xe thượng lưu kiểm định 176 hạng mục độc quyền, cam kết không đâm đụng, bảo hành chính hãng đến 3 năm và hỗ trợ thủ tục giải ngân sau 48h.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row flex-wrap items-center gap-3 pt-2">
              <Link
                to={ROUTES.BUY_CAR}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition-all text-center whitespace-nowrap cursor-pointer group"
              >
                <span>Khám phá kho xe có sẵn</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to={ROUTES.TEST_DRIVE}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[10px] bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700/80 backdrop-blur-xs transition-all text-center whitespace-nowrap cursor-pointer"
              >
                <Calendar size={16} className="text-cyan-400" />
                <span>Đặt lịch lái thử tận nơi</span>
              </Link>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-3 flex flex-wrap items-center gap-5 sm:gap-7 text-xs text-slate-400 font-medium border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-cyan-400 shrink-0" />
                <span>Kiểm định 176 điểm chuẩn</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                <span>Bảo hành chính hãng 3 năm</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-cyan-400 shrink-0" />
                <span>Giao xe toàn quốc 48h</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card with Telemetry Specs */}
          <div className="lg:col-span-6 relative">
            <Link
              to="/cars/taycan"
              className="block relative rounded-[10px] overflow-hidden border border-slate-700/70 shadow-2xl bg-slate-900 group cursor-pointer"
              title="Xem chi tiết Porsche Taycan 4S Cross Turismo"
            >
              {/* Car Image with Zoom Effect */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&auto=format&fit=crop&q=85"
                  alt="Porsche Taycan 4S Cross Turismo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-[10px] text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md flex items-center gap-1.5">
                    <Sparkles size={11} />
                    <span>MẪU XE TÂM ĐIỂM</span>
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-[10px] text-xs font-extrabold bg-blue-600 text-white shadow-md">
                    2024
                  </span>
                </div>
              </div>

              {/* Bottom Glassmorphic Telemetry Bar */}
              <div className="p-4 sm:p-5 bg-slate-900/95 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                      PORSCHE • ALL-ELECTRIC
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                      Porsche Taycan 4S Cross Turismo
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">Giá chuyển nhượng:</span>
                    <span className="font-display font-extrabold text-lg sm:text-xl text-cyan-400">
                      4.850 Tỷ
                    </span>
                  </div>
                </div>

                {/* 3 Telemetry Pillars */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
                  <div className="bg-slate-800/50 p-2 rounded-[8px] border border-slate-700/50">
                    <div className="text-[10px] text-slate-400 font-medium">0 - 100 KM/H</div>
                    <div className="font-display font-bold text-sm sm:text-base text-white mt-0.5">3.9 Giây</div>
                  </div>

                  <div className="bg-slate-800/50 p-2 rounded-[8px] border border-slate-700/50">
                    <div className="text-[10px] text-slate-400 font-medium">CÔNG SUẤT</div>
                    <div className="font-display font-bold text-sm sm:text-base text-white mt-0.5">530 PS</div>
                  </div>

                  <div className="bg-slate-800/50 p-2 rounded-[8px] border border-slate-700/50">
                    <div className="text-[10px] text-slate-400 font-medium">TẦM HOẠT ĐỘNG</div>
                    <div className="font-display font-bold text-sm sm:text-base text-white mt-0.5">452 KM</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="text-[11px]">Đã kiểm định 176 hạng mục • ODO: 4,200 km</span>
                  <span className="font-bold text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Xem chi tiết</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
