import { create } from 'zustand';
import { Car } from '@/types/car';

interface CarStore {
  cars: Car[];
  isAuthenticated: boolean;
  adminPassword: string;

  // Car actions
  addCar: (car: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  getCar: (id: string) => Car | undefined;

  // Auth actions
  login: (password: string) => boolean;
  logout: () => void;
  setAdminPassword: (password: string) => void;

  // Data management
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  resetData: () => void;
}

const DEFAULT_PASSWORD = 'admin123';

const useCarStore = create<CarStore>((set, get) => ({
      cars: [],
      isAuthenticated: false,
      adminPassword: DEFAULT_PASSWORD,

      addCar: (carData) => {
        const newCar: Car = {
          ...carData,
          id: `car-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          cars: [newCar, ...state.cars],
        }));
      },

      updateCar: (id, carData) => {
        set((state) => ({
          cars: state.cars.map((car) =>
            car.id === id
              ? { ...car, ...carData, updatedAt: new Date().toISOString() }
              : car
          ),
        }));
      },

      deleteCar: (id) => {
        set((state) => ({
          cars: state.cars.filter((car) => car.id !== id),
        }));
      },

      getCar: (id) => {
        return get().cars.find((car) => car.id === id);
      },

      login: (password) => {
        const isValid = password === get().adminPassword;
        if (isValid) {
          set({ isAuthenticated: true });
        }
        return isValid;
      },

      logout: () => {
        set({ isAuthenticated: false });
      },

      setAdminPassword: (password) => {
        set({ adminPassword: password });
      },

      exportData: () => {
        const data = {
          cars: get().cars,
          adminPassword: get().adminPassword,
          exportedAt: new Date().toISOString(),
          version: '1.0.0',
        };
        return JSON.stringify(data, null, 2);
      },

      importData: (jsonData) => {
        try {
          const data = JSON.parse(jsonData);
          if (data.cars && Array.isArray(data.cars)) {
            set({
              cars: data.cars,
              adminPassword: data.adminPassword || DEFAULT_PASSWORD,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Import failed:', error);
          return false;
        }
      },

      resetData: () => {
        set({
          cars: [],
          isAuthenticated: false,
          adminPassword: DEFAULT_PASSWORD,
        });
      },
    }));

export default useCarStore;