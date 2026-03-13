import type { Metadata } from "next";
import Link from "@/components/Link";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { CountryBluesSampleCards } from "./CountryBluesSampleCards";

const PAGE_URL = "https://theaimusicgenerator.com/ai-genre-generator/country-and-blues";

const SAMPLE_TRACKS = [
  {
    category: "Country",
    title: "Dust road ballad",
    description: "Acoustic guitar and warm vocals, open-road Americana.",
    audioSrc: "/audio/sample-lofi.mp3",
  },
  {
    category: "Blues",
    title: "Delta soul",
    description: "Slow 12-bar feel with slide and organ.",
    audioSrc: "/audio/sample-rnb.mp3",
  },
  {
    category: "Country & Blues",
    title: "Southern twilight",
    description: "Blend of country storytelling and blues phrasing.",
    audioSrc: "/audio/sample-ambient.mp3",
  },
];

export const metadata: Metadata = {
  title: "Best AI Country & Blues Music Generator: Authentic Southern Soundscapes",
  description:
    "Create authentic country and blues music with AI. V6 model captures the soul of blues through micro-timing and harmonic depth. Royalty-free for YouTube and Spotify.",
  keywords: [
    "AI country music generator",
    "AI blues music generator",
    "country and blues AI",
    "Southern soundscapes",
    "royalty-free country music",
    "AI blues generator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Best AI Country & Blues Music Generator: Authentic Southern Soundscapes",
    description: "AI country and blues with soul. Royalty-free for YouTube and Spotify.",
    url: PAGE_URL,
    type: "website",
  },
};

const glassCard =
  "rounded-2xl border border-amber-900/40 bg-amber-950/20 backdrop-blur-xl shadow-lg";
const sectionHeading = "text-2xl font-semibold text-amber-50 mb-3";
const bodyText = "text-amber-200/90 leading-relaxed";

