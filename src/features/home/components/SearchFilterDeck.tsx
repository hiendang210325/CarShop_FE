import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Car,
  ThumbsUp,
  CheckCircle,
  Truck,
  Tag,
  Calendar,
  Sliders,
  X,
  ArrowRight,
} from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

interface SearchFilterDeckProps {
  onSearch?: (criteria: any) => void;
}

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

  const stats = [
    {
      label: 'Xe sẵn sàng giao ngay',
      value: '15,000+',
      icon: <Car size={22} className="text-blue-600" />,
    },
    {
      label: 'Khách hàng rất hài lòng',
      value: '99.4%',
      icon: <ThumbsUp size={22} className="text-blue-600" />,
    },
    {
      label: 'Kiểm định chuẩn quốc tế',
      value: '176 Điểm',
      icon: <CheckCircle size={22} className="text-blue-600" />,
    },
    {
      label: 'Giao xe tận nơi toàn quốc',
      value: '48 Giờ',
      icon: <Truck size={22} className="text-blue-600" />,
    },
  ];

  return (
    <div id="search" className="max-w-7xl mx-auto px-4 sm:px-8 relative -mt-10 sm:-mt-14 z-30">
      {/* Floating Filter Card */}
      <div className="bg-white rounded-[10px] p-5 sm:p-7 shadow-xl border border-slate-200/90">
        {/* Top Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-5 border-b border-slate-100 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Car size={15} />
            <span>Tất cả dòng xe</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('used')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'used'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Sliders size={15} />
            <span>Xe đã qua sử dụng (Lướt)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ev')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ev'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Tag size={15} />
            <span>Xe điện & Hybrid (EV)</span>
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="space-y-3.5">
          {/* Main Keyword Search Input */}
          <div className="relative flex items-center">
            <Search size={18} className="text-blue-600 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Nhập tên xe, dòng xe hoặc từ khóa tìm kiếm (vd: Porsche Taycan, GLC 300, S450, Lexus LX600...)"
              className="w-full pl-10 pr-10 py-3 rounded-[10px] border border-slate-200 text-xs sm:text-sm text-slate-900 bg-slate-50/60 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
            {keyword && (
              <button
                type="button"
                onClick={() => setKeyword('')}
                className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600"
                title="Xóa"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* 4 Dropdown Inputs + 1 Submit Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            {/* 1. Hãng xe */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Car size={12} className="text-blue-600" />
                <span>Hãng xe</span>
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full h-10.5 px-3 rounded-[10px] border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
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

            {/* 2. Dòng xe / Phân khúc */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Sliders size={12} className="text-blue-600" />
                <span>Dòng xe / Phân khúc</span>
              </label>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="w-full h-10.5 px-3 rounded-[10px] border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="ALL">Tất cả phân khúc</option>
                <option value="SEDAN">Sedan</option>
                <option value="SUV">SUV 7 Chỗ</option>
                <option value="CROSSOVER">Crossover</option>
                <option value="COUPE">Coupe thể thao</option>
                <option value="EV">Xe điện EV</option>
              </select>
            </div>

            {/* 3. Mức giá dự kiến */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Tag size={12} className="text-blue-600" />
                <span>Mức giá dự kiến</span>
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full h-10.5 px-3 rounded-[10px] border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="ALL">Mọi mức ngân sách</option>
                <option value="under_1b">Dưới 2 Tỷ</option>
                <option value="1_2b">2 Tỷ - 3 Tỷ</option>
                <option value="2_5b">3 Tỷ - 5 Tỷ</option>
                <option value="above_5b">Trên 5 Tỷ</option>
              </select>
            </div>

            {/* 4. Năm sản xuất */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Calendar size={12} className="text-blue-600" />
                <span>Năm sản xuất</span>
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full h-10.5 px-3 rounded-[10px] border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="ALL">Tất cả các năm</option>
                <option value="2024">Năm 2024</option>
                <option value="2023">Năm 2023</option>
                <option value="2022">Năm 2022</option>
                <option value="2021">Năm 2021</option>
              </select>
            </div>

            {/* 5. Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full h-10.5 px-4 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Search size={15} />
                <span>Tìm Xe Ngay</span>
                <ArrowRight size={14} className="hidden lg:inline" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 4 Statistics Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4.5 rounded-[10px] border border-slate-100 shadow-2xs flex flex-col items-center justify-center text-center space-y-1.5 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <div className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                {item.value}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
