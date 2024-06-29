/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'starwars-visualguide.com',
        port: '',
        pathname: '/assets/img/**',
      },
    ],
  },
};

export default nextConfig;
