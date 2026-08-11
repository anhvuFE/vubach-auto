import type { BodyType, CarStatus, FuelType, TransmissionType } from './car';

export interface NavItem {
  label: string;
  href: string;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export type SortKey =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'year-desc'
  | 'mileage-asc';

export type ViewMode = 'grid' | 'list';

/** Shape of the car filter state (mirrors what a real search API would accept). */
export interface CarFilters {
  search: string;
  brand: string | null;
  bodyType: BodyType | null;
  fuelType: FuelType | null;
  transmission: TransmissionType | null;
  status: CarStatus | 'all';
  priceRange: [number, number] | null;
  yearRange: [number, number] | null;
  maxMileage: number | null;
}

export interface ContactFormValues {
  name: string;
  phone: string;
  email?: string;
  carInterested?: string;
  message: string;
}
