"use client";

/**
 * 响应式 hero 图：移动端用 640w，桌面用 960w，减轻 PageSpeed “Improve image delivery” 与 LCP。
 * 用于子页（ai-music-generator、ai-lyrics-generator、text-to-music）的 hero 配图。
 */
export function ResponsiveHeroImage({
  src,
  src640,
  alt,
  sizes = "(max-width: 768px) 100vw, 672px",
  priority = true,
  className = "object-cover",
}: {
  src: string;
  src640: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      srcSet={`${src640} 640w, ${src} 960w`}
      sizes={sizes}
      alt={alt}
      className={`absolute inset-0 h-full w-full ${className}`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
