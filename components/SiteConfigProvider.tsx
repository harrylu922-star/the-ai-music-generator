"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteBrandConfig } from "@/lib/site-config";

const SiteConfigContext = createContext<SiteBrandConfig | null>(null);

export function SiteConfigProvider({
  config,
  children,
}: {
  config: SiteBrandConfig;
  children: ReactNode;
}) {
  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): SiteBrandConfig {
  const config = useContext(SiteConfigContext);
  if (!config) {
    throw new Error("useSiteConfig must be used within SiteConfigProvider");
  }
  return config;
}
