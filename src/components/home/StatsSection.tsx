import StatsCounter from '@/components/common/StatsCounter';
import Reveal from '@/components/common/Reveal';
import DynamicIcon from '@/components/common/DynamicIcon';
import { STATS } from '@/constants/content';

// Pair each stat with an icon from the DynamicIcon registry (STATS has no icon field).
const STAT_ICONS = ['car', 'safety', 'heart', 'check'];

export default function StatsSection() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.12}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center shadow-card transition-shadow hover:shadow-card-hover sm:p-8"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-xl text-brand">
                <DynamicIcon name={STAT_ICONS[i]} />
              </span>
              <p className="mt-4 font-display text-4xl font-extrabold tracking-tight text-brand sm:text-5xl">
                <StatsCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-sm">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
