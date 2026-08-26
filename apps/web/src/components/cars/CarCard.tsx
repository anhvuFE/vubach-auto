import Link from 'next/link';
import {
  CalendarOutlined,
  DashboardOutlined,
  SettingOutlined,
  DeploymentUnitOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import CarImage from '@/components/common/CarImage';
import StatusBadge from '@/components/common/StatusBadge';
import InspectionBadge from '@/components/common/InspectionBadge';
import FavoriteButton from '@/components/common/FavoriteButton';
import CompareButton from '@/components/common/CompareButton';
import QuickView from './QuickView';
import type { Car } from '@/types/car';
import { carDisplayName } from '@/types/car';
import { formatMileage, formatPrice } from '@/utils/format';

interface CarCardProps {
  car: Car;
  /** 'list' renders a horizontal layout used on the /cars list view. */
  layout?: 'grid' | 'list';
  priority?: boolean;
}

export default function CarCard({ car, layout = 'grid', priority = false }: CarCardProps) {
  const specs = [
    { icon: <CalendarOutlined />, value: String(car.year) },
    { icon: <DashboardOutlined />, value: formatMileage(car.mileage) },
    { icon: <SettingOutlined />, value: car.transmission },
    { icon: <DeploymentUnitOutlined />, value: car.fuelType },
  ];

  const isList = layout === 'list';

  return (
    <Link
      href={`/cars/${car.slug}`}
      data-testid="car-card"
      data-price={car.price}
      data-status={car.status}
      className={`group flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card-hover ${
        isList ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          isList ? 'aspect-[16/10] sm:aspect-auto sm:w-72 sm:shrink-0' : 'aspect-[16/10]'
        }`}
      >
        <CarImage
          src={car.mainImage}
          alt={carDisplayName(car)}
          fill
          sizes={isList ? '(max-width: 640px) 100vw, 288px' : '(max-width: 768px) 100vw, 33vw'}
          priority={priority}
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            car.status === 'sold' ? 'grayscale-[35%]' : ''
          }`}
        />
        <div className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-3.5rem)] flex-wrap gap-2">
          <StatusBadge status={car.status} />
          <span className="inline-flex items-center rounded-full bg-charcoal/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            {car.condition}
          </span>
          {car.inspected && <InspectionBadge points={car.inspectionPoints} />}
        </div>
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <FavoriteButton carId={car.id} />
          <CompareButton carId={car.id} />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <QuickView car={car} />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-charcoal/80 to-transparent p-3">
          <span className="font-display text-lg font-extrabold text-white drop-shadow">
            {formatPrice(car.price)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">
          {car.brand} · {car.bodyType}
        </p>
        <h3 className="mt-1 line-clamp-1 font-display text-lg font-bold text-charcoal">
          {carDisplayName(car)}
        </h3>

        {isList && (
          <p className="mt-1.5 line-clamp-2 text-sm text-gray-500">{car.description}</p>
        )}

        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
          {specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-brand">{spec.icon}</span>
              <span className="line-clamp-1">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <EnvironmentOutlined /> {car.origin}
          </span>
          <span className="text-sm font-bold text-brand transition-transform group-hover:translate-x-0.5">
            Xem chi tiết →
          </span>
        </div>
      </div>
    </Link>
  );
}
