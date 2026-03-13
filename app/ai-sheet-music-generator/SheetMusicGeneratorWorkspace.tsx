"use client";

import { useState, useRef } from "react";
import { cn } from "../../lib/utils";

type OutputFormat = "notation" | "midi" | "pdf";
type Status = "idle" | "uploaded" | "processing" | "done";

interface TranscriptionItem {
  id: string;
  fileName: string;
  status: "processing" | "completed";
  createdAt: number;
}

export function SheetMusicGeneratorWorkspace() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [outputFormats, setOutputFormats] = useState<OutputFormat[]>(["notation", "midi"]);
  const [workspaceExpanded, setWorkspaceExpanded] = useState(false);
  const [transcriptions, setTranscriptions] = useState<TranscriptionItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && /audio\//.test(file.type)) {
      setFileName(file.name);
      setStatus("uploaded");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setStatus("uploaded");
    }
  };

  const toggleOutputFormat = (format: OutputFormat) => {
    setOutputFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  const handleConvert = () => {
    if (!fileName) return;
    setStatus("processing");
    const id = Date.now().toString();
    setTranscriptions((prev) => [
      { id, fileName, status: "processing", createdAt: Date.now() },
      ...prev,
    ]);
    setSelectedId(id);
    setTimeout(() => {
      setStatus("done");
      setTranscriptions((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "completed" as const } : item
        )
      );
    }, 2500);
  };

  const handleClear = () => {
    setFileName(null);
    setStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const selectedItem = transcriptions.find((t) => t.id === selectedId);
  const hasPreview = selectedItem?.status === "completed";

  return (
    <div className="flex flex-1 min-w-0 min-h-0 flex-col lg:flex-row">
      {/* 左侧：操作区 — 上传 + 输出格式 + CTA */}
      <aside
        className={cn(
          "flex w-full shrink-0 flex-col rounded-r-2xl bg-slate-900/30 border-r border-slate-800 min-h-0 overflow-hidden transition-[width] duration-200",
          workspaceExpanded ? "lg:w-[420px] xl:w-[480px]" : "lg:w-[340px] xl:w-[380px]"
        )}
      >
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 pb-0">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-slate-100">Audio to Notation</h2>
            <button
              type="button"
              onClick={() => setWorkspaceExpanded((e) => !e)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              title={workspaceExpanded ? "Collapse" : "Expand"}
              aria-label={workspaceExpanded ? "Collapse workspace" : "Expand workspace"}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {workspaceExpanded ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                )}
              </svg>
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Upload audio to generate piano notation and sheet music
          </p>

          <div className="mt-4">
            <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-2">
              Source audio
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileChange}
              aria-label="Upload audio file for transcription"
            />
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={fileName ? undefined : () => fileInputRef.current?.click()}
              className={cn(
                "relative flex min-h-[140px] flex-col items-center justify-center rounded-xl border-2 border-dashed transition",
                isDragging && "border-violet-400/60 bg-violet-500/10",
                fileName && !isDragging && "border-slate-600 bg-slate-800/40",
                !fileName && !isDragging && "cursor-pointer border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50"
              )}
            >
              {!fileName ? (
                <>
                  <svg className="h-9 w-9 text-slate-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <p className="text-sm font-medium text-slate-200">Drop audio or click to upload</p>
                  <p className="text-xs text-slate-500 mt-0.5">WAV, MP3, M4A — up to 10 min</p>
                </>
              ) : (
                <div className="text-center px-3">
                  <p className="text-sm font-medium text-slate-100 truncate max-w-full" title={fileName}>
                    {fileName}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {status === "processing" ? "Transcribing…" : "Ready to convert"}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClear();
                      }}
                      className="rounded-lg border border-slate-600 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700/50"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-slate-800/30 p-3 overflow-hidden">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">
              Output format
            </p>
            <div className="flex flex-wrap gap-2">
              {(["notation", "midi", "pdf"] as const).map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => toggleOutputFormat(format)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition capitalize",
                    outputFormats.includes(format)
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-slate-700 bg-slate-950 text-slate-400 hover:border-violet-500/50 hover:text-violet-200"
                  )}
                >
                  {format === "notation" ? "Piano notation" : format === "midi" ? "MIDI" : "PDF"}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-slate-500">
              Piano notation (staff), MIDI export, or PDF sheet music. Select one or more.
            </p>
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-800 p-4 bg-slate-900/30">
          <button
            type="button"
            onClick={handleConvert}
            disabled={!fileName || status === "processing"}
            className="w-full rounded-full bg-violet-500 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {status === "processing" ? "Transcribing…" : "Convert to notation"}
          </button>
        </div>
      </aside>

      {/* 右侧：预览 / 最近转录列表 */}
      <div className="flex flex-1 min-w-0 min-h-0 flex-col rounded-l-2xl bg-slate-800/30 overflow-hidden">
        <div className="shrink-0 px-4 pt-3 pb-2 rounded-tl-2xl bg-slate-900/50">
          <h2 className="text-base font-semibold text-slate-100 md:text-lg">
            Notation preview
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            {transcriptions.length === 0
              ? "Your transcriptions will appear here after you convert"
              : "Select an item to view piano notation and export"}
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
          {transcriptions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-slate-800/80 p-4 mb-3">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-300">No transcriptions yet</p>
              <p className="mt-1 text-xs text-slate-500 max-w-[240px]">
                Upload an audio file on the left and click Convert to notation. Piano notation, MIDI, and PDF will appear here.
              </p>
            </div>
          ) : (
            <>
              <ul className="space-y-2">
                {transcriptions.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-xl border p-3 text-left transition",
                        selectedId === item.id
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-slate-700 bg-slate-900/80 hover:border-violet-500/50 hover:bg-slate-800/80"
                      )}
                    >
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-100">{item.fileName}</p>
                        <div className="mt-0.5 flex items-center gap-2">
                          {item.status === "processing" && (
                            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-400">
                              Transcribing…
                            </span>
                          )}
                          {item.status === "completed" && (
                            <span className="text-xs text-slate-500">Piano notation · MIDI · PDF</span>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 text-slate-400" aria-hidden>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {hasPreview && (
                <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">
                    Piano notation preview
                  </p>
                  <div className="rounded-lg bg-slate-950 border border-slate-700 p-6 flex flex-col items-center justify-center min-h-[160px]">
                    <svg className="w-12 h-12 text-slate-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <p className="text-sm text-slate-400">Staff notation will render here</p>
                    <p className="text-xs text-slate-500 mt-1">V6 Multi-modal Transcription Engine · 2026</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-400">Download MIDI</span>
                      <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-400">Download PDF</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
