import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';
import SectionHeading from '@/components/common/SectionHeading';
import Reveal from '@/components/common/Reveal';
import DynamicIcon from '@/components/common/DynamicIcon';
import { SERVICES } from '@/constants/content';

export default function ServicesSection() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Dịch vụ"
          title="Giải pháp toàn diện cho xe của bạn"
          description="Từ mua bán, thu mua, ký gửi đến hỗ trợ tài chính và pháp lý — tất cả trong một điểm đến."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 4) * 0.06}>
              <Link
                href="/services"
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card-hover"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-2xl text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <DynamicIcon name={service.icon} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-charcoal">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                  {service.description}
                </p>
                <span className="mt-4 flex items-center gap-1.5 text-sm font-bold text-brand">
                  Tìm hiểu thêm
                  <ArrowRightOutlined className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
