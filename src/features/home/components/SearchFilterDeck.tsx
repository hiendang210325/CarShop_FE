import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Car,
  Sliders,
  Tag,
  X,
  ArrowRight,
} from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

interface SearchFilterDeckProps {
  onSearch?: (criteria: any) => void;
}

// Brand SVG Icons (Enlarged Height & Crisp Vector Emblems)
const MercedesLogo = () => (
  <svg viewBox="0 0 40 40" className="w-12 h-12 text-slate-800 group-hover/card:text-blue-600 transition-colors" fill="none">
    <circle cx="20" cy="20" r="17.5" stroke="currentColor" strokeWidth="2.2" />
    <path d="M20 20 L20 4.5 M20 20 L7 27.5 M20 20 L33 27.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="20" cy="20" r="2.5" fill="currentColor" />
  </svg>
);

const BmwLogo = () => (
  <svg viewBox="0 0 40 40" className="w-12 h-12">
    <circle cx="20" cy="20" r="18.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="12.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
    <path d="M20 7.5 A12.5 12.5 0 0 1 32.5 20 L20 20 Z" fill="#0066b1" />
    <path d="M20 20 L7.5 20 A12.5 12.5 0 0 1 20 7.5 Z" fill="#ffffff" />
    <path d="M20 20 L20 32.5 A12.5 12.5 0 0 1 7.5 20 Z" fill="#0066b1" />
    <path d="M20 20 L32.5 20 A12.5 12.5 0 0 1 20 32.5 Z" fill="#ffffff" />
  </svg>
);

const PorscheLogo = () => (
  <svg viewBox="0 0 36 40" className="w-11 h-13">
    <path d="M18 1 L33 6 L30 26 L18 39 L6 26 L3 6 Z" fill="#b91c1c" stroke="#f59e0b" strokeWidth="2" />
    <path d="M18 6 L28 10 L25 24 L18 33 L11 24 L8 10 Z" fill="#f59e0b" />
    <path d="M18 11 L22 17 L18 25 L14 17 Z" fill="#1e293b" />
  </svg>
);

const AudiLogo = () => (
  <svg viewBox="0 0 64 24" className="w-18 h-9 text-slate-800 group-hover/card:text-blue-600 transition-colors" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="25" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="39" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="52" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.2" />
  </svg>
);

const LexusLogo = () => (
  <svg viewBox="0 0 44 32" className="w-14 h-10 text-slate-800 group-hover/card:text-blue-600 transition-colors" fill="none">
    <ellipse cx="22" cy="16" rx="19" ry="13.5" stroke="currentColor" strokeWidth="2.2" />
    <path d="M16 8.5 L16 23.5 L28 23.5 L25 18.5 L20.5 18.5 L20.5 8.5 Z" fill="currentColor" />
  </svg>
);

const VinFastLogo = () => (
  <svg viewBox="0 0 40 32" className="w-14 h-10 text-slate-800 group-hover/card:text-blue-600 transition-colors" fill="none">
    <path d="M4 6 L20 26 L36 6 L30 6 L20 19 L10 6 Z" fill="currentColor" />
    <path d="M9 6 L20 20 L31 6 L28 6 L20 16 L12 6 Z" fill="#0284c7" />
  </svg>
);

const LandRoverLogo = () => (
  <svg viewBox="0 0 54 28" className="w-18 h-9" fill="none">
    <ellipse cx="27" cy="14" rx="25" ry="12" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
    <text x="27" y="17.5" fill="#ffffff" fontSize="7" fontWeight="900" textAnchor="middle" letterSpacing="0.8">LAND ROVER</text>
  </svg>
);

const BentleyLogo = () => (
  <svg viewBox="0 0 50 28" className="w-17 h-9 text-slate-800 group-hover/card:text-blue-600 transition-colors" fill="none">
    <path d="M4 14 Q14 4 21 11 L21 17 Q14 24 4 14 Z" fill="currentColor" opacity="0.8" />
    <path d="M46 14 Q36 4 29 11 L29 17 Q36 24 46 14 Z" fill="currentColor" opacity="0.8" />
    <circle cx="25" cy="14" r="7.5" fill="#1e293b" stroke="currentColor" strokeWidth="1.8" />
    <text x="25" y="18" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">B</text>
  </svg>
);

const MaseratiLogo = () => (
  <svg viewBox="0 0 36 36" className="w-12 h-12 text-slate-800 group-hover/card:text-blue-600 transition-colors" fill="none">
    <path d="M18 3 L18 29 M18 33 L18 29 M10 11 L10 20 Q10 24 18 24 Q26 24 26 20 L26 11 M14 27 L22 27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <polygon points="18,3 15,10 21,10" fill="currentColor" />
    <polygon points="10,11 7,16 13,16" fill="currentColor" />
    <polygon points="26,11 23,16 29,16" fill="currentColor" />
  </svg>
);

