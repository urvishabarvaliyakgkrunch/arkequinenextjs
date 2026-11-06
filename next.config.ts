import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The WP backend answers 503 when many pages are prerendered at once, so build gently
  experimental: {
    staticGenerationMaxConcurrency: 2,
    staticGenerationRetryCount: 3,
  },
  // Keeps the live site's /?s=query search URL while the homepage stays a cached static page
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", has: [{ type: "query", key: "s", value: ".+" }], destination: "/search-results" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Fewer widths = fewer billed image transformations on Vercel (each width is one transformation)
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
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