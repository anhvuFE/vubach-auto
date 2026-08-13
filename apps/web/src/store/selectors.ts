import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Car } from '@/types/car';
import type { SortKey } from '@/types/common';

const selectCarItems = (state: RootState) => state.cars.items;
const selectFilter = (state: RootState) => state.filter;

const matchesText = (car: Car, search: string): boolean => {
  if (!search.trim()) return true;
  const haystack = `${car.brand} ${car.model} ${car.year}`.toLowerCase();
  return haystack.includes(search.trim().toLowerCase());
};

const sortCars = (cars: Car[], sort: SortKey): Car[] => {
  const copy = [...cars];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'year-desc':
      return copy.sort((a, b) => b.year - a.year);
    case 'mileage-asc':
      return copy.sort((a, b) => a.mileage - b.mileage);
    case 'newest':
    default:
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
};

/** Cars after applying every active filter + search + sort (not paginated). */
export const selectFilteredCars = createSelector(
  [selectCarItems, selectFilter],
  (cars, filter): Car[] => {
    const result = cars.filter((car) => {
      if (filter.status !== 'all' && car.status !== filter.status) return false;
      if (filter.brand && car.brand !== filter.brand) return false;
      if (filter.bodyType && car.bodyType !== filter.bodyType) return false;
      if (filter.fuelType && car.fuelType !== filter.fuelType) return false;
      if (filter.transmission && car.transmission !== filter.transmission) return false;
      if (filter.priceRange) {
        const [min, max] = filter.priceRange;
        if (car.price < min || car.price > max) return false;
      }
      if (filter.yearRange) {
        const [min, max] = filter.yearRange;
        if (car.year < min || car.year > max) return false;
      }
      if (filter.maxMileage != null && car.mileage > filter.maxMileage) return false;
      if (!matchesText(car, filter.search)) return false;
      return true;
    });

    return sortCars(result, filter.sort);
  },
);

/** Count of active filters (for the mobile "Bộ lọc (n)" badge). */
export const selectActiveFilterCount = createSelector([selectFilter], (filter): number => {
  let count = 0;
  if (filter.brand) count += 1;
  if (filter.bodyType) count += 1;
  if (filter.fuelType) count += 1;
  if (filter.transmission) count += 1;
  if (filter.priceRange) count += 1;
  if (filter.yearRange) count += 1;
  if (filter.maxMileage != null) count += 1;
  if (filter.search.trim()) count += 1;
  return count;
});

export const selectFavoriteCars = createSelector(
  [selectCarItems, (state: RootState) => state.favorite.ids],
  (cars, ids): Car[] => cars.filter((c) => ids.includes(c.id)),
);
