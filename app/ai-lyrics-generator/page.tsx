import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "../../components/SiteHeader";
import { LANDING_PAGES } from "../../components/LandingNav";
import { DualLayerWrapper } from "../../components/DualLayerWrapper";
import { LyricsGeneratorWorkspace } from "./LyricsGeneratorWorkspace";
import { LyricsFooter } from "./LyricsFooter";
import { getJsonLdScript, FAQ_ITEMS } from "./json-ld";

const PAGE_URL = "/ai-lyrics-generator";
const OG_IMAGE = "/images/home/hero-card-ai-lyrics-generator.jpg";

export const metadata: Metadata = {
  title: "Free AI Lyrics Generator | Write Song Lyrics in Seconds",
  description: "Create original song lyrics in seconds with our free AI lyrics generator. Perfect for songwriters, rappers & creators. Pick mood, structure & style—then turn lyrics into music.",
  keywords: ["AI lyrics generator", "free AI song lyrics", "write song lyrics with AI", "AI songwriting", "lyrics generator for rappers"],
  openGraph: {
    title: "Free AI Lyrics Generator | Write Song Lyrics in Seconds",
    description: "Create original lyrics in seconds. For songwriters, rappers & creators. Pick mood & style—then turn lyrics into music.",
    url: PAGE_URL,
    siteName: "The AI Music Generator",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "AI Lyrics Generator - Write song lyrics with AI" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Lyrics Generator | Write Song Lyrics in Seconds",
    description: "Create original lyrics in seconds. For songwriters, rappers & creators. Turn lyrics into music.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: PAGE_URL },
};

export default function AiLyricsGeneratorPage() {
  const jsonLd = getJsonLdScript();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.softwareApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.itemList) }}
      />

      <DualLayerWrapper cookieKey="lyrics_app_mode">
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
                    const isActive = href === "/ai-lyrics-generator";
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
              <LyricsGeneratorWorkspace />
            </div>
          </div>

          {/* SEO content: only visible when scrolling (Landing Mode). Same color system, rounded, no harsh borders. */}
          <div className="bg-slate-950/80 rounded-t-3xl overflow-hidden">
            <div className="mx-auto max-w-3xl px-4 py-12 text-slate-300">
              <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
                <div className="relative mb-6 aspect-[2/1] max-w-2xl overflow-hidden rounded-xl">
                  <Image src="/images/home/hero-card-ai-lyrics-generator.webp" alt="AI Lyrics Generator - Write song lyrics with AI" fill className="object-cover" sizes="(max-width: 768px) 100vw, 672px" priority unoptimized />
                </div>
                <h2 className="mb-4 text-2xl font-semibold text-slate-100">How the AI Lyrics Generator Works</h2>
                <p className="mb-4 leading-relaxed">
                  Our AI lyrics generator uses advanced language models to create original song lyrics from your prompts. You start by entering a theme, a mood, or a key phrase—even a single word works. Then you choose options like structure (verse/chorus or verse/chorus/bridge), style (pop, hip hop, rock, R&B), and language. Within seconds, the AI produces full lyrics that you can edit, refine, and make your own. There is no need for musical training; the tool is built for everyone from first-time writers to professional songwriters who want to beat writer&apos;s block and explore new ideas quickly.
                </p>
                <p className="leading-relaxed">
                  The generator is free to use and runs in your browser. You can generate as many drafts as you like, change the mood and style between runs, and copy or download the results. Many users combine the AI lyrics generator with our AI music generator: they create lyrics here, then turn them into a full song with melody and production on the music generator page. This end-to-end workflow from text to finished track is one of the most popular ways to use our suite of AI music tools.
                </p>
              </section>

              <section className="mb-12 rounded-2xl bg-slate-800/30 p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-semibold text-slate-100">AI Lyrics Generator for Rappers and MCs</h2>
                <p className="mb-4 leading-relaxed">
                  Rappers and MCs can use the AI lyrics generator to get fresh rhyme schemes, punchlines, and verse ideas in seconds. We have a dedicated <Link href="/ai-rap-lyrics-generator" className="text-violet-400 hover:underline">rap lyrics generator and rap generator</Link> page for rap and hip hop. Enter a topic or a vibe—for example, &quot;street life&quot;, &quot;success story&quot;, or &quot;party anthem&quot;—and select a structure that fits your flow. The AI outputs lines you can flip, rewrite, or use as a springboard for your own bars. Whether you need a hook, a verse outline, or a full song structure, the generator helps you stay productive and experiment with different angles without staring at a blank page. Combine it with our AI music generator to create beats and full tracks that match your lyrics.
                </p>
                <p className="leading-relaxed">
                  The tool supports multiple styles, so you can generate lyrics that lean toward trap, boom-bap, melodic rap, or other subgenres. You keep full creative control: the AI is a writing partner, not a replacement. Many artists use the generated lines as a starting point and then personalize every word to match their voice and flow. The result is original content that still feels true to your brand and sound.
                </p>
              </section>

              <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-semibold text-slate-100">AI Lyrics Generator for YouTubers and Content Creators</h2>
                <p className="mb-4 leading-relaxed">
                  YouTubers and content creators often need original lyrics for intros, outros, parodies, or full songs. Our AI lyrics generator is built for this: you describe the theme or mood (e.g. &quot;funny gaming anthem&quot;, &quot;emotional vlog outro&quot;), pick a structure and style, and get ready-to-use lyrics in seconds. You can generate multiple versions and mix lines from different runs until you have the perfect fit. The lyrics are original and free to use within our terms of service, so you can focus on recording and editing instead of struggling with writer&apos;s block.
                </p>
                <p className="leading-relaxed">
                  Once you have your lyrics, you can turn them into a full song using our AI music generator. Many creators use the lyrics generator for the words and the music generator for the backing track and melody, then record their own vocals or use the AI vocals. This workflow saves time and keeps your content unique without requiring a full production team. The combination of AI lyrics and AI music is especially popular for channels that publish music, comedy songs, or branded jingles on a regular schedule.
                </p>
              </section>

              <section className="mb-12 rounded-2xl bg-slate-800/30 p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-semibold text-slate-100">AI Lyrics Generator for Songwriters</h2>
                <p className="mb-4 leading-relaxed">
                  Songwriters can use the AI lyrics generator to break through writer&apos;s block and explore new themes and structures. Whether you write pop, country, rock, or R&B, you start by entering a prompt—a feeling, a story idea, or a phrase—and the AI generates verses, choruses, and bridges that you can edit and make your own. The tool supports different song structures (e.g. verse/chorus, verse/chorus/bridge) and moods (romantic, upbeat, melancholic, inspiring), so you can steer the output toward the kind of song you have in mind. Many professional songwriters use it as a brainstorming tool: they generate several drafts, take the best lines, and rewrite the rest to fit their style.
                </p>
                <p className="leading-relaxed">
                  Because the lyrics are generated in plain text, you can paste them into any other software or use them with our AI music generator to get a full demo. This is especially useful when you want to hear how a lyric set might sound with a melody before committing to a full arrangement. The AI lyrics generator does not replace your creativity; it gives you a fast first draft so you can spend more time on what matters: refining the message and the melody.
                </p>
              </section>

              <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
                <div className="relative mb-6 aspect-video max-w-xl overflow-hidden rounded-xl">
                  <Image src="/images/home/explore-idea-starters.webp" alt="AI lyrics ideas and inspiration" fill className="object-cover" sizes="(max-width: 768px) 100vw, 576px" loading="lazy" unoptimized />
                </div>
                <h2 className="mb-4 text-2xl font-semibold text-slate-100">Showcase: Example Lyrics from the AI Lyrics Generator</h2>
                <p className="mb-4 leading-relaxed">
                  The AI lyrics generator can produce a wide range of styles, from emotional ballads to upbeat anthems. Example outputs include titles like &quot;The Words Unsaid&quot;, &quot;My Urgent Condition&quot;, and &quot;Take Your Breath Away&quot;—each with full verse and chorus structures. These examples are generated from simple prompts (e.g. &quot;lost love&quot;, &quot;night drive&quot;, &quot;first meeting&quot;) and can be edited or used as inspiration. You can try the same prompts on the generator above and compare results; the AI often produces different variations each time, so you can run it multiple times until you find a draft you like. All showcase lyrics are for demonstration and can be replaced by your own prompts and settings.
                </p>
                <p className="leading-relaxed">
                  We recommend experimenting with different moods and structures to see how the AI adapts. For instance, &quot;romantic&quot; and &quot;verse/chorus/bridge&quot; tend to produce longer, more narrative lyrics, while &quot;upbeat&quot; and &quot;pop&quot; often yield catchier, shorter phrases. The generator is free, so you can explore as many combinations as you need. Once you have lyrics you are happy with, use our AI music generator to turn them into a full song and complete your creative workflow from text to track.
                </p>
              </section>

              {/* FAQ: must match JSON-LD exactly */}
              <section className="mb-12 rounded-2xl bg-slate-800/30 p-6 md:p-8" id="faq">
                <h2 className="mb-6 text-2xl font-semibold text-slate-100">Frequently Asked Questions About the AI Lyrics Generator</h2>
                <div className="space-y-4">
                  {FAQ_ITEMS.map((item) => (
                    <div key={item.question} className="rounded-2xl bg-slate-900/50 p-4 md:p-5">
                      <h3 className="mb-2 text-base font-semibold text-slate-100">{item.question}</h3>
                      <p className="text-sm leading-relaxed text-slate-300">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <LyricsFooter />
        </main>
      </DualLayerWrapper>
    </>
  );
}
