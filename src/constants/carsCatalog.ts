export interface CarItem {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: 'sedan' | 'suv' | 'crossover' | 'coupe' | 'ev';
  typeLabel: string;
  condition: 'new' | 'used';
  conditionTag: string;
  odo: string;
  specs: {
    engine: string;
    power: string;
    gearbox: string;
    fuelConsumption: string;
  };
  priceVND: string;
  priceRaw: number; // in billions VND
  monthlyEstimate: string;
  imageUrl: string;
  description: string;
  detailUrl?: string;
}

export const normalizeText = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
};

export const CARS_CATALOG: CarItem[] = [
  {
    id: 'porsche-taycan',
    brand: 'Porsche',
    model: 'Porsche Taycan 4S Cross Turismo',
    year: 2024,
    type: 'ev',
    typeLabel: 'Xe Điện EV Siêu Sang',
    condition: 'used',
    conditionTag: 'XE LƯỚT 2024 - 4,200 KM',
    odo: 'ODO: 4,200 km',
    specs: {
      engine: 'Điện Dual Motor (800V)',
      power: '530 PS',
      gearbox: 'Tự động 2 cấp',
      fuelConsumption: 'Pin 93.4 kWh (452 km)',
    },
    priceVND: '4.850 Tỷ',
    priceRaw: 4.85,
    monthlyEstimate: '45.8 Tr/tháng',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80',
    description: 'All-Electric Cross Turismo hiệu năng cao, treo khí nén PASM thích ứng, tăng tốc 0-100 km/h trong 4.0 giây.',
    detailUrl: '/cars/taycan',
  },
  {
    id: 'mercedes-glc300',
    brand: 'Mercedes-Benz',
    model: 'Mercedes-Benz GLC 300 4MATIC 2024',
    year: 2024,
    type: 'suv',
    typeLabel: 'SUV Hạng Sang',
    condition: 'new',
    conditionTag: 'XE MỚI 100% - SẴN GIAO NGAY',
    odo: 'ODO: 15 km',
    specs: {
      engine: '2.0L Turbo Mild-Hybrid',
      power: '258 HP',
      gearbox: '9G-TRONIC',
      fuelConsumption: '7.8L/100km',
    },
    priceVND: '2.799 Tỷ',
    priceRaw: 2.799,
    monthlyEstimate: '26.5 Tr/tháng',
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
    description: 'Thế hệ mới trang bị gói AMG Line, đèn Digital Light cao cấp, màn hình cảm ứng 11.9 inch và camera 360 độ.',
    detailUrl: '/cars/mercedes-glc300',
  },
  {
    id: 'bmw-530i',
    brand: 'BMW',
    model: 'BMW 530i M Sport LCI',
    year: 2023,
    type: 'sedan',
    typeLabel: 'Sedan Doanh Nhân',
    condition: 'used',
    conditionTag: 'XE LƯỚT 2023 - 8,000 KM',
    odo: 'ODO: 8,100 km',
    specs: {
      engine: '2.0L TwinPower Turbo',
      power: '252 HP',
      gearbox: '8 Cấp Steptronic',
      fuelConsumption: '6.5L/100km',
    },
    priceVND: '2.599 Tỷ',
    priceRaw: 2.599,
    monthlyEstimate: '24.2 Tr/tháng',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
    description: 'Sedan thể thao đẳng cấp với bodykit M Sport, phanh thể thao, dàn âm thanh Harman Kardon 16 loa và đèn Laserlight.',
    detailUrl: '/cars/bmw-530i',
  },
  {
    id: 'vinfast-vf9',
    brand: 'VinFast',
    model: 'VinFast VF 9 Plus (Pin SDI)',
    year: 2024,
    type: 'ev',
    typeLabel: 'SUV Điện Full-Size',
    condition: 'used',
    conditionTag: 'XE XANH THÔNG MINH - 6 CHỖ',
    odo: 'ODO: 3,200 km',
    specs: {
      engine: 'Dual Motor AWD',
      power: '402 HP',
      gearbox: 'Tự động 1 cấp',
      fuelConsumption: 'Pin SDI 605 km/lần',
    },
    priceVND: '1.890 Tỷ',
    priceRaw: 1.89,
    monthlyEstimate: '18.5 Tr/tháng',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80',
    description: 'SUV điện 6 chỗ ghế cơ trưởng chuẩn thương gia, trần kính toàn cảnh panoramic, trợ lái tự hành ADAS Level 2.',
    detailUrl: '/cars/vinfast-vf9',
  },
  {
    id: 'audi-q7',
    brand: 'Audi',
    model: 'Audi Q7 45 TFSI Quattro',
    year: 2023,
    type: 'suv',
    typeLabel: 'SUV 7 Chỗ Châu Âu',
    condition: 'used',
    conditionTag: 'GIAO XE NHANH 24 GIỜ',
    odo: 'ODO: 14,000 km',
    specs: {
      engine: '2.0L Turbo Mild-Hybrid',
      power: '252 HP',
      gearbox: '8 Cấp Tiptronic',
      fuelConsumption: 'Quattro AWD',
    },
    priceVND: '2.980 Tỷ',
    priceRaw: 2.98,
    monthlyEstimate: '27.5 Tr/tháng',
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80',
    description: 'SUV 7 chỗ nhập khẩu nguyên chiếc Đức, dẫn động 4 bánh toàn thời gian Quattro lừng danh, đèn Matrix LED thông minh.',
    detailUrl: '/cars/audi-q7',
  },
  {
    id: 'lexus-rx350',
    brand: 'Lexus',
    model: 'Lexus RX 350 Luxury Thế Hệ Mới',
    year: 2024,
    type: 'crossover',
    typeLabel: 'Crossover Nhật Bản',
    condition: 'new',
    conditionTag: 'SẴN GIAO NGAY - BẢO HÀNH 5 NĂM',
    odo: 'ODO: 50 km',
    specs: {
      engine: '2.4L Turbo Xăng',
      power: '275 HP',
      gearbox: 'Direct Shift 8AT',
      fuelConsumption: '8.2L/100km',
    },
    priceVND: '4.330 Tỷ',
    priceRaw: 4.33,
    monthlyEstimate: '39.5 Tr/tháng',
    imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80',
    description: 'Nội thất da Semi-Aniline êm ái hàng đầu, 21 loa Mark Levinson đỉnh cao, gói an toàn chủ động LSS+ 3.0.',
    detailUrl: '/cars/lexus-rx350',
  },
  {
    id: 'porsche-macan',
    brand: 'Porsche',
    model: 'Porsche Macan GTS 2.9L Twin-Turbo',
    year: 2023,
    type: 'suv',
    typeLabel: 'SUV Thể Thao Hiệu Năng',
    condition: 'used',
    conditionTag: 'FULL OPTIONS - 9,500 KM',
    odo: 'ODO: 9,500 km',
    specs: {
      engine: '2.9L V6 Twin-Turbo',
      power: '440 PS',
      gearbox: '7 Cấp PDK',
      fuelConsumption: '0-100: 4.3s',
    },
    priceVND: '4.990 Tỷ',
    priceRaw: 4.99,
    monthlyEstimate: '46.2 Tr/tháng',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
    description: 'Bản GTS mạnh mẽ nhất dòng Macan chạy xăng, ống xả thể thao Sport Exhaust gầm vang, mâm RS Spyder 21 inch.',
    detailUrl: '/cars/porsche-macan',
  },
  {
    id: 'mercedes-maybach-s450',
    brand: 'Mercedes-Benz',
    model: 'Mercedes-Maybach S 450 4MATIC',
    year: 2023,
    type: 'sedan',
    typeLabel: 'Siêu Sedan Chủ Tịch',
    condition: 'used',
    conditionTag: 'XE NGUYÊN BẢN - CHỦ DOANH NGHIỆP',
    odo: 'ODO: 12,000 km',
    specs: {
      engine: '3.0L I6 EQ Boost',
      power: '367 HP',
      gearbox: '9G-TRONIC',
      fuelConsumption: 'Treo khí nén Magic Body',
    },
    priceVND: '7.890 Tỷ',
    priceRaw: 7.89,
    monthlyEstimate: '72.5 Tr/tháng',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
    description: 'Khoang thương gia phía sau với đệm bắp chân massage đá nóng, tủ lạnh mini Champagne và âm thanh 4D Burmester High-End.',
    detailUrl: '/cars/mercedes-maybach-s450',
  },
  {
    id: 'porsche-911-carrera',
    brand: 'Porsche',
    model: 'Porsche 911 Carrera S Coupe',
    year: 2024,
    type: 'coupe',
    typeLabel: 'Coupe Thể Thao Huyền Thoại',
    condition: 'new',
    conditionTag: 'XE MỚI NHẬP KHẨU ĐỨC',
    odo: 'ODO: 120 km',
    specs: {
      engine: '3.0L Twin-Turbo Flat-6',
      power: '450 PS',
      gearbox: '8 Cấp PDK',
      fuelConsumption: 'Tăng tốc 3.5s',
    },
    priceVND: '8.590 Tỷ',
    priceRaw: 8.59,
    monthlyEstimate: '78.5 Tr/tháng',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80',
    description: 'Biểu tượng xe thể thao với khả năng vận hành đỉnh cao, nội thất da cao cấp và gói thể thao Sport Chrono Package.',
    detailUrl: '/cars/porsche-911-carrera',
  },
  {
    id: 'lexus-lx600-vip',
    brand: 'Lexus',
    model: 'Lexus LX600 VIP 4 Chỗ Hạng Nhất',
    year: 2024,
    type: 'suv',
    typeLabel: 'SUV Đầu Bảng Chuyên Cơ Mặt Đất',
    condition: 'new',
    conditionTag: 'BẢN ĐẦU BẢNG - GIAO NGAY',
    odo: 'ODO: 30 km',
    specs: {
      engine: '3.5L V6 Twin-Turbo',
      power: '409 HP',
      gearbox: '10 Cấp Tự Động',
      fuelConsumption: 'Khung gầm GA-F',
    },
    priceVND: '9.210 Tỷ',
    priceRaw: 9.21,
    monthlyEstimate: '85.0 Tr/tháng',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
    description: 'Chuyên cơ mặt đất 4 chỗ ngồi độc bản, massage Ottoman thư giãn và cách âm tuyệt đối với kính 2 lớp cao cấp.',
    detailUrl: '/cars/lexus-lx600-vip',
  },
  {
    id: 'bmw-m4-competition',
    brand: 'BMW',
    model: 'BMW M4 Competition Coupé M xDrive',
    year: 2023,
    type: 'coupe',
    typeLabel: 'Coupe Thuần Chất Đua',
    condition: 'used',
    conditionTag: 'SIÊU LƯỚT - GÓI CARBON M',
    odo: 'ODO: 5,600 km',
    specs: {
      engine: '3.0L M TwinPower Turbo S58',
      power: '510 HP',
      gearbox: '8 Cấp M Steptronic',
      fuelConsumption: '0-100: 3.5s',
    },
    priceVND: '5.699 Tỷ',
    priceRaw: 5.699,
    monthlyEstimate: '52.0 Tr/tháng',
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80',
    description: 'Cỗ máy tốc độ thuần chất BMW M Power, hệ dẫn động M xDrive thông minh tùy biến dẫn động cầu sau và phanh gốm carbon.',
    detailUrl: '/cars/bmw-m4-competition',
  },
];

