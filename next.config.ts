import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Menu item images are sent as optimized JPEG data URLs
    proxyClientMaxBodySize: "4mb",
  },
};

export default nextConfig;
