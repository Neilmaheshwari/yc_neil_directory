import type { NextConfig } from "next";

const nextConfig: NextConfig = {


  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // This is not recommended for production, but useful for development
  },
  eslint: {
    ignoreDuringBuilds: true, // This is not recommended for production, but useful for development
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],

  },
  
};    

export default nextConfig;
