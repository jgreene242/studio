
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Explicitly set, good for development
  swcMinify: true,       // Explicitly set, enables SWC for faster minification
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
