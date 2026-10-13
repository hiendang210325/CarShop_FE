import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Phone,
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Calendar,
  X,
} from 'lucide-react';
import { ROUTES } from '../../../constants';
import { CARS_CATALOG, CarItem } from '../../../constants/carsCatalog';

export const FeaturedInventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'used' | 'new' | 'ev'>('all');
  const [selectedCarModal, setSelectedCarModal] = useState<CarItem | null>(null);
  const navigate = useNavigate();

  const filteredCars = useMemo(() => {
    return CARS_CATALOG.filter((car) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'used') return car.condition === 'used';
      if (activeTab === 'new') return car.condition === 'new';
      if (activeTab === 'ev') return car.type === 'ev';
      return true;
    }).slice(0, 6); // Top 6 cars
  }, [activeTab]);

  return (
    <section id="inventory" className="py-16 sm:py-20 bg-slate-50/70 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-slate-200/80 pb-6">
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>BỘ SƯU TẬP TUYỂN CHỌN</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Xe Nổi Bật Sẵn Bàn Giao Trong Ngày
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              100% xe đã trải qua kiểm định 176 hạng mục độc quyền, hồ sơ pháp lý minh bạch hoàn chỉnh.
            </p>
          </div>

          {/* Filter Tabs with 10px rounded borders */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-[10px] border border-slate-200/90 shadow-2xs self-start md:self-auto overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'used', label: 'Xe lướt' },
              { id: 'new', label: 'Xe mới 100%' },
              { id: 'ev', label: 'Xe điện EV' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-[8px] text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-[10px] border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 16:10 Car Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={car.imageUrl}
                    alt={car.model}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-[10px] uppercase tracking-wider text-white bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-2xs">
                      {car.conditionTag}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-[10px] shadow-2xs">
                      {car.year}
                    </span>
                  </div>

                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-[10px] text-[10px] font-semibold bg-white/90 backdrop-blur-md text-slate-800">
                    {car.odo}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-600 font-bold uppercase tracking-wider">{car.brand}</span>
                      <span className="text-slate-400 font-medium text-[11px]">{car.typeLabel}</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900 mt-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {car.model}
                    </h3>
                  </div>

                  {/* Specs Strip */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-[10px] border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Động cơ:</span>
                      <span className="font-semibold text-slate-700 truncate block text-[11px]">{car.specs.engine}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Công suất:</span>
                      <span className="font-semibold text-slate-700 text-[11px]">{car.specs.power}</span>
                    </div>
                  </div>

                  {/* Price & Monthly Estimate */}
                  <div className="pt-2 flex items-baseline justify-between border-t border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">Giá chuyển nhượng:</div>
                      <div className="font-display font-extrabold text-xl text-blue-600">
                        {car.priceVND}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-medium">Trả góp từ:</div>
                      <div className="text-xs font-bold text-slate-800">
                        {car.monthlyEstimate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2.5">
                <Link
                  to={ROUTES.TEST_DRIVE}
                  className="w-full py-2.5 px-3 rounded-[10px] border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors text-center cursor-pointer"
                >
                  <Phone size={13} className="text-blue-600" />
                  <span>Lái thử</span>
                </Link>

                {car.detailUrl ? (
                  <Link
                    to={car.detailUrl}
                    className="w-full py-2.5 px-3 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-colors cursor-pointer"
                  >
                    <span>Xem xe</span>
                    <ChevronRight size={14} />
                  </Link>
                ) : (
                  <button
                    onClick={() => setSelectedCarModal(car)}
                    className="w-full py-2.5 px-3 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-colors cursor-pointer"
                  >
                    <span>Xem xe</span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Inventory CTA Bar */}
        <div className="p-6 sm:p-8 rounded-[10px] bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-extrabold text-lg sm:text-xl text-white">
              Chưa tìm thấy mẫu xe ưng ý?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Khám phá hơn 15,000+ xe sang sẵn sàng giao ngay hoặc liên hệ để chúng tôi tìm xe theo yêu cầu!
            </p>
          </div>

          <Link
            to={ROUTES.BUY_CAR}
            className="px-6 py-3 rounded-[10px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer group shrink-0"
          >
            <span>Xem Toàn Bộ Kho Xe</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Car Detail Quick Modal */}
      {selectedCarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[10px] max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setSelectedCarModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-[10px] hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedCarModal.brand}</span>
              <h3 className="font-display font-bold text-lg text-slate-900 mt-0.5">{selectedCarModal.model}</h3>
              <p className="text-xs text-slate-400">{selectedCarModal.odo} • Đời {selectedCarModal.year}</p>
            </div>

            <div className="aspect-[16/10] rounded-[10px] overflow-hidden bg-slate-100">
              <img src={selectedCarModal.imageUrl} alt={selectedCarModal.model} className="w-full h-full object-cover" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{selectedCarModal.description}</p>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-[10px] border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block">Động cơ:</span>
                <span className="font-semibold text-slate-800">{selectedCarModal.specs.engine}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Công suất:</span>
                <span className="font-semibold text-slate-800">{selectedCarModal.specs.power}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Hộp số:</span>
                <span className="font-semibold text-slate-800">{selectedCarModal.specs.gearbox}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Tiêu thụ / Pin:</span>
                <span className="font-semibold text-slate-800">{selectedCarModal.specs.fuelConsumption}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <div className="text-[10px] text-slate-400">Giá chuyển nhượng:</div>
                <div className="font-display font-extrabold text-xl text-blue-600">{selectedCarModal.priceVND}</div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={ROUTES.TEST_DRIVE}
                  className="px-3.5 py-2 rounded-[10px] border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-50"
                >
                  Lái Thử
                </Link>
                <a
                  href="tel:19008888"
                  className="px-4 py-2 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Phone size={13} />
                  <span>Giữ Xe Ngay</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
