import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theaimusicgenerator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/ai-music-generator",
    "/ai-lyrics-generator",
    "/ai-rap-lyrics-generator",
    "/text-to-music",
    "/ai-music-tools",
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
