// app/page.tsx — Home: multi-brand, config-driven copy via SiteBrandConfig
import type { Metadata } from "next";
import Link from "@/components/Link";
import { getHomeFaqJsonLd } from "./home-faq-ld";
import { getHomePageAndAppJsonLd } from "./home-website-ld";
import { getHomeMusicModelJsonLd, getLatestMusicModelJsonLd } from "./home-music-model-ld";
import { HomeFeatureImage, HomeCtaImage } from "../components/HomeFeatureImage";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { HomeSampleTracks } from "../components/HomeSampleTracks";
import { MusicModelModalTrigger } from "../components/MusicModelModal";
import { getServerSiteConfig } from "../lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getServerSiteConfig();
  return {
    title: { absolute: config.defaultTitle },
    description: config.defaultDescription,
    openGraph: {
      title: config.defaultTitle,
      description: config.defaultDescription,
    },
    twitter: {
      title: config.defaultTitle,
      description: config.defaultDescription,
    },
  };
}

// 功能卡与 CTA 配图（置于 public/images/home/）；src640 由 optimize-images 生成
const FEATURE_CARD_IMAGES = [
  { src: "/images/home/hero-card-ai-music-generator.webp", src640: "/images/home/hero-card-ai-music-generator-640.webp", alt: "Producer in home studio with laptop and speakers" },
  { src: "/images/home/hero-card-ai-lyrics-generator.webp", src640: "/images/home/hero-card-ai-lyrics-generator-640.webp", alt: "Songwriter writing lyrics at desk with notebook and laptop" },
  { src: "/images/home/hero-card-ai-music-tools.webp", src640: "/images/home/hero-card-ai-music-tools-640.webp", alt: "Content creator with microphone and laptop" },
] as const;

const EXPLORE_IMAGES = [
  { src: "/images/home/explore-instrumental.webp", src640: "/images/home/explore-instrumental-640.webp", alt: "Musician with guitar or keyboard in minimal home studio" },
  { src: "/images/home/explore-loops.webp", src640: "/images/home/explore-loops-640.webp", alt: "Person editing video on laptop with headphones" },
  { src: "/images/home/explore-idea-starters.webp", src640: "/images/home/explore-idea-starters-640.webp", alt: "Creative person with headphones listening to music" },
] as const;

const SAMPLE_TRACK_BASE = [
  { category: "Full track · Cinematic", title: "Cinematic opener", audioSrc: "/audio/sample-cinematic.mp3", coverSrc: "/images/covers/sample-cinematic.webp" },
  { category: "Instrumental · Lo-fi", title: "Lo-fi focus instrumental", audioSrc: "/audio/sample-lofi.mp3", coverSrc: "/images/covers/sample-lofi.webp" },
  { category: "Loop · Background", title: "Loop for talking videos", audioSrc: "/audio/sample-loop.mp3", coverSrc: "/images/covers/sample-loop.webp" },
  { category: "Short clip · Social", title: "15-second social clip", audioSrc: "/audio/sample-social.mp3", coverSrc: "/images/covers/sample-social.webp" },
  { category: "Full track · Documentary", title: "Documentary emotional bed", audioSrc: "/audio/sample-documentary.mp3", coverSrc: "/images/covers/sample-documentary.webp" },
  { category: "Short clip · Vlog", title: "Upbeat vlog intro", audioSrc: "/audio/sample-vlog.mp3", coverSrc: "/images/covers/sample-vlog.webp" },
  { category: "Instrumental · R&B", title: "Late night R&B groove", audioSrc: "/audio/sample-rnb.mp3", coverSrc: "/images/covers/sample-rnb.webp" },
  { category: "Loop · Ambient", title: "Game menu ambient", audioSrc: "/audio/sample-ambient.mp3", coverSrc: "/images/covers/sample-ambient.webp" },
] as const;

