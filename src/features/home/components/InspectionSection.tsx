import React from 'react';
import {
  FileCheck,
  ShieldCheck,
  RotateCcw,
  Landmark,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const InspectionSection: React.FC = () => {
  const commitments = [
    {
      icon: <FileCheck size={24} className="text-blue-600" />,
      title: 'Kiểm Định 176 Điểm Độc Quyền',
      desc: 'Cam kết bằng văn bản: Không đâm đụng, không ngập nước thủy kích, keo chỉ nguyên bản và bảo toàn 100% động cơ, hộp số.',
    },
    {
      icon: <ShieldCheck size={24} className="text-blue-600" />,
      title: 'Bảo Hành Chính Hãng Đến 3 Năm',
      desc: 'Bảo hành toàn diện cho hệ thống máy móc, hộp số và hệ dẫn động cùng cứu hộ khẩn cấp 24/7 miễn phí trên toàn quốc.',
    },
    {
      icon: <RotateCcw size={24} className="text-blue-600" />,
      title: 'Đổi Trả 7 Ngày Miễn Phí',
      desc: 'Trải nghiệm thực tế xe trong 7 ngày. Sẵn sàng hoàn lại 100% chi phí nếu phát hiện bất kỳ sai lệch so với kiểm định ban đầu.',
    },
    {
      icon: <Landmark size={24} className="text-blue-600" />,
      title: 'Hỗ Trợ Vay 85% - Giải Ngân 48h',
      desc: 'Liên kết cùng 12 ngân hàng hàng đầu với lãi suất ưu đãi đặc quyền, hỗ trợ toàn bộ thủ tục pháp lý nhận xe nhanh chóng.',
    },
  ];

  return (
    <section id="inspection" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-[11px] font-bold text-blue-600 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles size={13} />
            <span>TIÊU CHUẨN MINH BẠCH CAO CẤP</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Đặc Quyền An Tâm Khi Sở Hữu Xe
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Chuẩn mực kiểm định khắt khe đem lại trải nghiệm sở hữu xe sang an tâm tuyệt đối cho khách hàng.
          </p>
        </div>

        {/* 4 Cards Grid with 10px rounded borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {commitments.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-[10px] bg-slate-50/60 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-md transition-all duration-300 space-y-3.5 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-[10px] bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>

                <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                <CheckCircle2 size={13} />
                <span>Cam kết có giá trị pháp lý</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
