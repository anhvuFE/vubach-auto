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
          {/* Info cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {infoCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-xl text-brand">
                  {card.icon}
                </span>
                <h3 className="mt-4 font-display font-bold text-charcoal">{card.title}</h3>
                {card.href ? (
                  <a
                    href={card.href}
                    className="mt-1 block text-sm text-gray-500 transition-colors hover:text-brand"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-gray-500">{card.value}</p>
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
