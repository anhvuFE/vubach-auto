import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CalendarOutlined,
  DashboardOutlined,
  SettingOutlined,
  DeploymentUnitOutlined,
  TeamOutlined,
  HomeOutlined,
  RightOutlined,
} from '@ant-design/icons';
import CarGallery from '@/components/cars/CarGallery';
import CarContactCard from '@/components/cars/CarContactCard';
import CarSpecs from '@/components/cars/CarSpecs';
import SimilarCars from '@/components/cars/SimilarCars';
import { CARS, getCarBySlug, getSimilarCars } from '@/data/cars';
import { carDisplayName } from '@/types/car';
import { formatMileage } from '@/utils/format';
import { SITE } from '@/constants/site';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return CARS.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return { title: 'Không tìm thấy xe' };

  const name = carDisplayName(car);
  const title = `${name} ${car.year}`;
  const description = `${name} ${car.year} - ${formatMileage(car.mileage)}, ${car.transmission}, ${car.fuelType}. ${car.description}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      images: [{ url: car.mainImage }],
      type: 'website',
    },
  };
}

export default async function CarDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const similar = getSimilarCars(car);
  const quickSpecs = [
    { icon: <CalendarOutlined />, label: 'Năm SX', value: String(car.year) },
    { icon: <DashboardOutlined />, label: 'Số km', value: formatMileage(car.mileage) },
    { icon: <SettingOutlined />, label: 'Hộp số', value: car.transmission },
    { icon: <DeploymentUnitOutlined />, label: 'Nhiên liệu', value: car.fuelType },
    { icon: <TeamOutlined />, label: 'Số chỗ', value: `${car.seats} chỗ` },
  ];

  return (
    <>
      {/* Breadcrumb bar (clears fixed header) */}
      <div className="border-b border-gray-100 bg-white pt-24 sm:pt-28">
        <div className="container-page py-4">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="flex items-center gap-1 hover:text-brand">
              <HomeOutlined /> Trang chủ
            </Link>
            <RightOutlined className="text-[10px]" />
            <Link href="/cars" className="hover:text-brand">
              Xe đang bán
            </Link>
            <RightOutlined className="text-[10px]" />
            <span className="text-charcoal">{carDisplayName(car)}</span>
          </nav>
        </div>
      </div>

      <section className="section bg-white pt-8">
        <div className="container-page grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Left: gallery + info */}
          <div>
            <CarGallery car={car} />

            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                {car.brand} · {car.bodyType}
              </p>
              <h1 className="mt-1 font-display text-3xl font-extrabold text-charcoal sm:text-4xl">
                {carDisplayName(car)} {car.year}
              </h1>

              {/* Quick specs */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {quickSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center"
                  >
                    <span className="text-xl text-brand">{spec.icon}</span>
                    <p className="mt-1 text-xs text-gray-500">{spec.label}</p>
                    <p className="text-sm font-bold text-charcoal">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <CarSpecs car={car} />
            </div>
          </div>

          {/* Right: sticky contact */}
          <div className="lg:relative">
            <div className="lg:sticky lg:top-24">
              <CarContactCard car={car} />
            </div>
          </div>
        </div>
      </section>

      <SimilarCars cars={similar} />
    </>
  );
}
