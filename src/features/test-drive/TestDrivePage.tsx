import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  Calendar,
  Clock,
  MapPin,
  Car,
  UserCheck,
  Phone,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowRight,
  Compass,
  FileCheck,
  Coffee,
  Route,
  Gift,
  Star,
  X,
  Info,
  Sliders,
  Check,
  RotateCcw,
  BadgeCheck,
} from 'lucide-react';
import { Navbar } from '../home/components/Navbar';
import { Footer } from '../home/components/Footer';
import { ROUTES } from '../../constants';

/**
 * High-End Visual Design & Anti-Slop Directive:
 * - Vibe: Institutional Precision & Luxury Automotive Lounge
 * - Spacing: Disciplined py-8 sm:py-10 space-y-8 flex-1 w-full
 * - Double-Bezel Architecture: outer rounded-[10px] p-1 + inner rounded-[8px] core
 * - Real automotive privilege language (Zero cheesy marketing slop)
 * - Kinetic Button-in-Button CTAs with spring trajectory physics
 */

interface CarOption {
  id: string;
  brand: string;
  model: string;
  powertrain: 'ev' | 'gas' | 'hybrid';
  powertrainLabel: string;
  power: string;
  acceleration: string;
  color: string;
  image: string;
  inStock: boolean;
}

const CAR_OPTIONS: CarOption[] = [
  {
    id: 'porsche-taycan-4s',
    brand: 'Porsche',
    model: 'Porsche Taycan 4S Cross Turismo',
    powertrain: 'ev',
    powertrainLabel: 'Xe Điện EV (800V)',
    power: '530 HP',
    acceleration: '3.9s (0-100)',
    color: 'Xanh Gentian Blue',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  {
    id: 'mercedes-glc-300',
    brand: 'Mercedes-Benz',
    model: 'Mercedes-Benz GLC 300 4MATIC AMG',
    powertrain: 'hybrid',
    powertrainLabel: 'Mild-Hybrid 2.0L',
    power: '258 HP',
    acceleration: '6.2s (0-100)',
    color: 'Trắng Polar White',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  {
    id: 'bmw-530i-m-sport',
    brand: 'BMW',
    model: 'BMW 530i M Sport LCI',
    powertrain: 'gas',
    powertrainLabel: 'Xăng 2.0L TwinPower',
    power: '252 HP',
    acceleration: '6.4s (0-100)',
    color: 'Đen Sapphire Black',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  {
    id: 'audi-q7-tfsi',
    brand: 'Audi',
    model: 'Audi Q7 45 TFSI Quattro 7 Chỗ',
    powertrain: 'gas',
    powertrainLabel: 'Xăng 2.0L Turbo Quattro',
    power: '252 HP',
    acceleration: '7.3s (0-100)',
    color: 'Xám Daytona Grey',
    image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  {
    id: 'vinfast-vf9-plus',
    brand: 'VinFast',
    model: 'VinFast VF 9 Plus 6 Ghế Cơ Trưởng',
    powertrain: 'ev',
    powertrainLabel: 'Xe Điện EV (Pin SDI)',
    power: '402 HP',
    acceleration: '6.5s (0-100)',
    color: 'Xanh VinFast Deep Ocean',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  {
    id: 'lexus-rx-350',
    brand: 'Lexus',
    model: 'Lexus RX 350 Luxury AWD',
    powertrain: 'gas',
    powertrainLabel: 'Xăng 2.4L Turbo',
    power: '275 HP',
    acceleration: '7.6s (0-100)',
    color: 'Titanium Sonic Karat',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
];

const SHOWROOMS = [
  {
    id: 'hn-vo-chi-cong',
    name: 'Showroom CarShop Hà Nội (Tây Hồ)',
    address: 'Số 68 Võ Chí Công, Q. Tây Hồ, TP. Hà Nội',
    hotline: '0988 888 888',
    hours: '08:00 - 20:00 (Thứ 2 - CN)',
  },
  {
    id: 'hn-long-bien',
    name: 'Showroom CarShop Hà Nội (Long Biên)',
    address: 'Số 1 Nguyễn Văn Linh, P. Gia Thụy, Q. Long Biên, TP. Hà Nội',
    hotline: '0988 888 889',
    hours: '08:00 - 20:00 (Thứ 2 - CN)',
  },
  {
    id: 'dn-hai-chau',
    name: 'Showroom CarShop Đà Nẵng (Hải Châu)',
    address: 'Số 186 Đường 2/9, P. Hòa Cường Bắc, Q. Hải Châu, TP. Đà Nẵng',
    hotline: '0988 888 886',
    hours: '08:00 - 19:30 (Thứ 2 - CN)',
  },
  {
    id: 'hcm-q7',
    name: 'Showroom CarShop TP.HCM (Phú Mỹ Hưng)',
    address: 'Số 801 Nguyễn Văn Linh, P. Tân Phú, Quận 7, TP. Hồ Chí Minh',
    hotline: '0988 888 885',
    hours: '08:00 - 20:30 (Thứ 2 - CN)',
  },
];

const TIME_SLOTS = [
  '09:00 - 10:30 (Sáng)',
  '11:00 - 12:30 (Trưa)',
  '14:00 - 15:30 (Chiều)',
  '16:00 - 17:30 (Hoàng hôn)',
  '18:00 - 19:30 (Tối)',
];

export const TestDrivePage: React.FC = () => {
  // Brand & Car filter
  const [selectedBrand, setSelectedBrand] = useState<string>('Tất cả');
  const [selectedPowertrain, setSelectedPowertrain] = useState<'all' | 'ev' | 'gas' | 'hybrid'>('all');
  const [selectedCarId, setSelectedCarId] = useState<string>('porsche-taycan-4s');

  // Location & Date/Time
  const [deliveryMode, setDeliveryMode] = useState<'showroom' | 'home'>('showroom');
  const [selectedShowroom, setSelectedShowroom] = useState<string>('hn-vo-chi-cong');
  const [homeAddress, setHomeAddress] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-25');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[0]);

  // Customer Info
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [hasLicense, setHasLicense] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');

  // Confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Active car object
  const activeCar = CAR_OPTIONS.find((c) => c.id === selectedCarId) || CAR_OPTIONS[0];

  // Filtered cars by brand & powertrain
  const filteredCars = CAR_OPTIONS.filter((c) => {
    const matchBrand = selectedBrand === 'Tất cả' || c.brand === selectedBrand;
    const matchPowertrain = selectedPowertrain === 'all' || c.powertrain === selectedPowertrain;
    return matchBrand && matchPowertrain;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasLicense) {
      alert('Quý khách vui lòng xác nhận đã có giấy phép lái xe B1/B2 hợp lệ trên 1 năm để đảm bảo an toàn quy định lái thử.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const randomRef = 'CS-TD-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(randomRef);
      setIsSubmitting(false);
      setShowConfirmModal(true);
    }, 600);
  };

  return (
    <div className="min-h-[100dvh] bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 flex-1 w-full">
        {/* Breadcrumb with Micro-Typography */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <Link to={ROUTES.HOME} className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-500">Dịch vụ & Đặc quyền</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-900 font-bold">Đăng Ký Lái Thử Xe Sang</span>
        </nav>

        {/* Cold Luxury Architectural Hero Section (Viewpoint Stable, Zero AI Slop) */}
        <div className="p-1 rounded-[10px] bg-slate-900 shadow-2xl">
          <div className="rounded-[8px] overflow-hidden bg-[#070b14] text-white p-7 sm:p-10 lg:p-12 relative border border-white/10">
            {/* Luminous Environmental Backlight */}
            <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Headline & Editorial Copy */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>TRẢI NGHIỆM THỰC TẾ ĐẲNG CẤP THƯỢNG LƯU</span>
                </div>

                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12]">
                  Cầm Lái Kiệt Tác, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                    Cảm Nhận Mãnh Lực Đích Thực
                  </span>
                </h1>

                <p className="text-slate-300/95 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
                  Trực tiếp trải nghiệm hiệu năng các siêu phẩm Porsche, Mercedes-Benz, BMW, Lexus. Lái thử tại showroom hoặc giao xe riêng tư tận nơi.
                </p>

                {/* Telemetry Strip */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-cyan-400" />
                    <span>100% Miễn phí không chi phí ẩn</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-cyan-400" />
                    <span>Bảo hiểm hành trình trọn gói</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap size={15} className="text-cyan-400" />
                    <span>Kỹ sư trưởng đồng hành riêng</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Active Car Spotlight Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[16/10] rounded-[10px] overflow-hidden border border-white/15 shadow-2xl bg-slate-900 group">
                  <img
                    src={activeCar.image}
                    alt={activeCar.model}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Spotlight Floating Pill */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[8px] bg-slate-950/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block">
                        XE LÁI THỬ SẴN SÀNG
                      </span>
                      <div className="font-display font-extrabold text-xs sm:text-sm text-white truncate">
                        {activeCar.model}
                      </div>
                    </div>
                    <span className="font-display font-black text-xs sm:text-sm text-emerald-400 shrink-0">
                      {activeCar.power}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Guarantees Strip (Double-Bezel Architecture) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm">
            <div className="p-3.5 rounded-[8px] bg-slate-50/70 border border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Gift size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">100% Miễn Phí</div>
                <div className="text-[10px] text-slate-500 truncate">Không phát sinh chi phí</div>
              </div>
            </div>
          </div>

          <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm">
            <div className="p-3.5 rounded-[8px] bg-slate-50/70 border border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <UserCheck size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Kỹ Sư Đi Kèm</div>
                <div className="text-[10px] text-slate-500 truncate">Hướng dẫn chế độ lái ADAS</div>
              </div>
            </div>
          </div>

          <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm">
            <div className="p-3.5 rounded-[8px] bg-slate-50/70 border border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-slate-900 text-white flex items-center justify-center shrink-0">
                <MapPin size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Linh Hoạt Địa Điểm</div>
                <div className="text-[10px] text-slate-500 truncate">Tại Showroom hoặc tận nhà</div>
              </div>
            </div>
          </div>

          <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm">
            <div className="p-3.5 rounded-[8px] bg-slate-50/70 border border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-cyan-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Bảo Hiểm Toàn Diện</div>
                <div className="text-[10px] text-slate-500 truncate">Bảo hiểm 100% lộ trình</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Asymmetric Grid: Booking Form (7 cols) + Vehicle Telemetry Showcase (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CỘT TRÁI (7 COLS): Dispatch Console */}
          <div className="lg:col-span-7 p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-xl">
            <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-6 border border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NHÓM 1: CHỌN MẪU XE */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <span className="w-6 h-6 rounded-[6px] bg-slate-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                      01
                    </span>
                    <h2 className="font-display font-black text-sm sm:text-base text-slate-900">
                      Chọn Mẫu Xe Trải Nghiệm
                    </h2>
                  </div>

                  {/* Brand Filter Buttons */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Thương hiệu:</div>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {['Tất cả', 'Porsche', 'Mercedes-Benz', 'BMW', 'Audi', 'VinFast', 'Lexus'].map((brand) => (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => setSelectedBrand(brand)}
                          className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                            selectedBrand === brand
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Powertrain Filter Chips */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { id: 'all', label: 'Tất cả động cơ' },
                      { id: 'ev', label: 'Xe điện EV (800V)' },
                      { id: 'gas', label: 'Xăng thể thao' },
                      { id: 'hybrid', label: 'Mild-Hybrid' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPowertrain(p.id as any)}
                        className={`px-3 py-1 rounded-[6px] text-xs font-medium border transition-all cursor-pointer ${
                          selectedPowertrain === p.id
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Vehicle Radio Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {filteredCars.map((car) => {
                      const isSelected = selectedCarId === car.id;
                      return (
                        <div
                          key={car.id}
                          onClick={() => setSelectedCarId(car.id)}
                          className={`p-2.5 rounded-[10px] border transition-all cursor-pointer flex gap-3 items-center ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600/30'
                              : 'border-slate-200/90 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <img
                            src={car.image}
                            alt={car.model}
                            className="w-18 h-14 rounded-[8px] object-cover bg-slate-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                                {car.brand}
                              </span>
                              {isSelected && (
                                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                  <Check size={10} />
                                </span>
                              )}
                            </div>
                            <h3 className="font-display font-extrabold text-xs text-slate-900 truncate">
                              {car.model}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                              <span>{car.power}</span>
                              <span>•</span>
                              <span>{car.acceleration}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* NHÓM 2: CHỌN ĐỊA ĐIỂM & THỜI GIAN */}
                <div className="space-y-3.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <span className="w-6 h-6 rounded-[6px] bg-slate-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                      02
                    </span>
                    <h2 className="font-display font-black text-sm sm:text-base text-slate-900">
                      Chọn Địa Điểm & Thời Gian
                    </h2>
                  </div>

                  {/* Delivery Mode Toggle */}
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-[10px] bg-slate-100/90 border border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('showroom')}
                      className={`py-2 px-3 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                        deliveryMode === 'showroom'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Tại Showroom CarShop
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('home')}
                      className={`py-2 px-3 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                        deliveryMode === 'home'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Giao Xe Lái Thử Tận Nhà
                    </button>
                  </div>

                  {/* Showroom vs Home */}
                  {deliveryMode === 'showroom' ? (
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Chọn Showroom gần bạn:
                      </label>
                      <div className="space-y-1.5">
                        {SHOWROOMS.map((sr) => (
                          <label
                            key={sr.id}
                            className={`flex items-start gap-3 p-2.5 rounded-[8px] border transition-all cursor-pointer ${
                              selectedShowroom === sr.id
                                ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600/30'
                                : 'border-slate-200/90 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="showroom"
                              checked={selectedShowroom === sr.id}
                              onChange={() => setSelectedShowroom(sr.id)}
                              className="mt-1 text-blue-600"
                            />
                            <div className="text-xs">
                              <div className="font-bold text-slate-900">{sr.name}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">{sr.address}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Địa chỉ giao xe tận nơi (Tại nhà riêng hoặc cơ quan):
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Biệt thự The Harmony, Vinhomes Riverside, Long Biên, Hà Nội"
                        value={homeAddress}
                        onChange={(e) => setHomeAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  )}

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Ngày hẹn lái thử:
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Khung giờ ưu tiên:
                      </label>
                      <select
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 outline-none cursor-pointer"
                      >
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* NHÓM 3: THÔNG TIN KHÁCH HÀNG */}
                <div className="space-y-3.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <span className="w-6 h-6 rounded-[6px] bg-slate-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                      03
                    </span>
                    <h2 className="font-display font-black text-sm sm:text-base text-slate-900">
                      Thông Tin Người Cầm Lái
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700">
                        Họ và tên quý khách <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Trần Đình Khang"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-700">
                        Số điện thoại liên hệ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0988 ••• •••"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Driving License Checkbox */}
                  <label className="flex items-center gap-2.5 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasLicense}
                      onChange={(e) => setHasLicense(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                    />
                    <span className="text-xs text-slate-700 font-medium">
                      Tôi xác nhận đã có giấy phép lái xe ô tô hạng B1/B2 hợp lệ trên 1 năm.
                    </span>
                  </label>
                </div>

                {/* Button-in-Button CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-2.5 pl-6 pr-3 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-between shadow-lg shadow-blue-500/25 cursor-pointer disabled:opacity-50"
                  >
                    <span className="font-extrabold tracking-wide">
                      {isSubmitting ? 'Đang Xử Lý Hồ Sơ...' : 'Xác Nhận Đặt Lịch Lái Thử Ngay'}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                      <ArrowRight size={15} className="text-white" />
                    </span>
                  </button>
                  <div className="flex items-center gap-2 justify-center text-[11px] text-slate-500 pt-2">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    <span>CarShop bảo mật 100% danh tính và phản hồi xác nhận trong 15 phút.</span>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* CỘT PHẢI (5 COLS): Telemetry Showcase, Quy Trình 4 Bước & Hỗ Trợ */}
          <div className="lg:col-span-5 space-y-6">
            {/* THẺ SHOWCASE XE ĐANG CHỌN (Double-Bezel Architecture) */}
            <div className="p-1 rounded-[10px] bg-slate-900 shadow-xl">
              <div className="bg-[#070b14] text-white rounded-[8px] p-5 space-y-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                    MẪU XE BẠN ĐANG CHỌN
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    Sẵn xe lái thử
                  </span>
                </div>

                <div className="relative aspect-[16/10] rounded-[8px] overflow-hidden bg-slate-900 border border-white/10">
                  <img
                    src={activeCar.image}
                    alt={activeCar.model}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-white/10">
                    {activeCar.powertrainLabel}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-black text-base text-white truncate">
                    {activeCar.model}
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                    <div className="p-2 rounded-[6px] bg-white/5 border border-white/10">
                      <div className="text-[10px] text-slate-400">Công suất</div>
                      <div className="font-bold text-white mt-0.5 font-mono">{activeCar.power}</div>
                    </div>
                    <div className="p-2 rounded-[6px] bg-white/5 border border-white/10">
                      <div className="text-[10px] text-slate-400">Tăng tốc</div>
                      <div className="font-bold text-cyan-300 mt-0.5 font-mono">{activeCar.acceleration}</div>
                    </div>
                    <div className="p-2 rounded-[6px] bg-white/5 border border-white/10">
                      <div className="text-[10px] text-slate-400">Màu ngoại thất</div>
                      <div className="font-bold text-white mt-0.5 truncate">{activeCar.color}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QUY TRÌNH 4 BƯỚC CHUẨN LOUNGE */}
            <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-xl">
              <div className="bg-white rounded-[8px] p-5 space-y-4 border border-slate-100">
                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                    QUY TRÌNH TIÊU CHUẨN 5 SAO
                  </span>
                  <h3 className="font-display font-black text-base text-slate-900">
                    4 Bước Đón Tiếp Chuyên Biệt
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      step: '01',
                      title: 'Khởi Tạo Lịch Trực Tuyến',
                      desc: 'Chọn mẫu xe, địa điểm và thời gian. Chuyên viên gọi xác nhận trong 15 phút.',
                    },
                    {
                      step: '02',
                      title: 'Đón Tiếp Tại VIP Lounge',
                      desc: 'Thưởng thức cà phê đặc sản, nghe phổ biến tính năng vận hành và lộ trình an toàn.',
                    },
                    {
                      step: '03',
                      title: 'Trải Nghiệm Cung Đường Độc Quyền',
                      desc: 'Thử nghiệm khả năng tăng tốc, cách âm, phanh khẩn cấp và các chế độ lái thể thao.',
                    },
                    {
                      step: '04',
                      title: 'Quà Lưu Niệm & Báo Giá Ưu Đãi',
                      desc: 'Nhận quà tặng chính hãng độc quyền và bảng dự toán tài chính lăn bánh tối ưu.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-[6px] bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {item.step}
                      </span>
                      <div className="space-y-0.5 text-xs">
                        <div className="font-bold text-slate-900">{item.title}</div>
                        <div className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* HỘP HOTLINE ƯU TIÊN 24/7 */}
            <div className="p-1 rounded-[10px] bg-slate-950 shadow-xl">
              <div className="rounded-[8px] bg-[#070b14] p-5 text-white space-y-3 border border-white/10">
                <div className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                  CẦN XẾP LỊCH LÁI THỬ GẤP TRONG NGÀY?
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Đội ngũ cố vấn dịch vụ luôn túc trực hỗ trợ điều phối xe cứu hộ chuyên dụng giao xe lái thử đến tận địa chỉ của quý khách.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="tel:18006868"
                    className="py-2 px-3 rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Phone size={13} />
                    <span>1800 6868</span>
                  </a>
                  <a
                    href="https://zalo.me"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 rounded-[8px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/15 transition-all cursor-pointer"
                  >
                    <MessageCircle size={13} className="text-cyan-400" />
                    <span>Zalo VIP 24/7</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* CONFIRMATION SUCCESS MODAL (Double-Bezel Architecture) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="p-1 rounded-[10px] bg-white shadow-2xl max-w-lg w-full border border-slate-200">
            <div className="bg-white rounded-[8px] p-6 sm:p-8 space-y-5 border border-slate-100 relative">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-[6px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-[10px] bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={32} />
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                    ĐẶT LỊCH THÀNH CÔNG
                  </span>
                  <h3 className="font-display font-black text-xl text-slate-900 mt-1">
                    Đăng Ký Lái Thử Đã Được Tiếp Nhận
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Chuyên viên CarShop sẽ liên hệ với quý khách qua số <strong className="text-slate-900">{phone}</strong> trong vòng 15 phút để chuẩn bị xe sạch sẽ và gửi lộ trình đón tiếp.
                </p>
              </div>

              {/* Summary Ticket */}
              <div className="p-4 rounded-[8px] bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Mã đặt hẹn:</span>
                  <span className="font-mono font-bold text-blue-600">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mẫu xe:</span>
                  <span className="font-bold text-slate-900">{activeCar.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hình thức:</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryMode === 'showroom' ? 'Tại Showroom CarShop' : 'Giao xe tận nhà riêng'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Thời gian hẹn:</span>
                  <span className="font-bold text-slate-900">{selectedTimeSlot} • {selectedDate}</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    alert('Lịch hẹn đã được thêm vào Calendar của quý khách!');
                    setShowConfirmModal(false);
                  }}
                  className="w-full py-2.5 rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  Thêm Lịch Hẹn Vào Google / Apple Calendar
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full py-2 rounded-[8px] border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                >
                  Đóng Cửa Sổ Này
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDrivePage;
