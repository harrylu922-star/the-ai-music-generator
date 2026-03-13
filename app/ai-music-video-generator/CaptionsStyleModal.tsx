"use client";

import * as React from "react";

export const CAPTIONS_STYLE_OPTIONS: { id: string; name: string; description: string }[] = [
  { id: "default", name: "Default", description: "Default style" },
  { id: "light-elegant", name: "Light Elegant", description: "Light & Elegant" },
  { id: "simple-outline", name: "Simple Outline", description: "Simple Black Stroke" },
  { id: "airy-regular", name: "Airy Regular", description: "Airy & Natural" },
  { id: "ocean-wave", name: "Ocean Wave", description: "Blue Highlight Classic" },
  { id: "fire-bold", name: "Fire Bold", description: "Red Highlight Bold" },
  { id: "emerald-pop", name: "Emerald Pop", description: "Green Highlight Modern" },
  { id: "frost-clean", name: "Frost Clean", description: "White Highlight Clean" },
  { id: "violet-glow", name: "Violet Glow", description: "Purple Highlight Glow" },
  { id: "sketch-fresh", name: "Sketch Fresh", description: "Green Highlight Casual" },
  { id: "electric-blue", name: "Electric Blue", description: "Energetic & Vibrant" },
  { id: "stroke-outline", name: "Stroke Outline", description: "Hollow Stroke & Blue Fill" },
  { id: "forest-green", name: "Forest Green", description: "Natural & Fresh" },
  { id: "lime-fresh", name: "Lime Fresh", description: "Lively & Refreshing" },
  { id: "tiktok-classic", name: "TikTok Classic", description: "Classic TikTok Style" },
  { id: "tiktok-neon", name: "TikTok Neon", description: "Neon Glow Effect" },
  { id: "bold-impact", name: "Bold Impact", description: "High Impact & Yellow" },
  { id: "gradient-pop", name: "Gradient Pop", description: "Gradient & Glow" },
  { id: "retro-wave", name: "Retro Wave", description: "Retro Synthwave" },
  { id: "street", name: "Street", description: "Urban Graffiti" },
  { id: "karaoke", name: "Karaoke", description: "Karaoke Golden" },
  { id: "bubble-pop", name: "Bubble Pop", description: "Bubbly & Playful" },
  { id: "pure-white", name: "Pure White", description: "Bold White & Double Shadow" },
  { id: "solid-black-bg", name: "Solid Black BG", description: "High Contrast Black Bar" },
  { id: "yellow-energy", name: "Yellow Energy", description: "High Energy Yellow" },
  { id: "cyan-glow", name: "Cyan Glow", description: "Cyan Glow & EDM" },
  { id: "red-hot", name: "Red Hot", description: "Hot Red & Bold" },
  { id: "thin-modern", name: "Thin Modern", description: "Thin & Modern" },
  { id: "subtle-medium", name: "Subtle Medium", description: "Subtle & Balanced" },
  { id: "delicate-outline", name: "Delicate Outline", description: "Delicate Stroke" },
  { id: "blue-tint", name: "Blue Tint", description: "Soft Blue Tint" },
  { id: "green-tint", name: "Green Tint", description: "Soft Green Tint" },
  { id: "classic", name: "Classic", description: "Clean & Professional" },
  { id: "hustle", name: "Hustle", description: "Bold & Dynamic" },
  { id: "medusa", name: "Medusa", description: "Modern & Sleek" },
  { id: "minimal", name: "Minimal", description: "Simple & Clean" },
  { id: "neon", name: "Neon", description: "Vibrant & Electric" },
  { id: "handwritten", name: "Handwritten", description: "Casual & Friendly" },
  { id: "retro", name: "Retro", description: "Vintage & Bold" },
  { id: "cinematic", name: "Cinematic", description: "Dramatic & Bold" },
  { id: "gradient", name: "Gradient", description: "Smooth & Modern" },
  { id: "future", name: "Future", description: "Sci-fi & Techy" },
  { id: "serpent", name: "Serpent", description: "Modern & Sleek" },
  { id: "glow", name: "Glow", description: "Vibrant & Electric" },
  { id: "script", name: "Script", description: "Casual & Friendly" },
  { id: "vintage", name: "Vintage", description: "Vintage & Bold" },
  { id: "filmstrip", name: "Filmstrip", description: "Dramatic & Bold" },
];

/** 每种字幕样式在展示卡片中的字体/描边/阴影等视觉效果，按实际展示尺寸渲染，无需图片 */
type CaptionPreviewStyle = {
  color?: string;
  fontFamily?: string;
  fontWeight?: React.CSSProperties["fontWeight"];
  textShadow?: string;
  WebkitTextStroke?: string;
  backgroundColor?: string;
  padding?: string;
};

