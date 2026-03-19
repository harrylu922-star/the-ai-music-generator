import type { Metadata } from "next";
import Link from "@/components/Link";
import { Suspense } from "react";
import { SiteHeader } from "../../components/SiteHeader";
import { ResponsiveHeroImage } from "../../components/ResponsiveHeroImage";
import { SiteFooter } from "../../components/SiteFooter";
import { LANDING_PAGES } from "../../components/LandingNav";
import { DualLayerWrapper } from "../../components/DualLayerWrapper";
import { AiMusicGeneratorWorkspace } from "./AiMusicGeneratorWorkspace";
import { getCountryMusicGeneratorJsonLd } from "./json-ld";
import { getServerSiteConfig, getSubPageMeta } from "../../lib/site-config";

const PAGE_URL = "/ai-country-music-generator";
const OG_IMAGE = "/images/home/hero-card-ai-music-generator.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getServerSiteConfig();
  const { title, description } = getSubPageMeta(config, PAGE_URL, {
    title: "Best AI Country Music Generator: Authentic Americana & Southern Sound",
    description: "Create authentic country music with AI. V6 model delivers warm, storytelling tracks—ballads, shuffles, Americana. Royalty-free for YouTube and Spotify.",
  });
  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: PAGE_URL,
      siteName: config.siteName,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "AI Country Music Generator" }],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    alternates: { canonical: PAGE_URL },
  };
}

