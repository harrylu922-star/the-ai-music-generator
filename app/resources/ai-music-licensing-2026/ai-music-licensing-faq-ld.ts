export const AI_MUSIC_LICENSING_FAQ = [
  {
    question: "Do I need a license to use AI music on YouTube?",
    answer:
      "Yes. You need commercial and sync rights for monetized or public videos. Check the AI tool's terms for YouTube use, add required AI disclosure (e.g. altered content label), and keep license proof in case of a claim.",
  },
  {
    question: "What's the difference between royalty-free and commercial license?",
    answer:
      "Royalty-free usually means a one-time or subscription fee with no per-use royalties. Commercial license explicitly allows use in monetized or commercial projects. Always read the full terms—scope, derivatives, and platforms covered.",
  },
  {
    question: "Can I use the same AI track in multiple projects?",
    answer:
      "It depends on the license. Some are per-track or per-project; subscriptions often allow multiple uses while active. Check territory, duration, and whether exclusivity or derivatives are limited.",
  },
  {
    question: "What if I get a copyright claim on AI music?",
    answer:
      "Submit your license certificate and metadata as proof of rights. Use tools that provide traceable exports (e.g. license ID, PDF). Dispute with the platform using that evidence and keep an audit trail.",
  },
  {
    question: "How do I know an AI music tool's license is safe?",
    answer:
      "Look for explicit commercial use, sync, derivatives, and redistribution rights. Prefer tools with clear, written terms and exportable proof (certificates, metadata). Check our terms and licensing guide for a practical workflow.",
  },
] as const;

export function getAiMusicLicensingFaqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AI_MUSIC_LICENSING_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
