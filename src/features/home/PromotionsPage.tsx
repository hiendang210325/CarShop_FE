import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Gift,
  Tag,
  Sparkles,
  Percent,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  ArrowRight,
  Zap,
  Car,
  Award,
  Check,
  RotateCcw,
  BadgeCheck,
  FileCheck2,
  Lock,
  Copy,
  X,
  CreditCard,
  Droplets,
  Sliders,
  MessageCircle,
  Info,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ROUTES } from '../../constants';
import { useToast } from '../../contexts/ToastContext';

/**
 * High-End Visual Design & Anti-Slop Directive:
 * - Vibe Archetype: Cold Luxury & Institutional Automotive Atelier
 * - Layout Archetype: Asymmetrical Editorial Bento Grid & Interactive Telemetry Concierge
 * - Double-Bezel Architecture: outer rounded-[10px] p-1 + inner rounded-[8px] core
 * - Strict Radius Constraint: 8px <= radius <= 10px across all containers
 * - Button-in-Button CTAs with spring trajectory physics
 * - Real automotive privileged benefits (Xe > 1 Tỷ, Thẻ rửa xe 1 năm, Đặt mua online)
 */

type PromoCategory = 'all' | 'billion' | 'wash_pass' | 'online' | 'tax_interest' | 'trade_in';
type PriceTier = 'under_800' | '800_1000' | '1000_2000' | 'over_2000';

interface PromoCardData {
  id: string;
  category: PromoCategory[];
  badge: string;
  title: string;
  highlightValue: string;
  desc: string;
  benefits: string[];
  expiry: string;
  isHot?: boolean;
  ctaText: string;
  actionType: 'wash_pass' | 'billion' | 'online_booking' | 'voucher_claim';
  heroBadge?: string;
}

const ALL_PROMOTIONS: PromoCardData[] = [
  {
    id: 'promo-billion-tier',
    category: ['billion'],
    badge: 'ĐẶC QUYỀN HOÀNG GIA XE > 1 TỶ',
    title: 'Gói Đặc Quyền Hoàng Gia Dành Cho Xe Trên 1 Tỷ',
    highlightValue: 'Gói Quà Tặng Lên Đến 165 Triệu',
    desc: 'Dành riêng cho khách hàng sở hữu bất kỳ dòng xe nào có giá trị từ 1.000.000.000 ₫ trở lên. Kích hoạt trọn bộ 5 đặc quyền thượng lưu chăm sóc và bảo hộ tài sản độc quyền từ CarShop.',
    benefits: [
      'Tặng Thẻ Rửa Xe & Spa Ngoại Nội Thất VIP 1 Năm Không Giới Hạn (Trị giá 25.000.000 ₫)',
      'Tặng Gói Phủ Ceramic 9H 3 Lớp & Dán Phim Cách Nhiệt 3M Crystalline (Trị giá 35.000.000 ₫)',
      'Hỗ trợ 100% Lệ Phí Trước Bạ & Đăng Ký Biển Số Toàn Quốc (Trợ giá từ 100M - 250M)',
      'Tặng 2 Năm Bảo Hiểm Thân Vỏ Chính Hãng (Bao gồm rủi ro ngập nước, thủy kích)',
      'Dịch vụ cứu hộ chuyên dụng 2 tầng VIP 24/7 giao nhận xe tận nhà miễn phí trong 3 năm',
    ],
    expiry: 'Áp dụng cho mọi xe > 1 Tỷ sẵn có trong tháng',
    isHot: true,
    ctaText: 'Đăng Ký Gói Xe > 1 Tỷ',
    actionType: 'billion',
    heroBadge: 'HOT DEAL SỐ 1',
  },
  {
    id: 'promo-wash-pass',
    category: ['wash_pass'],
    badge: 'DỊCH VỤ SPA Ô TÔ 365 NGÀY',
    title: 'Thẻ Rửa Xe & Chăm Sóc Toàn Diện 1 Năm (CarShop VIP Wash Pass)',
    highlightValue: 'Chỉ 4.990.000 ₫ / Năm (Tiết Kiệm 58%)',
    desc: 'Giải pháp giữ gìn vẻ đẹp hoàn mỹ cho xế cưng suốt 365 ngày. Được đăng ký mua trực tiếp trực tuyến hoặc TẶNG MIỄN PHÍ 100% khi mua bất kỳ xe nào trên 1 tỷ tại CarShop.',
    benefits: [
      'Rửa xe bọt tuyết trung tính & hút bụi khoang lái không giới hạn số lần tại toàn bộ chi nhánh',
      '12 lần dưỡng da ghế cao cấp & khử mùi diệt khuẩn khoang lái bằng công nghệ Ozone',
      '04 lần tẩy ố mốc kính, tẩy nhựa đường và khử bụi sơn công nghiệp chuẩn Đức',
      '02 lần phủ bóng sáp Ceramic chống bám nước bảo vệ sơn mùa mưa bão',
      'Ưu tiên làn rửa xe VIP Concierge, không phải xếp hàng chờ đợi cuối tuần',
    ],
    expiry: 'Mở bán giới hạn 100 thẻ VIP trực tuyến',
    isHot: true,
    ctaText: 'Đăng Ký Mua Thẻ Rửa Xe Trực Tuyến',
    actionType: 'wash_pass',
  },
  {
    id: 'promo-online-booking',
    category: ['online'],
    badge: 'ĐẶC QUYỀN MUA XE ONLINE',
    title: 'Đặt Cọc & Mua Xe Trực Tuyến: Giảm Thêm 20 Triệu & Hoàn Cọc 7 Ngày',
    highlightValue: 'Trừ Thẳng 20.000.000 ₫ Vào Giá Xe',
    desc: 'Trải nghiệm mua xe thời đại số an tâm tuyệt đối: Chỉ cần đặt cọc giữ xe 10 triệu trực tuyến, quý khách được trừ ngay 20 triệu vào hợp đồng và giao xe tận nhà lái thử trong 24 giờ.',
    benefits: [
      'Trừ thêm 20.000.000 ₫ vào giá bán niêm yết khi hoàn tất đặt cọc trực tuyến',
      'Kỹ sư CarShop chở xe bằng xe cứu hộ 2 tầng đến tận nhà quý khách lái thử 24h',
      'Cam kết hoàn lại 100% tiền cọc trong 7 ngày nếu không ưng ý hoặc không đúng cam kết 176 điểm',
      'Khóa giá bán ưu đãi không đổi trong 7 ngày kể từ thời điểm đặt cọc',
    ],
    expiry: 'Dành riêng cho khách hàng đặt cọc qua website',
    isHot: true,
    ctaText: 'Đăng Ký Đặt Mua Trực Tuyến',
    actionType: 'online_booking',
  },
  {
    id: 'promo-tax-support',
    category: ['tax_interest'],
    badge: 'TRỢ GIÁ THUẾ & BIỂN SỐ',
    title: 'Hỗ Trợ 100% Lệ Phí Trước Bạ & Đăng Ký Biển Số Toàn Quốc',
    highlightValue: 'Tiết Kiệm Lên Đến 250 Triệu',
    desc: 'Áp dụng cho dòng xe sedan thể thao và SUV cao cấp nhập khẩu (Porsche, Mercedes-Benz, BMW, Lexus). Đại diện pháp lý CarShop hoàn tất thủ tục đăng ký ra biển số trong 24 giờ.',
    benefits: [
      'Chi trả 100% lệ phí trước bạ thực tế theo barem thuế nhà nước',
      'Đại diện pháp lý đi bấm biển số và đăng kiểm trọn gói miễn phí',
      'Bàn giao xe kèm biển số đẹp và hồ sơ gốc chính chủ trong ngày',
    ],
    expiry: 'Áp dụng đến hết ngày 31/10/2026',
    ctaText: 'Nhận Báo Giá Khấu Trừ Thuế',
    actionType: 'voucher_claim',
  },
  {
    id: 'promo-interest-rate',
    category: ['tax_interest'],
    badge: 'ĐỐI TÁC VIETCOMBANK & TECHCOMBANK',
    title: 'Gói Vay Cố Định Lãi Suất 0% Trong 12 Tháng Đầu Tiên',
    highlightValue: 'Tiết Kiệm Đến 85 Triệu Tiền Lãi',
    desc: 'Hợp tác chiến lược cùng 12 ngân hàng top đầu Việt Nam. Duyệt hạn mức vay tới 85% giá trị xe, phê duyệt hồ sơ tự động chỉ trong 15 phút không cần chứng minh thu nhập phức tạp.',
    benefits: [
      'Cố định lãi suất 0%/năm trong 1 năm đầu, biên độ năm tiếp theo chỉ 2.5%',
      'Hạn mức giải ngân lên tới 85% giá trị định giá xe',
      'Không mất phí thẩm định hồ sơ, không ép mua bảo hiểm nhân thọ kèm theo',
    ],
    expiry: 'Giới hạn 20 suất giải ngân ưu tiên trong tuần',
    ctaText: 'Nhận Dự Toán Trả Góp 0%',
    actionType: 'voucher_claim',
  },
  {
    id: 'promo-trade-in',
    category: ['trade_in'],
    badge: 'CHƯƠNG TRÌNH TRADE-IN SHOWROOM',
    title: 'Thu Cũ Đổi Xe Mới: Trợ Giá Khấu Hao Thêm 50 Triệu',
    highlightValue: 'Tặng Thêm 50.000.000 ₫ Khấu Trừ Trực Tiếp',
    desc: 'Mang xe ô tô cũ bất kỳ thương hiệu đến CarShop để lên đời xe lướt cao cấp. Chúng tôi định giá cao hơn thị trường 5 - 10% và trợ giá thêm 50 triệu đồng tiền mặt vào hợp đồng đổi xe.',
    benefits: [
      'Trừ thẳng 50 triệu đồng vào hợp đồng mua xe mới tại showroom',
      'Kỹ sư mang máy quét 176 hạng mục đến tận nhà định giá xe cũ miễn phí trong 30 phút',
      'Hỗ trợ toàn bộ thủ tục giải chấp ngân hàng, rút hồ sơ gốc và sang tên đổi chủ',
    ],
    expiry: 'Chính sách thường niên độc quyền CarShop',
    ctaText: 'Đăng Ký Thu Cũ Đổi Xe Mới',
    actionType: 'voucher_claim',
  },
];

