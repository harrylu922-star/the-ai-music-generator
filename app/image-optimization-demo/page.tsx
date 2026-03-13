"use client";

import { useState, useCallback } from "react";
import Link from "@/components/Link";

type SizeResult = { url: string; bytes?: number; error?: string };

function useMeasureSize() {
  const [sizes, setSizes] = useState<Record<string, SizeResult>>({});

  const measure = useCallback(async (label: string, url: string) => {
    setSizes((prev) => ({ ...prev, [label]: { url } }));
    try {
      const res = await fetch(url, { method: "HEAD" });
      const contentLength = res.headers.get("content-length");
      setSizes((prev) => ({
        ...prev,
        [label]: { url, bytes: contentLength ? parseInt(contentLength, 10) : undefined },
      }));
    } catch (e) {
      setSizes((prev) => ({
        ...prev,
        [label]: { url, error: (e as Error).message },
      }));
    }
  }, []);

  return { sizes, measure };
}

export default function ImageOptimizationDemoPage() {
  const { sizes, measure } = useMeasureSize();
  const [measured, setMeasured] = useState(false);

  const measureAll = useCallback(() => {
    setMeasured(true);
    measure("before-how", "/images/home/how-1-describe.webp");
    measure("after-how", "/images/home/how-1-describe-192.webp");
    measure("before-hero", "/images/home/hero-card-ai-music-generator.webp");
    measure("after-hero-640", "/images/home/hero-card-ai-music-generator-640.webp");
    measure("before-section", "/images/home/spark-creators.webp");
    measure("after-section", "/images/home/spark-creators-640.webp");
  }, [measure]);

  const fmt = (bytes?: number) =>
    bytes != null ? `${(bytes / 1024).toFixed(1)} KiB` : "—";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <Link
            href="/"
            className="text-sm text-violet-300 hover:text-violet-200 underline"
          >
            ← 返回首页
          </Link>
          <h1 className="mt-4 text-2xl font-semibold">
            图片优化前后对比（Improve image delivery）
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            同一场景下，优化前加载大图，优化后按展示尺寸加载小图（srcSet / 多尺寸变体），体积与 LCP 更友好。
          </p>
          <button
            type="button"
            onClick={measureAll}
            className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
          >
            {measured ? "重新测量" : "测量实际加载大小"}
          </button>
        </div>

        {/* 例 1：96px 小图（how-to） */}
        <section className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
          <h2 className="text-lg font-medium mb-4">
            例 1：96×96 小图（如 ai-music-generator 三步）
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium uppercase text-slate-500 mb-2">
                优化前（整张 960px）
              </p>
              <div className="relative h-24 w-24 rounded-lg overflow-hidden border border-slate-600 bg-slate-800">
                <img
                  src="/images/home/how-1-describe.webp"
                  alt="优化前"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                约 61 KiB · 960px 宽
              </p>
              {sizes["before-how"]?.bytes != null && (
                <p className="text-xs text-amber-200">实际: {fmt(sizes["before-how"].bytes)}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-violet-400 mb-2">
                优化后（192w 变体）
              </p>
              <div className="relative h-24 w-24 rounded-lg overflow-hidden border border-violet-600/50 bg-slate-800">
                <img
                  src="/images/home/how-1-describe-192.webp"
                  srcSet="/images/home/how-1-describe-192.webp 192w"
                  sizes="96px"
                  alt="优化后"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                约 6 KiB · 192px 宽
              </p>
              {sizes["after-how"]?.bytes != null && (
                <p className="text-xs text-emerald-300">实际: {fmt(sizes["after-how"].bytes)}</p>
              )}
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            视觉一致，体积约降 90%，首屏与列表页加载更快。
          </p>
        </section>

        {/* 例 2：Hero 卡（移动端选 640w） */}
        <section className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
          <h2 className="text-lg font-medium mb-4">
            例 2：首屏 Hero 卡（移动端用 640w）
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium uppercase text-slate-500 mb-2">
                优化前（仅 960w）
              </p>
              <div className="relative aspect-video max-w-[320px] rounded-lg overflow-hidden border border-slate-600 bg-slate-800">
                <img
                  src="/images/home/hero-card-ai-music-generator.webp"
                  alt="优化前"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                约 43 KiB
              </p>
              {sizes["before-hero"]?.bytes != null && (
                <p className="text-xs text-amber-200">实际: {fmt(sizes["before-hero"].bytes)}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-violet-400 mb-2">
                优化后（640w + 960w srcSet）
              </p>
              <div className="relative aspect-video max-w-[320px] rounded-lg overflow-hidden border border-violet-600/50 bg-slate-800">
                <img
                  src="/images/home/hero-card-ai-music-generator.webp"
                  srcSet="/images/home/hero-card-ai-music-generator-640.webp 640w, /images/home/hero-card-ai-music-generator.webp 960w"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  alt="优化后"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                小屏选 640w 约 26 KiB
              </p>
              {sizes["after-hero-640"]?.bytes != null && (
                <p className="text-xs text-emerald-300">640w 实际: {fmt(sizes["after-hero-640"].bytes)}</p>
              )}
            </div>
          </div>
        </section>

        {/* 例 3：区块大图 */}
        <section className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
          <h2 className="text-lg font-medium mb-4">
            例 3：区块图（spark-creators，移动端 640w）
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium uppercase text-slate-500 mb-2">
                优化前（960w）
              </p>
              <div className="relative aspect-video max-w-[320px] rounded-lg overflow-hidden border border-slate-600 bg-slate-800">
                <img
                  src="/images/home/spark-creators.webp"
                  alt="优化前"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                约 95 KiB
              </p>
              {sizes["before-section"]?.bytes != null && (
                <p className="text-xs text-amber-200">实际: {fmt(sizes["before-section"].bytes)}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-violet-400 mb-2">
                优化后（640w）
              </p>
              <div className="relative aspect-video max-w-[320px] rounded-lg overflow-hidden border border-violet-600/50 bg-slate-800">
                <img
                  src="/images/home/spark-creators-640.webp"
                  alt="优化后"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                约 48 KiB
              </p>
              {sizes["after-section"]?.bytes != null && (
                <p className="text-xs text-emerald-300">实际: {fmt(sizes["after-section"].bytes)}</p>
              )}
            </div>
          </div>
        </section>

        <p className="text-slate-500 text-sm">
          实际部署后可用 Chrome DevTools → Network 按「Size」列对比同一页优化前后的请求体积；本页「测量实际加载大小」为 HEAD 请求得到的 Content-Length。
        </p>
      </div>
    </main>
  );
}
