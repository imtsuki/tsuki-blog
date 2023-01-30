/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30, // one month
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
