import Image from 'next/image';
import Link from 'next/link';
import { PhoneOutlined, SafetyCertificateOutlined, CheckCircleFilled } from '@ant-design/icons';
import HeroSearch from './HeroSearch';
import { SITE } from '@/constants/site';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=75';

const highlights = ['Xe kiểm định 100%', 'Hỗ trợ trả góp 80%', 'Sang tên nhanh chóng'];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf1ff] via-[#f5f8ff] to-white">
      {/* Soft decorative glows */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-light/10 blur-3xl" />

      <div className="container-page relative z-10 pt-28 pb-14 lg:pt-36 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              <SafetyCertificateOutlined />
              Showroom ô tô đã qua sử dụng uy tín
            </span>

            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
              VŨ BÁCH <span className="text-brand">AUTO</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-gray-500 sm:text-lg">
              {SITE.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-charcoal"
                >
                  <CheckCircleFilled className="text-brand" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/cars"
                className="rounded-lg bg-brand px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-xl"
              >
                Xem xe đang bán
              </Link>
              <a
                href={`tel:${SITE.hotline}`}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-7 py-3.5 text-base font-bold text-charcoal shadow-sm transition-all hover:border-brand hover:text-brand"
              >
                <PhoneOutlined /> Liên hệ ngay
              </a>
            </div>
          </div>

          {/* Car image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-card-hover ring-1 ring-black/5">
              <Image
                src={HERO_IMAGE}
                alt="Xe tại Vũ Bách Auto"
                width={720}
                height={520}
                priority
                quality={75}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:block">
              <p className="font-display text-2xl font-extrabold text-brand">500+</p>
              <p className="text-xs font-medium text-gray-500">Xe đã bàn giao</p>
            </div>
          </div>
        </div>

        {/* Quick search */}
        <div className="mt-12 lg:mt-16">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
