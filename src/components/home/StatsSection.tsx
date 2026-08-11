import StatsCounter from '@/components/common/StatsCounter';
import Reveal from '@/components/common/Reveal';
import { STATS } from '@/constants/content';

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-16">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #2563eb 0, transparent 40%), radial-gradient(circle at 80% 80%, #2563eb 0, transparent 40%)',
        }}
      />
      <div className="container-page relative">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-4xl font-extrabold text-brand sm:text-5xl">
                <StatsCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-white/70 sm:text-base">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
