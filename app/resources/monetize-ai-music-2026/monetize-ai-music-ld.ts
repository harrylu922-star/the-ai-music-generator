const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://theaimusicgenerator.com";
const PAGE_URL = `${BASE_URL}/resources/monetize-ai-music-2026`;

export const MONETIZE_AI_MUSIC_FAQ = [
  {
    question: "Can I monetize fully AI-generated music in 2026?",
    answer:
      "Yes, with commercial licenses like The AI Music Generator's unlimited plan. Ensure your tool grants commercial use and you meet platform disclosure rules (e.g. YouTube altered content label).",
  },
  {
    question: "Do platforms require AI disclosure for monetization?",
    answer:
      "YouTube yes (altered content label required); TikTok recommended. Check each platform's current policy and add disclosure where required for safe monetization.",
  },
  {
    question: "What's the cheapest way to monetize AI music?",
    answer:
      "Subscription-based tools (e.g. monthly plans) typically beat per-track fees for high volume. Compare commercial rights and usage limits when choosing a plan.",
  },
  {
    question: "How to prove rights if challenged?",
    answer:
      "Submit your AI music tool's license certificate (PDF) and embedded metadata. The AI Music Generator can export rights packages and license IDs for quick proof.",
  },
  {
    question: "Should I add human edits?",
    answer:
      "Yes. Human edits strengthen ownership and authorship claims in many jurisdictions. Document changes; tools like The AI Music Generator can auto-save prompt and edit history.",
  },
] as const;

export function getMonetizeAiMusicArticleLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Monetize AI Music 2026: Licensing, Platforms & Workflow",
    description:
      "Monetize AI music in 2026 with proper commercial rights and platform compliance. Steps, templates, and workflows for YouTubers, podcasters, and creators.",
    url: PAGE_URL,
    datePublished: "2026-01-01",
    dateModified: "2026-01-01",
    author: { "@type": "Organization", name: "The AI Music Generator" },
    publisher: { "@type": "Organization", name: "The AI Music Generator" },
  };
}

export function getMonetizeAiMusicFaqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MONETIZE_AI_MUSIC_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
