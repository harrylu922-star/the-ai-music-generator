import type { Metadata } from "next";
import Link from "@/components/Link";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { ResponsiveHeroImage } from "../../components/ResponsiveHeroImage";
import { LANDING_PAGES } from "../../components/LandingNav";
import { DualLayerWrapper } from "../../components/DualLayerWrapper";
import { LyricsToMusicGenerator } from "./LyricsToMusicGenerator";

const PAGE_URL = "/ai-lyrics-to-music-generator";
const OG_IMAGE = "/images/home/hero-card-ai-music-generator.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const { getServerSiteConfig, getSubPageMeta } = await import("../../lib/site-config");
  const config = await getServerSiteConfig();
  const { title, description } = getSubPageMeta(config, PAGE_URL, {
    title: "Free AI Music from Lyrics | Turn Words into Songs (2026)",
    description: "Turn your lyrics into full songs in seconds. Free AI music generator from lyrics. ChatGPT & Suno compatible. Royalty-free for videos, podcasts & commercial use. Try now (2026).",
  });
  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: PAGE_URL,
      siteName: config.siteName,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "AI Music from Lyrics - Turn Your Words into Songs" }],
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

const FAQ_ITEMS = [
  {
    question: "Can I use ChatGPT lyrics with this generator?",
    answer:
      "Yes. Paste lyrics from ChatGPT, Suno, or your own writing. Our v6 model turns them into melody and production.",
  },
  {
    question: "Does the AI understand the rhyme and meter of my lyrics?",
    answer:
      "Our 2026 model analyzes cadence and emotion so the melody aligns with your song's natural flow.",
  },
  {
    question: "What genres work best with lyrics-based generation?",
    answer:
      "From blues and ballad to pop, rock, and EDM—specify genre and mood in the prompt; the engine adapts.",
  },
] as const;

function schemaText(s: string): string {
  return s
    .replace(/\u2019/g, "'")
    .replace(/\u2014/g, " - ")
    .replace(/\u2013/g, " - ");
}

function getPageSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "AI Lyrics to Music Generator", item: `${siteUrl}${PAGE_URL}` },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Turn Your Lyrics into a Song",
        description:
          "Paste your lyrics, optionally set genre and mood, then click Turn Lyrics to Melody. The v6 model generates a full song that matches the emotion and flow of your words.",
        step: [
          { "@type": "HowToStep", position: 1, name: "Paste or type your lyrics", text: "Enter lyrics from ChatGPT, Suno, or your own writing." },
          { "@type": "HowToStep", position: 2, name: "Optional: set genre and mood", text: "Specify genre and mood so BPM and style match your lyrics." },
          { "@type": "HowToStep", position: 3, name: "Click Turn Lyrics to Melody", text: "The AI generates a full song. Download royalty-free for commercial use." },
        ],
        url: `${siteUrl}${PAGE_URL}`,
      },
      {
        "@type": "FAQPage",
        name: "AI Lyrics to Music Generator - FAQ",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: schemaText(item.question),
          acceptedAnswer: { "@type": "Answer", text: schemaText(item.answer) },
        })),
      },
    ],
  };
}

const DEFAULT_PAGE_TITLE = "Free AI Music from Lyrics | Turn Words into Songs (2026)";