export default function CountryAndBluesPage() {
  return (
    <main className="min-h-screen bg-[#1a1510] text-amber-50">
      <SiteHeader />

      <article className="pb-16">
        <header className="mx-auto max-w-4xl px-4 pt-10 pb-8">
          <nav className="mb-4 text-sm">
            <Link
              href="/"
              className="text-amber-400/90 hover:text-amber-300 underline underline-offset-2"
            >
              Home
            </Link>
            <span className="mx-2 text-amber-600">/</span>
            <Link
              href="/ai-music-tools"
              className="text-amber-400/90 hover:text-amber-300 underline underline-offset-2"
            >
              AI Music Tools
            </Link>
            <span className="mx-2 text-amber-600">/</span>
            <span className="text-amber-200/80">Country & Blues</span>
          </nav>
          <h1 className="text-4xl font-semibold text-amber-50 tracking-tight max-w-3xl">
            Best AI Country & Blues Music Generator: Authentic Southern Soundscapes
          </h1>
          <p className="mt-4 text-lg text-amber-200/80 max-w-2xl">
            Generate country and blues tracks that feel real—powered by our v6 model, with micro-timing and harmonic depth built for the soul of Southern music.
          </p>
        </header>

        {/* Sample players – glassmorphism cards */}
        <section className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-xl font-semibold text-amber-50 mb-4">Listen to the vibe</h2>
          <CountryBluesSampleCards tracks={SAMPLE_TRACKS} />
          <p className="mt-4 text-sm text-amber-300/70">
            <Link href="/ai-music-generator" className="text-amber-400 hover:underline">
              Open the AI Music Generator
            </Link>
            {" "}to create your own country and blues tracks.
          </p>
        </section>

        {/* 1. The V6 Advantage */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className={`${glassCard} p-6 sm:p-8`}>
            <h2 className={sectionHeading}>The V6 Advantage: How We Capture the &ldquo;Soul&rdquo; of Blues</h2>
            <p className={`${bodyText} mb-4`}>
              Generic AI music often sounds stiff—every note on the grid, every chord change predictable. Real country and blues live in the <strong className="text-amber-100">micro-timing</strong>: the slight drag behind the beat, the push ahead of the downbeat, and the way phrases breathe. Our v6 model is trained to add these human-like timing adjustments so that blues feels like blues, not a metronome.
            </p>
            <p className={`${bodyText} mb-4`}>
              Beyond rhythm, we focus on <strong className="text-amber-100">harmonic depth</strong>. Blues and country rely on specific chord voicings, passing chords, and the tension between major and minor. The engine is tuned to produce progressions and textures that match the genre—slide guitar character, organ swells, and acoustic fingerpicking that sit in the pocket. The result is Southern soundscapes that feel authentic, not synthetic.
            </p>
            <p className={bodyText}>
              Whether you need a dusty country ballad, a 12-bar blues groove, or a blend of both, the <Link href="/ai-music-generator" className="text-amber-400 hover:underline">AI Music Generator</Link> and this model give you a single place to create royalty-free country and blues music for your projects.
            </p>
          </div>
        </section>

        {/* 2. Example Prompts */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className={`${glassCard} p-6 sm:p-8`}>
            <h2 className={sectionHeading}>Example Prompts for Country & Blues Creators</h2>
            <p className={`${bodyText} mb-6`}>
              Use these prompts in the <Link href="/ai-music-generator" className="text-amber-400 hover:underline">AI Music Generator</Link> to get started. Tweak the mood, tempo, or instruments to match your vision.
            </p>
            <ol className="space-y-3 list-decimal list-inside text-amber-200/90">
              <li className="pl-1">
                <strong className="text-amber-100">Slow country ballad, acoustic guitar and soft piano, open road, 70 BPM, warm and nostalgic.</strong>
              </li>
              <li className="pl-1">
                <strong className="text-amber-100">Delta blues, 12-bar, slide guitar and harmonica, dusty and soulful, medium tempo.</strong>
              </li>
              <li className="pl-1">
                <strong className="text-amber-100">Americana folk-blues, fingerpicked guitar, minimal drums, campfire feel, intimate.</strong>
              </li>
              <li className="pl-1">
                <strong className="text-amber-100">Country shuffle, pedal steel and telecaster, upbeat and twangy, 120 BPM.</strong>
              </li>
              <li className="pl-1">
                <strong className="text-amber-100">Southern soul blues, organ and brass, emotional and powerful, slow build.</strong>
              </li>
            </ol>
          </div>
        </section>

        {/* 3. Monetization Guarantee */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className={`${glassCard} p-6 sm:p-8 border-amber-700/50 bg-amber-950/30`}>
            <h2 className={sectionHeading}>Monetization Guarantee</h2>
            <p className={`${bodyText} mb-4`}>
              Every track you generate with our AI Country & Blues generator is <strong className="text-amber-100">Royalty-Free</strong> for commercial use. You can safely use them on <strong className="text-amber-100">YouTube</strong> and <strong className="text-amber-100">Spotify</strong>—and across other platforms—without paying royalties or risking copyright claims from us. You keep the rights to monetize your channels and releases within the terms of our <Link href="/license" className="text-amber-400 hover:underline">Content License</Link>.
            </p>
            <p className={bodyText}>
              Platform policies (e.g. disclosing AI-generated content where required) still apply; we recommend checking <Link href="/resources/youtube-ai-music-labeling-2026" className="text-amber-400 hover:underline">YouTube AI music labeling</Link> and your distributor’s guidelines. The music itself is cleared for monetization—no extra fees, no surprise claims.
            </p>
          </div>
        </section>

        {/* CTA + related links */}
        <section className="mx-auto max-w-4xl px-4 py-12 text-center">
          <p className="text-amber-300/80 text-sm mb-6">
            <Link href="/" className="text-amber-400 hover:underline">
              Home
            </Link>
            {" · "}
            <Link href="/ai-music-generator" className="text-amber-400 hover:underline">
              AI Music Generator
            </Link>
            {" · "}
            <Link href="/ai-music-tools" className="text-amber-400 hover:underline">
              AI Music Tools
            </Link>
          </p>
          <Link
            href="/ai-music-generator"
            className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-amber-50 hover:bg-amber-500"
          >
            Create country & blues track
          </Link>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
