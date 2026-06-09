import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory makes Next misinfer the workspace root.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
