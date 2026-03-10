import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Resources | The AI Music Generator",
  description: "Guides, tips, and resources for creating music with AI.",
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-semibold text-slate-100 mb-2">Resources</h1>
        <p className="text-slate-400 mb-10">Guides and tips for getting the most out of our AI music tools.</p>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Articles &amp; Guides</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/resources/who-owns-ai-generated-music" className="block rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-violet-500/50 hover:bg-slate-900/60 transition">
                <span className="font-medium text-slate-100">Who Owns AI Generated Music? The Copyright Boundary</span>
                <span className="mt-2 block text-sm text-slate-400">How human authorship, jurisdiction, and licensing shape ownership in 2026—and how to establish and protect your rights when using AI music tools.</span>
              </Link>
            </li>
            <li>
              <Link href="/resources/ai-music-licensing-2026" className="block rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-violet-500/50 hover:bg-slate-900/60 transition">
                <span className="font-medium text-slate-100">AI Music Licensing in 2026: A Practical Guide for Content Creators</span>
                <span className="mt-2 block text-sm text-slate-400">How to license AI-generated music safely: ownership, license types, platform rules, and a step-by-step workflow for creators using AI music generators.</span>
              </Link>
            </li>
            <li>
              <Link href="/resources/youtube-ai-music-labeling-2026" className="block rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-violet-500/50 hover:bg-slate-900/60 transition">
                <span className="font-medium text-slate-100">YouTube AI Music Labeling 2026: Requirements and Workflow for Creators</span>
                <span className="mt-2 block text-sm text-slate-400">Official YouTube disclosure rules for AI-generated or synthetic music, required metadata, compliant templates, and workflow using The AI Music Generator.</span>
              </Link>
            </li>
            <li>
              <Link href="/resources/monetize-ai-music-2026" className="block rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-violet-500/50 hover:bg-slate-900/60 transition">
                <span className="font-medium text-slate-100">Monetize AI Music 2026: Licensing, Platforms & Creator Workflow</span>
                <span className="mt-2 block text-sm text-slate-400">Actionable steps, templates, and workflows to monetize AI music safely on YouTube, TikTok, and more—commercial rights and platform compliance for creators.</span>
              </Link>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-slate-300">
          <p className="mb-4">Try our tools:</p>
          <ul className="list-disc list-inside space-y-2 text-violet-300">
            <li><Link href="/ai-music-generator" className="hover:underline">AI Music Generator</Link></li>
            <li><Link href="/ai-lyrics-generator" className="hover:underline">AI Lyrics Generator</Link></li>
            <li><Link href="/text-to-music" className="hover:underline">Text to Music</Link></li>
          </ul>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