export const PromotionsPage: React.FC = () => {
  const { showToast } = useToast();

  // State Management
  const [selectedCategory, setSelectedCategory] = useState<PromoCategory>('all');
  const [selectedPriceTier, setSelectedPriceTier] = useState<PriceTier>('1000_2000');
  const [activeModal, setActiveModal] = useState<'wash_pass' | 'billion' | 'online_booking' | 'voucher_claim' | null>(null);

  // Form States inside modal
  const [modalForm, setModalForm] = useState({
    fullName: '',
    phone: '',
    interestedCar: '',
    showroomCity: 'TP. Hồ Chí Minh',
    notes: '',
  });

  const [claimedVoucher, setClaimedVoucher] = useState<{
    code: string;
    title: string;
    value: string;
    phone: string;
    name: string;
  } | null>(null);

  // Quick SMS voucher state on hero bar
  const [quickPhone, setQuickPhone] = useState('');
  const [quickSent, setQuickSent] = useState(false);

  // Handle Quick Hero Voucher
  const handleQuickClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone.trim()) {
      showToast('Vui lòng nhập số điện thoại để nhận mã ưu đãi VIP!', 'error');
      return;
    }
    setQuickSent(true);
    showToast('Mã Voucher VIP 20M đã được kích hoạt và gửi qua SMS đến số của bạn!', 'success');
  };

  // Handle Modal Submit
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalForm.fullName.trim() || !modalForm.phone.trim()) {
      showToast('Vui lòng điền đầy đủ họ tên và số điện thoại liên hệ!', 'error');
      return;
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    let promoPrefix = 'CARSHOP-VIP';
    let promoTitle = 'Voucher Ưu Đãi Trực Tiếp';
    let promoValue = 'Trợ Giá 20.000.000 ₫';

    if (activeModal === 'wash_pass') {
      promoPrefix = 'CARWASH-365D';
      promoTitle = 'Thẻ Rửa Xe & Spa 1 Năm VIP Pass';
      promoValue = 'Trị Giá 12.000.000 ₫ (Áp dụng 4.99M hoặc Miễn phí với xe > 1 Tỷ)';
    } else if (activeModal === 'billion') {
      promoPrefix = 'SOVEREIGN-1B';
      promoTitle = 'Gói Đặc Quyền Hoàng Gia Mua Xe > 1 Tỷ';
      promoValue = 'Trọn Bộ 5 Đặc Quyền (Trị Giá Đến 165 Triệu)';
    } else if (activeModal === 'online_booking') {
      promoPrefix = 'ONLINE-BOOK20M';
      promoTitle = 'Đặt Cọc Mua Xe Trực Tuyến';
      promoValue = 'Giảm Trừ 20.000.000 ₫ + Hoàn Tiền 100% Trong 7 Ngày';
    }

    const newCode = `${promoPrefix}-${randomDigits}`;

    setClaimedVoucher({
      code: newCode,
      title: promoTitle,
      value: promoValue,
      phone: modalForm.phone,
      name: modalForm.fullName,
    });

    showToast(`Đăng ký thành công! Mã ưu đãi ${newCode} đã được kích hoạt.`, 'success');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Đã sao chép mã ưu đãi ${code} vào bộ nhớ tạm!`, 'success');
  };

  const handleResetModal = () => {
    setActiveModal(null);
    setClaimedVoucher(null);
    setModalForm({
      fullName: '',
      phone: '',
      interestedCar: '',
      showroomCity: 'TP. Hồ Chí Minh',
      notes: '',
    });
  };

  // Filter logic
  const filteredPromotions = ALL_PROMOTIONS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category.includes(selectedCategory);
  });

  // Dynamic Privilege Calculator Data
  const TIER_DETAILS = {
    under_800: {
      label: 'Dưới 800 Triệu',
      totalValue: '45.000.000 ₫',
      headline: 'Gói Chăm Sóc & An Tâm Khởi Hành',
      gifts: [
        'Voucher trừ tiền mặt 15.000.000 ₫ vào giá xe',
        'Tặng Thẻ Rửa Xe & Chăm Sóc Bọt Tuyết 6 Tháng miễn phí',
        'Gói phủ gầm chống rỉ sét & dán phim cách nhiệt toàn xe',
        'Miễn phí 100% thủ tục công chứng & sang tên đổi chủ trong ngày',
      ],
      downPayment: 'Chỉ từ 160 Triệu nhận xe ngay',
      monthlyEst: 'Từ 7.8 Triệu / tháng (Lãi suất ưu đãi 6.9%)',
    },
    '800_1000': {
      label: '800 Triệu - 1 Tỷ',
      totalValue: '75.000.000 ₫',
      headline: 'Gói Nâng Hạng Tiện Nghi Thượng Hạng',
      gifts: [
        'Voucher trợ giá tiền mặt 25.000.000 ₫',
        'Tặng Thẻ Rửa Xe & Spa Khoang Lái 1 Năm (CarShop VIP Wash Pass)',
        'Tặng 1 Năm Bảo Hiểm Thân Vỏ chính hãng có điều khoản thủy kích',
        'Dán phim cách nhiệt cao cấp 3M Crystalline quang học toàn xe',
        'Cứu hộ khẩn cấp 24/7 toàn quốc trong 1 năm',
      ],
      downPayment: 'Chỉ từ 220 Triệu nhận xe ngay',
      monthlyEst: 'Từ 9.5 Triệu / tháng (Lãi suất ưu đãi 0% 6 tháng)',
    },
    '1000_2000': {
      label: '1 Tỷ - 2 Tỷ (VIP Tier Khuyên Dùng)',
      totalValue: '165.000.000 ₫',
      headline: 'Gói Đặc Quyền Hoàng Gia Xe Trên 1 Tỷ (Billion-Tier Suite)',
      gifts: [
        'TẶNG MIỄN PHÍ Thẻ Rửa Xe & Detailing Ngoại Nội Thất 1 Năm Không Giới Hạn',
        'Hỗ trợ 100% Lệ Phí Trước Bạ & Đăng Ký Biển Số (Trợ giá đến 150 Triệu)',
        'Tặng Gói Phủ Ceramic 9H 3 Lớp & Dán Phim Cách Nhiệt 3M Crystalline',
        'Tặng 2 Năm Bảo Hiểm Thân Vỏ chính hãng toàn diện',
        'Cứu hộ chuyên dụng 2 tầng VIP 24/7 giao nhận xe tận nhà trong 3 năm',
        'Tặng bộ phụ kiện cao cấp chính hãng: Thảm 5D, Camera hành trình 4K',
      ],
      downPayment: 'Chỉ từ 280 Triệu nhận xe ngay',
      monthlyEst: 'Từ 12.8 Triệu / tháng (Lãi suất cố định 0% 12 tháng)',
      isCrown: true,
    },
    over_2000: {
      label: 'Trên 2 Tỷ (Super Luxury)',
      totalValue: '280.000.000 ₫',
      headline: 'Đặc Quyền Tối Thượng Chủ Nhân Siêu Lướt',
      gifts: [
        'Trợ giá tiền mặt trực tiếp lên tới 200.000.000 ₫ vào hợp đồng',
        'Tặng Thẻ Rửa Xe VIP Diamond 1 Năm Không Giới Hạn cho 2 xe của gia đình',
        'Tặng trạm sạc điện thông minh 22kW tại nhà (dành cho Porsche/Taycan/VF9)',
        'Tặng 3 Năm Bảo Hiểm Vật Chất & 3 Năm Bảo Hành Toàn Diện Chính Hãng',
        'Đặc quyền bay trực thăng ngắm cảnh hoặc nghỉ dưỡng 3N2Đ tại resort 6 sao',
      ],
      downPayment: 'Chỉ từ 500 Triệu nhận xe ngay',
      monthlyEst: 'Phương án tài chính cá nhân hóa riêng tư',
      isCrown: true,
    },
  };

  const activeTierData = TIER_DETAILS[selectedPriceTier];

  return (
    <div className="min-h-[100dvh] bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 flex-1 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <Link to={ROUTES.HOME} className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-900 font-bold">Chương Trình Ưu Đãi & Khuyến Mãi Showroom</span>
        </nav>

        {/* HERO SECTION: Architectural Cold Luxury Atelier (Double-Bezel) */}
        <div className="p-1 rounded-[10px] bg-slate-900 shadow-2xl">
          <div className="rounded-[8px] overflow-hidden bg-[#070b14] text-white p-7 sm:p-10 lg:p-12 relative border border-white/10">
            {/* Ambient Lighting Depth */}
            <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Headline & Direct Benefits */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>ĐẶC QUYỀN SHOWROOM THÁNG 10/2026</span>
                </div>

                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12]">
                  Ưu Đãi & Giảm Giá Showroom: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                    Xe &gt; 1 Tỷ & Thẻ Rửa Xe 1 Năm
                  </span>
                </h1>

                <p className="text-slate-300/95 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
                  Tổng hợp mọi chương trình giảm giá và quà tặng hiện có tại hệ thống CarShop: Tặng thẻ rửa xe 365 ngày không giới hạn, trọn bộ 5 đặc quyền dành cho xe trên 1 tỷ, cùng chính sách đặt cọc mua trực tuyến hoàn tiền 100%.
                </p>

                {/* Live Telemetry Badges Strip */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-white/5 border border-white/10">
                    <Droplets size={14} className="text-cyan-400" />
                    <span>Thẻ rửa xe VIP 1 năm không giới hạn</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-white/5 border border-white/10">
                    <Award size={14} className="text-cyan-400" />
                    <span>Đặc quyền xe &gt; 1 Tỷ đến 165M</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-white/5 border border-white/10">
                    <CreditCard size={14} className="text-cyan-400" />
                    <span>Đặt cọc online hoàn tiền 100%</span>
                  </div>
                </div>

                {/* Quick Action Button Group */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModal('billion')}
                    className="group py-2.5 pl-5 pr-2.5 rounded-[8px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-3 transition-all shadow-lg shadow-blue-500/25 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Xem Đặc Quyền Xe &gt; 1 Tỷ</span>
                    <span className="w-7 h-7 rounded-[6px] bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight size={14} className="text-white" />
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModal('wash_pass')}
                    className="group py-2.5 pl-5 pr-2.5 rounded-[8px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-3 border border-white/15 transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <span>Mua Thẻ Rửa Xe 1 Năm</span>
                    <span className="w-7 h-7 rounded-[6px] bg-white/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <Droplets size={14} className="text-cyan-300" />
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Spotlight (Double-Bezel Preview) */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[16/10] rounded-[8px] overflow-hidden border border-white/15 shadow-2xl bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&auto=format&fit=crop&q=85"
                    alt="Chương trình ưu đãi xe sang CarShop"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Spotlight Bottom Card */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[8px] bg-slate-950/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block">
                        CAM KẾT BẰNG VĂN BẢN HỢP ĐỒNG
                      </span>
                      <div className="font-display font-extrabold text-sm text-white truncate">
                        Cộng Dồn 100% Gói Ưu Đãi Độc Lập
                      </div>
                    </div>
                    <span className="font-display font-black text-xs text-emerald-400 shrink-0 bg-emerald-500/10 px-2 py-1 rounded-[6px] border border-emerald-500/20">
                      MINH BẠCH 100%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK VOUCHER ACTIVATION TERMINAL BAR (Double-Bezel) */}
        <div className="p-1 rounded-[10px] bg-slate-900 shadow-xl">
          <div className="rounded-[8px] bg-[#070b14] p-5 sm:p-6 text-white border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={13} className="text-cyan-400" />
                  <span>KÍCH HOẠT MÃ TRỢ GIÁ TRỰC TUYẾN</span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                  Nhận Mã Giảm Trực Tiếp 20.000.000 ₫ Qua SMS
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Nhập số điện thoại để nhận mã Voucher điện tử, áp dụng khấu trừ thẳng vào hợp đồng mua bất kỳ xe nào hoặc đổi thành quà tặng phụ kiện chính hãng.
                </p>
              </div>

              <div className="lg:col-span-6">
                {quickSent ? (
                  <div className="bg-white/10 backdrop-blur-md rounded-[8px] p-4 text-center border border-white/15 space-y-2 animate-fade-in">
                    <div className="w-10 h-10 rounded-[8px] bg-emerald-500 text-white flex items-center justify-center mx-auto">
                      <Check size={20} />
                    </div>
                    <h4 className="font-bold text-sm text-white">Mã Voucher VIP Đã Kích Hoạt!</h4>
                    <p className="text-xs text-slate-300">
                      Mã <span className="font-mono font-bold bg-white text-slate-900 px-2 py-0.5 rounded-[6px]">CARSHOP-ONLINE20M</span> đã được gửi tới số <strong className="text-white">{quickPhone}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuickClaim} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="tel"
                      required
                      placeholder="Nhập số điện thoại nhận mã *"
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-[8px] bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all"
                    />
                    <button
                      type="submit"
                      className="group py-2.5 pl-5 pr-2.5 rounded-[8px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 shrink-0 cursor-pointer active:scale-[0.98]"
                    >
                      <span>Kích Hoạt Ngay</span>
                      <span className="w-7 h-7 rounded-[6px] bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                        <ArrowRight size={14} className="text-white" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: ASYMMETRICAL SPOTLIGHT BENTO (XE > 1 TỶ & THẺ RỬA XE 1 NĂM) */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-[6px] border border-blue-100 inline-block">
              2 CHÍNH SÁCH ĐỘC QUYỀN TRỌNG ĐIỂM
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Gói Xe Trên 1 Tỷ & Thẻ Rửa Xe VIP 365 Ngày
            </h2>
            <p className="text-xs text-slate-500">
              Chi tiết các đặc quyền cao cấp nhất được khách hàng quan tâm hàng đầu tại showroom CarShop.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* CARD A (7 COLS): GÓI ĐẶC QUYỀN XE TRÊN 1 TỶ */}
            <div className="lg:col-span-7 p-1 rounded-[10px] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 shadow-xl group flex flex-col justify-between">
              <div className="rounded-[8px] bg-slate-900/95 p-6 sm:p-8 h-full flex flex-col justify-between border border-white/10 relative overflow-hidden">
                {/* Backlight Glow */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-[8px] text-[10px] font-black uppercase tracking-widest bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                      TIER XE &gt; 1.000.000.000 ₫
                    </span>
                    <span className="font-display font-black text-xs text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-[6px] border border-amber-400/20 flex items-center gap-1">
                      <Sparkles size={12} />
                      QUÀ TẶNG TRỊ GIÁ ĐẾN 165 TRIỆU
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                      Mua Xe Hơn 1 Tỷ Sẽ Nhận Được Gì?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal leading-relaxed">
                      Mọi xe được giao dịch với giá trị trên 1 tỷ đồng tại CarShop đều được tự động kích hoạt bộ 5 đặc quyền bảo hộ tài sản và chăm sóc toàn diện:
                    </p>
                  </div>

                  {/* 5 Distinct Benefits Checklist */}
                  <div className="space-y-3 pt-2">
                    {[
                      {
                        title: 'Tặng Thẻ Rửa Xe & Chăm Sóc Ngoại Thất 1 Năm Không Giới Hạn',
                        desc: 'Rửa xe bọt tuyết trung tính, hút bụi nội thất không giới hạn 365 ngày (Trị giá 25.000.000 ₫).',
                        icon: Droplets,
                      },
                      {
                        title: 'Tặng Gói Phủ Ceramic 9H 3 Lớp & Phim Cách Nhiệt 3M Crystalline',
                        desc: 'Bảo vệ độ bóng lớp sơn và cách nhiệt quang học chính hãng chuẩn Đức (Trị giá 35.000.000 ₫).',
                        icon: ShieldCheck,
                      },
                      {
                        title: 'Hỗ Trợ 100% Lệ Phí Trước Bạ & Đăng Ký Biển Số Toàn Quốc',
                        desc: 'Trợ giá trừ thẳng vào hợp đồng mua bán từ 100.000.000 ₫ đến 250.000.000 ₫.',
                        icon: Award,
                      },
                      {
                        title: 'Tặng 2 Năm Bảo Hiểm Thân Vỏ Chính Hãng',
                        desc: 'Bao gồm trọn gói bảo hiểm ngập nước, thủy kích và mất cắp phụ tùng bộ phận.',
                        icon: Lock,
                      },
                      {
                        title: 'Cứu Hộ Chuyên Dụng 2 Tầng VIP 24/7 Toàn Quốc 3 Năm',
                        desc: 'Hỗ trợ xe bàn 2 tầng chuyên dụng đưa đón xe đi bảo dưỡng tận nhà miễn phí.',
                        icon: Zap,
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded-[8px] border border-white/5">
                        <div className="w-8 h-8 rounded-[8px] bg-blue-600/30 text-cyan-300 flex items-center justify-center shrink-0 border border-blue-500/20">
                          <item.icon size={16} />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-xs sm:text-sm text-white">{item.title}</h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed font-normal">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="text-xs text-slate-400">
                    <div>* Áp dụng cộng dồn với gói vay 0% lãi suất</div>
                    <div className="text-cyan-300 font-bold">Cam kết điều khoản pháp lý trong hợp đồng</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModal('billion')}
                    className="group py-2.5 pl-5 pr-2.5 rounded-[8px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-3 transition-all shadow-md cursor-pointer active:scale-[0.98]"
                  >
                    <span>Kích Hoạt Gói Xe &gt; 1 Tỷ</span>
                    <span className="w-7 h-7 rounded-[6px] bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight size={14} className="text-white" />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD B (5 COLS): THẺ RỬA XE & SPA ĐỊNH KỲ 1 NĂM */}
            <div className="lg:col-span-5 p-1 rounded-[10px] bg-slate-100/80 ring-1 ring-black/[0.04] shadow-xl flex flex-col justify-between">
              <div className="rounded-[8px] bg-white p-6 sm:p-7 h-full flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-[6px]">
                      THẺ HỘI VIÊN CARSHOP SPA
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-[6px]">
                      TIẾT KIỆM 58%
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
                      Đăng Ký Mua Thẻ Rửa Xe 1 Năm
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Gói dịch vụ cao cấp giữ trọn vẻ bóng bẩy cho xế cưng tại chuỗi CarShop Atelier toàn quốc. Mua trực tiếp trực tuyến hoặc tặng miễn phí khi mua xe &gt; 1 Tỷ.
                    </p>
                  </div>

                  {/* Simulated Luxury Black Metal NFC Pass Card */}
                  <div className="p-4 rounded-[8px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-xl ring-1 ring-white/10 space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

                    <div className="flex items-center justify-between relative z-10">
                      <span className="font-display font-black text-sm tracking-wider text-cyan-300">
                        CARSHOP PASS 365D
                      </span>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                        VIP CONCIERGE
                      </span>
                    </div>

                    <div className="space-y-1 relative z-10">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">GIÁ ƯU ĐÃI TRỰC TUYẾN</div>
                      <div className="font-display font-black text-2xl text-white">
                        4.990.000 ₫ <span className="text-xs font-normal line-through text-slate-400">12.000.000 ₫</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-semibold">
                        ★ Miễn phí 100% khi mua bất kỳ xe nào &gt; 1 Tỷ
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/10 relative z-10">
                      <span>Hiệu lực: 365 Ngày Kích Hoạt</span>
                      <span className="font-mono text-cyan-300 font-bold">UNLIMITED WASH</span>
                    </div>
                  </div>

                  {/* Pass Perks Summary */}
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>Rửa xe bọt tuyết trung tính & hút bụi khoang lái không giới hạn 365 ngày</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>12 lần dưỡng da ghế & xông tinh dầu khử khuẩn ozone</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>04 lần tẩy ố mốc kính, tẩy nhựa đường và khử bụi sơn</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>02 lần phủ sáp Ceramic chống bám nước bảo vệ sơn</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    Kích hoạt mã điện tử qua SMS trong 5 phút
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModal('wash_pass')}
                    className="group py-2.5 pl-4 pr-2 rounded-[8px] bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    <span>Mua Thẻ Trực Tuyến</span>
                    <span className="w-6 h-6 rounded-[6px] bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight size={13} className="text-white" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ĐẶT CỌC & MUA XE TRỰC TUYẾN (DOUBLE-BEZEL BANNER) */}
        <section className="p-1 rounded-[10px] bg-slate-100/80 ring-1 ring-black/[0.04] shadow-xl">
          <div className="rounded-[8px] bg-white p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-[6px] inline-block mb-1">
                  ĐẶC QUYỀN MUA XE ONLINE 2026
                </span>
                <h3 className="font-display font-black text-2xl text-slate-900 tracking-tight">
                  Đăng Ký Đặt Cọc & Mua Xe Trực Tuyến: Giảm Thêm 20 Triệu
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Chỉ cần đặt cọc 10 triệu giữ xe online, nhận ngay voucher giảm 20 triệu vào hợp đồng và quyền trải nghiệm lái thử tại nhà với cam kết hoàn cọc 100% trong 7 ngày.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModal('online_booking')}
                  className="group py-2.5 pl-4 pr-2.5 rounded-[8px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-[0.98]"
                >
                  <span>Đăng Ký Mua Trực Tuyến</span>
                  <span className="w-6 h-6 rounded-[6px] bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight size={13} className="text-white" />
                  </span>
                </button>

                <Link
                  to={ROUTES.BUY_CAR}
                  className="py-2.5 px-4 rounded-[8px] bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs sm:text-sm transition-all"
                >
                  Xem Kho Xe Sẵn Có
                </Link>
              </div>
            </div>

            {/* 3 Steps Timeline for Online Purchase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-[8px] bg-slate-50 ring-1 ring-black/[0.03] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-[6px] bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                    01
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">Đặt Cọc Giữ Xe 10 Triệu</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Khóa giá niêm yết độc quyền 7 ngày qua cổng thanh toán bảo mật. Giảm thêm ngay <strong className="text-blue-600">20.000.000 ₫</strong> vào giá xe.
                </p>
              </div>

              <div className="p-4 rounded-[8px] bg-slate-50 ring-1 ring-black/[0.03] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-[6px] bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    02
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">Giao Xe Tận Nhà Lái Thử 24h</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Xe cứu hộ 2 tầng chuyên dụng đưa xe đến tận địa chỉ của quý khách kèm kỹ sư mang máy quét 176 hạng mục kiểm định ISO.
                </p>
              </div>

              <div className="p-4 rounded-[8px] bg-slate-50 ring-1 ring-black/[0.03] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-[6px] bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    03
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">Hoàn Cọc 100% Trong 7 Ngày</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Nếu sau khi lái thử không hài lòng hoặc xe không đúng cam kết chất lượng, CarShop hoàn trả 100% tiền cọc tự động qua tài khoản trong 15 phút.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE PRIVILEGE CALCULATOR BY PRICE TIER */}
        <section className="p-1 rounded-[10px] bg-slate-900 shadow-xl">
          <div className="rounded-[8px] bg-[#070b14] text-white p-6 sm:p-8 space-y-6 border border-white/10">
            <div className="space-y-1 border-b border-white/10 pb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                BỘ TÍNH ĐẶC QUYỀN TRỰC QUAN THEO MỨC GIÁ XE
              </span>
              <h3 className="font-display font-black text-2xl text-white tracking-tight">
                Khám Phá Ưu Đãi Nhận Được Theo Giá Trị Xe Dự Kiến
              </h3>
              <p className="text-xs text-slate-400">
                Chọn khoảng giá xe bạn đang quan tâm để hệ thống tính toán tức thì các gói quà tặng và mức khấu trừ cao nhất.
              </p>
            </div>

            {/* Price Tier Segmented Toggle */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-1 rounded-[8px] bg-white/5 border border-white/10">
              {(
                [
                  { id: 'under_800', label: 'Dưới 800 Triệu', isCrown: false },
                  { id: '800_1000', label: '800Tr - 1 Tỷ', isCrown: false },
                  { id: '1000_2000', label: '1 Tỷ - 2 Tỷ (VIP)', isCrown: true },
                  { id: 'over_2000', label: 'Trên 2 Tỷ (Super)', isCrown: true },
                ] as const
              ).map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedPriceTier(tier.id)}
                  className={`py-3 px-3 rounded-[8px] text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedPriceTier === tier.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tier.isCrown && <Sparkles size={13} className="text-amber-300 shrink-0" />}
                  <span>{tier.label}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Result Box */}
            <div className="bg-white/5 p-6 rounded-[8px] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                    {activeTierData.label} • {activeTierData.headline}
                  </div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-white">
                    Tổng Giá Trị Quà Tặng: <span className="text-cyan-300">{activeTierData.totalValue}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-200">Danh mục đặc quyền được áp dụng tự động:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {activeTierData.gifts.map((g, i) => (
                      <div key={i} className="flex items-start gap-2 bg-white/5 p-2 rounded-[6px] border border-white/5">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-950/80 p-5 rounded-[8px] border border-white/10 space-y-3.5 text-center sm:text-left">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">PHƯƠNG ÁN TÀI CHÍNH SHOWROOM</span>
                  <div className="font-bold text-xs text-emerald-400">{activeTierData.downPayment}</div>
                  <div className="text-xs text-slate-300 font-mono">{activeTierData.monthlyEst}</div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (selectedPriceTier === '1000_2000' || selectedPriceTier === 'over_2000') {
                      setActiveModal('billion');
                    } else {
                      setActiveModal('voucher_claim');
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-[8px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-[0.98]"
                >
                  <Sparkles size={14} />
                  <span>Kích Hoạt Gói {activeTierData.label}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ALL 6 ACTIVE SHOWROOM PROMOTIONS WITH CATEGORY TABS */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-[6px] border border-blue-100 inline-block">
                DANH MỤC KHUYẾN MÃI CHI TIẾT
              </span>
              <h2 className="font-display font-black text-2xl text-slate-900 tracking-tight">
                6 Gói Giảm Giá & Ưu Đãi Đang Diễn Ra
              </h2>
            </div>

            {/* Segmented Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-[8px] bg-slate-100 ring-1 ring-black/[0.04]">
              {(
                [
                  { id: 'all', label: 'Tất cả' },
                  { id: 'billion', label: 'Xe > 1 Tỷ' },
                  { id: 'wash_pass', label: 'Thẻ Rửa Xe' },
                  { id: 'online', label: 'Mua Online' },
                  { id: 'tax_interest', label: 'Thuế & Lãi Suất' },
                  { id: 'trade_in', label: 'Thu Cũ Đổi Mới' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white text-blue-600 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromotions.map((promo) => (
              <div
                key={promo.id}
                className="p-1 rounded-[10px] bg-slate-100/80 ring-1 ring-black/[0.04] shadow-xl flex flex-col justify-between group hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-[6px] text-[10px] font-bold bg-blue-50 text-blue-700 uppercase tracking-wider truncate">
                        {promo.badge}
                      </span>
                      {promo.isHot && (
                        <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-black bg-rose-500 text-white shrink-0 animate-pulse">
                          HOT DEAL
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display font-black text-lg text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                        {promo.title}
                      </h3>
                      <div className="font-display font-black text-xl text-blue-600 mt-1 font-mono">
                        {promo.highlightValue}
                      </div>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {promo.desc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3">
                      {promo.benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 space-y-3 mt-4">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <Clock size={12} />
                      <span>{promo.expiry}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModal(promo.actionType)}
                      className="group w-full py-2.5 pl-4 pr-2 rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-between transition-all shadow-xs cursor-pointer active:scale-[0.98]"
                    >
                      <span>{promo.ctaText}</span>
                      <span className="w-6 h-6 rounded-[6px] bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                        <ArrowRight size={13} className="text-white" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: REFERENCE VEHICLE PRICE TABLE AFTER INCENTIVES */}
        <section className="p-1 rounded-[10px] bg-slate-100/80 ring-1 ring-black/[0.04] shadow-xl">
          <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                  BẢNG GIÁ XE THAM KHẢO SHOWROOM
                </span>
                <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">
                  Biểu Giá Lăn Bánh Sau Khấu Trừ Ưu Đãi (Tháng 10/2026)
                </h3>
              </div>
              <Link
                to={ROUTES.BUY_CAR}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Xem toàn bộ xe trong kho</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="overflow-x-auto rounded-[8px] ring-1 ring-black/[0.05]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-extrabold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Mẫu Xe & Phiên Bản</th>
                    <th className="py-3 px-4">Đời Xe</th>
                    <th className="py-3 px-4">Giá Niêm Yết</th>
                    <th className="py-3 px-4">Đặc Quyền Kèm Theo</th>
                    <th className="py-3 px-4">Giá Sau Khấu Trừ</th>
                    <th className="py-3 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    {
                      name: 'Porsche Taycan 4S Cross Turismo',
                      year: '2024',
                      tier: 'Xe > 1 Tỷ',
                      listedPrice: '4.850 Tỷ',
                      discount: 'Tặng Thẻ rửa xe 1 năm + 100% trước bạ + Trạm sạc 22kW',
                      finalPrice: '4.650 Tỷ',
                      link: '/cars/taycan',
                    },
                    {
                      name: 'Mercedes-Benz GLC 300 4MATIC',
                      year: '2024',
                      tier: 'Xe > 1 Tỷ',
                      listedPrice: '2.799 Tỷ',
                      discount: 'Tặng Thẻ rửa xe 1 năm + Phủ Ceramic + 2 Năm bảo hiểm',
                      finalPrice: '2.699 Tỷ',
                      link: ROUTES.BUY_CAR,
                    },
                    {
                      name: 'BMW 530i M Sport LCI',
                      year: '2023',
                      tier: 'Xe > 1 Tỷ',
                      listedPrice: '2.599 Tỷ',
                      discount: 'Tặng Thẻ rửa xe 1 năm + Lãi suất 0% 12T + Giảm 100M',
                      finalPrice: '2.499 Tỷ',
                      link: ROUTES.BUY_CAR,
                    },
                    {
                      name: 'VinFast VF 9 Plus (Pin SDI)',
                      year: '2024',
                      tier: 'Xe > 1 Tỷ',
                      listedPrice: '1.890 Tỷ',
                      discount: 'Tặng Thẻ rửa xe 1 năm + Miễn phí sạc pin 2 năm + Trợ giá 50M',
                      finalPrice: '1.840 Tỷ',
                      link: ROUTES.BUY_CAR,
                    },
                    {
                      name: 'Mazda CX-5 2.0L Premium',
                      year: '2023',
                      tier: 'Dưới 800Tr',
                      listedPrice: '780 Triệu',
                      discount: 'Tặng Thẻ rửa xe 6 tháng + Dán phim 3M + Trợ giá 15M',
                      finalPrice: '765 Triệu',
                      link: ROUTES.BUY_CAR,
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <div>{row.name}</div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-[4px]">
                          {row.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-mono">{row.year}</td>
                      <td className="py-3 px-4 text-slate-400 line-through font-mono">{row.listedPrice}</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">{row.discount}</td>
                      <td className="py-3 px-4 font-display font-black text-blue-600 text-sm font-mono">
                        {row.finalPrice}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={row.link}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[8px] bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-bold text-xs transition-all cursor-pointer"
                        >
                          <span>Xem Xe</span>
                          <ChevronRight size={13} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 6: INSTITUTIONAL COMMITMENTS & TRANSPARENCY MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-1 rounded-[10px] bg-white ring-1 ring-black/[0.04] shadow-sm">
            <div className="p-5 rounded-[8px] bg-slate-50/60 space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-blue-600 text-white flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-display font-extrabold text-sm text-slate-900">
                Cam Kết Minh Bạch Hợp Đồng
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Toàn bộ chính sách quà tặng, thẻ rửa xe 1 năm và các khoản trợ giá thuế trước bạ đều được ghi nhận bằng điều khoản có hiệu lực pháp lý trong hợp đồng mua bán chính thức.
              </p>
            </div>
          </div>

          <div className="p-1 rounded-[10px] bg-white ring-1 ring-black/[0.04] shadow-sm">
            <div className="p-5 rounded-[8px] bg-slate-50/60 space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-emerald-600 text-white flex items-center justify-center">
                <Award size={20} />
              </div>
              <h4 className="font-display font-extrabold text-sm text-slate-900">
                100% Phụ Kiện Chính Hãng
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Phim cách nhiệt 3M Crystalline, lớp phủ gốm Ceramic 9H và hóa chất chăm sóc xe Sonax đều có giấy chứng nhận CO/CQ xuất xứ chính hãng từ đại diện ủy quyền tại Việt Nam.
              </p>
            </div>
          </div>

          <div className="p-1 rounded-[10px] bg-white ring-1 ring-black/[0.04] shadow-sm">
            <div className="p-5 rounded-[8px] bg-slate-50/60 space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-slate-900 text-white flex items-center justify-center">
                <FileCheck2 size={20} />
              </div>
              <h4 className="font-display font-extrabold text-sm text-slate-900">
                Bảo Đảm Hoàn Cọc Online 100%
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Đặt cọc giữ xe trực tuyến hoàn tiền 100% không mất phí trong 7 ngày nếu quý khách lái thử không vừa ý. Xe cứu hộ 2 tầng chuyên dụng giao nhận xe an toàn tận nhà trên 63 tỉnh thành.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 7: FAQ ACCORDION ABOUT PROMOTIONS */}
        <section className="p-1 rounded-[10px] bg-slate-100/80 ring-1 ring-black/[0.04] shadow-lg">
          <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                GIẢI ĐÁP QUY CHẾ ƯU ĐÃI SHOWROOM
              </span>
              <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">
                Câu Hỏi Thường Gặp Về Thẻ Rửa Xe, Xe Trên 1 Tỷ & Đặt Mua Online
              </h3>
            </div>

            <div className="space-y-3 pt-2">
              {[
                {
                  q: 'Thẻ rửa xe 1 năm có áp dụng cho xe mua ngoài showroom CarShop không?',
                  a: 'Có. Khách hàng hoàn toàn có thể đăng ký mua trực tuyến gói Thẻ Rửa Xe & Chăm Sóc Toàn Diện 1 Năm (CarShop VIP Wash Pass) với mức giá trợ giá 4.990.000 ₫/năm (giá gốc 12.000.000 ₫) áp dụng cho bất kỳ ô tô nào. Riêng khách hàng mua xe giá trị trên 1 tỷ tại CarShop sẽ được TẶNG MIỄN PHÍ 100% thẻ này.',
                },
                {
                  q: 'Nếu tôi mua xe có giá đúng 1 tỷ hoặc 1 tỷ 050 triệu thì có được nhận đầy đủ gói đặc quyền xe > 1 Tỷ không?',
                  a: 'Chắc chắn có. Mọi hợp đồng mua bán xe có giá trị thực tế từ 1.000.000.000 ₫ trở lên đều tự động được áp dụng trọn bộ 5 đặc quyền: Tặng thẻ rửa xe 1 năm, Tặng phủ Ceramic 9H + Phim 3M, Hỗ trợ trước bạ, Tặng 2 năm bảo hiểm thân vỏ và 3 năm cứu hộ khẩn cấp 24/7.',
                },
                {
                  q: 'Quy trình đặt cọc trực tuyến 10 triệu và chính sách hoàn tiền 100% diễn ra như thế nào?',
                  a: 'Khi đăng ký giữ xe online, quý khách đặt cọc 10.000.000 ₫ để giữ độc quyền xe trong 7 ngày và nhận voucher trừ thẳng 20.000.000 ₫ vào hợp đồng. CarShop đưa xe đến tận nhà quý khách lái thử. Nếu quý khách phát hiện xe không đúng cam kết 176 điểm hoặc đơn giản là đổi ý, CarShop hoàn trả 100% tiền cọc tự động qua tài khoản trong vòng 15 phút mà không mất bất kỳ chi phí nào.',
                },
                {
                  q: 'Các chương trình ưu đãi này có được cộng dồn với gói hỗ trợ Thu Cũ Đổi Mới không?',
                  a: 'Được cộng dồn hoàn toàn độc lập. Khách hàng tham gia chương trình Thu Cũ Đổi Mới vẫn được hưởng khoản trợ giá thêm 50 triệu đồng của Trade-In, đồng thời giữ nguyên các ưu đãi của xe mới (kể cả quà tặng xe trên 1 tỷ và thẻ rửa xe).',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-[8px] bg-slate-50 ring-1 ring-black/[0.03] space-y-1.5">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-[6px] bg-blue-600 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 pl-7 leading-relaxed font-normal">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. INTERACTIVE CLAIM MODAL (Double-Bezel Architecture) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="p-1 rounded-[10px] bg-slate-100/90 shadow-2xl max-w-lg w-full ring-1 ring-black/[0.05]">
            <div className="bg-white rounded-[8px] p-6 sm:p-7 space-y-5 relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={handleResetModal}
                className="absolute top-4 right-4 p-1.5 rounded-[8px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                title="Đóng"
              >
                <X size={18} />
              </button>

              {claimedVoucher ? (
                /* E-VOUCHER CERTIFICATE PRESENTATION */
                <div className="text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-[8px] bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={28} />
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                      ĐĂNG KÝ KÍCH HOẠT THÀNH CÔNG
                    </span>
                    <h3 className="font-display font-black text-xl text-slate-900 mt-1">
                      Chứng Nhận Ưu Đãi Điện Tử VIP
                    </h3>
                  </div>

                  {/* High-End Simulated Digital Certificate Card */}
                  <div className="p-4 rounded-[8px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white text-left space-y-3.5 border border-cyan-500/30 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-display font-black text-xs text-cyan-300 tracking-wider">
                        CARSHOP OFFICIAL VIP CERTIFICATE
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-[4px] border border-emerald-500/30">
                        ĐÃ XÁC THỰC
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">GÓI ĐẶC QUYỀN ÁP DỤNG</div>
                      <div className="font-display font-bold text-sm text-white">{claimedVoucher.title}</div>
                      <div className="text-xs text-cyan-300 font-semibold">{claimedVoucher.value}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                      <div>
                        <span className="text-[9px] text-slate-400 block">CHỦ SỞ HỮU:</span>
                        <strong className="text-white">{claimedVoucher.name}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block">SỐ ĐIỆN THOẠI:</span>
                        <strong className="text-white font-mono">{claimedVoucher.phone}</strong>
                      </div>
                    </div>

                    {/* Voucher Code Box */}
                    <div className="p-2.5 rounded-[6px] bg-white/10 border border-white/15 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase">MÃ ƯU ĐÃI VIP:</span>
                        <span className="font-mono font-black text-sm text-amber-300 tracking-wider">
                          {claimedVoucher.code}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(claimedVoucher.code)}
                        className="p-1.5 rounded-[6px] bg-white/15 hover:bg-white/25 text-white cursor-pointer transition-colors"
                        title="Sao chép mã"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Chuyên viên cố vấn dịch vụ CarShop sẽ liên hệ qua số <strong className="text-slate-900">{claimedVoucher.phone}</strong> trong vòng 15 phút để hoàn tất thủ tục giao xe tận nhà hoặc gửi thẻ cứng tận nơi.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetModal}
                      className="w-full py-2.5 rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Đã Lưu Mã & Đóng Cửa Sổ
                    </button>
                  </div>
                </div>
              ) : (
                /* REGISTRATION FORM */
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div className="space-y-1 pb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                      PHIẾU ĐĂNG KÝ TRỰC TUYẾN 2026
                    </span>
                    <h3 className="font-display font-black text-lg text-slate-900">
                      {activeModal === 'wash_pass' && 'Đăng Ký Mua Thẻ Rửa Xe 1 Năm (CarShop VIP Wash Pass)'}
                      {activeModal === 'billion' && 'Đăng Ký Nhận Gói Đặc Quyền Mua Xe Trên 1 Tỷ'}
                      {activeModal === 'online_booking' && 'Đặt Cọc Mua Xe Online: Giảm 20 Triệu & Hoàn Cọc 7 Ngày'}
                      {activeModal === 'voucher_claim' && 'Kích Hoạt Mã Voucher Trợ Giá Trực Tiếp'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Vui lòng nhập thông tin chính xác để chuyên viên gửi mã e-Voucher và kích hoạt dịch vụ cho bạn.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Họ và tên quý khách *</label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Nguyễn Văn Hiển"
                        value={modalForm.fullName}
                        onChange={(e) => setModalForm({ ...modalForm, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[8px] bg-slate-50 ring-1 ring-slate-200/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Số điện thoại nhận mã SMS *</label>
                      <input
                        type="tel"
                        required
                        placeholder="VD: 0988 888 888"
                        value={modalForm.phone}
                        onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[8px] bg-slate-50 ring-1 ring-slate-200/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Mẫu xe hoặc dịch vụ quan tâm</label>
                      <input
                        type="text"
                        placeholder="VD: Porsche Taycan, Mercedes GLC 300, hoặc Thẻ rửa xe VIP..."
                        value={modalForm.interestedCar}
                        onChange={(e) => setModalForm({ ...modalForm, interestedCar: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[8px] bg-slate-50 ring-1 ring-slate-200/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Showroom khu vực tiếp nhận</label>
                      <select
                        value={modalForm.showroomCity}
                        onChange={(e) => setModalForm({ ...modalForm, showroomCity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[8px] bg-slate-50 ring-1 ring-slate-200/70 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="TP. Hồ Chí Minh">Showroom TP. Hồ Chí Minh (Quận 7 / TP. Thủ Đức)</option>
                        <option value="Hà Nội">Showroom Hà Nội (Cầu Giấy / Long Biên)</option>
                        <option value="Đà Nẵng">Showroom Đà Nẵng (Hải Châu)</option>
                        <option value="Giao tận nhà toàn quốc">Yêu cầu giao nhận xe tận nhà (63 tỉnh thành)</option>
                      </select>
                    </div>

                    {activeModal === 'online_booking' && (
                      <div className="p-3 rounded-[8px] bg-blue-50 border border-blue-100 text-blue-900 space-y-1">
                        <div className="font-bold text-[11px] flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-blue-600" />
                          <span>Cam kết hoàn tiền cọc 100% trong 7 ngày</span>
                        </div>
                        <p className="text-[11px] text-blue-700 leading-relaxed font-normal">
                          Sau khi gửi phiếu đăng ký, chuyên viên CarShop sẽ gửi đường link cổng thanh toán cọc giữ xe 10.000.000 ₫ bảo mật và điều phối xe lái thử tận nhà.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group w-full py-2.5 pl-5 pr-2.5 rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-between transition-all shadow-md cursor-pointer active:scale-[0.98]"
                    >
                      <span>Xác Nhận Đăng Ký Kích Hoạt Ngay</span>
                      <span className="w-7 h-7 rounded-[6px] bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                        <ArrowRight size={14} className="text-white" />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
