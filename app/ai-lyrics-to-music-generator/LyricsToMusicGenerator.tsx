"use client";

import { useRef, useState } from "react";
import Link from "@/components/Link";
import { cn } from "@/lib/utils";

const GENERATOR_ID = "generator";

/** 结构片段：选择后插入到歌词框 */
const STRUCTURE_OPTIONS = [
  { label: "Verse 1", value: "(Verse 1)\n" },
  { label: "Verse 2", value: "\n\n(Verse 2)\n" },
  { label: "Chorus", value: "\n\n(Chorus)\n" },
  { label: "Bridge", value: "\n\n(Bridge)\n" },
  { label: "Pre-Chorus", value: "\n\n(Pre-Chorus)\n" },
  { label: "Outro", value: "\n\n(Outro)\n" },
];

/** 风格/情绪标签：选择后插入到歌词框末尾或光标处 */
const STYLE_TAGS = ["Pop", "Ballad", "R&B", "Acoustic", "Folk", "Soul", "Jazz", "Indie", "Rock", "Electronic"];

/** 右侧成果区示例（未生成时展示） */
const LYRICS_TO_MUSIC_EXAMPLES = [
  { title: "Pop ballad from your lyrics", description: "Paste verses and chorus, get a full song", tags: ["Pop", "Ballad"] },
  { title: "R&B with your words", description: "Smooth vocals and melody from your lyrics", tags: ["R&B", "Vocal"] },
  { title: "Acoustic folk from lyrics", description: "Turn your lines into a complete track", tags: ["Folk", "Acoustic"] },
];

type OpenPanel = "structure" | "style" | null;

