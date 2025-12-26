import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Car, CarFilter } from '../types/car';

interface CarStore {
  cars: Car[];
  filters: CarFilter;
  isAdmin: boolean;
  adminPassword: string;

  setCars: (cars: Car[]) => void;
  addCar: (car: Car) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  setFilters: (filters: CarFilter) => void;
  clearFilters: () => void;
  setIsAdmin: (isAdmin: boolean) => void;
  getFilteredCars: () => Car[];
}

const useCarStore = create<CarStore>()(
  persist(
    (set, get) => ({
      cars: [],
      filters: {},
      isAdmin: false,
      adminPassword: 'admin123',

      setCars: (cars) => set({ cars }),

      addCar: (car) => set((state) => ({
        cars: [...state.cars, car]
      })),

      updateCar: (id, updatedCar) => set((state) => ({
        cars: state.cars.map(car =>
          car.id === id ? { ...car, ...updatedCar, updatedAt: new Date() } : car
        )
      })),

      deleteCar: (id) => set((state) => ({
        cars: state.cars.filter(car => car.id !== id)
      })),

      setFilters: (filters) => set({ filters }),

      clearFilters: () => set({ filters: {} }),

      setIsAdmin: (isAdmin) => set({ isAdmin }),

      getFilteredCars: () => {
        const { cars, filters } = get();

        return cars.filter(car => {
          if (filters.brand && car.brand !== filters.brand) return false;
          if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
          if (filters.transmission && car.transmission !== filters.transmission) return false;
          if (filters.priceRange) {
            const [min, max] = filters.priceRange;
            if (car.price < min || car.price > max) return false;
          }
          if (filters.yearRange) {
            const [min, max] = filters.yearRange;
            if (car.year < min || car.year > max) return false;
          }
          return true;
        });
      }
    }),
    {
      name: 'vubach-auto-storage',
      partialize: (state) => ({
        cars: state.cars,
        isAdmin: state.isAdmin
      }),
    }
  )
);

export default useCarStore;