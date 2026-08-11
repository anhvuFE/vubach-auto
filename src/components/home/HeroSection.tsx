import Image from 'next/image';
import Link from 'next/link';
import { PhoneOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import HeroSearch from './HeroSearch';
import { SITE } from '@/constants/site';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=70';

const highlights = ['Xe kiểm định 100%', 'Hỗ trợ trả góp 80%', 'Sang tên nhanh chóng'];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* Background */}
      <Image
        src={HERO_IMAGE}
        alt="Showroom ô tô Vũ Bách Auto"
        fill
        priority
        quality={70}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/30" />

      {/* Content */}
      <div className="container-page relative z-10 pt-28 pb-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            <SafetyCertificateOutlined className="text-brand-light" />
            Showroom ô tô đã qua sử dụng uy tín
          </span>

          <h1 className="mt-6 font-display text-6xl font-bold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl">
            VŨ BÁCH <span className="text-brand-light">AUTO</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            {SITE.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {highlights.map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm font-medium text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/cars"
              className="rounded-lg bg-brand px-7 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-brand-dark hover:shadow-xl"
            >
              Xem xe đang bán
            </Link>
            <a
              href={`tel:${SITE.hotline}`}
              className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur transition-all hover:bg-white/15"
            >
              <PhoneOutlined /> Liên hệ ngay
            </a>
          </div>

          {/* Quick search */}
          <div className="mt-10 max-w-3xl">
            <HeroSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
