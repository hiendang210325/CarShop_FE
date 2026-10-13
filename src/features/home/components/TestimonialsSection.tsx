import React from 'react';
import { Star, CheckCircle, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Anh Hoàng Minh Trí',
      car: 'Chủ sở hữu Mercedes-Benz GLC 300 4MATIC',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80',
      comment:
        'Quy trình kiểm định 176 hạng mục rất minh bạch, tôi check chéo với xưởng chính hãng kết quả khớp 100%. Thủ tục giải ngân ngân hàng duyệt nhận xe trong ngày.',
    },
    {
      name: 'Chị Nguyễn Mai Linh',
      car: 'Chủ sở hữu Porsche Macan GTS',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      comment:
        'Đổi xe cũ lên đời xe lướt ở CarShop nhanh bất ngờ. Định giá xe cũ cao hơn thị trường, chuyên viên trực tiếp hỗ trợ rút hồ sơ công chứng chỉ trong 24 giờ.',
    },
    {
      name: 'Anh Lê Quốc Thắng',
      car: 'Chủ sở hữu VinFast VF 9 Plus',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
      comment:
        'Dịch vụ tư vấn xe điện rất chuyên nghiệp, hướng dẫn tỉ mỉ về hệ thống sạc và giải pháp bảo dưỡng pin. Chính sách bao test 7 ngày đem lại sự an tâm tuyệt đối.',
    },
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-[11px] font-bold text-blue-600 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles size={13} />
            <span>CỘNG ĐỒNG TIN CHỌN</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Trải Nghiệm Từ Khách Hàng Thực Tế
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
            Những khoảnh khắc bàn giao xe và đánh giá chân thực từ khách hàng tại hệ thống CarShop.
          </p>
        </div>

        {/* 3 Review Cards with 10px rounded borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50/60 rounded-[10px] border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Handover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={rev.image}
                    alt={rev.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-[6px] bg-slate-900/80 backdrop-blur-md text-[10px] font-semibold text-white">
                    <CheckCircle size={11} className="text-emerald-400" />
                    <span>Đã bàn giao xe</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Footer: Author */}
              <div className="p-4 sm:p-5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-xs sm:text-sm text-slate-900">
                    {rev.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5 truncate max-w-[220px]">
                    {rev.car}
                  </div>
                </div>

                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-[6px]">
                  Xác thực
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
