import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ant Design v5 works best when transpiled in the Next.js pipeline
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/nextjs-registry'],
  images: {
    // Allow remote car images from mock data sources. Adjust as needed.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
