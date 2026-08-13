'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true once the page is scrolled past `threshold` px.
 * Throttled with requestAnimationFrame so it never runs setState more than once
 * per frame — avoids scroll jank from high-frequency scroll events.
 */
export function useScrollThreshold(threshold: number): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setPassed(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return passed;
}
