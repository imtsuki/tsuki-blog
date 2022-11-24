/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30, // one month
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/webfinger',
        destination: '/api/webfinger',
      },
    ];
  },
};

export default nextConfig;