const RollsRoyceLogo = () => (
  <svg viewBox="0 0 36 40" className="w-11 h-13 text-slate-800 group-hover/card:text-blue-600 transition-colors" fill="none">
    <rect x="4" y="2" width="28" height="36" rx="4" fill="#0f172a" stroke="currentColor" strokeWidth="1.8" />
    <text x="14" y="22" fill="#ffffff" fontSize="14" fontWeight="900" textAnchor="middle">R</text>
    <text x="22" y="29" fill="#94a3b8" fontSize="14" fontWeight="900" textAnchor="middle">R</text>
  </svg>
);

const FerrariLogo = () => (
  <svg viewBox="0 0 36 42" className="w-11 h-13.5">
    <path d="M18 1 L34 7 L31 32 L18 41 L5 32 L2 7 Z" fill="#facc15" stroke="#1e293b" strokeWidth="1.8" />
    <path d="M18 10 C16 14 13 18 15 26 C17 22 20 18 18 10 Z" fill="#1e293b" />
    <path d="M6 7 L30 7" stroke="#ef4444" strokeWidth="2.5" />
    <path d="M14 7 L22 7" stroke="#ffffff" strokeWidth="2.5" />
    <path d="M6 7 L14 7" stroke="#22c55e" strokeWidth="2.5" />
  </svg>
);

const LamborghiniLogo = () => (
  <svg viewBox="0 0 36 40" className="w-11 h-13">
    <path d="M18 1 L34 8 L31 30 L18 39 L5 30 L2 8 Z" fill="#0f172a" stroke="#eab308" strokeWidth="2" />
    <polygon points="18,12 12,23 24,23" fill="#eab308" />
    <path d="M10 15 Q18 20 26 15" stroke="#eab308" strokeWidth="2" fill="none" />
  </svg>
);

