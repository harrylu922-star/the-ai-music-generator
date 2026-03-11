"use client";

import Image from "next/image";
import { useState } from "react";

function Placeholder({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-dashed border-slate-600 bg-slate-800/50 flex items-center justify-center ${className ?? "aspect-video"}`}
      aria-hidden
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-500">Image</span>
    </div>
  );
}

/** 功能卡配图：加载失败时显示占位；priority 用于首屏 LCP；src640 时用原生 img+srcSet 以改善移动端 LCP */
export function HomeFeatureImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  src640,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** 可选 640w 图，用于 srcset 减少移动端下载（PageSpeed “Improve image delivery”） */
  src640?: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return <Placeholder className={className} />;
  }

  const containerClass = `relative aspect-video overflow-hidden rounded-xl bg-slate-800/50 ${className ?? ""}`;

  if (src640) {
    return (
      <div className={containerClass}>
        <img
          src={src}
          srcSet={`${src640} 640w, ${src} 960w`}
          sizes={sizes}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setError(true)}
        />
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  );
}

/** CTA 背景图：加载失败时显示深色占位，overlay 始终在上层 */
export function HomeCtaImage({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  const [error, setError] = useState(false);

  return (
    <>
      {error ? (
        <div className="absolute inset-0 bg-slate-800/80" aria-hidden />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
          onError={() => setError(true)}
          unoptimized
        />
      )}
      {children}
    </>
  );
}
