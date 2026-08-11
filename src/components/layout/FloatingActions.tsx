'use client';

import { useEffect, useState } from 'react';
import { PhoneOutlined, MessageOutlined, UpOutlined } from '@ant-design/icons';
import { SITE } from '@/constants/site';

/** Sticky floating contact buttons (phone / Zalo / Messenger) + back-to-top. */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const actions = [
    {
      label: 'Gọi ngay',
      href: `tel:${SITE.hotline}`,
      icon: <PhoneOutlined />,
      className: 'bg-brand',
      pulse: true,
    },
    {
      label: 'Chat Zalo',
      href: `https://zalo.me/${SITE.zalo}`,
      icon: <span className="text-[11px] font-extrabold">Zalo</span>,
      className: 'bg-[#0068ff]',
    },
    {
      label: 'Messenger',
      href: SITE.messenger,
      icon: <MessageOutlined />,
      className: 'bg-[#0084ff]',
    },
  ];

  return (
    <div className="fixed bottom-5 right-4 z-[900] flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          target={action.href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          aria-label={action.label}
          className={`group relative flex h-12 w-12 items-center justify-center rounded-full text-lg text-white shadow-lg transition-transform hover:scale-110 ${action.className}`}
        >
          {action.pulse && (
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/60" />
          )}
          <span className="relative">{action.icon}</span>
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-md bg-charcoal px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
            {action.label}
          </span>
        </a>
      ))}

      <button
        type="button"
        aria-label="Lên đầu trang"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-white shadow-lg transition-all hover:bg-charcoal-soft ${
          showTop ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <UpOutlined />
      </button>
    </div>
  );
}
