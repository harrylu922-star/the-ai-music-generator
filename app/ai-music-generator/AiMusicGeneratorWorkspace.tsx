"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { useLoginPreview } from "../../lib/use-login-preview";

const PROMPT_PRESETS = [
  "Upbeat pop with acoustic guitar and warm vocals, summer vibes",
  "Dark electronic with heavy bass and atmospheric synths, 120 BPM",
  "Smooth R&B with soft piano and warm male vocals, late night vibe",
];
const COVER_STYLE_PRESETS = [
  "Smooth R&B with soft piano and warm male vocals, late night vibe",
  "Upbeat pop with acoustic guitar and catchy chorus, summer feel",
  "Dark electronic with heavy bass and atmospheric synths",
];

const genres = ["Hip Hop", "Jazz", "Reggae", "Pop", "R&B", "EDM", "Country", "Folk", "Rock", "Blues", "Classical", "Disco", "Funk"];
const moods = ["Joyous", "Sad", "Gentle", "Warm", "Cold", "Festive", "Romantic", "Soothing", "Inspiring", "Soulful"];
const instruments = ["Piano", "Guitar", "Drums", "Bass", "Synth", "Strings", "Vocal", "Electric Guitar", "Acoustic"];
const ambiences = ["Studio", "Live", "Epic", "Minimal", "Warm", "Spacey"];
const VOCAL_OPTIONS = ["Male Vocal", "Female Vocal", "Male And Female Vocal"] as const;
type OpenPanel = "genre" | "mood" | "instrument" | "ambience" | "vocal" | null;

/** 未登录时右侧展示的示例（仅用于 Explore 面板） */
const MUSIC_EXPLORE_EXAMPLES = [
  { title: "High-Energy Progressive House Anthem", description: "Built for massive festival moments", duration: "03:21", tags: ["EDM", "Progressive House"] },
  { title: "Cold and Mysterious Lofi Vocal Track", description: "Floating through dreamy night echoes", duration: "02:35", tags: ["Mystery", "Cold", "Lofi Vocal"] },
  { title: "Smooth and Lazy Neo-Soul R&B Groove", description: "Designed for slow comfortable evenings", duration: "03:05", tags: ["R&B", "Lazy", "Neo-Soul"] },
  { title: "Warm Chill Folk-Country Journey", description: "Filled with acoustic strings and gentle stories", duration: "04:01", tags: ["Folk", "Country", "Chill"] },
];

interface HistoryItem {
  id: string;
  title: string;
  prompt: string;
  duration: string;
  status: "completed" | "generating";
  createdAt: number;
}

type StatusFilter = "all" | "completed" | "generating";
type SortOrder = "newest" | "oldest";

function appendToPrompt(current: string, value: string, maxLength = 500): string {
  const trimmed = value.trim();
  if (!trimmed) return current;
  const next = current ? current + ", " + trimmed : trimmed;
  return next.slice(0, maxLength);
}

type TabMode = "prompt" | "own-lyrics";

