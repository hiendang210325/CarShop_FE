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
  Gauge,
} from 'lucide-react';
import { ROUTES } from '../../../constants';
import { CARS_CATALOG, CarItem } from '../../../constants/carsCatalog';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

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
    <section id="inventory" className="py-20 sm:py-24 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
        {/* Section Header Centered */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] text-[10px] uppercase tracking-[0.2em] font-extrabold text-blue-600 bg-blue-50/90 shadow-2xs">
            <Sparkles size={11} className="text-blue-600" />
            <span>BỘ SƯU TẬP TUYỂN CHỌN</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            Xe Nổi Bật Sẵn Bàn Giao Trong Ngày
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            100% siêu phẩm xe sang đã qua kiểm định khắt khe 176 hạng mục độc quyền, hồ sơ pháp lý minh bạch hoàn chỉnh bàn giao ngay.
          </p>
        </div>

        {/* Centered Segmented Filter Tabs */}
        <div className="flex justify-center -mt-2 sm:-mt-4">
          <div className="inline-flex items-center gap-1 p-1 rounded-[10px] bg-slate-100/90 ring-1 ring-black/[0.04] shadow-xs overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'Tất cả dòng xe' },
              { id: 'used', label: 'Xe lướt kiểm định' },
              { id: 'new', label: 'Xe mới 100%' },
              { id: 'ev', label: 'Xe điện EV' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-[7px] text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Luxury Car Cards Grid with Editorial Studio Atelier Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCars.map((car) => {
            const statusBadge =
              car.type === 'ev'
                ? { label: 'Xe Điện EV', dot: 'bg-cyan-500' }
                : car.condition === 'new'
                ? { label: 'Xe Mới 100%', dot: 'bg-emerald-500' }
                : { label: 'Xe Lướt Tuyển Chọn', dot: 'bg-blue-600' };

            const cleanEngine = car.specs.engine
              .replace('Điện Dual Motor (800V)', 'Dual Motor')
              .replace('2.0L Turbo Mild-Hybrid', '2.0L Mild-Hybrid')
              .replace('2.0L TwinPower Turbo', '2.0L TwinPower')
              .replace('3.0L I6 EQ Boost', '3.0L EQ Boost')
              .replace('3.0L M TwinPower Turbo S58', '3.0L Twin-Turbo');

            return (
              <Card
                key={car.id}
                className="group relative rounded-[10px] bg-white ring-1 ring-black/[0.04] shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_-8px_rgba(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col justify-between p-0 gap-0"
              >
                {/* 16:10 Studio Showcase Media Frame */}
                <Link
                  to={car.detailUrl || `/cars/${car.id}`}
                  className="relative aspect-[16/10] overflow-hidden bg-slate-950 block cursor-pointer group/img"
                  title={`Xem chi tiết ${car.model}`}
                >
                  <img
                    src={car.imageUrl}
                    alt={car.model}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent pointer-events-none" />

                  {/* Top-Left Floating Minimalist Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-md shadow-xs border border-white/60">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                      <span>{statusBadge.label}</span>
                    </span>
                  </div>

                  {/* Bottom Vignette Info */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none text-white text-xs">
                    <span className="font-semibold text-slate-100 drop-shadow-xs">Đời {car.year}</span>
                    <span className="px-2.5 py-0.5 rounded-[8px] bg-slate-950/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                      {car.odo}
                    </span>
                  </div>
                </Link>

                {/* Card Header: Brand, Type & Model Title */}
                <CardHeader className="p-5 pb-3 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      {car.brand}
                    </span>
                    <span className="text-slate-400 text-xs font-medium truncate max-w-[140px] text-right">
                      {car.typeLabel}
                    </span>
                  </div>

                  <Link to={car.detailUrl || `/cars/${car.id}`}>
                    <CardTitle
                      className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight truncate leading-tight pt-0.5 cursor-pointer"
                      title={car.model}
                    >
                      {car.model}
                    </CardTitle>
                  </Link>
                </CardHeader>

                {/* Card Content: 3-Point Clean Editorial Telemetry & Price */}
                <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-between space-y-4">
                  {/* Clean 3-Point Horizontal Telemetry (Zero Gray Border Line) */}
                  <div className="grid grid-cols-3 py-2 px-2.5 rounded-[8px] bg-slate-50/80 text-center">
                    <div className="px-1 text-left">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Động cơ
                      </span>
                      <span className="font-bold text-slate-800 text-xs truncate block mt-0.5" title={car.specs.engine}>
                        {cleanEngine}
                      </span>
                    </div>

                    <div className="px-1 text-center">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Công suất
                      </span>
                      <span className="font-bold text-slate-800 text-xs block mt-0.5">
                        {car.specs.power}
                      </span>
                    </div>

                    <div className="px-1 text-right">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Hộp số
                      </span>
                      <span className="font-bold text-slate-800 text-xs truncate block mt-0.5">
                        {car.specs.gearbox.replace('Tự động ', '').replace('Steptronic', 'Step')}
                      </span>
                    </div>
                  </div>

                  {/* Clean Executive Pricing Block */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Giá chuyển nhượng
                      </span>
                      <span className="font-display font-black text-2xl text-slate-900 group-hover:text-blue-600 transition-colors leading-tight block pt-0.5">
                        {car.priceVND}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Trả góp từ
                      </span>
                      <span className="text-xs font-bold text-slate-700 block pt-0.5">
                        {car.monthlyEstimate}
                      </span>
                    </div>
                  </div>
                </CardContent>

                {/* Card Footer: Modern Action Buttons */}
                <CardFooter className="p-5 pt-0 grid grid-cols-2 gap-3">
                  <Link
                    to={ROUTES.TEST_DRIVE}
                    className="h-10 px-3 rounded-[8px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <Calendar size={13} className="text-blue-600" />
                    <span>Lái thử</span>
                  </Link>

                  <Link
                    to={car.detailUrl || `/cars/${car.id}`}
                    className="h-10 px-3 rounded-[8px] bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer group/btn active:scale-[0.98]"
                  >
                    <span>Xem chi tiết</span>
                    <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Double-Bezel VIP Concierge Banner */}
        <div className="p-1 rounded-[10px] bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-indigo-600/30 shadow-xl">
          <div className="p-6 sm:p-8 rounded-[10px] bg-gradient-to-r from-slate-950 via-slate-900 to-[#0b1329] text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-cyan-400">
                <Sparkles size={12} />
                <span>DỊCH VỤ SĂN XE THEO YÊU CẦU VIP</span>
              </div>
              <h4 className="font-display font-extrabold text-lg sm:text-2xl text-white tracking-tight">
                Chưa tìm thấy mẫu xe sang ưng ý?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
                Khám phá hơn 15,000+ xe sang trong mạng lưới toàn quốc hoặc gửi yêu cầu để chuyên viên tìm kiếm chiếc xe hoàn hảo đúng thông số cho bạn.
              </p>
            </div>

            {/* Nested Button-in-Button CTA */}
            <Link
              to={ROUTES.BUY_CAR}
              className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-[10px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all duration-300 cursor-pointer group shrink-0 active:scale-[0.98]"
            >
              <span>Xem Toàn Bộ Kho Xe</span>
              <span className="w-8 h-8 rounded-[8px] bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                <ArrowRight size={15} />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Car Detail Quick Modal */}
      {selectedCarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[10px] ring-1 ring-black/[0.05] shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-5 sm:p-6 space-y-4 relative">
              <button
                type="button"
                onClick={() => setSelectedCarModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-[8px] hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                title="Đóng"
              >
                <X size={18} />
              </button>

              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider">{selectedCarModal.brand}</span>
                <h3 className="font-display font-extrabold text-xl text-slate-900 mt-0.5 tracking-tight">{selectedCarModal.model}</h3>
                <p className="text-xs text-slate-400 font-semibold">{selectedCarModal.odo} • Đời {selectedCarModal.year}</p>
              </div>

              <div className="aspect-[16/10] rounded-[8px] overflow-hidden bg-slate-900 shadow-inner">
                <img src={selectedCarModal.imageUrl} alt={selectedCarModal.model} className="w-full h-full object-cover" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">{selectedCarModal.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-[8px] ring-1 ring-black/[0.03]">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Động cơ:</span>
                  <span className="font-bold text-slate-800">{selectedCarModal.specs.engine}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Công suất:</span>
                  <span className="font-bold text-slate-800">{selectedCarModal.specs.power}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Hộp số:</span>
                  <span className="font-bold text-slate-800">{selectedCarModal.specs.gearbox}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tiêu thụ / Pin:</span>
                  <span className="font-bold text-slate-800">{selectedCarModal.specs.fuelConsumption}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Giá chuyển nhượng:</div>
                  <div className="font-display font-black text-xl text-blue-600">{selectedCarModal.priceVND}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={ROUTES.TEST_DRIVE}
                    className="px-3.5 py-2 rounded-[8px] bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-colors"
                  >
                    Lái Thử
                  </Link>
                  <a
                    href="tel:19008888"
                    className="px-4 py-2 rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Phone size={13} />
                    <span>Giữ Xe Ngay</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
