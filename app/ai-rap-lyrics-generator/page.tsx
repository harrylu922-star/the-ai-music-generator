import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { getRapFaqJsonLd, RAP_FAQ } from "./rap-faq-ld";

export const metadata: Metadata = {
  title: { absolute: "Free AI Rap Lyrics & Beat Generator | Write Rap Online" },
  description:
    "Free rap generator: write rap and hip hop lyrics with AI, then generate a beat or full song. Lyrics + beat in one tool. No signup—create rap music in seconds.",
};

export default function AiRapLyricsGeneratorPage() {
  const faqLd = getRapFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <SiteHeader />

        {/* Hero */}
        <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl">
              Free AI Rap Lyrics Generator
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Free rap generator for lyrics and beats: create rap and hip hop lyrics with AI, then turn them into a full track. Our AI rap lyrics generator and rap beat generator work together—no signup, no install.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/ai-lyrics-generator"
                className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-base font-semibold text-white shadow-[0_0_28px_rgba(139,92,246,0.5)] hover:bg-violet-400 transition"
              >
                Write Rap Lyrics Now
              </Link>
              <Link
                href="/ai-music-generator"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800/60 px-6 py-3 text-base font-medium text-slate-200 hover:border-violet-500/50 hover:text-violet-200 transition"
              >
                Make a Rap Beat
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-semibold text-slate-100 mb-8 text-center">
              How the rap generator works
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 font-semibold text-lg mb-3">1</span>
                <h3 className="font-semibold text-slate-100 mb-1">Enter your topic or vibe</h3>
                <p className="text-sm text-slate-400">Type a theme—street life, success, party, story—or a few keywords. The AI rap lyrics generator uses this to write your verses and hooks.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 font-semibold text-lg mb-3">2</span>
                <h3 className="font-semibold text-slate-100 mb-1">Choose style and structure</h3>
                <p className="text-sm text-slate-400">Select Hip Hop, Trap, or other styles. Pick a structure (verse/chorus, verse/chorus/bridge). The hip hop lyrics generator adapts to your choice.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 font-semibold text-lg mb-3">3</span>
                <h3 className="font-semibold text-slate-100 mb-1">Generate and edit lyrics</h3>
                <p className="text-sm text-slate-400">Click generate. Edit the lines, reorder verses, or use it as a freestyle rap generator starting point. Copy or paste into our music tool next.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 font-semibold text-lg mb-3">4</span>
                <h3 className="font-semibold text-slate-100 mb-1">Get a rap beat or full song</h3>
                <p className="text-sm text-slate-400">Use our <Link href="/ai-music-generator" className="text-violet-300 hover:underline">AI music generator</Link> as a rap beat generator or rap music generator: paste your lyrics or describe the beat and get a full track.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="text-2xl font-semibold text-slate-100 mb-6 text-center">
              Who the rap lyrics generator is for
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Our free rap generator is built for rappers, MCs, content creators, and anyone who wants to write rap or hip hop lyrics quickly. Use it as a <strong className="text-slate-100">rap verse generator</strong> for single verses, a <strong className="text-slate-100">freestyle rap generator</strong> for ideas, or a full <strong className="text-slate-100">rap music generator</strong> when you pair it with our AI music tool. Whether you need a hook, a verse outline, or a complete song structure, the online rap generator gives you a starting point you can edit and make your own.
            </p>
            <p className="text-slate-300 leading-relaxed">
              No music production experience needed. If you can describe the vibe or topic, the AI rap lyrics generator and rap beat generator handle the rest. Try the <Link href="/ai-lyrics-generator" className="text-violet-300 hover:underline">AI Lyrics Generator</Link> for rap and hip hop, then the <Link href="/ai-music-generator" className="text-violet-300 hover:underline">AI Music Generator</Link> for your beat or full song.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="text-2xl font-semibold text-slate-100 mb-6 text-center">
              Why use this AI rap generator
            </h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <span className="text-violet-400 shrink-0" aria-hidden>✓</span>
                <div>
                  <strong className="text-slate-100">Free and online.</strong> The rap lyrics generator and rap beat generator are free to use in your browser. No download, no signup required to start.
                </div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <span className="text-violet-400 shrink-0" aria-hidden>✓</span>
                <div>
                  <strong className="text-slate-100">Lyrics and beats in one place.</strong> Write with the AI rap lyrics generator, then create a beat or full track with our <Link href="/ai-music-generator" className="text-violet-300 hover:underline">rap beat generator</Link> and <strong className="text-slate-100">ai rap song generator</strong> workflow.
                </div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <span className="text-violet-400 shrink-0" aria-hidden>✓</span>
                <div>
                  <strong className="text-slate-100">Multiple styles.</strong> Hip Hop, Trap, and more. The hip hop lyrics generator and rap verse generator support different structures so you can match your flow.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-slate-800 bg-slate-950" id="faq">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="text-2xl font-semibold text-slate-100 mb-8 text-center">
              Rap generator FAQ
            </h2>
            <div className="space-y-3">
              {RAP_FAQ.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
                >
                  <summary className="cursor-pointer text-base font-semibold text-slate-50">
                    {item.question}
                  </summary>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA block */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-4xl px-4 py-14 text-center">
            <h2 className="text-2xl font-semibold text-slate-100 mb-2">
              Ready to write rap lyrics with AI?
            </h2>
            <p className="text-slate-400 mb-6">
              Free rap generator—no signup. Create lyrics, then get a beat or full song.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/ai-lyrics-generator"
                className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-base font-semibold text-white shadow-[0_0_28px_rgba(139,92,246,0.5)] hover:bg-violet-400 transition"
              >
                Write Rap Lyrics Now
              </Link>
              <Link
                href="/ai-music-generator"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-base font-medium text-slate-200 hover:border-violet-500/50 hover:text-violet-200 transition"
              >
                Make a Rap Beat
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