export default function AiCountryMusicGeneratorPage() {
  const jsonLd = getCountryMusicGeneratorJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DualLayerWrapper cookieKey="ai_country_music_generator_app_mode">
      <main className="flex min-h-screen flex-col text-slate-50">
        <SiteHeader hideLandingLinks mobileNavKind="tools" currentPath={PAGE_URL} />

        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] min-h-0 overflow-hidden shrink-0">
          <nav className="hidden lg:flex w-52 xl:w-56 shrink-0 flex-col overflow-hidden rounded-r-2xl bg-slate-800/40">
            <div className="p-2.5 min-w-0">
              <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">Tools</p>
              <ul className="flex flex-col gap-0.5 min-w-0">
                {LANDING_PAGES.map(({ href, label, available }) => {
                  const isActive = href === PAGE_URL;
                  return (
                    <li key={href} className="min-w-0">
                      {available ? (
                        <Link href={href} className={`block rounded-xl px-3 py-2 text-sm transition truncate max-w-full ${isActive ? "bg-violet-500/20 text-violet-200 font-medium" : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"}`}>
                          {label}
                          {!available && <span className="ml-1 text-slate-500">(Soon)</span>}
                        </Link>
                      ) : (
                        <span className="block rounded-xl px-3 py-2 text-sm text-slate-500 cursor-not-allowed truncate max-w-full">{label} (Soon)</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div className="flex flex-1 min-w-0 min-h-0">
            <Suspense fallback={<div className="flex flex-1 items-center justify-center bg-slate-900/50 text-slate-400 text-sm">Loading…</div>}>
              <AiMusicGeneratorWorkspace />
            </Suspense>
          </div>
        </div>

        <div className="bg-slate-950/80 rounded-t-3xl overflow-hidden">
          <div className="mx-auto max-w-3xl px-4 py-12 text-slate-200">

            {/* 1 — What the generator does */}
            <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
              <h2 className="mb-4 text-2xl md:text-3xl font-semibold text-slate-100 tracking-tight">Best AI Country Music Generator: Authentic Americana & Southern Sound</h2>
              <div className="relative mb-6 aspect-[2/1] max-w-2xl overflow-hidden rounded-xl">
                <ResponsiveHeroImage src="/images/ai-country-music-generator/hero-country-music-generator.png" src640="/images/ai-country-music-generator/hero-country-music-generator.png" alt="AI Country Music Generator — generate authentic country tracks from text" sizes="(max-width: 768px) 100vw, 672px" priority />
              </div>
              <p className="mb-4 leading-relaxed text-slate-300">
                Describe your idea in plain text—tempo, mood, instruments—and get a full, royalty-free country track in minutes. The generator covers the full range: slow ballads, upbeat shuffles, Americana folk, bluegrass, and honky-tonk. No musical background required.
              </p>
              <h3 className="mb-2 text-lg font-semibold text-slate-100">Why the V6 Model Matters for Country</h3>
              <p className="mb-6 leading-relaxed text-slate-300">
                Authentic country is built on <strong className="text-slate-100">micro-timing</strong>—the slight swing of a kick drum, the human-feel of pedal steel bends. Our v6 model captures this nuance, delivering warm, storytelling arrangements rather than synthetic loops. The result: tracks that sit naturally alongside professional releases on <strong className="text-slate-100">YouTube</strong> or <strong className="text-slate-100">Spotify</strong>.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/ai-music-generator" className="inline-flex rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition">Create Country Track</Link>
                <Link href="/ai-lyrics-generator" className="inline-flex rounded-full border border-slate-600 px-6 py-2.5 text-sm font-medium text-slate-200 hover:border-violet-400 hover:text-violet-200 transition">Write Country Lyrics First →</Link>
              </div>
            </section>

            {/* 2 — Style guide */}
            <section className="mb-12 rounded-2xl bg-slate-800/30 p-6 md:p-8">
              <h2 className="mb-3 text-2xl font-semibold text-slate-100">Country Music Style Guide: Genre, Mood & Ambience</h2>
              <p className="mb-6 leading-relaxed text-slate-300">
                Country music is not one sound. Below are the four main styles and the exact <strong className="text-slate-100">Genre</strong>, <strong className="text-slate-100">Mood</strong>, and <strong className="text-slate-100">Ambience</strong> tags to use in the generator for each. Combine them with Instrument tags for tighter control.
              </p>
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-900/60 p-4 md:p-5">
                  <h3 className="text-base font-semibold text-slate-100 mb-1">Ballads & Storytelling</h3>
                  <p className="text-sm text-slate-300 mb-2">Slow, narrative songs with open-road or heartfelt themes. Best for background music, short films, and lyric videos.</p>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Genre: Country, Americana</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Mood: Warm, Nostalgic, Sad</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Ambience: Warm, Minimal</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-400">Instrument: Acoustic, Pedal Steel, Piano</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-900/60 p-4 md:p-5">
                  <h3 className="text-base font-semibold text-slate-100 mb-1">Upbeat Shuffle & Honky-Tonk</h3>
                  <p className="text-sm text-slate-300 mb-2">Twangy, danceable rhythms that energise reels, ads, and party playlists.</p>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Genre: Country, Southern</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Mood: Joyous, Inspiring</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Ambience: Live, Studio</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-400">Instrument: Telecaster, Pedal Steel, Piano</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-900/60 p-4 md:p-5">
                  <h3 className="text-base font-semibold text-slate-100 mb-1">Americana & Folk</h3>
                  <p className="text-sm text-slate-300 mb-2">Fingerpicked, intimate campfire sound. Works well for podcasts, documentary, and personal vlogs.</p>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Genre: Americana, Folk</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Mood: Gentle, Soulful, Romantic</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Ambience: Minimal, Warm</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-400">Instrument: Acoustic, Guitar, Strings</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-900/60 p-4 md:p-5">
                  <h3 className="text-base font-semibold text-slate-100 mb-1">Bluegrass & Outlaw</h3>
                  <p className="text-sm text-slate-300 mb-2">Fast and bright (bluegrass) or raw and gritty (outlaw). Great for action content, trailers, or edgy brand spots.</p>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Genre: Bluegrass, Outlaw</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Mood: Joyous, Inspiring</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">Ambience: Live, Epic</span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-400">Instrument: Guitar, Telecaster, Drums</span>
                  </div>
                </div>
              </div>
              <div className="relative mt-8 aspect-[2/1] max-w-2xl overflow-hidden rounded-xl">
                <ResponsiveHeroImage src="/images/ai-country-music-generator/country-style-guide.png" src640="/images/ai-country-music-generator/country-style-guide.png" alt="Country music style and prompt idea starters" sizes="(max-width: 768px) 100vw, 672px" />
              </div>
            </section>

            {/* 3 — Use cases + prompt examples */}
            <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-semibold text-slate-100">Who Uses AI Country Music & Sample Prompts</h2>
              <div className="relative mb-6 aspect-[2/1] max-w-2xl overflow-hidden rounded-xl">
                <ResponsiveHeroImage src="/images/ai-country-music-generator/country-creators-use-cases.png" src640="/images/ai-country-music-generator/country-creators-use-cases.png" alt="Creators, filmmakers and podcasters using AI country music" sizes="(max-width: 768px) 100vw, 672px" />
              </div>
              <p className="mb-5 leading-relaxed text-slate-300">
                From YouTube creators wanting a royalty-free soundtrack to indie filmmakers scoring a road-trip scene, AI-generated country music fits a wide range of projects. Use the <Link href="/ai-music-generator" className="text-violet-300 hover:underline">full AI Music Generator</Link> for longer tracks, or paste your own lyrics into the <strong className="text-slate-100">Own Lyrics</strong> tab above for a personalised song.
              </p>
              <h3 className="mb-3 text-base font-semibold text-slate-100">Ready-to-Use Prompts</h3>
              <div className="space-y-3">
                {[
                  { label: "Slow ballad", prompt: "Slow country ballad, acoustic guitar and soft piano, open road, 70 BPM, warm and nostalgic." },
                  { label: "Upbeat shuffle", prompt: "Country shuffle, pedal steel and telecaster, upbeat and twangy, 120 BPM." },
                  { label: "Americana folk", prompt: "Americana folk, fingerpicked guitar, minimal drums, campfire feel, intimate." },
                  { label: "Dust road story", prompt: "Dust road ballad, warm vocals, open-road storytelling, acoustic and strings." },
                  { label: "Southern epic", prompt: "Southern country, piano and strings, emotional build, 85 BPM." },
                ].map(({ label, prompt }, i) => (
                  <div key={i} className="rounded-2xl bg-slate-800/60 p-4 flex gap-3 items-start">
                    <span className="mt-0.5 shrink-0 rounded-full bg-violet-500/20 px-2.5 py-0.5 text-[11px] font-medium text-violet-300">{label}</span>
                    <p className="text-sm leading-relaxed text-slate-200">{prompt}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4 — Royalty-free / commercial use */}
            <section className="mb-12 rounded-2xl bg-slate-800/30 p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-semibold text-slate-100">Royalty-Free Country Music for Commercial Use</h2>
              <div className="relative mb-6 aspect-[2/1] max-w-2xl overflow-hidden rounded-xl">
                <ResponsiveHeroImage src="/images/home/copyright-license.webp" src640="/images/home/copyright-license-640.webp" alt="Royalty-free license for AI country music" sizes="(max-width: 768px) 100vw, 672px" />
              </div>
              <p className="mb-4 leading-relaxed text-slate-300">
                Every track you generate is <strong className="text-slate-100">royalty-free</strong> for commercial use under our <Link href="/license" className="text-violet-300 hover:underline">Content License</Link>. Publish on YouTube, Spotify, TikTok, or use in client projects—no extra fees, no copyright claims.
              </p>
              <p className="leading-relaxed text-slate-300">
                Platform-level AI disclosure rules (e.g. <Link href="/resources/youtube-ai-music-labeling-2026" className="text-violet-300 hover:underline">YouTube AI music labeling</Link>) still apply and are your responsibility, but the music itself is cleared for monetization. For songs with your own lyrics, try the <Link href="/ai-lyrics-generator" className="text-violet-300 hover:underline">AI Lyrics Generator</Link> first, then bring them into the Own Lyrics tab above.
              </p>
            </section>

            {/* 5 — FAQ */}
            <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8" id="faq">
              <h2 className="mb-6 text-2xl font-semibold text-slate-100">Frequently Asked Questions</h2>
              <div className="space-y-3">
                <details className="group rounded-2xl bg-slate-800/40 overflow-hidden">
                  <summary className="cursor-pointer list-none p-4 md:p-5 flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold text-slate-100 pr-2">Is there a free AI country music generator?</h3>
                    <span className="shrink-0 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm leading-relaxed text-slate-200 px-4 pb-4 md:px-5 md:pb-5 border-t border-slate-700/50 pt-3">Yes—the generator at the top of this page is free. The <Link href="/ai-music-generator" className="text-violet-400 hover:underline">full AI Music Generator</Link> adds longer tracks, higher export quality, and track history.</p>
                </details>
                <details className="group rounded-2xl bg-slate-800/40 overflow-hidden">
                  <summary className="cursor-pointer list-none p-4 md:p-5 flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold text-slate-100 pr-2">Can I use AI-generated country music commercially?</h3>
                    <span className="shrink-0 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm leading-relaxed text-slate-200 px-4 pb-4 md:px-5 md:pb-5 border-t border-slate-700/50 pt-3">Yes. All tracks are royalty-free for commercial use under our <Link href="/license" className="text-violet-400 hover:underline">Content License</Link>. You can monetize on YouTube and Spotify with no extra fees.</p>
                </details>
                <details className="group rounded-2xl bg-slate-800/40 overflow-hidden">
                  <summary className="cursor-pointer list-none p-4 md:p-5 flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold text-slate-100 pr-2">How do I generate a country song with AI?</h3>
                    <span className="shrink-0 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm leading-relaxed text-slate-200 px-4 pb-4 md:px-5 md:pb-5 border-t border-slate-700/50 pt-3">Type a prompt (e.g. &quot;Slow country ballad, acoustic guitar, 70 BPM&quot;) or hit <strong>Get Inspired</strong> to cycle through presets. Add Genre, Mood, and Instrument tags, then click <strong>Create Country Track</strong>. For a song with your own words, switch to the Own Lyrics tab or use the <Link href="/ai-music-generator" className="text-violet-400 hover:underline">AI Music Generator</Link>.</p>
                </details>
                <details className="group rounded-2xl bg-slate-800/40 overflow-hidden">
                  <summary className="cursor-pointer list-none p-4 md:p-5 flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold text-slate-100 pr-2">What instruments define country music?</h3>
                    <span className="shrink-0 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm leading-relaxed text-slate-200 px-4 pb-4 md:px-5 md:pb-5 border-t border-slate-700/50 pt-3">Pedal steel, acoustic guitar, and telecaster are the signature sounds. Piano and fiddle are common in honky-tonk and bluegrass respectively. Use the <strong>Instrument</strong> tag in the generator to specify any of these and hear the difference immediately.</p>
                </details>
                <details className="group rounded-2xl bg-slate-800/40 overflow-hidden">
                  <summary className="cursor-pointer list-none p-4 md:p-5 flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold text-slate-100 pr-2">Can I add my own lyrics to a country track?</h3>
                    <span className="shrink-0 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm leading-relaxed text-slate-200 px-4 pb-4 md:px-5 md:pb-5 border-t border-slate-700/50 pt-3">Yes. Switch to the <strong>Own Lyrics</strong> tab above, paste your lyrics, set a cover style, then generate. Need lyrics first? The <Link href="/ai-lyrics-generator" className="text-violet-400 hover:underline">AI Lyrics Generator</Link> can write country-style verses and choruses for you.</p>
                </details>
              </div>
            </section>

            {/* 6 — CTA */}
            <section className="rounded-2xl overflow-hidden">
              <div className="relative aspect-[3/1] max-w-full overflow-hidden rounded-t-2xl">
                <ResponsiveHeroImage src="/images/ai-country-music-generator/country-cta-ready-to-create.png" src640="/images/ai-country-music-generator/country-cta-ready-to-create.png" alt="Ready to create AI country music" sizes="(max-width: 768px) 100vw, 768px" />
              </div>
              <div className="bg-slate-800/60 rounded-b-2xl p-8 text-center">
                <h2 className="mb-2 text-xl font-semibold text-slate-100">Ready to Create Country Music with AI?</h2>
                <p className="mb-6 text-sm text-slate-400">Use the generator above for free, or unlock longer tracks and full export options in the AI Music Generator.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/ai-music-generator" className="inline-flex rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white hover:bg-violet-500 transition">Open AI Music Generator</Link>
                  <Link href="/ai-lyrics-generator" className="inline-flex rounded-full border border-slate-600 px-6 py-3 text-base font-medium text-slate-200 hover:border-violet-400 hover:text-violet-200 transition">Write Lyrics First</Link>
                </div>
              </div>
            </section>

          </div>
        </div>

        <SiteFooter />
      </main>
    </DualLayerWrapper>
    </>
  );
}
