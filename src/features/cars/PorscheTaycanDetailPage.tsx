import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  Gauge,
  BatteryCharging,
  Compass,
  Calendar,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  FileText,
  Download,
  CheckCircle2,
  Sliders,
  Sparkles,
  Camera,
  Play,
  RotateCcw,
  Award,
  ChevronDown,
  Info,
  Car,
  Volume2,
  Eye,
  Layers,
  Fuel,
  Share2,
  Heart,
  X,
  UserCheck
} from 'lucide-react';
import { Navbar } from '../home/components/Navbar';
import { Footer } from '../home/components/Footer';
import { ROUTES } from '../../constants';

// Gallery Images
const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'Góc 3/4 Đầu Xe - Xanh Gentian Blue Ánh Kim',
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&auto=format&fit=crop&q=75',
    tag: 'Ngoại thất 3/4'
  },
  {
    id: 2,
    title: 'Đuôi Xe Cross Turismo & Đèn LED Liền Mạch',
    url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400&auto=format&fit=crop&q=75',
    tag: 'Đuôi xe thể thao'
  },
  {
    id: 3,
    title: 'Khoang Lái Màn Hình Kỹ Thuật Số & Vô Lăng GT Sports',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=75',
    tag: 'Khoang lái kỹ thuật số'
  },
  {
    id: 4,
    title: 'Ghế Bọc Da Cao Cấp Hai Tông Màu Đen - Be Chalk',
    url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&auto=format&fit=crop&q=75',
    tag: 'Nội thất da Chalk'
  },
  {
    id: 5,
    title: 'Mâm Xe 20-inch Offroad Design & Cùm Phanh Thể Thao',
    url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=75',
    tag: 'Mâm 20-inch Cross Turismo'
  },
  {
    id: 6,
    title: 'Cụm Đèn Matrix Design PDLS+ & Cảm Biến Radar ADAS',
    url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600&auto=format&fit=crop&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&auto=format&fit=crop&q=75',
    tag: 'Đèn Matrix LED'
  },
];

// Related luxury vehicles
const RELATED_VEHICLES = [
  {
    id: 'audi-etron-gt',
    brand: 'Audi',
    model: 'Audi e-tron GT Quattro',
    year: 2023,
    odo: '5,200 km',
    price: '4.650.000.000 VNĐ',
    monthly: '36.8 Tr/tháng',
    power: '530 HP',
    range: '488 km',
    acceleration: '4.1s',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80',
    tag: 'CÙNG PHÂN KHÚC'
  },
  {
    id: 'porsche-panamera-4',
    brand: 'Porsche',
    model: 'Porsche Panamera 4 Executive',
    year: 2022,
    odo: '12,000 km',
    price: '5.150.000.000 VNĐ',
    monthly: '41.2 Tr/tháng',
    power: '330 HP',
    range: 'Xăng 2.9L',
    acceleration: '5.4s',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80',
    tag: 'SEDAN THƯƠNG GIA'
  },
  {
    id: 'mercedes-eqe-53',
    brand: 'Mercedes-AMG',
    model: 'Mercedes-AMG EQE 53 4MATIC+',
    year: 2023,
    odo: '4,000 km',
    price: '4.390.000.000 VNĐ',
    monthly: '34.9 Tr/tháng',
    power: '626 HP',
    range: '518 km',
    acceleration: '3.5s',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=80',
    tag: 'HIỆU SUẤT CAO'
  },
  {
    id: 'bmw-i4-m50',
    brand: 'BMW',
    model: 'BMW i4 M50 Gran Coupe',
    year: 2023,
    odo: '7,800 km',
    price: '3.890.000.000 VNĐ',
    monthly: '30.5 Tr/tháng',
    power: '544 HP',
    range: '510 km',
    acceleration: '3.9s',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80',
    tag: 'THỂ THAO ĐIỆN'
  }
];

