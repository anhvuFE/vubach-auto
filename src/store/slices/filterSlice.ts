import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CarFilters, SortKey, ViewMode } from '@/types/common';
import type { BodyType, CarStatus, FuelType, TransmissionType } from '@/types/car';

interface FilterState extends CarFilters {
  sort: SortKey;
  view: ViewMode;
  page: number;
  pageSize: number;
}

export const initialFilters: CarFilters = {
  search: '',
  brand: null,
  bodyType: null,
  fuelType: null,
  transmission: null,
  status: 'available',
  priceRange: null,
  yearRange: null,
  maxMileage: null,
};

const initialState: FilterState = {
  ...initialFilters,
  sort: 'newest',
  view: 'grid',
  page: 1,
  pageSize: 9,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setBrand(state, action: PayloadAction<string | null>) {
      state.brand = action.payload;
      state.page = 1;
    },
    setBodyType(state, action: PayloadAction<BodyType | null>) {
      state.bodyType = action.payload;
      state.page = 1;
    },
    setFuelType(state, action: PayloadAction<FuelType | null>) {
      state.fuelType = action.payload;
      state.page = 1;
    },
    setTransmission(state, action: PayloadAction<TransmissionType | null>) {
      state.transmission = action.payload;
      state.page = 1;
    },
    setStatus(state, action: PayloadAction<CarStatus | 'all'>) {
      state.status = action.payload;
      state.page = 1;
    },
    setPriceRange(state, action: PayloadAction<[number, number] | null>) {
      state.priceRange = action.payload;
      state.page = 1;
    },
    setYearRange(state, action: PayloadAction<[number, number] | null>) {
      state.yearRange = action.payload;
      state.page = 1;
    },
    setMaxMileage(state, action: PayloadAction<number | null>) {
      state.maxMileage = action.payload;
      state.page = 1;
    },
    /** Merge a partial set of filters at once (e.g. from Hero quick search). */
    applyFilters(state, action: PayloadAction<Partial<CarFilters>>) {
      Object.assign(state, action.payload);
      state.page = 1;
    },
    setSort(state, action: PayloadAction<SortKey>) {
      state.sort = action.payload;
      state.page = 1;
    },
    setView(state, action: PayloadAction<ViewMode>) {
      state.view = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetFilters(state) {
      Object.assign(state, initialFilters);
      state.sort = 'newest';
      state.page = 1;
    },
  },
});

export const {
  setSearch,
  setBrand,
  setBodyType,
  setFuelType,
  setTransmission,
  setStatus,
  setPriceRange,
  setYearRange,
  setMaxMileage,
  applyFilters,
  setSort,
  setView,
  setPage,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
