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
  Check
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ROUTES } from '../../constants';
import { useToast } from '../../contexts/ToastContext';

interface PromoPackage {
  id: string;
  badge: string;
  title: string;
  value: string;
  desc: string;
  benefits: string[];
  expiry: string;
  isHot?: boolean;
}

const PROMO_PACKAGES: PromoPackage[] = [
  {
    id: 'pkg-1',
    badge: 'ĐẶC QUYỀN THÁNG NÀY',
    title: 'Hỗ Trợ 100% Lệ Phí Trước Bạ',
    value: 'Lên đến 250 Triệu',
    desc: 'Áp dụng cho toàn bộ dòng xe Đức nhập khẩu nguyên chiếc (Porsche, Mercedes-Benz, BMW, Audi) sẵn giao ngay tại showroom.',
    benefits: [
      'Miễn phí 100% thuế trước bạ đăng ký biển số',
      'Hỗ trợ đăng ký trọn gói trong 24 giờ',
      'Giao xe tận nhà bằng xe chuyên dụng miễn phí',
    ],
    expiry: 'Còn 6 ngày (Kết thúc cuối tháng)',
    isHot: true,
  },
  {
    id: 'pkg-2',
    badge: 'GÓI TÀI CHÍNH VPBANK & TECHCOMBANK',
    title: 'Lãi Suất 0% 12 Tháng Đầu',
    value: 'Tiết kiệm 80 Triệu',
    desc: 'Gói vay trả góp ưu đãi độc quyền liên kết các ngân hàng hàng đầu, thời gian vay tối đa đến 84 tháng.',
    benefits: [
      'Lãi suất cố định 0% trong 1 năm đầu tiên',
      'Hạn mức vay lên đến 85% giá trị xe',
      'Phê duyệt hồ sơ trong vòng 15 phút',
    ],
    expiry: 'Áp dụng cho 20 khách hàng đầu tiên',
    isHot: true,
  },
  {
    id: 'pkg-3',
    badge: 'CHƯƠNG TRÌNH TRADE-IN',
    title: 'Thu Cũ Đổi Mới Trợ Giá 50 Triệu',
    value: 'Trợ giá 50.000.000 VNĐ',
    desc: 'Đổi xe ô tô cũ bất kỳ thương hiệu lấy xe lướt cao cấp tại CarShop với mức trợ giá khấu hao cao nhất thị trường.',
    benefits: [
      'Trừ thẳng 50 triệu vào hợp đồng xe mới',
      'Định giá xe cũ tận nơi trong 30 phút',
      'Thủ tục pháp lý rút hồ sơ sang tên trọn gói',
    ],
    expiry: 'Áp dụng liên tục trong năm 2026',
  },
  {
    id: 'pkg-4',
    badge: 'GÓI CHĂM SÓC TOÀN DIỆN',
    title: 'Combo Bảo Hiểm Vật Chất & Phủ Ceramic',
    value: 'Trị giá 35 Triệu',
    desc: 'Bảo vệ xế hộp toàn diện với gói bảo hiểm chính hãng và phủ bóng sứ bảo vệ sơn xe chuẩn công nghệ Đức.',
    benefits: [
      'Tặng 2 năm bảo hiểm vật chất thân vỏ xe',
      'Gói phủ Ceramic 9H cao cấp 3 lớp',
      'Dán phim cách nhiệt 3M Crystalline cao cấp',
    ],
    expiry: 'Áp dụng cho tất cả hợp đồng trong tuần',
  },
];

