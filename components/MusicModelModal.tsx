"use client";

import { useState, useCallback, useEffect } from "react";

const MUSIC_MODEL_VERSIONS = [
  {
    version: "V6",
    tag: "NEW",
    title: "V6.0",
    subtitle: "Ultra Powerful",
    description:
      "The world's best music model. Exceptional audio quality, seamless creative control, and professional-grade output. The ultimate foundation for next-generation music creation. Full control over duration (5s–5min) with premium quality.",
  },
  {
    version: "V5",
    tag: null,
    title: "V5.0",
    subtitle: undefined,
    description:
      "Advanced AI music creation with high-fidelity audio, extended song duration up to 8 minutes, flexible style control, comprehensive lyrics support up to 5000 characters, and fast generation speed.",
  },
  {
    version: "V4",
    tag: null,
    title: "V4.0",
    subtitle: undefined,
    description:
      "Our original music generation model that started it all. Classic sound quality with reliable performance, perfect for quick music creation and experimentation.",
  },
  {
    version: "V1",
    tag: null,
    title: "V1.0",
    subtitle: undefined,
    description:
      "The first AI music generation model. Basic text-to-music with short clips, ideal for quick experiments and learning the workflow.",
  },
] as const;

export function MusicModelModalTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {children}
      </button>
      {open && (
        <MusicModelModal onClose={close} />
      )}
    </>
  );
}

function MusicModelModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="music-model-dialog-title"
    >
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl text-left">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-700 bg-slate-900/95 px-4 py-3 backdrop-blur">
          <h2 id="music-model-dialog-title" className="text-lg font-semibold text-slate-50">
            Choose Music Model
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-4 pb-6">
          <p className="pt-3 pb-2 text-sm text-slate-400">
            Compare and select the best AI model for your music generation
          </p>
          <ul className="space-y-3 list-none pl-0">
            {MUSIC_MODEL_VERSIONS.map((m) => (
              <li
                key={m.version}
                className="rounded-xl border border-slate-700 bg-slate-800/80 p-4"
              >
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-100">{m.title}</span>
                  {m.subtitle && (
                    <span className="text-sm text-violet-300">{m.subtitle}</span>
                  )}
                  {m.tag && (
                    <span className="rounded bg-violet-600/80 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
                      {m.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-slate-200">{m.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
