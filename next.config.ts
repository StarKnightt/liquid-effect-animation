import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/liquid-effect-animation",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
