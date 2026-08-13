import Link from 'next/link';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  FacebookFilled,
} from '@ant-design/icons';
import Logo from '@/components/common/Logo';
import { NAV_ITEMS, SITE } from '@/constants/site';
import { SERVICES } from '@/constants/content';

const contactRows = [
  { icon: <EnvironmentOutlined />, text: SITE.address },
  { icon: <PhoneOutlined />, text: `Hotline: ${SITE.hotline}`, href: `tel:${SITE.hotline}` },
  { icon: <MailOutlined />, text: SITE.email, href: `mailto:${SITE.email}` },
  { icon: <ClockCircleOutlined />, text: SITE.workingHours },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/70">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Logo variant="light" />
          <p className="text-sm leading-relaxed">
            Showroom chuyên mua bán, thu mua và ký gửi ô tô đã qua sử dụng. Uy tín tạo niềm tin –
            Chất lượng tạo giá trị.
          </p>
          <div className="flex gap-3">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition-colors hover:bg-brand hover:text-white"
            >
              <FacebookFilled />
            </a>
            <a
              href={`https://zalo.me/${SITE.zalo}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-bold transition-colors hover:bg-brand hover:text-white"
            >
              Zalo
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-4 font-display text-base font-bold text-white">Liên kết</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition-colors hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-4 font-display text-base font-bold text-white">Dịch vụ</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {SERVICES.slice(0, 5).map((service) => (
              <li key={service.title}>
                <Link href="/services" className="transition-colors hover:text-brand">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-display text-base font-bold text-white">Liên hệ</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {contactRows.map((row, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 text-brand">{row.icon}</span>
                {row.href ? (
                  <a href={row.href} className="transition-colors hover:text-brand">
                    {row.text}
                  </a>
                ) : (
                  <span>{row.text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs sm:flex-row">
          <p>
            © {year} {SITE.name}. Toàn bộ quyền được bảo lưu.
          </p>
          <p className="text-white/50">Thiết kế bởi {SITE.name}</p>
        </div>
      </div>
    </footer>
  );
}
