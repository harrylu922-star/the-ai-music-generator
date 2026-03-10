/**
 * YouTube Creators landing page FAQ for JSON-LD (FAQPage).
 * Keeps schema in sync with the FAQ section on the page for SEO/AEO.
 */
export const YOUTUBE_CREATORS_FAQ = [
  {
    question: "Can I use AI-generated music on YouTube?",
    answer:
      "Yes. Tracks you create with our AI music generator come with a license suitable for use in YouTube videos, including monetized channels. You get royalty-free music so you avoid copyright claims. We recommend reading our full licensing terms for commercial use.",
  },
  {
    question: "Is the music royalty-free and safe for YouTube?",
    answer:
      "Yes. Our AI music generator produces royalty-free music. You can use it in YouTube videos, intros, outros, vlogs, and Shorts without worrying about copyright strikes from our tracks. For high-stakes campaigns, we suggest reviewing our legal page.",
  },
  {
    question: "How long can the tracks be for my videos?",
    answer:
      "You can generate tracks up to several minutes (e.g. up to 8 minutes depending on plan), so you have enough length for vlogs, tutorials, and background music. For Shorts and intros, you can request shorter clips or trim the export.",
  },
  {
    question: "Do I need music production experience?",
    answer:
      "No. Describe the mood, genre, or style you want (e.g. upbeat vlog background, calm tutorial music), and the AI music generator creates the track. Many YouTube creators use it with no prior music experience.",
  },
  {
    question: "Can I use this for YouTube Shorts and intros?",
    answer:
      "Yes. Our AI music generator works for Shorts, intros, outros, and any video format. Describe what you need—e.g. 15-second punchy clip for Shorts or a 30-second intro—and generate. You can also create longer tracks and cut them in your editor.",
  },
] as const;

export function getYoutubeCreatorsFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: YOUTUBE_CREATORS_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
