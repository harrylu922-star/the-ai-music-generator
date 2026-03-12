import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { YoutubeCreatorsLock } from "./YoutubeCreatorsLock";
import { getYoutubeCreatorsFaqJsonLd, YOUTUBE_CREATORS_FAQ } from "./youtube-faq-ld";

export const metadata: Metadata = {
  title: { absolute: "AI Music for YouTube | Royalty-Free Music for Videos" },
  description:
    "Create royalty-free AI music for YouTube videos, vlogs & Shorts in seconds. No copyright strikes. Custom background music from text—compliant disclosure guides included.",
};

export default function ForYoutubeCreatorsPage() {
  const faqLd = getYoutubeCreatorsFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <SiteHeader />

        {/* Hero — 第一屏高度，登录态下仅此屏可见 */}
        <section className="min-h-[calc(100vh-5rem)] border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col justify-center">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl">
              AI Music for YouTube Creators
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Create royalty-free background music for your videos in seconds. No copyright strikes, no stock-library hunting—just describe what you need and get a track that fits your channel.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/ai-music-generator"
                className="inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.5)] hover:bg-violet-500 transition"
              >
                Create Music for My Videos
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800/60 px-6 py-3 text-base font-medium text-slate-200 hover:border-violet-500/50 hover:text-violet-200 transition"
              >
                View Pricing
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-300">
                <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400">License</span>
                100% Royalty-Free
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-300">
                <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400">Use</span>
                YouTube & Shorts
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-300">
                <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400">Speed</span>
                Ready in seconds
              </span>
            </div>
          </div>
        </section>

        <YoutubeCreatorsLock>
        {/* Use cases for YouTube */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-semibold text-slate-100 mb-2 text-center">
              Music for every kind of YouTube video
            </h2>
            <p className="text-slate-400 text-center mb-10 max-w-2xl mx-auto">
              From vlogs to Shorts, intros to tutorials—get a custom sound without digging through stock libraries.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
              {[
                { title: "Vlogs & talking-head videos", copy: "Warm, friendly background music that sits behind your voice. Describe the mood and length; the AI generates a track that won’t compete with your narration.", href: "/ai-music-generator" },
                { title: "YouTube Shorts & Reels", copy: "Punchy 15–30 second clips for Shorts. Generate multiple variations and pick the one that keeps viewers watching.", href: "/ai-music-generator" },
                { title: "Intros and outros", copy: "Consistent intro/outro music for your channel. One prompt, one style—use the same vibe across episodes.", href: "/ai-music-generator" },
                { title: "Tutorials & how-tos", copy: "Calm, focused instrumentals that don’t distract. Perfect for coding, cooking, or educational content.", href: "/ai-music-tools" },
                { title: "Gaming & stream background", copy: "Energy-matched background tracks for streams and gaming highlights. Describe the vibe and get a unique track.", href: "/ai-music-generator" },
                { title: "Documentaries & storytelling", copy: "Cinematic or emotional beds for longer-form content. Build tension or emotion with AI-generated instrumentals.", href: "/ai-music-generator" },
              ].map((card) => (
                <article key={card.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <h3 className="font-semibold text-slate-100 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">{card.copy}</p>
                  <Link href={card.href} className="text-sm font-medium text-violet-200 underline underline-offset-2 hover:text-violet-100">
                    Create music →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-semibold text-slate-100 mb-8 text-center">
              How it works for YouTube creators
            </h2>
            <div className="grid gap-6 sm:grid-cols-3 text-left">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 font-semibold text-lg mb-3">1</span>
                <h3 className="font-semibold text-slate-100 mb-1">Describe your track</h3>
                <p className="text-sm text-slate-400">Tell the AI what you need: e.g. “upbeat vlog background, 2 minutes” or “calm piano for a tutorial.” No music theory required.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 font-semibold text-lg mb-3">2</span>
                <h3 className="font-semibold text-slate-100 mb-1">Generate in seconds</h3>
                <p className="text-sm text-slate-400">Our AI music generator creates a unique track. Preview it, tweak the prompt if needed, or generate another variation.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 font-semibold text-lg mb-3">3</span>
                <h3 className="font-semibold text-slate-100 mb-1">Download and use</h3>
                <p className="text-sm text-slate-400">Export the audio and drop it into your editor. Use it in YouTube videos, Shorts, or any platform—royalty-free.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why creators choose us */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="text-2xl font-semibold text-slate-100 mb-6 text-center">
              Why YouTube creators use our AI music generator
            </h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <span className="text-violet-400 shrink-0" aria-hidden>✓</span>
                <div>
                  <strong className="text-slate-100">Royalty-free, YouTube-safe.</strong> Use tracks in monetized videos without copyright claims from our music. Clear license for online use.
                </div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <span className="text-violet-400 shrink-0" aria-hidden>✓</span>
                <div>
                  <strong className="text-slate-100">Custom, not generic.</strong> Every track is generated from your description, so your channel doesn’t sound like everyone else’s stock playlist.
                </div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <span className="text-violet-400 shrink-0" aria-hidden>✓</span>
                <div>
                  <strong className="text-slate-100">No subscription libraries.</strong> Create what you need when you need it—no monthly catalog browsing or “this track was used 10k times” feeling.
                </div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <span className="text-violet-400 shrink-0" aria-hidden>✓</span>
                <div>
                  <strong className="text-slate-100">Lyrics and full songs too.</strong> Need a theme song or vocal track? Use our <Link href="/ai-lyrics-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI lyrics generator</Link> and then turn it into music with the same tool.
                </div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <span className="text-violet-400 shrink-0" aria-hidden>✓</span>
                <div>
                  <strong className="text-slate-100">Compliant disclosure.</strong> YouTube requires labeling for AI-generated music in 2026. Our <Link href="/resources/youtube-ai-music-labeling-2026" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">YouTube AI Music Labeling 2026</Link> guide covers requirements, templates, and workflow.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-slate-800 bg-slate-950" id="faq">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="text-2xl font-semibold text-slate-100 mb-8 text-center">
              YouTube creators FAQ
            </h2>
            <div className="space-y-3">
              {YOUTUBE_CREATORS_FAQ.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
                >
                  <summary className="cursor-pointer text-base font-semibold text-slate-50">
                    {item.question}
                  </summary>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-4xl px-4 py-14 text-center">
            <h2 className="text-2xl font-semibold text-slate-100 mb-2">
              Ready to add custom music to your YouTube channel?
            </h2>
            <p className="text-slate-400 mb-6">
              Create royalty-free tracks in seconds. No copyright strikes, no generic stock music.
            </p>
            <p className="text-slate-400 text-sm mb-4">
              For a full monetization workflow (licensing, platforms, revenue), see our{" "}
              <Link href="/resources/monetize-ai-music-2026" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">
                Monetize AI Music 2026
              </Link>{" "}
              guide.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/ai-music-generator"
                className="inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.5)] hover:bg-violet-500 transition"
              >
                Create Music for My Videos
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-base font-medium text-slate-200 hover:border-violet-500/50 hover:text-violet-200 transition"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
        </YoutubeCreatorsLock>
      </main>
    </>
  );
}
