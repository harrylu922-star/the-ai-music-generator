const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://theaimusicgenerator.com";
const PAGE_URL = `${BASE_URL}/resources/youtube-ai-music-labeling-2026`;

export const YOUTUBE_LABELING_FAQ = [
  {
    question: "Can I monetize AI-labeled music?",
    answer:
      "Yes, with proper licenses like The AI Music Generator's commercial plans. Ensure your tool grants commercial use and you disclose AI content per YouTube policy.",
  },
  {
    question: "What if my AI track isn't realistic?",
    answer:
      "No disclosure is strictly required for non-realistic outputs, but labeling anyway is best practice for consistency and future policy changes.",
  },
  {
    question: "Does labeling protect from claims?",
    answer:
      "Labeling aids transparency and compliance; it does not replace license verification. Use tool exports and license IDs as proof of rights.",
  },
  {
    question: "How to automate labeling?",
    answer:
      "Tools like The AI Music Generator can generate disclosure snippets and embed metadata on export for consistent, compliant descriptions.",
  },
  {
    question: "Label every AI asset?",
    answer:
      "Yes, for consistency and channel trust—especially for realistic-sounding outputs. Uniform labeling reduces risk and supports audits.",
  },
  {
    question: "Where do I add the altered content label on YouTube?",
    answer:
      "In YouTube Studio when uploading or editing a video: open the details and find the \"Altered or synthetic content\" option. Check it so YouTube can add disclosure to the description. Always add your own disclosure text at the top of the description as well.",
  },
  {
    question: "Does TikTok require AI music disclosure?",
    answer:
      "TikTok does not yet mandate it the same way YouTube does, but disclosure is recommended for monetized and branded content. Adding \"AI-generated music\" or the tool name in the description helps with transparency and future policy changes.",
  },
] as const;

export function getYoutubeLabelingArticleLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "YouTube AI Music Labeling 2026: Rules & Workflow for Creators",
    description:
      "YouTube requires clear disclosure for AI-generated music in 2026. Official rules, required disclosures, compliant workflows, and templates.",
    url: PAGE_URL,
    datePublished: "2026-01-01",
    dateModified: "2026-01-01",
    author: { "@type": "Organization", name: "The AI Music Generator" },
    publisher: { "@type": "Organization", name: "The AI Music Generator" },
  };
}

export function getYoutubeLabelingFaqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: YOUTUBE_LABELING_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
