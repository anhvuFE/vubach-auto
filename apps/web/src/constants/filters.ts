import type { BodyType, FuelType, TransmissionType } from '@/types/car';
import type { SelectOption, SortKey } from '@/types/common';

export const BRANDS: string[] = [
  'Toyota',
  'Honda',
  'Mazda',
  'Hyundai',
  'Kia',
  'Ford',
  'Mercedes-Benz',
  'BMW',
  'VinFast',
  'Peugeot',
  'Mitsubishi',
];

export const BODY_TYPES: SelectOption<BodyType>[] = [
  { label: 'Sedan', value: 'Sedan' },
  { label: 'SUV', value: 'SUV' },
  { label: 'Hatchback', value: 'Hatchback' },
  { label: 'MPV', value: 'MPV' },
  { label: 'Bán tải', value: 'Pickup' },
  { label: 'Coupe', value: 'Coupe' },
];

export const FUEL_TYPES: SelectOption<FuelType>[] = [
  { label: 'Xăng', value: 'Xăng' },
  { label: 'Dầu', value: 'Dầu' },
  { label: 'Hybrid', value: 'Hybrid' },
  { label: 'Điện', value: 'Điện' },
];

export const TRANSMISSIONS: SelectOption<TransmissionType>[] = [
  { label: 'Số tự động', value: 'Số tự động' },
  { label: 'Số sàn', value: 'Số sàn' },
];

export const SORT_OPTIONS: SelectOption<SortKey>[] = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Giá thấp → cao', value: 'price-asc' },
  { label: 'Giá cao → thấp', value: 'price-desc' },
  { label: 'Đời xe mới nhất', value: 'year-desc' },
  { label: 'Số km ít nhất', value: 'mileage-asc' },
];

/** Preset price buckets (VND) for quick filtering. */
export const PRICE_RANGES: SelectOption<string>[] = [
  { label: 'Dưới 400 triệu', value: '0-400000000' },
  { label: '400 – 700 triệu', value: '400000000-700000000' },
  { label: '700 triệu – 1 tỷ', value: '700000000-1000000000' },
  { label: '1 – 1.5 tỷ', value: '1000000000-1500000000' },
  { label: 'Trên 1.5 tỷ', value: '1500000000-99000000000' },
];

export const PRICE_BOUNDS = { min: 0, max: 3_000_000_000 } as const;
export const YEAR_BOUNDS = { min: 2010, max: new Date().getFullYear() } as const;
