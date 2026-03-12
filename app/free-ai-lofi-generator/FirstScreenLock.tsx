"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Placeholder: replace with real auth (cookie/session) when available.
 * When unlocked (logged in or preview), full content visible. When locked, first screen only;
 * first screen height = 100vh + 1 line. Full content stays in DOM for SEO.
 */
function useIsLoggedIn(): boolean {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    try {
      setLoggedIn(document.cookie.includes("lofi_logged_in=true"));
    } catch {
      setLoggedIn(false);
    }
  }, []);
  return isLoggedIn;
}

export function FirstScreenLock({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useIsLoggedIn();
  const [previewAll, setPreviewAll] = useState(false);
  const unlocked = isLoggedIn || previewAll;

  const togglePreview = useCallback(() => setPreviewAll((v) => !v), []);

  useEffect(() => {
    if (unlocked) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        setPreviewAll((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [unlocked]);

  return (
    <>
      <div
        className={unlocked ? "" : "overflow-hidden"}
        style={
          unlocked
            ? undefined
            : { maxHeight: "calc(100vh + 1.5em)" }
        }
      >
        {children}
      </div>
      {!unlocked && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <button
            type="button"
            onClick={togglePreview}
            className="rounded-full border border-slate-600 bg-slate-900/90 backdrop-blur px-4 py-2 text-xs text-slate-300 hover:border-violet-500/50 hover:text-violet-200"
          >
            Preview all content (L)
          </button>
        </div>
      )}
    </>
  );
}
