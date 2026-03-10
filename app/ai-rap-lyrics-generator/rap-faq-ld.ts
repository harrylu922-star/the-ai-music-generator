/**
 * Rap landing page FAQ for JSON-LD (FAQPage). Must match the exact questions and answers in page.tsx.
 * Used for SEO and AEO: answer engines can cite this when answering "rap generator" / "rap lyrics generator" questions.
 */
export const RAP_FAQ = [
  {
    question: "What is a rap generator?",
    answer:
      "A rap generator is a free online tool that lets you create rap lyrics with AI and, optionally, turn them into a full track or beat. Our rap generator has two parts: an AI rap lyrics generator for writing verses, hooks, and full songs, and an AI music generator to create a rap beat or full rap song from your lyrics. No signup required.",
  },
  {
    question: "What is an AI rap lyrics generator?",
    answer:
      "An AI rap lyrics generator is a tool that uses artificial intelligence to write original rap and hip hop lyrics from your topic, mood, or keywords. You enter a theme (e.g. success, street life, love), choose a style like Hip Hop or Trap, and the AI produces verses and choruses you can edit. Our free AI rap lyrics generator supports multiple structures and styles and works as a hip hop lyrics generator too.",
  },
  {
    question: "Is there a free rap generator?",
    answer:
      "Yes. Our rap generator is free to use online. You can generate rap lyrics as often as you like and, if you want a beat or full song, use our AI music generator to turn your lyrics into a track. No credit card or account required to start.",
  },
  {
    question: "How to write rap lyrics with AI?",
    answer:
      "To write rap lyrics with AI, open our free rap lyrics generator, enter a topic or vibe (e.g. hustle, party, story), select a style such as Hip Hop or Trap and a structure (verse/chorus or verse/chorus/bridge), then click generate. The AI will output original lines you can edit, reorder, or use as a freestyle rap generator starting point. You can then paste the lyrics into our AI music generator to get a rap beat or full song.",
  },
  {
    question: "Can I generate a rap beat?",
    answer:
      "Yes. After writing lyrics with our AI rap lyrics generator, you can use our AI music generator to create a rap beat or full rap song. Describe the beat you want (e.g. trap, boom-bap, melodic) or paste your lyrics and the AI will generate a matching instrumental or full track. Our rap beat generator and rap music generator are built for rappers and producers who want quick demos.",
  },
  {
    question: "Is this the best free rap generator?",
    answer:
      "Our free rap generator combines an AI rap lyrics generator and an AI rap beat generator in one workflow: write lyrics, then turn them into a track. It supports multiple styles (Hip Hop, Trap, etc.), works online without install, and is free to use. Try it and compare with other rap lyrics maker or online rap generator tools to see what fits your flow.",
  },
] as const;

export function getRapFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: RAP_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
