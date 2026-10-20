import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

export const BrandSelector: React.FC = () => {
  const navigate = useNavigate();

  const luxuryBrands = [
    {
      name: 'Porsche',
      origin: 'Đức',
      count: '14 xe sẵn có',
      tagline: 'Biểu tượng thể thao',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Mercedes-Benz',
      origin: 'Đức',
      count: '32 xe sẵn có',
      tagline: 'Sang trọng & Đẳng cấp',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'BMW',
      origin: 'Đức',
      count: '21 xe sẵn có',
      tagline: 'Cảm giác lái thuần khiết',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Lexus',
      origin: 'Nhật Bản',
      count: '16 xe sẵn có',
      tagline: 'Bền bỉ & Êm ái tuyệt đối',
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Audi',
      origin: 'Đức',
      count: '12 xe sẵn có',
      tagline: 'Công nghệ Quattro đỉnh cao',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'VinFast',
      origin: 'Việt Nam',
      count: '15 xe sẵn có',
      tagline: 'Tiên phong xe điện thông minh',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const handleSelectBrand = (brandName: string) => {
    navigate(`${ROUTES.BUY_CAR}?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <section id="brands" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header Centered */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] text-[10px] uppercase tracking-[0.2em] font-extrabold text-blue-600 bg-blue-50/90 border border-blue-200/80 shadow-2xs">
            <Sparkles size={11} className="text-blue-600" />
            <span>HÃNG XE THƯỢNG LƯU</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            Khám Phá Các Thương Hiệu Danh Tiếng
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            Trải nghiệm các thương hiệu xe sang hàng đầu thế giới được kiểm định nghiêm ngặt 176 hạng mục, sẵn sàng bàn giao tại showroom.
          </p>
        </div>

        {/* 6 Luxury Brand Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {luxuryBrands.map((brand, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectBrand(brand.name)}
              className="rounded-[10px] bg-white border border-slate-200/90 hover:border-blue-500/40 hover:shadow-xl transition-all duration-300 shadow-2xs group cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Brand Image Frame */}
                <div className="w-full aspect-[4/3] overflow-hidden bg-slate-950 relative">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Clean Origin Chip */}
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-slate-950/70 backdrop-blur-md px-2 py-0.5 rounded-[4px] border border-white/10">
                    {brand.origin}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3.5 space-y-1">
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight truncate">
                    {brand.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium line-clamp-1 leading-snug">
                    {brand.tagline}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-blue-600 font-bold">
                  {brand.count}
                </span>
                <span className="w-5 h-5 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors">
                  <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Action Button */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => navigate(ROUTES.BUY_CAR)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[10px] bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-xs font-bold text-slate-700 hover:text-blue-600 transition-all cursor-pointer group active:scale-[0.98] shadow-xs"
          >
            <span>Xem tất cả thương hiệu</span>
            <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
