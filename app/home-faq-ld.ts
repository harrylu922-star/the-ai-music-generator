/**
 * Homepage FAQ JSON-LD (FAQPage schema).
 * 支持按站点 config 使用不同 FAQ 条目，以匹配各域名的 SEO/AEO 关键词策略。
 * - TAMG：通用 AI music generator FAQ
 * - AMF：面向内容创作者的 "AI music generator for content creators" FAQ
 */
import type { SiteBrandConfig } from "@/lib/site-config";

/** TAMG 默认 FAQ（静态，向后兼容） */
export const HOME_FAQ = [
  {
    question: "What can I create with your AI music generator?",
    answer:
      "You can generate full songs, short hooks, lyrics, or pure instrumentals — all from text prompts.",
  },
  {
    question: "Do I own the music I create?",
    answer:
      "You get a broad royalty-free license. For details, see our copyright and licensing section on this site.",
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

/**
 * 生成 FAQPage JSON-LD。
 * 传入 config 时使用 config.home.faqItems（按域名定制）；否则使用 TAMG 默认 FAQ。
 */
export function getHomeFaqJsonLd(config?: SiteBrandConfig | null) {
  const items =
    config?.home?.faqItems && config.home.faqItems.length > 0
      ? config.home.faqItems
      : HOME_FAQ;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
