"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "@/components/Link";
import { useGlobalPlayer, type GlobalTrack } from "../../contexts/GlobalPlayerContext";
import { LANDING_PAGES } from "../../components/LandingNav";
import { PhotoStyleModal, PHOTO_STYLE_OPTIONS } from "./PhotoStyleModal";
import { CaptionsStyleModal, CAPTIONS_STYLE_OPTIONS } from "./CaptionsStyleModal";

const VIDEO_PAGE_PATH = "/ai-music-video-generator";

/** 右侧展示区：6 首来自首页的曲目及对应封面，作为 AI 音乐视频样板（与首页 sampleTracks 对应） */
const VIDEO_SHOWCASE_SAMPLES = [
  { title: "Cinematic opener", style: "Cinematic", coverSrc: "/images/covers/sample-cinematic.webp", audioSrc: "/audio/sample-cinematic.mp3" },
  { title: "Lo-fi focus instrumental", style: "Lo-fi", coverSrc: "/images/covers/sample-lofi.webp", audioSrc: "/audio/sample-lofi.mp3" },
  { title: "Loop for talking videos", style: "Loop", coverSrc: "/images/covers/sample-loop.webp", audioSrc: "/audio/sample-loop.mp3" },
  { title: "Documentary emotional bed", style: "Documentary", coverSrc: "/images/covers/sample-documentary.webp", audioSrc: "/audio/sample-documentary.mp3" },
  { title: "Late night R&B groove", style: "R&B", coverSrc: "/images/covers/sample-rnb.webp", audioSrc: "/audio/sample-rnb.mp3" },
  { title: "Game menu ambient", style: "Ambient", coverSrc: "/images/covers/sample-ambient.webp", audioSrc: "/audio/sample-ambient.mp3" },
] as const;

/** 工作区状态：接 API 时可直接提交此结构 */
export type MusicVideoWorkspaceState = {
  audioSource: "file" | "workspace" | null;
  uploadedFile: File | null;
  workspaceTrackId: string | null;
  displayMode: "single" | "multiple";
  photoStyle: string;
  videoSize: "16:9" | "9:16";
  captionsEnabled: boolean;
  captionsStyle: string;
  sampleText: string;
  captionsAlignment: "top" | "middle" | "bottom";
  soundWaveEnabled: boolean;
};

const defaultState: MusicVideoWorkspaceState = {
  audioSource: null,
  uploadedFile: null,
  workspaceTrackId: null,
  displayMode: "single",
  photoStyle: "auto",
  videoSize: "16:9",
  captionsEnabled: true,
  captionsStyle: "default",
  sampleText: "",
  captionsAlignment: "top",
  soundWaveEnabled: true,
};

const CAPTIONS_ALIGNMENTS = ["top", "middle", "bottom"] as const;

function getPhotoStyleLabel(id: string): string {
  return PHOTO_STYLE_OPTIONS.find((o) => o.id === id)?.label ?? id;
}
function getCaptionsStyleName(id: string): string {
  return CAPTIONS_STYLE_OPTIONS.find((o) => o.id === id)?.name ?? id;
}

