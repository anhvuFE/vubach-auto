import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';
import SectionHeading from '@/components/common/SectionHeading';
import DynamicIcon from '@/components/common/DynamicIcon';
import { SERVICES } from '@/constants/content';

export default function ServicesSection() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <SectionHeading
          align="left"
          eyebrow="Dịch vụ"
          title="Giải pháp toàn diện cho xe của bạn"
          description="Từ mua bán, thu mua, ký gửi đến hỗ trợ tài chính và pháp lý — tất cả trong một điểm đến."
        />

        <div className="mt-12 grid md:grid-cols-2 md:gap-x-16">
          {SERVICES.map((service, i) => (
            <Link
              key={service.title}
              href="/services"
              className="group flex items-start gap-5 border-t border-gray-200 py-7 transition-colors hover:border-charcoal sm:gap-6"
            >
              <span className="pt-1 font-display text-xl font-bold tabular-nums text-gray-300 transition-colors group-hover:text-brand">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <DynamicIcon name={service.icon} className="text-lg text-brand" />
                  <h3 className="font-display text-lg font-bold text-charcoal sm:text-xl">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{service.description}</p>
              </div>
              <ArrowRightOutlined className="mt-1.5 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-charcoal" />
            </Link>
          ))}

          {/* Fill the trailing cell with a call-to-action instead of empty space. */}
          <Link
            href="/services"
            className="group flex items-center justify-between gap-4 border-t border-charcoal bg-charcoal px-6 py-7 text-white transition-colors hover:bg-charcoal-soft"
          >
            <span className="font-display text-lg font-bold">Xem tất cả dịch vụ</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-1">
              <ArrowRightOutlined />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
