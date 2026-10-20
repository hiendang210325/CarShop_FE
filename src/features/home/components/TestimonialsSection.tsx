import React from 'react';
import { Star, CheckCircle, Sparkles, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Anh Hoàng Minh Trí',
      car: 'Chủ sở hữu Mercedes-Benz GLC 300 4MATIC',
      city: 'Hà Nội',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80',
      comment:
        'Quy trình kiểm định 176 hạng mục rất minh bạch, tôi check chéo với xưởng Mercedes chính hãng kết quả khớp 100%. Thủ tục giải ngân ngân hàng duyệt nhận xe ngay trong ngày.',
    },
    {
      name: 'Chị Nguyễn Mai Linh',
      car: 'Chủ sở hữu Porsche Macan GTS',
      city: 'TP. Hồ Chí Minh',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      comment:
        'Đổi xe cũ lên đời xe lướt ở CarShop nhanh bất ngờ. Định giá xe cũ cao hơn thị trường, chuyên viên trực tiếp hỗ trợ rút hồ sơ công chứng tận nhà chỉ trong 24 giờ.',
    },
    {
      name: 'Anh Lê Quốc Thắng',
      car: 'Chủ sở hữu VinFast VF 9 Plus',
      city: 'Đà Nẵng',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
      comment:
        'Dịch vụ tư vấn xe điện rất chuyên nghiệp, hướng dẫn tỉ mỉ về hệ thống sạc và giải pháp bảo dưỡng pin. Chính sách bao test 7 ngày đem lại sự an tâm tuyệt đối.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header with Eyebrow Tag */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] text-[10px] uppercase tracking-[0.2em] font-extrabold text-blue-600 bg-blue-50/80 border border-blue-100/90 shadow-2xs">
            <Sparkles size={11} />
            <span>CỘNG ĐỒNG TIN CHỌN</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            Trải Nghiệm Từ Khách Hàng Thực Tế
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-xl mx-auto">
            Hơn 12,000+ khoảnh khắc bàn giao xe và đánh giá chân thực từ khách hàng thượng lưu tại hệ thống showroom CarShop.
          </p>
        </div>

        {/* 3 Review Cards with Double-Bezel Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-1.5 rounded-[10px] bg-slate-100/70 border border-slate-200/90 hover:border-blue-500/40 hover:shadow-2xl transition-all duration-500 shadow-2xs group flex flex-col justify-between"
            >
              <div className="rounded-[8px] bg-white overflow-hidden flex flex-col justify-between h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                <div>
                  {/* Handover Photo with Aspect 16:10 & Cinematic Badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 rounded-[8px]">
                    <img
                      src={rev.image}
                      alt={rev.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-slate-950/85 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 shadow-sm">
                      <CheckCircle size={12} className="text-emerald-400" />
                      <span>Đã bàn giao xe chính chủ</span>
                    </div>

                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-white/90 text-slate-800">
                      {rev.city}
                    </span>
                  </div>

                  {/* Review Content */}
                  <div className="p-4 sm:p-5 space-y-3.5">
                    {/* 5 Stars Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Footer: Verified Author */}
                <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-display font-extrabold text-sm text-slate-900 tracking-tight">
                      {rev.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5 truncate max-w-[210px]">
                      {rev.car}
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-[6px] border border-blue-100/80 shadow-2xs">
                    Xác Thực
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
