export const FAQ_ITEMS = [
  {
    question: "What is the best AI lyrics generator?",
    answer: "The best AI lyrics generator offers a simple interface, multiple moods and structures, and instant results. Our AI Lyrics Generator for Free lets you enter a theme or prompt and choose mood, structure, and style to produce original verses, choruses, and bridges in seconds. It is designed for songwriters, rappers, content creators, and educators who need professional-quality lyrics without the hassle.",
  },
  {
    question: "How to make AI text songs?",
    answer: "To make songs from text using AI, first use an AI lyrics generator to create or refine your lyrics. Enter a title and keywords, select mood and structure (e.g. verse/chorus), then generate. Once you have your lyrics, paste them into our AI Music Generator or use the Own Lyrics mode to turn the text into a full song with melody and production. The entire process from text to song can be done in minutes.",
  },
  {
    question: "Is it okay to use AI to write songs?",
    answer: "Yes. Using AI to write songs and lyrics is widely accepted. Many artists use AI lyrics generators as a creative tool to overcome writer's block, explore new themes, and speed up their workflow. Our AI acts as a co-writer: you keep full creative control and can edit everything. Always check the terms of use and licensing for commercial release in your region.",
  },
  {
    question: "How to write a song when you have no ideas?",
    answer: "When you have no ideas, start with an AI lyrics generator. Enter a single word, a theme (e.g. summer, heartbreak), or an artist style you like. Choose a mood and structure, then generate. Use the first draft as a springboard: change lines, add your own phrases, and rearrange sections. The AI gives you a starting point so you are never stuck with a blank page.",
  },
  {
    question: "Can I use AI-generated lyrics commercially?",
    answer: "Commercial use depends on the platform's terms of service. Our AI Lyrics Generator produces original text that you can edit and own. For commercial release (e.g. streaming, sync licensing), review our licensing and consider a commercial plan if required. We recommend keeping records of your edits to demonstrate your creative contribution.",
  },
] as const;

const BASE_URL = "https://theaimusicgenerator.com";

export function getJsonLdScript() {
  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Lyrics Generator for Free",
    applicationCategory: "MusicApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
    },
    url: `${BASE_URL}/ai-lyrics-generator`,
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Music & Lyrics Tools",
    numberOfItems: 4,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AI Music Generator", url: `${BASE_URL}/ai-music-generator` },
      { "@type": "ListItem", position: 2, name: "AI Lyrics Generator", url: `${BASE_URL}/ai-lyrics-generator` },
      { "@type": "ListItem", position: 3, name: "Text to Music", url: `${BASE_URL}/text-to-music` },
      { "@type": "ListItem", position: 4, name: "AI Music Tools", url: `${BASE_URL}/ai-music-tools` },
    ],
  };

  return {
    softwareApplication,
    faqPage,
    itemList,
  };
}
