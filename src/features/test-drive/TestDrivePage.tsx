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
  Check
} from 'lucide-react';
import { Navbar } from '../home/components/Navbar';
import { Footer } from '../home/components/Footer';
import { ROUTES } from '../../constants';

// Car Option Interface
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
    model: 'Mercedes-Benz GLC 300 4MATIC AMG Line',
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
  }
];

// Showrooms Data
const SHOWROOMS = [
  {
    id: 'hn-vo-chi-cong',
    name: 'Showroom CarShop Hà Nội (Tây Hồ)',
    address: 'Số 68 Võ Chí Công, Q. Tây Hồ, TP. Hà Nội',
    hotline: '0988 888 888',
    hours: '08:00 - 20:00 (Thứ 2 - CN)'
  },
  {
    id: 'hn-long-bien',
    name: 'Showroom CarShop Hà Nội (Long Biên)',
    address: 'Số 1 Nguyễn Văn Linh, P. Gia Thụy, Q. Long Biên, TP. Hà Nội',
    hotline: '0988 888 889',
    hours: '08:00 - 20:00 (Thứ 2 - CN)'
  },
  {
    id: 'dn-hai-chau',
    name: 'Showroom CarShop Đà Nẵng (Hải Châu)',
    address: 'Số 186 Đường 2/9, P. Hòa Cường Bắc, Q. Hải Châu, TP. Đà Nẵng',
    hotline: '0988 888 886',
    hours: '08:00 - 19:30 (Thứ 2 - CN)'
  },
  {
    id: 'hcm-q7',
    name: 'Showroom CarShop TP.HCM (Phú Mỹ Hưng)',
    address: 'Số 801 Nguyễn Văn Linh, P. Tân Phú, Quận 7, TP. Hồ Chí Minh',
    hotline: '0988 888 885',
    hours: '08:00 - 20:30 (Thứ 2 - CN)'
  }
];

