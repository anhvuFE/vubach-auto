import Link from 'next/link';
import { PhoneOutlined } from '@ant-design/icons';
import { SITE } from '@/constants/site';

export default function CTASection() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-dark px-8 py-12 shadow-card-hover md:flex-row md:items-center md:px-14 md:py-16">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative max-w-xl">
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Cần tư vấn chọn xe phù hợp?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              Đội ngũ Vũ Bách Auto sẵn sàng đồng hành, tư vấn tận tâm để bạn tìm được chiếc xe ưng ý
              nhất với ngân sách của mình.
            </p>
          </div>
          <div className="relative flex shrink-0 flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${SITE.hotline}`}
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-bold text-brand shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <PhoneOutlined /> {SITE.hotline}
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center rounded-lg border border-white/40 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              Gửi yêu cầu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
