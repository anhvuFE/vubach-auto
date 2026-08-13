import Link from 'next/link';
import { SITE } from '@/constants/site';

interface LogoProps {
  /** 'light' for dark backgrounds (hero/footer), 'dark' for white header. */
  variant?: 'light' | 'dark';
  className?: string;
}

/** Brand wordmark + monogram. Pure CSS so it scales crisply everywhere. */
export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-charcoal';
  const subColor = variant === 'light' ? 'text-white/60' : 'text-gray-500';

  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label={SITE.name}>
      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-charcoal shadow-md transition-transform duration-300 group-hover:scale-105">
        <span className="font-display text-lg font-extrabold leading-none text-white">V</span>
        <span className="font-display text-lg font-extrabold leading-none text-brand">B</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold tracking-tight ${textColor}`}>
          VŨ BÁCH <span className="text-brand">AUTO</span>
        </span>
        <span className={`mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] ${subColor}`}>
          Premium Used Cars
        </span>
      </span>
    </Link>
  );
}
