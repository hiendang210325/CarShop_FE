import React from 'react';
import {
  FileCheck,
  ShieldCheck,
  RotateCcw,
  Landmark,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';

export const InspectionSection: React.FC = () => {
  return (
    <section id="inspection" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header with Eyebrow Tag */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] text-[10px] uppercase tracking-[0.2em] font-extrabold text-blue-600 bg-blue-50/80 border border-blue-100/90 shadow-2xs">
            <Sparkles size={11} />
            <span>TIÊU CHUẨN MINH BẠCH HÀNG ĐẦU</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            Đặc Quyền An Tâm Khi Sở Hữu Xe
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Quy trình thẩm định 176 hạng mục độc quyền và bảo chứng pháp lý toàn diện, xóa bỏ mọi lo âu về chất lượng khi sở hữu xe sang.
          </p>
        </div>

        {/* Asymmetrical Bento Grid with Double-Bezel Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Bento Card 1: 176-Point Inspection Hero Spotlight (Span 7 cols) */}
          <div className="md:col-span-12 lg:col-span-7 p-1 rounded-[10px] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 shadow-xl group">
            <div className="rounded-[8px] bg-slate-900/95 p-6 sm:p-8 h-full flex flex-col justify-between border border-white/10 relative overflow-hidden">
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[10px] bg-blue-600/20 border border-blue-500/30 text-cyan-400 flex items-center justify-center shadow-inner">
                    <FileCheck size={24} />
                  </div>
                  <span className="px-3 py-1 rounded-[6px] text-[10px] font-black uppercase tracking-widest bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                    TIÊU CHUẨN ISO SHOWROOM
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                    Kiểm Định 176 Điểm Độc Quyền
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal leading-relaxed">
                    Cam kết bằng văn bản có giá trị pháp lý: Tuyệt đối không đâm đụng ảnh hưởng khung gầm, không ngập nước thủy kích, keo chỉ nguyên bản và bảo toàn 100% động cơ, hộp số chính hãng.
                  </p>
                </div>

                {/* 4 Telemetry Inspection Checkpoints */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {[
                    'Động cơ & Hộp số nguyên bản',
                    'Khung gầm & Cấu trúc thân vỏ',
                    'Hệ thống điện & Pin EV chuyên sâu',
                    'Lịch sử bảo dưỡng chính hãng',
                  ].map((check, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-[8px] bg-white/[0.04] border border-white/[0.06] text-xs text-slate-200">
                      <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                      <span className="text-[11px] font-semibold truncate">{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Verification Seal */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Hoàn tiền 100% nếu có sai lệch kiểm định</span>
                </div>
                <Link
                  to={ROUTES.BUY_CAR}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Xem báo cáo mẫu</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

          {/* Bento Card 2: 3-Year Warranty (Span 5 cols) */}
          <div className="md:col-span-6 lg:col-span-5 p-1 rounded-[10px] bg-slate-100/80 border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-500 group">
            <div className="rounded-[8px] bg-white p-6 sm:p-7 h-full flex flex-col justify-between border border-slate-100">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-[8px] bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600">ĐẶC QUYỀN VIP</div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-slate-900 mt-1 tracking-tight">
                    Bảo Hành Chính Hãng Đến 3 Năm
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Bảo hành toàn diện cho động cơ, hộp số, hệ thống dẫn động Quattro / xDrive / 4MATIC cùng dịch vụ cứu hộ khẩn cấp 24/7 miễn phí trên 63 tỉnh thành.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-bold text-slate-700">
                <CheckCircle2 size={13} className="text-emerald-500" />
                <span>Cứu hộ chuyên dụng 24/7 miễn phí</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: 7-Day Money Back (Span 6 cols) */}
          <div className="md:col-span-6 lg:col-span-6 p-1 rounded-[10px] bg-slate-100/80 border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-500 group">
            <div className="rounded-[8px] bg-white p-6 sm:p-7 h-full flex flex-col justify-between border border-slate-100">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-[8px] bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <RotateCcw size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-600">TRẢI NGHIỆM THỰC TẾ</div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-slate-900 mt-1 tracking-tight">
                    Đổi Trả 7 Ngày Miễn Phí 100%
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Khách hàng được lái thử và kiểm tra chéo tại bất kỳ garage hoặc hãng nào trong 7 ngày. Nếu không đúng cam kết, CarShop thu hồi xe và hoàn trả 100% tiền cọc.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-bold text-slate-700">
                <CheckCircle2 size={13} className="text-blue-500" />
                <span>Hoàn tiền không mất phí thẩm định</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Financial Banking Partner (Span 6 cols) */}
          <div className="md:col-span-12 lg:col-span-6 p-1 rounded-[10px] bg-slate-100/80 border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-500 group">
            <div className="rounded-[8px] bg-white p-6 sm:p-7 h-full flex flex-col justify-between border border-slate-100">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-[8px] bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <Landmark size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-indigo-600">TÀI CHÍNH ĐẶC QUYỀN</div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-slate-900 mt-1 tracking-tight">
                    Hỗ Trợ Vay 85% • Giải Ngân 48 Giờ
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Hợp tác chiến lược cùng 12 ngân hàng hàng đầu (Vietcombank, Techcombank, MB, VPBank...). Hạn mức duyệt vay tối đa 85% giá trị xe với lãi suất ưu đãi chỉ từ 6.9%/năm.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-500" />
                  <span>Xử lý hồ sơ trong ngày</span>
                </div>
                <a href="#calculator" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                  <span>Dự toán vay</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
