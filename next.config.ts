import type { NextConfig } from "next";
import path from "path";

const isCapacitorBuild = process.env.CAPACITOR_BUILD === "true";

const nextConfig: NextConfig = {
  ...(isCapacitorBuild ? { output: "export" } : {}),
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;