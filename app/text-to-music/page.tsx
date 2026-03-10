import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { LANDING_PAGES } from "../../components/LandingNav";
import { DualLayerWrapper } from "../../components/DualLayerWrapper";
import { TextToMusicWorkspace } from "./TextToMusicWorkspace";

const PAGE_URL = "/text-to-music";
const OG_IMAGE = "/images/home/hero-card-ai-music-generator.jpg";

export const metadata: Metadata = {
  title: "Text to Music | Turn Words into Songs with AI",
  description: "Convert text descriptions into full music tracks with our free AI. Describe genre, mood, instruments, and atmosphere—get original songs in seconds. No music theory required.",
  keywords: ["text to music", "AI text to music", "turn text into music", "free AI music generator", "describe music get song"],
  openGraph: {
    title: "Text to Music | Turn Words into Songs with AI",
    description: "Convert text descriptions into full music tracks with our free AI. Describe genre, mood, instruments—get original songs in seconds.",
    url: PAGE_URL,
    siteName: "The AI Music Generator",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Text to Music - Turn words into songs with AI" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to Music | Turn Words into Songs with AI",
    description: "Convert text descriptions into full music tracks. Original songs in seconds. No music theory required.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: PAGE_URL },
};

export default function TextToMusicPage() {
  return (
    <DualLayerWrapper cookieKey="text_to_music_app_mode">
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
                  const isActive = href === "/text-to-music";
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

          {/* 生成工作区：与 ai-music-generator 一致，右侧区域结构相同 */}
          <div className="flex flex-1 min-w-0 min-h-0">
            <Suspense fallback={<div className="flex flex-1 items-center justify-center bg-slate-900/50 text-slate-400 text-sm">Loading…</div>}>
              <TextToMusicWorkspace />
            </Suspense>
          </div>
        </div>

        {/* SEO content: 同色系、圆角、无硬线 */}
        <div className="bg-slate-950/80 rounded-t-3xl overflow-hidden">
          <div className="mx-auto max-w-3xl px-4 py-12 text-slate-300">
            <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
              <div className="relative mb-6 aspect-[2/1] max-w-2xl overflow-hidden rounded-xl">
                <Image src="/images/home/hero-card-ai-music-generator.jpg" alt="Text to Music - Turn words into songs with AI" fill className="object-cover" sizes="(max-width: 768px) 100vw, 672px" priority unoptimized />
              </div>
              <h2 className="mb-4 text-2xl font-semibold text-slate-100">How Text to Music Works</h2>
              <p className="mb-4 leading-relaxed">
                Our text-to-music tool turns written descriptions into full music tracks using AI. You describe what you want—genre, mood, instruments, atmosphere—in plain language. For example: &quot;Upbeat pop with acoustic guitar and warm vocals, summer vibes&quot; or &quot;Dark cinematic strings for a thriller.&quot; The AI generates an original track that matches your prompt. No music theory or production skills are required; the tool is built for creators, filmmakers, game developers, and anyone who needs custom music quickly.
              </p>
              <p className="leading-relaxed">
                The generator is free to use in your browser. You can create as many tracks as you like, tweak your prompt or add genre and mood tags, and download the results. Many users combine text-to-music with our AI lyrics generator: write lyrics first, then turn them into a full song with melody and production here. This workflow from text to finished track is one of the most popular ways to use our AI music suite.
              </p>
            </section>

            <section className="mb-12 rounded-2xl bg-slate-800/30 p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-semibold text-slate-100">Text to Music for Content Creators and YouTubers</h2>
              <p className="mb-4 leading-relaxed">
                Content creators and YouTubers often need original background music for intros, outros, vlogs, and branded content. Our text-to-music generator is built for this: you describe the vibe (e.g. &quot;chill lofi for studying&quot;, &quot;epic trailer music&quot;, &quot;upbeat tech review&quot;), and get a unique track in seconds. The music is original and free to use within our terms, so you can focus on your content instead of licensing or copyright issues. You can generate multiple versions and pick the one that fits best.
              </p>
              <p className="leading-relaxed">
                Once you have your track, you can pair it with AI-generated lyrics from our lyrics generator for full songs, or use it as instrumental backing. Many creators use text-to-music for consistent channel sound—same mood and style across videos—without hiring a producer or buying stock music.
              </p>
            </section>

            <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-semibold text-slate-100">Text to Music for Filmmakers and Game Developers</h2>
              <p className="mb-4 leading-relaxed">
                Filmmakers and game developers need custom music that fits specific scenes, characters, or moods. Our text-to-music tool lets you describe exactly what you need: &quot;Tense orchestral build for a chase scene,&quot; &quot;Peaceful piano for a village,&quot; or &quot;Retro 8-bit dungeon theme.&quot; The AI produces original cues you can edit and layer. There is no need to search through royalty-free libraries; you get a track tailored to your description. Many indie teams use it for prototypes and demos before commissioning final scores.
              </p>
              <p className="leading-relaxed">
                The tool supports a wide range of genres and moods—from classical and ambient to EDM and hip hop—so you can maintain a consistent sound or experiment with different styles. You keep full creative control: the AI is a starting point, and you can regenerate until the result matches your vision.
              </p>
            </section>

            <section className="mb-12 rounded-2xl bg-slate-800/30 p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-semibold text-slate-100">Text to Music for Songwriters and Musicians</h2>
              <p className="mb-4 leading-relaxed">
                Songwriters and musicians can use text-to-music to quickly sketch ideas or get out of a creative rut. Describe the song you have in mind—&quot;Melancholic ballad with piano and strings,&quot; &quot;Funky bass-driven groove,&quot; or &quot;Minimal electronic with arpeggios&quot;—and the AI generates a draft you can build on. You can then add your own lyrics (from our AI lyrics generator or your own), re-record parts, or use the track as a backing for live performance. The generator is especially useful for trying out genres or arrangements before committing to a full production.
              </p>
              <p className="leading-relaxed">
                Because the output is generated from your text, you can iterate fast: change a few words in your prompt and get a new variation. Many artists use it as a brainstorming partner—generating several drafts, picking the best elements, and then refining in their DAW or with our other AI music tools. The result is original music that still feels true to your vision.
              </p>
            </section>

            <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
              <div className="relative mb-6 aspect-video max-w-xl overflow-hidden rounded-xl">
                <Image src="/images/home/explore-idea-starters.jpg" alt="Get inspired - text to music idea starters" fill className="object-cover" sizes="(max-width: 768px) 100vw, 576px" unoptimized />
              </div>
              <h2 className="mb-4 text-2xl font-semibold text-slate-100">Showcase: Example Outputs from Text to Music</h2>
              <p className="mb-4 leading-relaxed">
                The text-to-music generator can produce a wide range of styles, from progressive house and lofi to neo-soul and folk. Example outputs include tracks like &quot;Progressive House Anthem&quot;, &quot;Cold Mysterious Lofi&quot;, &quot;Neo-Soul R&B Groove&quot;, and &quot;Chill Folk-Country&quot;—each generated from simple text prompts. You can try similar descriptions in the generator above; the AI often produces different variations each time, so you can run it multiple times until you find a track you like. All showcase tracks are for demonstration and can be replaced by your own prompts and settings.
              </p>
              <p className="leading-relaxed">
                We recommend experimenting with genre and mood tags to steer the output. For instance, &quot;EDM&quot; plus &quot;Festive&quot; tends to yield upbeat club-style tracks, while &quot;Folk&quot; plus &quot;Gentle&quot; often produces acoustic, relaxed music. The generator is free, so you can explore as many combinations as you need. Once you have a track you are happy with, you can combine it with our AI lyrics generator to add vocals and complete your creative workflow from text to song.
              </p>
            </section>

            <section className="mb-12 rounded-2xl bg-slate-800/30 p-6 md:p-8" id="faq">
              <h2 className="mb-6 text-2xl font-semibold text-slate-100">Frequently Asked Questions About Text to Music</h2>
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-900/50 p-4 md:p-5">
                  <h3 className="mb-2 text-base font-semibold text-slate-100">What is text to music?</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Text to music is an AI feature that turns a written description into a full music track. You describe the genre, mood, instruments, or atmosphere in words, and the AI generates an original song that matches your prompt. No musical training or production software is required.</p>
                </div>
                <div className="rounded-2xl bg-slate-900/50 p-4 md:p-5">
                  <h3 className="mb-2 text-base font-semibold text-slate-100">Is the text-to-music generator free?</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Yes. You can use the text-to-music generator for free in your browser. You can create multiple tracks, change your prompt or tags between runs, and download the results. Some advanced features or higher limits may be available on paid plans.</p>
                </div>
                <div className="rounded-2xl bg-slate-900/50 p-4 md:p-5">
                  <h3 className="mb-2 text-base font-semibold text-slate-100">How do I get the best results from text to music?</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Be specific in your prompt: include genre, mood, instruments, and atmosphere (e.g. &quot;Upbeat pop with acoustic guitar and warm vocals, summer vibes&quot;). Use the genre and mood tags to reinforce your description. You can also try &quot;instrumental only&quot; if you want a track without vocals. Generating a few variations and picking the best one often yields the best result.</p>
                </div>
                <div className="rounded-2xl bg-slate-900/50 p-4 md:p-5">
                  <h3 className="mb-2 text-base font-semibold text-slate-100">Can I use text-to-music with the AI lyrics generator?</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Yes. Many users create lyrics with our AI lyrics generator, then turn them into a full song with melody and production using the text-to-music or AI music generator. This end-to-end workflow from text to finished track is one of the most popular ways to use our tools.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <SiteFooter />
      </main>
    </DualLayerWrapper>
  );
}
