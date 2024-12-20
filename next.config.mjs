/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'https://studious-goldfish-v6q574p9g4j2wj4p-3000.app.github.dev/'
      ]
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'wauefrbxlswnbrwldmmq.supabase.co',
      }
    ],
  },
};

export default nextConfig;