const CAPTION_PREVIEW_STYLES: Record<string, CaptionPreviewStyle> = {
  default: { color: "#f1f5f9", fontWeight: 600 },
  "light-elegant": { color: "#e2e8f0", fontFamily: "Georgia, serif", fontWeight: 400 },
  "simple-outline": {
    color: "#f1f5f9",
    WebkitTextStroke: "1px #0f172a",
    fontWeight: 700,
  },
  "airy-regular": { color: "#cbd5e1", fontFamily: "system-ui, sans-serif", fontWeight: 400 },
  "ocean-wave": {
    color: "#38bdf8",
    textShadow: "0 0 8px rgba(56,189,248,0.6), 0 1px 2px #0f172a",
    fontWeight: 600,
  },
  "fire-bold": {
    color: "#f97316",
    textShadow: "0 0 10px rgba(249,115,22,0.7), 0 1px 2px #0f172a",
    fontWeight: 700,
  },
  "emerald-pop": {
    color: "#34d399",
    textShadow: "0 0 8px rgba(52,211,153,0.5), 0 1px 2px #0f172a",
    fontWeight: 600,
  },
  "frost-clean": {
    color: "#f8fafc",
    textShadow: "0 0 6px rgba(248,250,252,0.9), 0 1px 3px #0f172a",
    fontWeight: 600,
  },
  "violet-glow": {
    color: "#a78bfa",
    textShadow: "0 0 12px rgba(167,139,250,0.7), 0 1px 2px #0f172a",
    fontWeight: 600,
  },
  "sketch-fresh": {
    color: "#86efac",
    fontFamily: "system-ui, sans-serif",
    fontWeight: 500,
    textShadow: "0 1px 2px #0f172a",
  },
  "electric-blue": {
    color: "#60a5fa",
    textShadow: "0 0 10px rgba(96,165,250,0.8), 0 0 20px rgba(96,165,250,0.4)",
    fontWeight: 700,
  },
  "stroke-outline": {
    color: "#3b82f6",
    WebkitTextStroke: "1px #1e3a8a",
    fontWeight: 600,
  },
  "forest-green": { color: "#22c55e", fontWeight: 600, textShadow: "0 1px 2px #0f172a" },
  "lime-fresh": { color: "#a3e635", fontWeight: 600, textShadow: "0 1px 2px #0f172a" },
  "tiktok-classic": {
    color: "#f1f5f9",
    textShadow: "2px 2px 0 #0f172a, -1px -1px 0 #0f172a",
    fontWeight: 700,
  },
  "tiktok-neon": {
    color: "#f0abfc",
    textShadow: "0 0 8px #f0abfc, 0 0 16px rgba(240,171,252,0.5)",
    fontWeight: 700,
  },
  "bold-impact": {
    color: "#facc15",
    textShadow: "0 0 6px rgba(250,204,21,0.8), 0 2px 4px #0f172a",
    fontWeight: 800,
  },
  "gradient-pop": {
    color: "#f472b6",
    textShadow: "0 0 10px rgba(244,114,182,0.6), 0 0 20px rgba(251,191,36,0.3)",
    fontWeight: 700,
  },
  "retro-wave": {
    color: "#fb7185",
    fontFamily: "system-ui, sans-serif",
    textShadow: "0 0 8px #fda4af, 2px 2px 0 #1e1b4b",
    fontWeight: 700,
  },
  street: {
    color: "#fbbf24",
    fontFamily: "Impact, Charcoal, sans-serif",
    WebkitTextStroke: "1px #0f172a",
    fontWeight: 700,
  },
  karaoke: {
    color: "#fcd34d",
    textShadow: "0 0 6px #fde047, 0 2px 4px #0f172a",
    fontWeight: 700,
  },
  "bubble-pop": {
    color: "#f9a8d4",
    fontFamily: "system-ui, sans-serif",
    fontWeight: 600,
    textShadow: "0 1px 3px #0f172a",
  },
  "pure-white": {
    color: "#ffffff",
    textShadow: "0 2px 4px #0f172a, 0 0 20px rgba(255,255,255,0.3)",
    fontWeight: 700,
  },
  "solid-black-bg": {
    color: "#f1f5f9",
    backgroundColor: "rgba(15,23,38,0.95)",
    padding: "6px 10px",
    fontWeight: 600,
  },
  "yellow-energy": {
    color: "#fde047",
    textShadow: "0 0 10px rgba(253,224,71,0.8), 0 1px 2px #0f172a",
    fontWeight: 700,
  },
  "cyan-glow": {
    color: "#22d3ee",
    textShadow: "0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.4)",
    fontWeight: 600,
  },
  "red-hot": {
    color: "#ef4444",
    textShadow: "0 0 8px rgba(239,68,68,0.7), 0 2px 4px #0f172a",
    fontWeight: 700,
  },
  "thin-modern": { color: "#e2e8f0", fontFamily: "system-ui, sans-serif", fontWeight: 300 },
  "subtle-medium": { color: "#94a3b8", fontWeight: 500 },
  "delicate-outline": {
    color: "#f1f5f9",
    WebkitTextStroke: "0.5px #64748b",
    fontWeight: 500,
  },
  "blue-tint": { color: "#93c5fd", fontWeight: 500 },
  "green-tint": { color: "#86efac", fontWeight: 500 },
  classic: { color: "#f1f5f9", fontFamily: "Georgia, serif", fontWeight: 500 },
  hustle: { color: "#f1f5f9", fontWeight: 800, textShadow: "0 2px 4px #0f172a" },
  medusa: { color: "#c4b5fd", fontFamily: "system-ui, sans-serif", fontWeight: 600 },
  minimal: { color: "#e2e8f0", fontWeight: 400 },
  neon: {
    color: "#a5f3fc",
    textShadow: "0 0 10px #67e8f9, 0 0 20px rgba(103,232,249,0.5)",
    fontWeight: 600,
  },
  handwritten: {
    color: "#fde68a",
    fontFamily: "Comic Sans MS, cursive",
    fontWeight: 500,
  },
  retro: {
    color: "#fcd34d",
    fontFamily: "Georgia, serif",
    fontWeight: 700,
    textShadow: "0 1px 2px #0f172a",
  },
  cinematic: {
    color: "#f8fafc",
    fontFamily: "Georgia, serif",
    fontWeight: 700,
    textShadow: "0 2px 8px #0f172a, 0 0 20px rgba(0,0,0,0.5)",
  },
  gradient: {
    color: "#c4b5fd",
    textShadow: "0 0 8px rgba(196,181,253,0.5), 0 1px 2px #0f172a",
    fontWeight: 600,
  },
  future: {
    color: "#67e8f9",
    fontFamily: "system-ui, monospace",
    textShadow: "0 0 8px rgba(103,232,249,0.6)",
    fontWeight: 600,
  },
  serpent: { color: "#a5b4fc", fontFamily: "system-ui, sans-serif", fontWeight: 600 },
  glow: {
    color: "#e879f9",
    textShadow: "0 0 12px #e879f9, 0 0 24px rgba(232,121,249,0.5)",
    fontWeight: 600,
  },
  script: {
    color: "#fde68a",
    fontFamily: "cursive",
    fontWeight: 500,
  },
  vintage: {
    color: "#d6d3d1",
    fontFamily: "Georgia, serif",
    fontWeight: 600,
    textShadow: "0 1px 2px #0f172a",
  },
  filmstrip: {
    color: "#fafafa",
    textShadow: "0 0 4px #0f172a, 0 2px 6px rgba(0,0,0,0.4)",
    fontWeight: 700,
  },
};

