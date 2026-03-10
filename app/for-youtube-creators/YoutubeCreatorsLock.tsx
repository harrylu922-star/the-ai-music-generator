"use client";

import Link from "next/link";
import { useLoginPreview } from "../../lib/use-login-preview";

/**
 * 登录状态下仅展示第一屏，下方用遮罩锁定；整页 HTML 仍完整输出，不影响 SEO。
 */
export function YoutubeCreatorsLock({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useLoginPreview();

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <>
      {/* 下方内容仍在 DOM 中，爬虫可见 */}
      <div aria-hidden="true">{children}</div>
      {/* 从第一屏底部开始的遮罩，仅对登录用户可见 */}
      <div
        className="fixed left-0 right-0 bottom-0 z-10 flex flex-col items-center justify-center gap-4 bg-slate-950 px-4 py-12 text-center"
        style={{ top: "100vh", minHeight: "50vh" }}
        aria-label="Content locked for members"
      >
        <p className="text-slate-300 text-sm font-medium">
          Full page content is available to visitors. You’re seeing a preview as a logged-in user.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/ai-music-generator"
            className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 transition"
          >
            Create Music for My Videos
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-violet-500/50 hover:text-violet-200 transition"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </>
  );
}
