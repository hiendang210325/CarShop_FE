import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Car,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  Zap,
  Gauge,
} from 'lucide-react';
import { CARS_CATALOG, normalizeText, CarItem } from '../../constants/carsCatalog';
import { ROUTES } from '../../constants/routes';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_FILTERS = [
  { id: 'ALL', label: 'Tất cả' },
  { id: 'ev', label: 'Xe điện EV' },
  { id: 'suv', label: 'SUV' },
  { id: 'sedan', label: 'Sedan' },
  { id: 'Porsche', label: 'Porsche' },
  { id: 'Mercedes-Benz', label: 'Mercedes' },
  { id: 'BMW', label: 'BMW' },
  { id: 'Lexus', label: 'Lexus' },
];

const POPULAR_QUERIES = [
  'Porsche Taycan',
  'GLC 300 4MATIC',
  'Maybach S450',
  'BMW M4',
  'Lexus LX600',
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setActiveFilter('ALL');
      setHoveredId(null);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredCars = React.useMemo(() => {
    const norm = normalizeText(query);
    return CARS_CATALOG.filter((car) => {
      if (activeFilter !== 'ALL') {
        if (activeFilter === 'ev' && car.type !== 'ev') return false;
        if (activeFilter === 'suv' && car.type !== 'suv' && car.type !== 'crossover') return false;
        if (activeFilter === 'sedan' && car.type !== 'sedan' && car.type !== 'coupe') return false;
        if (['Porsche', 'Mercedes-Benz', 'BMW', 'Lexus'].includes(activeFilter) &&
          !car.brand.toLowerCase().includes(activeFilter.toLowerCase())) return false;
      }
      if (!norm) return true;
      return (
        normalizeText(car.model).includes(norm) ||
        normalizeText(car.brand).includes(norm) ||
        normalizeText(car.typeLabel).includes(norm) ||
        normalizeText(car.description).includes(norm) ||
        normalizeText(car.specs.engine).includes(norm) ||
        normalizeText(car.conditionTag).includes(norm) ||
        car.year.toString().includes(norm)
      );
    });
  }, [query, activeFilter]);

  const handleSelectCar = (car: CarItem) => {
    onClose();
    navigate(car.detailUrl || `${ROUTES.BUY_CAR}?q=${encodeURIComponent(car.model)}`);
  };

  const handleViewAll = () => {
    onClose();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (['Porsche', 'Mercedes-Benz', 'BMW', 'Lexus'].includes(activeFilter)) params.set('brand', activeFilter);
    navigate(`${ROUTES.BUY_CAR}${params.toString() ? `?${params}` : ''}`);
  };

  if (!isOpen) return null;

  const showSuggestions = !query.trim() && activeFilter === 'ALL';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[7vh] sm:pt-[10vh] px-3 sm:px-4">
      {/* Frosted backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search container */}
      <div className="relative w-full max-w-2xl z-10 flex flex-col max-h-[82vh] animate-scale-up">
        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col max-h-[82vh]">

          {/* Search input area */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
            <Search
              size={20}
              className={`shrink-0 transition-colors duration-200 ${query ? 'text-blue-600' : 'text-slate-400'}`}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleViewAll(); }}
              placeholder="Tìm kiếm xe, thương hiệu, động cơ..."
              className="flex-1 text-[15px] text-slate-900 placeholder:text-slate-400 font-medium outline-none bg-transparent"
            />
            <div className="flex items-center gap-1.5 shrink-0">
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-2 py-1 text-[11px] font-medium text-slate-400 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>
          </div>

          {/* Quick filter pills */}
          <div className="px-5 py-2.5 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-white">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1">
            {/* Popular suggestions when idle */}
            {showSuggestions && (
              <div className="px-5 pt-4 pb-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Tìm kiếm phổ biến
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_QUERIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuery(q)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80 hover:border-blue-200 transition-all cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results header */}
            <div className="px-5 py-2.5 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-50">
              <span className="text-xs font-semibold text-slate-400">
                {filteredCars.length} kết quả
              </span>
              {filteredCars.length > 0 && (
                <button
                  type="button"
                  onClick={handleViewAll}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  Xem tất cả trên kho xe
                  <ArrowRight size={12} />
                </button>
              )}
            </div>

            {/* Car results */}
            {filteredCars.length > 0 ? (
              <div className="py-1">
                {filteredCars.map((car) => {
                  const isHovered = hoveredId === car.id;
                  return (
                    <div
                      key={car.id}
                      onClick={() => handleSelectCar(car)}
                      onMouseEnter={() => setHoveredId(car.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="mx-2 mb-1 flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      {/* Car image */}
                      <div className="w-[88px] h-[58px] sm:w-[100px] sm:h-[66px] rounded-lg overflow-hidden bg-slate-100 shrink-0 relative">
                        <img
                          src={car.imageUrl}
                          alt={car.model}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {car.type === 'ev' && (
                          <span className="absolute top-1 left-1 px-1 py-px rounded text-[7px] font-bold uppercase bg-blue-600 text-white">
                            EV
                          </span>
                        )}
                      </div>

                      {/* Car info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                            {car.brand}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {car.year} · {car.typeLabel}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate leading-snug">
                          {car.model}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Gauge size={11} className="text-slate-400" />
                            {car.specs.engine}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span>{car.odo}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0 pl-2">
                        <div className="text-sm font-bold text-blue-600 leading-tight">
                          {car.priceVND}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Góp: {car.monthlyEstimate}
                        </div>
                        <div className={`mt-1 flex items-center justify-end gap-0.5 text-[10px] font-medium transition-all duration-200 ${isHovered ? 'text-blue-600' : 'text-transparent'}`}>
                          <span>Chi tiết</span>
                          <ChevronRight size={11} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-14 text-center px-6">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Car size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  Không tìm thấy xe phù hợp
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed mb-3">
                  Không có kết quả cho &quot;{query}&quot;.
                  Thử tìm: <strong className="text-blue-600">Taycan, GLC 300, BMW 530i</strong>
                </p>
                <button
                  type="button"
                  onClick={() => { setQuery(''); setActiveFilter('ALL'); }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <RotateCcw size={12} />
                  Đặt lại
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-2.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 text-xs text-slate-400">
            <div className="hidden sm:flex items-center gap-3 font-medium">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-200 text-slate-500">↵</kbd>
                Tìm kiếm
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-200 text-slate-500">ESC</kbd>
                Đóng
              </span>
            </div>
            <button
              type="button"
              onClick={handleViewAll}
              className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer ml-auto"
            >
              Xem tất cả {filteredCars.length} xe
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
