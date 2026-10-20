import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

// High-Fidelity Automotive Brand SVG Logos
const MercedesLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10 text-slate-800 group-hover/item:text-blue-600 transition-colors" fill="none">
    <circle cx="20" cy="20" r="17.5" stroke="currentColor" strokeWidth="2.2" />
    <path d="M20 20 L20 4.5 M20 20 L7 27.5 M20 20 L33 27.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="20" cy="20" r="2.5" fill="currentColor" />
  </svg>
);

const BmwLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    <circle cx="20" cy="20" r="18.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="12.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
    <path d="M20 7.5 A12.5 12.5 0 0 1 32.5 20 L20 20 Z" fill="#0066b1" />
    <path d="M20 20 L7.5 20 A12.5 12.5 0 0 1 20 7.5 Z" fill="#ffffff" />
    <path d="M20 20 L20 32.5 A12.5 12.5 0 0 1 7.5 20 Z" fill="#0066b1" />
    <path d="M20 20 L32.5 20 A12.5 12.5 0 0 1 20 32.5 Z" fill="#ffffff" />
  </svg>
);

const PorscheLogo = () => (
  <svg viewBox="0 0 36 40" className="w-9 h-11">
    <path d="M18 1 L33 6 L30 26 L18 39 L6 26 L3 6 Z" fill="#b91c1c" stroke="#f59e0b" strokeWidth="2" />
    <path d="M18 6 L28 10 L25 24 L18 33 L11 24 L8 10 Z" fill="#f59e0b" />
    <path d="M18 11 L22 17 L18 25 L14 17 Z" fill="#1e293b" />
  </svg>
);

const AudiLogo = () => (
  <svg viewBox="0 0 64 24" className="w-16 h-8 text-slate-800 group-hover/item:text-blue-600 transition-colors" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="25" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="39" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="52" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.2" />
  </svg>
);

const LexusLogo = () => (
  <svg viewBox="0 0 44 32" className="w-12 h-9 text-slate-800 group-hover/item:text-blue-600 transition-colors" fill="none">
    <ellipse cx="22" cy="16" rx="19" ry="13.5" stroke="currentColor" strokeWidth="2.2" />
    <path d="M16 8.5 L16 23.5 L28 23.5 L25 18.5 L20.5 18.5 L20.5 8.5 Z" fill="currentColor" />
  </svg>
);

const VinFastLogo = () => (
  <svg viewBox="0 0 40 32" className="w-12 h-9 text-slate-800 group-hover/item:text-blue-600 transition-colors" fill="none">
    <path d="M4 6 L20 26 L36 6 L30 6 L20 19 L10 6 Z" fill="currentColor" />
    <path d="M9 6 L20 20 L31 6 L28 6 L20 16 L12 6 Z" fill="#0284c7" />
  </svg>
);

const LandRoverLogo = () => (
  <svg viewBox="0 0 54 28" className="w-16 h-8" fill="none">
    <ellipse cx="27" cy="14" rx="25" ry="12" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
    <text x="27" y="17.5" fill="#ffffff" fontSize="7" fontWeight="900" textAnchor="middle" letterSpacing="0.8">LAND ROVER</text>
  </svg>
);

const BentleyLogo = () => (
  <svg viewBox="0 0 50 28" className="w-14 h-8 text-slate-800 group-hover/item:text-blue-600 transition-colors" fill="none">
    <path d="M4 14 Q14 4 21 11 L21 17 Q14 24 4 14 Z" fill="currentColor" opacity="0.8" />
    <path d="M46 14 Q36 4 29 11 L29 17 Q36 24 46 14 Z" fill="currentColor" opacity="0.8" />
    <circle cx="25" cy="14" r="7.5" fill="#1e293b" stroke="currentColor" strokeWidth="1.8" />
    <text x="25" y="18" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">B</text>
  </svg>
);

const MaseratiLogo = () => (
  <svg viewBox="0 0 36 36" className="w-10 h-10 text-slate-800 group-hover/item:text-blue-600 transition-colors" fill="none">
    <path d="M18 3 L18 29 M18 33 L18 29 M10 11 L10 20 Q10 24 18 24 Q26 24 26 20 L26 11 M14 27 L22 27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <polygon points="18,3 15,10 21,10" fill="currentColor" />
    <polygon points="10,11 7,16 13,16" fill="currentColor" />
    <polygon points="26,11 23,16 29,16" fill="currentColor" />
  </svg>
);

const RollsRoyceLogo = () => (
  <svg viewBox="0 0 36 40" className="w-10 h-11 text-slate-800 group-hover/item:text-blue-600 transition-colors" fill="none">
    <rect x="4" y="2" width="28" height="36" rx="4" fill="#0f172a" stroke="currentColor" strokeWidth="1.8" />
    <text x="14" y="22" fill="#ffffff" fontSize="14" fontWeight="900" textAnchor="middle">R</text>
    <text x="22" y="29" fill="#94a3b8" fontSize="14" fontWeight="900" textAnchor="middle">R</text>
  </svg>
);

const FerrariLogo = () => (
  <svg viewBox="0 0 36 42" className="w-10 h-11.5">
    <path d="M18 1 L34 7 L31 32 L18 41 L5 32 L2 7 Z" fill="#facc15" stroke="#1e293b" strokeWidth="1.8" />
    <path d="M18 10 C16 14 13 18 15 26 C17 22 20 18 18 10 Z" fill="#1e293b" />
    <path d="M6 7 L30 7" stroke="#ef4444" strokeWidth="2.5" />
    <path d="M14 7 L22 7" stroke="#ffffff" strokeWidth="2.5" />
    <path d="M6 7 L14 7" stroke="#22c55e" strokeWidth="2.5" />
  </svg>
);

