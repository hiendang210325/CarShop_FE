export type CarStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'MAINTENANCE';
export type FuelType = 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
export type Transmission = 'AUTOMATIC' | 'MANUAL';
export type CarBodyType = 'SEDAN' | 'SUV' | 'COUPE' | 'HATCHBACK' | 'CROSSOVER' | 'PICKUP';

export interface CarSpecs {
  engine: string;
  horsepower: number;
  torque: string;
  acceleration: string; // 0-100 km/h
  mileage: number; // km
  seatingCapacity: number;
}

export interface Car {
  id: string;
  vin: string; // Vehicle Identification Number
  brand: string;
  model: string;
  year: number;
  color: string;
  bodyType: CarBodyType;
  fuelType: FuelType;
  transmission: Transmission;
  price: number; // USD
  costPrice: number; // For admin margin calculation
  status: CarStatus;
  specs: CarSpecs;
  imageUrl: string;
  galleryUrls?: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CarFilter {
  search?: string;
  brand?: string;
  bodyType?: string;
  status?: CarStatus | 'ALL';
  minPrice?: number;
  maxPrice?: number;
  fuelType?: FuelType | 'ALL';
  sortBy?: 'price_asc' | 'price_desc' | 'year_desc' | 'newest';
}
