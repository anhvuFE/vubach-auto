'use client';

import { Spin } from 'antd';

interface LoadingProps {
  /** Optional label shown under the spinner. */
  tip?: string;
  /**
   * Vertical footprint. `page` fills a viewport-ish area (route/page loads);
   * `inline` sits compactly inside a smaller container (sections, panels).
   */
  size?: 'page' | 'inline';
  className?: string;
}

/**
 * App-wide loading indicator — a centered Ant Design spinner. Use this for every
 * loading state (route transitions, Suspense fallbacks, auth bootstrap, async
 * sections) so the whole app shows one consistent spinner.
 */
export default function Loading({
  tip,
  size = 'page',
  className = '',
}: LoadingProps) {
  const height = size === 'page' ? 'min-h-[70vh] pt-24' : 'min-h-[200px]';
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${height} ${className}`}
    >
      <Spin size="large" />
      {tip ? <p className="text-sm text-gray-500">{tip}</p> : null}
    </div>
  );
}
