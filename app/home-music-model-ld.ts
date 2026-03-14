/**
 * JSON-LD for AI music model versions (V6 first, then V5, V4, V1). Describes evolution for SEO/AEO.
 * No third-party brand names. Includes a dedicated "large model" (current/latest) schema.
 */

const MODEL_VERSIONS_ORDERED = [
  {
    name: "V6.0",
    description:
      "The world's best music model. Exceptional audio quality, seamless creative control, and professional-grade output. The ultimate foundation for next-generation music creation. Full control over duration (5s–5min) with premium quality.",
  },
  {
    name: "V5.0",
    description:
      "Advanced AI music creation with high-fidelity audio, extended song duration up to 8 minutes, flexible style control, comprehensive lyrics support up to 5000 characters, and fast generation speed.",
  },
  {
    name: "V4.0",
    description:
      "Our original music generation model that started it all. Classic sound quality with reliable performance, perfect for quick music creation and experimentation.",
  },
  {
    name: "V1.0",
    description:
      "The first AI music generation model. Basic text-to-music with short clips, ideal for quick experiments and learning the workflow.",
  },
] as const;

/** ItemList of model versions (V6 first). */
export function getHomeMusicModelJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Music Generator model versions",
    description: "AI music generation model versions from latest (V6) to earlier versions. Compare and select the best model for your music generation.",
    numberOfItems: MODEL_VERSIONS_ORDERED.length,
    itemListElement: MODEL_VERSIONS_ORDERED.map((m, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: m.name,
      description: m.description,
    })),
  };
}

/** Current/latest AI music model (V6) — "大模型" schema for rich description in search. */
export function getLatestMusicModelJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Music Generator Model V6",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "AI Music Generation",
    softwareVersion: "6.0",
    description:
      "The world's best music model. Exceptional audio quality, seamless creative control, and professional-grade output. The ultimate foundation for next-generation music creation. Full control over duration (5s–5min) with premium quality. Ultra powerful AI music generation for creators.",
    featureList: [
      "Exceptional audio quality and professional-grade output",
      "Seamless creative control and next-generation music creation",
      "Duration control from 5 seconds to 5 minutes",
      "Premium quality AI music generation",
    ],
  };
}
