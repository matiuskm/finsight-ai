import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/finsight-ai" : "",
  allowedDevOrigins: ['172.20.10.7'],
};

export default nextConfig;
