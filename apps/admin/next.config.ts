import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@vortx/ui", "@vortx/design-tokens"],
  typedRoutes: true,
  reactStrictMode: true
};

export default nextConfig;
