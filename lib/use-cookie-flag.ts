"use client";

import { useCallback, useSyncExternalStore } from "react";

const COOKIE_CHANGE_EVENT = "app-cookie-change";

function readCookieFlag(name: string): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]+)`)
  );
  return match?.[1] === "1";
}

export function useCookieFlag(name: string): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener(COOKIE_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(COOKIE_CHANGE_EVENT, onChange);
  }, []);
  const getSnapshot = useCallback(() => readCookieFlag(name), [name]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function setCookieFlag(name: string, enabled: boolean): void {
  document.cookie = `${name}=${enabled ? "1" : "0"}; path=/; max-age=31536000; SameSite=Lax`;
  window.dispatchEvent(new Event(COOKIE_CHANGE_EVENT));
}
