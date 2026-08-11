import type { MetadataRoute } from 'next';
import { SITE } from '@/constants/site';

export default function robots(): MetadataRoute.Robots {
  const base = SITE.url.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin'],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
