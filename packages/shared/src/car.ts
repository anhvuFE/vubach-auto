/**
 * Canonical car domain types shared between the Next.js frontend and the
 * NestJS API. Kept framework-agnostic (no React, no Nest decorators) so both
 * sides can depend on a single source of truth for the wire shape.
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
  createdAt: string;
  updatedAt: string;
}

/** Payload used when creating a car (server assigns id/slug/timestamps). */
export type CarInput = Omit<Car, 'id' | 'slug' | 'createdAt' | 'updatedAt'>;

/** Human-readable display name, e.g. "Toyota Camry". */
export const carDisplayName = (car: Pick<Car, 'brand' | 'model'>): string =>
  `${car.brand} ${car.model}`;
