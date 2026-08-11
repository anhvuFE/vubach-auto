import Link from 'next/link';
import { HomeOutlined, RightOutlined } from '@ant-design/icons';

interface Crumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  /** Optional background image URL; falls back to a dark gradient. */
  image?: string;
}

/**
 * Compact page header used on inner pages. Includes top padding to clear the
 * fixed site header and a breadcrumb trail.
 */
export default function PageBanner({ title, description, crumbs = [], image }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-charcoal pt-28 pb-12 sm:pt-32 sm:pb-16">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(circle at 85% 20%, #e11d2a 0, transparent 45%)' }}
      />
      <div className="container-page relative">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
          <Link href="/" className="flex items-center gap-1 transition-colors hover:text-white">
            <HomeOutlined /> Trang chủ
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              <RightOutlined className="text-[10px]" />
              {crumb.href ? (
                <Link href={crumb.href} className="transition-colors hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-3 max-w-2xl text-base text-white/70">{description}</p>}
      </div>
    </section>
  );
}
