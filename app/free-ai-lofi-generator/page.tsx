import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { HomeSampleTracks } from "../../components/HomeSampleTracks";
import { FirstScreenLock } from "./FirstScreenLock";
import { LofiGeneratorHero } from "./LofiGeneratorHero";

const LOFI_SHOWCASE_TRACKS = [
  { category: "Study", title: "Focus beat", description: "Chill hip-hop for study and focus.", audioSrc: "/audio/sample-lofi.mp3", coverSrc: "/images/covers/sample-lofi.webp" },
  { category: "Chill", title: "Late night groove", description: "Smooth beats for coding or winding down.", audioSrc: "/audio/sample-rnb.mp3", coverSrc: "/images/covers/sample-rnb.webp" },
  { category: "Loop", title: "Background loop", description: "Subtle loop for videos and streams.", audioSrc: "/audio/sample-loop.mp3", coverSrc: "/images/covers/sample-loop.webp" },
  { category: "Ambient", title: "Ambient bed", description: "Calm bed for playlists or chill.", audioSrc: "/audio/sample-ambient.mp3", coverSrc: "/images/covers/sample-ambient.webp" },
];

const OG_IMAGE = "/images/home/hero-card-ai-music-generator.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const { getServerSiteConfig, getSubPageMeta } = await import("../../lib/site-config");
  const config = await getServerSiteConfig();
  const PAGE_CANONICAL = `${config.siteUrl}/free-ai-lofi-generator`;
  const { title, description } = getSubPageMeta(config, "/free-ai-lofi-generator", {
    title: "Free AI Lofi Music Generator for Study & Chill",
    description: "Generate lofi beats for study sessions, background music, or YouTube in seconds. Royalty-free, no login required. Built on the 2026 v6 model—warmer and less repetitive than older lofi generators.",
  });
  return {
    title: { absolute: title },
    description,
    keywords: [
      "ai lofi music generator",
      "lofi beats generator",
      "free lofi music generator",
      "lofi hip hop generator",
      "study music generator",
      "royalty free lofi",
      "ai music for youtube",
      "lofi generator 2026",
    ],
    alternates: { canonical: PAGE_CANONICAL },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: PAGE_CANONICAL,
      siteName: config.siteName,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Free AI Lofi Music Generator" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

/** FAQ: plain text for JSON-LD; display adds internal links via FAQAnswer */
const FAQ_ITEMS = [
  {
    question: "Is The AI Music Generator's lofi tool really free?",
    answer:
      "The free tier lets you generate and preview lofi beats with no account required. There are limits: free tracks are shorter and export options are restricted. Paid plans unlock tracks up to 8 minutes and full commercial licensing. If you also need lyrics, try our AI Lyrics Generator - a separate free tool on the same platform.",
  },
  {
    question: "Can I monetize AI-generated lofi music on YouTube in 2026?",
    answer:
      "Yes, with a caveat. YouTube requires creators to disclose AI-generated content using the 'altered or synthetic content' label in upload settings. Tracks from this generator are royalty-free, so you won't get copyright claims from us. Apply the disclosure label and review our Content License for full terms.",
  },
  {
    question: "How does this lofi generator compare to other AI music tools?",
    answer:
      "Most AI music tools from 2025 and earlier generated short, repetitive loops with little rhythmic variation. The v6 model here is tuned for lofi output - it produces tracks with subtle chord movement, natural-sounding percussion, and slight imperfections that make lofi feel warm rather than mechanical. Tracks go up to 8 minutes, covering a full Pomodoro work session.",
  },
  {
    question: "How can I tell if a piece of music is AI generated?",
    answer:
      "Earlier AI music often had telltale signs: very regular note timing, repetitive four-bar loops that never resolve, and an absence of natural room tone. Newer models are harder to identify. Our tracks are labeled as AI-generated in their metadata so you can disclose correctly on YouTube, Twitch, and other platforms that require it.",
  },
  {
    question: "Can I use these lofi beats in commercial projects like games, ads, or podcasts?",
    answer:
      "Yes. Tracks come with a royalty-free license covering personal and commercial use - indie games, YouTube ads, podcast intros, TikTok, and more. The free tier has some restrictions; paid plans remove them. Check our AI Music Tools page and Content License for full terms before using tracks in high-stakes campaigns.",
  },
] as const;

/** Normalize text for JSON-LD to avoid mojibake (curly quotes, em dash -> ASCII) */
function schemaText(s: string): string {
  return s
    .replace(/\u2019/g, "'")
    .replace(/\u2014/g, " - ")
    .replace(/\u2013/g, " - ");
}

function getPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://theaimusicgenerator.com/#website",
        name: "The AI Music Generator",
        url: "https://theaimusicgenerator.com",
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Free AI Lofi Music Generator for Study & Chill",
        description:
          "Generate lofi beats for study sessions, background music, or YouTube in seconds. Royalty-free, no login required. Built on the 2026 v6 model.",
        isPartOf: { "@id": "https://theaimusicgenerator.com/#website" },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://theaimusicgenerator.com" },
          { "@type": "ListItem", position: 2, name: "AI Music Tools", item: "https://theaimusicgenerator.com/ai-music-tools" },
          { "@type": "ListItem", position: 3, name: "Free AI Lofi Generator", item: PAGE_URL },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${PAGE_URL}#app`,
        name: "Free AI Lofi Music Generator",
        url: PAGE_URL,
        applicationCategory: "MusicApplication",
        operatingSystem: "Web browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free tier available. Paid plans unlock longer tracks and full commercial use.",
        },
        description:
          "An AI-powered web app that generates lofi hip-hop beats for study, chill, and background use. Describe a mood and the engine returns a royalty-free track in seconds. Built on the 2026 v6 model.",
        featureList: [
          "AI lofi beat generation from text prompts",
          "Styles: Chill, Study Focus, Rainy Window, Night Drive, Lofi Jazz",
          "Track lengths from 1 to 8 minutes",
          "Royalty-free for YouTube and commercial use",
          "No account required for free tier",
        ],
        provider: {
          "@type": "Organization",
          name: "The AI Music Generator",
          url: "https://theaimusicgenerator.com",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faqpage`,
        name: "AI Lofi Music Generator - Frequently Asked Questions",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: schemaText(item.question),
          acceptedAnswer: {
            "@type": "Answer",
            text: schemaText(item.answer),
          },
        })),
      },
    ],
  };
}

/** Renders FAQ answer text with internal links for SEO and navigation */
function FAQAnswer({ text }: { text: string }) {
  const patterns: { pattern: RegExp; href: string; label: string }[] = [
    { pattern: /try our AI Lyrics Generator/g, href: "/ai-lyrics-generator", label: "AI Lyrics Generator" },
    { pattern: /Content License/g, href: "/license", label: "Content License" },
    { pattern: /AI Music Tools/g, href: "/ai-music-tools", label: "AI Music Tools" },
  ];
  const matches: { index: number; end: number; href: string; label: string }[] = [];
  for (const { pattern, href, label } of patterns) {
    let m;
    while ((m = pattern.exec(text)) !== null) {
      matches.push({ index: m.index, end: m.index + m[0].length, href, label });
    }
  }
  matches.sort((a, b) => a.index - b.index);
  const nodes: ReactNode[] = [];
  let pos = 0;
  for (const match of matches) {
    if (match.index < pos) continue;
    nodes.push(text.slice(pos, match.index));
    nodes.push(
      <Link key={`${match.index}-${match.href}`} href={match.href} className="text-violet-200 underline underline-offset-2 hover:text-violet-100">
        {match.label}
      </Link>
    );
    pos = match.end;
  }
  nodes.push(text.slice(pos));
  return <>{nodes}</>;
}

export default function FreeAiLofiGeneratorPage() {
  const schema = getPageSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <FirstScreenLock>
        <SiteHeader />
        <LofiGeneratorHero />

        {/* Social proof / stats 鈥?first block, fits in first viewport when locked */}
        <section className="border-b border-slate-800/80 bg-slate-950/95 py-6 sm:py-8">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/40 backdrop-blur px-6 py-4">
                <p className="text-2xl sm:text-3xl font-semibold text-slate-100">1M+</p>
                <p className="text-sm text-slate-400">Lofi beats generated</p>
              </div>
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/40 backdrop-blur px-6 py-4">
                <p className="text-2xl sm:text-3xl font-semibold text-slate-100">Trusted by</p>
                <p className="text-sm text-slate-400">YouTubers & creators</p>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase 鈥?hear it in action */}
        <section className="border-b border-slate-800/80 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <h2 className="text-3xl font-semibold text-slate-100 mb-2">Hear it in action</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8">
              A few beats in the kind of vibe you can get鈥攕tudy, chill, or background.
            </p>
            <HomeSampleTracks tracks={LOFI_SHOWCASE_TRACKS} />
            <Link href="/ai-music-generator" className="mt-6 inline-flex items-center justify-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
              Make your own
            </Link>
          </div>
        </section>

        {/* How it works 鈥?3 steps + images */}
        <section className="border-b border-slate-800/80 bg-slate-950/95">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <h2 className="text-3xl font-semibold text-slate-100 mb-2">How it works</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10">
              Describe the mood, get a track, then export if you like it.
            </p>
            <div className="grid gap-6 md:grid-cols-3 text-left">
              {[
                { step: "1. Describe the mood", text: "Chill, study, rainy window, lofi jazz鈥攚hatever you鈥檙e after. A short line is enough.", img: "/images/home/how-1-describe.webp", alt: "Describe your idea" },
                { step: "2. We compose a track", text: "The engine turns that into a beat. Usually a minute or two; you can request longer in the full tool.", img: "/images/home/how-2-ai-compose.webp", alt: "Track is composed" },
                { step: "3. Preview & export", text: "Play it in the browser. If it fits, export for your video, stream, or playlist.", img: "/images/home/how-3-export.webp", alt: "Download" },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-4">
                  <div className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-slate-800/50">
                    <img src={item.img} srcSet={`${item.img.replace(".webp", "-640.webp")} 640w, ${item.img} 960w`} sizes="(max-width: 768px) 100vw, 33vw" alt={item.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <h3 className="mb-1 text-base font-semibold text-slate-50">{item.step}</h3>
                  <p className="text-sm text-slate-200">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-slate-800/80 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <h2 className="text-3xl font-semibold text-slate-100 mb-2">What you get</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10">
              Warm, usable beats. Clear license. No copyright surprises.
            </p>
            <div className="grid gap-6 md:grid-cols-3 text-left">
              <article className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
                <div className="relative aspect-video w-full">
                  <img src="/images/home/explore-loops.webp" srcSet="/images/home/explore-loops-640.webp 640w, /images/home/explore-loops.webp 960w" sizes="(max-width: 768px) 100vw, 33vw" alt="Lofi loops for study sessions and chill background music" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-50 mb-2">Warm, natural sound</h3>
                  <p className="text-sm text-slate-200">
                    The current model is tuned for lofi and chill鈥攍ess sterile than older tools. Good for focus and background.
                  </p>
                </div>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
                <div className="relative aspect-video w-full">
                  <img src="/images/home/copyright-license.webp" srcSet="/images/home/copyright-license-640.webp 640w, /images/home/copyright-license.webp 960w" sizes="(max-width: 768px) 100vw, 33vw" alt="License and commercial use" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-50 mb-2">Royalty-free</h3>
                  <p className="text-sm text-slate-200">
                    Tracks are cleared for <Link href="/license" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">commercial use</Link>. Personal or paid projects鈥攄etails in the license.
                  </p>
                </div>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
                <div className="relative aspect-video w-full">
                  <img src="/images/home/use-cases-creators.webp" srcSet="/images/home/use-cases-creators-640.webp 640w, /images/home/use-cases-creators.webp 960w" sizes="(max-width: 768px) 100vw, 33vw" alt="Content creators using AI lofi music for YouTube and live streams" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-50 mb-2">YouTube & streams</h3>
                  <p className="text-sm text-slate-200">
                    Safe to monetize when you follow platform rules. <Link href="/resources/monetize-ai-music-2026" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">Monetize AI music 2026</Link> has the specifics.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Comparison 鈥?use srcSet so small viewports get 640w (~26 KB) instead of full (~43 KB) */}
        <section className="border-b border-slate-800/80 bg-slate-950/95">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/home/hero-card-ai-music-generator-640.webp"
                  srcSet="/images/home/hero-card-ai-music-generator-640.webp 640w, /images/home/hero-card-ai-music-generator.webp 960w"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt="AI lofi music generator interface showing a beat being created"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-100 mb-4">2026 vs earlier tools</h2>
                <p className="text-slate-200 text-base leading-relaxed">
                  Before 2026, most <strong>AI music generators</strong> had two common problems: output that sounded repetitive after a few bars, and licenses that were unclear about commercial use. The <strong>v6 model</strong> used here addresses both - it was trained to produce more varied lofi progressions, and the <strong>royalty-free license</strong> is documented plainly. More tools: <Link href="/ai-music-tools" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Tools</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-b border-slate-800/80 bg-slate-950/95">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <h2 className="text-3xl font-semibold text-slate-100 mb-6">Common questions about AI lofi generation</h2>
            <div className="space-y-3 text-left">
              {FAQ_ITEMS.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-slate-700/80 bg-slate-900/50 backdrop-blur-sm p-4"
                >
                  <summary className="cursor-pointer text-base font-semibold text-slate-50">
                    {item.question}
                  </summary>
                  <p className="mt-2 text-sm text-slate-200">
                    <FAQAnswer text={item.answer} />
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* SEO content 鈥?natural voice; one short lead; keywords in <strong>; image */}
        <section className="border-b border-slate-800/80 bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <div className="prose prose-invert prose-slate max-w-none text-slate-200 text-base leading-relaxed space-y-4">
              <h2 className="text-xl font-semibold text-slate-100">What is lofi music and how does this generator work?</h2>
              <p className="text-slate-300">
                Describe a mood - coffee shop, rain on window, late-night study - and the generator produces a lofi track. No account needed for the free tier; royalty-free for personal and commercial use. Full generator supports tracks up to 8 minutes.
              </p>
              <div className="grid md:grid-cols-2 gap-6 items-start my-6">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-800/50">
                  <img src="/images/home/explore-idea-starters.webp" srcSet="/images/home/explore-idea-starters-640.webp 640w, /images/home/explore-idea-starters.webp 960w" sizes="(max-width: 768px) 100vw, 50vw" alt="Lofi beat ideas - coffee shop, rain, and late-night study prompts" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="space-y-4">
                  <p>
                    This tool is an <strong>AI lofi music generator</strong> that generates original, <strong>royalty-free lofi beats</strong> from a short text prompt. It is free to try, with no login required for the first few tracks. If you use lofi music for study sessions, background streams, or YouTube videos, the generated tracks are cleared for <strong>commercial use</strong> once you check the license terms for your plan.
                  </p>
                  <p>
                    A common concern is whether <strong>AI-generated music can be monetized on YouTube</strong>. The short answer is yes, as long as you follow YouTube's AI content disclosure requirements. We provide guidance on how to label AI music correctly: <Link href="/resources/youtube-ai-music-labeling-2026" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">YouTube AI labeling 2026</Link>.
                  </p>
                </div>
              </div>
              <p>
                Lofi music sits at the intersection of hip-hop rhythm, jazz harmony, and ambient texture. It is typically 60-90 BPM, built around warm vinyl-like tones and simple, repeating chord progressions - which makes it ideal for long background listening. The <strong>lofi music generator</strong> here handles that full range. For longer tracks, instrumental variations, and full export options, the main <Link href="/ai-music-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Generator</Link>, <Link href="/ai-lyrics-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Lyrics Generator</Link>, and <Link href="/ai-music-tools" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Tools</Link> give more control.
              </p>
            </div>
          </div>
        </section>

        {/* CTA + footer links */}
        <section className="bg-slate-950 py-10">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-slate-400 text-sm mb-6">
              <Link href="/" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">Home</Link>
              {" 路 "}
              <Link href="/ai-music-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Generator</Link>
              {" 路 "}
              <Link href="/ai-lyrics-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Lyrics Generator</Link>
              {" 路 "}
              <Link href="/ai-music-tools" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Tools</Link>
              {" 路 "}
              <Link href="/pricing" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">Pricing</Link>
            </p>
            <Link
              href="/ai-music-generator"
              className="inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500"
            >
              Open full generator
            </Link>
          </div>
        </section>

        <SiteFooter />
        </FirstScreenLock>
      </main>
    </>
  );
}

