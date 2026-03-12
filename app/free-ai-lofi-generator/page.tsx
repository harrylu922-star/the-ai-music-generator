import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
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

export const metadata: Metadata = {
  title: { absolute: "Free AI Lofi Music Generator for Study & Chill" },
  description:
    "Make lofi beats for study, chill, or background. Free to try, royalty-free to use. Works with YouTube and streams.",
  openGraph: {
    title: "Free AI Lofi Music Generator for Study & Chill",
    description:
      "Make lofi beats for study and chill. Free to try, royalty-free.",
    url: "/free-ai-lofi-generator",
  },
};

/** FAQ: plain text for JSON-LD; display adds internal links via FAQAnswer */
const FAQ_ITEMS = [
  {
    question: "Is The AI Music Generator really free to use for Lofi beats?",
    answer:
      "Yes. You can create and preview beats at no cost. Free tier has limits on length and exports; paid plans unlock longer tracks and full commercial use. If you need lyrics first, try our AI Lyrics Generator.",
  },
  {
    question: "Can I monetize AI-generated music on YouTube in 2026?",
    answer:
      "Yes. Generated tracks are royalty-free. Follow YouTube’s 2026 AI disclosure rules and you can use them for background, study streams, and vlogs. Full terms: see our Content License.",
  },
  {
    question: "Why is this considered the best AI music tool for 2026?",
    answer:
      "Compared to best ai music generation tools 2025, our 2026 engine handles more varied phrasing and lofi-style warmth. Less loop-only, more usable as full backing. We’ve improved on the 2025 baseline.",
  },
  {
    question: "How can I tell if music is AI generated vs. human-made?",
    answer:
      "It’s getting harder. Older AI often had repetitive patterns or artifacts. We aim for warmer, less mechanical output - but we still label tracks so you can disclose AI use where platforms require it.",
  },
  {
    question: "Can I use these Lofi beats for commercial projects like indie games or ads?",
    answer:
      "Yes. Tracks come with a clear license for commercial use - indie games, ads, TikTok, etc. Check our AI Music Tools and Content License for full options.",
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
        "@type": "WebPage",
        "@id": "https://theaimusicgenerator.com/free-ai-lofi-generator#webpage",
        url: "https://theaimusicgenerator.com/free-ai-lofi-generator",
        name: "Free AI Lofi Music Generator for Study & Chill",
        description:
          "Make lofi beats for study, chill, or background. Free to try, royalty-free to use.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://theaimusicgenerator.com/#website",
          name: "The AI Music Generator",
          url: "https://theaimusicgenerator.com",
        },
      },
      {
        "@type": "FAQPage",
        name: "Free AI Lofi Music Generator for Study & Chill - FAQ",
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

        {/* Social proof / stats — first block, fits in first viewport when locked */}
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

        {/* Showcase — hear it in action */}
        <section className="border-b border-slate-800/80 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <h2 className="text-3xl font-semibold text-slate-100 mb-2">Hear it in action</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8">
              A few beats in the kind of vibe you can get—study, chill, or background.
            </p>
            <HomeSampleTracks tracks={LOFI_SHOWCASE_TRACKS} />
            <Link href="/ai-music-generator" className="mt-6 inline-flex items-center justify-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
              Make your own
            </Link>
          </div>
        </section>

        {/* How it works — 3 steps + images */}
        <section className="border-b border-slate-800/80 bg-slate-950/95">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <h2 className="text-3xl font-semibold text-slate-100 mb-2">How it works</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10">
              Describe the mood, get a track, then export if you like it.
            </p>
            <div className="grid gap-6 md:grid-cols-3 text-left">
              {[
                { step: "1. Describe the mood", text: "Chill, study, rainy window, lofi jazz—whatever you’re after. A short line is enough.", img: "/images/home/how-1-describe.webp", alt: "Describe your idea" },
                { step: "2. We compose a track", text: "The engine turns that into a beat. Usually a minute or two; you can request longer in the full tool.", img: "/images/home/how-2-ai-compose.webp", alt: "Track is composed" },
                { step: "3. Preview & export", text: "Play it in the browser. If it fits, export for your video, stream, or playlist.", img: "/images/home/how-3-export.webp", alt: "Download" },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-4">
                  <div className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-slate-800/50">
                    <Image src={item.img} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" unoptimized />
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
                  <Image src="/images/home/explore-loops.webp" alt="Loops for study and chill" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" unoptimized />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-50 mb-2">Warm, natural sound</h3>
                  <p className="text-sm text-slate-200">
                    The current model is tuned for lofi and chill—less sterile than older tools. Good for focus and background.
                  </p>
                </div>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
                <div className="relative aspect-video w-full">
                  <Image src="/images/home/copyright-license.webp" alt="License and commercial use" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" unoptimized />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-50 mb-2">Royalty-free</h3>
                  <p className="text-sm text-slate-200">
                    Tracks are cleared for <Link href="/license" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">commercial use</Link>. Personal or paid projects—details in the license.
                  </p>
                </div>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
                <div className="relative aspect-video w-full">
                  <Image src="/images/home/use-cases-creators.webp" alt="Creators and streams" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" unoptimized />
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

        {/* Comparison — use srcSet so small viewports get 640w (~26 KB) instead of full (~43 KB) */}
        <section className="border-b border-slate-800/80 bg-slate-950/95">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/home/hero-card-ai-music-generator-640.webp"
                  srcSet="/images/home/hero-card-ai-music-generator-640.webp 640w, /images/home/hero-card-ai-music-generator.webp 960w"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt="Generator in use"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-100 mb-4">2026 vs earlier tools</h2>
                <p className="text-slate-200 text-base leading-relaxed">
                  A lot of <strong>best ai music generation tools 2025</strong> stuff sounded flat and licensing was fuzzy. We’re on a newer model (v6) and ship a clear royalty-free license so you know where you stand. More options: <Link href="/ai-music-tools" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Tools</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-b border-slate-800/80 bg-slate-950/95">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <h2 className="text-3xl font-semibold text-slate-100 mb-6">FAQ</h2>
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

        {/* SEO content — natural voice; one short lead; keywords in <strong>; image */}
        <section className="border-b border-slate-800/80 bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <div className="prose prose-invert prose-slate max-w-none text-slate-200 text-base leading-relaxed space-y-4">
              <h2 className="text-xl font-semibold text-slate-100">About this lofi tool</h2>
              <p className="text-slate-300">
                In short: you describe a mood, get a beat. Free to try; royalty-free to use. Up to 8 minutes in the full generator.
              </p>
              <div className="grid md:grid-cols-2 gap-6 items-start my-6">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-800/50">
                  <Image src="/images/home/explore-idea-starters.webp" alt="Music ideas and beats" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" unoptimized />
                </div>
                <div className="space-y-4">
                  <p>
                    An <strong>ai lofi music generator free</strong> tier is useful when you want <strong>lofi beats</strong> for study or background without hunting sample packs. We’re built on a <strong>best ai music generation tools 2025</strong>–era idea but with a newer model—warmer, less mechanical.
                  </p>
                  <p>
                    <strong>Can ai generated music be monetized on youtube</strong>? Yes, if you stick to platform rules. Our stuff is <strong>commercial use</strong> and we explain <strong>how to tell if music is ai generated</strong> and how to label it: <Link href="/resources/youtube-ai-music-labeling-2026" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">YouTube AI labeling 2026</Link>.
                  </p>
                </div>
              </div>
              <p>
                Beyond the <strong>best ai music generation tools of 2025</strong>, this <strong>lofi music generator</strong> gives you a quick way to try. For longer tracks and full <strong>commercial use music</strong>, use the main <Link href="/ai-music-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Generator</Link>, <Link href="/ai-lyrics-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Lyrics Generator</Link>, or <Link href="/ai-music-tools" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Tools</Link>. Same engine—more control and export options there.
              </p>
            </div>
          </div>
        </section>

        {/* CTA + footer links */}
        <section className="bg-slate-950 py-10">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-slate-400 text-sm mb-6">
              <Link href="/" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">Home</Link>
              {" · "}
              <Link href="/ai-music-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Generator</Link>
              {" · "}
              <Link href="/ai-lyrics-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Lyrics Generator</Link>
              {" · "}
              <Link href="/ai-music-tools" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Tools</Link>
              {" · "}
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
