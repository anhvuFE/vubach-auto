import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Be_Vietnam_Pro, Montserrat, Playfair_Display } from 'next/font/google';
import { SITE } from '@/constants/site';
import Providers from '@/providers/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingActions from '@/components/layout/FloatingActions';
import './globals.css';

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} – Mua bán ô tô đã qua sử dụng uy tín`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
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
    <html
      lang="vi"
      className={`${beVietnam.variable} ${montserrat.variable} ${playfair.variable}`}
    >
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
