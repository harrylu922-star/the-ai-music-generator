"use client";

const GENERATOR_ID = "generator";

export function HeroSection() {
  const scrollToGenerator = () => {
    const el = document.getElementById(GENERATOR_ID);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden border-b border-amber-200/30 bg-gradient-to-b from-amber-50/80 to-transparent py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-800/70">
          AI Music Generator from Lyrics
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-stone-800 sm:text-5xl md:text-6xl">
          Your Lyrics, Our Melody.
        </h1>
        <p className="mt-4 text-lg text-stone-600 sm:text-xl">
          Turn your words into songs with the 2026 v6 model — built for creators who have the lyrics and need the tune.
        </p>
        <button
          type="button"
          onClick={scrollToGenerator}
          className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-amber-700/40 bg-amber-100/90 px-6 py-3 font-medium text-amber-900 shadow-sm transition hover:border-amber-700/60 hover:bg-amber-200/80 hover:shadow-md"
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