export default async function Home() {
  const config = await getServerSiteConfig();
  const { home, toolName, siteName } = config;

  const sampleTracks = SAMPLE_TRACK_BASE.map((t, i) => ({
    ...t,
    description: home.sampleTrackDescriptions[i] ?? "",
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomePageAndAppJsonLd(config)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomeFaqJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomeMusicModelJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getLatestMusicModelJsonLd()) }} />

      <main className="min-h-screen bg-slate-950 text-slate-50">
        <SiteHeader />

        {/* 1) HERO */}
        <section className="border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 min-h-[85vh] flex flex-col justify-center">
          <div className="mx-auto max-w-6xl w-full px-4 py-12 sm:py-16 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h1 className="text-5xl font-semibold tracking-tight text-slate-50 sm:text-6xl md:text-7xl leading-tight">
                <span className="block sm:whitespace-nowrap">{siteName}</span>
                <span className="block">{config.tagline}</span>
              </h1>
              <p className="text-balance text-lg leading-relaxed text-slate-200">{home.heroSubtitle}</p>
            </div>
            <div className="mt-8 mx-auto max-w-2xl space-y-4">
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/90 bg-slate-950/80 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.9)] sm:flex-row sm:items-center">
                <input
                  type="text"
                  placeholder={`Describe the track you want to create with ${siteName}…`}
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-400/60"
                />
                <Link href="/ai-music-generator" className="inline-flex w-full items-center justify-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.5)] transition hover:bg-violet-500 sm:w-auto">
                  Generate with AI
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:justify-between md:px-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-300">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400">Duration</span>
                  Up to 8 mins
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-300">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400">License</span>
                  100% Royalty-Free
                </span>
                <MusicModelModalTrigger className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-300 hover:border-violet-500/50 hover:text-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400">Model</span>
                  2026 latest model v6
                </MusicModelModalTrigger>
              </div>
            </div>
          </div>
        </section>

        {/* 2) THREE CORE FEATURE CARDS */}
        <section className="border-b border-slate-900 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-slate-100">{home.section2Heading}</h2>
            <p className="mb-10 text-base text-slate-400 max-w-2xl mx-auto">{home.section2Subtitle}</p>
            <div className="grid gap-6 md:grid-cols-3 text-left">
              {home.section2Cards.map((card, i) => (
                <article key={card.title} className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                  <HomeFeatureImage src={FEATURE_CARD_IMAGES[i].src} src640={FEATURE_CARD_IMAGES[i].src640} alt={FEATURE_CARD_IMAGES[i].alt} className="mb-4" sizes="(max-width: 768px) 100vw, 33vw" priority={i <= 1} />
                  <h3 className="mb-2 text-base font-semibold text-slate-50">{card.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-200">{card.copy}</p>
                  <Link href={card.href} className="mt-auto text-sm font-semibold text-violet-200 underline underline-offset-2 hover:text-violet-100">{card.label}</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3) SAMPLE TRACKS */}
        <section className="border-b border-slate-900 bg-slate-950 min-h-screen flex flex-col">
          <div className="mx-auto max-w-6xl px-4 py-6 md:py-8 text-center flex-1 flex flex-col min-h-0">
            <h2 className="mb-1 text-3xl font-semibold text-slate-100">{home.section3Heading}</h2>
            <p className="mb-4 md:mb-5 text-base text-slate-400 max-w-2xl mx-auto">{home.section3Subtitle}</p>
            <HomeSampleTracks tracks={sampleTracks} />
          </div>
        </section>

        {/* 4) EXPLORE TOOLS */}
        <section className="border-b border-slate-900 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <h2 className="mb-2 text-3xl font-semibold text-slate-100">{home.section4Heading}</h2>
            <p className="mb-10 text-base text-slate-400 max-w-2xl mx-auto">{home.section4Subtitle}</p>
            <div className="grid gap-6 md:grid-cols-3 text-left">
              {home.section4Cards.map((card, i) => (
                <article key={card.title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <HomeFeatureImage src={EXPLORE_IMAGES[i].src} src640={EXPLORE_IMAGES[i].src640} alt={EXPLORE_IMAGES[i].alt} className="mb-4" sizes="(max-width: 768px) 100vw, 33vw" />
                  <h3 className="mb-2 text-base font-semibold text-slate-50">{card.title}</h3>
                  <p className="mb-3 text-sm text-slate-200">{card.copy}</p>
                  <Link href={card.href} className="text-sm text-violet-200 underline underline-offset-2 hover:text-violet-100">{card.label}</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5) THE SPARK / YOUR CONTENT */}
        <section className="border-b border-slate-900 bg-slate-950">
          <div className="mx-auto max-w-4xl px-4 py-14 text-center">
            <h2 className="mb-6 text-3xl font-semibold text-slate-100">{home.section5Heading}</h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-3 text-left">
                <p className="text-base leading-relaxed text-slate-200">{home.section5Body1}</p>
                <p className="text-base leading-relaxed text-slate-200">{home.section5Body2}</p>
              </div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-800/50">
                <img src="/images/home/spark-creators.webp" srcSet="/images/home/spark-creators-640.webp 640w, /images/home/spark-creators.webp 960w" sizes="(max-width: 768px) 100vw, 50vw" alt="Diverse creators in a creative space" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* 6) HOW IT WORKS */}
        <section className="border-b border-slate-900 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <h2 className="mb-10 text-3xl font-semibold text-slate-100">{home.section6Heading}</h2>
            <div className="grid gap-6 md:grid-cols-3 text-left">
              {home.section6Steps.map((item) => (
                <div key={item.step} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <div className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-slate-800/50">
                    <img src={item.img} srcSet={`${item.img.replace(".webp", "-640.webp")} 640w, ${item.img} 960w`} sizes="(max-width: 768px) 100vw, 33vw" alt={item.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <h3 className="mb-1 text-base font-semibold text-slate-50">{item.step}</h3>
                  <p className="text-sm text-slate-200">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Ready to try it?{" "}
              <Link href="/ai-music-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">
                {home.section6FooterCta}
              </Link>.
            </p>
          </div>
        </section>

        {/* 7) USE CASES */}
        <section id="use-cases" className="border-b border-slate-900 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <h2 className="mb-10 text-3xl font-semibold text-slate-100">{home.section7Heading}</h2>
            <div className="mb-8 max-w-3xl mx-auto relative aspect-[2/1] rounded-xl overflow-hidden bg-slate-800/50">
              <img src="/images/home/use-cases-creators.webp" srcSet="/images/home/use-cases-creators-640.webp 640w, /images/home/use-cases-creators.webp 960w" sizes="(max-width: 768px) 100vw, 896px" alt="Content studio with creators and equipment" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 text-left">
              <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <h3 className="mb-1 text-base font-semibold text-slate-50">YouTube &amp; talking-head videos</h3>
                <p className="text-sm text-slate-200">
                  Record your video, drop a line like &quot;warm, friendly background music for a productivity vlog&quot; into{" "}
                  <Link href="/ai-music-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">{toolName}</Link>
                  , and get a track that sits behind your voice without competing with it.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <h3 className="mb-1 text-base font-semibold text-slate-50">Short-form social clips</h3>
                <p className="text-sm text-slate-200">
                  When you need five versions of a 10-second sound for Reels or Shorts, paste the same prompt into{" "}
                  {toolName}, tweak the energy level, and test which one keeps viewers watching longer.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <h3 className="mb-1 text-base font-semibold text-slate-50">Indie game levels</h3>
                <p className="text-sm text-slate-200">
                  Describe the feeling — &quot;slow build, a bit tense&quot; — and let {toolName} create an{" "}
                  <Link href="/ai-music-tools#instrumentals" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">instrumental bed</Link>
                  . Regenerate until the music feels right for the level.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <h3 className="mb-1 text-base font-semibold text-slate-50">Podcasts and narration</h3>
                <p className="text-sm text-slate-200">
                  Hosts type in the topic and mood; {toolName} builds a unique intro and a softer mid-roll version. Consistent but not repetitive.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <h3 className="mb-1 text-base font-semibold text-slate-50">Startup launch pages</h3>
                <p className="text-sm text-slate-200">
                  Founders drop a one-sentence product description into {toolName} to get a launch song that matches their brand—no music budget required.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <h3 className="mb-1 text-base font-semibold text-slate-50">Songwriters testing ideas</h3>
                <p className="text-sm text-slate-200">
                  Paste a{" "}
                  <Link href="/ai-lyrics-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">rough lyric</Link>
                  , choose &quot;simple piano&quot;, and hear how the melody might feel before booking studio time.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 8) WHO USES */}
        <section className="border-b border-slate-900 bg-slate-950">
          <div className="mx-auto max-w-4xl px-4 py-14 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-slate-100">
              {home.section8HeadingLinkText ? (
                <>
                  Who our{" "}
                  <Link href={home.section8HeadingLinkHref!} className="text-violet-200 underline underline-offset-2 hover:text-violet-100">
                    {home.section8HeadingLinkText}
                  </Link>{" "}
                  is built for
                </>
              ) : (
                home.section8Heading
              )}
            </h2>
            <p className="mb-6 text-base text-slate-200">{home.section8Subtitle}</p>
            <div className="relative aspect-[2.2/1] mb-8 max-w-3xl mx-auto rounded-xl overflow-hidden bg-slate-800/50">
              <img src="/images/home/who-uses-community.webp" srcSet="/images/home/who-uses-community-640.webp 640w, /images/home/who-uses-community.webp 960w" sizes="(max-width: 768px) 100vw, 896px" alt="Creative community in shared workspace" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <ul className="list-disc space-y-1 pl-5 text-left text-base text-slate-200 max-w-xl mx-auto">
              {home.section8ListItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-400">
              See more in our{" "}
              <Link href="#use-cases" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">
                {toolName} use cases
              </Link>.
            </p>
          </div>
        </section>

        {/* 9) COPYRIGHT */}
        <section id="copyright" className="border-b border-slate-900 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-slate-100">{home.section9Heading}</h2>
            <p className="mb-6 text-base text-slate-400 max-w-2xl mx-auto">Clear licensing so you can use your tracks everywhere.</p>
            <div className="grid md:grid-cols-2 gap-8 items-center text-left">
              <div className="space-y-3 text-base text-slate-200 order-2 md:order-1">
                <p>{home.section9Body1}</p>
                <p>{home.section9Body2}</p>
                <p><Link href="/license" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">Read full licensing details</Link>.</p>
              </div>
              <div className="order-1 md:order-2 relative aspect-video w-full max-w-xl mx-auto rounded-xl overflow-hidden bg-slate-800/50">
                <img src="/images/home/copyright-license.webp" srcSet="/images/home/copyright-license-640.webp 640w, /images/home/copyright-license.webp 960w" sizes="(max-width: 768px) 100vw, 50vw" alt="Professional reviewing license document" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* 10) FAQ */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <h2 className="mb-6 text-3xl font-semibold text-slate-100">{home.section10Heading}</h2>
            <div className="space-y-3 text-left">
              <details className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <summary className="cursor-pointer">
                  <h3 className="text-base font-semibold text-slate-50 mt-0 mb-0 [&:not(:first-child)]:mt-0">What can I create with {siteName}?</h3>
                </summary>
                <p className="mt-2 text-sm text-slate-200">You can generate full songs, short hooks, lyrics, or pure instrumentals — all from text prompts. Great for single tracks or batching music for your entire content calendar.</p>
              </details>
              <details className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <summary className="cursor-pointer">
                  <h3 className="text-base font-semibold text-slate-50 mt-0 mb-0 [&:not(:first-child)]:mt-0">Do I own the music I create?</h3>
                </summary>
                <p className="mt-2 text-sm text-slate-200">You get a broad royalty-free license. For details, see our <Link href="#copyright" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">copyright and licensing section</Link>.</p>
              </details>
              <details className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <summary className="cursor-pointer">
                  <h3 className="text-base font-semibold text-slate-50 mt-0 mb-0 [&:not(:first-child)]:mt-0">Can I use AI-generated music on YouTube or TikTok?</h3>
                </summary>
                <p className="mt-2 text-sm text-slate-200">Yes. Tracks are royalty-free for YouTube, TikTok, Instagram, and podcasts. We recommend testing on non-critical content first and reviewing our licensing terms.</p>
              </details>
              <details className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <summary className="cursor-pointer">
                  <h3 className="text-base font-semibold text-slate-50 mt-0 mb-0 [&:not(:first-child)]:mt-0">Do I need music production experience?</h3>
                </summary>
                <p className="mt-2 text-sm text-slate-200">Not at all. If you can describe how you want your track to feel, {siteName} can turn that into audio.</p>
              </details>
              <details className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <summary className="cursor-pointer">
                  <h3 className="text-base font-semibold text-slate-50 mt-0 mb-0 [&:not(:first-child)]:mt-0">Can I start with lyrics first?</h3>
                </summary>
                <p className="mt-2 text-sm text-slate-200">Yes. Use our <Link href="/ai-lyrics-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI lyrics generator</Link> and then turn them into full songs with the same <Link href="/ai-music-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">{toolName}</Link> workflow.</p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-slate-900 bg-slate-950 overflow-hidden">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 py-10 sm:py-14 text-center">
            <div className="relative rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/80 overflow-hidden aspect-[4/3] sm:aspect-[3/1] min-h-[260px] sm:min-h-[280px] w-full max-w-full">
              <HomeCtaImage src="/images/home/cta-ready-to-create.webp" src640="/images/home/cta-ready-to-create-640.webp" alt="Creator ready to make music">
                <div className="absolute inset-0 z-10 bg-slate-950/60 flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-50 px-1">{home.ctaHeading}</h2>
                  <p className="text-sm sm:text-base text-slate-200 max-w-xl px-1">{home.ctaSubtitle}</p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 mt-1 w-full max-w-xs sm:max-w-none sm:w-auto">
                    <Link href="/ai-music-generator" className="inline-flex items-center justify-center rounded-full bg-violet-600 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.5)] transition hover:bg-violet-500">Create Music Now</Link>
                    <Link href="/pricing" className="inline-flex items-center justify-center rounded-full border border-slate-600 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-slate-200 hover:border-violet-500/50 hover:text-violet-200">View Pricing</Link>
                  </div>
                </div>
              </HomeCtaImage>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
