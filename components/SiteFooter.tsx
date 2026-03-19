"use client";

import Link from "@/components/Link";
import { useSiteConfig } from "./SiteConfigProvider";

export function SiteFooter() {
  const config = useSiteConfig();
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-slate-100 mb-3" role="presentation">Features</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/ai-music-generator" className="underline underline-offset-2 hover:text-violet-200">AI Music Generator</Link></li>
              <li><Link href="/ai-lyrics-generator" className="underline underline-offset-2 hover:text-violet-200">AI Lyrics Generator</Link></li>
              <li><Link href="/ai-lyrics-to-music-generator" className="underline underline-offset-2 hover:text-violet-200">Lyrics to Music</Link></li>
              <li><Link href="/ai-music-tools" className="underline underline-offset-2 hover:text-violet-200">AI Music Tools</Link></li>
              <li><Link href="/text-to-music" className="underline underline-offset-2 hover:text-violet-200">Text to Music</Link></li>
              <li><Link href="/for-youtube-creators" className="underline underline-offset-2 hover:text-violet-200">For YouTube Creators</Link></li>
              <li><Link href="/ai-rap-lyrics-generator" className="underline underline-offset-2 hover:text-violet-200">Rap Lyrics Generator</Link></li>
              <li><Link href="/free-ai-lofi-generator" className="underline underline-offset-2 hover:text-violet-200">AI Lofi Generator</Link></li>
              <li><Link href="/ai-music-video-generator" className="underline underline-offset-2 hover:text-violet-200">AI Music Video Generator</Link></li>
              <li><Link href="/pricing" className="underline underline-offset-2 hover:text-violet-200">Pricing</Link></li>
              <li><Link href="/ai-country-music-generator" className="underline underline-offset-2 hover:text-violet-200">AI Country Music Generator</Link></li>
              <li><Link href="/ai-blues-music-generator" className="underline underline-offset-2 hover:text-violet-200">AI Blues Music Generator</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100 mb-3" role="presentation">Legal</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/privacy" className="underline underline-offset-2 hover:text-violet-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="underline underline-offset-2 hover:text-violet-200">Terms of Service</Link></li>
              <li><Link href="/license" className="underline underline-offset-2 hover:text-violet-200">Content License</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100 mb-3" role="presentation">About Us</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/coming-soon" className="underline underline-offset-2 hover:text-violet-200">Affiliate Marketing</Link></li>
              <li><Link href="/coming-soon" className="underline underline-offset-2 hover:text-violet-200">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100 mb-3" role="presentation">Language</p>
            <button className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 hover:border-violet-500/50 hover:text-violet-200 w-full text-left">English ▾</button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800 text-sm text-slate-400">
          <span>© {new Date().getFullYear()} {config.copyrightName}. All rights reserved.</span>
          <Link href="/" className="flex items-center gap-2 text-slate-100 font-medium">
            {config.shortName === "The AI Music Generator" ? (
              <>
                <span className="text-violet-400">T</span>he<span className="text-violet-400">A</span>I<span className="text-violet-400">M</span>usic<span className="text-violet-400">G</span>enerator
              </>
            ) : (
              config.shortName
            )}
          </Link>
        </div>
      </div>
    </footer>
  );
}
