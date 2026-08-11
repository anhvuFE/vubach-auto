import HeroSection from '@/components/home/HeroSection';
import FeaturedCars from '@/components/home/FeaturedCars';
import StatsSection from '@/components/home/StatsSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CTASection from '@/components/home/CTASection';
import { BRANDS } from '@/constants/filters';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Trusted brands strip */}
      <div className="border-b border-gray-100 bg-white py-6">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Thương hiệu:
          </span>
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="font-display text-lg font-bold text-gray-300 transition-colors hover:text-charcoal"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <FeaturedCars />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
