import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@vortx/ui", "@vortx/design-tokens"],
};

export default nextConfig;
