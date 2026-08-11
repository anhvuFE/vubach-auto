import Link from 'next/link';
import { PhoneOutlined } from '@ant-design/icons';
import Reveal from '@/components/common/Reveal';
import { SITE } from '@/constants/site';

export default function CTASection() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-charcoal px-6 py-14 text-center shadow-card-hover sm:px-12">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 15% 50%, #e11d2a 0, transparent 35%), radial-gradient(circle at 85% 50%, #e11d2a 0, transparent 35%)',
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                Cần tư vấn chọn xe phù hợp?
              </h2>
              <p className="mt-4 text-base text-white/70 sm:text-lg">
                Đội ngũ Vũ Bách Auto luôn sẵn sàng đồng hành, tư vấn tận tâm để bạn tìm được chiếc xe
                ưng ý nhất với ngân sách của mình.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${SITE.hotline}`}
                  className="flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-brand-dark"
                >
                  <PhoneOutlined /> {SITE.hotline}
                </a>
                <Link
                  href="/contact"
                  className="rounded-lg border border-white/25 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur transition-all hover:bg-white/15"
                >
                  Gửi yêu cầu tư vấn
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