export default async function AiLyricsToMusicGeneratorPage() {
  const { getServerSiteConfig, getSubPageMeta } = await import("../../lib/site-config");
  const config = await getServerSiteConfig();
  const { title: pageTitle } = getSubPageMeta(config, PAGE_URL, {
    title: DEFAULT_PAGE_TITLE,
    description: "Turn your lyrics into full songs in seconds. Free AI music generator from lyrics. ChatGPT & Suno compatible. Royalty-free for videos, podcasts & commercial use. Try now (2026).",
  });
  const schema = getPageSchema(config.siteUrl);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DualLayerWrapper cookieKey="ai_lyrics_to_music_app_mode">
        <main className="flex min-h-screen flex-col text-slate-50">
          <SiteHeader hideLandingLinks mobileNavKind="tools" currentPath={PAGE_URL} />

          {/* 三区：左侧竖向导航 | 中间生成操作区 | 右侧成果展示区（含 H1） */}
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
                          <Link
                            href={href}
                            className={`block rounded-xl px-3 py-2 text-sm transition truncate max-w-full ${
                              isActive ? "bg-violet-500/20 text-violet-200 font-medium" : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                            }`}
                          >
                            {label}
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

            <div className="flex flex-1 min-w-0 min-h-0">
              <LyricsToMusicGenerator pageTitle={pageTitle} />
            </div>
          </div>

          {/* SEO content: same style as ai-music-generator */}
          <div className="bg-slate-950/80 rounded-t-3xl overflow-hidden">
            <div className="mx-auto max-w-3xl px-4 py-12 text-slate-200">
              <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-semibold text-slate-100">How AI Lyrics to Music Works</h2>
                <p className="mb-4 leading-relaxed">
                  Turn your lyrics into full songs in seconds. Paste words from ChatGPT, Suno, or your own writing—our AI matches melody and production to the emotion and flow of your lyrics. Royalty-free for personal and commercial use.
                </p>
                <p className="mb-6 leading-relaxed text-slate-300">
                  Three steps: paste your lyrics, optionally set genre and mood, then click Turn Lyrics to Melody. Preview and download your track.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4 rounded-2xl bg-slate-800/40 p-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                      <img src="/images/home/how-1-describe-192.webp" srcSet="/images/home/how-1-describe-192.webp 192w" sizes="96px" alt="Paste your lyrics" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                      <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">1</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-100 mb-1">Paste your lyrics</h3>
                      <p className="text-sm leading-relaxed">Enter lyrics from ChatGPT, Suno, or your own writing in the text area.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-2xl bg-slate-800/40 p-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                      <img src="/images/home/how-2-ai-compose-192.webp" srcSet="/images/home/how-2-ai-compose-192.webp 192w" sizes="96px" alt="Set genre and mood" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                      <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">2</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-100 mb-1">Set genre and mood</h3>
                      <p className="text-sm leading-relaxed">Optional: specify genre and mood so BPM and style match your lyrics.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-2xl bg-slate-800/40 p-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                      <img src="/images/home/how-3-export-192.webp" srcSet="/images/home/how-3-export-192.webp 192w" sizes="96px" alt="Turn lyrics to melody and download" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                      <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">3</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-100 mb-1">Turn lyrics to melody &amp; download</h3>
                      <p className="text-sm leading-relaxed">Click the button; the AI generates a full song. Preview and download royalty-free.</p>
                    </div>
                  </div>
                </div>
                <Link href={PAGE_URL} className="mt-6 inline-flex rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition">
                  Turn Lyrics to Music Now
                </Link>
              </section>

              <section className="mb-12 rounded-2xl bg-slate-800/30 p-6 md:p-8">
                <div className="relative mb-6 aspect-[2/1] max-w-2xl overflow-hidden rounded-xl">
                  <ResponsiveHeroImage
                    src="/images/home/hero-card-ai-music-generator.webp"
                    src640="/images/home/hero-card-ai-music-generator-640.webp"
                    alt="AI Music Generator from Lyrics - Turn Your Words into Songs"
                    sizes="(max-width: 768px) 100vw, 672px"
                    priority={false}
                  />
                </div>
                <h2 className="mb-6 text-2xl font-semibold text-slate-100">Lyrics Mood to BPM and Genre</h2>
                <p className="mb-4 leading-relaxed text-slate-300">
                  The AI reads the emotional tone of your lyrics and matches BPM and genre so the track feels true to what you wrote.
                </p>
                <div className="mt-6 overflow-hidden rounded-xl border border-slate-600 bg-slate-800/50">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-600 bg-slate-700/50">
                        <th className="py-3 px-4 font-semibold text-slate-100">Lyrics mood</th>
                        <th className="py-3 px-4 font-semibold text-slate-100">Typical BPM</th>
                        <th className="py-3 px-4 font-semibold text-slate-100">Example genres</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      <tr className="border-b border-slate-600"><td className="py-2.5 px-4">Melancholy / reflective</td><td className="py-2.5 px-4">60–80</td><td className="py-2.5 px-4">Blues, ballad, ambient</td></tr>
                      <tr className="border-b border-slate-600"><td className="py-2.5 px-4">Joyful / upbeat</td><td className="py-2.5 px-4">100–120</td><td className="py-2.5 px-4">Pop, folk</td></tr>
                      <tr><td className="py-2.5 px-4">Intense / energetic</td><td className="py-2.5 px-4">120–140+</td><td className="py-2.5 px-4">Rock, EDM, hip-hop</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-semibold text-slate-100">From Lyrics to Video</h2>
                <p className="mb-6 leading-relaxed text-slate-300">Write lyrics, turn them into a song, then into a music video—all with our tools.</p>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-800/40 p-4">
                    <h3 className="font-semibold text-slate-100 mb-2">AI Lyrics Generator</h3>
                    <p className="text-sm leading-relaxed">Get inspiration or full lyrics from AI. Set mood, structure, and style.</p>
                    <Link href="/ai-lyrics-generator" className="mt-2 inline-block text-sm font-medium text-violet-200 underline underline-offset-2 hover:text-violet-100">Generate lyrics →</Link>
                  </div>
                  <div className="rounded-2xl bg-slate-800/40 p-4">
                    <h3 className="font-semibold text-slate-100 mb-2">AI Lyrics to Music</h3>
                    <p className="text-sm leading-relaxed">Paste your lyrics here. The v6 model turns them into melody and production.</p>
                    <Link href={PAGE_URL} className="mt-2 inline-block text-sm font-medium text-violet-200 underline underline-offset-2 hover:text-violet-100">Turn lyrics to music →</Link>
                  </div>
                  <div className="rounded-2xl bg-slate-800/40 p-4">
                    <h3 className="font-semibold text-slate-100 mb-2">AI Music Video Generator</h3>
                    <p className="text-sm leading-relaxed">Turn your track into a music video. Cinematic, Anime, or Lo-fi styles.</p>
                    <Link href="/ai-music-video-generator" className="mt-2 inline-block text-sm font-medium text-violet-200 underline underline-offset-2 hover:text-violet-100">Create music video →</Link>
                  </div>
                </div>
              </section>

              <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8" id="faq">
                <h2 className="mb-6 text-2xl font-semibold text-slate-100">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {FAQ_ITEMS.map((item) => (
                    <details key={item.question} className="group rounded-2xl bg-slate-800/40 overflow-hidden">
                      <summary className="cursor-pointer list-none p-4 md:p-5 flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                        <h3 className="text-base font-semibold text-slate-100 pr-2">{item.question}</h3>
                        <span className="shrink-0 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="text-sm leading-relaxed text-slate-200 px-4 pb-4 md:px-5 md:pb-5 border-t border-slate-700/50 pt-3">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-slate-800/30 p-8 text-center">
                <h2 className="mb-2 text-xl font-semibold text-slate-100">Ready to Turn Your Lyrics into Songs?</h2>
                <p className="mb-4 text-sm text-slate-400">Paste your words and get a full track in minutes. Royalty-free.</p>
                <Link href={PAGE_URL} className="inline-flex rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white hover:bg-violet-500 transition">
                  Turn Lyrics to Music Now
                </Link>
              </section>
            </div>
          </div>

          <SiteFooter />
        </main>
      </DualLayerWrapper>
    </>
  );
}
