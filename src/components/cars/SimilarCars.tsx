import CarCard from './CarCard';
import type { Car } from '@/types/car';

export default function SimilarCars({ cars }: { cars: Car[] }) {
  if (cars.length === 0) return null;

  return (
    <section className="section bg-gray-50">
      <div className="container-page">
        <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">Xe tương tự</h2>
        <p className="mt-2 text-gray-500">Các mẫu xe cùng phân khúc bạn có thể quan tâm.</p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
