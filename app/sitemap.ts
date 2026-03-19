import type { MetadataRoute } from "next";
import { getServerSiteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getServerSiteConfig();
  const BASE_URL = config.siteUrl;

  const routes = [
    "",
    "/ai-music-generator",
    "/ai-music-generator/own-lyrics",
    "/ai-lyrics-generator",
    "/ai-lyrics-to-music-generator",
    "/ai-rap-lyrics-generator",
    "/text-to-music",
    "/ai-music-tools",
    "/ai-music-video-generator",
    "/ai-sheet-music-generator",
    "/ai-country-music-generator",
    "/ai-blues-music-generator",
    "/free-ai-lofi-generator",
    "/for-youtube-creators",
    "/pricing",
    "/resources",
    "/resources/who-owns-ai-generated-music",
    "/resources/ai-music-licensing-2026",
    "/resources/youtube-ai-music-labeling-2026",
    "/resources/monetize-ai-music-2026",
    "/legal",
    "/privacy",
    "/terms",
    "/license",
  ];

  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
