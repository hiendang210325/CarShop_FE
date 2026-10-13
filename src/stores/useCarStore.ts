import { create } from 'zustand';
import { Car, CarFilter } from '../types';
import { carService } from '../api/carService';

interface CarState {
  cars: Car[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  selectedCar: Car | null;
  filter: CarFilter;

  fetchCars: () => Promise<void>;
  setFilter: (newFilter: Partial<CarFilter>) => void;
  resetFilter: () => void;
  setPage: (page: number) => void;
  setSelectedCar: (car: Car | null) => void;
  createCar: (carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Car>;
  updateCar: (id: string, updates: Partial<Car>) => Promise<Car>;
  deleteCar: (id: string) => Promise<void>;
  resetToDefaultInventory: () => Promise<void>;
}

const initialFilter: CarFilter = {
  search: '',
  brand: 'ALL',
  status: 'ALL',
  bodyType: 'ALL',
  fuelType: 'ALL',
  sortBy: 'newest',
};

export const useCarStore = create<CarState>((set, get) => ({
  cars: [],
  total: 0,
  page: 1,
  pageSize: 6,
  totalPages: 1,
  isLoading: false,
  error: null,
  selectedCar: null,
  filter: initialFilter,

  fetchCars: async () => {
    set({ isLoading: true, error: null });
    const { filter, page, pageSize } = get();
    try {
      const response = await carService.getCars(filter, page, pageSize);
      set({
        cars: response.items,
        total: response.total,
        page: response.page,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        isLoading: false,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Không thể tải danh sách xe';
      set({ isLoading: false, error: msg });
    }
  },

  setFilter: (newFilter) => {
    set((state) => ({
      filter: { ...state.filter, ...newFilter },
      page: 1, // reset to page 1 on filter change
    }));
    get().fetchCars();
  },

  resetFilter: () => {
    set({ filter: initialFilter, page: 1 });
    get().fetchCars();
  },

  setPage: (page) => {
    set({ page });
    get().fetchCars();
  },

  setSelectedCar: (car) => {
    set({ selectedCar: car });
  },

  createCar: async (carData) => {
    set({ isLoading: true });
    try {
      const created = await carService.createCar(carData);
      await get().fetchCars();
      return created;
    } finally {
      set({ isLoading: false });
    }
  },

  updateCar: async (id, updates) => {
    set({ isLoading: true });
    try {
      const updated = await carService.updateCar(id, updates);
      await get().fetchCars();
      return updated;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCar: async (id) => {
    set({ isLoading: true });
    try {
      await carService.deleteCar(id);
      await get().fetchCars();
    } finally {
      set({ isLoading: false });
    }
  },

  resetToDefaultInventory: async () => {
    set({ isLoading: true });
    try {
      await carService.resetToDefault();
      await get().fetchCars();
    } finally {
      set({ isLoading: false });
    }
  },
}));
