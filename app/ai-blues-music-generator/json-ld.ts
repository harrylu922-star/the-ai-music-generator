const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theaimusicgenerator.com";
const PAGE_URL = `${BASE_URL}/ai-blues-music-generator`;

/** FAQ items for JSON-LD (plain text answers, no HTML/links) */
export const FAQ_ITEMS = [
  {
    question: "Is there a free AI blues music generator?",
    answer:
      "Yes—the generator at the top of this page is free. The full AI Music Generator adds longer tracks, higher export quality, and track history.",
  },
  {
    question: "Can I use AI-generated blues music commercially?",
    answer:
      "Yes. All tracks are royalty-free for commercial use under our Content License. You can monetize on YouTube and Spotify with no extra fees.",
  },
  {
    question: "How do I generate a blues song with AI?",
    answer:
      'Type a prompt (e.g. "Slow 12-bar blues, slide guitar and organ, 70 BPM") or hit Get Inspired to cycle through presets. Add Genre, Mood, and Instrument tags, then click Create Blues Track. For a song with your own words, switch to the Own Lyrics tab or use the AI Music Generator.',
  },
  {
    question: "What instruments define blues music?",
    answer:
      "Slide guitar, harmonica, and electric guitar are the signature sounds. Organ and piano are essential in soul blues and Chicago blues respectively. Use the Instrument tag in the generator to specify any of these and hear the difference immediately.",
  },
  {
    question: "Can I add my own lyrics to a blues track?",
    answer:
      "Yes. Switch to the Own Lyrics tab above, paste your lyrics, set a cover style, then generate. Need lyrics first? The AI Lyrics Generator can write blues-style verses and choruses for you.",
  },
] as const;

function schemaText(s: string): string {
  return s
    .replace(/\u2019/g, "'")
    .replace(/\u2014/g, " - ")
    .replace(/\u2013/g, " - ")
    .replace(/&quot;/g, '"');
}

export function getBluesMusicGeneratorJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        name: "The AI Music Generator",
        url: BASE_URL,
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Best AI Blues Music Generator: 12-Bar, Delta & Soul Blues",
        description:
          "Create authentic blues music with AI. V6 model delivers 12-bar, Delta, and soul blues—slide guitar, organ, micro-timing. Royalty-free for YouTube and Spotify.",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${BASE_URL}/images/ai-blues-music-generator/hero-blues.webp`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "AI Music Tools", item: `${BASE_URL}/ai-music-tools` },
          { "@type": "ListItem", position: 3, name: "AI Blues Music Generator", item: PAGE_URL },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${PAGE_URL}#app`,
        name: "AI Blues Music Generator for Free",
        url: PAGE_URL,
        applicationCategory: "MusicApplication",
        operatingSystem: "Web browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free blues music generation. Paid plans in the full AI Music Generator unlock longer tracks and full export options.",
        },
        description:
          "An AI-powered web app that generates authentic 12-bar, Delta, Chicago, and soul blues from text prompts. Choose genre, mood, ambience, and instruments (e.g. slide guitar, harmonica, organ) to get royalty-free tracks for YouTube, Spotify, and commercial use. Built on the v6 model with micro-timing and harmonic depth.",
        featureList: [
          "AI blues music generation from text prompts",
          "Styles: 12-bar Delta, Chicago shuffle, Soul blues, Texas blues, Swamp blues",
          "Genre, Mood, Ambience, Vocal and Instrument tags",
          "Own Lyrics tab for songs with your own words",
          "Royalty-free for YouTube and Spotify",
          "Free tier available without account",
        ],
        provider: {
          "@type": "Organization",
          name: "The AI Music Generator",
          url: BASE_URL,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faqpage`,
        name: "AI Blues Music Generator - Frequently Asked Questions",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: schemaText(item.question),
          acceptedAnswer: {
            "@type": "Answer",
            text: schemaText(item.answer),
          },
        })),
      },
    ],
  };
}