export const SearchFilterDeck: React.FC<SearchFilterDeckProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'used' | 'ev'>('all');
  const [brand, setBrand] = useState('ALL');
  const [bodyType, setBodyType] = useState('ALL');
  const [priceRange, setPriceRange] = useState('ALL');
  const [year, setYear] = useState('ALL');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ keyword, activeTab, brand, bodyType, priceRange, year });
    }

    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (brand !== 'ALL') params.set('brand', brand);
    if (bodyType !== 'ALL') params.set('type', bodyType.toLowerCase());
    if (priceRange !== 'ALL') params.set('price', priceRange);
    if (year !== 'ALL') params.set('year', year);
    if (activeTab === 'ev') params.set('type', 'ev');

    const searchStr = params.toString() ? `?${params.toString()}` : '';
    navigate(`${ROUTES.BUY_CAR}${searchStr}`);
  };

  const partnerBrands = [
    { name: 'Porsche', country: 'Stuttgart, Đức', icon: <PorscheLogo /> },
    { name: 'Mercedes-Benz', country: 'Stuttgart, Đức', icon: <MercedesLogo /> },
    { name: 'BMW', country: 'Munich, Đức', icon: <BmwLogo /> },
    { name: 'Audi', country: 'Ingolstadt, Đức', icon: <AudiLogo /> },
    { name: 'Lexus', country: 'Nagoya, Nhật Bản', icon: <LexusLogo /> },
    { name: 'Land Rover', country: 'Gaydon, Anh Quốc', icon: <LandRoverLogo /> },
    { name: 'Bentley', country: 'Crewe, Anh Quốc', icon: <BentleyLogo /> },
    { name: 'Maserati', country: 'Modena, Ý', icon: <MaseratiLogo /> },
    { name: 'Rolls-Royce', country: 'Goodwood, Anh', icon: <RollsRoyceLogo /> },
    { name: 'VinFast', country: 'Hải Phòng, Việt Nam', icon: <VinFastLogo /> },
    { name: 'Ferrari', country: 'Maranello, Ý', icon: <FerrariLogo /> },
    { name: 'Lamborghini', country: 'Bologna, Ý', icon: <LamborghiniLogo /> },
  ];

  // Duplicate for seamless 100% infinite marquee loop
  const marqueeBrands = [...partnerBrands, ...partnerBrands];

  return (
    <div id="search" className="relative z-30">
      {/* 1. Main Search & Filter Card (Centered in max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16">
        <div className="bg-white rounded-[10px] p-5 sm:p-6 shadow-[0_20px_50px_rgba(8,13,25,0.08)] border border-slate-200/80 backdrop-blur-md">
          {/* Top Category Segmented Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="inline-flex p-1 rounded-[10px] bg-slate-100/90 border border-slate-200/60">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white text-blue-600 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Car size={15} />
                <span>Tất cả dòng xe</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('used')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'used'
                    ? 'bg-white text-blue-600 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders size={15} />
                <span>Xe lướt kiểm định</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ev')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'ev'
                    ? 'bg-white text-blue-600 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tag size={15} />
                <span>Xe điện & Hybrid (EV)</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Cam kết kiểm định 176 hạng mục</span>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="space-y-3">
            {/* Main Keyword Search Bar */}
            <div className="relative flex items-center">
              <Search size={17} className="text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Nhập tên xe, dòng xe hoặc từ khóa tìm kiếm (vd: Porsche Taycan, GLC 300, S450, Lexus LX600...)"
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-[10px] border border-slate-200/90 text-xs sm:text-sm text-slate-900 bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-3 focus:ring-blue-100/60 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword('')}
                  className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Xóa"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* 4 Tile Filter Selects + 1 Primary Submit Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 items-stretch">
              {/* 1. Hãng xe Tile */}
              <div className="bg-slate-50/80 hover:bg-slate-100/70 focus-within:bg-white border border-slate-200/90 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100/60 rounded-[10px] px-3 py-2 transition-all flex flex-col justify-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hãng xe</span>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none cursor-pointer mt-0.5"
                >
                  <option value="ALL">Tất cả các hãng</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="BMW">BMW</option>
                  <option value="Porsche">Porsche</option>
                  <option value="Audi">Audi</option>
                  <option value="Lexus">Lexus</option>
                  <option value="VinFast">VinFast</option>
                </select>
              </div>

              {/* 2. Dòng xe Tile */}
              <div className="bg-slate-50/80 hover:bg-slate-100/70 focus-within:bg-white border border-slate-200/90 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100/60 rounded-[10px] px-3 py-2 transition-all flex flex-col justify-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phân khúc xe</span>
                <select
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none cursor-pointer mt-0.5"
                >
                  <option value="ALL">Tất cả phân khúc</option>
                  <option value="SEDAN">Sedan</option>
                  <option value="SUV">SUV 7 Chỗ</option>
                  <option value="CROSSOVER">Crossover</option>
                  <option value="COUPE">Coupe thể thao</option>
                  <option value="EV">Xe điện EV</option>
                </select>
              </div>

              {/* 3. Mức giá Tile */}
              <div className="bg-slate-50/80 hover:bg-slate-100/70 focus-within:bg-white border border-slate-200/90 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100/60 rounded-[10px] px-3 py-2 transition-all flex flex-col justify-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mức giá dự kiến</span>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none cursor-pointer mt-0.5"
                >
                  <option value="ALL">Mọi mức ngân sách</option>
                  <option value="under_1b">Dưới 2 Tỷ</option>
                  <option value="1_2b">2 Tỷ - 3 Tỷ</option>
                  <option value="2_5b">3 Tỷ - 5 Tỷ</option>
                  <option value="above_5b">Trên 5 Tỷ</option>
                </select>
              </div>

              {/* 4. Năm sản xuất Tile */}
              <div className="bg-slate-50/80 hover:bg-slate-100/70 focus-within:bg-white border border-slate-200/90 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100/60 rounded-[10px] px-3 py-2 transition-all flex flex-col justify-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Năm sản xuất</span>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none cursor-pointer mt-0.5"
                >
                  <option value="ALL">Tất cả các năm</option>
                  <option value="2024">Năm 2024</option>
                  <option value="2023">Năm 2023</option>
                  <option value="2022">Năm 2022</option>
                  <option value="2021">Năm 2021</option>
                </select>
              </div>

              {/* 5. Submit Button */}
              <button
                type="submit"
                className="min-h-[50px] px-4 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-blue-600/25 transition-all cursor-pointer"
              >
                <Search size={15} />
                <span>Tìm Xe Ngay</span>
                <ArrowRight size={14} className="hidden lg:inline" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. DEDICATED PARTNER BRANDS SECTION (Riêng 1 Section, Tiêu đề căn giữa in đậm phóng to, Logo to tự nhiên, 2 border trên dưới nhạt, khoảng cách phân định rõ ràng) */}
      <section className="w-full overflow-hidden mt-14 sm:mt-20 pt-12 pb-12 sm:pt-16 sm:pb-16 bg-white relative border-t border-b border-slate-200/80">
        {/* Centered, Enlarged, In Đậm Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-12">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight uppercase leading-snug">
            HÃNG XE & ĐỐI TÁC THƯƠNG HIỆU HỢP TÁC CHÍNH HÃNG
          </h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Gradient Fade Masks hai mép màn hình giúp logo trôi tự nhiên */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 sm:w-52 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 sm:w-52 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Marquee Track: Height Logo To Hơn Rõ Rệt, Chạy Tự Nhiên từ Phải sang Trái */}
        <div className="animate-marquee-left flex items-center gap-10 sm:gap-14 py-3">
          {marqueeBrands.map((b, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`${ROUTES.BUY_CAR}?brand=${encodeURIComponent(b.name)}`)}
              className="flex items-center gap-4 px-3 py-2 hover:bg-slate-50 rounded-[10px] transition-all shrink-0 cursor-pointer group/card"
              title={`Xem danh sách xe ${b.name}`}
            >
              <div className="h-14 flex items-center justify-center shrink-0 group-hover/card:scale-115 transition-transform duration-300">
                {b.icon}
              </div>
              <div className="text-left">
                <div className="font-black text-base sm:text-lg md:text-xl text-slate-900 group-hover/card:text-blue-600 transition-colors whitespace-nowrap tracking-tight">
                  {b.name}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-semibold whitespace-nowrap mt-0.5">
                  {b.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
