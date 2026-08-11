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

  return (
    <Reveal
      className={`flex flex-col gap-3 ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          <span className="h-px w-6 bg-brand" />
          {eyebrow}
        </span>
      )}
      <h2 className={`font-serif text-4xl font-bold tracking-tight sm:text-5xl ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl text-base leading-relaxed ${descColor}`}>{description}</p>
      )}
    </Reveal>
  );
}
