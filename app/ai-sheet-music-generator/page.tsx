import type { Metadata } from "next";
import Link from "@/components/Link";
import Image from "next/image";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { LANDING_PAGES } from "../../components/LandingNav";
import { DualLayerWrapper } from "../../components/DualLayerWrapper";
import { SheetMusicGeneratorWorkspace } from "./SheetMusicGeneratorWorkspace";
import { SheetMusicFirstScreenLock } from "./SheetMusicFirstScreenLock";
import { getJsonLdScript, FAQ_ITEMS } from "./json-ld";
import { Suspense } from "react";

const PAGE_URL = "/ai-sheet-music-generator";
const OG_IMAGE = "/images/home/hero-card-ai-music-generator.jpg";

export const metadata: Metadata = {
  title: { absolute: "AI Sheet Music Generator: Precision Transcription (2026)" },
  description:
    "Turn audio into piano notation and sheet music. V6 engine handles polyphony and velocity. MIDI & PDF export for composers (2026).",
  openGraph: {
    title: "AI Sheet Music Generator: Precision Transcription (2026)",
    description:
      "Turn audio into piano notation and sheet music. V6 engine: polyphony, velocity. MIDI & PDF for composers (2026).",
    url: PAGE_URL,
    siteName: "The AI Music Generator",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "AI Sheet Music Generator - Piano notation from audio" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Sheet Music Generator: Precision Transcription (2026)",
    description: "Turn audio into piano notation. V6 engine. MIDI & PDF for composers (2026).",
    images: [OG_IMAGE],
  },
  alternates: { canonical: PAGE_URL },
};

