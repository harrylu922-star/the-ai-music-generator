"use client";

import { useState, useCallback, useMemo } from "react";
import { useLoginPreview } from "../../lib/use-login-preview";

type LyricHistoryItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  lyrics: string;
  status: "completed" | "generating";
  createdAt: number;
};

type StatusFilter = "all" | "completed" | "generating";
type SortOrder = "newest" | "oldest";

const VOCAL_OPTIONS = ["Male Vocal", "Female Vocal", "Male And Female Vocal"] as const;
type VocalChoice = (typeof VOCAL_OPTIONS)[number] | "";

const GENRES = ["Hip Hop", "Jazz", "Reggae", "Pop", "R&B", "EDM", "Country", "Folk", "Rock", "Blues", "Classical", "Disco", "Funk"];
const MOODS = ["Joyous", "Sad", "Gentle", "Warm", "Cold", "Festive", "Romantic", "Soothing", "Inspiring", "Soulful"];
const INSTRUMENTS = ["Piano", "Guitar", "Drums", "Bass", "Synth", "Strings", "Vocal", "Electric Guitar", "Acoustic"];
const AMBIENCES = ["Studio", "Live", "Epic", "Minimal", "Warm", "Spacey"];
type TagPanel = "genre" | "mood" | "instrument" | "ambience" | null;

function appendToPrompt(current: string, value: string, maxLen = 500): string {
  const t = value.trim();
  if (!t) return current;
  const next = current ? current + ", " + t : t;
  return next.slice(0, maxLen);
}

/** 未登录时右侧展示的示例（仅用于 Explore 面板） */
const LYRICS_EXPLORE_EXAMPLES: Pick<LyricHistoryItem, "title" | "description" | "tags" | "lyrics">[] = [
  { title: "Happy Birthday for Mary", description: "Write a song for Mary, Mary is my mom.", tags: ["Happy", "Verse-Chorus-Bridge", "Folk", "English"], lyrics: "Verse 1\nOhio skies, a gentle breeze\n\nChorus\nOh, Mary, Mary, heart so true\nHappy birthday, shine so bright" },
  { title: "Forever Starts Now", description: "A love song about committing to the future.", tags: ["Romantic", "AABA", "Hip-hop", "English"], lyrics: "Verse 1\nI used to run from anything that felt like truth\n\nBridge\nForever starts now, I'm in" },
  { title: "Miles Apart, Hearts Together", description: "Long-distance dedication.", tags: ["Sad", "Free form", "Pop", "English"], lyrics: "Miles apart but we're not far\nYou're in my heart wherever you are" },
];

/** 未登录时右侧展示的「由歌词生成的歌曲」示例，用于填充空白区 */
const GENERATED_SONGS_EXAMPLES: { title: string; tags: string; duration: string; fromLyrics?: string }[] = [
  { title: "Happy Birthday for Mary", tags: "Folk · Acoustic", duration: "02:48", fromLyrics: "Happy Birthday for Mary" },
  { title: "Forever Starts Now", tags: "Pop · Romantic", duration: "03:12", fromLyrics: "Forever Starts Now" },
  { title: "Miles Apart, Hearts Together", tags: "Pop · Ballad", duration: "03:35", fromLyrics: "Miles Apart, Hearts Together" },
];

