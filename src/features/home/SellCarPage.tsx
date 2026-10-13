import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Banknote,
  FileCheck2,
  Phone,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Car,
  Award,
  AlertCircle,
  HelpCircle,
  Camera,
  MapPin,
  Check
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ROUTES } from '../../constants';
import { useToast } from '../../contexts/ToastContext';

export const SellCarPage: React.FC = () => {
  const { showToast } = useToast();
  const [tradeType, setTradeType] = useState<'sell_only' | 'trade_in'>('trade_in');
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    brand: 'Mercedes-Benz',
    model: '',
    year: '2022',
    odo: '',
    plateCity: 'Hà Nội',
    condition: 'Chưa từng đâm đụng, bảo dưỡng hãng đầy đủ',
    expectedPrice: '',
    targetCar: 'Porsche Taycan 4S Cross Turismo',
    fullName: '',
    phone: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.model.trim() || !formData.phone.trim()) {
      showToast('Vui lòng điền đầy đủ dòng xe và số điện thoại liên hệ!', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Đã gửi yêu cầu thẩm định xe thành công! Chuyên viên CarShop sẽ liên hệ trong 15 phút.', 'success');
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
          <span className="text-slate-900 font-semibold">Bán Xe & Thu Cũ Đổi Mới</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Chương Trình Thu Cũ Đổi Mới Trợ Giá 50 Triệu</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Bán Xe Giá Tốt Nhất <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Giải Ngân Trong 2 Giờ
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              CarShop thu mua xe sang đã qua sử dụng với mức giá cao hơn thị trường từ 5 - 10%. Thẩm định tận nơi miễn phí, hỗ trợ sang tên trọn gói và thanh toán tiền mặt 100% tức thì.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-400" />
                <span>Không ép giá - Báo giá minh bạch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-400" />
                <span>Thẩm định xe tận nhà sau 30 phút</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 lg:opacity-30 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop&q=80"
              alt="Sell car banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 2 Columns: Form Thẩm Định (Left 7) | Lợi Ích & Quy Trình (Right 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Left */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                FORM ĐĂNG KÝ BÁN XE TRỰC TUYẾN
              </span>
              <h2 className="font-display font-bold text-2xl text-slate-900">
                Nhận Báo Giá Sau 15 Phút
              </h2>
              <p className="text-xs text-slate-500">
                Điền thông tin cơ bản về chiếc xe của bạn để hệ thống định giá AI và chuyên gia CarShop đưa ra mức giá tốt nhất.
              </p>
            </div>

            {/* Switch Trade-in vs Sell only */}
            <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setTradeType('trade_in')}
                className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  tradeType === 'trade_in'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <RotateCcw size={16} />
                <span>Thu Cũ Đổi Xe Mới (Trợ giá 50M)</span>
              </button>

              <button
                type="button"
                onClick={() => setTradeType('sell_only')}
                className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  tradeType === 'sell_only'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Banknote size={16} />
                <span>Bán Đứt Nhận Tiền Mặt</span>
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={34} />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Gửi Yêu Cầu Thành Công!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Cảm ơn quý khách <span className="font-bold text-slate-900">{formData.fullName || 'bạn'}</span>. Trưởng phòng thẩm định xe CarShop sẽ gọi điện lại qua số <span className="font-bold text-slate-900">{formData.phone}</span> trong vòng 15 phút để báo giá sơ bộ và sắp xếp lịch xem xe.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
                  >
                    Gửi thêm thông tin xe khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Brand & Model */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hãng sản xuất *
                    </label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    >
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="Porsche">Porsche</option>
                      <option value="BMW">BMW</option>
                      <option value="Audi">Audi</option>
                      <option value="Lexus">Lexus</option>
                      <option value="VinFast">VinFast</option>
                      <option value="Hãng khác">Hãng khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Dòng xe / Phiên bản cụ thể *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: C300 AMG, Taycan 4S, 530i..."
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>
                </div>

                {/* Year & ODO */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Năm sản xuất
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    >
                      {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Số Km đã đi (ODO)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 15,000 km"
                      value={formData.odo}
                      onChange={(e) => setFormData({ ...formData, odo: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Biển số đăng ký
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 30K - Hà Nội, 51K - TP.HCM"
                      value={formData.plateCity}
                      onChange={(e) => setFormData({ ...formData, plateCity: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>
                </div>

                {/* Price Expectation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mức giá bạn mong muốn bán (Tỷ VNĐ)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 2.15 Tỷ (Để trống nếu bạn muốn CarShop định giá)"
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>

                {/* Target Car for Trade-in */}
                {tradeType === 'trade_in' && (
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 space-y-2">
                    <label className="block text-xs font-bold text-blue-900">
                      Mẫu xe bạn muốn đổi tại Showroom CarShop:
                    </label>
                    <input
                      type="text"
                      value={formData.targetCar}
                      onChange={(e) => setFormData({ ...formData, targetCar: e.target.value })}
                      placeholder="VD: Porsche Taycan, Mercedes GLC 300, Lexus RX 350..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-blue-200 text-sm focus:border-blue-600 outline-none"
                    />
                    <p className="text-[11px] text-blue-700">
                      🎁 Áp dụng voucher trợ giá 50.000.000 VNĐ trừ thẳng vào hợp đồng xe mới!
                    </p>
                  </div>
                )}

                {/* Contact Information */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Thông tin liên hệ thẩm định
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Họ và tên chủ xe *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0988 888 888"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Địa chỉ xem xe (Tại nhà hoặc tại Showroom)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Biệt thự Vinhomes Riverside, Long Biên, Hà Nội"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={18} />
                  <span>Gửi Thông Tin & Nhận Báo Giá Ngay</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Quy Trình 4 Bước & Cam Kết */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quy trình thu mua 4 bước */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                QUY TRÌNH THU MUA SIÊU TỐC
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">
                4 Bước Bán Xe Trong 2 Giờ
              </h3>

              <div className="space-y-5">
                {[
                  {
                    step: '01',
                    title: 'Gửi Thông Tin Trực Tuyến',
                    desc: 'Điền thông tin dòng xe, đời xe và số ODO chỉ mất 1 phút tại form bên cạnh.',
                  },
                  {
                    step: '02',
                    title: 'Thẩm Định 176 Hạng Mục Tận Nơi',
                    desc: 'Chuyên gia CarShop đến tận nhà kiểm tra xe miễn phí bằng thiết bị chuẩn đoán chuyên dụng.',
                  },
                  {
                    step: '03',
                    title: 'Chốt Giá Bán Cao Nhất Thị Trường',
                    desc: 'Cam kết đưa ra mức giá tốt nhất, cao hơn các đại lý khác từ 20 đến 50 triệu đồng.',
                  },
                  {
                    step: '04',
                    title: 'Ký Công Chứng & Nhận Tiền 100%',
                    desc: 'CarShop hỗ trợ làm thủ tục pháp lý, chuyển khoản toàn bộ tiền xe trong vòng 2 giờ.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 font-extrabold text-xs flex items-center justify-center shrink-0 border border-blue-100">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hộp Hotline Đường Dây Nóng */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-lg space-y-4">
              <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-1.5">
                <Phone size={14} />
                <span>HOTLINE THU MUA XE SANG 24/7</span>
              </div>
              <h4 className="font-display font-bold text-2xl text-white">
                1900 8888 (Nhánh 2)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Quý khách cần bán xe gấp hoặc muốn chuyên viên định giá trực tiếp qua Zalo/Điện thoại ngay lúc này? Hãy gọi ngay đường dây nóng ưu tiên.
              </p>
              <a
                href="tel:19008888"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all block text-center"
              >
                <span>Gọi Chuyên Viên Định Giá Ngay</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};
