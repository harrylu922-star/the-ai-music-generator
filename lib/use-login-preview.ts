"use client";

import { useSession } from "../components/SessionProvider";

/** Compatibility alias while workspaces migrate to the shared session context. */
export function useLoginPreview(): boolean {
  return Boolean(useSession().user);
}
