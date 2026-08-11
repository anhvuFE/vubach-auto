import Link from 'next/link';
import { PhoneOutlined } from '@ant-design/icons';
import { SITE } from '@/constants/site';

export default function CTASection() {
  return (
    <section className="border-y border-charcoal bg-white">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-charcoal sm:text-5xl">
              Cần tư vấn chọn xe phù hợp?
            </h2>
            <p className="mt-4 text-base text-gray-500 sm:text-lg">
              Đội ngũ Vũ Bách Auto sẵn sàng đồng hành, tư vấn tận tâm để bạn tìm được chiếc xe ưng ý
              nhất với ngân sách của mình.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${SITE.hotline}`}
              className="flex items-center justify-center gap-2 bg-charcoal px-8 py-4 text-base font-bold text-white transition-colors hover:bg-brand"
            >
              <PhoneOutlined /> {SITE.hotline}
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center border border-charcoal px-8 py-4 text-base font-bold text-charcoal transition-colors hover:bg-charcoal hover:text-white"
            >
              Gửi yêu cầu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
