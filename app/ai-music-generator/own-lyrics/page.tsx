"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Own Lyrics 已合并到 /ai-music-generator 的 tab，此路径重定向到主页面并打开 Own Lyrics 模式 */
export default function OwnLyricsRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/ai-music-generator?mode=own-lyrics");
  }, [router]);
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
      Redirecting…
    </div>
  );
}
