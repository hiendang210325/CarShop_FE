import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  ChevronRight,
  ShieldCheck,
  Zap,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

export const BrandSelector: React.FC = () => {
  const navigate = useNavigate();

  const luxuryBrands = [
    {
      name: 'Porsche',
      origin: 'Stuttgart, Đức',
      count: '14 xe có sẵn',
      badge: 'THỂ THAO ĐỈNH CAO',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Mercedes-Benz',
      origin: 'Stuttgart, Đức',
      count: '32 xe có sẵn',
      badge: 'SANG TRỌNG BẬC NHẤT',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'BMW',
      origin: 'Munich, Đức',
      count: '21 xe có sẵn',
      badge: 'CẢM GIÁC LÁI THUẦN CHẤT',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Lexus',
      origin: 'Nagoya, Nhật Bản',
      count: '16 xe có sẵn',
      badge: 'ÊM ÁI & BỀN BỈ HOÀN HẢO',
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Audi',
      origin: 'Ingolstadt, Đức',
      count: '12 xe có sẵn',
      badge: 'DẪN ĐỘNG QUATTRO LỪNG DANH',
      image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'VinFast',
      origin: 'Hải Phòng, Việt Nam',
      count: '15 xe có sẵn',
      badge: 'XE ĐIỆN EV TƯƠNG LAI',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&auto=format&fit=crop&q=80',
    },
  ];

  const handleSelectBrand = (brandName: string) => {
    navigate(`${ROUTES.BUY_CAR}?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <section id="brands" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>THƯƠNG HIỆU TUYỂN CHỌN</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Khám Phá Các Hãng Xe Thượng Lưu
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Chọn thương hiệu yêu thích để duyệt nhanh các dòng xe sẵn sàng bàn giao tại showroom.
            </p>
          </div>

          <button
            onClick={() => navigate(ROUTES.BUY_CAR)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Xem tất cả thương hiệu</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* 6 Luxury Brand Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {luxuryBrands.map((brand, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectBrand(brand.name)}
              className="bg-slate-50/60 hover:bg-white rounded-[10px] border border-slate-200/80 hover:border-blue-400 p-4 transition-all duration-300 hover:shadow-md group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Brand Thumbnail */}
                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-slate-200 relative">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[9px] font-bold text-white bg-slate-900/80 px-1.5 py-0.5 rounded-[4px]">
                    {brand.name}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {brand.origin}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-semibold">{brand.count}</span>
                <ChevronRight size={13} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