export default function AiSheetMusicGeneratorPage() {
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

      <DualLayerWrapper cookieKey="ai_sheet_music_generator_app_mode">
        <main className="flex min-h-screen flex-col text-slate-50">
          <SiteHeader hideLandingLinks mobileNavKind="tools" currentPath={PAGE_URL} />

          {/* 三区域：侧栏 + 工作区；整页上提，CTA 一屏内 */}
          <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] min-h-0 overflow-hidden shrink-0">
            {/* 区域一：Tools 侧栏 — 仅大屏显示 */}
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

            {/* 区域二：工作区 — 左侧操作面板 + 右侧预览 */}
            <div className="flex flex-1 min-w-0 min-h-0">
              <Suspense
                fallback={
                  <div className="flex flex-1 items-center justify-center bg-slate-900/50 text-slate-400 text-sm">
                    Loading…
                  </div>
                }
              >
                <SheetMusicGeneratorWorkspace />
              </Suspense>
            </div>
          </div>

          <SheetMusicFirstScreenLock>
          <div className="bg-slate-950/80 rounded-t-3xl overflow-hidden">
            <div className="mx-auto max-w-3xl px-4 py-12 text-slate-200">
              <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8">
                <h2 className="mb-6 text-2xl sm:text-3xl font-semibold text-slate-100">How the AI Sheet Music Generator Works</h2>
                <p className="mb-6 text-base leading-relaxed">
                  Turn any audio into precise <strong className="text-slate-100">piano notation</strong> and sheet music in three steps.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4 rounded-2xl bg-slate-800/40 p-4">
                    <div className="h-28 w-28 shrink-0 rounded-xl overflow-hidden border border-slate-700">
                      <Image src="/images/home/how-1-describe-192.webp" alt="Upload or describe audio for sheet music" width={112} height={112} className="h-full w-full object-cover" unoptimized />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-slate-100 mb-1">1. Upload audio</h3>
                      <p className="text-base leading-relaxed">Drop or select a recording (WAV, MP3, M4A). The converter accepts performances, sketches, or full arrangements.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-2xl bg-slate-800/40 p-4">
                    <div className="h-28 w-28 shrink-0 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                      <span className="text-2xl font-bold text-violet-400/80">V6</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-slate-100 mb-1">2. V6 engine transcribes</h3>
                      <p className="text-base leading-relaxed">Our Multi-modal Transcription Engine handles complex polyphony and velocity layers for accurate piano notation.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-2xl bg-slate-800/40 p-4">
                    <div className="h-28 w-28 shrink-0 rounded-xl overflow-hidden border border-slate-700">
                      <Image src="/images/home/how-3-export-192.webp" alt="Export notation and MIDI" width={112} height={112} className="h-full w-full object-cover" unoptimized />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-slate-100 mb-1">3. Export notation & MIDI</h3>
                      <p className="text-base leading-relaxed">Download piano notation, MIDI, or PDF sheet music. Use in DAWs, Sibelius, Finale, MuseScore, and more.</p>
                    </div>
                  </div>
                </div>
                <Link href={PAGE_URL} className="mt-6 inline-flex rounded-full bg-violet-600 px-6 py-2.5 text-base font-semibold text-white hover:bg-violet-500 transition">
                  Try Audio to Notation
                </Link>
              </section>

              <section className="mb-12 rounded-2xl bg-slate-800/30 p-6 md:p-8">
                <h2 className="mb-4 text-2xl sm:text-3xl font-semibold text-slate-100">V6 Multi-modal Transcription Engine</h2>
                <div className="my-6 rounded-xl overflow-hidden border border-slate-700/80">
                  <Image
                    src="/images/home/how-2-ai-compose-192.webp"
                    alt="V6 Multi-modal Transcription Engine for piano notation"
                    width={672}
                    height={378}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                <p className="mb-4 text-base leading-relaxed text-slate-300">
                  Our AI sheet music generator is powered by the <strong className="text-slate-100">V6 Multi-modal Transcription Engine</strong>. It handles <strong className="text-slate-100">complex polyphony</strong> and <strong className="text-slate-100">velocity layers</strong>, so multi-voice piano pieces, dense arrangements, and subtle dynamics are transcribed into precise notation—not just single-note approximations. Whether you’re capturing a live performance, a sketch, or a full arrangement, the engine preserves timing, articulation, and expression for clean piano notation and reliable MIDI export. Built for 2026 workflows: composers, arrangers, and educators get publication-ready sheet music from audio in one step.
                </p>
                <Link href={PAGE_URL} className="inline-block text-base font-medium text-violet-200 underline underline-offset-2 hover:text-violet-100">
                  Open AI Sheet Music Generator →
                </Link>
              </section>

              <section className="mb-12 rounded-2xl bg-slate-900/40 p-6 md:p-8" id="faq">
                <h2 className="mb-6 text-2xl sm:text-3xl font-semibold text-slate-100">Frequently Asked Questions</h2>
                <div className="space-y-2">
                  {FAQ_ITEMS.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-2xl bg-slate-800/40 overflow-hidden"
                    >
                      <summary className="list-none cursor-pointer p-4 md:p-5 text-slate-100 hover:bg-slate-800/60 transition [&::-webkit-details-marker]:hidden flex items-center justify-between gap-2">
                        <h3 className="text-base font-semibold m-0 flex-1">{item.question}</h3>
                        <span className="shrink-0 text-slate-400 group-open:rotate-180 transition-transform" aria-hidden>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </span>
                      </summary>
                      <div className="px-4 pb-4 md:px-5 md:pb-5 pt-0">
                        <p className="text-base leading-relaxed text-slate-200">{item.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-slate-800/30 p-8 text-center">
                <h2 className="mb-2 text-xl sm:text-2xl font-semibold text-slate-100">Ready to transcribe?</h2>
                <p className="mb-4 text-base text-slate-400">Turn recordings into piano notation and sheet music with one click.</p>
                <Link href={PAGE_URL} className="inline-flex rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white hover:bg-violet-500 transition">
                  Try AI Sheet Music Generator
                </Link>
              </section>
            </div>
          </div>

          <SiteFooter />
          </SheetMusicFirstScreenLock>
        </main>
      </DualLayerWrapper>
    </>
  );
}
