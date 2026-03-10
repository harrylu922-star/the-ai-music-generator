"use client";

import Link from "next/link";
import { useState } from "react";
import { LANDING_PAGES } from "./LandingNav";

export type SiteHeaderProps = {
  hideLandingLinks?: boolean;
  /** 移动端汉堡菜单展示与左侧栏一致的 Tools 列表（用于 ai-music-generator 等工具页） */
  mobileNavKind?: "default" | "tools";
  /** 当前路径，用于 Tools 列表高亮（当 mobileNavKind === "tools" 时） */
  currentPath?: string;
};

export function SiteHeader({ hideLandingLinks, mobileNavKind = "default", currentPath = "" }: SiteHeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur shrink-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-4 min-w-0">
        <Link href="/" className="flex shrink-0 items-center gap-2 min-w-0 bg-transparent" aria-label="The AI Music Generator 首页">
          {/* 透明 ICON，无白底：使用原生 img 并强制透明，直接嵌入页面 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/tamg-icon2.png"
            alt="The AI Music Generator"
            width={36}
            height={36}
            className="h-9 w-9 w-auto object-contain object-left flex-shrink-0 block"
            style={{ background: 'transparent' }}
            loading="eager"
          />
          {/* 桌面端：保留文字品牌名（TAMG 强调） */}
          <span className="hidden sm:inline text-base font-semibold tracking-tight text-slate-100">
            <span className="text-violet-400">T</span>he<span className="text-violet-400">A</span>I<span className="text-violet-400">M</span>usic<span className="text-violet-400">G</span>enerator
          </span>
        </Link>
        <nav className="hidden sm:flex flex-1 items-center justify-evenly gap-2 text-sm text-slate-300 max-w-3xl mx-auto">
          <Link href={hideLandingLinks ? "#" : "/ai-music-generator"} className={hideLandingLinks ? "invisible pointer-events-none" : "hover:text-violet-300"} aria-hidden={hideLandingLinks}>AI Music Generator</Link>
          <Link href={hideLandingLinks ? "#" : "/ai-lyrics-generator"} className={hideLandingLinks ? "invisible pointer-events-none" : "hover:text-violet-300"} aria-hidden={hideLandingLinks}>AI Lyrics</Link>
          <Link href={hideLandingLinks ? "#" : "/ai-music-tools"} className={hideLandingLinks ? "invisible pointer-events-none" : "hover:text-violet-300"} aria-hidden={hideLandingLinks}>AI Music Tools</Link>
          <Link href="/pricing" className="hover:text-violet-300">Pricing</Link>
          <Link href="/resources" className="hover:text-violet-300">Resources</Link>
        </nav>
        {/* 移动端：导航缩略图（汉堡菜单） */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="sm:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600 bg-slate-800/60 text-slate-200 hover:border-violet-500/50 hover:text-violet-200"
            aria-label="打开菜单"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <button className="rounded-lg border border-slate-600 bg-slate-800/60 px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm text-slate-200 hover:border-violet-500/50 hover:text-violet-200 shrink-0" aria-label="Language">EN ▾</button>
          <Link href="/coming-soon" className="rounded-full border border-slate-600 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium hover:border-violet-400/70 hover:text-violet-200 shrink-0 whitespace-nowrap inline-block">Sign in</Link>
        </div>
      </div>
      {/* 移动端展开的导航面板：工具页时展示与左侧栏一致的 Tools 列表 */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800/80 bg-slate-950/95 px-4 py-4 max-h-[70vh] overflow-y-auto">
          <nav className="flex flex-col gap-1 text-sm text-slate-300">
            {mobileNavKind === "tools" ? (
              <>
                <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">Tools</p>
                {LANDING_PAGES.map(({ href, label, available }) => {
                  const isActive = currentPath === href;
                  return (
                    <div key={href}>
                      {available ? (
                        <Link
                          href={href}
                          className={`block rounded-lg px-3 py-2 hover:bg-slate-800/80 ${isActive ? "bg-violet-500/20 text-violet-300 font-medium" : "hover:text-violet-300"}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {label}
                        </Link>
                      ) : (
                        <span className="block rounded-lg px-3 py-2 text-slate-500 cursor-not-allowed">
                          {label} (Soon)
                        </span>
                      )}
                    </div>
                  );
                })}
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <Link href="/pricing" className="block rounded-lg px-3 py-2 hover:bg-slate-800/80 hover:text-violet-300" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                  <Link href="/resources" className="block rounded-lg px-3 py-2 hover:bg-slate-800/80 hover:text-violet-300" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
                </div>
              </>
            ) : (
              <>
                {!hideLandingLinks && (
                  <>
                    <Link href="/ai-music-generator" className="rounded-lg px-3 py-2 hover:bg-slate-800/80 hover:text-violet-300" onClick={() => setMobileMenuOpen(false)}>AI Music Generator</Link>
                    <Link href="/ai-lyrics-generator" className="rounded-lg px-3 py-2 hover:bg-slate-800/80 hover:text-violet-300" onClick={() => setMobileMenuOpen(false)}>AI Lyrics</Link>
                    <Link href="/ai-music-tools" className="rounded-lg px-3 py-2 hover:bg-slate-800/80 hover:text-violet-300" onClick={() => setMobileMenuOpen(false)}>AI Music Tools</Link>
                  </>
                )}
                <Link href="/pricing" className="rounded-lg px-3 py-2 hover:bg-slate-800/80 hover:text-violet-300" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                <Link href="/resources" className="rounded-lg px-3 py-2 hover:bg-slate-800/80 hover:text-violet-300" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
