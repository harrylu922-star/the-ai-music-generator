"use client";

const GENERATOR_ID = "generator";

export function HeroSection() {
  const scrollToGenerator = () => {
    const el = document.getElementById(GENERATOR_ID);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="shrink-0 border-b border-slate-700/50 bg-slate-900/40 py-10 md:py-14">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-slate-500">
          Lyrics to Music
        </p>
        <p className="text-xl font-semibold text-slate-100 sm:text-2xl md:text-3xl">
          Your Lyrics, Our Melody.
        </p>
        <p className="mt-3 text-slate-400 sm:text-lg">
          Turn your words into songs with the 2026 v6 model — paste lyrics, get a full track.
        </p>
        <button
          type="button"
          onClick={scrollToGenerator}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-violet-500 hover:shadow-violet-500/25"
        >
          <span>Paste Your Lyrics</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
