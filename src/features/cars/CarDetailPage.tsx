import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  Gauge,
  Calendar,
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
  Fuel,
  Share2,
  Heart,
  X,
  UserCheck
} from 'lucide-react';
import { Navbar } from '../home/components/Navbar';
import { Footer } from '../home/components/Footer';
import { ROUTES } from '../../constants';
import { CARS_CATALOG, CarItem } from '../../constants/carsCatalog';
import { BrandMarqueeTicker } from './components/BrandMarqueeTicker';

// Gallery dataset for luxury vehicles
const CAR_GALLERIES: Record<string, { id: number; title: string; url: string; thumbnail: string; tag: string }[]> = {
  'porsche-taycan': [
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
  ],
  'mercedes-glc300': [
    {
      id: 1,
      title: 'Góc 3/4 Đầu Xe Mercedes-Benz GLC 300 4MATIC 2024 AMG Line',
      url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&auto=format&fit=crop&q=75',
      tag: 'Ngoại thất AMG Line'
    },
    {
      id: 2,
      title: 'Đuôi Xe Thể Thao & Đèn Hậu LED 3D Siêu Mảnh',
      url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=75',
      tag: 'Đuôi xe thể thao'
    },
    {
      id: 3,
      title: 'Màn Hình Cảm Ứng Dọc MBUX 11.9 Inch & Vô Lăng D-Cut AMG',
      url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&auto=format&fit=crop&q=75',
      tag: 'Khoang lái MBUX'
    },
    {
      id: 4,
      title: 'Ghế Bọc Da Thể Thao Cao Cấp Có Tính Năng Sưởi & Nhớ Vị Trí',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&auto=format&fit=crop&q=75',
      tag: 'Ghế da thể thao'
    },
    {
      id: 5,
      title: 'Mâm Đa Chấu AMG 20-inch Phay Hai Tông Màu Khí Động Học',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=75',
      tag: 'Mâm AMG 20-inch'
    },
    {
      id: 6,
      title: 'Hệ Thống Đèn Digital Light Độ Phân Giải 2.6 Triệu Điểm Ảnh',
      url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&auto=format&fit=crop&q=75',
      tag: 'Đèn Digital Light'
    },
  ],
  'bmw-530i': [
    {
      id: 1,
      title: 'Góc 3/4 Ngoại Thất Sedan Thể Thao Doanh Nhân BMW 530i M Sport',
      url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&auto=format&fit=crop&q=75',
      tag: 'Ngoại thất M Sport'
    },
    {
      id: 2,
      title: 'Đèn Hậu LED 3D Khói Độc Quyền & Ống Xả Kép M Sport',
      url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&auto=format&fit=crop&q=75',
      tag: 'Đuôi xe thể thao'
    },
    {
      id: 3,
      title: 'Khoang Lái BMW Live Cockpit Professional 12.3 Inch Đôi',
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=75',
      tag: 'Live Cockpit'
    },
    {
      id: 4,
      title: 'Ghế Bọc Da Dakota Cao Cấp Kèm Dây Đai An Toàn M Sport',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&auto=format&fit=crop&q=75',
      tag: 'Ghế da Dakota'
    },
    {
      id: 5,
      title: 'Mâm Hợp Kim Thể Thao M 19-inch Phay Kim Cương Hai Màu',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=75',
      tag: 'Mâm M 19-inch'
    },
    {
      id: 6,
      title: 'Đèn Pha BMW Laserlight Chiếu Xa 650m Tự Động Phân Vùng Chống Chói',
      url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&auto=format&fit=crop&q=75',
      tag: 'BMW Laserlight'
    },
  ],
  'vinfast-vf9': [
    {
      id: 1,
      title: 'Góc 3/4 SUV Điện Đầu Bảng VinFast VF 9 Plus (Pin SDI)',
      url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&auto=format&fit=crop&q=75',
      tag: 'SUV Điện Full-Size'
    },
    {
      id: 2,
      title: 'Dải LED Cánh Chim Độc Bản Phía Sau & Cốp Đóng Mở Điện Rảnh Tay',
      url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&auto=format&fit=crop&q=75',
      tag: 'Dải LED nhận diện'
    },
    {
      id: 3,
      title: 'Màn Hình Trung Tâm Cảm Ứng 15.6 Inch & Trợ Lý Ảo ViVi Thông Minh',
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=75',
      tag: 'Khoang lái số'
    },
    {
      id: 4,
      title: 'Cấu Hình 6 Chỗ Ghế Cơ Trưởng Thương Gia Massage & Thông Gió',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&auto=format&fit=crop&q=75',
      tag: 'Ghế cơ trưởng VIP'
    },
    {
      id: 5,
      title: 'Mâm Khí Động Học 21-inch Thiết Kế Tối Ưu Quãng Đường Di Chuyển',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=75',
      tag: 'Mâm 21-inch Aero'
    },
    {
      id: 6,
      title: 'Trần Kính Toàn Cảnh Panoramic & Cửa Hít Tự Động 4 Cửa',
      url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1600&auto=format&fit=crop&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400&auto=format&fit=crop&q=75',
      tag: 'Trần kính Panorama'
    },
  ],
};

