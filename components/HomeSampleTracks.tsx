"use client";

import { useGlobalPlayer, type GlobalTrack } from "../contexts/GlobalPlayerContext";

export interface SampleTrackItem {
  category: string;
  title: string;
  description: string;
  audioSrc: string;
  coverSrc?: string;
}

function ImagePlaceholder({ className = "aspect-video" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-800/50 ${className}`}
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-500">Image</span>
    </div>
  );
}

export function HomeSampleTracks({ tracks }: { tracks: SampleTrackItem[] }) {
  const { play, track: currentTrack, isPlaying } = useGlobalPlayer();

  const handlePlay = (t: SampleTrackItem) => {
    const globalTrack: GlobalTrack = {
      audioSrc: t.audioSrc,
      title: t.title,
      description: t.description,
      category: t.category,
    };
    if (currentTrack?.audioSrc === t.audioSrc && isPlaying) {
      return;
    }
    play(globalTrack);
  };

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 flex-1 min-h-0 content-stretch">
      {tracks.map((t) => {
        const isActive = currentTrack?.audioSrc === t.audioSrc && isPlaying;
        return (
          <article
            key={t.title}
            className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden text-left"
          >
            <div className="relative aspect-square flex-shrink-0 group">
              {t.coverSrc ? (
                <img
                  src={t.coverSrc}
                  srcSet={`${t.coverSrc.replace(".webp", "-400.webp")} 400w, ${t.coverSrc} 640w`}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  alt={`${t.title} – ${t.category} cover`}
                  className="absolute inset-0 h-full w-full object-cover rounded-none"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <ImagePlaceholder className="absolute inset-0 rounded-none" />
              )}
              <button
                type="button"
                onClick={() => handlePlay(t)}
                className="absolute inset-0 flex items-center justify-center rounded-none bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-inset"
                aria-label={isActive ? "Pause" : `Play ${t.title}`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg ${
                    isActive ? "bg-violet-500 text-white" : "bg-violet-500 text-white"
                  }`}
                >
                  {isActive ? (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <span className="text-lg leading-none">▶</span>
                  )}
                </span>
              </button>
            </div>
            <div className="p-2.5 md:p-3 flex-1 min-h-0 flex flex-col">
              <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wide text-violet-300">
                {t.category}
              </p>
              <h3 className="mb-0.5 text-xs md:text-sm font-semibold text-slate-50 line-clamp-1">
                {t.title}
              </h3>
              <p className="text-[11px] md:text-xs leading-snug text-slate-300 line-clamp-2 flex-1">
                {t.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