export function HeroFirstScreen() {
  const [locked, setLocked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoStyleModalOpen, setPhotoStyleModalOpen] = useState(false);
  const [captionsStyleModalOpen, setCaptionsStyleModalOpen] = useState(false);

  const [state, setState] = useState<MusicVideoWorkspaceState>(defaultState);
  const { play: playTrack, track: currentTrack, isPlaying } = useGlobalPlayer();

  const hasMusic = state.audioSource !== null;
  const canGenerate = hasMusic;

  const handlePlayShowcase = (item: (typeof VIDEO_SHOWCASE_SAMPLES)[number]) => {
    const globalTrack: GlobalTrack = {
      audioSrc: item.audioSrc,
      title: item.title,
      category: item.style,
    };
    if (currentTrack?.audioSrc === item.audioSrc && isPlaying) return;
    playTrack(globalTrack);
  };

  const handleUploadLocalFile = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setState((s) => ({ ...s, audioSource: "file", uploadedFile: file, workspaceTrackId: null }));
    }
    e.target.value = "";
  };

  const handleFromMyMusic = () => {
    setState((s) => ({ ...s, audioSource: "workspace", workspaceTrackId: "__placeholder__", uploadedFile: null }));
    // TODO: open workspace picker modal / call API list tracks
  };

  const handleGenerate = () => {
    if (!canGenerate) return;
    // TODO: 接 API 时在此调用，例如: generateMusicVideo(state);
    window.location.href = "/ai-music-generator";
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "l" || e.key === "L") && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const t = e.target as HTMLElement;
        if (t?.tagName !== "INPUT" && t?.tagName !== "TEXTAREA") {
          e.preventDefault();
          setLocked((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      className={`relative overflow-hidden bg-slate-950 border-b border-slate-800/80 ${
        locked ? "h-[calc(100vh-4rem)] min-h-0 shrink-0" : "h-[calc(100vh-4rem)] min-h-0"
      }`}
    >
      <div className="flex h-full flex-col lg:flex-row">
        {/* Left: 与 /ai-music-generator 完全一致的竖向 Tools 导航，尺寸一致 */}
        <nav className="hidden lg:flex w-52 xl:w-56 shrink-0 flex-col overflow-hidden rounded-r-2xl bg-slate-800/40 border-r border-slate-800/80">
          <div className="p-2.5 min-w-0">
            <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">Tools</p>
            <ul className="flex flex-col gap-0.5 min-w-0">
              {LANDING_PAGES.map(({ href, label, available }) => {
                const isActive = href === VIDEO_PAGE_PATH;
                return (
                  <li key={href} className="min-w-0">
                    {available ? (
                      <Link
                        href={href}
                        className={`block rounded-xl px-3 py-2 text-sm transition truncate max-w-full ${
                          isActive
                            ? "bg-violet-500/20 text-violet-200 font-medium"
                            : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                        }`}
                      >
                        {label}
                      </Link>
                    ) : (
                      <span className="block rounded-xl px-3 py-2 text-sm text-slate-400 cursor-not-allowed truncate max-w-full">
                        {label} (Soon)
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Center: 收窄到红框内（max-w-sm），右侧展示区 flex-1 相应加大 */}
        <div className="flex w-full max-w-sm min-w-0 min-h-0 shrink-0 flex-col border-b lg:border-b-0 lg:border-r border-slate-800/80">
          <div
            className="flex-1 min-h-0 overflow-y-auto scrollbar-slim px-3 py-4"
            role="region"
            aria-label="Video options"
          >
            <div className="space-y-4">
              <h1 className="text-base font-semibold text-slate-100 leading-normal">AI Music Video Generator</h1>
              <p className="text-sm font-medium text-slate-300 leading-normal">Add Music</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
                aria-label="Upload audio file"
              />
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleUploadLocalFile}
                  className="rounded-xl border border-slate-600 bg-slate-800/60 px-2 py-2.5 text-sm leading-normal text-slate-200 hover:border-violet-500/50 hover:bg-slate-700/50 text-left transition"
                >
                  Upload Local File
                </button>
                <button
                  type="button"
                  onClick={handleFromMyMusic}
                  className="rounded-xl border border-slate-600 bg-slate-800/60 px-2 py-2.5 text-sm leading-normal text-slate-200 hover:border-violet-500/50 hover:bg-slate-700/50 text-left transition"
                >
                  From My Music
                </button>
              </div>
              <p className="text-sm text-slate-400 leading-normal">Upload from device or select from workspace</p>

              {/* 从 Display Mode 起：说明左对齐，选项内容与 Captions 同宽、均分 */}
              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-left text-sm font-medium text-slate-400 leading-normal">Display Mode</span>
                <div className="flex flex-1 gap-2 min-w-0">
                  {(["single", "multiple"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setState((s) => ({ ...s, displayMode: mode }))}
                      className={`flex min-w-0 flex-1 items-center justify-center rounded-xl border px-2 py-2.5 text-sm leading-normal capitalize transition ${
                        state.displayMode === mode
                          ? "border-violet-500/50 bg-violet-500/20 text-violet-200"
                          : "border-slate-600 bg-slate-800/60 text-slate-200 hover:border-violet-500/50"
                      }`}
                    >
                      {mode === "single" ? "Single" : "Multiple"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-left text-sm font-medium text-slate-400 leading-normal">Photo Style</span>
                <div className="flex flex-1 gap-2 min-w-0">
                  <button
                    type="button"
                    onClick={() => setPhotoStyleModalOpen(true)}
                    className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl border border-slate-600 bg-slate-800/60 px-2 py-2.5 text-sm leading-normal text-slate-200 hover:border-violet-500/50 text-center"
                    aria-label="Select photo style"
                  >
                    <span className="font-medium">{state.photoStyle === "auto" ? "Auto or Select" : getPhotoStyleLabel(state.photoStyle)}</span>
                    <span className="text-xs text-slate-400">{state.photoStyle === "auto" ? "Click to choose a style" : "Click to change"}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-left text-sm font-medium text-slate-400 leading-normal">Video Size</span>
                <div className="flex flex-1 gap-2 min-w-0">
                  {(["16:9", "9:16"] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setState((s) => ({ ...s, videoSize: size }))}
                      className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border px-2 py-2.5 text-sm leading-normal transition ${
                        state.videoSize === size
                          ? "border-violet-500/50 bg-violet-500/20 text-violet-200"
                          : "border-slate-600 bg-slate-800/60 text-slate-200 hover:border-violet-500/50"
                      }`}
                    >
                      <span
                        className={`shrink-0 rounded border border-current opacity-80 ${
                          size === "16:9" ? "h-3 w-7" : "h-5 w-3"
                        }`}
                        aria-hidden
                      />
                      <span>{size}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-left text-sm font-medium text-slate-400 leading-normal">Captions</span>
                <div className="flex flex-1 gap-2 flex-wrap min-w-0">
                  <button
                    type="button"
                    onClick={() => setCaptionsStyleModalOpen(true)}
                    className="rounded-xl border border-slate-600 bg-slate-800/60 px-2 py-2.5 text-sm leading-normal text-slate-200 hover:border-violet-500/50 text-left min-w-0 flex-1"
                    aria-label="Select captions style"
                  >
                    {getCaptionsStyleName(state.captionsStyle)}
                  </button>
                  <input
                    type="text"
                    placeholder="Sample Text"
                    value={state.sampleText}
                    onChange={(e) => setState((s) => ({ ...s, sampleText: e.target.value }))}
                    className="min-w-[80px] flex-1 rounded-xl border border-slate-600 bg-slate-800/60 px-2 py-2.5 text-sm leading-normal text-slate-200 placeholder:text-slate-400 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 outline-none transition"
                    aria-label="Caption sample text"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-left text-sm font-medium text-slate-400 leading-normal">Alignment</span>
                <div className="flex flex-1 gap-2 min-w-0">
                  {CAPTIONS_ALIGNMENTS.map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => setState((s) => ({ ...s, captionsAlignment: align }))}
                      className={`flex min-w-0 flex-1 items-center justify-center rounded-xl border px-2 py-2.5 text-sm leading-normal capitalize transition ${
                        state.captionsAlignment === align
                          ? "border-violet-500/50 bg-violet-500/20 text-violet-200"
                          : "border-slate-600 bg-slate-800/60 text-slate-200 hover:border-violet-500/50"
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-left text-sm font-medium text-slate-400 leading-normal">Sound Wave</span>
                <div className="flex flex-1 gap-2 min-w-0">
                  <button
                    type="button"
                    onClick={() => setState((s) => ({ ...s, soundWaveEnabled: !s.soundWaveEnabled }))}
                    className={`flex min-w-0 flex-1 items-center justify-center rounded-xl border px-2 py-2.5 text-sm leading-normal transition ${
                      state.soundWaveEnabled
                        ? "border-violet-500/50 bg-violet-500/20 text-violet-200"
                        : "border-slate-600 bg-slate-800/60 text-slate-200 hover:border-violet-500/50"
                    }`}
                  >
                    {state.soundWaveEnabled ? "On" : "Off"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0 p-3 border-t border-slate-800/80 bg-slate-950/80">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full rounded-xl bg-violet-600 px-3 py-2.5 text-sm leading-normal font-semibold text-white hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Generate Music Video (-10 Credits)
            </button>
          </div>
        </div>

        {/* Right: 展示区加大（flex-1 占满剩余宽度），与中间统一行高/字号 */}
        <aside className="flex flex-1 min-w-0 flex-col overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800/80 bg-slate-900/20">
          <div className="shrink-0 border-b border-slate-800/80 px-4 py-4">
            <p className="text-sm font-semibold text-slate-100 leading-normal">AI Music Video Generator</p>
            <p className="text-sm text-slate-400 leading-normal mt-1">Explore music video examples generated by AI</p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-slim p-4">
            <p className="text-xs text-slate-500 mb-3">Music videos generated from these tracks</p>
            <div className="grid grid-cols-2 gap-3">
              {VIDEO_SHOWCASE_SAMPLES.map((item, i) => {
                const isActive = currentTrack?.audioSrc === item.audioSrc && isPlaying;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handlePlayShowcase(item)}
                    className="group relative aspect-video rounded-xl bg-slate-800/60 border border-slate-700/80 overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-inset"
                    aria-label={isActive ? "Pause" : `Play ${item.title}`}
                  >
                    <Image
                      src={item.coverSrc}
                      alt={`${item.title} — ${item.style} style sample track cover`}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 240px"
                      unoptimized
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-white ${
                          isActive ? "border-violet-400 bg-violet-500" : "border-white/90 bg-white/10"
                        }`}
                      >
                        {isActive ? (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </span>
                    </span>
                    <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-medium text-white/95 drop-shadow-md truncate">
                      {item.title}
                    </span>
                    <span className="absolute top-1.5 right-1.5 rounded px-1.5 py-0.5 text-[9px] font-medium bg-black/50 text-white/90">
                      {item.style}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4">
              <Link
                href="/ai-music-video-generator#showcase"
                className="block w-full rounded-xl border border-slate-600 bg-slate-800/60 px-4 py-2.5 text-sm leading-normal text-slate-300 hover:border-violet-500/50 hover:text-violet-200 transition text-center"
              >
                Preview More of Our Showcases
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <button
        type="button"
        onClick={() => setLocked((prev) => !prev)}
        className="absolute top-3 right-3 z-10 rounded-lg border border-slate-600 bg-slate-800/80 px-2.5 py-1.5 text-xs text-slate-300 hover:border-violet-500/50 hover:text-violet-200"
        title="Toggle first-screen lock (key: L)"
      >
        {locked ? "Unlock (L)" : "Lock 1st screen (L)"}
      </button>

      <PhotoStyleModal
        open={photoStyleModalOpen}
        selectedId={state.photoStyle}
        onClose={() => setPhotoStyleModalOpen(false)}
        onConfirm={(id) => {
          setState((s) => ({ ...s, photoStyle: id }));
          setPhotoStyleModalOpen(false);
        }}
      />
      <CaptionsStyleModal
        open={captionsStyleModalOpen}
        selectedId={state.captionsStyle}
        sampleText={state.sampleText || "Sample Text"}
        onClose={() => setCaptionsStyleModalOpen(false)}
        onConfirm={(id) => {
          setState((s) => ({ ...s, captionsStyle: id }));
          setCaptionsStyleModalOpen(false);
        }}
      />
    </section>
  );
}
