"use client";

import { useEffect, useState } from "react";
import Link from "@/components/Link";
import { useLoginPreview } from "../../lib/use-login-preview";
import { apiJson, pollMusicJob, type ClientGenerationJob } from "../../lib/client/generation";

const genres = ["Hip Hop", "Jazz", "Pop", "R&B", "EDM", "Rock", "Blues", "Classical", "Funk"];
const moods = ["Joyous", "Sad", "Gentle", "Warm", "Festive", "Romantic", "Soothing", "Inspiring"];

/** 与 ai-music-generator 右侧 Explore 区域一致的示例数据 */
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
  status: "completed" | "generating" | "failed";
  audioUrl?: string;
  error?: string;
  createdAt: number;
}

type StatusFilter = "all" | "completed" | "generating" | "failed";
type SortOrder = "newest" | "oldest";

export function TextToMusicWorkspace() {
  const isLoggedIn = useLoginPreview();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const filteredAndSortedHistory: HistoryItem[] = history;

  const updateJob = (temporaryId: string, job: ClientGenerationJob) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === temporaryId
          ? {
              id: job.id,
              title: job.title,
              prompt,
              duration: job.result?.duration
                ? `${Math.floor(job.result.duration / 60)}:${Math.floor(job.result.duration % 60).toString().padStart(2, "0")}`
                : "—",
              status: job.status === "completed" ? "completed" : job.status === "failed" ? "failed" : "generating",
              audioUrl: job.result?.audioUrl,
              error: job.error ?? undefined,
              createdAt: item.createdAt,
            }
          : item
      )
    );
  };

  const handleGenerate = async () => {
    if (isGenerating || !prompt.trim()) return;
    const temporaryId = `pending-${Date.now()}`;
    setHistory((prev) => [{
      id: temporaryId,
      title: "Untitled",
      prompt,
      duration: "—",
      status: "generating",
      createdAt: Date.now(),
    }, ...prev]);
    setIsGenerating(true);
    let activeId = temporaryId;
    try {
      const data = await apiJson<{ job: ClientGenerationJob }>("/api/music/generate", {
        method: "POST",
        body: JSON.stringify({ title: "Untitled", prompt }),
      });
      activeId = data.job.id;
      updateJob(temporaryId, data.job);
      const finalJob = await pollMusicJob(data.job, (job) => updateJob(temporaryId, job));
      updateJob(temporaryId, finalJob);
    } catch (error) {
      setHistory((prev) => prev.map((item) =>
        item.id === activeId
          ? { ...item, status: "failed" as const, error: error instanceof Error ? error.message : "Music generation failed." }
          : item
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    void apiJson<{ jobs: ClientGenerationJob[] }>("/api/jobs?type=music", { cache: "no-store" })
      .then(({ jobs }) => {
        setHistory(jobs.map((job) => ({
          id: job.id,
          title: job.title,
          prompt: String(job.request.prompt ?? "—"),
          duration: job.result?.duration
            ? `${Math.floor(job.result.duration / 60)}:${Math.floor(job.result.duration % 60).toString().padStart(2, "0")}`
            : "—",
          status: job.status === "completed" ? "completed" : job.status === "failed" ? "failed" : "generating",
          audioUrl: job.result?.audioUrl,
          error: job.error ?? undefined,
          createdAt: job.createdAt,
        })));
      })
      .catch(() => undefined);
  }, [isLoggedIn]);

  return (
    <div className="flex flex-1 min-w-0 min-h-0 flex-col lg:flex-row">
      {/* 左侧：Text to Music 表单区，与当前 page 一致 */}
      <aside className="flex w-full shrink-0 flex-col rounded-r-2xl bg-slate-900/40 lg:w-[380px] xl:w-[420px] min-h-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h2 className="text-base font-semibold text-slate-100">Text to Music</h2>
          <p className="text-xs text-slate-400">Describe the music you want. Genre, mood, instruments, atmosphere.</p>
          <div>
            <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-400 mb-1">Prompt · Get Inspired</label>
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value.slice(0, 500))} rows={5} placeholder="e.g. Upbeat pop with acoustic guitar and warm vocals, summer vibes… 0/500" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-400/60 resize-none" />
            <p className="mt-1 text-right text-[10px] text-slate-400">{prompt.length}/500</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mb-2">#Genre #Mood</p>
            <div className="flex flex-wrap gap-1">
              {genres.slice(0, 5).map((g) => (
                <button key={g} type="button" className="rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-[10px] text-slate-400 hover:border-violet-500/50 hover:text-violet-200">{g}</button>
              ))}
              {moods.slice(0, 4).map((m) => (
                <button key={m} type="button" className="rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-[10px] text-slate-400 hover:border-violet-500/50 hover:text-violet-200">{m}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="instrumental" className="rounded border-slate-600 text-violet-500 focus:ring-violet-500" />
            <label htmlFor="instrumental" className="text-sm text-slate-300">Instrumental only</label>
          </div>
        </div>
        <div className="shrink-0 p-4 pt-3 bg-slate-900/50 rounded-t-2xl">
          <button type="button" onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="w-full rounded-full bg-violet-600 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:bg-violet-500 transition disabled:cursor-wait disabled:opacity-60">
            {isGenerating ? "Generating music…" : "Generate Music for Free Now"}
          </button>
        </div>
      </aside>

      {/* 右侧：与 ai-music-generator 对应区域一致 — 标题栏 + 登录时 My Workspace / 未登录时 Explore 示例 + Sign in CTA */}
      <div className="flex flex-1 min-w-0 min-h-0 flex-col rounded-l-2xl bg-slate-800/30 overflow-hidden">
        <div className="shrink-0 px-4 pt-3 pb-2 rounded-tl-2xl bg-slate-900/50">
          <h1 className="text-base font-semibold text-slate-100 md:text-lg">
            {isLoggedIn ? "My Workspace" : "Text to Music for Free"}
          </h1>
          <p className="mt-0.5 text-xs text-slate-400">
            {isLoggedIn ? "Your generated tracks" : "Explore some music examples generated by AI"}
          </p>
        </div>

        {isLoggedIn ? (
          <>
            <div className="shrink-0 px-4 py-3 space-y-2 border-b border-slate-800/50">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title or prompt…"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-400/60"
                  aria-label="Search tracks"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Status</span>
                {(["all", "completed", "generating", "failed"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-full px-2.5 py-1 text-xs transition ${
                      statusFilter === status ? "bg-violet-500/20 text-violet-300" : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {status === "all" ? "All" : status === "completed" ? "Completed" : status === "failed" ? "Failed" : "Generating"}
                  </button>
                ))}
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 ml-1">Sort</span>
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
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                  </div>
                  <p className="text-sm font-medium text-slate-300">No tracks yet</p>
                  <p className="mt-1 text-xs text-slate-400 max-w-[220px]">Generate your first track using the form on the left. Your creations will appear here.</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {filteredAndSortedHistory.map((item) => (
                    <li key={item.id}>
                      <article className="flex w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 p-3 text-left">
                        <div className="h-12 w-12 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-100">{item.title}</p>
                          <p className="truncate text-xs text-slate-400 mt-0.5">{item.prompt}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs text-slate-400">{item.duration}</span>
                            {item.status === "generating" && (
                              <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-400">Generating…</span>
                            )}
                            {item.status === "failed" && (
                              <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] text-red-300">Failed</span>
                            )}
                          </div>
                          {item.error && <p className="mt-1 text-xs text-red-300">{item.error}</p>}
                          {item.audioUrl && item.status === "completed" && (
                            <audio controls preload="none" src={item.audioUrl} onClick={(event) => event.stopPropagation()} className="mt-2 h-8 w-full" />
                          )}
                        </div>
                        <span className="shrink-0 text-slate-400" aria-hidden>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </span>
                      </article>
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
                    <div className="h-12 w-12 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
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
                      <span className="text-xs text-slate-400">{item.duration}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/auth?next=/text-to-music"
              className="mt-4 block w-full rounded-lg border border-slate-600 bg-slate-800/60 py-2.5 text-center text-sm font-medium text-slate-200 hover:bg-slate-700/60 transition"
            >
              Sign in to save your creations
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
