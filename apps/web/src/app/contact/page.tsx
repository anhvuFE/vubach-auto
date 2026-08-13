import type { Metadata } from 'next';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import PageBanner from '@/components/common/PageBanner';
import ContactForm from '@/components/contact/ContactForm';
import { SITE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: `Liên hệ Vũ Bách Auto - Hotline ${SITE.hotline}. Địa chỉ: ${SITE.address}. Chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn.`,
  alternates: { canonical: '/contact' },
};

const infoCards = [
  { icon: <EnvironmentOutlined />, title: 'Địa chỉ', value: SITE.address },
  { icon: <PhoneOutlined />, title: 'Hotline', value: SITE.hotline, href: `tel:${SITE.hotline}` },
  { icon: <MailOutlined />, title: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: <ClockCircleOutlined />, title: 'Giờ làm việc', value: SITE.workingHours },
];

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Liên hệ với chúng tôi"
        description="Để lại thông tin hoặc gọi trực tiếp — đội ngũ Vũ Bách Auto sẽ hỗ trợ bạn tận tình."
        crumbs={[{ label: 'Liên hệ' }]}
      />

      <section className="section bg-white">
        <div className="container-page">
          {/* Info row */}
          <div className="grid grid-cols-1 border-t border-gray-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-gray-200">
            {infoCards.map((card) => (
              <div key={card.title} className="border-b border-gray-200 py-6 lg:border-b-0 lg:px-8 lg:first:pl-0">
                <div className="flex items-center gap-2 text-brand">
                  <span className="text-base">{card.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                    {card.title}
                  </span>
                </div>
                {card.href ? (
                  <a
                    href={card.href}
                    className="mt-2 block font-display text-lg font-bold text-charcoal transition-colors hover:text-brand"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-2 font-display text-lg font-bold text-charcoal">{card.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Form + map */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-display text-2xl font-bold text-charcoal">Gửi yêu cầu tư vấn</h2>
              <p className="mt-2 text-sm text-gray-500">
                Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-card">
              <iframe
                title="Bản đồ Vũ Bách Auto"
                src={SITE.mapEmbed}
                className="h-full min-h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
