import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';
import SectionHeading from '@/components/common/SectionHeading';
import Reveal from '@/components/common/Reveal';
import CarCard from '@/components/cars/CarCard';
import { getFeaturedCars } from '@/data/cars';

export default function FeaturedCars() {
  const cars = getFeaturedCars(6);

  return (
    <section className="section relative overflow-hidden bg-charcoal">
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 0%, rgba(37,99,235,0.18) 0, transparent 45%)',
        }}
      />
      <div className="container-page relative">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            variant="light"
            eyebrow="Xe nổi bật"
            title="Những mẫu xe được lựa chọn"
            description="Tuyển chọn các mẫu xe chất lượng cao, đã qua kiểm định kỹ lưỡng, sẵn sàng bàn giao."
          />
          <Link
            href="/cars"
            className="hidden shrink-0 items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:border-brand-light hover:text-brand-light sm:flex"
          >
            Xem tất cả <ArrowRightOutlined />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car, i) => (
            <Reveal key={car.id} delay={(i % 3) * 0.08}>
              <CarCard car={car} priority={i < 3} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/cars"
            className="flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white"
          >
            Xem tất cả xe <ArrowRightOutlined />
          </Link>
        </div>
      </div>
    </section>
  );
}
