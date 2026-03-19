import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import Image from "next/image";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { HeroFirstScreen } from "./HeroFirstScreen";

const PAGE_URL = "/ai-music-video-generator";

export async function generateMetadata(): Promise<Metadata> {
  const { getServerSiteConfig, getSubPageMeta } = await import("../../lib/site-config");
  const config = await getServerSiteConfig();
  const { title, description } = getSubPageMeta(config, PAGE_URL, {
    title: "AI Music Video Generator from Lyrics | Best for YouTube 2026",
    description: "Turn lyrics or audio into music videos in seconds. Best AI music video generator for YouTube 2026. Cinematic, Anime, Lo-fi. Royalty-free, 4K export.",
  });
  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: PAGE_URL,
      siteName: config.siteName,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/images/home/hero-card-ai-music-generator.webp",
          width: 1200,
          height: 630,
          alt: `AI Music Video Generator from Lyrics — ${config.siteName} v6`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/home/hero-card-ai-music-generator.webp"],
    },
    alternates: { canonical: `${config.siteUrl}${PAGE_URL}` },
  };
}

const SHOWCASE_ITEMS = [
  { style: "Anime", src: "/images/covers/sample-lofi.webp", alt: "AI music video generator — Anime style output from lyrics" },
  { style: "Cinematic", src: "/images/covers/sample-cinematic.webp", alt: "AI music video generator — Cinematic 4K output for YouTube" },
  { style: "Lo-fi", src: "/images/covers/sample-rnb.webp", alt: "AI music video generator — Lo-fi visual style, royalty-free" },
  { style: "Anime", src: "/images/covers/sample-ambient.webp", alt: "Anime ambient AI music video, generated from audio track" },
  { style: "Cinematic", src: "/images/covers/sample-documentary.webp", alt: "Cinematic AI-generated music video, documentary mood" },
  { style: "Lo-fi", src: "/images/covers/sample-loop.webp", alt: "Lo-fi loop AI music video, suitable for YouTube background" },
];

