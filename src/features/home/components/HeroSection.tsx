import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Calendar,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { ROUTES } from "../../../constants";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#060a14] via-[#0b1222] to-[#0f172a] text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Ambient Luxury Lighting Orbs (Luminous Environmental Depth) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/12 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[380px] h-[380px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Subtle Hairline Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 space-y-7">
            {/* Titanium Kicker Pill - Haptic Depth & Precision */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[10px] bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-[0_2px_12px_rgba(6,182,212,0.12)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              <span>HỆ THỐNG PHÂN PHỐI XE SANG & SIÊU XE CHÍNH HÃNG</span>
            </div>

            {/* Main Headline - $150k Agency Typography Scale */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[48px] xl:text-[58px] text-white tracking-tight leading-[1.14]">
              Khẳng Định Vị Thế, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                Bản Lĩnh Người Dẫn Đầu
              </span>
            </h1>

            {/* Subheading - Refined Editorial Spacing */}
            <p className="font-sans text-slate-300/95 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
              Bộ sưu tập hơn 15,000+ kiệt tác xe sang kiểm định nghiêm ngặt 176 hạng mục độc quyền. Cam kết nguyên bản 100%, bảo hành chính hãng đến 3 năm và đặc quyền bàn giao xe tận nơi toàn quốc trong 48h.
            </p>

            {/* Nested CTA Buttons (Button-in-Button Trailing Architecture) */}
            <div className="flex flex-row flex-wrap items-center gap-3.5 pt-2">
              {/* Primary CTA with Nested Capsule Arrow */}
              <Link
                to={ROUTES.BUY_CAR}
                className="inline-flex items-center justify-between gap-3 pl-5 pr-2 py-2 rounded-[10px] bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all duration-300 cursor-pointer group active:scale-[0.98]"
              >
                <span>Khám phá kho xe có sẵn</span>
                <span className="w-8 h-8 rounded-[8px] bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:translate-x-1 group-hover:-translate-y-[0.5px] transition-transform duration-300">
                  <ArrowRight size={15} />
                </span>
              </Link>

              {/* Secondary CTA with Nested Capsule Calendar */}
              <Link
                to={ROUTES.TEST_DRIVE}
                className="inline-flex items-center justify-center gap-2.5 px-4.5 py-2.5 rounded-[10px] bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700/80 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 cursor-pointer group active:scale-[0.98]"
              >
                <span className="w-7 h-7 rounded-[7px] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                  <Calendar size={13} />
                </span>
                <span>Đặt lịch lái thử tận nơi</span>
              </Link>
            </div>

            {/* Trust Highlights Strip - Frosted Titanium Capsules */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-300 font-medium border-t border-slate-800/90">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-white/[0.03] border border-white/[0.06] backdrop-blur-xs">
                <ShieldCheck size={15} className="text-cyan-400 shrink-0" />
                <span>Kiểm định 176 điểm chuẩn</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-white/[0.03] border border-white/[0.06] backdrop-blur-xs">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                <span>Bảo hành chính hãng 3 năm</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-white/[0.03] border border-white/[0.06] backdrop-blur-xs">
                <Zap size={15} className="text-cyan-400 shrink-0" />
                <span>Giao xe toàn quốc 48h</span>
              </div>
            </div>
          </div>

          {/* Right Column: Double-Bezel Showcase Enclosure (Doppelrand Architecture) */}
          <div className="lg:col-span-6 relative">
            {/* Outer Shell: Machine-finished Titanium Bezel */}
            <div className="relative p-2 rounded-[10px] bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-transparent border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.65)] backdrop-blur-md group/shell transition-all duration-500 hover:border-cyan-500/30">
              {/* Inner Core: The Interactive Showcase Container */}
              <Link
                to="/cars/taycan"
                className="block relative rounded-[10px] overflow-hidden bg-slate-900 border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group cursor-pointer"
                title="Xem chi tiết Porsche Taycan 4S Cross Turismo"
              >
                {/* Car Image with Cinematic Zoom */}
                <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&auto=format&fit=crop&q=85"
                    alt="Porsche Taycan 4S Cross Turismo"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

                  {/* Top Left Spotlight Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-[8px] text-[10px] font-bold uppercase tracking-wider bg-slate-950/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <Sparkles size={11} />
                      <span>MẪU XE TÂM ĐIỂM</span>
                    </span>
                  </div>

                  {/* Top Right Year Badge */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-[8px] text-xs font-black bg-blue-600 text-white shadow-md border border-white/20">
                      2024
                    </span>
                  </div>
                </div>

                {/* Bottom Glassmorphic Telemetry HUD Bar */}
                <div className="p-4 sm:p-5 bg-slate-900/95 border-t border-white/[0.08] space-y-3.5 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                        PORSCHE • ALL-ELECTRIC GT
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                        Porsche Taycan 4S Cross Turismo
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-medium">
                        Giá chuyển nhượng:
                      </span>
                      <span className="font-display font-extrabold text-lg sm:text-xl text-cyan-400">
                        4.850 Tỷ
                      </span>
                    </div>
                  </div>

                  {/* 3 Telemetry Pillars (Cockpit Digital Telemetry) */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
                    <div className="bg-slate-950/70 p-2.5 rounded-[8px] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        0 - 100 KM/H
                      </div>
                      <div className="font-display font-black text-sm sm:text-base text-cyan-300 tracking-tight mt-0.5">
                        3.9 Giây
                      </div>
                    </div>

                    <div className="bg-slate-950/70 p-2.5 rounded-[8px] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        CÔNG SUẤT
                      </div>
                      <div className="font-display font-black text-sm sm:text-base text-cyan-300 tracking-tight mt-0.5">
                        530 PS
                      </div>
                    </div>

                    <div className="bg-slate-950/70 p-2.5 rounded-[8px] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        TẦM HOẠT ĐỘNG
                      </div>
                      <div className="font-display font-black text-sm sm:text-base text-cyan-300 tracking-tight mt-0.5">
                        452 KM
                      </div>
                    </div>
                  </div>

                  {/* Verification Status & Link */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-300 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span>
                      <span>Kiểm định 176 hạng mục • ODO: 4,200 km</span>
                    </div>
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
      </div>
    </section>
  );
};
