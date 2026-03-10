/**
 * Homepage FAQ data for JSON-LD (FAQPage). Must match the exact questions and answers in app/page.tsx.
 * Used for AEO: answer engines can cite this schema when answering "AI music generator" questions.
 */
export const HOME_FAQ = [
  {
    question: "What can I create with your AI music generator?",
    answer:
      "You can generate full songs, short hooks, lyrics, or pure instrumentals — all from text prompts.",
  },
  {
    question: "Do I own the music I create?",
    answer:
      "You get a broad license. For details, see our copyright and licensing section on this site.",
  },
  {
    question: "Can I use AI-generated music on YouTube or TikTok?",
    answer:
      "Yes. We recommend testing on non-critical videos first and reviewing our licensing terms.",
  },
  {
    question: "Do I need music production experience?",
    answer:
      "Not at all. If you can describe how you want your song to feel, the AI music generator can turn that into audio.",
  },
  {
    question: "Can I start with lyrics first?",
    answer:
      "Yes. You can use our AI lyrics generator and then turn them into songs with the same AI music generator workflow.",
  },
] as const;

export function getHomeFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
