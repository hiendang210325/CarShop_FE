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
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ROUTES } from '../../constants';
import { CARS_CATALOG, normalizeText, CarItem } from '../../constants/carsCatalog';

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

  // Synchronize when URL search params change (e.g. from Navbar Search modal or back button)
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
    <div className="min-h-screen bg-[#faf8ff] text-slate-900 font-sans selection:bg-[#0066ff] selection:text-white flex flex-col justify-between">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
          <Link to={ROUTES.HOME} className="hover:text-blue-600 transition-colors font-medium">
            Trang chủ
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold">Kho Xe Đang Mở Bán</span>
        </nav>

        {/* Hero Banner Section */}
        <div className="relative rounded-[10px] overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white p-7 sm:p-10 shadow-lg border border-slate-800">
          <div className="max-w-2xl space-y-3.5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Hơn 15,000+ Xe Sẵn Sàng Bàn Giao</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Tìm Kiếm Xe Sang <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Chuẩn Kiểm Định 176 Điểm
              </span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Toàn bộ xe tại CarShop đều được thẩm định minh bạch, cam kết không đâm đụng, không ngập nước, bảo hành đến 3 năm và hỗ trợ thủ tục vay trả góp 85% nhận xe sau 48h.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 lg:opacity-30 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&auto=format&fit=crop&q=80"
              alt="Luxury cars background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-[10px] p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Search Box */}
            <div className="lg:col-span-5 relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm xe theo tên mẫu, thương hiệu, đời xe..."
                value={searchQuery}
                onChange={(e) => updateFilters({ q: e.target.value })}
                className="w-full pl-10 pr-9 py-2.5 rounded-[10px] border border-slate-200 text-xs sm:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => updateFilters({ q: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded"
                  title="Xóa tìm kiếm"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Filter Brand */}
            <div className="lg:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => updateFilters({ brand: e.target.value })}
                className="w-full px-3 py-2.5 rounded-[10px] border border-slate-200 text-xs sm:text-sm bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none font-medium cursor-pointer"
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

            {/* Filter Price */}
            <div className="lg:col-span-2">
              <select
                value={priceRange}
                onChange={(e) => updateFilters({ price: e.target.value })}
                className="w-full px-3 py-2.5 rounded-[10px] border border-slate-200 text-xs sm:text-sm bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none font-medium cursor-pointer"
              >
                <option value="all">Mọi mức giá</option>
                <option value="under-2">Dưới 2 Tỷ</option>
                <option value="2-3">Từ 2 - 3 Tỷ</option>
                <option value="3-5">Từ 3 - 5 Tỷ</option>
                <option value="over-5">Trên 5 Tỷ</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="w-full px-3 py-2.5 rounded-[10px] border border-slate-200 text-xs sm:text-sm bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none font-medium cursor-pointer"
              >
                <option value="default">Sắp xếp: Mặc định</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="year-desc">Đời xe mới nhất</option>
              </select>
            </div>
          </div>

          {/* Quick Segment Filter Pills + Reset Action */}
          <div className="flex items-center justify-between gap-3 flex-wrap pt-1 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              <span className="text-slate-400 font-bold shrink-0 text-[11px] uppercase tracking-wider">Phân khúc:</span>
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
                  onClick={() => updateFilters({ type: tab.id })}
                  className={`px-3 py-1 rounded-[10px] font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedType === tab.id
                      ? 'bg-blue-600 text-white shadow-2xs'
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
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-[10px] bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs border border-rose-200 transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw size={12} />
                <span>Đặt lại bộ lọc</span>
              </button>
            )}
          </div>

          {/* Active Search Query Notice */}
          {searchQuery && (
            <div className="flex items-center justify-between px-3.5 py-2 rounded-[10px] bg-blue-50/70 border border-blue-200 text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <Search size={14} className="text-blue-600 shrink-0" />
                <span>
                  Đang hiển thị kết quả cho từ khóa: <strong className="text-blue-700 font-bold">"{searchQuery}"</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateFilters({ q: '' })}
                className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}
        </div>

        {/* Count Header */}
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Tìm thấy <span className="text-blue-600 font-extrabold">{filteredCars.length}</span> mẫu xe sang sẵn sàng bàn giao
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck size={15} className="text-emerald-600" />
            <span>Kiểm định 176 hạng mục độc quyền</span>
          </div>
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-[10px] overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={car.imageUrl}
                      alt={car.model}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-2.5 py-1 rounded-[10px] text-[10px] font-bold bg-slate-900/85 backdrop-blur-md text-white border border-white/20">
                        {car.conditionTag}
                      </span>
                    </div>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-[10px] text-[10px] font-semibold bg-white/90 backdrop-blur-md text-slate-800">
                      {car.odo}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 space-y-3.5">
                    <div>
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        {car.brand} • {car.year}
                      </div>
                      <h3 className="font-display font-bold text-base text-slate-900 mt-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {car.model}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {car.description}
                      </p>
                    </div>

                    {/* Specs Pills */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-[10px] border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Động cơ:</span>
                        <span className="font-semibold text-slate-700 truncate block">{car.specs.engine}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Công suất:</span>
                        <span className="font-semibold text-slate-700">{car.specs.power}</span>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Giá niêm yết:</div>
                        <div className="font-display font-extrabold text-xl sm:text-2xl text-blue-600">
                          {car.priceVND}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 font-medium">Trả góp từ:</div>
                        <div className="text-xs font-bold text-slate-800">
                          {car.monthlyEstimate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2.5">
                  <Link
                    to={ROUTES.TEST_DRIVE}
                    className="w-full py-2.5 px-3 rounded-[10px] border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors text-center cursor-pointer"
                  >
                    <Phone size={13} className="text-blue-600" />
                    <span>Lái Thử</span>
                  </Link>

                  {car.detailUrl ? (
                    <Link
                      to={car.detailUrl}
                      className="w-full py-2.5 px-3 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-colors cursor-pointer"
                    >
                      <span>Xem Chi Tiết</span>
                      <ChevronRight size={14} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setSelectedCarModal(car)}
                      className="w-full py-2.5 px-3 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-colors cursor-pointer"
                    >
                      <span>Xem Chi Tiết</span>
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[10px] p-12 text-center border border-slate-200 space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Car size={28} />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">
              Không tìm thấy dòng xe phù hợp với bộ lọc
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Không tìm thấy xe phù hợp cho từ khóa "{searchQuery}". Hãy thử nới lỏng khoảng giá hoặc chọn thương hiệu khác!
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-[10px] bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Đặt lại toàn bộ bộ lọc
            </button>
          </div>
        )}

        {/* Commitment Banner */}
        <section className="bg-white rounded-[10px] p-6 sm:p-7 border border-slate-200/80 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-[10px] bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">176 Điểm Kiểm Định</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Minh bạch keo chỉ, khung gầm, máy móc. Cam kết hoàn tiền 100% nếu phát hiện lỗi đâm đụng.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-[10px] bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Bảo Hành Đến 3 Năm</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Gói bảo hành toàn diện động cơ & hộp số, cứu hộ 24/7 toàn quốc trong suốt thời gian bảo dưỡng.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-[10px] bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Zap size={22} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Vay Trả Góp 85% Giá Trị</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Lãi suất ưu đãi chỉ từ 6.9%/năm, thẩm định hồ sơ phê duyệt giải ngân trong ngày.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Car Quick View Modal */}
      {selectedCarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[10px] max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setSelectedCarModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-[10px] hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedCarModal.brand}</span>
              <h3 className="font-display font-bold text-lg text-slate-900 mt-0.5">{selectedCarModal.model}</h3>
              <p className="text-xs text-slate-400">{selectedCarModal.odo} • Đời {selectedCarModal.year}</p>
            </div>

            <div className="aspect-[16/10] rounded-[10px] overflow-hidden bg-slate-100">
              <img src={selectedCarModal.imageUrl} alt={selectedCarModal.model} className="w-full h-full object-cover" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{selectedCarModal.description}</p>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-[10px] border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block">Động cơ:</span>
                <span className="font-semibold text-slate-800">{selectedCarModal.specs.engine}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Công suất:</span>
                <span className="font-semibold text-slate-800">{selectedCarModal.specs.power}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Hộp số:</span>
                <span className="font-semibold text-slate-800">{selectedCarModal.specs.gearbox}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Tiêu thụ / Pin:</span>
                <span className="font-semibold text-slate-800">{selectedCarModal.specs.fuelConsumption}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <div className="text-[10px] text-slate-400">Giá bán niêm yết:</div>
                <div className="font-display font-extrabold text-xl text-blue-600">{selectedCarModal.priceVND}</div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={ROUTES.TEST_DRIVE}
                  className="px-3.5 py-2 rounded-[10px] border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-50"
                >
                  Lái Thử
                </Link>
                <a
                  href="tel:19008888"
                  className="px-4 py-2 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Phone size={13} />
                  <span>Giữ Xe Ngay</span>
                </a>
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
