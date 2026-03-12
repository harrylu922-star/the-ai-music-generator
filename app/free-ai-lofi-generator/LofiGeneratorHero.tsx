"use client";

import Link from "next/link";
import { useState } from "react";

const STYLES = [
  { value: "chill", label: "Chill & Relax" },
  { value: "study", label: "Study Focus" },
  { value: "rainy", label: "Rainy Window" },
  { value: "night", label: "Night Drive" },
  { value: "jazz", label: "Lofi Jazz" },
];

const DURATIONS = [
  { value: "1", label: "1 min" },
  { value: "2", label: "2 min" },
  { value: "3", label: "3 min" },
  { value: "5", label: "5 min" },
  { value: "8", label: "8 min" },
];

export function LofiGeneratorHero() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("chill");
  const [duration, setDuration] = useState("3");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = () => {
    setStatus("loading");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus("done");
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 400);
  };

  return (
    <section className="border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/95 flex flex-col justify-center">
      <div className="mx-auto max-w-4xl w-full px-4 py-6 sm:py-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl leading-tight">
          <span className="block">Free AI Lofi Music Generator</span>
          <span className="block">for Study & Chill (2026 Edition)</span>
        </h1>
        <p className="mt-3 text-balance text-base leading-relaxed text-slate-200 max-w-2xl mx-auto sm:text-lg">
          Make beats for study, focus, or background—warm lofi and chill hip-hop without digging through sample packs.
        </p>

        {/* Mock generator panel — frosted glass */}
        <div className="mt-6 mx-auto max-w-2xl rounded-3xl border border-slate-700/80 bg-slate-900/40 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] p-4 sm:p-5">
          <div className="space-y-3">
            <label className="block text-left text-sm font-medium text-slate-300">Mood or scene</label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. coffee shop, rain on window, 3am coding..."
              className="w-full rounded-2xl border border-slate-600/80 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-left">
                <label className="block text-sm font-medium text-slate-300 mb-2">Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full rounded-2xl border border-slate-600/80 bg-slate-800/60 px-4 py-2.5 text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
                >
                  {STYLES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-slate-300 mb-2">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full rounded-2xl border border-slate-600/80 bg-slate-800/60 px-4 py-2.5 text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
                >
                  {DURATIONS.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {status === "loading" && (
              <div className="space-y-2 text-left">
                <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-violet-500/80 transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400">Creating your lofi beat…</p>
              </div>
            )}

            {status === "done" && (
              <div className="rounded-2xl border border-slate-600/80 bg-slate-800/50 p-4 text-left">
                <p className="text-sm font-medium text-slate-200 mb-3">Your lofi track is ready</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-500"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                    ) : (
                      <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    )}
                  </button>
                  <div className="flex-1 h-8 flex items-center gap-1">
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full bg-slate-500/80 flex-1 min-h-[4px]"
                        style={{ height: `${12 + Math.sin(i * 0.5) * 12}px` }}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">Demo — open the full generator to export</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                disabled={status === "loading"}
                onClick={() => {
                  if (status === "done") setStatus("idle");
                  handleGenerate();
                }}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.4)] transition hover:bg-violet-500 disabled:opacity-60"
              >
                {status === "loading" ? "Generating…" : status === "done" ? "Generate another" : "Generate"}
              </button>
              <Link
                href="/ai-music-generator"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-600 px-4 py-3 text-sm font-medium text-slate-200 hover:border-violet-500/50 hover:text-violet-200"
              >
                Open full generator →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 backdrop-blur px-3 py-1.5 text-sm text-slate-300">
            <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400/90">Model</span>
            v6 AI
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 backdrop-blur px-3 py-1.5 text-sm text-slate-300">
            <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400/90">License</span>
            Royalty-Free
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 backdrop-blur px-3 py-1.5 text-sm text-slate-300">
            <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400/90">YouTube</span>
            Monetization-friendly
          </span>
        </div>
      </div>
    </section>
  );
}
