import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  variant?: 'light' | 'dark';
  className?: string;
}

/** Consistent section header: small eyebrow label, title, optional description. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  variant = 'dark',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const titleColor = variant === 'light' ? 'text-white' : 'text-charcoal';
  const descColor = variant === 'light' ? 'text-white/70' : 'text-gray-500';

  const eyebrowColor = variant === 'light' ? 'text-white/50' : 'text-gray-400';

  return (
    <Reveal
      className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      {eyebrow && (
        <span className={`text-xs font-semibold uppercase tracking-[0.25em] ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-xl text-base leading-relaxed ${descColor}`}>{description}</p>
      )}
    </Reveal>
  );
}
