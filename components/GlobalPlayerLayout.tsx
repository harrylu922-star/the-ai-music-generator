"use client";

import { GlobalPlayerProvider } from "../contexts/GlobalPlayerContext";
import { GlobalPlayer } from "./GlobalPlayer";

export function GlobalPlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <GlobalPlayerProvider>
      {children}
      <GlobalPlayer />
    </GlobalPlayerProvider>
  );
}