function LyricDetailModal({
  item,
  onClose,
}: {
  item: LyricHistoryItem;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 z-50 w-[min(90vw,480px)] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-xl border border-slate-700 bg-slate-900 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lyric-detail-title"
      >
        <div className="shrink-0 flex items-center justify-between border-b border-slate-700 px-4 py-3">
          <h2 id="lyric-detail-title" className="text-lg font-semibold text-slate-100 truncate pr-2">
            {item.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3">
          {item.description && (
            <p className="text-sm text-slate-400">{item.description}</p>
          )}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-700">
            {item.lyrics}
          </pre>
        </div>
      </div>
    </>
  );
}

export function LyricsGeneratorWorkspace() {
  const isLoggedIn = useLoginPreview();
  const [detailItem, setDetailItem] = useState<LyricHistoryItem | null>(null);
  const [history, setHistory] = useState<LyricHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [vocalChoice, setVocalChoice] = useState<VocalChoice>("");
  const [prompt, setPrompt] = useState("");
  const [openTagPanel, setOpenTagPanel] = useState<TagPanel>(null);
  const [vocalDropdownOpen, setVocalDropdownOpen] = useState(false);

  const filteredAndSortedHistory = useMemo(() => {
    let list = [...history];
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (statusFilter !== "all") {
      list = list.filter((item) => item.status === statusFilter);
    }
    list.sort((a, b) => (sortOrder === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt));
    return list;
  }, [history, searchQuery, statusFilter, sortOrder]);

  const openDetail = useCallback((item: LyricHistoryItem) => setDetailItem(item), []);
  const closeDetail = useCallback(() => setDetailItem(null), []);

  const addTagToPrompt = useCallback((value: string) => {
    setPrompt((prev) => appendToPrompt(prev, value));
  }, []);

  const selectVocal = useCallback((opt: VocalChoice) => {
    setVocalChoice(opt);
    setPrompt((prev) => {
      const without = prev.replace(/\b(Male Vocal|Female Vocal|Male And Female Vocal)\b/g, "").replace(/,?\s+,/g, ", ").trim().replace(/^,\s*|,\s*$/g, "");
      return opt ? (without ? without + ", " + opt : opt) : without;
    });
    setVocalDropdownOpen(false);
  }, []);

  const handleGenerate = useCallback(() => {
    const form = document.querySelector("form[data-lyrics-form]") as HTMLFormElement | null;
    const title = (form?.querySelector("[name='title']") as HTMLInputElement)?.value?.trim() || "Untitled";
    const structure = (form?.querySelector("[name='structure']") as HTMLSelectElement)?.value || "";
    const style = (form?.querySelector("[name='style']") as HTMLSelectElement)?.value || "";
    const language = (form?.querySelector("[name='language']") as HTMLSelectElement)?.value || "";
    const tags = [structure, style, language, vocalChoice].filter(Boolean);
    const id = Date.now().toString();
    const newItem: LyricHistoryItem = {
      id,
      title,
      description: prompt.trim() || "—",
      tags,
      lyrics: "(Your generated lyrics will appear here.)",
      status: "generating",
      createdAt: Date.now(),
    };
    setHistory((prev) => [newItem, ...prev]);
    setTimeout(() => {
      setHistory((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: "completed" as const, lyrics: item.lyrics || "(Lyrics generated.)" }
            : item
        )
      );
    }, 1500);
  }, [prompt, vocalChoice]);

  return (
    <div className="flex flex-1 min-w-0 min-h-0 flex-col lg:flex-row">
      {/* 中间：表单区，CTA 贴底；#Genre/#Mood/#Instrument/#Ambience 多选下拉写入 prompt，Vocal 单选下拉 */}
      <aside className="flex w-full shrink-0 flex-col rounded-r-2xl bg-slate-900/40 lg:w-[380px] xl:w-[420px] min-h-0 overflow-hidden">
        <form data-lyrics-form className="flex flex-1 flex-col min-h-0" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <h2 className="text-base font-semibold text-slate-100">AI Lyrics Generator</h2>
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-1">Title (optional)</label>
              <input name="title" type="text" maxLength={80} placeholder="0/80" className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-400/50" />
            </div>
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-1">Prompt · Get inspired</label>
              <textarea name="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value.slice(0, 500))} rows={3} placeholder="Theme, mood, key phrase…" className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-400/50 resize-none" />
              <p className="mt-1 text-xs text-slate-500">{prompt.length}/500</p>
            </div>
            <div className="rounded-2xl bg-slate-800/30 p-3 overflow-hidden">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">#Genre #Mood #Instrument #Ambience</p>
              <div className="flex flex-wrap gap-1.5">
                {(["genre", "mood", "instrument", "ambience"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setOpenTagPanel((p) => (p === key ? null : key))}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition capitalize ${openTagPanel === key ? "bg-violet-500/20 text-violet-300" : "bg-slate-700/60 text-slate-300 hover:bg-slate-600/60"}`}
                  >
                    {key} {openTagPanel === key ? "▾" : "▸"}
                  </button>
                ))}
              </div>
              {openTagPanel === "genre" && (
                <div className="mt-3 flex flex-wrap gap-1.5 rounded-xl overflow-hidden">
                  {GENRES.map((g) => (
                    <button key={g} type="button" onClick={() => addTagToPrompt(g)} className="rounded-full px-2.5 py-1 text-xs bg-slate-700/50 text-slate-300 hover:bg-violet-500/20 hover:text-violet-300 transition">
                      {g}
                    </button>
                  ))}
                </div>
              )}
              {openTagPanel === "mood" && (
                <div className="mt-3 flex flex-wrap gap-1.5 rounded-xl overflow-hidden">
                  {MOODS.map((m) => (
                    <button key={m} type="button" onClick={() => addTagToPrompt(m)} className="rounded-full px-2.5 py-1 text-xs bg-slate-700/50 text-slate-300 hover:bg-violet-500/20 hover:text-violet-300 transition">
                      {m}
                    </button>
                  ))}
                </div>
              )}
              {openTagPanel === "instrument" && (
                <div className="mt-3 flex flex-wrap gap-1.5 rounded-xl overflow-hidden">
                  {INSTRUMENTS.map((i) => (
                    <button key={i} type="button" onClick={() => addTagToPrompt(i)} className="rounded-full px-2.5 py-1 text-xs bg-slate-700/50 text-slate-300 hover:bg-violet-500/20 hover:text-violet-300 transition">
                      {i}
                    </button>
                  ))}
                </div>
              )}
              {openTagPanel === "ambience" && (
                <div className="mt-3 flex flex-wrap gap-1.5 rounded-xl overflow-hidden">
                  {AMBIENCES.map((a) => (
                    <button key={a} type="button" onClick={() => addTagToPrompt(a)} className="rounded-full px-2.5 py-1 text-xs bg-slate-700/50 text-slate-300 hover:bg-violet-500/20 hover:text-violet-300 transition">
                      {a}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-1">Vocal</label>
              <button
                type="button"
                onClick={() => setVocalDropdownOpen((o) => !o)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-sm text-left text-slate-200 hover:bg-slate-800/60 flex items-center justify-between"
              >
                <span>{vocalChoice || "Select vocal (optional)"}</span>
                <span className="text-slate-500">{vocalDropdownOpen ? "▾" : "▸"}</span>
              </button>
              {vocalDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-slate-700/80 bg-slate-900 shadow-lg z-10 overflow-hidden">
                  {VOCAL_OPTIONS.map((opt) => (
                    <button key={opt} type="button" onClick={() => selectVocal(opt)} className={`block w-full px-3 py-2 text-sm text-left text-slate-200 hover:bg-slate-800/80 ${vocalChoice === opt ? "bg-violet-500/20 text-violet-300" : ""}`}>
                      {opt}
                    </button>
                  ))}
                  <button type="button" onClick={() => selectVocal("")} className="block w-full px-3 py-2 text-sm text-left text-slate-500 hover:bg-slate-800/80">
                    Clear
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-1">Structure</label>
                <select name="structure" className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-2 py-2 text-xs text-slate-200">
                  <option>Verse/Chorus</option>
                  <option>Verse/Chorus/Bridge</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-1">Style</label>
                <select name="style" className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-2 py-2 text-xs text-slate-200">
                  <option>Pop</option>
                  <option>Hip Hop</option>
                  <option>Rock</option>
                  <option>R&B</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-1">Language</label>
                <select name="language" className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-2 py-2 text-xs text-slate-200">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="shrink-0 p-4 pt-3 bg-slate-900/50 rounded-t-2xl">
            <button type="submit" className="w-full rounded-full bg-violet-500 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:bg-violet-400 transition">
              Generate for Free Now
            </button>
          </div>
        </form>
      </aside>

      {/* 右侧：对标 text-to-music — 标题区固定，内容区充满且内部滚动，不溢出 */}
      <div className="flex flex-1 min-w-0 min-h-0 flex-col rounded-r-2xl bg-slate-800/30 overflow-hidden">
        <div className="shrink-0 px-4 pt-3 pb-2 rounded-tr-2xl bg-slate-900/50">
          <h1 className="text-base font-semibold text-slate-100 md:text-lg">
            {isLoggedIn ? "My Workspace" : "AI Lyrics Generator for Free"}
          </h1>
          <p className="mt-0.5 text-xs text-slate-400">
            {isLoggedIn ? "Your generated lyrics" : "Explore some lyrics examples generated by AI"}
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
                  aria-label="Search lyrics"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Status</span>
                {(["all", "completed", "generating"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-full px-2.5 py-1 text-xs transition ${
                      statusFilter === status ? "bg-violet-500/20 text-violet-300" : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                    }`}
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
                    className={`rounded-full px-2.5 py-1 text-xs transition ${
                      sortOrder === order ? "bg-violet-500/20 text-violet-300" : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                    }`}
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
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-slate-300">No lyrics yet</p>
                  <p className="mt-1 text-xs text-slate-500 max-w-[220px]">Generate your first lyrics using the form on the left. Your creations will appear here.</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {filteredAndSortedHistory.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => openDetail(item)}
                        className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-left hover:border-violet-500/50 hover:bg-slate-800/80 transition"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-slate-100 truncate">{item.title}</span>
                          <p className="mt-0.5 text-xs text-slate-400 truncate">{item.description || "—"}</p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {item.tags.slice(0, 4).map((tag) => (
                              <span key={tag} className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-400">
                                {tag.length > 14 ? `${tag.slice(0, 12)}…` : tag}
                              </span>
                            ))}
                          </div>
                          {item.status === "generating" && (
                            <span className="mt-1 inline-block rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-400">Generating…</span>
                          )}
                        </div>
                        <span className="shrink-0 text-slate-500" aria-hidden>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-1 min-h-0 flex-col px-4 py-3 overflow-hidden">
            <div className="flex-1 min-h-0 overflow-y-auto">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-2">Lyrics examples</p>
              <ul className="space-y-2">
                {LYRICS_EXPLORE_EXAMPLES.map((ex, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => openDetail({ ...ex, id: `explore-${i}`, status: "completed", createdAt: 0 })}
                      className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-left hover:border-violet-500/50 hover:bg-slate-800/80 transition"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-slate-100 truncate">{ex.title}</span>
                        <p className="mt-0.5 text-xs text-slate-400 truncate">{ex.description}</p>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {ex.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-400">
                              {tag.length > 14 ? `${tag.slice(0, 12)}…` : tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="shrink-0 text-slate-500" aria-hidden>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 mt-4 mb-2">Generated songs</p>
              <p className="text-xs text-slate-400 mb-3">Turn lyrics into full tracks with the AI Music Generator.</p>
              <div className="space-y-2">
                {GENERATED_SONGS_EXAMPLES.map((s) => (
                  <article key={s.title} className="rounded-xl border border-slate-700 bg-slate-900/80 overflow-hidden flex gap-3 p-2.5">
                    <div className="w-14 h-14 shrink-0 bg-slate-800/50 rounded-lg flex items-center justify-center">
                      <span className="text-slate-500" aria-hidden>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-50 truncate">{s.title}</h3>
                      <p className="text-xs text-slate-400 truncate">{s.duration} · {s.tags}</p>
                      {s.fromLyrics && (
                        <p className="text-[10px] text-slate-500 mt-0.5 truncate">From lyrics: {s.fromLyrics}</p>
                      )}
                      <button type="button" className="text-xs text-violet-300 hover:text-violet-200 mt-1">Play</button>
                    </div>
                  </article>
                ))}
              </div>
              <a href="/ai-music-generator" className="inline-block mt-3 text-xs font-medium text-violet-300 hover:text-violet-200">
                Create your song in AI Music Generator →
              </a>
            </div>
            <div className="shrink-0 pt-3">
              <a
                href="/"
                className="block w-full rounded-lg border border-slate-600 bg-slate-800/60 py-2.5 text-center text-sm font-medium text-slate-200 hover:bg-slate-700/60 transition"
              >
                Sign in to save your creations
              </a>
            </div>
          </div>
        )}
      </div>

      {detailItem && (
        <LyricDetailModal item={detailItem} onClose={closeDetail} />
      )}
    </div>
  );
}
