import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  TrendingUp,
  Clock,
  Eye,
  Calendar,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight,
  Award,
  Download,
  Mail,
  Play,
  CheckCircle2,
  Sliders,
  X,
  FileText,
  Star,
  Zap,
  ShieldCheck,
  Tag,
  Car,
  Volume2,
  Check,
  BadgeCheck,
} from 'lucide-react';
import { Navbar } from '../home/components/Navbar';
import { Footer } from '../home/components/Footer';
import { ROUTES } from '../../constants';

/**
 * High-End Visual Design & Anti-Slop Directive:
 * - Vibe: Editorial Luxury & Contemporary Automotive Journal
 * - Spacing: Disciplined py-8 sm:py-10 space-y-8 flex-1 w-full
 * - Double-Bezel Architecture: outer rounded-[10px] p-1 + inner rounded-[8px] core
 * - Real automotive journalism language (Zero cheesy marketing slop)
 * - Kinetic Button-in-Button CTAs with spring trajectory physics
 */

type NewsCategory = 'all' | 'reviews' | 'market' | 'guides' | 'ev';

interface ArticleItem {
  id: string;
  category: NewsCategory;
  categoryName: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  viewCount: string;
  rating?: number;
  isExclusive?: boolean;
  tags: string[];
  content?: string[];
}

