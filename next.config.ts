import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The WP backend answers 503 when many pages are prerendered at once, so build gently
  experimental: {
    staticGenerationMaxConcurrency: 2,
    staticGenerationRetryCount: 3,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arkequine.getkgkrunch.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ark-equine.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;