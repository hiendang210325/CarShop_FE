import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  ShieldCheck,
  Zap,
  Phone,
  Calendar,
  CheckCircle2,
  X,
  Gauge,
  Sparkles,
  Car,
  RotateCcw,
  ArrowRight,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ROUTES } from '../../constants';
import { CARS_CATALOG, normalizeText, CarItem } from '../../constants/carsCatalog';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

/**
 * tasteskill: Anti-Slop Frontend Configuration
 * DESIGN_VARIANCE: 7
 * MOTION_INTENSITY: 5
 * VISUAL_DENSITY: 4
 * Aesthetic: Cold Luxury & Editorial Digital Atelier
 */

export const BuyCarPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial values from URL search params
  const paramQ = searchParams.get('q') || '';
  const paramBrand = searchParams.get('brand') || 'all';
  const paramType = searchParams.get('type') || 'all';
  const paramPrice = searchParams.get('price') || 'all';
  const paramSort = (searchParams.get('sort') as any) || 'default';

  const [searchQuery, setSearchQuery] = useState<string>(paramQ);
  const [selectedBrand, setSelectedBrand] = useState<string>(paramBrand);
  const [selectedType, setSelectedType] = useState<string>(paramType);
  const [priceRange, setPriceRange] = useState<string>(paramPrice);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'year-desc'>(paramSort);
  const [selectedCarModal, setSelectedCarModal] = useState<CarItem | null>(null);

  // Synchronize when URL search params change
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const b = searchParams.get('brand') || 'all';
    const t = searchParams.get('type') || 'all';
    const p = searchParams.get('price') || 'all';
    const s = (searchParams.get('sort') as any) || 'default';

    setSearchQuery(q);
    setSelectedBrand(b);
    setSelectedType(t);
    setPriceRange(p);
    setSortBy(s);
  }, [searchParams]);

  // Update both state & URL params
  const updateFilters = (newFilters: {
    q?: string;
    brand?: string;
    type?: string;
    price?: string;
    sort?: string;
  }) => {
    const nextQ = newFilters.q !== undefined ? newFilters.q : searchQuery;
    const nextBrand = newFilters.brand !== undefined ? newFilters.brand : selectedBrand;
    const nextType = newFilters.type !== undefined ? newFilters.type : selectedType;
    const nextPrice = newFilters.price !== undefined ? newFilters.price : priceRange;
    const nextSort = newFilters.sort !== undefined ? newFilters.sort : sortBy;

    if (newFilters.q !== undefined) setSearchQuery(newFilters.q);
    if (newFilters.brand !== undefined) setSelectedBrand(newFilters.brand);
    if (newFilters.type !== undefined) setSelectedType(newFilters.type);
    if (newFilters.price !== undefined) setPriceRange(newFilters.price);
    if (newFilters.sort !== undefined) setSortBy(newFilters.sort as any);

    const params: Record<string, string> = {};
    if (nextQ.trim()) params.q = nextQ.trim();
    if (nextBrand && nextBrand !== 'all' && nextBrand !== 'ALL') params.brand = nextBrand;
    if (nextType && nextType !== 'all' && nextType !== 'ALL') params.type = nextType;
    if (nextPrice && nextPrice !== 'all' && nextPrice !== 'ALL') params.price = nextPrice;
    if (nextSort && nextSort !== 'default') params.sort = nextSort;

    setSearchParams(params, { replace: true });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedType('all');
    setPriceRange('all');
    setSortBy('default');
    setSearchParams({}, { replace: true });
  };

  // Filtered & sorted cars
  const filteredCars = useMemo(() => {
    const norm = normalizeText(searchQuery);

    return CARS_CATALOG.filter((car) => {
      // Brand filter
      const matchBrand =
        selectedBrand === 'all' ||
        selectedBrand === 'ALL' ||
        car.brand.toLowerCase().includes(selectedBrand.toLowerCase()) ||
        selectedBrand.toLowerCase().includes(car.brand.toLowerCase());

      // Type filter
      const matchType =
        selectedType === 'all' ||
        selectedType === 'ALL' ||
        car.type === selectedType.toLowerCase();

      // Search keyword (accent-insensitive)
      let matchSearch = true;
      if (norm) {
        const matchModel = normalizeText(car.model).includes(norm);
        const matchCarBrand = normalizeText(car.brand).includes(norm);
        const matchTypeLabel = normalizeText(car.typeLabel).includes(norm);
        const matchDesc = normalizeText(car.description).includes(norm);
        const matchEngine = normalizeText(car.specs.engine).includes(norm);
        const matchTag = normalizeText(car.conditionTag).includes(norm);
        const matchYear = car.year.toString().includes(norm);
        matchSearch = matchModel || matchCarBrand || matchTypeLabel || matchDesc || matchEngine || matchTag || matchYear;
      }

      // Price filter
      let matchPrice = true;
      if (priceRange === 'under-2' || priceRange === 'under_1b') matchPrice = car.priceRaw < 2;
      else if (priceRange === '2-3' || priceRange === '1_2b') matchPrice = car.priceRaw >= 2 && car.priceRaw <= 3;
      else if (priceRange === '3-5' || priceRange === '2_5b') matchPrice = car.priceRaw > 3 && car.priceRaw <= 5;
      else if (priceRange === 'over-5' || priceRange === 'above_5b') matchPrice = car.priceRaw > 5;

      return matchBrand && matchType && matchSearch && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceRaw - b.priceRaw;
      if (sortBy === 'price-desc') return b.priceRaw - a.priceRaw;
      if (sortBy === 'year-desc') return b.year - a.year;
      return 0;
    });
  }, [selectedBrand, selectedType, priceRange, searchQuery, sortBy]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
    (selectedBrand && selectedBrand !== 'all' && selectedBrand !== 'ALL') ||
    (selectedType && selectedType !== 'all' && selectedType !== 'ALL') ||
    (priceRange && priceRange !== 'all' && priceRange !== 'ALL')
  );

  return (
    <div className="min-h-[100dvh] bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 flex-1 w-full">
        {/* Breadcrumb with Micro-Typography */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <Link to={ROUTES.HOME} className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-900 font-bold">Kho Xe Đang Mở Bán</span>
        </nav>

        {/* Anti-Slop Asymmetrical Split Hero Section (Fits Viewport, No Slop Gradients) */}
        <div className="p-1 rounded-[10px] bg-slate-900 shadow-2xl">
          <div className="rounded-[8px] overflow-hidden bg-[#070b14] text-white p-7 sm:p-10 lg:p-12 relative border border-white/10">
            {/* Luminous Environmental Lighting (Subtle Atmospheric Depth) */}
            <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Headline (Max 2 lines, Max 4 text elements) */}
              <div className="lg:col-span-7 space-y-5">
                {/* 1. Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>100% XE KIỂM ĐỊNH 176 HẠNG MỤC CHÍNH HÃNG</span>
                </div>

                {/* 2. Headline (Max 2 lines) */}
                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12]">
                  Tuyển Tập Xe Thượng Lưu, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                    Nguyên Bản & Độc Bản
                  </span>
                </h1>

                {/* 3. Subtext (Max 20 words) */}
                <p className="text-slate-300/95 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
                  Bộ sưu tập hơn 15,000+ kiệt tác xe sang chính hãng, minh bạch pháp lý và bảo hành toàn diện đến 3 năm.
                </p>

                {/* 4. Trust Telemetry Strip */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-cyan-400" />
                    <span>Không đâm đụng / ngập nước</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-cyan-400" />
                    <span>Bảo hành máy 3 năm</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap size={15} className="text-cyan-400" />
                    <span>Bàn giao toàn quốc 48h</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Showcase Visual (Asymmetric Balance) */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[16/10] rounded-[10px] overflow-hidden border border-white/15 shadow-2xl bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=85"
                    alt="Porsche Taycan Turbo S"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Spotlight Floating Pill */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[8px] bg-slate-950/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block">MẪU XE TÂM ĐIỂM</span>
                      <div className="font-display font-extrabold text-sm text-white truncate">Porsche Taycan 4S Cross Turismo</div>
                    </div>
                    <span className="font-display font-black text-sm text-cyan-300 shrink-0">4.85 Tỷ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Atelier Filter Suite (Double-Bezel Architecture) */}
        <div className="p-1 rounded-[10px] bg-slate-100/80 ring-1 ring-black/[0.04] shadow-xl">
          <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-5">
            {/* Top Toolbar: Search Bar + 3 Select Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">
              {/* Search Box */}
              <div className="lg:col-span-5 relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Nhập tên mẫu xe, thương hiệu (vd: Porsche Taycan, GLC 300, S450...)"
                  value={searchQuery}
                  onChange={(e) => updateFilters({ q: e.target.value })}
                  className="w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-[10px] ring-1 ring-slate-200/70 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => updateFilters({ q: '' })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
                    title="Xóa tìm kiếm"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Filter Brand Tile */}
              <div className="lg:col-span-3 bg-slate-50/80 hover:bg-slate-100/70 focus-within:bg-white ring-1 ring-slate-200/70 focus-within:ring-2 focus-within:ring-blue-100 rounded-[10px] px-3 py-1.5 transition-all">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hãng xe</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => updateFilters({ brand: e.target.value })}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none cursor-pointer mt-0.5"
                >
                  <option value="all">Tất cả thương hiệu</option>
                  <option value="Porsche">Porsche</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="BMW">BMW</option>
                  <option value="Audi">Audi</option>
                  <option value="Lexus">Lexus</option>
                  <option value="VinFast">VinFast EV</option>
                </select>
              </div>

              {/* Filter Price Tile */}
              <div className="lg:col-span-2 bg-slate-50/80 hover:bg-slate-100/70 focus-within:bg-white ring-1 ring-slate-200/70 focus-within:ring-2 focus-within:ring-blue-100 rounded-[10px] px-3 py-1.5 transition-all">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mức giá</label>
                <select
                  value={priceRange}
                  onChange={(e) => updateFilters({ price: e.target.value })}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none cursor-pointer mt-0.5"
                >
                  <option value="all">Mọi mức giá</option>
                  <option value="under-2">Dưới 2 Tỷ</option>
                  <option value="2-3">Từ 2 - 3 Tỷ</option>
                  <option value="3-5">Từ 3 - 5 Tỷ</option>
                  <option value="over-5">Trên 5 Tỷ</option>
                </select>
              </div>

              {/* Sort Dropdown Tile */}
              <div className="lg:col-span-2 bg-slate-50/80 hover:bg-slate-100/70 focus-within:bg-white ring-1 ring-slate-200/70 focus-within:ring-2 focus-within:ring-blue-100 rounded-[10px] px-3 py-1.5 transition-all">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sắp xếp</label>
                <select
                  value={sortBy}
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none cursor-pointer mt-0.5"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="year-desc">Đời xe mới nhất</option>
                </select>
              </div>
            </div>

            {/* Quick Segment Filter Pills + Reset Action */}
            <div className="flex items-center justify-between gap-3 flex-wrap pt-3 text-xs">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                <span className="text-slate-400 font-extrabold shrink-0 text-[10px] uppercase tracking-wider">Dòng xe:</span>
                {[
                  { id: 'all', label: 'Tất Cả' },
                  { id: 'sedan', label: 'Sedan Doanh Nhân' },
                  { id: 'suv', label: 'SUV 7 Chỗ' },
                  { id: 'ev', label: 'Xe Điện EV' },
                  { id: 'crossover', label: 'Crossover' },
                  { id: 'coupe', label: 'Coupe Thể Thao' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => updateFilters({ type: tab.id })}
                    className={`px-3.5 py-1.5 rounded-[8px] font-bold text-xs transition-all duration-300 shrink-0 cursor-pointer ${
                      selectedType === tab.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs border border-rose-200/80 transition-colors cursor-pointer shrink-0"
                >
                  <RotateCcw size={13} />
                  <span>Đặt lại bộ lọc</span>
                </button>
              )}
            </div>

            {/* Active Search Query Notice */}
            {searchQuery && (
              <div className="flex items-center justify-between px-4 py-2.5 rounded-[8px] bg-blue-50/80 border border-blue-200 text-xs text-blue-900">
                <div className="flex items-center gap-2">
                  <Search size={14} className="text-blue-600 shrink-0" />
                  <span>
                    Kết quả tìm kiếm cho: <strong className="text-blue-700 font-extrabold">"{searchQuery}"</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => updateFilters({ q: '' })}
                  className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer"
                >
                  Xóa từ khóa
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Count Header & Trust Indicator */}
        <div className="flex items-center justify-between px-1">
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Tìm thấy <span className="text-blue-600 font-black text-sm sm:text-base">{filteredCars.length}</span> kiệt tác xe sang sẵn sàng bàn giao
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Kiểm định 176 hạng mục độc quyền</span>
          </div>
        </div>

        {/* 3-Column Luxury Car Cards Grid with Double-Bezel Architecture */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredCars.map((car) => {
              const statusBadge =
                car.type === 'ev'
                  ? { label: 'Xe Điện EV', dot: 'bg-cyan-500' }
                  : car.condition === 'new'
                  ? { label: 'Xe Mới 100%', dot: 'bg-emerald-500' }
                  : { label: 'Xe Lướt Tuyển Chọn', dot: 'bg-blue-600' };

              const cleanEngine = car.specs.engine
                .replace('Điện Dual Motor (800V)', 'Dual Motor')
                .replace('2.0L Turbo Mild-Hybrid', '2.0L Mild-Hybrid')
                .replace('2.0L TwinPower Turbo', '2.0L TwinPower')
                .replace('3.0L I6 EQ Boost', '3.0L EQ Boost')
                .replace('3.0L M TwinPower Turbo S58', '3.0L Twin-Turbo');

              return (
                <Card
                  key={car.id}
                  className="group relative rounded-[10px] bg-white ring-1 ring-black/[0.04] shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_-8px_rgba(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col justify-between p-0 gap-0"
                >
                  {/* 16:10 Studio Showcase Media Frame */}
                  <Link
                    to={car.detailUrl || `/cars/${car.id}`}
                    className="relative aspect-[16/10] overflow-hidden bg-slate-950 block cursor-pointer group/img"
                    title={`Xem chi tiết ${car.model}`}
                  >
                    <img
                      src={car.imageUrl}
                      alt={car.model}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent pointer-events-none" />

                    {/* Top-Left Floating Minimalist Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-md shadow-xs border border-white/60">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                        <span>{statusBadge.label}</span>
                      </span>
                    </div>

                    {/* Bottom Vignette Info */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none text-white text-xs">
                      <span className="font-semibold text-slate-100 drop-shadow-xs">Đời {car.year}</span>
                      <span className="px-2.5 py-0.5 rounded-[8px] bg-slate-950/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                        {car.odo}
                      </span>
                    </div>
                  </Link>

                  {/* Card Header: Brand, Type & Model Title */}
                  <CardHeader className="p-5 pb-3 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                        {car.brand}
                      </span>
                      <span className="text-slate-400 text-xs font-medium truncate max-w-[140px] text-right">
                        {car.typeLabel}
                      </span>
                    </div>

                  <Link to={car.detailUrl || `/cars/${car.id}`}>
                    <CardTitle
                      className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight truncate leading-tight pt-0.5 cursor-pointer"
                      title={car.model}
                    >
                      {car.model}
                    </CardTitle>
                  </Link>
                </CardHeader>

                {/* Card Content: 3-Point Clean Editorial Telemetry & Price */}
                <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-between space-y-4">
                  {/* Clean 3-Point Horizontal Telemetry (Zero Gray Border Line) */}
                  <div className="grid grid-cols-3 py-2 px-2.5 rounded-[8px] bg-slate-50/80 text-center">
                    <div className="px-1 text-left">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Động cơ
                      </span>
                      <span className="font-bold text-slate-800 text-xs truncate block mt-0.5" title={car.specs.engine}>
                        {cleanEngine}
                      </span>
                    </div>

                    <div className="px-1 text-center">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Công suất
                      </span>
                      <span className="font-bold text-slate-800 text-xs block mt-0.5">
                        {car.specs.power}
                      </span>
                    </div>

                    <div className="px-1 text-right">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Hộp số
                      </span>
                      <span className="font-bold text-slate-800 text-xs truncate block mt-0.5">
                        {car.specs.gearbox.replace('Tự động ', '').replace('Steptronic', 'Step')}
                      </span>
                    </div>
                  </div>

                  {/* Clean Executive Pricing Block */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Giá niêm yết
                      </span>
                      <span className="font-display font-black text-2xl text-slate-900 group-hover:text-blue-600 transition-colors leading-tight block pt-0.5">
                        {car.priceVND}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Trả góp từ
                      </span>
                      <span className="text-xs font-bold text-slate-700 block pt-0.5">
                        {car.monthlyEstimate}
                      </span>
                    </div>
                  </div>
                </CardContent>

                {/* Card Footer: Modern Action Buttons */}
                <CardFooter className="p-5 pt-0 grid grid-cols-2 gap-3">
                  <Link
                    to={ROUTES.TEST_DRIVE}
                    className="h-10 px-3 rounded-[8px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <Calendar size={13} className="text-blue-600" />
                    <span>Lái thử</span>
                  </Link>

                  <Link
                    to={car.detailUrl || `/cars/${car.id}`}
                    className="h-10 px-3 rounded-[8px] bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer group/btn active:scale-[0.98]"
                  >
                    <span>Xem chi tiết</span>
                    <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </CardFooter>
              </Card>
              );
            })}
          </div>
        ) : (
          /* Concierge Empty State */
          <div className="p-1.5 rounded-[10px] bg-white ring-1 ring-black/[0.04] shadow-sm">
            <div className="rounded-[8px] bg-white p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
                <Car size={32} />
              </div>
              <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">
                Không tìm thấy dòng xe phù hợp với bộ lọc
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Không có xe nào khớp với tiêu chí tìm kiếm hiện tại. Bạn vui lòng nới lỏng khoảng giá, bỏ chọn thương hiệu hoặc làm mới bộ lọc.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-all cursor-pointer shadow-md active:scale-[0.98]"
              >
                <RotateCcw size={14} />
                <span>Đặt lại toàn bộ bộ lọc</span>
              </button>
            </div>
          </div>
        )}

        {/* Double-Bezel Commitment Trust Matrix */}
        <section className="p-1.5 rounded-[10px] bg-slate-100/70 ring-1 ring-black/[0.04] shadow-lg">
          <div className="rounded-[8px] bg-white p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">176 Điểm Kiểm Định</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                  Minh bạch toàn diện khung gầm, keo chỉ, máy móc. Cam kết bằng văn bản hoàn tiền 100% nếu phát hiện lỗi đâm đụng, thủy kích.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">Bảo Hành Đến 3 Năm</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                  Chính sách bảo hành toàn diện động cơ & hộp số, cứu hộ chuyên dụng 24/7 toàn quốc trong suốt thời gian bảo dưỡng.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">Vay Trả Góp 85% Giá Trị</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                  Lãi suất ưu đãi chỉ từ 6.9%/năm từ mạng lưới 12 ngân hàng liên kết, thẩm định hồ sơ phê duyệt giải ngân sau 48h.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Car Quick View Modal with Double-Bezel Architecture */}
      {selectedCarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="p-1 rounded-[10px] bg-gradient-to-b from-white/20 to-white/5 border border-white/20 shadow-2xl max-w-lg w-full">
            <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-4 relative">
              <button
                type="button"
                onClick={() => setSelectedCarModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-[8px] hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                title="Đóng"
              >
                <X size={18} />
              </button>

              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider">{selectedCarModal.brand}</span>
                <h3 className="font-display font-extrabold text-xl text-slate-900 mt-0.5 tracking-tight">{selectedCarModal.model}</h3>
                <p className="text-xs text-slate-400 font-semibold">{selectedCarModal.odo} • Đời {selectedCarModal.year}</p>
              </div>

              <div className="aspect-[16/10] rounded-[8px] overflow-hidden bg-slate-900 shadow-inner">
                <img src={selectedCarModal.imageUrl} alt={selectedCarModal.model} className="w-full h-full object-cover" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">{selectedCarModal.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-[8px] ring-1 ring-black/[0.03]">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Động cơ:</span>
                  <span className="font-bold text-slate-800">{selectedCarModal.specs.engine}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Công suất:</span>
                  <span className="font-bold text-slate-800">{selectedCarModal.specs.power}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Hộp số:</span>
                  <span className="font-bold text-slate-800">{selectedCarModal.specs.gearbox}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tiêu thụ / Pin:</span>
                  <span className="font-bold text-slate-800">{selectedCarModal.specs.fuelConsumption}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Giá bán niêm yết:</div>
                  <div className="font-display font-black text-xl text-blue-600">{selectedCarModal.priceVND}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={ROUTES.TEST_DRIVE}
                    className="px-3.5 py-2 rounded-[8px] bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-colors"
                  >
                    Lái Thử
                  </Link>
                  <a
                    href="tel:19008888"
                    className="px-4 py-2 rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Phone size={13} />
                    <span>Giữ Xe Ngay</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};

export default BuyCarPage;