const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'porsche-taycan-4s-review',
    category: 'reviews',
    categoryName: 'Đánh Giá Xe',
    title: 'Đánh Giá Thực Tế Porsche Taycan 4S: Xe Điện Thể Thao Đã Đủ Sức Thay Thế Xe Xăng Tại Việt Nam?',
    excerpt: 'Sau hơn 1,200 km thử thách xuyên đèo Hải Vân đến Đà Nẵng, phiên bản Taycan 4S Cross Turismo 530 HP chứng minh khả năng kiểm soát khung gầm đỉnh cao và sự tiện dụng vượt mong đợi của nền tảng sạc 800V.',
    coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&auto=format&fit=crop&q=85',
    author: {
      name: 'Hoàng Nam',
      role: 'Kỹ sư trưởng Ban Thử Xe CarShop',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    },
    publishDate: '22/09/2026',
    readTime: '8 phút đọc',
    viewCount: '14,280',
    rating: 9.6,
    isExclusive: true,
    tags: ['#PorscheTaycan', '#XeDien2026', '#DanhGiaXe'],
    content: [
      'Porsche Taycan không đơn thuần là một chiếc xe điện. Đó là minh chứng cho thấy DNA thể thao thuần khiết của Stuttgart hoàn toàn có thể thăng hoa mà không cần đến tiếng gầm của động cơ đốt trong.',
      'Trải nghiệm hệ thống treo khí nén thích ứng PASM trên các cung đường gồ ghề cho thấy sự êm ái tiệm cận Panamera nhưng khi chuyển sang chế độ Sport Plus, xe ghì sát mặt đường với trọng tâm cực thấp từ cụm pin 93.4 kWh.',
      'Thời gian nạp pin từ 5% lên 80% chỉ mất 22.5 phút tại trạm sạc siêu nhanh DC 800V đã xóa bỏ hoàn toàn rào cản tâm lý về việc di chuyển đường dài của người dùng xe sang tại Việt Nam.',
    ],
  },
  {
    id: 'market-q2-suv-hybrid',
    category: 'market',
    categoryName: 'Thị Trường Ô Tô',
    title: 'Thị trường ô tô Việt Nam quý 4: Xe SUV gầm cao và hybrid tiếp tục dẫn đầu phân khúc hạng sang',
    excerpt: 'Xu hướng người tiêu dùng chuyển dịch mạnh mẽ sang các dòng xe gầm cao đa dụng và động cơ lai hybrid tiết kiệm nhiên liệu trong bối cảnh giá năng lượng biến động.',
    coverImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Minh Trí',
      role: 'Chuyên viên phân tích thị trường',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    },
    publishDate: '21/09/2026',
    readTime: '5 phút đọc',
    viewCount: '8,920',
    tags: ['#ThiTruongOTo', '#SUV2026', '#XeHybrid'],
  },
  {
    id: 'cost-comparison-ev-gasoline',
    category: 'ev',
    categoryName: 'Xe Điện & Công Nghệ',
    title: 'So sánh chi phí sử dụng 5 năm: Xe xăng hạng sang vs Xe điện cao cấp',
    excerpt: 'Bóc tách chi tiết bài toán kinh tế: Chi phí lăn bánh, chi phí nhiên liệu/sạc điện, phí bảo dưỡng định kỳ và giá trị khấu hao xe sau 5 năm sử dụng thực tế.',
    coverImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Thanh Hằng',
      role: 'Biên tập viên tài chính ô tô',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    },
    publishDate: '20/09/2026',
    readTime: '6 phút đọc',
    viewCount: '11,400',
    tags: ['#SoSanhXe', '#ChiPhiNuoiXe', '#XeDien'],
  },
  {
    id: 'carshop-176-inspection-process',
    category: 'guides',
    categoryName: 'Cẩm Nang & Kinh Nghiệm',
    title: 'Quy trình kiểm định 176 hạng mục của CarShop phát hiện lỗi ngập nước và thủy kích thế nào?',
    excerpt: 'Tìm hiểu các thiết bị chuyên dụng nội soi động cơ, đo độ biến dạng khung gầm laser và cảm biến kiểm tra ẩm khoang nội thất được các chuyên gia Đức áp dụng.',
    coverImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Đức Thắng',
      role: 'Giám đốc thẩm định kỹ thuật',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    },
    publishDate: '19/09/2026',
    readTime: '7 phút đọc',
    viewCount: '9,150',
    tags: ['#KiemDinh176HangMuc', '#KinhNghiemMuaXe', '#ChongThuyKich'],
  },
  {
    id: 'mercedes-glc-300-detailed-review',
    category: 'reviews',
    categoryName: 'Đánh Giá Xe',
    title: 'Đánh Giá Mercedes-Benz GLC 300 4MATIC: Chiếc Luxury SUV Đa Dụng Đáng Mua Nhất Phân Khúc?',
    excerpt: 'Gói ngoại thất AMG Line mạnh mẽ kết hợp cùng động cơ Mild-Hybrid 2.0L Turbo êm ái và hệ thống thông tin giải trí MBUX thế hệ mới nhất.',
    coverImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Hoàng Nam',
      role: 'Ban Thử Xe CarShop',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    },
    publishDate: '18/09/2026',
    readTime: '6 phút đọc',
    viewCount: '12,650',
    rating: 9.4,
    tags: ['#MercedesGLC300', '#SUVHangSang', '#DanhGiaXe'],
  },
  {
    id: 'bmw-530i-m-sport-review',
    category: 'reviews',
    categoryName: 'Đánh Giá Xe',
    title: 'Trải Nghiệm BMW 530i M Sport LCI: Cảm Giác Lái Thuần Khiết Đậm Chất Doanh Nhân',
    excerpt: 'Hệ thống treo thích ứng M Sport, phanh thể thao 4 piston và khối động cơ B48 phản hồi chân ga tức thì trong từng khúc cua tốc độ cao.',
    coverImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Tuấn Cường',
      role: 'Chuyên gia thử xe thể thao',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80',
    },
    publishDate: '16/09/2026',
    readTime: '5 phút đọc',
    viewCount: '7,890',
    rating: 9.3,
    tags: ['#BMW5Series', '#SedanTheThao', '#DanhGiaXe'],
  },
];

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      const matchCategory = selectedCategory === 'all' || art.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const heroMainArticle = ARTICLES_DATA[0];
  const heroSideArticles = ARTICLES_DATA.slice(1, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setEmailSubscribed(true);
    setTimeout(() => {
      setEmailSubscribed(false);
      setEmailInput('');
      alert('Cảm ơn quý khách đã đăng ký nhận bản tin CarShop Editorial Digest!');
    }, 800);
  };

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
          <span className="text-slate-900 font-bold">Tạp Chí & Bản Tin Ô Tô Chuyên Sâu</span>
        </nav>

        {/* Cold Luxury Architectural Hero Section (Viewpoint Stable, Zero AI Slop) */}
        <div className="p-1 rounded-[10px] bg-slate-900 shadow-2xl">
          <div className="rounded-[8px] overflow-hidden bg-[#070b14] text-white p-7 sm:p-10 lg:p-12 relative border border-white/10">
            {/* Luminous Atmospheric Depth */}
            <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Headline & Editorial Tone */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>CARSHOP EDITORIAL & AUTOMOTIVE JOURNAL</span>
                </div>

                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12]">
                  Nhịp Đập Xe Sang, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                    Độc Bản & Chuyên Sâu
                  </span>
                </h1>

                <p className="text-slate-300/95 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
                  Cập nhật phân tích thị trường xe sang, đánh giá vận hành thực tế độc quyền và cẩm nang kiểm định 176 hạng mục chuẩn quốc tế.
                </p>

                {/* Telemetry Strip */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-cyan-400" />
                    <span>Đánh giá thử xe độc lập 100%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-cyan-400" />
                    <span>Dữ liệu thị trường kiểm chứng</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap size={15} className="text-cyan-400" />
                    <span>Cập nhật liên tục 24/7</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Lead Review Showcase Card */}
              <div className="lg:col-span-5 relative">
                <div
                  onClick={() => setSelectedArticle(heroMainArticle)}
                  className="relative aspect-[16/10] rounded-[10px] overflow-hidden border border-white/15 shadow-2xl bg-slate-900 group cursor-pointer"
                >
                  <img
                    src={heroMainArticle.coverImage}
                    alt={heroMainArticle.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Spotlight Floating Pill */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[8px] bg-slate-950/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block">
                        BÀI VIẾT TÂM ĐIỂM
                      </span>
                      <div className="font-display font-extrabold text-xs sm:text-sm text-white truncate">
                        {heroMainArticle.title}
                      </div>
                    </div>
                    <span className="font-display font-black text-xs sm:text-sm text-amber-300 shrink-0 flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {heroMainArticle.rating}/10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Deck (Double-Bezel Architecture) */}
        <div className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-xl">
          <div className="bg-white rounded-[8px] p-4 sm:p-5 space-y-4 border border-slate-100">
            {/* Top Toolbar: Search + Quick tags */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
              <div className="lg:col-span-6 relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết, dòng xe, tác giả (vd: Porsche, Taycan, Thuế trước bạ...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 rounded-[10px] border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Trending Tags */}
              <div className="lg:col-span-6 flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 text-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
                  <TrendingUp size={12} className="text-blue-600" />
                  Chủ đề hot:
                </span>
                {['#XeDien2026', '#GiaXeLănBánh', '#KiemDinh176Diem', '#PorscheTaycan', '#ThueTruocBa'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag.replace('#', ''))}
                    className="px-2.5 py-1 rounded-[6px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 border-t border-slate-100">
              {[
                { id: 'all', label: 'Tất cả bài viết' },
                { id: 'reviews', label: 'Đánh giá xe (Reviews)' },
                { id: 'market', label: 'Thị trường ô tô' },
                { id: 'guides', label: 'Cẩm nang & Kinh nghiệm' },
                { id: 'ev', label: 'Xe điện & Công nghệ' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCategory(tab.id as NewsCategory);
                    setSearchQuery('');
                  }}
                  className={`px-3.5 py-1.5 rounded-[8px] text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Editorial Matrix (Asymmetric Bento 7:5) */}
        {selectedCategory === 'all' && searchQuery.trim() === '' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Main Lead Feature (7 cols) */}
            <div
              onClick={() => setSelectedArticle(heroMainArticle)}
              className="lg:col-span-7 p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-xl flex flex-col justify-between group cursor-pointer"
            >
              <div className="bg-white rounded-[8px] p-5 sm:p-6 space-y-4 border border-slate-100 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] rounded-[8px] overflow-hidden bg-slate-900 border border-slate-100">
                    <img
                      src={heroMainArticle.coverImage}
                      alt={heroMainArticle.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-[6px] bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                        ĐÁNH GIÁ ĐỘC QUYỀN
                      </span>
                      <span className="px-2 py-0.5 rounded-[6px] bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold flex items-center gap-1 border border-white/10">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        {heroMainArticle.rating}/10
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                      <span>{heroMainArticle.publishDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {heroMainArticle.readTime}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Eye size={12} /> {heroMainArticle.viewCount} lượt xem</span>
                    </div>

                    <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {heroMainArticle.title}
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {heroMainArticle.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={heroMainArticle.author.avatar}
                      alt={heroMainArticle.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="font-bold text-xs text-slate-900">{heroMainArticle.author.name}</div>
                      <div className="text-[10px] text-slate-500">{heroMainArticle.author.role}</div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Đọc toàn bài</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>

            {/* Side 3 Stacked Articles (5 cols) */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              {heroSideArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all group cursor-pointer flex-1"
                >
                  <div className="bg-white rounded-[8px] p-4 border border-slate-100 flex gap-3.5 items-center h-full">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-24 h-20 rounded-[8px] object-cover bg-slate-100 shrink-0 group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-bold text-blue-600 uppercase tracking-wider">{art.categoryName}</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-xs text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All / Filtered Articles Grid (Double-Bezel 3-Column Grid) */}
        <section className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                KHO LƯU TRỮ BÀI VIẾT
              </span>
              <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">
                {selectedCategory === 'all' ? 'Tất Cả Bài Viết Mới Nhất' : 'Danh Sách Bài Viết Theo Chủ Đề'}
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Hiển thị {filteredArticles.length} bài viết
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="p-1 rounded-[10px] bg-white border border-slate-200/90 shadow-xl flex flex-col justify-between group cursor-pointer"
              >
                <div className="bg-white rounded-[8px] p-4 sm:p-5 space-y-3.5 border border-slate-100 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] rounded-[8px] overflow-hidden bg-slate-900 border border-slate-100">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-white">
                        {art.categoryName}
                      </div>
                      {art.rating && (
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 flex items-center gap-0.5">
                          <Star size={10} className="fill-slate-950" />
                          {art.rating}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                        <span>{art.publishDate}</span>
                        <span>•</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h4 className="font-display font-black text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={art.author.avatar}
                        alt={art.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px]">
                        {art.author.name}
                      </span>
                    </div>

                    <span className="text-blue-600 font-bold text-xs flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      <span>Đọc tiếp</span>
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VIP Newsletter Subscription Bar (Double-Bezel Architecture) */}
        <div className="p-1 rounded-[10px] bg-slate-900 shadow-xl">
          <div className="rounded-[8px] bg-[#070b14] p-5 sm:p-6 text-white border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <Mail size={13} className="text-cyan-400" />
                  <span>BẢN TIN Ô TÔ CARSHOP WEEKLY DIGEST</span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                  Nhận Báo Cáo Thị Trường Định Kỳ
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Đăng ký email để nhận bảng phân tích giá xe sang hàng tuần, các ưu đãi độc quyền kín và cẩm nang lái thử gửi trực tiếp vào hòm thư.
                </p>
              </div>

              <div className="lg:col-span-6">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Nhập địa chỉ email của bạn..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-[10px] bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all"
                  />
                  <button
                    type="submit"
                    className="group py-2.5 px-5 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 shrink-0 cursor-pointer"
                  >
                    <span>Đăng Ký Ngay</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* ARTICLE READER MODAL (Double-Bezel Architecture) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="p-1 rounded-[10px] bg-white shadow-2xl max-w-3xl w-full border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="bg-white rounded-[8px] p-6 sm:p-8 space-y-5 border border-slate-100 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="px-2.5 py-1 rounded-[6px] text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                  {selectedArticle.categoryName}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-[6px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 leading-tight">
                  {selectedArticle.title}
                </h2>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedArticle.author.avatar}
                      alt={selectedArticle.author.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="font-bold text-slate-900">{selectedArticle.author.name}</span>
                  </div>
                  <span>•</span>
                  <span>{selectedArticle.publishDate}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="aspect-[16/9] rounded-[8px] overflow-hidden bg-slate-900 border border-slate-100">
                <img
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 font-normal">
                <p className="font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                  {selectedArticle.excerpt}
                </p>
                {selectedArticle.content ? (
                  selectedArticle.content.map((p, i) => <p key={i}>{p}</p>)
                ) : (
                  <>
                    <p>
                      Thị trường xe sang tại Việt Nam đang chứng kiến những bước chuyển mình mạnh mẽ với sự hội tụ của công nghệ điện hóa, tiện nghi số hóa khoang lái và các tiêu chuẩn kiểm định an toàn nghiêm ngặt từ châu Âu.
                    </p>
                    <p>
                      Đội ngũ chuyên gia thẩm định CarShop với hơn 10 năm kinh nghiệm trong ngành luôn sẵn sàng hỗ trợ quý khách hàng kiểm định chuyên sâu 176 hạng mục độc lập và đưa ra giải pháp tài chính tối ưu nhất.
                    </p>
                  </>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedArticle.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-[8px] bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Đóng Bài Viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
