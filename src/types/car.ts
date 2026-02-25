export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: 'Manual' | 'Automatic';
  fuelType: 'Xăng' | 'Dầu' | 'Hybrid' | 'Điện';
  condition: 'Mới' | 'Như mới' | 'Tốt' | 'Trung bình';
  color: string;
  seats: number;
  origin: string;
  description: string;
  features: string[];
  images: string[];
  mainImage: string;
  status: 'available' | 'sold' | 'reserved';
  createdAt: string;
  updatedAt: string;
  contactPhone?: string;
  contactName?: string;
}