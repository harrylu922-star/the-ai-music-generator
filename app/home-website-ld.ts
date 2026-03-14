/**
 * JSON-LD for the homepage: WebSite (site), WebPage (home), SoftwareApplication (the app).
 * Restores the "关于页面和应用的 schema" for SEO.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theaimusicgenerator.com";

export function getHomePageAndAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "The AI Music Generator",
        url: SITE_URL,
        description:
          "The free AI Music Generator for creators. Turn text into songs and instrumentals in seconds. Royalty-free, try free.",
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/ai-music-generator?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "The free AI Music Generator for Creators | Royalty-Free",
        description:
          "Turn text into songs and instrumentals in seconds. Free AI music generator and lyrics tool for creators, filmmakers & YouTubers. No copyright strikes—try free.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: "The AI Music Generator",
        applicationCategory: "MultimediaApplication",
        applicationSubCategory: "AI Music Generation",
        operatingSystem: "Web browser",
        url: SITE_URL,
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
          name: "The AI Music Generator",
          url: SITE_URL,
        },
      },
    ],
  };
}
