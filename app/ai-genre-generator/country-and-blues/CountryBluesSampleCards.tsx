"use client";

import { useGlobalPlayer, type GlobalTrack } from "@/contexts/GlobalPlayerContext";

export interface SampleTrackItem {
  category: string;
  title: string;
  description: string;
  audioSrc: string;
  coverSrc?: string;
}

export function CountryBluesSampleCards({ tracks }: { tracks: SampleTrackItem[] }) {
  const { play, track: currentTrack, isPlaying } = useGlobalPlayer();

  const handlePlay = (t: SampleTrackItem) => {
    const globalTrack: GlobalTrack = {
      audioSrc: t.audioSrc,
      title: t.title,
      description: t.description,
      category: t.category,
    };
    if (currentTrack?.audioSrc === t.audioSrc && isPlaying) return;
    play(globalTrack);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tracks.map((t) => {
        const isActive = currentTrack?.audioSrc === t.audioSrc && isPlaying;
        return (
          <article
            key={t.title}
            className="rounded-2xl border border-amber-900/40 bg-amber-950/30 backdrop-blur-xl shadow-lg overflow-hidden text-left"
          >
            <div className="relative aspect-square flex-shrink-0 group">
              {t.coverSrc ? (
                <img
                  src={t.coverSrc}
                  srcSet={`${t.coverSrc.replace(".webp", "-400.webp")} 400w, ${t.coverSrc} 640w`}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 to-amber-950/80 flex items-center justify-center">
                  <span className="text-4xl opacity-50">♪</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => handlePlay(t)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-inset"
                aria-label={isActive ? "Pause" : `Play ${t.title}`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600/90 text-amber-50 shadow-xl backdrop-blur">
                  {isActive ? (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <span className="text-xl leading-none pl-0.5">▶</span>
                  )}
                </span>
              </button>
            </div>
            <div className="p-4 border-t border-amber-900/30">
              <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-amber-400/90">
                {t.category}
              </p>
              <h3 className="mb-1 text-sm font-semibold text-amber-50 line-clamp-1">
                {t.title}
              </h3>
              <p className="text-xs leading-snug text-amber-200/80 line-clamp-2">
                {t.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
