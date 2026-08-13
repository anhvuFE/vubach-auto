import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { Car, CarInput } from '@/types/car';
import { CARS } from '@/data/cars';
import { buildCarSlug } from '@/utils/slug';

interface CarState {
  items: Car[];
}

const initialState: CarState = {
  // Seed with mock inventory; admin edits (client-only) persist to localStorage.
  items: CARS,
};

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    /** Replace the whole inventory (used for hydration / import). */
    setCars(state, action: PayloadAction<Car[]>) {
      state.items = action.payload;
    },
    addCar(state, action: PayloadAction<CarInput>) {
      const id = `car-${nanoid(8)}`;
      const now = new Date().toISOString();
      const car: Car = {
        ...action.payload,
        id,
        slug: buildCarSlug({
          brand: action.payload.brand,
          model: action.payload.model,
          year: action.payload.year,
          id,
        }),
        createdAt: now,
        updatedAt: now,
      };
      state.items.unshift(car);
    },
    updateCar(state, action: PayloadAction<{ id: string; changes: Partial<CarInput> }>) {
      const car = state.items.find((c) => c.id === action.payload.id);
      if (car) {
        Object.assign(car, action.payload.changes, { updatedAt: new Date().toISOString() });
      }
    },
    deleteCar(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
    resetCars(state) {
      state.items = CARS;
    },
  },
});

export const { setCars, addCar, updateCar, deleteCar, resetCars } = carSlice.actions;
export default carSlice.reducer;
