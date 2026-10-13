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
  Volume2
} from 'lucide-react';
import { Navbar } from '../home/components/Navbar';
import { Footer } from '../home/components/Footer';
import { ROUTES } from '../../constants';

// Category interface
type NewsCategory = 'all' | 'reviews' | 'market' | 'guides' | 'ev' | 'video';

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
  rating?: number; // e.g. 9.4
  isExclusive?: boolean;
  tags: string[];
  content?: string[];
}

const ARTICLES_DATA: ArticleItem[] = [
  // 1. Hero Exclusive
  {
    id: 'porsche-taycan-4s-review',
    category: 'reviews',
    categoryName: 'Đánh Giá Xe',
    title: 'Đánh Giá Thực Tế Porsche Taycan 4S: Xe Điện Thể Thao Đã Đủ Sức Thay Thế Xe Xăng Truyền Thống Tại Việt Nam?',
    excerpt: 'Sau hơn 1,200 km thử thách từ đô thị Hà Nội vượt đèo Hải Vân đến Đà Nẵng, phiên bản Taycan 4S Cross Turismo 530 HP chứng minh khả năng kiểm soát khung gầm đỉnh cao và sự tiện dụng vượt mong đợi của nền tảng sạc 800V.',
    coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&auto=format&fit=crop&q=85',
    author: {
      name: 'Hoàng Nam',
      role: 'Kỹ sư trưởng Ban Thử Xe CarShop',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '22/09/2026',
    readTime: '8 phút đọc',
    viewCount: '14,280',
    rating: 9.6,
    isExclusive: true,
    tags: ['#PorscheTaycan', '#XeDien2025', '#DanhGiaXe'],
    content: [
      'Porsche Taycan không đơn thuần là một chiếc xe điện. Đó là minh chứng cho thấy DNA thể thao thuần khiết của Stuttgart hoàn toàn có thể thăng hoa mà không cần đến tiếng gầm của động cơ đốt trong.',
      'Trải nghiệm hệ thống treo khí nén thích ứng PASM trên các cung đường gồ ghề cho thấy sự êm ái tiệm cận Panamera nhưng khi chuyển sang chế độ Sport Plus, xe ghì sát mặt đường với trọng tâm cực thấp từ cụm pin 93.4 kWh.',
      'Thời gian nạp pin từ 5% lên 80% chỉ mất 22.5 phút tại trạm sạc siêu nhanh DC 800V đã xóa bỏ hoàn toàn rào cản tâm lý về việc di chuyển đường dài của người dùng xe sang tại Việt Nam.'
    ]
  },

  // 2. Secondary Hero items
  {
    id: 'market-q2-suv-hybrid',
    category: 'market',
    categoryName: 'Thị Trường Ô Tô',
    title: 'Thị trường ô tô Việt Nam quý 2: Xe SUV gầm cao và hybrid tiếp tục dẫn đầu doanh số bán lẻ',
    excerpt: 'Xu hướng người tiêu dùng chuyển dịch mạnh mẽ sang các dòng xe gầm cao đa dụng và động cơ lai hybrid tiết kiệm nhiên liệu trong bối cảnh giá năng lượng biến động.',
    coverImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Minh Trí',
      role: 'Chuyên viên phân tích thị trường',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '21/09/2026',
    readTime: '5 phút đọc',
    viewCount: '8,920',
    tags: ['#ThiTruongOTo', '#SUV2025', '#XeHybrid']
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
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '20/09/2026',
    readTime: '6 phút đọc',
    viewCount: '11,400',
    tags: ['#SoSanhXe', '#ChiPhiNuoiXe', '#XeDien']
  },
  {
    id: 'carshop-176-inspection-process',
    category: 'guides',
    categoryName: 'Cẩm Nang & Kinh Nghiệm',
    title: 'Quy trình kiểm định 176 điểm của CarShop phát hiện lỗi ngập nước và thủy kích thế nào?',
    excerpt: 'Tìm hiểu các thiết bị chuyên dụng nội soi động cơ, đo độ biến dạng khung gầm laser và cảm biến kiểm tra ẩm khoang nội thất được các chuyên gia Đức áp dụng.',
    coverImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Đức Thắng',
      role: 'Giám đốc thẩm định kỹ thuật',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '19/09/2026',
    readTime: '7 phút đọc',
    viewCount: '9,150',
    tags: ['#KiemDinh176Diem', '#KinhNghiemMuaXe', '#ChongThuyKich']
  },

  // 3. Grid: In-depth Reviews
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
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '18/09/2026',
    readTime: '6 phút đọc',
    viewCount: '12,650',
    rating: 9.4,
    tags: ['#MercedesGLC300', '#SUVHangSang', '#DanhGiaXe']
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
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '16/09/2026',
    readTime: '5 phút đọc',
    viewCount: '7,890',
    rating: 9.3,
    tags: ['#BMW5Series', '#SedanTheThao', '#DanhGiaXe']
  },
  {
    id: 'audi-etron-gt-review',
    category: 'reviews',
    categoryName: 'Đánh Giá Xe',
    title: 'Đánh Giá Siêu Xe Điện Audi e-tron GT Quattro: Đỉnh Cao Điêu Khắc Khí Động Học Đức',
    excerpt: 'Được lắp ráp thủ công tại xưởng Böllinger Höfe, e-tron GT hòa quyện hoàn hảo giữa hiệu suất 530 mã lực và sự thoải mái của dòng xe Gran Turismo.',
    coverImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Hoàng Nam',
      role: 'Ban Thử Xe CarShop',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '15/09/2026',
    readTime: '7 phút đọc',
    viewCount: '10,320',
    rating: 9.5,
    tags: ['#AudietronGT', '#GranTurismo', '#XeDien']
  },
  {
    id: 'vinfast-vf9-family-review',
    category: 'reviews',
    categoryName: 'Đánh Giá Xe',
    title: 'Trải Nghiệm Gia Đình Với VinFast VF 9 Plus: Ghế Cơ Trưởng Hạng Thương Gia Có Gì Đặc Biệt?',
    excerpt: 'Đánh giá thực tế không gian hàng ghế thứ 2 VIP, khả năng cách âm chủ động, hệ số an toàn ADAS cấp 2 và trải nghiệm sạc xuyên Việt.',
    coverImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Thanh Hằng',
      role: 'Biên tập viên',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '14/09/2026',
    readTime: '6 phút đọc',
    viewCount: '13,100',
    rating: 9.1,
    tags: ['#VinFastVF9', '#SUV6Cho', '#XeDienViet']
  },

  // 4. EV & Technology
  {
    id: 'solid-state-battery-breakthrough',
    category: 'ev',
    categoryName: 'Xe Điện & Công Nghệ',
    title: 'Công nghệ pin thể rắn Solid-State: Cuộc cách mạng sạc 10 phút đi 1,000 km sắp thành hiện thực?',
    excerpt: 'Các hãng xe sang như Porsche, Mercedes và Toyota đang đẩy nhanh tiến độ thương mại hóa cụm pin thể rắn với độ an toàn chống cháy nổ tuyệt đối.',
    coverImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Minh Trí',
      role: 'Chuyên gia công nghệ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '12/09/2026',
    readTime: '6 phút đọc',
    viewCount: '15,600',
    tags: ['#PinTheRan', '#CongNgheXeDien', '#TuongLaiEV']
  },
  {
    id: 'fast-charging-network-vietnam',
    category: 'ev',
    categoryName: 'Xe Điện & Công Nghệ',
    title: 'Bản đồ quy hoạch trạm sạc siêu nhanh 360 kW dọc các tuyến cao tốc Bắc - Nam',
    excerpt: 'Hạ tầng sạc công cộng tại Việt Nam đang phát triển thần tốc với các trụ sạc đa cổng công suất cao, tương thích chuẩn sạc CCS2 châu Âu.',
    coverImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Thanh Hằng',
      role: 'Biên tập viên',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '10/09/2026',
    readTime: '5 phút đọc',
    viewCount: '8,430',
    tags: ['#TramSacEV', '#CaoTocBacNam', '#XeDien2025']
  },

  // 5. Guides & Tips
  {
    id: 'guide-inspect-used-car',
    category: 'guides',
    categoryName: 'Cẩm Nang & Kinh Nghiệm',
    title: 'Cẩm nang 10 bước kiểm tra xe ô tô cũ: Nhận biết xe đã bị tua công-tơ-mét và bổ máy',
    excerpt: 'Kinh nghiệm vàng từ chuyên gia định giá CarShop: Cách soi độ mòn chân ga, kính chắn gió, cảm biến túi khí và kiểm tra lịch sử hãng.',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Đức Thắng',
      role: 'Giám đốc thẩm định kỹ thuật',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '08/09/2026',
    readTime: '8 phút đọc',
    viewCount: '21,300',
    tags: ['#KiemTraXeCu', '#KinhNghiemMuaXe', '#XeLuot']
  },
  {
    id: 'guide-registration-tax-2025',
    category: 'guides',
    categoryName: 'Cẩm Nang & Kinh Nghiệm',
    title: 'Quy định mới nhất về thủ tục sang tên đổi chủ và cách tính thuế trước bạ ô tô lướt',
    excerpt: 'Hướng dẫn chuẩn bị hồ sơ thu hồi biển số định danh, thủ tục đăng ký xe online trên cổng dịch vụ công quốc gia nhanh gọn không qua cò lái.',
    coverImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'Luật sư Trần Văn Bảo',
      role: 'Cố vấn pháp lý CarShop',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80'
    },
    publishDate: '05/09/2026',
    readTime: '6 phút đọc',
    viewCount: '16,700',
    tags: ['#ThuTucSangTen', '#ThueTruocBa', '#BienSoDinhDanh']
  }
];

