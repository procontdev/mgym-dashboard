import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Se comenta para permitir el uso de cookies y middleware
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;

