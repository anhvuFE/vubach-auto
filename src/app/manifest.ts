import type { MetadataRoute } from 'next';
import { SITE } from '@/constants/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} – Mua bán ô tô đã qua sử dụng`,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#111418',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
