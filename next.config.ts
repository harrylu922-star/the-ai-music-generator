import type { NextConfig } from "next";
import path from "path";

const emptyPolyfillAbsolute = path.join(process.cwd(), "lib", "empty-polyfill.js");
// Turbopack 在 Windows 上不支持绝对路径，webpack 用绝对路径
const emptyPolyfillRelative = "./lib/empty-polyfill.js";

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
  // PageSpeed: 避免向现代浏览器发送旧版 JS（约节省 13 KiB），见 next.js/discussions/64330
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next/dist/build/polyfills/polyfill-module": emptyPolyfillAbsolute,
      "../build/polyfills/polyfill-module": emptyPolyfillAbsolute,
    };
    return config;
  },
  // Next 16 默认 Turbopack，需同步 alias（相对路径以兼容 Windows）
  turbopack: {
    resolveAlias: {
      "next/dist/build/polyfills/polyfill-module": emptyPolyfillRelative,
      "../build/polyfills/polyfill-module": emptyPolyfillRelative,
    },
  },
};

export default nextConfig;
