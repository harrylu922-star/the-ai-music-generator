import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { SiteHeader } from "../../components/SiteHeader";
import { ResponsiveHeroImage } from "../../components/ResponsiveHeroImage";
import { SiteFooter } from "../../components/SiteFooter";
import { LANDING_PAGES } from "../../components/LandingNav";
import { DualLayerWrapper } from "../../components/DualLayerWrapper";
import { AiMusicGeneratorWorkspace } from "./AiMusicGeneratorWorkspace";

const PAGE_URL = "/ai-music-generator";
const OG_IMAGE = "/images/home/hero-card-ai-music-generator.jpg";

export const metadata: Metadata = {
  title: "Free AI Music Generator | Royalty-Free Music from Text",
  description: "Generate unique, royalty-free music from text in seconds. Free AI music generator for creators, filmmakers & YouTubers. Describe genre, mood & style—get full tracks. Try free.",
  keywords: ["AI music generator", "free AI song generator", "text to music", "royalty-free music", "AI music creator", "generate music from text"],
  openGraph: {
    title: "Free AI Music Generator | Royalty-Free Music from Text",
    description: "Generate royalty-free music from text in seconds. For creators, filmmakers & YouTubers. Full tracks—try free.",
    url: PAGE_URL,
    siteName: "The AI Music Generator",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "AI Music Generator - Create royalty-free music from text" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Music Generator | Royalty-Free Music from Text",
    description: "Royalty-free music from text in seconds. For creators & YouTubers. Full tracks—try free.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: PAGE_URL },
};

export default function AiMusicGeneratorPage() {
  return (
    <DualLayerWrapper cookieKey="ai_music_generator_app_mode">
      <main className="flex min-h-screen flex-col text-slate-50">
        <SiteHeader hideLandingLinks mobileNavKind="tools" currentPath={PAGE_URL} />

        {/* 生成器区域：移动端仅显示操作区（左侧栏并入顶部汉堡菜单），大屏为侧栏+操作区 */}
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] min-h-0 overflow-hidden shrink-0">
          {/* Sidebar: 仅大屏显示，移动端由顶部汉堡菜单展示 Tools */}
          <nav className="hidden lg:flex w-52 xl:w-56 shrink-0 flex-col overflow-hidden rounded-r-2xl bg-slate-800/40">
            <div className="p-2.5 min-w-0">
              <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">Tools</p>
              <ul className="flex flex-col gap-0.5 min-w-0">
                {LANDING_PAGES.map(({ href, label, available }) => {
                  const isActive = href === "/ai-music-generator";
                  return (
                    <li key={href} className="min-w-0">
                      {available ? (
                        <Link
                          href={href}
                          className={`block rounded-xl px-3 py-2 text-sm transition truncate max-w-full ${
                            isActive ? "bg-violet-500/20 text-violet-200 font-medium" : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                          }`}
                        >
                          {label}
                          {!available && <span className="ml-1 text-slate-500">(Soon)</span>}
                        </Link>
                      ) : (
                        <span className="block rounded-xl px-3 py-2 text-sm text-slate-500 cursor-not-allowed truncate max-w-full">
                          {label} (Soon)
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Generator workspace (client): 占满剩余高度，一屏内完成 */}
          <div className="flex flex-1 min-w-0 min-h-0">
            <Suspense fallback={<div className="flex flex-1 items-center justify-center bg-slate-900/50 text-slate-400 text-sm">Loading…</div>}>
              <AiMusicGeneratorWorkspace />
            </Suspense>
          </div>
        </div>

        {/* SEO content: 同色系区块、圆角、无硬线 */}
        <div className="bg-slate-950/80 rounded-t-3xl overflow-hidden">
          <div className="mx-auto max-w-3xl px-4 py-12 text-slate-200">
            <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
              <h2 className="mb-6 text-2xl font-semibold text-slate-100">How AI Music Generator Works</h2>
              <p className="mb-6 leading-relaxed">
                Experience the future of music creation with our easy 3-step process.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 rounded-2xl bg-slate-800/40 p-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                    <Image src="/images/home/how-1-describe.webp" alt="Describe your music idea" fill className="object-cover" sizes="96px" loading="lazy" unoptimized />
                    <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">1</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-100 mb-1">Describe your idea</h3>
                    <p className="text-sm leading-relaxed">Tell us what kind of music you want, including genre, mood, and any special requirements.</p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-2xl bg-slate-800/40 p-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                    <Image src="/images/home/how-2-ai-compose.webp" alt="AI composes your track" fill className="object-cover" sizes="96px" loading="lazy" unoptimized />
                    <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">2</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-100 mb-1">AI generates music</h3>
                    <p className="text-sm leading-relaxed">Our advanced AI instantly creates a unique track based on your description.</p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-2xl bg-slate-800/40 p-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                    <Image src="/images/home/how-3-export.webp" alt="Download and use your music" fill className="object-cover" sizes="96px" loading="lazy" unoptimized />
                    <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">3</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-100 mb-1">Download & use</h3>
                    <p className="text-sm leading-relaxed">Preview, download, and use your new music for any project—royalty free.</p>
                  </div>
                </div>
              </div>
              <Link href="/ai-music-generator" className="mt-6 inline-flex rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition">
                Create Music Now
              </Link>
            </section>

            <section className="mb-12 rounded-2xl bg-slate-800/30 p-6 md:p-8">
              <div className="relative mb-6 aspect-[2/1] max-w-2xl overflow-hidden rounded-xl">
                <ResponsiveHeroImage
                  src="/images/home/hero-card-ai-music-generator.webp"
                  src640="/images/home/hero-card-ai-music-generator-640.webp"
                  alt="AI Music Generator - Create royalty-free music from text"
                  sizes="(max-width: 768px) 100vw, 672px"
                  priority
                />
              </div>
              <h2 className="mb-6 text-2xl font-semibold text-slate-100">Explore our AI Music Generator</h2>
              <p className="mb-6 leading-relaxed text-slate-400">Crafting meaningful music for you, not just industrial noise.</p>
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-900/50 p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Create Unique AI Music From Text</h3>
                  <p className="text-sm leading-relaxed">We support simple descriptions to generate the songs you want; we also support complex song descriptions + your own exclusive lyrics to generate the AI music you want.</p>
                  <Link href="/ai-music-generator" className="mt-2 inline-block text-sm font-medium text-violet-200 underline underline-offset-2 hover:text-violet-100">Try AI Music Generator Now →</Link>
                </div>
                <div className="rounded-2xl bg-slate-900/50 p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Music in Seconds</h3>
                  <p className="text-sm leading-relaxed">Traditional music creation can be tedious and time-consuming. Our AI music generator lets you hear your AI-created songs in seconds.</p>
                  <Link href="/ai-music-generator" className="mt-2 inline-block text-sm font-medium text-violet-200 underline underline-offset-2 hover:text-violet-100">Try AI Music Generator Now →</Link>
                </div>
                <div className="rounded-2xl bg-slate-900/50 p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Create Music With Your Lyrics</h3>
                  <p className="text-sm leading-relaxed">We support male and female voices, and the vocals are smooth and natural. Create songs with your own lyrics using our <Link href="/ai-lyrics-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI lyrics generator</Link> first, then turn them into full tracks here.</p>
                  <Link href="/ai-music-generator/own-lyrics" className="mt-2 inline-block text-sm font-medium text-violet-200 underline underline-offset-2 hover:text-violet-100">Own Lyrics →</Link>
                </div>
                <div className="rounded-2xl bg-slate-900/50 p-4">
                  <h3 className="font-semibold text-slate-100 mb-2">Royalty-Free Music</h3>
                  <p className="text-sm leading-relaxed">No need to pay huge royalties. With our AI music generator, the copyright of each song you generate can belong to you under our terms.</p>
                  <Link href="/ai-music-generator" className="mt-2 inline-block text-sm font-medium text-violet-200 underline underline-offset-2 hover:text-violet-100">Try AI Music Generator Now →</Link>
                </div>
              </div>
            </section>

            <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8" id="faq">
              <h2 className="mb-6 text-2xl font-semibold text-slate-100">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-800/40 p-4 md:p-5">
                  <h3 className="mb-2 text-base font-semibold text-slate-100">Is there a free AI song generator?</h3>
                  <p className="text-sm leading-relaxed text-slate-200">Yes, you can try our AI Music Generator for free. We offer a free tier so you can experiment with generating songs based on your prompts and explore different styles. It&apos;s a great way to test the quality and features before deciding on a paid plan for more extensive use.</p>
                </div>
                <div className="rounded-2xl bg-slate-800/40 p-4 md:p-5">
                  <h3 className="mb-2 text-base font-semibold text-slate-100">Can I use the generated music commercially?</h3>
                  <p className="text-sm leading-relaxed text-slate-200">Music generated on our platform can be royalty-free and used for both personal and commercial purposes when you have the appropriate license or membership. Check our pricing and terms for commercial use.</p>
                </div>
                <div className="rounded-2xl bg-slate-800/40 p-4 md:p-5">
                  <h3 className="mb-2 text-base font-semibold text-slate-100">Which AI generates song from text?</h3>
                  <p className="text-sm leading-relaxed text-slate-200">Our AI Music Generator is designed to generate music based on text prompts. You describe genre, mood, tempo, and voice in words; the AI interprets your description and produces a complete song structure. Our <Link href="/ai-lyrics-generator" className="text-violet-400 hover:underline">AI Lyrics Generator</Link> creates lyrics from text, while the Music Generator turns textual ideas about sound into full tracks.</p>
                </div>
                <div className="rounded-2xl bg-slate-800/40 p-4 md:p-5">
                  <h3 className="mb-2 text-base font-semibold text-slate-100">How long does it take to generate music?</h3>
                  <p className="text-sm leading-relaxed text-slate-200">Most songs are generated within 1–5 minutes, depending on the complexity and length requested. You can start with short clips to iterate quickly.</p>
                </div>
                <div className="rounded-2xl bg-slate-800/40 p-4 md:p-5">
                  <h3 className="mb-2 text-base font-semibold text-slate-100">How to generate a song with AI?</h3>
                  <p className="text-sm leading-relaxed text-slate-200">Generating a song with AI is simple. Enter text prompts that describe the content, genre, mood, tempo, and voice of the music. The AI Music Generator processes your input and creates a unique song based on your specifications. You can also add your own lyrics via the Own Lyrics flow for full vocal tracks.</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-slate-800/30 p-8 text-center">
              <h2 className="mb-2 text-xl font-semibold text-slate-100">Ready to Create Your Own Unique Music?</h2>
              <p className="mb-4 text-sm text-slate-400">Join thousands of creators who use our AI to generate music for their projects.</p>
              <Link href="/ai-music-generator" className="inline-flex rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white hover:bg-violet-500 transition">
                Create Music Now
              </Link>
            </section>
          </div>
        </div>

        <SiteFooter />
      </main>
    </DualLayerWrapper>
  );
}
