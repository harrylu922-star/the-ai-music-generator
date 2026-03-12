"use client";

import { useRef, useEffect } from "react";
import { useGlobalPlayer } from "../contexts/GlobalPlayerContext";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function GlobalPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    track,
    isPlaying,
    currentTime,
    duration,
    toggle,
    seek,
    close,
    setAudioRef,
  } = useGlobalPlayer();

  useEffect(() => {
    setAudioRef?.(audioRef.current);
    return () => setAudioRef?.(null);
  }, [setAudioRef]);

  const trackSrc = track?.audioSrc ?? "";
  useEffect(() => {
    const el = audioRef.current;
    if (!track || !el || !trackSrc) return;
    const needLoad = el.getAttribute("data-src") !== trackSrc;
    if (needLoad) {
      el.setAttribute("data-src", trackSrc);
      el.src = trackSrc;
      el.currentTime = 0;
    }
    if (isPlaying) el.play().catch(() => {}); else el.pause();
  }, [track, trackSrc, isPlaying]);

  if (!track) return null;

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <>
      <audio ref={audioRef} preload="metadata" className="hidden" />
      <footer
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-900/95 backdrop-blur"
        role="region"
        aria-label="Music player"
      >
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
          {/* Left: track info (MusicCreator-style) */}
          <div className="min-w-0 flex-1 sm:max-w-[280px]">
            <p className="truncate text-sm font-medium text-slate-100">{track.title}</p>
            <p className="truncate text-xs text-slate-400">
              {track.category ?? track.description ?? "—"}
            </p>
          </div>

          {/* Center: play + progress + time */}
          <div className="flex flex-1 flex-col items-center gap-1.5 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={toggle}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500 text-white hover:bg-violet-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              )}
            </button>

            <div className="flex w-full min-w-0 max-w-sm items-center gap-2 sm:flex-1">
              <span className="w-9 shrink-0 text-right text-xs text-slate-500 tabular-nums">
                {formatTime(currentTime)}
              </span>
              <button
                type="button"
                className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                onClick={(e) => {
                  const target = e.currentTarget;
                  const clientX = e.clientX;
                  requestAnimationFrame(() => {
                    const rect = target.getBoundingClientRect();
                    const x = clientX - rect.left;
                    seek(rect.width > 0 ? x / rect.width : 0);
                  });
                }}
                aria-label="Seek"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-violet-500 transition-[width]"
                  style={{ width: `${progress * 100}%` }}
                />
              </button>
              <span className="w-9 shrink-0 text-xs text-slate-500 tabular-nums">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: volume placeholder + close */}
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="rounded p-2 text-slate-400 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              aria-label="Volume"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded p-2 text-slate-400 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              aria-label="Close player"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
