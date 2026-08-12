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

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              href="/services"
              className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card-hover"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-xl text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <DynamicIcon name={service.icon} />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold text-charcoal">{service.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                  {service.description}
                </p>
              </div>
              <ArrowRightOutlined className="mt-1 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-brand" />
            </Link>
          ))}

          {/* Fill the trailing cell with a call-to-action instead of empty space. */}
          <Link
            href="/services"
            className="group flex items-center justify-between gap-4 rounded-2xl bg-brand p-6 text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-card-hover"
          >
            <span className="font-display text-lg font-bold sm:text-xl">Xem tất cả dịch vụ</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
              <ArrowRightOutlined />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
