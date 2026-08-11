import StatsCounter from '@/components/common/StatsCounter';
import { STATS } from '@/constants/content';

export default function StatsSection() {
  return (
    <section className="bg-charcoal">
      <div className="container-page">
        <div className="grid grid-cols-2 divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0 md:divide-x">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 py-12 sm:px-8">
              <p className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                <StatsCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
