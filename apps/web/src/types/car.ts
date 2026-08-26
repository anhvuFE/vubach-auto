/**
 * Domain types for cars. Kept UI-agnostic so the same shapes can back either
 * mock data (current) or a real API (later) without touching components.
 */

export type FuelType = 'Xăng' | 'Dầu' | 'Hybrid' | 'Điện';

export type TransmissionType = 'Số sàn' | 'Số tự động';

export type BodyType = 'Sedan' | 'SUV' | 'Hatchback' | 'MPV' | 'Pickup' | 'Coupe';

export type CarStatus = 'available' | 'sold' | 'reserved';

export type CarCondition = 'Mới' | 'Như mới' | 'Tốt' | 'Trung bình';

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: TransmissionType;
  fuelType: FuelType;
  bodyType: BodyType;
  condition: CarCondition;
  color: string;
  seats: number;
  origin: string;
  description: string;
  features: string[];
  images: string[];
  mainImage: string;
  status: CarStatus;
  isFeatured?: boolean;
  contactPhone?: string;
  contactName?: string;
  // --- History & inspection (optional) ---
  /** Number of previous owners (số đời chủ). */
  ownerCount?: number;
  /** No accident / flood history (không đâm đụng, ngập nước). */
  accidentFree?: boolean;
  /** Passed the dealership's multi-point inspection. */
  inspected?: boolean;
  /** How many inspection points were checked, e.g. 128. */
  inspectionPoints?: number;
  /** Registration/inspection valid until, free-form e.g. "06/2026". */
  registrationExpiry?: string;
  createdAt: string;
  updatedAt: string;
}

/** Payload shape used by the admin panel when creating a car. */
export type CarInput = Omit<Car, 'id' | 'slug' | 'createdAt' | 'updatedAt'>;

/** Human-readable display name, e.g. "Toyota Camry 2.5Q". */
export const carDisplayName = (car: Pick<Car, 'brand' | 'model'>): string =>
  `${car.brand} ${car.model}`;
