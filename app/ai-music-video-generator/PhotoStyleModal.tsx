"use client";

import * as React from "react";
import Image from "next/image";

/** 风格预览图路径；构建时 optimize-images 会生成 120×120 WebP，控制加载体积 */
const PHOTO_STYLE_IMAGE_BASE = "/images/photo-styles";
const PHOTO_STYLE_IMAGE_EXT = ".webp";

export const PHOTO_STYLE_OPTIONS = [
  { id: "auto", label: "Auto" },
  { id: "cinematic", label: "Cinematic" },
  { id: "anime", label: "Anime" },
  { id: "lofi", label: "Lo-fi" },
  { id: "documentary", label: "Documentary" },
  { id: "flash-grain", label: "Flash Grain Snapshot" },
  { id: "retro-jazz", label: "Retro Jazz Blocks" },
  { id: "epic-fantasy", label: "Epic Fantasy Concept Art" },
  { id: "nineties-cel", label: "Nineties Cel-Shaded" },
  { id: "minimal-luxury", label: "Minimal Luxury Style" },
  { id: "vhs-synthwave", label: "VHS Synthwave" },
  { id: "cosmic-cel", label: "90s Cosmic Cel" },
  { id: "cozy-cafe", label: "Cozy Café Flat Lay" },
  { id: "hiphop-ink", label: "Hip Hop Ink Art" },
] as const;

type PhotoStyleModalProps = {
  open: boolean;
  selectedId: string;
  onClose: () => void;
  onConfirm: (id: string) => void;
};

export function PhotoStyleModal({ open, selectedId, onClose, onConfirm }: PhotoStyleModalProps) {
  const [pending, setPending] = React.useState(selectedId);
  const [failedImages, setFailedImages] = React.useState<Set<string>>(new Set());
  const [usePngFallback, setUsePngFallback] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    setPending(selectedId);
  }, [selectedId, open]);

  const handleImageError = React.useCallback((id: string) => {
    setUsePngFallback((prev) => {
      if (prev.has(id)) {
        setFailedImages((f) => new Set(f).add(id));
        return prev;
      }
      return new Set(prev).add(id);
    });
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-700/80 bg-slate-900 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-style-title"
      >
        <div className="flex items-center justify-between shrink-0 border-b border-slate-700/80 px-5 py-4">
          <h2 id="photo-style-title" className="text-lg font-semibold text-slate-100">
            Select Photo Style
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-slim p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {PHOTO_STYLE_OPTIONS.map((opt) => {
              const showFallback = failedImages.has(opt.id);
              const ext = usePngFallback.has(opt.id) ? ".png" : PHOTO_STYLE_IMAGE_EXT;
              const imgSrc = `${PHOTO_STYLE_IMAGE_BASE}/${opt.id}${ext}`;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPending(opt.id)}
                  className={`flex flex-col rounded-xl border-2 overflow-hidden transition ${
                    pending === opt.id
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-slate-700/80 bg-slate-800/60 hover:border-slate-600"
                  }`}
                >
                  <div className="aspect-square bg-slate-700/50 flex items-center justify-center overflow-hidden relative">
                    {!showFallback ? (
                      <Image
                        src={imgSrc}
                        alt={`${opt.label} style preview`}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                        sizes="120px"
                        onError={() => handleImageError(opt.id)}
                      />
                    ) : null}
                    {showFallback ? (
                      <span className="text-sm text-slate-400">{opt.label}</span>
                    ) : null}
                  </div>
                  <div className="px-3 py-2 text-center">
                    <span className="text-sm font-medium text-slate-200">{opt.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end gap-2 shrink-0 border-t border-slate-700/80 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-600 bg-slate-800/60 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700/50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(pending)}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
