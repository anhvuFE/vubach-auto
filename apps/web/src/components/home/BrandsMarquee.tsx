import Image from 'next/image';
import Link from 'next/link';
import { BRANDS } from '@/constants/filters';

// Logo files live in public/images/brands/<slug>.png where slug === brand name
// lowercased (e.g. "Mercedes-Benz" -> "mercedes-benz", "VinFast" -> "vinfast").
const logoSlug = (brand: string) => brand.toLowerCase();

/**
 * Brand filter grid: each real car-brand logo sits in a white rounded card that
 * links to the listings page pre-filtered by that brand — one click to browse.
 */
export default function BrandsMarquee() {
  return (
    <section className="border-b border-gray-100 bg-white py-12">
      <div className="container-page">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
          Chọn xe theo thương hiệu
        </p>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
          {BRANDS.map((brand) => (
            <Link
              key={brand}
              href={`/cars?brand=${encodeURIComponent(brand)}`}
              title={`Xem xe ${brand}`}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card-hover"
            >
              <div className="relative h-10 w-20">
                <Image
                  src={`/images/brands/${logoSlug(brand)}.png`}
                  alt={`Logo ${brand}`}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-gray-500 transition-colors group-hover:text-brand">
                {brand}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
