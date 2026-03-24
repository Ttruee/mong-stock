import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/mong-stock',
  images: { unoptimized: true },
};

export default nextConfig;
