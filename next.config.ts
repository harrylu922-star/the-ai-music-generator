import type { NextConfig } from "next";
import path from "path";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const emptyPolyfillAbsolute = path.join(process.cwd(), "lib", "empty-polyfill.js");
// Turbopack 在 Windows 上不支持绝对路径，webpack 用绝对路径
const emptyPolyfillRelative = "./lib/empty-polyfill.js";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(self)",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
    ];
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

initOpenNextCloudflareForDev();
