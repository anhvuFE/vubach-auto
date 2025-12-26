import { Calendar, MapPin, Car as CarIcon, Gauge } from "lucide-react";
import type { Car } from "../types/car";
import { Link } from "react-router-dom";

interface CarCardProps {
  car: Car;
  isAdmin?: boolean;
  onEdit?: (car: Car) => void;
  onDelete?: (id: string) => void;
}

const CarCard = ({ car, isAdmin, onEdit, onDelete }: CarCardProps) => {
  const formatPrice = (price: number) => {
    if (price === 0) return "Liên hệ";
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("vi-VN").format(mileage) + " Km";
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={car.images[0] || "https://via.placeholder.com/400x300"}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {car.status === "sold" && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-red-600 text-white px-6 py-2 rounded font-bold text-lg">
              ĐÃ BÁN
            </span>
          </div>
        )}

        {car.status === "available" && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
              Siêu lướt
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2 py-1 rounded flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-700">Còn hàng</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-1 text-lg">
          {car.brand.toUpperCase()} {car.model} {car.year}
        </h3>

        <div className="text-2xl font-bold text-gray-900 mb-4">
          {formatPrice(car.price)}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{car.year}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <CarIcon className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{car.seats} chỗ</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Gauge className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{car.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded font-medium">
            {car.fuelType}
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded font-medium">
            {car.transmission}
          </span>
        </div>

        {isAdmin ? (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit?.(car)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete?.(car.id)}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Xóa
            </button>
          </div>
        ) : (
          <Link
            to={`/car/${car.id}`}
            className="block w-full bg-gray-900 text-white text-center py-2.5 px-4 rounded hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Xem chi tiết
          </Link>
        )}
      </div>
    </div>
  );
};

export default CarCard;
