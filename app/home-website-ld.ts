/**
 * JSON-LD for the homepage: WebSite (site), WebPage (home), SoftwareApplication (the app).
 * Restores the "关于页面和应用的 schema" for SEO.
 * 传入 config 时按域名使用对应站名与 URL。
 */
import type { SiteBrandConfig } from "@/lib/site-config";

const FALLBACK_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theaimusicgenerator.com";
const FALLBACK_NAME = "The AI Music Generator";

export function getHomePageAndAppJsonLd(config?: SiteBrandConfig | null) {
  const siteUrl = config?.siteUrl ?? FALLBACK_URL;
  const siteName = config?.siteName ?? FALLBACK_NAME;
  const defaultTitle = config?.defaultTitle ?? "The free AI Music Generator for Creators | Royalty-Free";
  const defaultDescription =
    config?.defaultDescription ??
    "Turn text into songs and instrumentals in seconds. Free AI music generator and lyrics tool for creators, filmmakers & YouTubers. No copyright strikes—try free.";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        description:
          "The free AI Music Generator for creators. Turn text into songs and instrumentals in seconds. Royalty-free, try free.",
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/ai-music-generator?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: defaultTitle,
        description: defaultDescription,
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#app`,
        name: siteName,
        applicationCategory: "MultimediaApplication",
        applicationSubCategory: "AI Music Generation",
        operatingSystem: "Web browser",
        url: siteUrl,
        description:
          "Free AI music generator for creators. Turn text into songs and instrumentals in seconds. Royalty-free music and lyrics tools. No copyright strikes—try free. Built on the 2026 latest model v6.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free tier available. Paid plans for longer tracks and full commercial use.",
        },
        featureList: [
          "AI music generation from text prompts",
          "AI lyrics generator",
          "Full tracks and instrumentals up to 8 minutes",
          "Royalty-free for YouTube and commercial use",
          "2026 latest model v6",
        ],
        provider: {
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
        },
      },
    ],
  };
}
