import React, { useState } from 'react';
import logoImg from '../../../assets/Logo.png';
import { ShieldCheck, CheckCircle, Clock, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-white text-slate-700 pt-14 pb-5 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Top Tier: Company Summary & 3 Showrooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <Link to={ROUTES.HOME} className="inline-flex items-center">
              <img
                src={logoImg}
                alt="CarShop Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Hệ thống mua bán ô tô cao cấp đã qua sử dụng đạt chứng nhận tiêu chuẩn kiểm định 176 điểm độc quyền.
            </p>

            {/* Badges with 10px rounded borders */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-700">
                <ShieldCheck size={14} className="text-blue-600" />
                <span>Chứng nhận Bộ Công Thương</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-700">
                <CheckCircle size={14} className="text-blue-600" />
                <span>ISO 9001:2015</span>
              </div>
            </div>
          </div>

          {/* Showroom Hà Nội */}
          <div className="lg:col-span-2 sm:col-span-1 space-y-2">
            <h4 className="font-display font-bold text-sm text-slate-900">
              Showroom Hà Nội
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Số 68 Lạc Long Quân, Tây Hồ, Hà Nội
            </p>
            <div className="text-xs text-slate-600 font-medium pt-1">
              Hotline: <span className="text-slate-800 font-semibold">024.3888.8888</span>
            </div>
            <div className="text-[11px] font-semibold text-blue-600 pt-0.5">
              Mở cửa: 08:00 - 20:30
            </div>
          </div>

          {/* Showroom Đà Nẵng */}
          <div className="lg:col-span-3 sm:col-span-1 space-y-2">
            <h4 className="font-display font-bold text-sm text-slate-900">
              Showroom Đà Nẵng
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Số 120 Võ Văn Kiệt, Sơn Trà, Đà Nẵng
            </p>
            <div className="text-xs text-slate-600 font-medium pt-1">
              Hotline: <span className="text-slate-800 font-semibold">0236.788.9999</span>
            </div>
            <div className="text-[11px] font-semibold text-blue-600 pt-0.5">
              Mở cửa: 08:00 - 19:30
            </div>
          </div>

          {/* Showroom TP.HCM */}
          <div className="lg:col-span-3 sm:col-span-1 space-y-2">
            <h4 className="font-display font-bold text-sm text-slate-900">
              Showroom TP.HCM
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Số 88 Lê Duẩn, Bến Nghé, Quận 1
            </p>
            <div className="text-xs text-slate-600 font-medium pt-1">
              Hotline: <span className="text-slate-800 font-semibold">028.3279.7999</span>
            </div>
            <div className="text-[11px] font-semibold text-blue-600 pt-0.5">
              Mở cửa: 08:00 - 21:00
            </div>
          </div>
        </div>

        {/* Middle Tier: Links & Newsletter */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-3">
          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
            <Link to={ROUTES.BUY_CAR} className="hover:text-blue-600 transition-colors">
              Kho Xe Đang Bán
            </Link>
            <Link to={ROUTES.SELL_CAR} className="hover:text-blue-600 transition-colors">
              Bán Xe & Thu Mua
            </Link>
            <Link to={ROUTES.PROMOTIONS} className="hover:text-blue-600 transition-colors">
              Ưu Đãi & Khuyến Mãi
            </Link>
            <Link to={ROUTES.TEST_DRIVE} className="hover:text-blue-600 transition-colors">
              Đặt Lịch Lái Thử
            </Link>
            <Link to={ROUTES.NEWS} className="hover:text-blue-600 transition-colors">
              Tin Tức Showroom
            </Link>
          </div>

          {/* Newsletter Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
            className="flex items-center w-full lg:w-auto gap-2"
          >
            <input
              type="email"
              placeholder="Nhập email nhận bảng giá xe mới..."
              required
              className="w-full sm:w-64 h-9 px-3 rounded-[10px] border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
            />
            <button
              type="submit"
              className="h-9 px-4 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-2xs whitespace-nowrap cursor-pointer shrink-0"
            >
              {subscribed ? 'Đã Đăng Ký' : 'Đăng Ký'}
            </button>
          </form>
        </div>

        {/* Bottom Tier: Copyright */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div>
            © 2024 CarShop. Nền tảng mua bán ô tô cao cấp hàng đầu Việt Nam.
          </div>
          <div>All Rights Reserved. Tiêu chuẩn kiểm định 176 hạng mục.</div>
        </div>
      </div>
    </footer>
  );
};
