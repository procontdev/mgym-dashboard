import type { NextConfig } from "next";

const nextConfig = {
  // output: "export", // Se comenta para permitir el uso de cookies y middleware
  images: { unoptimized: true },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