export function AiMusicGeneratorWorkspace() {
  const searchParams = useSearchParams();
  const isLoggedIn = useLoginPreview();
  const [tabMode, setTabMode] = useState<TabMode>("prompt");
  const [workspaceExpanded, setWorkspaceExpanded] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [coverStyle, setCoverStyle] = useState("");
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [vocalChoice, setVocalChoice] = useState<string>("");
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const lyricsRef = useRef<HTMLTextAreaElement>(null);
  const coverStyleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (searchParams.get("mode") === "own-lyrics") setTabMode("own-lyrics");
  }, [searchParams]);

  const addVocalToPrompt = (value: string) => {
    setPrompt((prev) => {
      const without = prev.replace(/\b(Male Vocal|Female Vocal|Male And Female Vocal)\b/g, "").replace(/,?\s+,/g, ", ").trim().replace(/^,\s*|,\s*$/g, "");
      return value ? (without ? without + ", " + value : value) : without;
    });
    setVocalChoice(value);
    setOpenPanel(null);
  };

  const addToCoverStyle = (value: string) => {
    setCoverStyle((prev) => appendToPrompt(prev, value, 500));
    coverStyleRef.current?.focus();
  };

  const setVocalInCoverStyle = (value: string) => {
    setCoverStyle((prev) => {
      const without = prev.replace(/\b(Male Vocal|Female Vocal|Male And Female Vocal)\b/gi, "").replace(/,?\s+,/g, ", ").trim().replace(/^,\s*|,\s*$/g, "");
      return value ? (without ? without + ", " + value : value) : without;
    });
    setVocalChoice(value);
    setOpenPanel(null);
    coverStyleRef.current?.focus();
  };

  const handleGetInspiredCover = () => {
    const preset = COVER_STYLE_PRESETS[Math.floor(Math.random() * COVER_STYLE_PRESETS.length)];
    setCoverStyle((s) => (s ? s + "\n" + preset : preset));
    coverStyleRef.current?.focus();
  };

  const handleSelectTrack = (id: string) => {
    setPlayingId(id);
    setPlayerVisible(true);
  };

  const handleGetInspired = () => {
    const preset = PROMPT_PRESETS[Math.floor(Math.random() * PROMPT_PRESETS.length)];
    setPrompt(preset);
    promptRef.current?.focus();
  };

  const addToPrompt = (value: string) => {
    setPrompt((prev) => appendToPrompt(prev, value));
    promptRef.current?.focus();
  };

  const togglePanel = (panel: OpenPanel) => {
    setOpenPanel((p) => (p === panel ? null : panel));
  };

  const handleGenerate = () => {
    const id = Date.now().toString();
    setHistory((prev) => [
      { id, title: title || "Untitled", prompt: prompt || "—", duration: "—", status: "generating", createdAt: Date.now() },
      ...prev,
    ]);
    setPlayingId(id);
    setPlayerVisible(true);
    // MVP: 无真实 API 时，延迟后标记为完成，避免一直处于 generating
    setTimeout(() => {
      setHistory((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "completed" as const } : item
        )
      );
    }, 2000);
  };

  const filteredAndSortedHistory = useMemo(() => {
    let list = [...history];
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((item) => item.title.toLowerCase().includes(q) || item.prompt.toLowerCase().includes(q));
    }
    if (statusFilter !== "all") {
      list = list.filter((item) => item.status === statusFilter);
    }
    list.sort((a, b) => (sortOrder === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt));
    return list;
  }, [history, searchQuery, statusFilter, sortOrder]);

  const playingItem = history.find((h) => h.id === playingId);

  return (
    <>
      <div className="flex flex-1 min-w-0 min-h-0 flex-col lg:flex-row">
        {/* 中间：表单区，与 Own Lyrics 同布局（标题 + 双标签 + 表单 + CTA 贴底） */}
        <aside
          className={cn(
            "flex w-full shrink-0 flex-col rounded-r-2xl bg-slate-900/30 border-r border-slate-800 min-h-0 overflow-hidden transition-[width] duration-200",
            workspaceExpanded ? "lg:w-[520px] xl:w-[580px]" : "lg:w-[380px] xl:w-[420px]"
          )}
        >
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 pb-0">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-slate-100">AI Music Generator</h2>
              <button
                type="button"
                onClick={() => setWorkspaceExpanded((e) => !e)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                title={workspaceExpanded ? "Collapse" : "Expand"}
                aria-label={workspaceExpanded ? "Collapse workspace" : "Expand workspace"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {workspaceExpanded ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />}
                </svg>
              </button>
            </div>
            <div className="flex gap-1 rounded-lg bg-slate-950 p-1 mt-3" role="tablist" aria-label="Prompt or Own Lyrics">
              <button
                type="button"
                role="tab"
                aria-selected={tabMode === "prompt"}
                aria-current={tabMode === "prompt" ? "page" : undefined}
                onClick={() => setTabMode("prompt")}
                className={cn("flex-1 rounded-md py-2 text-center text-xs font-medium transition", tabMode === "prompt" ? "bg-violet-500/20 text-violet-300" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50")}
              >
                Prompt
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tabMode === "own-lyrics"}
                aria-current={tabMode === "own-lyrics" ? "page" : undefined}
                onClick={() => setTabMode("own-lyrics")}
                className={cn("flex-1 rounded-md py-2 text-center text-xs font-medium transition", tabMode === "own-lyrics" ? "bg-violet-500/20 text-violet-300" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50")}
              >
                Own Lyrics
              </button>
            </div>

            {tabMode === "prompt" && (
            <div className="mt-3 space-y-3">
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-1">Title (optional)</label>
              <Input
                placeholder="0/80"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={80}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-400/60"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-1">Prompt · Get inspired</label>
              <div className="relative">
                <textarea
                  ref={promptRef}
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the music you want… genre, mood, instruments…"
                  maxLength={500}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 pr-20 pb-7 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-400/60"
                />
                <div className="absolute bottom-2 left-2 text-xs text-slate-500">{prompt.length}/500</div>
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <button type="button" onClick={() => setPrompt("")} className="text-xs text-slate-500 hover:text-violet-300">Clear</button>
                  <button type="button" onClick={handleGetInspired} className="text-xs font-medium text-violet-400 hover:text-violet-300">Get Inspired</button>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-800/30 p-3 overflow-hidden">
              <p className="mb-2 text-xs font-medium text-slate-400">#Genre #Mood #Instrument #Ambience #Vocal</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap gap-1.5">
                  {(["genre", "mood", "instrument"] as const).map((key) => (
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
                <div className="flex flex-wrap gap-1.5">
                  {(["ambience", "vocal"] as const).map((key) => (
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
                      {key === "vocal" && vocalChoice ? ` · ${vocalChoice}` : ""}
                    </button>
                  ))}
                </div>
              </div>
              {openPanel === "genre" && (
                <div className="mt-3 flex flex-wrap gap-1.5 rounded-xl overflow-hidden">
                  {genres.map((g) => (
                    <button key={g} type="button" onClick={() => addToPrompt(g)} className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[10px] text-slate-300 hover:border-violet-500/50 hover:text-violet-200">{g}</button>
                  ))}
                </div>
              )}
              {openPanel === "mood" && (
                <div className="mt-3 flex flex-wrap gap-1.5 rounded-xl overflow-hidden">
                  {moods.map((m) => (
                    <button key={m} type="button" onClick={() => addToPrompt(m)} className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[10px] text-slate-300 hover:border-violet-500/50 hover:text-violet-200">{m}</button>
                  ))}
                </div>
              )}
              {openPanel === "instrument" && (
                <div className="mt-3 flex flex-wrap gap-1.5 rounded-xl overflow-hidden">
                  {instruments.map((i) => (
                    <button key={i} type="button" onClick={() => addToPrompt(i)} className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[10px] text-slate-300 hover:border-violet-500/50 hover:text-violet-200">{i}</button>
                  ))}
                </div>
              )}
              {openPanel === "ambience" && (
                <div className="mt-3 flex flex-wrap gap-1.5 rounded-xl overflow-hidden">
                  {ambiences.map((a) => (
                    <button key={a} type="button" onClick={() => addToPrompt(a)} className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[10px] text-slate-300 hover:border-violet-500/50 hover:text-violet-200">{a}</button>
                  ))}
                </div>
              )}
              {openPanel === "vocal" && (
                <div className="mt-3 flex flex-wrap gap-1.5 rounded-xl overflow-hidden">
                  {VOCAL_OPTIONS.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => addVocalToPrompt(v)}
                      className={cn("rounded-full border px-2.5 py-1 text-[10px] font-medium", vocalChoice === v ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-slate-700 bg-slate-900/80 text-slate-300 hover:border-violet-500/50 hover:text-violet-200")}
                    >
                      {v}
                    </button>
                  ))}
                  <button type="button" onClick={() => addVocalToPrompt("")} className="rounded-full border border-slate-700 px-2.5 py-1 text-[10px] text-slate-500 hover:border-violet-500/50 hover:text-violet-200">Clear</button>
                </div>
              )}
            </div>
            </div>
            )}

            {tabMode === "own-lyrics" && (
            <div className="mt-3 space-y-2">
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-0.5">Title</label>
              <Input
                placeholder="0/80"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={80}
                className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-400/60"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-0.5">Lyrics (Cover)</label>
              <div className="relative">
                <textarea
                  ref={lyricsRef}
                  rows={3}
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value.slice(0, 5000))}
                  placeholder="Paste or type your lyrics…"
                  maxLength={5000}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 pr-16 pb-6 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-400/60 resize-none"
                />
                <div className="absolute top-1 right-1">
                  <button type="button" onClick={() => setLyrics("(Verse 1)\n…\n\n(Chorus)\n…\n\n(Verse 2)\n…")} className="text-[10px] font-medium text-violet-300 hover:text-violet-200">Auto</button>
                </div>
                <div className="absolute bottom-1 left-1 text-[10px] text-slate-500">{lyrics.length}/5000</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Cover Style</label>
                <button type="button" onClick={handleGetInspiredCover} className="text-[10px] font-medium text-violet-300 hover:text-violet-200">Get Inspired</button>
              </div>
              <textarea
                ref={coverStyleRef}
                rows={2}
                value={coverStyle}
                onChange={(e) => setCoverStyle(e.target.value.slice(0, 500))}
                placeholder="Describe the music style… 0/500"
                maxLength={500}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-400/60 resize-none"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">{coverStyle.length}/500</p>
            </div>
            <div className="rounded-2xl bg-slate-800/30 p-2.5 overflow-hidden">
              <p className="mb-1.5 text-[10px] font-medium text-slate-400">#Genre #Mood #Instrument #Ambience #Vocal</p>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap gap-1">
                  {(["genre", "mood", "instrument"] as const).map((key) => (
                    <button key={key} type="button" onClick={() => togglePanel(key)} className={cn("shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium transition capitalize", openPanel === key ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-slate-700 bg-slate-950 text-slate-400 hover:border-violet-500/50 hover:text-violet-200")}>{key} {openPanel === key ? "▾" : "▸"}</button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {(["ambience", "vocal"] as const).map((key) => (
                    <button key={key} type="button" onClick={() => togglePanel(key)} className={cn("shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium transition capitalize", openPanel === key ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-slate-700 bg-slate-950 text-slate-400 hover:border-violet-500/50 hover:text-violet-200")}>{key} {openPanel === key ? "▾" : "▸"}{key === "vocal" && vocalChoice ? ` · ${vocalChoice}` : ""}</button>
                  ))}
                </div>
              </div>
              {openPanel === "genre" && <div className="mt-2 flex flex-wrap gap-1">{genres.map((g) => <button key={g} type="button" onClick={() => addToCoverStyle(g)} className="rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300 hover:border-violet-500/50 hover:text-violet-200">{g}</button>)}</div>}
              {openPanel === "mood" && <div className="mt-2 flex flex-wrap gap-1">{moods.map((m) => <button key={m} type="button" onClick={() => addToCoverStyle(m)} className="rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300 hover:border-violet-500/50 hover:text-violet-200">{m}</button>)}</div>}
              {openPanel === "instrument" && <div className="mt-2 flex flex-wrap gap-1">{instruments.map((i) => <button key={i} type="button" onClick={() => addToCoverStyle(i)} className="rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300 hover:border-violet-500/50 hover:text-violet-200">{i}</button>)}</div>}
              {openPanel === "ambience" && <div className="mt-2 flex flex-wrap gap-1">{ambiences.map((a) => <button key={a} type="button" onClick={() => addToCoverStyle(a)} className="rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300 hover:border-violet-500/50 hover:text-violet-200">{a}</button>)}</div>}
              {openPanel === "vocal" && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {VOCAL_OPTIONS.map((v) => <button key={v} type="button" onClick={() => setVocalInCoverStyle(v)} className={cn("rounded-full border px-2 py-0.5 text-[10px]", vocalChoice === v ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-slate-700 bg-slate-900/80 text-slate-300 hover:border-violet-500/50 hover:text-violet-200")}>{v}</button>)}
                  <button type="button" onClick={() => setVocalInCoverStyle("")} className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-500 hover:text-violet-200">Clear</button>
                </div>
              )}
            </div>
            </div>
            )}
          </div>
          <div className="shrink-0 border-t border-slate-800 p-4 bg-slate-900/30">
            <button type="button" onClick={handleGenerate} className="w-full rounded-full bg-violet-500 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:bg-violet-400 transition">
              Generate Music for Free Now
            </button>
          </div>
        </aside>

        {/* 右侧：登录时 My Workspace，未登录时 Explore 示例 + Sign in CTA；标题栏统一 */}
        <div className="flex flex-1 min-w-0 min-h-0 flex-col rounded-l-2xl bg-slate-800/30 overflow-hidden">
          <div className="shrink-0 px-4 pt-3 pb-2 rounded-tl-2xl bg-slate-900/50">
            <h1 className="text-base font-semibold text-slate-100 md:text-lg">
              {isLoggedIn ? "My Workspace" : "AI Music Generator for Free"}
            </h1>
            <p className="mt-0.5 text-xs text-slate-400">
              {isLoggedIn ? "Your generated tracks" : "Explore some music examples generated by AI"}
            </p>
          </div>

          {isLoggedIn ? (
            <>
              <div className="shrink-0 px-4 py-3 space-y-2 border-b border-slate-800/50">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or prompt…"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-400/60"
                    aria-label="Search tracks"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Status</span>
                  {(["all", "completed", "generating"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs transition",
                        statusFilter === status ? "bg-violet-500/20 text-violet-300" : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                      )}
                    >
                      {status === "all" ? "All" : status === "completed" ? "Completed" : "Generating"}
                    </button>
                  ))}
                  <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 ml-1">Sort</span>
                  {(["newest", "oldest"] as const).map((order) => (
                    <button
                      key={order}
                      type="button"
                      onClick={() => setSortOrder(order)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs transition",
                        sortOrder === order ? "bg-violet-500/20 text-violet-300" : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                      )}
                    >
                      {order === "newest" ? "Newest" : "Oldest"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
                {filteredAndSortedHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-slate-800/80 p-4 mb-3">
                      <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                    </div>
                    <p className="text-sm font-medium text-slate-300">No tracks yet</p>
                    <p className="mt-1 text-xs text-slate-500 max-w-[220px]">Generate your first track using the form on the left. Your creations will appear here.</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {filteredAndSortedHistory.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleSelectTrack(item.id)}
                          className={cn(
                            "w-full flex items-center gap-3 rounded-xl border p-3 text-left transition",
                            playingId === item.id ? "border-violet-500 bg-violet-500/10" : "border-slate-700 bg-slate-900/80 hover:border-violet-500/50 hover:bg-slate-800/80"
                          )}
                        >
                          <div className="h-12 w-12 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-100">{item.title}</p>
                            <p className="truncate text-xs text-slate-400 mt-0.5">{item.prompt}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-xs text-slate-500">{item.duration}</span>
                              {item.status === "generating" && (
                                <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-400">Generating…</span>
                              )}
                            </div>
                          </div>
                          <span className="shrink-0 text-slate-400" aria-hidden>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
              <ul className="space-y-2">
                {MUSIC_EXPLORE_EXAMPLES.map((item, i) => (
                  <li key={i}>
                    <div className="w-full flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3">
                      <div className="h-12 w-12 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-100">{item.title}</p>
                        <p className="truncate text-xs text-slate-400 mt-0.5">{item.description}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <span key={tag} className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-400">{tag}</span>
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">{item.duration}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href="/"
                className="mt-4 block w-full rounded-lg border border-slate-600 bg-slate-800/60 py-2.5 text-center text-sm font-medium text-slate-200 hover:bg-slate-700/60 transition"
              >
                Sign in to save your creations
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Music player bar */}
      <footer
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex h-20 shrink-0 items-center justify-center border-t border-slate-800 bg-slate-900/95 backdrop-blur transition-[transform] duration-300 ease-out",
          playerVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex w-full max-w-2xl flex-1 items-center justify-center gap-4 px-4">
          <button type="button" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-100 hover:bg-violet-600" aria-label="Play / Pause">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </button>
          <div className="min-w-0 flex-1 max-w-md">
            <p className="truncate text-sm font-medium text-slate-100">{playingItem?.title ?? "No track selected"}</p>
            <p className="truncate text-xs text-slate-400">{playingItem?.prompt ?? "Select a track from history"}</p>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-700">
              <div className="h-full rounded-full bg-violet-500" style={{ width: `${playerProgress}%` }} />
            </div>
          </div>
          <span className="w-10 shrink-0 text-right text-xs text-slate-500">{playingItem?.duration ?? "0:00"}</span>
          <button type="button" className="shrink-0 rounded p-1.5 text-slate-400 hover:text-slate-200" aria-label="Volume">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
}
