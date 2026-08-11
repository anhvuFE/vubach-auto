import type { Metadata } from 'next';
import Link from 'next/link';
import { PhoneOutlined } from '@ant-design/icons';
import PageBanner from '@/components/common/PageBanner';
import SectionHeading from '@/components/common/SectionHeading';
import Reveal from '@/components/common/Reveal';
import DynamicIcon from '@/components/common/DynamicIcon';
import { SERVICES } from '@/constants/content';
import { SITE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Dịch vụ',
  description:
    'Dịch vụ tại Vũ Bách Auto: mua bán xe cũ, thu mua xe, ký gửi, định giá, hỗ trợ trả góp, sang tên và kiểm định xe.',
};

const STEPS = [
  { step: '01', title: 'Tiếp nhận nhu cầu', desc: 'Lắng nghe và tư vấn theo đúng nhu cầu, ngân sách của khách hàng.' },
  { step: '02', title: 'Khảo sát & định giá', desc: 'Kiểm tra, thẩm định và đưa ra mức giá minh bạch, hợp lý.' },
  { step: '03', title: 'Thống nhất & ký kết', desc: 'Hoàn tất thủ tục, hợp đồng rõ ràng, đúng quy định pháp luật.' },
  { step: '04', title: 'Bàn giao & hậu mãi', desc: 'Bàn giao xe, hỗ trợ sang tên và đồng hành sau bán hàng.' },
];

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        title="Dịch vụ của chúng tôi"
        description="Giải pháp toàn diện cho mọi nhu cầu về ô tô đã qua sử dụng — nhanh chóng, minh bạch và chuyên nghiệp."
        crumbs={[{ label: 'Dịch vụ' }]}
      />

      {/* Services grid */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Dịch vụ"
            title="Chúng tôi cung cấp"
            description="Đầy đủ dịch vụ giúp bạn mua, bán và sở hữu xe một cách dễ dàng nhất."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} delay={(i % 3) * 0.08}>
                <div className="flex h-full gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card-hover">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-2xl text-brand">
                    <DynamicIcon name={service.icon} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-charcoal">{service.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-gray-50">
        <div className="container-page">
          <SectionHeading
            eyebrow="Quy trình"
            title="Quy trình làm việc"
            description="4 bước đơn giản, minh bạch để bạn an tâm giao dịch tại Vũ Bách Auto."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl bg-white p-6 shadow-card">
                  <span className="font-display text-4xl font-extrabold text-brand/20">
                    {item.step}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-charcoal">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-charcoal px-8 py-12 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                Bạn cần hỗ trợ dịch vụ nào?
              </h2>
              <p className="mt-2 text-white/70">Liên hệ ngay để được tư vấn miễn phí.</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <a
                href={`tel:${SITE.hotline}`}
                className="flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 font-bold text-white transition-colors hover:bg-brand-dark"
              >
                <PhoneOutlined /> {SITE.hotline}
              </a>
              <Link
                href="/contact"
                className="rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 font-bold text-white transition-colors hover:bg-white/15"
              >
                Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
