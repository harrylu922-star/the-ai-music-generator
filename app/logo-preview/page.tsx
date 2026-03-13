// Logo 预览：在主站背景色（slate-950）上展示字标 + Icon
import type { Metadata } from "next";
import Link from "@/components/Link";

export const metadata: Metadata = {
  title: "Logo Preview | TAMG",
  description: "The AI Music Generator logo preview on site background.",
  robots: "noindex, nofollow",
};

const BG_CLASS = "min-h-screen bg-slate-950 text-slate-50";

// 主站背景色 slate-950 ≈ #020617，与首页一致
const SLATE_950 = "#020617";

export default function LogoPreviewPage() {
  return (
    <main className={BG_CLASS}>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="mb-10 text-center text-sm text-slate-400">
          <Link href="/" className="hover:text-violet-400">← 返回首页</Link>
          <span className="mx-2">·</span>
          主站背景色 slate-950 下的 logo 效果
        </p>

        {/* 1) 字标 + Icon 组合（SVG 内联，与主站背景一致） */}
        <section className="mb-16">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
            字标 + Icon 组合
          </h2>
          <div
            className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 p-12"
            style={{ background: SLATE_950 }}
          >
            <svg
              viewBox="0 0 520 120"
              className="max-h-32 w-full max-w-lg object-contain"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 显眼的主色：亮紫到品红，深色背景上高对比 */}
                <linearGradient id="tamgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#e879f9" />
                </linearGradient>
              </defs>
              {/* 左侧 Icon：字母 M + 五线谱 + 音符，AI 音乐行业辨识 */}
              <g transform="translate(0, 14)">
                <line x1="2" y1="18" x2="42" y2="18" stroke="url(#tamgGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <line x1="2" y1="26" x2="42" y2="26" stroke="url(#tamgGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <line x1="2" y1="34" x2="42" y2="34" stroke="url(#tamgGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <line x1="2" y1="42" x2="42" y2="42" stroke="url(#tamgGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <line x1="2" y1="50" x2="42" y2="50" stroke="url(#tamgGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <path d="M 10 54 L 10 22 L 26 38 L 42 22 L 42 54 Z" fill="url(#tamgGrad)" />
                <ellipse cx="54" cy="34" rx="4" ry="3.5" fill="url(#tamgGrad)" />
                <line x1="58" y1="34" x2="58" y2="22" stroke="url(#tamgGrad)" strokeWidth="1.8" strokeLinecap="round" />
              </g>
              {/* 字标：T A M G 用亮色强调，其余用清晰可读的浅灰 */}
              <text x="100" y="72" style={{ fontFamily: "system-ui, sans-serif", fontSize: "38px", fontWeight: 400 }}>
                <tspan fill="url(#tamgGrad)" fontWeight="800">T</tspan>
                <tspan fill="#cbd5e1">he</tspan>
                <tspan fill="url(#tamgGrad)" fontWeight="800">A</tspan>
                <tspan fill="#cbd5e1">I</tspan>
                <tspan fill="url(#tamgGrad)" fontWeight="800">M</tspan>
                <tspan fill="#cbd5e1">usic</tspan>
                <tspan fill="url(#tamgGrad)" fontWeight="800">G</tspan>
                <tspan fill="#cbd5e1">enerator</tspan>
              </text>
            </svg>
          </div>
        </section>

        {/* 2) 独立 Icon（多尺寸，主站背景） */}
        <section>
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
            独立 Icon（App / Favicon）
          </h2>
          <div
            className="flex flex-wrap items-center justify-center gap-10 rounded-2xl border border-slate-800 p-12"
            style={{ background: SLATE_950 }}
          >
            {/* 独立 Icon：字母 M + 五线谱 + 四分音符，AI 音乐行业辨识 */}
            <svg viewBox="0 0 64 64" className="h-32 w-32 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="iconBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#e879f9" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="14" fill="url(#iconBg)" />
              <g transform="translate(6, 6)">
                <line x1="4" y1="10" x2="52" y2="10" stroke="url(#iconGrad)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="18" x2="52" y2="18" stroke="url(#iconGrad)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="26" x2="52" y2="26" stroke="url(#iconGrad)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="34" x2="52" y2="34" stroke="url(#iconGrad)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="42" x2="52" y2="42" stroke="url(#iconGrad)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <path d="M 12 50 L 12 16 L 32 34 L 52 16 L 52 50 Z" fill="url(#iconGrad)" />
                <ellipse cx="56" cy="26" rx="4" ry="3.5" fill="url(#iconGrad)" />
                <line x1="60" y1="26" x2="60" y2="14" stroke="url(#iconGrad)" strokeWidth="1.6" strokeLinecap="round" />
              </g>
            </svg>
            <svg viewBox="0 0 64 64" className="h-20 w-20 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="iconBg2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="iconGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#e879f9" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="14" fill="url(#iconBg2)" />
              <g transform="translate(6, 6)">
                <line x1="4" y1="10" x2="52" y2="10" stroke="url(#iconGrad2)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="18" x2="52" y2="18" stroke="url(#iconGrad2)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="26" x2="52" y2="26" stroke="url(#iconGrad2)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="34" x2="52" y2="34" stroke="url(#iconGrad2)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="42" x2="52" y2="42" stroke="url(#iconGrad2)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <path d="M 12 50 L 12 16 L 32 34 L 52 16 L 52 50 Z" fill="url(#iconGrad2)" />
                <ellipse cx="56" cy="26" rx="4" ry="3.5" fill="url(#iconGrad2)" />
                <line x1="60" y1="26" x2="60" y2="14" stroke="url(#iconGrad2)" strokeWidth="1.6" strokeLinecap="round" />
              </g>
            </svg>
            <svg viewBox="0 0 64 64" className="h-12 w-12 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="iconBg3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="iconGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#e879f9" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="14" fill="url(#iconBg3)" />
              <g transform="translate(6, 6)">
                <line x1="4" y1="10" x2="52" y2="10" stroke="url(#iconGrad3)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="18" x2="52" y2="18" stroke="url(#iconGrad3)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="26" x2="52" y2="26" stroke="url(#iconGrad3)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="34" x2="52" y2="34" stroke="url(#iconGrad3)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <line x1="4" y1="42" x2="52" y2="42" stroke="url(#iconGrad3)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                <path d="M 12 50 L 12 16 L 32 34 L 52 16 L 52 50 Z" fill="url(#iconGrad3)" />
                <ellipse cx="56" cy="26" rx="4" ry="3.5" fill="url(#iconGrad3)" />
                <line x1="60" y1="26" x2="60" y2="14" stroke="url(#iconGrad3)" strokeWidth="1.6" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </section>
      </div>
    </main>
  );
}
