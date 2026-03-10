import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 mb-10">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/ai-music-generator" className="hover:text-violet-300">AI Music Generator</Link></li>
              <li><Link href="/ai-lyrics-generator" className="hover:text-violet-300">AI Lyrics Generator</Link></li>
              <li><Link href="/ai-rap-lyrics-generator" className="hover:text-violet-300">Rap Lyrics Generator</Link></li>
              <li><Link href="/ai-music-tools" className="hover:text-violet-300">AI Music Tools</Link></li>
              <li><Link href="/for-youtube-creators" className="hover:text-violet-300">For YouTube Creators</Link></li>
              <li><Link href="/pricing" className="hover:text-violet-300">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/privacy" className="hover:text-violet-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-violet-300">Terms of Service</Link></li>
              <li><Link href="/license" className="hover:text-violet-300">Content License</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">About Us</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/coming-soon" className="hover:text-violet-300">Affiliate Marketing</Link></li>
              <li><Link href="/coming-soon" className="hover:text-violet-300">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">Language</h3>
            <button className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 hover:border-violet-500/50 hover:text-violet-200 w-full text-left">English ▾</button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800 text-sm text-slate-400">
          <span>© {new Date().getFullYear()} TheAIMusicGenerator.com. All rights reserved.</span>
          <Link href="/" className="flex items-center gap-2 text-slate-100 font-medium">
            <span className="text-violet-400">T</span>he<span className="text-violet-400">A</span>I<span className="text-violet-400">M</span>usic<span className="text-violet-400">G</span>enerator
          </Link>
        </div>
      </div>
    </footer>
  );
}
