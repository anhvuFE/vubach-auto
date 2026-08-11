import HeroSection from '@/components/home/HeroSection';
import BrandsMarquee from '@/components/home/BrandsMarquee';
import FeaturedCars from '@/components/home/FeaturedCars';
import StatsSection from '@/components/home/StatsSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsMarquee />
      <FeaturedCars />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
