import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: enables deploy to Cloudflare Pages without Workers/WASM (avoids resvg.wasm deploy error).
  output: "export",
  images: {
    unoptimized: true,
  },
  // 减少移动端渲染阻塞：关键 CSS 内联，避免首屏等待外部 CSS 请求（生产环境生效）
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