export const searchCars = (
  query: string,
  options?: {
    brand?: string;
    type?: string;
    priceRange?: string;
    year?: string;
  }
): CarItem[] => {
  const normQuery = normalizeText(query);
  const brandFilter = options?.brand && options.brand !== 'ALL' && options.brand !== 'all' ? options.brand.toLowerCase() : null;
  const typeFilter = options?.type && options.type !== 'ALL' && options.type !== 'all' ? options.type.toLowerCase() : null;
  const priceFilter = options?.priceRange && options.priceRange !== 'ALL' && options.priceRange !== 'all' ? options.priceRange : null;
  const yearFilter = options?.year && options.year !== 'ALL' && options.year !== 'all' ? options.year : null;

  return CARS_CATALOG.filter((car) => {
    // 1. Text search
    if (normQuery) {
      const matchName = normalizeText(car.model).includes(normQuery);
      const matchBrand = normalizeText(car.brand).includes(normQuery);
      const matchType = normalizeText(car.typeLabel).includes(normQuery);
      const matchDesc = normalizeText(car.description).includes(normQuery);
      const matchEngine = normalizeText(car.specs.engine).includes(normQuery);
      const matchYear = car.year.toString().includes(normQuery);

      if (!matchName && !matchBrand && !matchType && !matchDesc && !matchEngine && !matchYear) {
        return false;
      }
    }

    // 2. Brand filter
    if (brandFilter) {
      if (!car.brand.toLowerCase().includes(brandFilter) && !brandFilter.includes(car.brand.toLowerCase())) {
        return false;
      }
    }

    // 3. Type filter
    if (typeFilter) {
      if (car.type.toLowerCase() !== typeFilter) {
        return false;
      }
    }

    // 4. Year filter
    if (yearFilter) {
      if (car.year.toString() !== yearFilter) {
        return false;
      }
    }

    // 5. Price filter
    if (priceFilter) {
      if (priceFilter === 'under_1b' || priceFilter === 'under-2') {
        if (car.priceRaw > 2) return false;
      } else if (priceFilter === '1_2b' || priceFilter === '2-3') {
        if (car.priceRaw < 2 || car.priceRaw > 3) return false;
      } else if (priceFilter === '2_5b' || priceFilter === '3-5') {
        if (car.priceRaw < 3 || car.priceRaw > 5) return false;
      } else if (priceFilter === 'above_5b' || priceFilter === 'over-5') {
        if (car.priceRaw <= 5) return false;
      }
    }

    return true;
  });
};

