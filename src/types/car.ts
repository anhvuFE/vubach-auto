export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Xăng' | 'Dầu' | 'Hybrid' | 'Điện';
  transmission: 'Số sàn' | 'Tự động' | 'Bán tự động';
  engineCapacity: string;
  seats: number;
  color: string;
  location: string;
  images: string[];
  description: string;
  features: string[];
  status: 'available' | 'sold' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface CarFilter {
  brand?: string;
  priceRange?: [number, number];
  yearRange?: [number, number];
  fuelType?: string;
  transmission?: string;
}