const FAQ_ITEMS = [
  {
    question: "Which company makes the best AI-generated music videos?",
    answer:
      "The AI Music Generator stands out among the top companies for AI-generated music videos. What separates us isn't a single feature—it's how the v6 Multi-modal Engine connects lyrics, mood, and visual pacing into a coherent result. You get High-definition output and a fully Royalty-free license, so there's no ambiguity when you publish on YouTube or license the clip commercially. See our Content License for full terms.",
  },
  {
    question: "Can I use the AI Music Video Generator for free?",
    answer:
      "Yes. We offer a free tier so you can try generating music videos from your lyrics or audio. Free credits let you explore styles like Anime, Cinematic, and Lo-fi. Paid plans unlock more credits and longer 4K exports. Start with the AI Music Generator or AI Lyrics Generator to create your track, then bring it here.",
  },
  {
    question: "How do I make an AI-generated music video step by step?",
    answer:
      "Start in the AI Music Generator or AI Lyrics Generator to get your track and lyrics. Paste them into the video tool, pick a visual style—Cinematic works well for emotional ballads, Lo-fi for study or ambient content, Anime for upbeat tracks. The v6 Multi-modal Engine maps your beat structure to scene cuts automatically, so what you get is High-definition and already synced. Export is Royalty-free and 4K-ready for YouTube, TikTok, or Instagram.",
  },
  {
    question: "Can I use my own music with this music video maker?",
    answer:
      "Yes. You can paste lyrics you wrote, upload an audio file, or select a track you created in our AI Music Generator. The tool analyzes your music to sync visuals and captions. All outputs are Royalty-free for commercial use under our Content License.",
  },
  {
    question: "What kind of customization options does the AI Music Video Maker offer?",
    answer:
      "You can choose visual themes (Anime, Cinematic, Lo-fi), dynamic caption styles, and alignment. The v6 Multi-modal Engine uses your lyrics and mood to drive scene selection. Export with or without captions and sound waves, in 4K, Royalty-free for YouTube, TikTok, and Instagram.",
  },
  {
    question: "Does the AI Music Video Generator support lyrics and sound waves?",
    answer:
      "Yes. You can generate videos with or without on-screen lyrics and dynamic sound waves. Caption style and alignment are customizable. Outputs are High-definition and Royalty-free. See our AI Lyrics Generator to create lyrics first.",
  },
  {
    question: "Is the content generated royalty-free for commercial use?",
    answer:
      "Yes. Music and video created with The AI Music Generator are Royalty-free and cleared for commercial use—YouTube monetization, TikTok, Instagram, ads, and more. Our Content License spells out the terms; there are no per-use fees or third-party claims.",
  },
  {
    question: "What are the main technical challenges and ethical issues in AI music video generation?",
    answer:
      "The hardest technical problem is keeping audio and visuals in sync—early tools often drifted by several frames, which sounds subtle but is immediately noticeable on a beat-heavy track. Our v6 Multi-modal Engine parses bar and phrase boundaries to keep cuts frame-accurate. On the ethical side, the real issue isn't just copyright—it's disclosure. We build our outputs to be Royalty-free and label them so you can meet YouTube's AI content rules without guesswork. See our Content License for specifics.",
  },
  {
    question: "How long does it take to generate a video with the music video AI generator?",
    answer:
      "Generation time depends on length and style. Short clips often finish in under a minute; full tracks may take a few minutes. The v6 Multi-modal Engine is optimized for speed while keeping High-definition, Royalty-free output and frame-accurate sync.",
  },
  {
    question: "Which AI tools produce the most realistic music video visuals?",
    answer:
      "Realism in AI music videos comes down to two things: whether the visual model understands the emotional texture of the audio, and whether the output resolution holds up on a 4K display. The v6 Multi-modal Engine processes both lyrics and audio features—not just a static image prompt—which is why the scenes feel connected to the music rather than random. All outputs are Royalty-free and High-definition. For the full creation workflow, start with the AI Lyrics Generator, then bring the result here.",
  },
  {
    question: "What makes this the best music video generator online?",
    answer:
      "We combine frame-accurate audio-visual sync (v6 Multi-modal Engine), clear Royalty-free commercial licensing, and a simple workflow: paste lyrics or audio, pick a style, export 4K. No video editing required. That makes it a strong fit for YouTube creators and anyone who needs High-definition, commercially safe music videos quickly.",
  },
] as const;

function schemaText(s: string): string {
  return s
    .replace(/\u2019/g, "'")
    .replace(/\u2014/g, " - ")
    .replace(/\u2013/g, " - ");
}