export const PromotionsPage: React.FC = () => {
  const { showToast } = useToast();
  const [promoCodeSent, setPromoCodeSent] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');

  const handleClaimPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone.trim()) {
      showToast('Vui lòng nhập số điện thoại để nhận mã ưu đãi!', 'error');
      return;
    }
    setPromoCodeSent(true);
    showToast('Mã Voucher VIP đã được gửi qua tin nhắn SMS tới số điện thoại của bạn!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-900 font-sans selection:bg-[#0066ff] selection:text-white flex flex-col justify-between">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 flex-1 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
          <Link to={ROUTES.HOME} className="hover:text-blue-600 transition-colors font-medium">
            Trang chủ
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold">Bảng Giá & Ưu Đãi Đặc Quyền</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <Gift size={14} />
              <span>Đại Tiệc Ưu Đãi Showroom CarShop 2026</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Bảng Giá Xe & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">
                Ưu Đãi Lên Đến 250 Triệu
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Nhận ngay các gói hỗ trợ 100% lệ phí trước bạ, lãi suất vay 0% 12 tháng đầu cùng quà tặng bảo hiểm vật chất chính hãng khi chốt xe trong tháng này.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 lg:opacity-30 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&auto=format&fit=crop&q=80"
              alt="Promotions banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Voucher Claim Form Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase">
                <Sparkles size={13} />
                <span>MÃ VOUCHER ĐẶC BIỆT</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Nhận Mã Giảm Thêm 20.000.000 VNĐ
              </h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Nhập số điện thoại để nhận mã ưu đãi gửi qua tin nhắn SMS, áp dụng trực tiếp khi mua xe tại bất kỳ showroom CarShop trên toàn quốc.
              </p>
            </div>

            <div className="lg:col-span-6">
              {promoCodeSent ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 animate-fade-in space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center mx-auto font-bold">
                    <Check size={20} />
                  </div>
                  <h4 className="font-bold text-sm text-white">Mã Voucher Đã Gửi Thành Công!</h4>
                  <p className="text-xs text-blue-100">
                    Mã <span className="font-mono font-bold bg-white text-blue-900 px-2 py-0.5 rounded">CARSHOP-VIP20M</span> đã được gửi tới số <span className="font-bold">{customerPhone}</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleClaimPromo} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Họ và tên của bạn"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại nhận mã *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Gift size={18} />
                    <span>Lấy Mã Khuyến Mãi Ngay</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Promo Packages Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              CÁC GÓI ƯU ĐÃI ĐANG KÍCH HOẠT
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              Chính Sách Khuyến Mãi Độc Quyền
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Có thể cộng dồn ưu đãi với chương trình Thu Cũ Đổi Mới và gói vay ngân hàng liên kết.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROMO_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wider">
                      {pkg.badge}
                    </span>
                    {pkg.isHot && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white animate-pulse">
                        HOT DEAL
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900">{pkg.title}</h3>
                    <div className="font-display font-extrabold text-2xl text-blue-600 mt-1">
                      {pkg.value}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{pkg.desc}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {pkg.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock size={14} />
                    <span>{pkg.expiry}</span>
                  </div>

                  <Link
                    to={ROUTES.BUY_CAR}
                    className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                  >
                    <span>Xem Xe Áp Dụng</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hot Car Price Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                BẢNG GIÁ THAM KHẢO SHOWROOM
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                Bảng Giá Lăn Bánh Sau Ưu Đãi
              </h3>
            </div>
            <Link
              to={ROUTES.BUY_CAR}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Xem toàn bộ 1,250+ xe trong kho</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Mẫu Xe & Phiên Bản</th>
                  <th className="py-3 px-4">Đời Xe</th>
                  <th className="py-3 px-4">Giá Niêm Yết</th>
                  <th className="py-3 px-4">Ưu Đãi Đặc Biệt</th>
                  <th className="py-3 px-4">Giá Sau Ưu Đãi</th>
                  <th className="py-3 px-4 text-right">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    name: 'Porsche Taycan 4S Cross Turismo',
                    year: '2024',
                    listedPrice: '4.850 Tỷ',
                    discount: 'Tặng 100% trước bạ + Trạm sạc 22kW',
                    finalPrice: '4.650 Tỷ',
                    link: '/cars/taycan',
                  },
                  {
                    name: 'Mercedes-Benz GLC 300 4MATIC',
                    year: '2024',
                    listedPrice: '2.799 Tỷ',
                    discount: 'Giảm 100 triệu + 2 Năm bảo hiểm',
                    finalPrice: '2.699 Tỷ',
                    link: ROUTES.BUY_CAR,
                  },
                  {
                    name: 'BMW 530i M Sport LCI',
                    year: '2023',
                    listedPrice: '2.599 Tỷ',
                    discount: 'Lãi suất 0% 12T + Bảo dưỡng 3 năm',
                    finalPrice: '2.499 Tỷ',
                    link: ROUTES.BUY_CAR,
                  },
                  {
                    name: 'VinFast VF 9 Plus (Pin SDI)',
                    year: '2024',
                    listedPrice: '1.890 Tỷ',
                    discount: 'Sạc pin miễn phí 2 năm + Trợ giá 50M',
                    finalPrice: '1.840 Tỷ',
                    link: ROUTES.BUY_CAR,
                  },
                  {
                    name: 'Audi Q7 45 TFSI Quattro',
                    year: '2023',
                    listedPrice: '2.980 Tỷ',
                    discount: 'Giảm 120 triệu tiền mặt',
                    finalPrice: '2.860 Tỷ',
                    link: ROUTES.BUY_CAR,
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{row.year}</td>
                    <td className="py-3.5 px-4 text-slate-400 line-through">{row.listedPrice}</td>
                    <td className="py-3.5 px-4 text-rose-600 font-semibold">{row.discount}</td>
                    <td className="py-3.5 px-4 font-display font-extrabold text-blue-600 text-base">
                      {row.finalPrice}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={row.link}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xs transition-all"
                      >
                        <span>Chi Tiết</span>
                        <ChevronRight size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};
