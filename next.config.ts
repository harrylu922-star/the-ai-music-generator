import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: enables deploy to Cloudflare Pages without Workers/WASM (avoids resvg.wasm deploy error).
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