const TIME_SLOTS = [
  '09:00 - 10:30 (Sáng)',
  '11:00 - 12:30 (Trưa)',
  '14:00 - 15:30 (Chiều)',
  '16:00 - 17:30 (Hoàng hôn)',
  '18:00 - 19:30 (Tối)'
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
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#0f172a] font-sans selection:bg-[#0066ff] selection:text-white">
      {/* 1. Top Navigation Bar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* 2. Breadcrumbs & Header Tiêu Đề */}
        <div className="space-y-4">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to={ROUTES.HOME} className="hover:text-[#0066ff] transition-colors font-medium">
              Trang chủ
            </Link>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <span className="text-slate-500 font-medium">Dịch vụ & Hỗ trợ</span>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">Đăng ký lái thử xe</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#0066ff] text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              TRẢI NGHIỆM ĐỈNH CAO THỰC TẾ
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Đăng Ký Lái Thử Miễn Phí Tại Showroom & Tận Nơi
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Trực tiếp cầm lái và cảm nhận đẳng cấp của các dòng xe sang hàng đầu từ Porsche, Mercedes-Benz, BMW, Audi, VinFast. Hỗ trợ lái thử tại showroom hoặc giao xe tận nơi riêng tư theo yêu cầu.
            </p>
          </div>

          {/* 4 Cam Kết Vàng Dưới Tiêu Đề */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="p-2 rounded-xl bg-blue-50 text-[#0066ff] shrink-0">
                <Gift size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">100% Miễn Phí</div>
                <div className="text-[11px] text-slate-500">Không phát sinh bất kỳ chi phí nào</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                <UserCheck size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Chuyên Gia Đi Kèm</div>
                <div className="text-[11px] text-slate-500">Hướng dẫn tính năng & chế độ lái</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Linh Hoạt Địa Điểm</div>
                <div className="text-[11px] text-slate-500">Tại Showroom hoặc giao tận nhà</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Bảo Hiểm Toàn Diện</div>
                <div className="text-[11px] text-slate-500">Bảo hiểm hành trình đầy đủ 100%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. KHỐI CHÍNH: Layout 7:5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CỘT TRÁI (7 COLS): Form Đăng Ký Lái Thử 3 Nhóm */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* NHÓM 1: CHỌN MẪU XE MONG MUỐN TRẢI NGHIỆM */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <h2 className="font-display font-bold text-base sm:text-lg text-slate-900">
                    Chọn Mẫu Xe Bạn Muốn Trải Nghiệm
                  </h2>
                </div>

                {/* Brand Tabs */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-600">Thương hiệu xe:</div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {['Tất cả', 'Porsche', 'Mercedes-Benz', 'BMW', 'Audi', 'VinFast', 'Lexus'].map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          selectedBrand === brand
                            ? 'bg-[#0066ff] text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Powertrain Filter Chips */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-600">Loại động cơ:</div>
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'all', label: 'Tất cả' },
                      { id: 'ev', label: 'Xe điện EV (Zero Emission)' },
                      { id: 'gas', label: 'Xe xăng thể thao' },
                      { id: 'hybrid', label: 'Xe Hybrid' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPowertrain(p.id as any)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                          selectedPowertrain === p.id
                            ? 'border-[#0066ff] bg-blue-50 text-[#0066ff] font-bold'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Selection Radio Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {filteredCars.map((car) => (
                    <div
                      key={car.id}
                      onClick={() => setSelectedCarId(car.id)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex gap-3 items-center relative ${
                        selectedCarId === car.id
                          ? 'border-[#0066ff] bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <img
                        src={car.image}
                        alt={car.model}
                        className="w-20 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#0066ff] uppercase">{car.brand}</span>
                          {selectedCarId === car.id && (
                            <span className="w-4 h-4 rounded-full bg-[#0066ff] text-white flex items-center justify-center">
                              <Check size={10} />
                            </span>
                          )}
                        </div>

                        <h3 className="font-display font-bold text-xs text-slate-900 leading-tight line-clamp-1">
                          {car.model}
                        </h3>

                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span>{car.power}</span>
                          <span>•</span>
                          <span>{car.acceleration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NHÓM 2: CHỌN ĐỊA ĐIỂM & THỜI GIAN LÁI THỬ */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <h2 className="font-display font-bold text-base sm:text-lg text-slate-900">
                    Chọn Địa Điểm & Thời Gian Lái Thử
                  </h2>
                </div>

                {/* Delivery Mode Toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('showroom')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      deliveryMode === 'showroom'
                        ? 'bg-white text-[#0066ff] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Lái thử tại Hệ thống Showroom
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('home')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      deliveryMode === 'home'
                        ? 'bg-white text-[#0066ff] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Giao xe lái thử tại Nhà / Cơ quan
                  </button>
                </div>

                {/* Showroom selection or Address input */}
                {deliveryMode === 'showroom' ? (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Chọn Showroom thuận tiện nhất với bạn:
                    </label>
                    <div className="space-y-2">
                      {SHOWROOMS.map((sr) => (
                        <label
                          key={sr.id}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                            selectedShowroom === sr.id
                              ? 'border-[#0066ff] bg-blue-50/30'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="showroom"
                            value={sr.id}
                            checked={selectedShowroom === sr.id}
                            onChange={() => setSelectedShowroom(sr.id)}
                            className="mt-1 text-[#0066ff] focus:ring-[#0066ff]"
                          />
                          <div className="space-y-0.5 flex-1 text-xs">
                            <div className="font-bold text-slate-900">{sr.name}</div>
                            <div className="text-slate-600 flex items-center gap-1">
                              <MapPin size={12} className="text-[#0066ff] shrink-0" />
                              <span>{sr.address}</span>
                            </div>
                            <div className="text-[11px] text-slate-500">Giờ làm việc: {sr.hours}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                    <label className="block text-xs font-bold text-slate-800">
                      Địa chỉ nhận xe lái thử tận nơi: *
                    </label>
                    <input
                      type="text"
                      required={deliveryMode === 'home'}
                      placeholder="Nhập địa chỉ nhà riêng hoặc cơ quan của bạn..."
                      value={homeAddress}
                      onChange={(e) => setHomeAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm focus:border-[#0066ff] outline-none"
                    />
                    <p className="text-[11px] text-blue-800">
                      * Chuyên viên CarShop sẽ vận chuyển xe chuyên dụng đến đúng địa chỉ và giờ hẹn của quý khách.
                    </p>
                  </div>
                )}

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#0066ff]" />
                      <span>Ngày lái thử: *</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#0066ff] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Clock size={14} className="text-[#0066ff]" />
                      <span>Khung giờ phù hợp: *</span>
                    </label>
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#0066ff] outline-none bg-white"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* NHÓM 3: THÔNG TIN KHÁCH HÀNG & BẰNG LÁI */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <h2 className="font-display font-bold text-base sm:text-lg text-slate-900">
                    Thông Tin Khách Hàng & Bằng Lái
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Họ và tên của bạn *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Hoàng Minh Trí"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#0066ff] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Số điện thoại di động *</label>
                    <input
                      type="tel"
                      required
                      placeholder="098x xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#0066ff] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Địa chỉ Email (Nhận thư xác nhận lịch & tài liệu)</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#0066ff] outline-none"
                  />
                </div>

                {/* Driver License Checkbox */}
                <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasLicense}
                    onChange={(e) => setHasLicense(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#0066ff] focus:ring-[#0066ff]"
                  />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900">Xác nhận bằng lái xe:</span> Tôi đã có Giấy phép lái xe hạng B1/B2 hợp lệ trên 1 năm và sẽ xuất trình khi tham gia lái thử theo quy định của pháp luật.
                  </div>
                </label>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Nhu cầu tư vấn thêm hoặc trải nghiệm cụ thể (Tùy chọn)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ví dụ: Muốn thử chế độ tăng tốc Launch Control, trải nghiệm cách âm ở dải tốc 100km/h, tư vấn gói tài chính trả góp..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#0066ff] outline-none"
                  />
                </div>
              </div>

              {/* PRIMARY CTA BUTTON */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} />
                  <span>{isSubmitting ? 'Đang Xử Lý Hồ Sơ...' : 'Xác Nhận Đặt Lịch Lái Thử Ngay'}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>CarShop cam kết bảo mật tuyệt đối thông tin và liên hệ xác nhận trong vòng 15 phút.</span>
                </div>
              </div>
            </form>
          </div>

          {/* CỘT PHẢI (5 COLS): Showcase Xe, Quy Trình & Hỗ Trợ */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* THẺ SHOWCASE XE ĐANG CHỌN */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                  MẪU XE BẠN ĐANG CHỌN
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  Sẵn xe lái thử
                </span>
              </div>

              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-slate-100">
                <img
                  src={activeCar.image}
                  alt={activeCar.model}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-white">
                  {activeCar.powertrainLabel}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {activeCar.model}
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500">Công suất</div>
                    <div className="font-bold text-slate-900 mt-0.5">{activeCar.power}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500">Tăng tốc</div>
                    <div className="font-bold text-[#0066ff] mt-0.5">{activeCar.acceleration}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500">Màu xe mẫu</div>
                    <div className="font-bold text-slate-900 mt-0.5 truncate">{activeCar.color}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* QUY TRÌNH 4 BƯỚC LÁI THỬ CHUYÊN NGHIỆP */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="p-1.5 rounded-lg bg-blue-50 text-[#0066ff]">
                  <Route size={16} />
                </span>
                <h3 className="font-display font-bold text-sm text-slate-900">
                  Quy Trình Lái Thử 4 Bước Tại CarShop
                </h3>
              </div>

              <div className="space-y-3.5">
                {[
                  {
                    step: 1,
                    icon: Calendar,
                    title: 'Đặt Lịch Trực Tuyến',
                    desc: 'Chọn mẫu xe, địa điểm và thời gian. Chuyên viên CarShop gọi xác nhận trong 15 phút.'
                  },
                  {
                    step: 2,
                    icon: Coffee,
                    title: 'Đón Tiếp Tại Lounge VIP',
                    desc: 'Thưởng thức cà phê cao cấp, tư vấn viên giới thiệu thông số và cung đường lái thử an toàn.'
                  },
                  {
                    step: 3,
                    icon: Compass,
                    title: 'Trải Nghiệm Cung Đường Lái Thử',
                    desc: 'Cảm nhận gia tốc tức thì, độ ổn định thân xe, cách âm và các tính năng hỗ trợ lái ADAS.'
                  },
                  {
                    step: 4,
                    icon: Gift,
                    title: 'Quà Tặng & Tư Vấn Chính Sách',
                    desc: 'Nhận quà lưu niệm độc quyền CarShop và bảng dự toán giá lăn bánh ưu đãi.'
                  }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center font-bold text-xs shrink-0">
                      {item.step}
                    </div>
                    <div className="space-y-0.5 flex-1 text-xs">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-slate-600 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TESTIMONIALS KHÁCH HÀNG GẦN ĐÂY */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <h3 className="font-display font-bold text-sm text-slate-900">
                    Đánh Giá Khách Hàng Lái Thử
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-600">4.9 / 5.0 (2,400+ Lượt)</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                        alt="Anh Trần Quang"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="font-bold text-slate-900">Anh Trần Quang (Hà Nội)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Đã lái thử Porsche Taycan</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed italic">
                    "Trải nghiệm lái thử tại nhà cực kỳ chỉn chu. Xe được giao đúng 9h sáng, sạch bóng thơm tho. Cảm giác bứt tốc của Taycan thực sự gây nghiện!"
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                        alt="Chị Mai Lan"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="font-bold text-slate-900">Chị Mai Lan (TP.HCM)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Đã lái thử Mercedes GLC 300</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed italic">
                    "Showroom Quận 7 rất đẹp và chuyên nghiệp, có phòng chờ VIP riêng. Bạn tư vấn viên giải thích kỹ càng mọi tính năng an toàn cho người mới lái."
                  </p>
                </div>
              </div>
            </div>

            {/* HỘP HỖ TRỢ KHẨN CẤP 24/7 */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-md space-y-3">
              <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
                BẠN CẦN LÁI THỬ GẤP TRONG HÔM NAY?
              </div>
              <p className="text-xs text-slate-300">
                Liên hệ hotline đường dây nóng ưu tiên xếp lịch hoặc kết nối trực tiếp với đội ngũ chuyên gia thẩm định xe.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:18006868"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-xs transition-all"
                >
                  <Phone size={14} />
                  <span>1800 6868</span>
                </a>
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
                >
                  <MessageCircle size={14} className="text-blue-400" />
                  <span>Chat Zalo 24/7</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. PHẦN GIỚI THIỆU CUNG ĐƯỜNG LÁI THỬ & KHÔNG GIAN SHOWROOM */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
              KHÔNG GIAN TIÊU CHUẨN 5 SAO
            </span>
            <h2 className="font-display text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Không Gian Showroom & Cung Đường Trải Nghiệm Độc Quyền
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Mỗi showroom CarShop đều sở hữu phòng chờ VIP sang trọng, trạm sạc siêu nhanh 360 kW và lộ trình lái thử được cấp phép an toàn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80"
                  alt="Không gian Showroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900">
                Khu Trưng Bày Xe Sang Hiện Đại
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hệ thống ánh sáng chuẩn studio quốc tế tôn vinh từng đường nét thiết kế và màu sơn nguyên bản của xe.
              </p>
            </div>

            <div className="space-y-3 group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80"
                  alt="Phòng chờ VIP Lounge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900">
                Phòng Chờ VIP Lounge Sang Trọng
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thưởng thức đồ uống cao cấp, âm nhạc du dương trong không gian riêng tư tuyệt đối trước khi bắt đầu hành trình.
              </p>
            </div>

            <div className="space-y-3 group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80"
                  alt="Đường thử xe chuyên biệt"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900">
                Cung Đường Lái Thử Đa Địa Hình
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bao gồm đoạn đường thẳng thử gia tốc, khúc cua thử hệ thống ổn định điện tử ESP và đường gờ giảm tốc thử độ êm ái.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* CONFIRMATION SUCCESS MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 space-y-6">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  ĐẶT LỊCH THÀNH CÔNG
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Đăng Ký Lái Thử Đã Được Tiếp Nhận!
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                Chuyên viên CarShop sẽ liên hệ với quý khách qua số điện thoại <span className="font-bold text-slate-900">{phone}</span> trong vòng 15 phút để xác nhận lộ trình đón tiếp.
              </p>
            </div>

            {/* Summary Ticket */}
            <div className="p-4 rounded-2xl bg-[#faf8ff] border border-slate-200 text-xs space-y-2.5 text-slate-700">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Mã đặt hẹn:</span>
                <span className="font-mono font-bold text-[#0066ff]">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mẫu xe lái thử:</span>
                <span className="font-bold text-slate-900">{activeCar.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hình thức:</span>
                <span className="font-semibold text-slate-900">
                  {deliveryMode === 'showroom' ? 'Tại Showroom CarShop' : 'Giao xe lái thử tận nơi'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Thời gian hẹn:</span>
                <span className="font-bold text-slate-900">{selectedTimeSlot} • {selectedDate}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  alert('Lịch hẹn đã được thêm vào Calendar của quý khách!');
                  setShowConfirmModal(false);
                }}
                className="w-full py-3 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                Thêm Lịch Hẹn Vào Google / Apple Calendar
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
              >
                Về Trang Chủ CarShop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDrivePage;