function getCaptionPreviewStyle(id: string): React.CSSProperties {
  const s = CAPTION_PREVIEW_STYLES[id] ?? CAPTION_PREVIEW_STYLES.default;
  return {
    color: s.color,
    fontFamily: s.fontFamily,
    fontWeight: s.fontWeight,
    textShadow: s.textShadow,
    WebkitTextStroke: s.WebkitTextStroke,
    backgroundColor: s.backgroundColor,
    padding: s.padding,
    fontSize: "clamp(0.75rem, 2.2vw, 0.9375rem)",
    lineHeight: 1.3,
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  } as React.CSSProperties;
}

type CaptionsStyleModalProps = {
  open: boolean;
  selectedId: string;
  sampleText: string;
  onClose: () => void;
  onConfirm: (id: string) => void;
};

export function CaptionsStyleModal({
  open,
  selectedId,
  sampleText,
  onClose,
  onConfirm,
}: CaptionsStyleModalProps) {
  const [pending, setPending] = React.useState(selectedId);

  React.useEffect(() => {
    setPending(selectedId);
  }, [selectedId, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-700/80 bg-slate-900 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="captions-style-title"
      >
        <div className="flex items-center justify-between shrink-0 border-b border-slate-700/80 px-5 py-4">
          <h2 id="captions-style-title" className="text-lg font-semibold text-slate-100">
            Select Captions Style
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CAPTIONS_STYLE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPending(opt.id)}
                className={`flex flex-col rounded-xl border-2 overflow-hidden text-left transition ${
                  pending === opt.id
                    ? "border-emerald-500 bg-emerald-500/5"
                    : "border-slate-700/80 bg-slate-800/40 hover:border-slate-600"
                }`}
              >
                <div
                  className="flex items-center justify-center min-h-[72px] px-3 py-3 bg-slate-800/60"
                  style={{ aspectRatio: "auto" }}
                >
                  <span
                    className="font-medium truncate w-full text-center"
                    style={getCaptionPreviewStyle(opt.id)}
                    title={sampleText || "Sample Text"}
                  >
                    {sampleText || "Sample Text"}
                  </span>
                </div>
                <div className="px-4 py-3 bg-slate-800/80">
                  <p className="text-sm font-medium text-slate-100">{opt.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{opt.description}</p>
                </div>
              </button>
            ))}
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
