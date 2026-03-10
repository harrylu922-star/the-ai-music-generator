"use client";

import { useState, useEffect } from "react";

const DEFAULT_COOKIE = "app_mode";

// Keep this toggle on all landing pages for dev preview (App mode / View full page).
// TODO(launch): Optionally derive default from auth; keep toggle for preview.

export function DualLayerWrapper({
  children,
  cookieKey = DEFAULT_COOKIE,
}: {
  children: React.ReactNode;
  cookieKey?: string;
}) {
  const [appMode, setAppMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const raw = document.cookie.match(new RegExp(`(^| )${cookieKey}=([^;]+)`));
    setAppMode(raw ? raw[2] === "1" : false);
  }, [cookieKey]);

  const toggleMode = () => {
    const next = !appMode;
    setAppMode(next);
    document.cookie = `${cookieKey}=${next ? "1" : "0"}; path=/; max-age=31536000`;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950">
        {children}
      </div>
    );
  }

  return (
    <div
      className={appMode ? "h-screen overflow-hidden bg-slate-950" : "min-h-screen bg-slate-950"}
      style={appMode ? { height: "100vh", overflow: "hidden" } : undefined}
    >
      {children}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={toggleMode}
          className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700"
        >
          {appMode ? "View full page (SEO)" : "App mode (lock view)"}
        </button>
      </div>
    </div>
  );
}