const LamborghiniLogo = () => (
  <svg viewBox="0 0 36 40" className="w-10 h-11">
    <path d="M18 1 L34 8 L31 30 L18 39 L5 30 L2 8 Z" fill="#0f172a" stroke="#eab308" strokeWidth="2" />
    <polygon points="18,12 12,23 24,23" fill="#eab308" />
    <path d="M10 15 Q18 20 26 15" stroke="#eab308" strokeWidth="2" fill="none" />
  </svg>
);

const AstonMartinLogo = () => (
  <svg viewBox="0 0 56 24" className="w-16 h-8 text-slate-800 group-hover/item:text-blue-600 transition-colors" fill="none">
    <path d="M4 14 C12 6, 22 10, 28 14 C34 10, 44 6, 52 14" stroke="currentColor" strokeWidth="2" />
    <path d="M8 17 C16 10, 24 13, 28 17 C32 13, 40 10, 48 17" stroke="currentColor" strokeWidth="1.5" />
    <rect x="20" y="8" width="16" height="7" rx="2" fill="#0f172a" stroke="currentColor" strokeWidth="1" />
    <text x="28" y="13.5" fill="#ffffff" fontSize="5" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">ASTON</text>
  </svg>
);

const VolvoLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10 text-slate-800 group-hover/item:text-blue-600 transition-colors" fill="none">
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2.2" />
    <path d="M29 11 L36 4 M36 4 L30 4 M36 4 L36 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <rect x="10" y="16.5" width="20" height="7" rx="1.5" fill="#0f172a" />
    <text x="20" y="21.5" fill="#ffffff" fontSize="5.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">VOLVO</text>
  </svg>
);

export const BrandMarqueeTicker: React.FC = () => {
  const navigate = useNavigate();

  const luxuryBrands = [
    { name: 'Porsche', country: 'Stuttgart, Đức', icon: <PorscheLogo /> },
    { name: 'Mercedes-Benz', country: 'Stuttgart, Đức', icon: <MercedesLogo /> },
    { name: 'BMW', country: 'Munich, Đức', icon: <BmwLogo /> },
    { name: 'Audi', country: 'Ingolstadt, Đức', icon: <AudiLogo /> },
    { name: 'Lexus', country: 'Nagoya, Nhật Bản', icon: <LexusLogo /> },
    { name: 'Land Rover', country: 'Gaydon, Anh Quốc', icon: <LandRoverLogo /> },
    { name: 'Bentley', country: 'Crewe, Anh Quốc', icon: <BentleyLogo /> },
    { name: 'Rolls-Royce', country: 'Goodwood, Anh', icon: <RollsRoyceLogo /> },
    { name: 'Ferrari', country: 'Maranello, Ý', icon: <FerrariLogo /> },
    { name: 'Lamborghini', country: 'Bologna, Ý', icon: <LamborghiniLogo /> },
    { name: 'Maserati', country: 'Modena, Ý', icon: <MaseratiLogo /> },
    { name: 'Aston Martin', country: 'Gaydon, Anh Quốc', icon: <AstonMartinLogo /> },
    { name: 'Volvo', country: 'Gothenburg, Thụy Điển', icon: <VolvoLogo /> },
    { name: 'VinFast', country: 'Hải Phòng, Việt Nam', icon: <VinFastLogo /> },
  ];

  // Duplicate for seamless 100% infinite marquee loop
  const marqueeBrands = [...luxuryBrands, ...luxuryBrands];

  return (
    <section className="w-full overflow-hidden pt-14 pb-16 bg-gradient-to-b from-white via-[#faf8ff] to-[#f4f1fb] relative">
      {/* Centered Luxury Header with Micro-Eyebrow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] text-[10px] uppercase tracking-[0.2em] font-bold bg-blue-50 text-blue-600 border border-blue-100 mb-3 shadow-2xs">
          <Sparkles size={12} className="text-blue-600" />
          <span>ĐỐI TÁC THƯƠNG HIỆU CHIẾN LƯỢC TOÀN CẦU</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight uppercase leading-snug">
          HỆ THỐNG THƯƠNG HIỆU XE SANG ĐỐI TÁC CHÍNH HÃNG
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl mx-auto mt-2 leading-relaxed">
          Mạng lưới liên minh phân phối, bảo hành ủy quyền và chuyển giao công nghệ từ những nhà sản xuất ô tô danh giá hàng đầu thế giới.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[8px] mx-auto mt-4"></div>
      </div>

      {/* Ambient Gradient Fade Masks at edges for infinite seamless float */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#faf8ff] via-[#faf8ff]/85 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#faf8ff] via-[#faf8ff]/85 to-transparent z-10" />

      {/* Infinite Running Marquee Track */}
      <div className="animate-marquee-left flex items-center gap-6 sm:gap-8 py-3 hover:[animation-play-state:paused]">
        {marqueeBrands.map((b, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`${ROUTES.BUY_CAR}?brand=${encodeURIComponent(b.name)}`)}
            className="p-1 rounded-[10px] bg-slate-100/80 shadow-xs hover:shadow-md transition-all duration-300 shrink-0 cursor-pointer group/item active:scale-[0.98]"
            title={`Xem tất cả xe ${b.name} tại showroom`}
          >
            <div className="rounded-[8px] bg-white px-5 py-3.5 flex items-center gap-4 shadow-2xs group-hover/item:shadow-xs transition-shadow">
              <div className="h-12 w-14 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                {b.icon}
              </div>
              <div className="text-left">
                <div className="font-display font-extrabold text-base sm:text-lg text-slate-900 group-hover/item:text-blue-600 transition-colors whitespace-nowrap tracking-tight">
                  {b.name}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-semibold whitespace-nowrap mt-0.5">
                  {b.country}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