function getPageSchema() {
  const publishedDate = "2026-01-15";
  const modifiedDate = "2026-03-12";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "AI Music Video Generator", item: `${SITE_URL}${PAGE_URL}` },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${PAGE_URL}#webpage`,
        url: `${SITE_URL}${PAGE_URL}`,
        name: "AI Music Video Generator from Lyrics | Best for YouTube 2026",
        description:
          "Turn lyrics or audio into music videos in seconds. Best for YouTube 2026. Royalty-free, 4K export.",
        datePublished: publishedDate,
        dateModified: modifiedDate,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "The AI Music Generator",
          url: SITE_URL,
        },
        breadcrumb: { "@id": `${SITE_URL}${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "SoftwareApplication",
        name: "The AI Music Generator - Music Video Generator",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        url: `${SITE_URL}${PAGE_URL}`,
        description:
          "AI-powered music video generator from lyrics or audio. Cinematic, Anime, Lo-fi styles. v6 Multi-modal Engine. Frame-accurate audio-visual sync. 4K export for YouTube, TikTok, Instagram. Royalty-free commercial license.",
        screenshot: `${SITE_URL}/images/home/hero-card-ai-music-generator.webp`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "AI music video from lyrics",
          "Cinematic, Anime, Lo-fi visual styles",
          "Frame-accurate audio-visual sync",
          "4K royalty-free export",
          "Commercial use license",
        ],
      },
      {
        "@type": "FAQPage",
        name: "AI Music Video Generator - FAQ",
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

/** Keywords to wrap in <strong> for display (plain text kept for JSON-LD) */
const FAQ_STRONG_PHRASES = ["v6 Multi-modal Engine", "High-definition", "Royalty-free"];

function FAQAnswer({ text }: { text: string }) {
  type Segment = { index: number; end: number; type: "link"; href: string; label: string } | { index: number; end: number; type: "strong"; phrase: string };
  const segments: Segment[] = [];
  const linkPatterns: { pattern: RegExp; href: string; label: string }[] = [
    { pattern: /Content License/g, href: "/license", label: "Content License" },
    { pattern: /AI Music Generator/g, href: "/ai-music-generator", label: "AI Music Generator" },
    { pattern: /AI Lyrics Generator/g, href: "/ai-lyrics-generator", label: "AI Lyrics Generator" },
  ];
  for (const { pattern, href, label } of linkPatterns) {
    const re = new RegExp(pattern.source, "g");
    let m;
    while ((m = re.exec(text)) !== null) {
      segments.push({ index: m.index, end: m.index + m[0].length, type: "link", href, label });
    }
  }
  for (const phrase of FAQ_STRONG_PHRASES) {
    const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    let m;
    while ((m = re.exec(text)) !== null) {
      segments.push({ index: m.index, end: m.index + m[0].length, type: "strong", phrase: m[0] });
    }
  }
  segments.sort((a, b) => a.index - b.index);
  const nodes: ReactNode[] = [];
  let pos = 0;
  for (const seg of segments) {
    if (seg.index < pos) continue;
    nodes.push(text.slice(pos, seg.index));
    if (seg.type === "link") {
      nodes.push(
        <Link key={`${seg.index}-${seg.href}`} href={seg.href} className="text-violet-200 underline underline-offset-2 hover:text-violet-100">
          {seg.label}
        </Link>
      );
    } else {
      nodes.push(<strong key={`${seg.index}-strong`}>{seg.phrase}</strong>);
    }
    pos = seg.end;
  }
  nodes.push(text.slice(pos));
  return <>{nodes}</>;
}

export default function AiMusicVideoGeneratorPage() {
  const schema = getPageSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <SiteHeader hideLandingLinks mobileNavKind="tools" currentPath={PAGE_URL} />

        <HeroFirstScreen />

        {/* Video Showcase — 4–6 格网格 */}
        <section id="showcase" className="border-b border-slate-800/80 bg-slate-950/95 py-14">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 text-center mb-2">
              AI Music Video Examples — Made with The AI Music Generator v6
            </h2>
            <p className="text-slate-400 text-center max-w-xl mx-auto mb-10">
              Each clip below was generated from a real lyrics prompt. Hover to preview. All styles export at 4K and include a royalty-free commercial license.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {SHOWCASE_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="group relative aspect-video rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/40 backdrop-blur-sm"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 33vw"
                    loading="lazy"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/90 bg-white/20 text-white">
                      <svg className="h-7 w-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                  <span className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white/90 drop-shadow-md truncate">
                    {item.style}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="border-b border-slate-800/80 bg-slate-950 py-14">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-2">How to Make an AI Music Video from Lyrics</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10">
              Three steps. No video editing experience needed.
            </p>
            <div className="grid gap-6 md:grid-cols-3 text-left">
              {[
                {
                  step: "1. Upload or Type",
                  text: "Input your lyrics or choose a track. Paste text or connect your existing music from our AI Music Generator.",
                },
                {
                  step: "2. Customize Style",
                  text: "Select visual themes (Anime, Cinematic, Lo-fi) and dynamic caption styles. Our v6 engine understands mood and rhythm.",
                },
                {
                  step: "3. Instant Export",
                  text: "Download 4K videos ready for YouTube, TikTok, or Instagram. Royalty-free, no copyright claims.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-700/80 bg-slate-900/50 backdrop-blur-sm bg-opacity-80 p-6"
                >
                  <h3 className="text-lg font-semibold text-slate-50 mb-2">{item.step}</h3>
                  <p className="text-sm text-slate-200 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Module */}
        <section className="border-b border-slate-800/80 bg-slate-950/95 py-14">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 text-center mb-8">
              AI Music Video Generator Comparison: 2025 Tools vs 2026
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/80">
                    <th className="text-left py-4 px-4 font-semibold text-slate-200">Feature</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-400">Legacy 2025 AI Tools</th>
                    <th className="text-left py-4 px-4 font-semibold text-violet-200">The AI Music Generator (2026)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800/60">
                    <td className="py-3 px-4 font-medium text-slate-100">Audio-visual sync</td>
                    <td className="py-3 px-4">Often off-beat, frame drift</td>
                    <td className="py-3 px-4 text-violet-100">Frame-accurate sync, v6 multi-modal</td>
                  </tr>
                  <tr className="border-b border-slate-800/60">
                    <td className="py-3 px-4 font-medium text-slate-100">Commercial use</td>
                    <td className="py-3 px-4">Unclear or restricted</td>
                    <td className="py-3 px-4 text-violet-100">100% royalty-free, pre-licensed</td>
                  </tr>
                  <tr className="border-b border-slate-800/60">
                    <td className="py-3 px-4 font-medium text-slate-100">Multi-modal understanding</td>
                    <td className="py-3 px-4">Limited lyrics/mood</td>
                    <td className="py-3 px-4 text-violet-100">v6 lyrics + mood + style</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-100">Export quality</td>
                    <td className="py-3 px-4">1080p or lower</td>
                    <td className="py-3 px-4 text-violet-100">4K ready for YouTube / TikTok / IG</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Deep-Dive SEO Article — 小段 + 插图 */}
        <section className="border-b border-slate-800/80 bg-slate-950 py-14">
          <div className="mx-auto max-w-3xl px-4">
            <article className="max-w-none space-y-6 text-base leading-relaxed text-slate-200">
              <h2 className="text-2xl font-semibold text-slate-100">
                Technical Challenges and Ethical Issues in AI Music Video Generation
              </h2>

              <h3 className="text-lg font-semibold text-slate-100 mt-6">The sync problem — and why most tools get it wrong</h3>
              <p>
                The most persistent technical challenge in <strong>AI music video generation</strong> isn&apos;t visual quality—it&apos;s timing. When a scene cut lands even 100ms late on a snare hit, the viewer notices immediately, even if they can&apos;t articulate why.
              </p>
              <p>
                Most 2025-era tools generated visuals independently of the audio timeline, then attempted to align them in post. The result was what researchers call &quot;temporal drift&quot;—where sync errors compound over the duration of a track.
              </p>
              <div className="my-6 rounded-xl overflow-hidden border border-slate-700/80">
                <Image
                  src="/images/home/how-1-describe.webp"
                  alt="Input lyrics or describe mood for AI music video"
                  width={672}
                  height={378}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <p>
                Our approach with the <strong>v6 Multi-modal Engine</strong> was to invert that process: audio analysis runs first. The engine extracts beat positions, phrase boundaries, and emotional arc from the track (or lyrics-derived audio), then builds a scene schedule around those anchors. Caption timing follows the same map.
              </p>
              <p>
                In practice, this keeps cuts within a single frame of the target beat across a standard 3-minute track—a meaningful improvement over tools that treated sync as an afterthought.
              </p>

              <h3 className="text-lg font-semibold text-slate-100 mt-6">What &quot;ethical AI music generation&quot; actually requires</h3>
              <p>
                Ethical concerns in AI-generated music videos cluster around three areas: <strong>training data provenance</strong>, <strong>commercial licensing</strong>, and <strong>platform disclosure</strong>. Each one has a practical dimension that gets overlooked in abstract discussions.
              </p>
              <p>
                On training data: the models underlying our visual generation were trained on licensed datasets. That matters because it&apos;s the foundation of a clean commercial chain—if the model&apos;s training data had unresolved rights, that uncertainty would pass downstream to every output.
              </p>
              <div className="my-6 rounded-xl overflow-hidden border border-slate-700/80">
                <Image
                  src="/images/home/copyright-license.webp"
                  alt="Content license and royalty-free commercial use"
                  width={672}
                  height={378}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <p>
                On licensing: our <Link href="/license" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">Content License</Link> grants royalty-free commercial use for both the audio and video outputs. &quot;Royalty-free&quot; here means no per-use fees and no third-party claims—not just &quot;free to use personally.&quot; That distinction matters when you&apos;re monetizing a YouTube channel or licensing a clip to a brand.
              </p>
              <p>
                On disclosure: YouTube&apos;s 2026 AI content policy requires creators to label realistic AI-generated material. We build our export metadata to include AI generation markers, so you can comply without manually tracking which clips to flag. For a full breakdown of how this affects monetization, see our <Link href="/resources/monetize-ai-music-2026" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">Monetize AI Music 2026</Link> guide.
              </p>

              <h3 className="text-lg font-semibold text-slate-100 mt-6">Why the &quot;best AI music video generator&quot; question doesn&apos;t have a single answer</h3>
              <p>
                When people search for the <strong>best AI music video generator for YouTube 2026</strong>, they&apos;re usually asking about one of three things: output realism, licensing clarity, or workflow speed.
              </p>
              <p>
                A tool optimized for photorealistic scenes may produce stunning output but require manual licensing review. A tool optimized for speed may generate in 30 seconds but at 1080p with uncertain commercial terms.
              </p>
              <div className="my-6 rounded-xl overflow-hidden border border-slate-700/80">
                <Image
                  src="/images/home/how-2-ai-compose.webp"
                  alt="AI composes music and video in sync"
                  width={672}
                  height={378}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <p>
                Our position is that the <strong>best tool for YouTube creators specifically</strong> is one that resolves all three: visual quality sufficient for a 4K timeline, a license you can rely on for monetized content, and a workflow that doesn&apos;t require video editing expertise. That&apos;s the design goal behind this generator—not a universal claim, but a deliberate choice about which creators we&apos;re built for.
              </p>
            </article>
          </div>
        </section>

        {/* FAQ: each question as H3 for outline; footer uses non-heading so no H3 there */}
        <section id="faq" className="border-b border-slate-800/80 bg-slate-950/95 py-14">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 text-center mb-8">FAQ</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question}>
                  <h3 className="sr-only">{item.question}</h3>
                  <details
                    className="rounded-2xl border border-slate-700/80 bg-slate-900/50 backdrop-blur-sm bg-opacity-80 p-4"
                  >
                    <summary className="cursor-pointer text-base font-semibold text-slate-50">
                      {item.question}
                    </summary>
                    <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                      <FAQAnswer text={item.answer} />
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Linking Footer */}
        <section className="bg-slate-950 py-10">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-slate-400 text-sm mb-6">
              <Link href="/free-ai-lofi-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">Free AI Lofi Generator</Link>
              {" · "}
              <Link href="/ai-lyrics-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Lyrics Generator</Link>
              {" · "}
              <Link href="/ai-music-tools" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Tools</Link>
              {" · "}
              <Link href="/ai-music-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Generator</Link>
              {" · "}
              <Link href="/pricing" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">Pricing</Link>
            </p>
            <Link
              href="/ai-music-generator"
              className="inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500"
            >
              Start creating music &amp; videos
            </Link>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