// Trending Cars Widget Data
const TRENDING_CARS = [
  {
    id: 'porsche-taycan',
    name: 'Porsche Taycan 4S Cross Turismo',
    year: 2023,
    price: '4.850 Tỷ',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&auto=format&fit=crop&q=80',
    link: '/cars/taycan'
  },
  {
    id: 'mercedes-glc300',
    name: 'Mercedes-Benz GLC 300 4MATIC',
    year: 2023,
    price: '2.469 Tỷ',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&auto=format&fit=crop&q=80',
    link: '/#inventory'
  },
  {
    id: 'bmw-530i',
    name: 'BMW 530i M Sport LCI',
    year: 2023,
    price: '2.599 Tỷ',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&auto=format&fit=crop&q=80',
    link: '/#inventory'
  },
  {
    id: 'vinfast-vf9',
    name: 'VinFast VF 9 Plus 6 Chỗ',
    year: 2024,
    price: '1.890 Tỷ',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&auto=format&fit=crop&q=80',
    link: '/#inventory'
  }
];

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [showValuationModal, setShowValuationModal] = useState(false);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  // Leading hero article & side hero articles
  const heroMainArticle = ARTICLES_DATA[0];
  const heroSideArticles = ARTICLES_DATA.slice(1, 4);

  // Reviews section articles
  const reviewsArticles = useMemo(() => {
    return ARTICLES_DATA.filter((a) => a.category === 'reviews' && !a.isExclusive);
  }, []);

  // EV articles
  const evArticles = useMemo(() => {
    return ARTICLES_DATA.filter((a) => a.category === 'ev');
  }, []);

  // Guides articles
  const guidesArticles = useMemo(() => {
    return ARTICLES_DATA.filter((a) => a.category === 'guides');
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setEmailSubscribed(true);
    setTimeout(() => {
      setEmailSubscribed(false);
      setEmailInput('');
      alert('Cảm ơn bạn đã đăng ký nhận bản tin CarShop Weekly Digest!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#0f172a] font-sans selection:bg-[#0066ff] selection:text-white">
      {/* 1. Top Navigation Bar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* 2. Breadcrumbs & Sub-Header Tạp chí */}
        <div className="space-y-4">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to={ROUTES.HOME} className="hover:text-[#0066ff] transition-colors font-medium">
              Trang chủ
            </Link>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">
              Tin tức & Tạp chí ô tô
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066ff] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={14} />
                CARSHOP EDITORIAL & MAGAZINE
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Tin Tức, Đánh Giá & Cẩm Nang Ô Tô
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Cập nhật nhịp đập thị trường ô tô cao cấp, đánh giá xe chuyên sâu độc quyền và cẩm nang kinh nghiệm mua bán xe lướt chuẩn xác.
              </p>
            </div>

            {/* Smart Search Bar */}
            <div className="w-full md:w-96 space-y-2">
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm bài viết, mẫu xe, tác giả..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-16 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/15 outline-none transition-all shadow-xs"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  ⌘K
                </span>
              </div>
            </div>
          </div>

          {/* Trending Tags Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs whitespace-nowrap">
            <span className="font-bold text-slate-500 flex items-center gap-1 shrink-0">
              <TrendingUp size={14} className="text-[#0066ff]" />
              Xu hướng:
            </span>
            {['#XeDien2025', '#GiaXeThang', '#SoSanhXe', '#BaoDuongXe', '#LuatGiaoThong', '#PorscheTaycan'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag.replace('#', ''))}
                className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-[#0066ff] hover:text-[#0066ff] font-medium transition-colors cursor-pointer shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Thanh Phân Loại Danh Mục Tin Tức (Categories Nav) */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 sm:gap-4 no-scrollbar">
          {[
            { id: 'all', label: 'Tất cả tin tức' },
            { id: 'reviews', label: 'Đánh giá xe chuyên sâu (Reviews)' },
            { id: 'market', label: 'Thị trường ô tô' },
            { id: 'guides', label: 'Kinh nghiệm & Cẩm nang lái xe' },
            { id: 'ev', label: 'Xe điện & Công nghệ EV' },
            { id: 'video', label: 'Video lái thử (Test Drive)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id as NewsCategory);
                setSearchQuery('');
              }}
              className={`pb-3.5 px-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer relative ${
                selectedCategory === tab.id
                  ? 'text-[#0066ff] border-b-2 border-[#0066ff]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4. Bài Viết Tiêu Điểm Nổi Bật (Hero Featured Article - Magazine Style) */}
        {selectedCategory === 'all' && searchQuery.trim() === '' && (
          <section className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Main Leading Feature (Left 7 Cols) */}
              <div
                onClick={() => setSelectedArticle(heroMainArticle)}
                className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={heroMainArticle.coverImage}
                    alt={heroMainArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#0066ff] text-white text-xs font-bold tracking-wide shadow-md">
                      ĐÁNH GIÁ ĐỘC QUYỀN
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {heroMainArticle.rating}/10
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-3 text-xs text-slate-300 mb-1">
                      <span>{heroMainArticle.publishDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {heroMainArticle.readTime}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Eye size={12} /> {heroMainArticle.viewCount}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#0066ff] transition-colors leading-snug">
                      {heroMainArticle.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {heroMainArticle.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={heroMainArticle.author.avatar}
                        alt={heroMainArticle.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{heroMainArticle.author.name}</div>
                        <div className="text-[11px] text-slate-500">{heroMainArticle.author.role}</div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0066ff] group-hover:translate-x-1 transition-transform">
                      <span>Đọc bài phân tích</span>
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Secondary Editorial Pieces (Right 5 Cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                {heroSideArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all group cursor-pointer flex gap-4 items-center"
                  >
                    <div className="w-28 sm:w-36 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#0066ff] uppercase tracking-wider">
                        {art.categoryName}
                      </span>
                      <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0066ff] transition-colors line-clamp-2 leading-snug">
                        {art.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>{art.publishDate}</span>
                        <span>•</span>
                        <span>{art.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. Khối Tin Tức Theo Chủ Đề (Main 2/3 Column + Sticky Sidebar 1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CỘT CHÍNH (LEFT 8 COLS) */}
          <div className="lg:col-span-8 space-y-12">
            {/* If a filter is applied, show filtered results */}
            {(selectedCategory !== 'all' || searchQuery.trim() !== '') ? (
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h2 className="font-display text-xl font-bold text-slate-900">
                    Kết Quả Tìm Kiếm ({filteredArticles.length} bài viết)
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-[#0066ff] font-bold hover:underline"
                  >
                    Xem tất cả tin tức
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredArticles.map((art) => (
                    <ArticleCard key={art.id} article={art} onSelect={() => setSelectedArticle(art)} />
                  ))}
                </div>
              </section>
            ) : (
              <>
                {/* SECTION 1: Đánh Giá & So Sánh Xe Thực Tế */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                        CHUYÊN MỤC TRỌNG ĐIỂM
                      </span>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                        Đánh Giá & So Sánh Xe Thực Tế
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedCategory('reviews')}
                      className="text-xs font-bold text-[#0066ff] hover:text-[#0050cb] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Xem tất cả đánh giá</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {reviewsArticles.map((art) => (
                      <ArticleCard key={art.id} article={art} onSelect={() => setSelectedArticle(art)} />
                    ))}
                  </div>
                </section>

                {/* SECTION 2: Xe Điện & Xu Hướng Tương Lai */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                        <Zap size={14} />
                        KỶ NGUYÊN DI CHUYỂN XANH
                      </span>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                        Xe Điện & Công Nghệ Tương Lai
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedCategory('ev')}
                      className="text-xs font-bold text-[#0066ff] hover:text-[#0050cb] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Xem tin xe điện</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {evArticles.map((art) => (
                      <ArticleCard key={art.id} article={art} onSelect={() => setSelectedArticle(art)} />
                    ))}
                  </div>
                </section>

                {/* SECTION 3: Cẩm Nang & Kinh Nghiệm Mua Bán Xe Lướt */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck size={14} />
                        CẨM NANG HỮU ÍCH
                      </span>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                        Kinh Nghiệm Mua Bán Xe Lướt & Pháp Lý
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedCategory('guides')}
                      className="text-xs font-bold text-[#0066ff] hover:text-[#0050cb] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Xem cẩm nang</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {guidesArticles.map((art) => (
                      <ArticleCard key={art.id} article={art} onSelect={() => setSelectedArticle(art)} />
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* 6. Phân Trang (Pagination) */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-center gap-2">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? 'bg-[#0066ff] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-slate-400 px-1 font-bold">...</span>
              <button
                onClick={() => setCurrentPage(24)}
                className="w-10 h-10 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
              >
                24
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, 24))}
                className="px-4 h-10 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Tiếp theo</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* CỘT PHỤ (RIGHT 4 COLS SIDEBAR) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* WIDGET 1: Mẫu Xe Được Quan Tâm Nhất Tuần */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-blue-50 text-[#0066ff]">
                    <Car size={16} />
                  </span>
                  <h3 className="font-display font-bold text-sm text-slate-900">
                    Xe Quan Tâm Nhất Tuần
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Sẵn giao ngay
                </span>
              </div>

              <div className="space-y-3">
                {TRENDING_CARS.map((car) => (
                  <Link
                    key={car.id}
                    to={car.link}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all group"
                  >
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-16 h-12 rounded-lg object-cover bg-slate-100 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-slate-500">{car.year}</div>
                      <h4 className="font-display font-bold text-xs text-slate-900 group-hover:text-[#0066ff] transition-colors truncate">
                        {car.name}
                      </h4>
                      <div className="text-xs font-extrabold text-[#0066ff]">
                        {car.price}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                to="/#inventory"
                className="block text-center py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
              >
                Xem toàn bộ kho xe tại showroom
              </Link>
            </div>

            {/* WIDGET 2: Bảng Giá Xe Mới Cập Nhật (PDF Download) */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-white/15 backdrop-blur-md">
                  <Download size={20} className="text-white" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Bảng Giá Xe Mới Nhất
                  </h3>
                  <p className="text-xs text-blue-100">Cập nhật tháng 09/2026</p>
                </div>
              </div>

              <p className="text-xs text-blue-100 leading-relaxed">
                Tải về cẩm nang tổng hợp giá lăn bánh, chính sách ưu đãi lệ phí trước bạ và lãi suất trả góp của hơn 150 mẫu xe sang.
              </p>

              <button
                onClick={() => alert('Đang tải xuống tài liệu: Bang_Gia_O_To_CarShop_Thang_09_2026.pdf')}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-[#0066ff] hover:bg-blue-50 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={14} />
                <span>Tải Bảng Giá PDF (Miễn phí)</span>
              </button>
            </div>

            {/* WIDGET 3: Đăng Ký Nhận Bản Tin (CarShop Weekly Digest) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-blue-50 text-[#0066ff]">
                  <Mail size={16} />
                </span>
                <h3 className="font-display font-bold text-sm text-slate-900">
                  CarShop Weekly Digest
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Nhận phân tích thị trường độc quyền và thông báo các mẫu xe lướt giá tốt nhất vào mỗi sáng thứ 7.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Nhập địa chỉ email của bạn..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none"
                />
                <button
                  type="submit"
                  disabled={emailSubscribed}
                  className="w-full py-2.5 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 size={14} />
                  <span>{emailSubscribed ? 'Đã đăng ký!' : 'Đăng Ký Nhận Tin'}</span>
                </button>
              </form>

              <div className="text-[10px] text-slate-400 text-center">
                Không spam • Có thể hủy đăng ký bất kỳ lúc nào
              </div>
            </div>

            {/* WIDGET 4: Podcast & Video Lái Thử Ngắn */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-rose-50 text-rose-600">
                    <Play size={16} />
                  </span>
                  <h3 className="font-display font-bold text-sm text-slate-900">
                    Video & Podcast Lái Thử
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  4K HDR
                </span>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={20} className="fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[11px] text-white/90">
                  <span className="font-semibold truncate">Tập 12: Đánh giá Porsche Taycan 4S</span>
                  <span>14:20</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 text-center">
                Phát sóng định kỳ trên YouTube & Spotify CarShop
              </div>
            </div>
          </aside>
        </div>

        {/* 7. Banner CTA 'Định giá & Đăng bán xe nhanh' */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#0050cb] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              DỊCH VỤ THU MUA & ĐỔI XE CAO CẤP
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Bạn Muốn Lên Đời Xe Mới? Định Giá Miễn Phí Trong 15 Phút
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              CarShop cam kết thu mua xe lướt với giá cạnh tranh nhất thị trường, thanh toán 100% trong ngày và hỗ trợ thủ tục công chứng sang tên tận nơi.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setShowValuationModal(true)}
                className="px-6 py-3 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Định Giá Xe Của Bạn Ngay</span>
                <ChevronRight size={16} />
              </button>
              <a
                href="tel:18006868"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all cursor-pointer text-center"
              >
                Hotline: 1800 6868
              </a>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block opacity-20 pointer-events-none">
            <Car size={320} className="text-white transform translate-x-12 translate-y-12" />
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* MODAL: Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 -mx-2 -mt-2">
                <img
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#0066ff] text-white text-xs font-bold">
                    {selectedArticle.categoryName}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{selectedArticle.publishDate}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                  <span>•</span>
                  <span>{selectedArticle.viewCount} lượt xem</span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {selectedArticle.title}
                </h2>

                <div className="flex items-center gap-3 py-3 border-y border-slate-100">
                  <img
                    src={selectedArticle.author.avatar}
                    alt={selectedArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{selectedArticle.author.name}</div>
                    <div className="text-[11px] text-slate-500">{selectedArticle.author.role}</div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                <p className="font-medium text-slate-900 bg-slate-50 p-4 rounded-xl border-l-4 border-[#0066ff]">
                  {selectedArticle.excerpt}
                </p>

                {selectedArticle.content ? (
                  selectedArticle.content.map((p, idx) => (
                    <p key={idx} className="leading-relaxed">{p}</p>
                  ))
                ) : (
                  <p className="leading-relaxed">
                    Bài viết đầy đủ đang được đồng bộ trực tiếp từ Ban Thử Xe & Tạp Chí Ô Tô CarShop. Quý độc giả có thể theo dõi thêm các chuyên mục đánh giá xe độc quyền và tin tức công nghệ mới nhất trên hệ thống.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  {selectedArticle.tags.map((t) => (
                    <span key={t} className="text-[11px] font-bold text-[#0066ff] bg-blue-50 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Đã sao chép liên kết bài viết!');
                  }}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 size={14} />
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Quick Car Valuation Modal */}
      {showValuationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 space-y-5">
            <button
              onClick={() => setShowValuationModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">
                ĐỊNH GIÁ XE MIỄN PHÍ TRONG 15 PHÚT
              </span>
              <h3 className="font-display text-xl font-bold text-slate-900 mt-1">
                Yêu Cầu Định Giá & Bán Xe
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Hệ thống AI & chuyên viên kiểm định CarShop sẽ tính toán giá trị thu mua tốt nhất cho xe của bạn.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Yêu cầu định giá xe đã gửi thành công! Chuyên viên thẩm định CarShop sẽ liên hệ báo giá trong 15 phút.');
                setShowValuationModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hãng xe & Dòng xe của bạn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Mercedes C300, Porsche Macan..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-[#0066ff] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Năm sản xuất
                  </label>
                  <input
                    type="number"
                    defaultValue={2022}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#0066ff] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số km đã đi (ODO)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 15,000 km"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#0066ff] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Số điện thoại nhận báo giá *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="098x xxx xxx"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-[#0066ff] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Nhận Kết Quả Định Giá Ngay
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Article Card Component
interface ArticleCardProps {
  article: ArticleItem;
  onSelect: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-white">
            {article.categoryName}
          </span>
          {article.rating && (
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-bold text-[11px] shadow-sm flex items-center gap-1">
              <Star size={12} className="fill-current" />
              {article.rating}
            </span>
          )}
        </div>

        <div className="p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>{article.publishDate}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#0066ff] transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-[11px] font-medium text-slate-700">{article.author.name}</span>
        </div>

        <span className="text-xs font-bold text-[#0066ff] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>Đọc tiếp</span>
          <ChevronRight size={14} />
        </span>
      </div>
    </div>
  );
};

export default NewsPage;
