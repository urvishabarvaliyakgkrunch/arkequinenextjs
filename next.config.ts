import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true, // enables "use cache" / cacheLife / cacheTag
  images: {
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