export const PorscheTaycanDetailPage: React.FC = () => {
  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [show360Modal, setShow360Modal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Inspection tabs state
  const [activeInspectionTab, setActiveInspectionTab] = useState<number>(0);

  // Loan Calculator state
  const carPrice = 4850000000; // 4.85 tỷ
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30%
  const [loanMonths, setLoanMonths] = useState<number>(60); // 5 năm
  const interestRateYear = 0.069; // 6.9%/năm

  // Dynamic calculations
  const downPaymentAmount = Math.round(carPrice * (downPaymentPercent / 100));
  const loanAmount = carPrice - downPaymentAmount;
  const monthlyPrincipal = Math.round(loanAmount / loanMonths);
  const monthlyInterestFirst = Math.round((loanAmount * (interestRateYear / 12)));
  const estimatedMonthlyTotal = monthlyPrincipal + monthlyInterestFirst;

  // Format currency helper
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  // Test drive booking form state
  const [bookingData, setBookingData] = useState({
    fullName: '',
    phone: '',
    address: 'Hà Nội',
    date: '2026-09-25',
    timeSlot: '09:00 - 11:00',
    note: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Inspection checklist data
  const inspectionGroups = [
    {
      id: 0,
      title: '1. Khung gầm & Ngoại thất',
      passedCount: 48,
      totalCount: 48,
      items: [
        'Khung gầm nguyên bản, kết cấu dầm chính & dầm phụ không biến dạng',
        'Các mối hàn robot nguyên bản nhà máy Porsche Leipzig, Đức',
        'Nắp capo trước & cốp sau hoạt động êm ái, khe hở mép vỏ chuẩn xác',
        'Hệ thống kính cách âm, kính chắn gió nguyên bản không nứt vỡ',
        'Cản trước, cản sau và gói ốp Offroad Design không trầy xước nứt gãy',
        'Sơn xe nguyên bản Gentian Blue, độ dày sơn đồng đều từ 110 - 130 microns',
        'Hệ thống đèn pha Matrix LED và đèn hậu không hấp hơi ẩm'
      ]
    },
    {
      id: 1,
      title: '2. Động cơ & Hệ thống truyền động',
      passedCount: 42,
      totalCount: 42,
      items: [
        'Hai mô-tơ điện đồng bộ nam châm vĩnh cửu (PSM) hoạt động hoàn hảo',
        'Hộp số tự động thể thao 2 cấp trục sau chuyển số êm mượt',
        'Bộ vi sai chống trượt điện tử Porsche Torque Vectoring Plus (PTV Plus)',
        'Hệ dẫn động 4 bánh toàn thời gian AWD kiểm soát lực kéo tức thì',
        'Hệ thống dầu bôi trơn và dung dịch làm mát mô-tơ đạt chỉ số chuẩn',
        'Không có mã lỗi OBD-II trong bộ điều khiển trung tâm DME/MCU'
      ]
    },
    {
      id: 2,
      title: '3. Hệ thống điện & Pin Cao áp 800V',
      passedCount: 44,
      totalCount: 44,
      items: [
        'Pin Performance Battery Plus 93.4 kWh sức khỏe pin (SOH) đạt 98.6%',
        'Hệ thống sạc nhanh DC 800V đạt công suất tiếp nhận đỉnh 270 kW',
        'Cổng sạc điện hai bên hông xe đóng mở điện mượt mà, không kẹt',
        'Bộ biến tần Inverter điều khiển biến đổi điện xoay chiều hoạt động tối ưu',
        'Hệ thống quản lý nhiệt thông minh làm mát pin bằng chất lỏng tuần hoàn',
        'Cách điện an toàn cao áp đạt chuẩn tuyệt đối theo quy chuẩn TÜV SÜD'
      ]
    },
    {
      id: 3,
      title: '4. Khoang lái, Nội thất & Tiện nghi',
      passedCount: 42,
      totalCount: 42,
      items: [
        'Da nội thất Chalk / Black tự nhiên cao cấp không sờn rách, thơm hương da mới',
        'Màn hình cong trung tâm 16.8 inch và màn hình phụ hành khách hiển thị sắc nét',
        'Hệ thống treo khí nén thích ứng PASM nâng hạ gầm 5 cấp độ tức thì',
        'Hệ thống âm thanh Burmester 3D High-End 21 loa không rè, âm sắc chuẩn studio',
        'Điều hòa tự động 4 vùng độc lập, bộ lọc ion hóa không khí PM2.5',
        'Toàn bộ túi khí an toàn và hệ thống căng đai chủ động nguyên bản'
      ]
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setShowTestDriveModal(false);
      alert('Đăng ký lái thử thành công! Chuyên viên Nguyễn Đức Thắng sẽ liên hệ xác nhận trong vòng 15 phút.');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#0f172a] font-sans selection:bg-[#0066ff] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Breadcrumbs & Share/Favorite Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-slate-200">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to={ROUTES.HOME} className="hover:text-[#0066ff] transition-colors font-medium">
              Trang chủ
            </Link>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <Link to="/#inventory" className="hover:text-[#0066ff] transition-colors font-medium">
              Mua xe
            </Link>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <span className="hover:text-[#0066ff] transition-colors font-medium cursor-pointer">
              Porsche
            </span>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
              Porsche Taycan 4S Cross Turismo
            </span>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                isLiked
                  ? 'border-rose-300 bg-rose-50 text-rose-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <Heart size={16} className={isLiked ? 'fill-rose-600 text-rose-600' : 'text-slate-500'} />
              <span>{isLiked ? 'Đã lưu' : 'Lưu tin'}</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Đã sao chép liên kết chi tiết xe vào clipboard!');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-slate-300 text-xs sm:text-sm font-medium transition-all"
            >
              <Share2 size={16} className="text-slate-500" />
              <span>Chia sẻ</span>
            </button>
          </div>
        </div>

        {/* 2-Column Main Section: Gallery + Specs (Left 8 Cols) | Sticky Action Panel (Right 4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 8 COLUMNS: Gallery, Telemetry, Inspection, Features, Loan Calculator */}
          <div className="lg:col-span-8 space-y-10">
            {/* 2. Hero / Gallery Showcase */}
            <div className="space-y-4">
              {/* Main Large Visual Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[16/10] sm:aspect-[16/9] shadow-md border border-slate-200 group">
                <img
                  src={GALLERY_IMAGES[activeImageIndex].url}
                  alt={GALLERY_IMAGES[activeImageIndex].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlays for Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 pointer-events-none" />

                {/* Top Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold tracking-wide shadow-sm">
                      <ShieldCheck size={14} className="text-white" />
                      Xe kiểm định 176 điểm chuẩn Đức
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold tracking-wide shadow-sm">
                      <CheckCircle2 size={14} className="text-white" />
                      Xe sẵn sàng giao ngay
                    </span>
                  </div>

                  {/* Photo Index Pill */}
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white/90 text-xs font-medium border border-white/20">
                    {activeImageIndex + 1} / {GALLERY_IMAGES.length} Ảnh 4K
                  </span>
                </div>

                {/* Bottom Overlay Info & Quick Media Actions */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
                      {GALLERY_IMAGES[activeImageIndex].tag}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white drop-shadow-sm">
                      {GALLERY_IMAGES[activeImageIndex].title}
                    </h3>
                  </div>

                  {/* Action Buttons: 360 & Video Walkthrough */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShow360Modal(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/90 hover:bg-white text-slate-900 text-xs font-bold shadow-md transition-all cursor-pointer backdrop-blur-md"
                    >
                      <RotateCcw size={14} className="text-[#0066ff]" />
                      <span>Xem ảnh 360°</span>
                    </button>
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0066ff] hover:bg-[#0050cb] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                    >
                      <Play size={14} className="fill-current text-white" />
                      <span>Video thực tế</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Thumbnails Strip */}
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {GALLERY_IMAGES.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#0066ff] ring-2 ring-[#0066ff]/20 scale-102 shadow-sm'
                        : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.thumbnail}
                      alt={img.tag}
                      className="w-full h-full object-cover"
                    />
                    {activeImageIndex === idx && (
                      <div className="absolute inset-0 bg-[#0066ff]/10" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Bảng thông số kỹ thuật cốt lõi (Key Specifications Grid & Performance Gauges) */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                    HIỆU NĂNG THỂ THAO THUẦN CHẤT PORSCHE
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                    Thông Số Kỹ Thuật Cốt Lõi
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-[#0066ff] text-xs font-semibold">
                  <Zap size={14} />
                  <span>Nền tảng điện áp 800V cao cấp</span>
                </div>
              </div>

              {/* Key Specs Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Hệ dẫn động / Động cơ</div>
                  <div className="font-display font-bold text-base sm:text-lg text-slate-900">Dual-Motor AWD</div>
                  <div className="text-xs text-slate-600">Dẫn động 4 bánh toàn thời gian</div>
                </div>

                <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Công suất Overboost</div>
                  <div className="font-display font-bold text-base sm:text-lg text-slate-900">530 Mã lực (HP)</div>
                  <div className="text-xs text-slate-600">Mô-men xoắn 650 Nm</div>
                </div>

                <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Tăng tốc 0 - 100 km/h</div>
                  <div className="font-display font-bold text-base sm:text-lg text-[#0066ff]">3.9 Giây</div>
                  <div className="text-xs text-slate-600">Với Launch Control</div>
                </div>

                <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Dung lượng Pin</div>
                  <div className="font-display font-bold text-base sm:text-lg text-slate-900">93.4 kWh</div>
                  <div className="text-xs text-slate-600">Performance Battery Plus</div>
                </div>
              </div>

              {/* Spec Comparison Gauges (Product-Specific horizontal progress rails) */}
              <div className="space-y-4 pt-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Chỉ số vận hành thực tế so với phân khúc
                </div>

                {/* Gauge 1: 0 - 100 km/h */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-700">Khả năng bứt tốc (0-100 km/h)</span>
                    <span className="font-bold text-[#0066ff] font-display">3.9 giây (Nhanh vượt trội)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#0066ff] to-[#0284c7] w-[92%]" />
                  </div>
                </div>

                {/* Gauge 2: WLTP Range */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-700">Quãng đường di chuyển / 1 lần sạc đầy (WLTP)</span>
                    <span className="font-bold text-emerald-600 font-display">450 km (SOH Pin 98.6%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[84%]" />
                  </div>
                </div>

                {/* Gauge 3: 800V Ultra Fast Charge */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-700">Tốc độ sạc nhanh DC 800V (5% - 80%)</span>
                    <span className="font-bold text-[#0066ff] font-display">22.5 phút (Công suất max 270kW)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#0066ff] to-cyan-500 w-[95%]" />
                  </div>
                </div>
              </div>

              {/* Color & Material Spec Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#f8fafc]">
                  <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-[#1a365d] shrink-0" />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Màu sắc ngoại thất</div>
                    <div className="text-sm font-bold text-slate-800">Xanh Gentian Blue Ánh Kim</div>
                    <div className="text-xs text-slate-500">Mã màu: 1A1A / Lớp phủ bóng Ceramic</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#f8fafc]">
                  <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-gradient-to-br from-[#1e293b] via-[#475569] to-[#e2e8f0] shrink-0" />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Chất liệu & Màu nội thất</div>
                    <div className="text-sm font-bold text-slate-800">Da Tự Nhiên Hai Tông Đen - Be Chalk</div>
                    <div className="text-xs text-slate-500">Tùy chọn gói nội thất mở rộng Olea Club</div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Biên bản kiểm định chất lượng 176 điểm độc quyền CarShop */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                      <Award size={18} />
                    </span>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      CHỨNG NHẬN ĐỘC QUYỀN CARSHOP CERTIFIED
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                    Biên Bản Kiểm Định Chất Lượng 176 Điểm
                  </h2>
                </div>

                <button
                  onClick={() => setShowPdfModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#0066ff] text-[#0066ff] hover:bg-blue-50 text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  <Download size={16} />
                  <span>Tải biên bản PDF (Có dấu mộc)</span>
                </button>
              </div>

              {/* 4 Guarantees Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center space-y-1">
                  <CheckCircle2 size={18} className="text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-emerald-900">100% Đạt Chuẩn</div>
                  <div className="text-[11px] text-emerald-700 leading-tight">Đủ điều kiện bảo hành 2 năm</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center space-y-1">
                  <ShieldCheck size={18} className="text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-emerald-900">Không Đâm Đụng</div>
                  <div className="text-[11px] text-emerald-700 leading-tight">Khung gầm và dầm xe nguyên vẹn</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center space-y-1">
                  <CheckCircle2 size={18} className="text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-emerald-900">Không Thủy Kích</div>
                  <div className="text-[11px] text-emerald-700 leading-tight">Khoang máy & pin chưa từng ngập</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center space-y-1">
                  <CheckCircle2 size={18} className="text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-emerald-900">Pin & Máy Nguyên Bản</div>
                  <div className="text-[11px] text-emerald-700 leading-tight">Mã phụ tùng trùng khớp 100%</div>
                </div>
              </div>

              {/* 4 Checklist Group Tabs */}
              <div className="space-y-4 pt-2">
                <div className="flex border-b border-slate-200 overflow-x-auto gap-2 sm:gap-4">
                  {inspectionGroups.map((group, idx) => (
                    <button
                      key={group.id}
                      onClick={() => setActiveInspectionTab(idx)}
                      className={`pb-3 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer relative ${
                        activeInspectionTab === idx
                          ? 'text-[#0066ff] border-b-2 border-[#0066ff]'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <span>{group.title}</span>
                      <span className="ml-1.5 px-2 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-600">
                        {group.passedCount}/{group.totalCount}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Checklist items in active tab */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {inspectionGroups[activeInspectionTab].items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f8fafc] border border-slate-100 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Trang bị tiện nghi & Công nghệ nổi bật */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                  TIỆN NGHI HẠNG THƯƠNG GIA
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                  Trang Bị Tiện Nghi & Công Nghệ Nổi Bật
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 bg-[#f8fafc]">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-[#0066ff] shrink-0">
                    <Sliders size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">Treo Khí Nén Thích Ứng PASM</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Porsche Active Suspension Management tích hợp tính năng Smart Lift tự động nâng hạ gầm theo địa hình và tọa độ GPS.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 bg-[#f8fafc]">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-[#0066ff] shrink-0">
                    <Volume2 size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">Dàn Âm Thanh Burmester 3D High-End</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      21 loa vòm độc lập với công suất 1,455 Watt kèm loa siêu trầm thụ động 400W, công nghệ xử lý âm thanh 3D sống động.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 bg-[#f8fafc]">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-[#0066ff] shrink-0">
                    <Eye size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">Màn Hình Phụ Cho Ghế Hành Khách</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Màn hình cảm ứng 10.9 inch riêng biệt phía ghế phụ cho phép điều khiển bản đồ, giải trí media và thông số xe độc lập.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 bg-[#f8fafc]">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-[#0066ff] shrink-0">
                    <Camera size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">Camera 360 3D & Giữ Làn Chủ Động</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Gói hỗ trợ lái chủ động Porsche InnoDrive: Adaptive Cruise Control bám đuôi tự động, giữ làn đường và đỗ xe thông minh.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 bg-[#f8fafc]">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-[#0066ff] shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">Cửa Sổ Trời Toàn Cảnh Panorama</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Trần kính cố định siêu rộng tráng phủ nhiều lớp cách nhiệt và ngăn chặn 99% bức xạ tia UV/hồng ngoại bảo vệ khoang lái.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 bg-[#f8fafc]">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-[#0066ff] shrink-0">
                    <Zap size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">Đèn Matrix LED Design PDLS+</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      84 bóng LED điều khiển độc lập tự động tạo luồng sáng vòng quanh xe phía trước, chống chói mắt người đối diện.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Công cụ dự toán trả góp chi tiết cho chiếc xe này (Interactive Loan Calculator) */}
            <section id="installment-calculator" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                  DỰ TOÁN TÀI CHÍNH TỐI ƯU
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                  Công Cụ Dự Toán Trả Góp Xe Porsche Taycan
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Hợp tác cùng 12 ngân hàng đối tác chiến lược: Lãi suất ưu đãi chỉ từ 6.9%/năm, giải ngân trong 24 giờ.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Sliders & Controls */}
                <div className="md:col-span-7 space-y-6">
                  {/* Down payment */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="font-semibold text-slate-700">Tỷ lệ trả trước:</span>
                      <span className="font-bold text-[#0066ff] font-display text-base">
                        {downPaymentPercent}% ({formatVND(downPaymentAmount)})
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="70"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>20% (Tối thiểu)</span>
                      <span>50%</span>
                      <span>70% (Tối đa)</span>
                    </div>
                  </div>

                  {/* Loan Duration */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="font-semibold text-slate-700">Thời gian vay:</span>
                      <span className="font-bold text-[#0066ff] font-display text-base">
                        {loanMonths} tháng ({loanMonths / 12} năm)
                      </span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                      {[12, 24, 36, 48, 60, 72, 84].map((m) => (
                        <button
                          key={m}
                          onClick={() => setLoanMonths(m)}
                          className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            loanMonths === m
                              ? 'bg-[#0066ff] text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {m}T
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interest rate badge */}
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900">
                    <Info size={16} className="text-[#0066ff] shrink-0" />
                    <span>
                      Áp dụng gói ưu đãi liên kết VPBank, Techcombank, Shinhan Bank với lãi suất cố định 6.9%/năm năm đầu.
                    </span>
                  </div>
                </div>

                {/* Calculated Results Summary Card */}
                <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
                  <div className="space-y-4">
                    <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
                      KẾT QUẢ DỰ TÍNH TRẢ HÀNG THÁNG
                    </div>

                    <div>
                      <div className="text-3xl font-extrabold font-display text-white tracking-tight">
                        {new Intl.NumberFormat('vi-VN').format(estimatedMonthlyTotal)}
                        <span className="text-sm font-medium text-slate-300 ml-1">VNĐ/tháng</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        (Tính theo phương thức dư nợ giảm dần)
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Số tiền cần vay ngân hàng:</span>
                        <span className="font-semibold text-white">{formatVND(loanAmount)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Tiền gốc trả đều hàng tháng:</span>
                        <span className="font-semibold text-white">{formatVND(monthlyPrincipal)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Tiền lãi tháng cao nhất (tháng 1):</span>
                        <span className="font-semibold text-white">{formatVND(monthlyInterestFirst)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowTestDriveModal(true)}
                    className="w-full mt-6 py-3 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Tư vấn hồ sơ vay miễn phí</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT 4 COLUMNS: Sticky Action Panel & Sales Consultant Profile */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            {/* Main Sticky Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-6">
              {/* Header Title & Tags */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-[#0066ff]">
                    Năm 2023
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                    ODO: 6,500 km
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                    Biển Hà Nội
                  </span>
                </div>

                <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  Porsche Taycan 4S Cross Turismo
                </h1>

                <p className="text-xs text-slate-500">
                  Phiên bản gầm cao thể thao All-Electric Wagon cao cấp, nhập khẩu nguyên chiếc Đức.
                </p>
              </div>

              {/* Price & Monthly Tag */}
              <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-100 space-y-2">
                <div className="text-xs text-slate-500 font-medium">Giá niêm yết xe kiểm định:</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#0066ff]">
                    4.850.000.000 VNĐ
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-200/60">
                  <span>Ước tính trả góp từ:</span>
                  <span className="font-bold text-emerald-600">38.500.000 VNĐ/tháng</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  * Hỗ trợ vay tối đa 85% giá trị xe, hồ sơ duyệt nhanh trong ngày.
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowTestDriveModal(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar size={18} />
                  <span>Đăng ký lái thử tại nhà</span>
                </button>

                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText size={18} />
                  <span>Nhận báo giá lăn bánh & Giữ chỗ</span>
                </button>
              </div>

              {/* Consultant Card */}
              <div className="p-4 rounded-xl border border-slate-200 bg-[#faf8ff] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                      alt="Nguyễn Đức Thắng"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#0066ff]"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-900">Nguyễn Đức Thắng</h4>
                      <UserCheck size={14} className="text-[#0066ff]" />
                    </div>
                    <p className="text-xs text-slate-500">Trưởng phòng Kinh doanh Xe Sang</p>
                    <p className="text-[11px] text-emerald-600 font-semibold">Đang trực tuyến • Phản hồi tức thì</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="tel:0988888888"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
                  >
                    <Phone size={14} />
                    <span>0988 888 888</span>
                  </a>
                  <a
                    href="https://zalo.me"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-all"
                  >
                    <MessageCircle size={14} className="text-[#0066ff]" />
                    <span>Chat Zalo</span>
                  </a>
                </div>
              </div>

              {/* 5-Star Commitment Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Miễn phí giao xe tận nhà trên toàn quốc</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Bảo hành chính hãng 2 năm hoặc 30,000 km</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Bao quay đầu & hoàn tiền 100% trong 7 ngày</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Hỗ trợ thủ tục sang tên đổi chủ trọn gói</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Xe tương đương trong cùng tầm giá (Related Vehicles) */}
        <section className="pt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                GỢI Ý TƯƠNG ĐƯƠNG
              </span>
              <h2 className="font-display text-xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Xe Cùng Phân Khúc Đang Có Sẵn
              </h2>
            </div>
            <Link
              to="/#inventory"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#0066ff] hover:text-[#0050cb] transition-colors"
            >
              <span>Xem tất cả 128 xe sang</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_VEHICLES.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={car.image}
                      alt={car.model}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-white">
                      {car.tag}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-xs font-bold text-slate-500">{car.brand} • {car.year}</div>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-[#0066ff] transition-colors">
                        {car.model}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100">{car.power}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100">{car.range}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100">{car.acceleration}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="font-display font-extrabold text-base text-slate-900">
                        {car.price}
                      </div>
                      <div className="text-xs text-slate-500">
                        Trả góp từ {car.monthly}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 hover:border-[#0066ff] hover:text-[#0066ff] text-xs font-bold transition-all text-center cursor-pointer"
                  >
                    Xem chi tiết xe này
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* MODAL 1: Đăng Ký Lái Thử Tại Nhà */}
      {showTestDriveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setShowTestDriveModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                TRẢI NGHIỆM MIỄN PHÍ TẬN NƠI
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                Đăng Ký Lái Thử Porsche Taycan 4S
              </h3>
              <p className="text-xs text-slate-500">
                Chuyên viên CarShop sẽ mang xe đến tận nhà hoặc cơ quan quý khách đúng giờ hẹn.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên của bạn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Trần Quốc Hưng"
                  value={bookingData.fullName}
                  onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Số điện thoại liên hệ *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="098x xxx xxx"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ngày dự kiến lái thử
                  </label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#0066ff] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Khung giờ phù hợp
                  </label>
                  <select
                    value={bookingData.timeSlot}
                    onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#0066ff] outline-none"
                  >
                    <option value="08:30 - 10:30">08:30 - 10:30 (Sáng)</option>
                    <option value="10:30 - 12:30">10:30 - 12:30 (Trưa)</option>
                    <option value="14:00 - 16:00">14:00 - 16:00 (Chiều)</option>
                    <option value="16:00 - 18:00">16:00 - 18:00 (Hoàng hôn)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Địa điểm nhận xe lái thử
                </label>
                <input
                  type="text"
                  placeholder="Địa chỉ nhà riêng / cơ quan của quý khách..."
                  value={bookingData.address}
                  onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-[#0066ff] outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={bookingSubmitted}
                  className="w-full py-3 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  {bookingSubmitted ? 'Đang gửi thông tin...' : 'Xác Nhận Đặt Lịch Lái Thử'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Nhận Báo Giá Lăn Bánh */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 space-y-5">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                BẢNG TÍNH LĂN BÁNH TRỌN GÓI
              </span>
              <h3 className="font-display text-xl font-bold text-slate-900 mt-1">
                Báo Giá Lăn Bánh & Giữ Chỗ Xe
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Porsche Taycan 4S Cross Turismo (2023 - ODO 6,500 km)
              </p>
            </div>

            <div className="space-y-2.5 p-4 rounded-xl bg-[#f8fafc] border border-slate-100 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Giá xe niêm yết:</span>
                <span className="font-bold text-slate-900">4.850.000.000 VNĐ</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Lệ phí trước bạ xe điện (0% theo NĐ 10):</span>
                <span>0 VNĐ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí đổi biển & sang tên xe lướt:</span>
                <span>20.000.000 VNĐ</span>
              </div>
              <div className="flex justify-between">
                <span>Bảo hiểm vật chất 2 năm:</span>
                <span>Tặng miễn phí</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-[#0066ff]">
                <span>Tổng chi phí lăn bánh:</span>
                <span>4.870.000.000 VNĐ</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  alert('Yêu cầu giữ chỗ của quý khách đã được ghi nhận. Hotline 1900 8888 sẽ liên hệ xác nhận tiền cọc giữ xe 50.000.000 VNĐ.');
                  setShowQuoteModal(false);
                }}
                className="w-full py-3 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Đặt Cọc Giữ Xe Trong 48 Giờ
              </button>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: 360 & Virtual Tour */}
      {show360Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 text-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative border border-slate-800 space-y-4">
            <button
              onClick={() => setShow360Modal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                CHẾ ĐỘ XEM TOÀN CẢNH 360°
              </span>
              <h3 className="font-display text-xl font-bold text-white mt-1">
                Porsche Taycan 4S Cross Turismo 360° Virtual Showcase
              </h3>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&auto=format&fit=crop&q=85"
                alt="360 view"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 text-center p-4">
                <RotateCcw size={48} className="text-[#0066ff] animate-spin" />
                <div className="font-bold text-base text-white">Chế độ xoay 360 độ tương tác cao cấp</div>
                <p className="text-xs text-slate-300 max-w-sm">
                  Kéo chuột hoặc vuốt ngón tay để quan sát từng góc cạnh ngoại thất xe theo chuẩn studio CarShop 3D.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShow360Modal(false)}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Video thực tế */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 text-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative border border-slate-800 space-y-4">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                VIDEO QUAY THỰC TẾ 4K
              </span>
              <h3 className="font-display text-xl font-bold text-white mt-1">
                Đánh Giá Thực Tế Porsche Taycan 4S Cross Turismo Tại CarShop Showroom
              </h3>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1600&auto=format&fit=crop&q=85"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-rose-600/90 flex items-center justify-center shadow-lg text-white">
                  <Play size={28} className="fill-current ml-1" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Thời lượng: 08:45 • Độ phân giải: 4K HDR 60fps</span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: PDF Inspection Certificate Preview */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 space-y-5">
            <button
              onClick={() => setShowPdfModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-50 text-[#0066ff]">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Biên Bản Kiểm Định Chất Lượng 176 Điểm
                </h3>
                <p className="text-xs text-slate-500">Mã hồ sơ: CS-VN-2023-PTC-0923</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span>Số khung (VIN):</span>
                <span className="font-mono font-bold text-slate-900">WP0ZZZY1ZPSA98214</span>
              </div>
              <div className="flex justify-between">
                <span>Kỹ sư trưởng kiểm định:</span>
                <span className="font-bold text-slate-900">KS. Hoàng Nam Hải (TÜV SÜD Certified)</span>
              </div>
              <div className="flex justify-between">
                <span>Ngày hoàn tất kiểm định:</span>
                <span className="font-semibold text-slate-900">20/09/2026</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Kết luận chung:</span>
                <span>176/176 HẠNG MỤC ĐẠT CHUẨN LOẠI A</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  alert('Đang tải xuống tệp PDF: Bien_Ban_Kiem_Dinh_176_Diem_Porsche_Taycan_4S.pdf');
                  setShowPdfModal(false);
                }}
                className="w-full py-3 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download size={16} />
                <span>Tải Tệp PDF Biên Bản Kiểm Định</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PorscheTaycanDetailPage;
