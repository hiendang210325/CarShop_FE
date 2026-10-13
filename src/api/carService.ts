import { Car, CarFilter, PaginatedResponse, ApiResponse } from '../types';
import { INITIAL_CARS, STORAGE_KEYS } from '../constants';
import { storage } from '../utils';
import { axiosClient } from './axiosClient';
import { ENDPOINTS } from './endpoints';

// Helper to initialize or retrieve persistent cars
const getStoredCars = (): Car[] => {
  const cached = storage.get<Car[]>(STORAGE_KEYS.CAR_INVENTORY);
  if (cached && Array.isArray(cached) && cached.length > 0) {
    return cached;
  }
  storage.set(STORAGE_KEYS.CAR_INVENTORY, INITIAL_CARS);
  return INITIAL_CARS;
};

export const carService = {
  async getCars(filter?: CarFilter, page = 1, pageSize = 8): Promise<PaginatedResponse<Car>> {
    try {
      const response = await axiosClient.get<any, ApiResponse<PaginatedResponse<Car>>>(
        ENDPOINTS.CARS.BASE,
        {
          params: { ...filter, page, pageSize },
        }
      );
      if (response?.data?.items) {
        return response.data;
      }
    } catch {
      // Graceful fallback to local mock storage
    }

    let cars = [...getStoredCars()];

    // Filtering logic
    if (filter) {
      if (filter.search) {
        const query = filter.search.toLowerCase();
        cars = cars.filter(
          (c) =>
            c.brand.toLowerCase().includes(query) ||
            c.model.toLowerCase().includes(query) ||
            c.vin.toLowerCase().includes(query)
        );
      }

      if (filter.brand && filter.brand !== 'ALL') {
        cars = cars.filter((c) => c.brand.toLowerCase() === filter.brand?.toLowerCase());
      }

      if (filter.status && filter.status !== 'ALL') {
        cars = cars.filter((c) => c.status === filter.status);
      }

      if (filter.bodyType && filter.bodyType !== 'ALL') {
        cars = cars.filter((c) => c.bodyType === filter.bodyType);
      }

      if (filter.fuelType && filter.fuelType !== 'ALL') {
        cars = cars.filter((c) => c.fuelType === filter.fuelType);
      }

      // Sorting
      if (filter.sortBy === 'price_asc') {
        cars.sort((a, b) => a.price - b.price);
      } else if (filter.sortBy === 'price_desc') {
        cars.sort((a, b) => b.price - a.price);
      } else if (filter.sortBy === 'year_desc') {
        cars.sort((a, b) => b.year - a.year);
      } else {
        cars.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }

    const total = cars.length;
    const totalPages = Math.ceil(total / pageSize) || 1;
    const startIndex = (page - 1) * pageSize;
    const paginatedItems = cars.slice(startIndex, startIndex + pageSize);

    return {
      items: paginatedItems,
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  async getCarById(id: string): Promise<Car | null> {
    try {
      const response = await axiosClient.get<any, ApiResponse<Car>>(ENDPOINTS.CARS.DETAIL(id));
      if (response?.data) return response.data;
    } catch {
      // Fallback
    }

    const cars = getStoredCars();
    return cars.find((c) => c.id === id) || null;
  },

  async createCar(carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<Car> {
    try {
      const response = await axiosClient.post<any, ApiResponse<Car>>(ENDPOINTS.CARS.BASE, carData);
      if (response?.data) return response.data;
    } catch {
      // Fallback
    }

    const cars = getStoredCars();
    const newCar: Car = {
      ...carData,
      id: `car-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newCar, ...cars];
    storage.set(STORAGE_KEYS.CAR_INVENTORY, updated);
    return newCar;
  },

  async updateCar(id: string, updates: Partial<Car>): Promise<Car> {
    try {
      const response = await axiosClient.put<any, ApiResponse<Car>>(
        ENDPOINTS.CARS.DETAIL(id),
        updates
      );
      if (response?.data) return response.data;
    } catch {
      // Fallback
    }

    const cars = getStoredCars();
    const index = cars.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new Error(`Car with id "${id}" not found`);
    }

    const updatedCar: Car = {
      ...cars[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    cars[index] = updatedCar;
    storage.set(STORAGE_KEYS.CAR_INVENTORY, cars);
    return updatedCar;
  },

  async deleteCar(id: string): Promise<boolean> {
    try {
      await axiosClient.delete(ENDPOINTS.CARS.DETAIL(id));
      return true;
    } catch {
      // Fallback
    }

    const cars = getStoredCars();
    const filtered = cars.filter((c) => c.id !== id);
    storage.set(STORAGE_KEYS.CAR_INVENTORY, filtered);
    return true;
  },

  async resetToDefault(): Promise<Car[]> {
    storage.set(STORAGE_KEYS.CAR_INVENTORY, INITIAL_CARS);
    return INITIAL_CARS;
  },
};
