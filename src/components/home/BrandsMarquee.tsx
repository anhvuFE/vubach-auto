import { BRANDS } from '@/constants/filters';

/**
 * Infinite horizontal marquee of car brands. Pure CSS (duplicated track shifted
 * -50%) so it loops seamlessly; pauses on hover, with soft fades at both edges.
 */
export default function BrandsMarquee() {
  // Duplicate the list so the -50% translate wraps without a visible seam.
  const items = [...BRANDS, ...BRANDS];

  return (
    <div className="group relative overflow-hidden border-b border-gray-100 bg-white py-6">
      <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
        {items.map((brand, i) => (
          <span
            key={i}
            className="shrink-0 font-display text-xl font-bold text-gray-300 transition-colors hover:text-charcoal"
          >
            {brand}
          </span>
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
