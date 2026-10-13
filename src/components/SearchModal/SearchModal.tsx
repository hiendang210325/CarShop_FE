import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Car,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CARS_CATALOG, normalizeText, CarItem } from '../../constants/carsCatalog';
import { ROUTES } from '../../constants/routes';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_TAGS = [
  'Porsche Taycan',
  'GLC 300 4MATIC',
  'Maybach S450',
  'Lexus LX600',
  'BMW 530i',
  'Xe điện EV',
];

const BRAND_FILTERS = [
  { label: 'Tất cả hãng', value: 'ALL' },
  { label: 'Porsche', value: 'Porsche' },
  { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
  { label: 'BMW', value: 'BMW' },
  { label: 'Lexus', value: 'Lexus' },
  { label: 'VinFast', value: 'VinFast' },
  { label: 'Audi', value: 'Audi' },
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedBrand('ALL');
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter cars based on search query and brand
  const filteredCars = React.useMemo(() => {
    const norm = normalizeText(query);
    return CARS_CATALOG.filter((car) => {
      // Brand filter
      if (selectedBrand !== 'ALL') {
        if (!car.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
          return false;
        }
      }

      // Query filter
      if (!norm) return true;

      const matchModel = normalizeText(car.model).includes(norm);
      const matchBrand = normalizeText(car.brand).includes(norm);
      const matchType = normalizeText(car.typeLabel).includes(norm);
      const matchDesc = normalizeText(car.description).includes(norm);
      const matchEngine = normalizeText(car.specs.engine).includes(norm);
      const matchTag = normalizeText(car.conditionTag).includes(norm);
      const matchYear = car.year.toString().includes(norm);

      return matchModel || matchBrand || matchType || matchDesc || matchEngine || matchTag || matchYear;
    });
  }, [query, selectedBrand]);

  const handleSelectCar = (car: CarItem) => {
    onClose();
    if (car.detailUrl) {
      navigate(car.detailUrl);
    } else {
      navigate(`${ROUTES.BUY_CAR}?q=${encodeURIComponent(car.model)}`);
    }
  };

  const handleViewAllResults = () => {
    onClose();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (selectedBrand !== 'ALL') params.set('brand', selectedBrand);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    navigate(`${ROUTES.BUY_CAR}${queryString}`);
  };

  const handleSuggestionClick = (keyword: string) => {
    setQuery(keyword);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-4 animate-fade-in">
      {/* Dark Ambient Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Command Modal */}
      <div className="relative w-full max-w-3xl bg-white rounded-[10px] shadow-2xl border border-slate-200/90 overflow-hidden z-10 flex flex-col max-h-[88vh] animate-scale-up">
        {/* 1. Command Input Bar (Seamless Top Header) */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-slate-100 bg-white gap-3">
          <Search size={22} className="text-blue-600 shrink-0" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleViewAllResults();
              }
            }}
            placeholder="Tìm kiếm mẫu xe, hãng xe, đời xe (vd: Porsche, GLC 300, S450...)"
            className="flex-1 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 font-medium outline-none bg-transparent"
          />

          <div className="flex items-center gap-2 shrink-0">
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-[6px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Xóa tìm kiếm"
              >
                <X size={17} />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 rounded-[6px] border border-slate-200">
              ESC
            </kbd>
          </div>
        </div>

        {/* 2. Sleek Filter & Quick Tag Strip */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-50/80 border-b border-slate-100 space-y-2">
          {/* Brand Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
            {BRAND_FILTERS.map((bf) => (
              <button
                key={bf.value}
                type="button"
                onClick={() => setSelectedBrand(bf.value)}
                className={`px-3 py-1 rounded-[8px] text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedBrand === bf.value
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white hover:bg-slate-200/70 text-slate-600 border border-slate-200/80'
                }`}
              >
                {bf.label}
              </button>
            ))}
          </div>

          {/* Quick Suggestions (Only when query is empty) */}
          {!query.trim() && (
            <div className="flex items-center gap-2 text-xs overflow-x-auto scrollbar-none pt-0.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Sparkles size={11} className="text-blue-600" />
                Gợi ý:
              </span>
              <div className="flex items-center gap-1.5 flex-nowrap">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSuggestionClick(tag)}
                    className="px-2.5 py-0.5 rounded-[6px] text-[11px] font-medium text-slate-600 hover:text-blue-600 hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Car Results Content List */}
        <div className="overflow-y-auto flex-1 p-3 sm:p-5 space-y-2">
          {/* Section Subhead */}
          <div className="flex items-center justify-between px-2 text-xs font-semibold text-slate-400">
            <span>
              {query.trim()
                ? `Kết quả cho "${query}": ${filteredCars.length} xe`
                : `Xe sẵn sàng giao ngay (${filteredCars.length})`}
            </span>
            {filteredCars.length > 0 && (
              <button
                type="button"
                onClick={handleViewAllResults}
                className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 text-[11px]"
              >
                <span>Xem trên kho xe</span>
                <ChevronRight size={13} />
              </button>
            )}
          </div>

          {/* Car Results Rows */}
          {filteredCars.length > 0 ? (
            <div className="space-y-1.5">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => handleSelectCar(car)}
                  className="flex items-center gap-3.5 p-2.5 sm:p-3 rounded-[10px] hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer group"
                >
                  {/* Car Thumbnail */}
                  <div className="w-24 h-16 sm:w-28 sm:h-18 rounded-[8px] overflow-hidden bg-slate-900 shrink-0 relative">
                    <img
                      src={car.imageUrl}
                      alt={car.model}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {car.type === 'ev' && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded-[4px] text-[8px] font-extrabold bg-emerald-600 text-white">
                        EV
                      </span>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">
                        {car.brand} • {car.year}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {car.typeLabel}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {car.model}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="truncate max-w-[180px] sm:max-w-none">{car.specs.engine}</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-medium text-slate-600 shrink-0">{car.odo}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="text-right shrink-0 pl-2">
                    <div className="font-display font-extrabold text-sm sm:text-base text-blue-600 leading-tight">
                      {car.priceVND}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Trả góp: {car.monthlyEstimate}
                    </div>
                    <div className="hidden sm:flex items-center justify-end gap-1 text-[11px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors mt-0.5">
                      <span>Xem chi tiết</span>
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-[10px] bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Car size={24} />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">
                Không tìm thấy dòng xe phù hợp
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Không có kết quả cho từ khóa &quot;{query}&quot;. Vui lòng thử từ khóa như: <span className="font-bold text-blue-600">Taycan, GLC, BMW, Lexus...</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedBrand('ALL');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <span>Xóa bộ lọc & Xem tất cả</span>
              </button>
            </div>
          )}
        </div>

        {/* 4. Minimalist Footer */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1">
              Nhấn <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-white border border-slate-200 rounded-[4px]">↵</kbd> để tìm kiếm
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="hidden sm:inline">Phím tắt: <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-white border border-slate-200 rounded-[4px]">Ctrl+K</kbd></span>
          </div>

          <button
            type="button"
            onClick={handleViewAllResults}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-[10px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            <span>Đến Kho Xe ({filteredCars.length})</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