export const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  // Find car in catalog or fallback to first vehicle (Porsche Taycan)
  const currentCar: CarItem =
    CARS_CATALOG.find(
      (c) =>
        c.id === id ||
        c.id === (id === 'taycan' ? 'porsche-taycan' : id) ||
        c.detailUrl === `/cars/${id}`
    ) || CARS_CATALOG[0];

  // Gallery images setup
  const galleryList =
    CAR_GALLERIES[currentCar.id] ||
    CAR_GALLERIES['porsche-taycan'].map((item, idx) => ({
      ...item,
      id: idx + 1,
      title: `${currentCar.model} - Góc hình ảnh chi tiết số ${idx + 1}`,
      url: idx === 0 ? currentCar.imageUrl : item.url,
      thumbnail: idx === 0 ? currentCar.imageUrl : item.thumbnail,
    }));

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [show360Modal, setShow360Modal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [activeInspectionTab, setActiveInspectionTab] = useState<number>(0);

  // Dynamic price calculation
  const carPrice = Math.round(currentCar.priceRaw * 1000000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [loanMonths, setLoanMonths] = useState<number>(60);
  const interestRateYear = 0.069;

  const downPaymentAmount = Math.round(carPrice * (downPaymentPercent / 100));
  const loanAmount = carPrice - downPaymentAmount;
  const monthlyPrincipal = Math.round(loanAmount / loanMonths);
  const monthlyInterestFirst = Math.round(loanAmount * (interestRateYear / 12));
  const estimatedMonthlyTotal = monthlyPrincipal + monthlyInterestFirst;

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  // Test drive booking form
  const [bookingData, setBookingData] = useState({
    fullName: '',
    phone: '',
    address: 'Showroom Hà Nội',
    date: '2026-10-25',
    timeSlot: '09:00 - 11:00',
    note: '',
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Scroll to top on vehicle switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
  }, [currentCar.id]);

  // Inspection checklist groups
  const inspectionGroups = [
    {
      id: 0,
      title: '1. Khung gầm & Thân vỏ',
      passedCount: 48,
      totalCount: 48,
      items: [
        `Khung gầm nguyên bản, kết cấu dầm chính & dầm phụ của ${currentCar.brand} không biến dạng`,
        'Các mối hàn robot nguyên bản theo chuẩn kỹ nghệ nhà máy châu Âu',
        'Nắp capo trước & cốp sau đóng mở êm ái, khe hở mép vỏ chuẩn xác từng milimet',
        'Kính chắn gió và hệ thống kính cách âm nguyên bản, không nứt rạn',
        'Cản trước, cản sau và các chi tiết ốp ngoại thất không có dấu hiệu va chạm đâm đụng',
        'Độ dày nước sơn đồng đều, đã kiểm tra bằng máy đo vi mô (110 - 130 microns)',
        'Cụm đèn pha chiếu sáng cao cấp và đèn hậu không hấp hơi ẩm'
      ],
    },
    {
      id: 1,
      title: '2. Động cơ & Hệ thống truyền động',
      passedCount: 42,
      totalCount: 42,
      items: [
        `Khối vận hành ${currentCar.specs.engine} vận hành mượt mà, không tiếng gõ lạ`,
        `Hộp số ${currentCar.specs.gearbox} chuyển số chính xác, êm ái`,
        'Hệ thống vi sai và các trục dẫn động không rò rỉ dung dịch bôi trơn',
        'Hệ thống lái trợ lực biến thiên tốc độ phản hồi chính xác',
        'Dung dịch làm mát và dầu máy đạt tiêu chuẩn phẩm cấp nhà sản xuất',
        'Không phát hiện bất kỳ mã lỗi nào qua thiết bị đọc lỗi chuyên dụng OBD-II'
      ],
    },
    {
      id: 2,
      title: '3. Hệ thống điện, An toàn & Pin',
      passedCount: 44,
      totalCount: 44,
      items: [
        'Hệ thống ắc quy / cụm pin điện đạt chỉ số dung lượng SOH trên 98%',
        'Hệ thống phanh ABS, cân bằng điện tử ESP và hỗ trợ khởi hành ngang dốc hoàn hảo',
        'Cụm cảm biến khoảng cách, camera 360 độ và radar ADAS hoạt động chuẩn xác',
        'Hệ thống dây dẫn điện nguyên bản, chưa qua sửa chữa chắp vá',
        'Túi khí an toàn toàn bộ các vị trí đạt chuẩn kỹ thuật'
      ],
    },
    {
      id: 3,
      title: '4. Nội thất & Trang bị tiện nghi',
      passedCount: 42,
      totalCount: 42,
      items: [
        'Toàn bộ bề mặt da nội thất, ốp gỗ hoặc carbon nguyên bản, không sờn rách',
        'Hệ thống điều hòa đa vùng làm lạnh sâu, hệ thống lọc không khí ion hoạt động tốt',
        'Màn hình cảm ứng giải trí và cụm đồng hồ kỹ thuật số hiển thị sắc nét',
        'Hệ thống loa âm thanh cao cấp không rè âm ở mọi dải tần',
        'Cửa sổ trời và rèm che nắng vận hành êm ái, không kẹt gioăng'
      ],
    },
  ];

  // Related vehicles (filter out current vehicle)
  const relatedVehicles = CARS_CATALOG.filter((c) => c.id !== currentCar.id).slice(0, 4);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setShowTestDriveModal(false);
      alert(`Đăng ký lái thử ${currentCar.model} thành công! Chuyên viên Nguyễn Đức Thắng sẽ liên hệ xác nhận trong vòng 15 phút.`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#0f172a] font-sans selection:bg-[#0066ff] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Breadcrumbs & Share/Favorite Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to={ROUTES.HOME} className="hover:text-[#0066ff] transition-colors font-medium">
              Trang chủ
            </Link>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <Link to={ROUTES.BUY_CAR} className="hover:text-[#0066ff] transition-colors font-medium">
              Mua xe
            </Link>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <Link to={`${ROUTES.BUY_CAR}?brand=${encodeURIComponent(currentCar.brand)}`} className="hover:text-[#0066ff] transition-colors font-medium">
              {currentCar.brand}
            </Link>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <span className="text-slate-900 font-bold truncate max-w-[220px] sm:max-w-none">
              {currentCar.model}
            </span>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isLiked
                  ? 'bg-rose-50 text-rose-600 shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-50 shadow-2xs ring-1 ring-black/[0.04]'
              }`}
            >
              <Heart size={15} className={isLiked ? 'fill-rose-600 text-rose-600' : 'text-slate-500'} />
              <span>{isLiked ? 'Đã lưu xe' : 'Lưu tin'}</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Đã sao chép liên kết chi tiết xe vào clipboard!');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-all shadow-2xs ring-1 ring-black/[0.04] cursor-pointer"
            >
              <Share2 size={15} className="text-slate-500" />
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
              {/* Main Large Visual Frame with Double-Bezel Architecture */}
              <div className="p-1 rounded-[10px] bg-slate-100/90 shadow-md ring-1 ring-black/[0.03]">
                <div className="relative rounded-[8px] overflow-hidden bg-slate-950 aspect-[16/10] sm:aspect-[16/9] group">
                  <img
                    src={galleryList[activeImageIndex].url}
                    alt={galleryList[activeImageIndex].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlays for Badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold tracking-wide shadow-xs">
                        <ShieldCheck size={14} className="text-white" />
                        Xe kiểm định 176 điểm chuẩn Đức
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold tracking-wide shadow-xs">
                        <CheckCircle2 size={14} className="text-white" />
                        {currentCar.conditionTag}
                      </span>
                    </div>

                    {/* Photo Index Pill */}
                    <span className="px-3 py-1 rounded-[8px] bg-slate-900/80 backdrop-blur-md text-white/90 text-xs font-semibold border border-white/20">
                      {activeImageIndex + 1} / {galleryList.length} Ảnh 4K
                    </span>
                  </div>

                  {/* Bottom Overlay Info & Quick Media Actions */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-blue-300 font-bold">
                        {galleryList[activeImageIndex].tag}
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold text-white drop-shadow-sm mt-0.5">
                        {galleryList[activeImageIndex].title}
                      </h3>
                    </div>

                    {/* Action Buttons: 360 & Video Walkthrough */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShow360Modal(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-white/90 hover:bg-white text-slate-900 text-xs font-bold shadow-md transition-all cursor-pointer backdrop-blur-md active:scale-95"
                      >
                        <RotateCcw size={14} className="text-[#0066ff]" />
                        <span>Xem ảnh 360°</span>
                      </button>
                      <button
                        onClick={() => setShowVideoModal(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#0066ff] hover:bg-[#0050cb] text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        <Play size={14} className="fill-current text-white" />
                        <span>Video thực tế</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnails Strip */}
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {galleryList.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-[8px] overflow-hidden aspect-[4/3] transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'ring-2 ring-[#0066ff] scale-102 shadow-sm'
                        : 'opacity-70 hover:opacity-100 shadow-2xs ring-1 ring-black/[0.05]'
                    }`}
                  >
                    <img
                      src={img.thumbnail}
                      alt={img.tag}
                      className="w-full h-full object-cover"
                    />
                    {activeImageIndex === idx && (
                      <div className="absolute inset-0 bg-[#0066ff]/15" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Bảng thông số kỹ thuật cốt lõi (Key Specifications Grid) */}
            <section className="p-1 rounded-[10px] bg-slate-100/80 shadow-xs ring-1 ring-black/[0.03]">
              <div className="bg-white rounded-[8px] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                      HIỆU NĂNG VẬN HÀNH ĐỈNH CAO
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                      Thông Số Kỹ Thuật Cốt Lõi
                    </h2>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-blue-50 text-[#0066ff] text-xs font-semibold">
                    <Zap size={14} />
                    <span>Chứng nhận hiệu năng chính hãng</span>
                  </div>
                </div>

                {/* Key Specs Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-[8px] bg-slate-50/90 shadow-2xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">Hệ dẫn động / Động cơ</div>
                    <div className="font-display font-bold text-base text-slate-900 truncate" title={currentCar.specs.engine}>
                      {currentCar.specs.engine}
                    </div>
                    <div className="text-xs text-slate-600">{currentCar.typeLabel}</div>
                  </div>

                  <div className="p-4 rounded-[8px] bg-slate-50/90 shadow-2xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">Công suất cực đại</div>
                    <div className="font-display font-bold text-base text-slate-900">
                      {currentCar.specs.power}
                    </div>
                    <div className="text-xs text-slate-600">Đạt chuẩn thử nghiệm</div>
                  </div>

                  <div className="p-4 rounded-[8px] bg-slate-50/90 shadow-2xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">Hộp số truyền động</div>
                    <div className="font-display font-bold text-base text-[#0066ff] truncate" title={currentCar.specs.gearbox}>
                      {currentCar.specs.gearbox}
                    </div>
                    <div className="text-xs text-slate-600">Chuyển số thể thao</div>
                  </div>

                  <div className="p-4 rounded-[8px] bg-slate-50/90 shadow-2xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">Tiêu hao / Phạm vi</div>
                    <div className="font-display font-bold text-base text-slate-900 truncate" title={currentCar.specs.fuelConsumption}>
                      {currentCar.specs.fuelConsumption}
                    </div>
                    <div className="text-xs text-slate-600">Tối ưu tiết kiệm</div>
                  </div>
                </div>

                {/* Performance Highlights Progress */}
                <div className="space-y-4 pt-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Đánh giá chỉ số vận hành thực tế
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-slate-700">Hiệu suất mã lực & gia tốc</span>
                      <span className="font-bold text-[#0066ff] font-display">{currentCar.specs.power} (Rất mạnh mẽ)</span>
                    </div>
                    <div className="w-full h-2 rounded-[8px] bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-[8px] bg-gradient-to-r from-[#0066ff] to-[#0284c7] w-[90%]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-slate-700">Mức độ hoàn thiện cơ khí & độ cách âm</span>
                      <span className="font-bold text-emerald-600 font-display">9.8 / 10 Điểm (TÜV SÜD)</span>
                    </div>
                    <div className="w-full h-2 rounded-[8px] bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-[8px] bg-gradient-to-r from-emerald-500 to-teal-400 w-[95%]" />
                    </div>
                  </div>
                </div>

                {/* Color & Material Spec Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3.5 p-3.5 rounded-[8px] bg-slate-50/90 shadow-2xs">
                    <div className="w-10 h-10 rounded-[8px] border-2 border-white shadow-2xs bg-[#0f172a] shrink-0 flex items-center justify-center text-white text-xs font-bold">
                      {currentCar.year}
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Năm sản xuất / Đăng ký</div>
                      <div className="text-sm font-bold text-slate-800">Đời {currentCar.year} • {currentCar.conditionTag}</div>
                      <div className="text-xs text-slate-500">{currentCar.odo}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3.5 rounded-[8px] bg-slate-50/90 shadow-2xs">
                    <div className="w-10 h-10 rounded-[8px] border-2 border-white shadow-2xs bg-gradient-to-br from-blue-600 to-indigo-600 shrink-0 flex items-center justify-center text-white">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Bảo hành tại CarShop</div>
                      <div className="text-sm font-bold text-slate-800">24 Tháng hoặc 30.000 KM</div>
                      <div className="text-xs text-slate-500">Bảo dưỡng định kỳ miễn phí</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Biên bản kiểm định chất lượng 176 điểm độc quyền CarShop */}
            <section className="p-1 rounded-[10px] bg-slate-100/80 shadow-xs ring-1 ring-black/[0.03]">
              <div className="bg-white rounded-[8px] p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-[8px] bg-emerald-100 text-emerald-700">
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
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] bg-blue-50 text-[#0066ff] hover:bg-blue-100 text-xs sm:text-sm font-bold transition-all shadow-2xs shrink-0 cursor-pointer active:scale-95"
                  >
                    <Download size={16} />
                    <span>Tải biên bản PDF (Có dấu mộc)</span>
                  </button>
                </div>

                {/* 4 Guarantees Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-[8px] bg-emerald-50/70 text-center space-y-1 shadow-2xs">
                    <CheckCircle2 size={18} className="text-emerald-600 mx-auto" />
                    <div className="text-xs font-bold text-emerald-900">100% Đạt Chuẩn</div>
                    <div className="text-[11px] text-emerald-700 leading-tight">Đủ điều kiện bảo hành 2 năm</div>
                  </div>

                  <div className="p-3.5 rounded-[8px] bg-emerald-50/70 text-center space-y-1 shadow-2xs">
                    <ShieldCheck size={18} className="text-emerald-600 mx-auto" />
                    <div className="text-xs font-bold text-emerald-900">Không Đâm Đụng</div>
                    <div className="text-[11px] text-emerald-700 leading-tight">Khung gầm và dầm xe nguyên vẹn</div>
                  </div>

                  <div className="p-3.5 rounded-[8px] bg-emerald-50/70 text-center space-y-1 shadow-2xs">
                    <CheckCircle2 size={18} className="text-emerald-600 mx-auto" />
                    <div className="text-xs font-bold text-emerald-900">Không Thủy Kích</div>
                    <div className="text-[11px] text-emerald-700 leading-tight">Khoang máy & pin chưa từng ngập</div>
                  </div>

                  <div className="p-3.5 rounded-[8px] bg-emerald-50/70 text-center space-y-1 shadow-2xs">
                    <CheckCircle2 size={18} className="text-emerald-600 mx-auto" />
                    <div className="text-xs font-bold text-emerald-900">Máy Móc Nguyên Bản</div>
                    <div className="text-[11px] text-emerald-700 leading-tight">Mã phụ tùng trùng khớp 100%</div>
                  </div>
                </div>

                {/* 4 Checklist Group Tabs - SEGMENTED PILL BAR (Zero Gray Border Line) */}
                <div className="space-y-4 pt-2">
                  <div className="inline-flex p-1 rounded-[10px] bg-slate-100/90 max-w-full overflow-x-auto gap-1">
                    {inspectionGroups.map((group, idx) => (
                      <button
                        key={group.id}
                        onClick={() => setActiveInspectionTab(idx)}
                        className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                          activeInspectionTab === idx
                            ? 'bg-white text-blue-600 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                        }`}
                      >
                        <span>{group.title}</span>
                      </button>
                    ))}
                  </div>

                  {/* Checklist items in active tab */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {inspectionGroups[activeInspectionTab].items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-[8px] bg-slate-50/80 hover:bg-slate-50 text-xs sm:text-sm text-slate-700 shadow-2xs transition-colors"
                      >
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Công cụ dự toán trả góp chi tiết cho chiếc xe này (Interactive Loan Calculator) */}
            <section id="installment-calculator" className="p-1 rounded-[10px] bg-slate-100/80 shadow-xs ring-1 ring-black/[0.03]">
              <div className="bg-white rounded-[8px] p-6 sm:p-8 space-y-6">
                <div className="pb-4">
                  <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                    DỰ TOÁN TÀI CHÍNH TỐI ƯU
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                    Công Cụ Dự Toán Trả Góp Xe {currentCar.model}
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
                        className="w-full h-2 bg-slate-200 rounded-[8px] appearance-none cursor-pointer accent-[#0066ff]"
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
                            className={`py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                              loanMonths === m
                                ? 'bg-[#0066ff] text-white shadow-2xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {m}T
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interest rate badge */}
                    <div className="flex items-center gap-2 p-3 rounded-[8px] bg-blue-50/80 text-xs text-blue-900 shadow-2xs">
                      <Info size={16} className="text-[#0066ff] shrink-0" />
                      <span>
                        Áp dụng gói ưu đãi liên kết VPBank, Techcombank, Shinhan Bank với lãi suất cố định 6.9%/năm năm đầu.
                      </span>
                    </div>
                  </div>

                  {/* Calculated Results Summary Card */}
                  <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-[8px] p-6 flex flex-col justify-between shadow-lg ring-1 ring-white/10">
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

                      <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs">
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
                      className="w-full mt-6 py-3 px-4 rounded-[8px] bg-[#0066ff] hover:bg-[#0050cb] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-between group active:scale-95"
                    >
                      <span>Tư vấn hồ sơ vay miễn phí</span>
                      <span className="w-7 h-7 rounded-[8px] bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                        <ChevronRight size={14} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT 4 COLUMNS: Sticky Action Panel & Sales Consultant Profile */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            {/* Main Sticky Card with Double-Bezel */}
            <div className="p-1 rounded-[10px] bg-slate-100/80 shadow-md ring-1 ring-black/[0.03]">
              <div className="bg-white rounded-[8px] p-6 space-y-6">
                {/* Header Title & Tags */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-[8px] text-[11px] font-bold bg-blue-100 text-[#0066ff]">
                      Năm {currentCar.year}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-[8px] text-[11px] font-bold bg-slate-100 text-slate-700">
                      {currentCar.odo}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-[8px] text-[11px] font-bold bg-emerald-100 text-emerald-700">
                      Biển Hà Nội
                    </span>
                  </div>

                  <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                    {currentCar.model}
                  </h1>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {currentCar.description}
                  </p>
                </div>

                {/* Price & Monthly Tag */}
                <div className="p-4.5 rounded-[8px] bg-slate-50/90 shadow-2xs space-y-2">
                  <div className="text-xs text-slate-500 font-medium">Giá niêm yết xe kiểm định:</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#0066ff]">
                      {currentCar.priceVND}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                    <span>Ước tính trả góp từ:</span>
                    <span className="font-bold text-emerald-600">{currentCar.monthlyEstimate}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    * Hỗ trợ vay tối đa 80% - 85% giá trị xe, hồ sơ duyệt nhanh trong 24 giờ.
                  </div>
                </div>

                {/* Primary Call to Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowTestDriveModal(true)}
                    className="w-full py-3.5 px-4 rounded-[8px] bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-between cursor-pointer group active:scale-95"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>Đăng ký lái thử tại nhà</span>
                    </div>
                    <span className="w-7 h-7 rounded-[8px] bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ChevronRight size={14} />
                    </span>
                  </button>

                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="w-full py-3.5 px-4 rounded-[8px] bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-2xs transition-all flex items-center justify-between cursor-pointer group active:scale-95"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={18} />
                      <span>Nhận báo giá lăn bánh & Giữ chỗ</span>
                    </div>
                    <span className="w-7 h-7 rounded-[8px] bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ChevronRight size={14} />
                    </span>
                  </button>
                </div>

                {/* Consultant Card */}
                <div className="p-4 rounded-[8px] bg-gradient-to-br from-blue-50/60 to-indigo-50/40 shadow-2xs space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                        alt="Nguyễn Đức Thắng"
                        className="w-12 h-12 rounded-[8px] object-cover border-2 border-[#0066ff]"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
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
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[8px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-all"
                    >
                      <Phone size={14} />
                      <span>0988 888 888</span>
                    </a>
                    <a
                      href="https://zalo.me"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[8px] bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-2xs ring-1 ring-black/[0.06] transition-all"
                    >
                      <MessageCircle size={14} className="text-[#0066ff]" />
                      <span>Chat Zalo</span>
                    </a>
                  </div>
                </div>

                {/* 5-Star Commitment Checklist */}
                <div className="space-y-2 pt-2 text-xs text-slate-600">
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
        </div>

        {/* 6. Xe tương đương trong cùng tầm giá (Related Vehicles) */}
        <section className="pt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                GỢI Ý TƯƠNG ĐƯƠNG
              </span>
              <h2 className="font-display text-xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Xe Cùng Phân Khúc Đang Có Sẵn Tại CarShop
              </h2>
            </div>
            <Link
              to={ROUTES.BUY_CAR}
              className="inline-flex items-center gap-1 text-sm font-bold text-[#0066ff] hover:text-[#0050cb] transition-colors"
            >
              <span>Xem tất cả {CARS_CATALOG.length} xe sang sẵn có</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedVehicles.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-[10px] overflow-hidden shadow-2xs hover:shadow-lg ring-1 ring-black/[0.04] transition-all group flex flex-col justify-between"
              >
                <div>
                  <Link to={car.detailUrl || `/cars/${car.id}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={car.imageUrl}
                      alt={car.model}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-[8px] text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-white">
                      {car.conditionTag}
                    </span>
                  </Link>

                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-xs font-bold text-slate-500">{car.brand} • {car.year}</div>
                      <Link to={car.detailUrl || `/cars/${car.id}`}>
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-[#0066ff] transition-colors mt-0.5">
                          {car.model}
                        </h3>
                      </Link>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="px-2 py-0.5 rounded-[8px] bg-slate-100 font-medium">{car.specs.power}</span>
                      <span className="px-2 py-0.5 rounded-[8px] bg-slate-100 font-medium truncate">{car.specs.gearbox}</span>
                    </div>

                    <div className="pt-2 space-y-0.5">
                      <div className="font-display font-extrabold text-base text-slate-900">
                        {car.priceVND}
                      </div>
                      <div className="text-xs text-slate-500">
                        Trả góp từ {car.monthlyEstimate}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    to={car.detailUrl || `/cars/${car.id}`}
                    className="w-full block py-2.5 px-3 rounded-[8px] bg-slate-100 hover:bg-[#0066ff] text-slate-800 hover:text-white text-xs font-bold transition-all text-center cursor-pointer shadow-2xs"
                  >
                    Xem chi tiết xe này
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 7. DÒNG LOGO CÁC HÃNG XE CHẠY PHÍA DƯỚI (Brand Marquee Ticker) */}
      <BrandMarqueeTicker />

      {/* 8. Footer */}
      <Footer />

      {/* MODAL 1: Đăng Ký Lái Thử Tại Nhà */}
      {showTestDriveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[10px] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative ring-1 ring-black/[0.05]">
            <button
              onClick={() => setShowTestDriveModal(false)}
              className="absolute top-4 right-4 p-2 rounded-[8px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                TRẢI NGHIỆM MIỄN PHÍ TẬN NƠI
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                Đăng Ký Lái Thử {currentCar.model}
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
                  className="w-full px-3.5 py-2.5 rounded-[8px] bg-slate-50/80 ring-1 ring-slate-200/60 focus:bg-white focus:ring-2 focus:ring-[#0066ff]/20 text-sm outline-none transition-all"
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
                  className="w-full px-3.5 py-2.5 rounded-[8px] bg-slate-50/80 ring-1 ring-slate-200/60 focus:bg-white focus:ring-2 focus:ring-[#0066ff]/20 text-sm outline-none transition-all"
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
                    className="w-full px-3 py-2 rounded-[8px] bg-slate-50/80 ring-1 ring-slate-200/60 focus:bg-white focus:ring-2 focus:ring-[#0066ff]/20 text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Khung giờ phù hợp
                  </label>
                  <select
                    value={bookingData.timeSlot}
                    onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 rounded-[8px] bg-slate-50/80 ring-1 ring-slate-200/60 focus:bg-white focus:ring-2 focus:ring-[#0066ff]/20 text-sm outline-none transition-all"
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
                  className="w-full px-3.5 py-2.5 rounded-[8px] bg-slate-50/80 ring-1 ring-slate-200/60 focus:bg-white focus:ring-2 focus:ring-[#0066ff]/20 text-sm outline-none transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={bookingSubmitted}
                  className="w-full py-3 rounded-[8px] bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
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
          <div className="bg-white rounded-[10px] max-w-md w-full p-6 sm:p-8 shadow-2xl relative ring-1 ring-black/[0.05] space-y-5">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 p-2 rounded-[8px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
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
                {currentCar.model} ({currentCar.year} - {currentCar.odo})
              </p>
            </div>

            <div className="space-y-2.5 p-4 rounded-[8px] bg-[#f8fafc] ring-1 ring-black/[0.04] text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Giá xe niêm yết:</span>
                <span className="font-bold text-slate-900">{currentCar.priceVND}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>{currentCar.type === 'ev' ? 'Lệ phí trước bạ xe điện (0% theo NĐ 10):' : 'Lệ phí trước bạ (Tạm tính 2% xe lướt):'}</span>
                <span>{currentCar.type === 'ev' ? '0 VNĐ' : formatVND(Math.round(carPrice * 0.02))}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí đổi biển & sang tên xe lướt:</span>
                <span>20.000.000 VNĐ</span>
              </div>
              <div className="flex justify-between">
                <span>Bảo hiểm vật chất 2 năm:</span>
                <span>Tặng miễn phí</span>
              </div>
              <div className="pt-2.5 flex justify-between text-sm font-bold text-[#0066ff]">
                <span>Tổng chi phí lăn bánh ước tính:</span>
                <span>{currentCar.type === 'ev' ? formatVND(carPrice + 20000000) : formatVND(Math.round(carPrice * 1.02) + 20000000)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  alert(`Yêu cầu giữ chỗ cho xe ${currentCar.model} đã được ghi nhận. Hotline 1900 8888 sẽ liên hệ xác nhận tiền cọc giữ xe 50.000.000 VNĐ.`);
                  setShowQuoteModal(false);
                }}
                className="w-full py-3 rounded-[8px] bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Đặt Cọc Giữ Xe Trong 48 Giờ
              </button>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="w-full py-2.5 rounded-[8px] bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs cursor-pointer transition-colors"
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
          <div className="bg-slate-900 text-white rounded-[10px] max-w-3xl w-full p-6 shadow-2xl relative ring-1 ring-white/10 space-y-4">
            <button
              onClick={() => setShow360Modal(false)}
              className="absolute top-4 right-4 p-2 rounded-[8px] text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                CHẾ ĐỘ XEM TOÀN CẢNH 360°
              </span>
              <h3 className="font-display text-xl font-bold text-white mt-1">
                {currentCar.model} 360° Virtual Showcase
              </h3>
            </div>

            <div className="relative aspect-video rounded-[8px] overflow-hidden bg-slate-950 flex items-center justify-center ring-1 ring-white/10">
              <img
                src={galleryList[0].url}
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
                className="px-5 py-2 rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
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
          <div className="bg-slate-900 text-white rounded-[10px] max-w-3xl w-full p-6 shadow-2xl relative ring-1 ring-white/10 space-y-4">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-[8px] text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                VIDEO QUAY THỰC TẾ 4K
              </span>
              <h3 className="font-display text-xl font-bold text-white mt-1">
                Đánh Giá Thực Tế {currentCar.model} Tại Showroom
              </h3>
            </div>

            <div className="relative aspect-video rounded-[8px] overflow-hidden bg-slate-950 flex items-center justify-center ring-1 ring-white/10">
              <img
                src={galleryList[1] ? galleryList[1].url : galleryList[0].url}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-[8px] bg-rose-600/90 flex items-center justify-center shadow-lg text-white">
                  <Play size={28} className="fill-current ml-1" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Thời lượng: 08:45 • Độ phân giải: 4K HDR 60fps</span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-5 py-2 rounded-[8px] bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
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
          <div className="bg-white rounded-[10px] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative ring-1 ring-black/[0.05] space-y-5">
            <button
              onClick={() => setShowPdfModal(false)}
              className="absolute top-4 right-4 p-2 rounded-[8px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-[8px] bg-blue-50 text-[#0066ff]">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Biên Bản Kiểm Định Chất Lượng 176 Điểm
                </h3>
                <p className="text-xs text-slate-500">Mã hồ sơ: CS-VN-2026-{currentCar.id.toUpperCase()}-0923</p>
              </div>
            </div>

            <div className="p-4 rounded-[8px] bg-[#f8fafc] ring-1 ring-black/[0.04] text-xs space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span>Dòng xe kiểm định:</span>
                <span className="font-bold text-slate-900">{currentCar.model}</span>
              </div>
              <div className="flex justify-between">
                <span>Số khung (VIN):</span>
                <span className="font-mono font-bold text-slate-900">VN{currentCar.id.slice(0, 4).toUpperCase()}98214X99</span>
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
                  alert(`Đang tải xuống tệp PDF: Bien_Ban_Kiem_Dinh_176_Diem_${currentCar.id}.pdf`);
                  setShowPdfModal(false);
                }}
                className="w-full py-3 rounded-[8px] bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
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

export default CarDetailPage;

