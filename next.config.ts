import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],

  },
  compress: true,
  productionBrowserSourceMaps: true,
  images: {
    minimumCacheTTL: 60,
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.awtinvestments.com',
      },
      {
        protocol: 'http',
        hostname: 'backend.awtinvestments.com',
      },
      {
        protocol: 'http',
        hostname: 'server-awt.soulservices.com',
      },
      {
        protocol: 'https',
        hostname: 'server-awt.soulservices.com',
      },

      {
        protocol: 'http',
        hostname: 'localhost',
      },
      
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*).(js|css|png|jpg|svg|woff|woff2|ttf|otf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
