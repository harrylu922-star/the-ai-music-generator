"use client";

import { useRef, useState } from "react";
import Link from "@/components/Link";

const GENERATOR_ID = "generator";

export function LyricsToMusicGenerator() {
  const [lyrics, setLyrics] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTurnToMelody = () => {
    if (!lyrics.trim()) return;
    setIsAnimating(true);
    // Simulate "turning lyrics to melody" — in production would call API / redirect to ai-music-generator with lyrics
    setTimeout(() => {
      setIsAnimating(false);
      window.location.href = `/ai-music-generator?mode=own-lyrics&lyrics=${encodeURIComponent(lyrics.trim().slice(0, 500))}`;
    }, 1200);
  };

  return (
    <section
      id={GENERATOR_ID}
      className="scroll-mt-24 rounded-2xl border border-amber-200/40 bg-white/70 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:p-8"
      aria-labelledby="generator-heading"
    >
      <h2 id="generator-heading" className="sr-only">
        AI Lyrics to Music Generator
      </h2>
      <div className="mx-auto max-w-3xl">
        <label htmlFor="lyrics-input" className="mb-2 block text-sm font-medium text-stone-600">
          Paste or type your lyrics
        </label>
        <textarea
          ref={textareaRef}
          id="lyrics-input"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Verse 1&#10;Your words here...&#10;&#10;Chorus&#10;Let the melody rise..."
          rows={12}
          className="w-full resize-y rounded-xl border border-amber-200/60 bg-amber-50/50 px-4 py-3 font-serif text-stone-800 placeholder-stone-400 shadow-inner focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
          aria-describedby="lyrics-hint"
        />
        <p id="lyrics-hint" className="mt-1.5 text-xs text-stone-500">
          Our v6 model analyzes cadence and emotion to match melody to your song&apos;s natural flow.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleTurnToMelody}
            disabled={!lyrics.trim() || isAnimating}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 ${
              isAnimating
                ? "cursor-wait bg-violet-500"
                : "bg-violet-600 hover:bg-violet-500 hover:shadow-[0_0_24px_rgba(124,58,237,0.4)] active:scale-[0.98]"
            } disabled:opacity-60 disabled:hover:shadow-lg`}
          >
            {isAnimating ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
                Turning words into melody…
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                Turn Lyrics to Melody
              </>
            )}
          </button>
          <Link
            href="/ai-lyrics-generator"
            className="text-center text-sm font-medium text-violet-700 underline underline-offset-2 hover:text-violet-800"
          >
            Need lyrics? Generate with AI first
          </Link>
        </div>
      </div>
    </section>
  );
}
