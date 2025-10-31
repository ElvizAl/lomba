import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "95.217.188.76:3030",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
