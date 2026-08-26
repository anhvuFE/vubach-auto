import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Be_Vietnam_Pro, Lexend } from 'next/font/google';
import { SITE } from '@/constants/site';
import Providers from '@/providers/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingActions from '@/components/layout/FloatingActions';
import CompareBar from '@/components/cars/CompareBar';
import JsonLd from '@/components/common/JsonLd';
import { autoDealerSchema, websiteSchema } from '@/lib/jsonLd';
import './globals.css';

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  // Only the weights actually used: 400 (body) + 500/600/700 (font-medium/
  // semibold/bold). Dropping the unused 300 trims one font file per subset.
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} – Mua bán ô tô đã qua sử dụng uy tín`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: '/' },
  keywords: [
    'mua bán ô tô cũ',
    'xe cũ',
    'ô tô đã qua sử dụng',
    'showroom ô tô',
    'Vũ Bách Auto',
    'thu mua xe',
    'ký gửi xe',
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} – Mua bán ô tô đã qua sử dụng uy tín`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#111418',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${lexend.variable}`}>
      <body>
        <JsonLd data={[autoDealerSchema(), websiteSchema()]} />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingActions />
          <CompareBar />
        </Providers>
      </body>
    </html>
  );
}
