export const FAQ_ITEMS = [
  {
    question: "Is MIDI export supported by the AI sheet music generator?",
    answer:
      "Yes. Our AI sheet music generator supports full MIDI export. Transcriptions from the Audio to Notation converter can be downloaded as standard MIDI files (Type 1), compatible with DAWs, notation software (e.g. Sibelius, Finale, MuseScore), and piano roll editors. Velocity and timing are preserved from the V6 Multi-modal Transcription Engine, so you can edit and rearrange in any MIDI-capable tool.",
  },
  {
    question: "Who owns the copyright of AI-generated sheet music and transcriptions?",
    answer:
      "Under our terms, transcriptions and sheet music you generate using our AI sheet music generator are yours to use within the scope of your license. For personal or commercial use, refer to our Content License and pricing plans. You retain ownership of the output; we do not claim copyright on your generated notation. Always ensure that any source audio you upload is either owned by you or properly licensed for transcription.",
  },
  {
    question: "Can the AI sheet music generator handle complex piano pieces?",
    answer:
      "Yes. Our V6 Multi-modal Transcription Engine is built for complex polyphony and multiple velocity layers. It can transcribe dense piano arrangements, multiple simultaneous voices, and subtle dynamics, producing accurate piano notation suitable for composers and performers. For best results, use clear recordings with minimal background noise.",
  },
  {
    question: "What audio formats can I upload for transcription?",
    answer:
      "The Audio to Notation converter accepts common audio formats including WAV, MP3, and M4A. We recommend WAV or high-bitrate MP3 for the most accurate piano notation. Maximum duration and file size limits apply per your plan; see our pricing page for details.",
  },
] as const;

const BASE_URL = "https://theaimusicgenerator.com";

export function getJsonLdScript() {
  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Sheet Music Generator",
    applicationCategory: "MusicApplication",
    operatingSystem: "Web",
    description: "AI-powered audio to notation and piano notation transcription for composers. V6 Multi-modal Transcription Engine with MIDI export.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `${BASE_URL}/ai-sheet-music-generator`,
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

  return {
    softwareApplication,
    faqPage,
  };
}
