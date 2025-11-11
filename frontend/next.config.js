/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    // Use rewrites in development, or if no API URL is set
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (process.env.NODE_ENV === 'development' || !apiUrl) {
      return [
        {
          source: '/api/:path*',
          destination: `${apiUrl || 'http://localhost:5000'}/api/:path*`,
        },
      ];
    }
    return [];
  },
  // Output configuration for Vercel
  output: 'standalone',
};

module.exports = nextConfig;