export function LyricsToMusicGenerator({ pageTitle }: { pageTitle: string }) {
  const [lyrics, setLyrics] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertIntoLyrics = (text: string) => {
    const el = textareaRef.current;
    if (el) {
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const before = lyrics.slice(0, start);
      const after = lyrics.slice(end);
      const insert = text.trim();
      const sep = before && !before.endsWith("\n") ? "\n" : "";
      setLyrics(before + sep + insert + after);
      requestAnimationFrame(() => {
        const newPos = start + sep.length + insert.length;
        el.focus();
        el.setSelectionRange(newPos, newPos);
      });
    } else {
      setLyrics((prev) => (prev ? prev + "\n" + text.trim() : text.trim()));
    }
    setOpenPanel(null);
  };

  const appendTagToLyrics = (tag: string) => {
    setLyrics((prev) => (prev ? prev + ", " + tag : tag));
    textareaRef.current?.focus();
    setOpenPanel(null);
  };

  const togglePanel = (panel: OpenPanel) => {
    setOpenPanel((p) => (p === panel ? null : panel));
  };

  const handleTurnToMelody = () => {
    if (!lyrics.trim()) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      window.location.href = `/ai-music-generator?mode=own-lyrics&lyrics=${encodeURIComponent(lyrics.trim().slice(0, 500))}`;
    }, 1200);
  };

  return (
    <>
      <div className="flex flex-1 min-w-0 min-h-0 flex-col lg:flex-row" id={GENERATOR_ID}>
        {/* 中间：生成操作区（与 ai-music-generator 字体、布局对齐，不溢出第一屏） */}
        <aside className="flex w-full shrink-0 flex-col rounded-r-2xl bg-slate-900/30 border-r border-slate-800 min-h-0 overflow-hidden lg:w-[380px] xl:w-[420px] max-h-[100vh]">
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 pb-0 flex flex-col">
            <p className="text-xs text-slate-400 shrink-0">Paste your lyrics, then turn them into a full song.</p>
            <h2 className="mt-1 text-base font-semibold text-slate-100 shrink-0">Lyrics to Music</h2>
            <div className="mt-3 space-y-3 flex-1 min-h-0 flex flex-col">
              <div className="flex-1 min-h-0 flex flex-col">
                <label htmlFor="lyrics-input" className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-1 shrink-0">
                  Paste or type your lyrics
                </label>
                <textarea
                  ref={textareaRef}
                  id="lyrics-input"
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  placeholder="Verse 1&#10;Your words here...&#10;&#10;Chorus&#10;Let the melody rise..."
                  className="w-full min-h-[200px] max-h-[min(42vh,380px)] rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-400/60 resize-none"
                  aria-describedby="lyrics-hint"
                />
                <p id="lyrics-hint" className="mt-1 text-[10px] text-slate-500 shrink-0">
                  Our AI matches melody and production to the emotion and flow of your lyrics.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-800/30 p-3 overflow-hidden shrink-0">
                <p className="mb-2 text-xs font-medium text-slate-400">#Structure #Style</p>
                <div className="flex flex-wrap gap-1.5">
                  {(["structure", "style"] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => togglePanel(key)}
                      className={cn(
                        "shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium transition capitalize",
                        openPanel === key ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-slate-700 bg-slate-950 text-slate-400 hover:border-violet-500/50 hover:text-violet-200"
                      )}
                    >
                      {key} {openPanel === key ? "▾" : "▸"}
                    </button>
                  ))}
                </div>
                {openPanel === "structure" && (
                  <div className="mt-3 flex flex-wrap gap-1.5 rounded-xl overflow-hidden">
                    {STRUCTURE_OPTIONS.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => insertIntoLyrics(opt.value)}
                        className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[10px] text-slate-300 hover:border-violet-500/50 hover:text-violet-200"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
                {openPanel === "style" && (
                  <div className="mt-3 flex flex-wrap gap-1.5 rounded-xl overflow-hidden">
                    {STYLE_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => appendTagToLyrics(tag)}
                        className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[10px] text-slate-300 hover:border-violet-500/50 hover:text-violet-200"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[10px] text-slate-500 shrink-0">
                Optional: after you continue, you can set genre, mood, and vocal style in the music generator.
              </p>
              <Link href="/ai-lyrics-generator" className="inline-block text-xs font-medium text-violet-300 underline underline-offset-2 hover:text-violet-200 shrink-0">
                Need lyrics? Generate with AI first →
              </Link>
            </div>
          </div>
          <div className="shrink-0 border-t border-slate-800 p-4 bg-slate-900/30">
            <button
              type="button"
              onClick={handleTurnToMelody}
              disabled={!lyrics.trim() || isAnimating}
              className={`w-full rounded-full py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 ${
                isAnimating
                  ? "cursor-wait bg-violet-500"
                  : "bg-violet-600 hover:bg-violet-500 hover:shadow-[0_0_24px_rgba(124,58,237,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
              }`}
            >
              {isAnimating ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
                  Turning words into melody…
                </span>
              ) : (
                <>
                  <svg className="inline-block w-4 h-4 mr-1.5 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  Turn Lyrics to Melody
                </>
              )}
            </button>
          </div>
        </aside>

        {/* 右侧：成果展示区（H1 在此） */}
        <div className="flex flex-1 min-w-0 min-h-0 flex-col rounded-l-2xl bg-slate-800/30 overflow-hidden">
          <div className="shrink-0 px-4 pt-3 pb-2 rounded-tl-2xl bg-slate-900/50">
            <h1 className="text-base font-semibold text-slate-100 md:text-lg truncate max-w-full">{pageTitle}</h1>
            <p className="mt-0.5 text-xs text-slate-400">
              After you click Turn Lyrics to Melody, you&apos;ll continue in the full music generator to complete and download your track.
            </p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
            <div className="rounded-xl border border-slate-700/80 bg-slate-900/50 p-4 mb-4">
              <p className="text-sm text-slate-300">
                Paste your lyrics in the left panel and click <strong className="text-violet-300">Turn Lyrics to Melody</strong>. You&apos;ll be taken to the AI Music Generator with your lyrics pre-filled so you can set style and generate the final song.
              </p>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-2">Example use cases</p>
            <ul className="space-y-2">
              {LYRICS_TO_MUSIC_EXAMPLES.map((item, i) => (
                <li key={i}>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-100">{item.title}</p>
                      <p className="truncate text-xs text-slate-400 mt-0.5">{item.description}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-400">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/ai-music-generator"
              className="mt-4 block w-full rounded-lg border border-slate-600 bg-slate-800/60 py-2.5 text-center text-sm font-medium text-slate-200 hover:bg-slate-700/60 transition"
            >
              Open AI Music Generator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
