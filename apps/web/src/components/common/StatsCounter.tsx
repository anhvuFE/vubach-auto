'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface StatsCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts up to `value` once scrolled into view. */
export default function StatsCounter({
  value,
  suffix = '',
  duration = 1.6,
  className = '',
}: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString('vi-VN')}
      {suffix}
    </span>
  );
}
