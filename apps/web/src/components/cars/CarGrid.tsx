import CarCard from './CarCard';
import type { Car } from '@/types/car';
import type { ViewMode } from '@/types/common';

interface CarGridProps {
  cars: Car[];
  view?: ViewMode;
  priorityCount?: number;
}

/** Responsive grid (or single-column list) of car cards. */
export default function CarGrid({ cars, view = 'grid', priorityCount = 0 }: CarGridProps) {
  if (view === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {cars.map((car, i) => (
          <CarCard key={car.id} car={car} layout="list" priority={i < priorityCount} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car, i) => (
        <CarCard key={car.id} car={car} priority={i < priorityCount} />
      ))}
    </div>
  );
}
