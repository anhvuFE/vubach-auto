import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // StrictMode double-renders every component in dev, which noticeably slows
  // local navigation for an SSR + antd app. It has no effect in production.
  reactStrictMode: false,
  // Ant Design v5 works best when transpiled in the Next.js pipeline
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/nextjs-registry'],
  experimental: {
    // Tree-shake barrel imports (esp. the ~1k icons in @ant-design/icons) so dev
    // compiles only the icons actually used — big win for compile time.
    optimizePackageImports: ['antd', '@ant-design/icons', 'framer-motion'],
  },
  images: {
    // Allow remote car images from mock data sources. Adjust as needed.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75],
    // Skip on-the-fly image optimization in dev: it runs sharp per image on the
    // dev server and is a major cause of scroll jank locally. Prod still optimizes.
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
