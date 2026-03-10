import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Coming Soon | The AI Music Generator",
  description: "New feature coming soon. The AI Music Generator is building more tools for creators—check back for updates.",
  robots: { index: false, follow: true },
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl border border-violet-500/30 bg-violet-500/10 text-violet-400 mb-8 shadow-[0_0_60px_rgba(139,92,246,0.2)]">
            <Sparkles className="w-10 h-10" strokeWidth={1.5} aria-hidden />
          </div>
          <p className="text-sm font-medium uppercase tracking-wider text-violet-400 mb-3">
            Coming Soon
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl mb-4">
            Stay Tuned
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            We're working hard to bring you this feature. Stay tuned—something great is on the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Back to Home
            </Link>
            <Link
              href="/ai-music-generator"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800/60 px-6 py-3 text-sm font-medium text-slate-200 hover:border-violet-500/50 hover:text-violet-200 transition"
            >
              Try AI Music Generator
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800/60 px-6 py-3 text-sm font-medium text-slate-200 hover:border-violet-500/50 hover:text-violet-200 transition"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-10 text-sm text-slate-500">
            <span className="text-violet-400 font-medium">The AI Music Generator</span>
            {" — "}
            Create royalty-free music with AI.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
