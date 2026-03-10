export const WHO_OWNS_FAQ = [
  {
    question: "Can I copyright purely AI-generated music?",
    answer:
      "In many jurisdictions, no. Works created without meaningful human authorship typically do not qualify for copyright protection. The US Copyright Office and many other regions require human creative contribution for copyright to apply.",
  },
  {
    question: "Does adding human edits make AI music copyrightable?",
    answer:
      "Yes, for the human-authored parts. If you add meaningful creative input—lyrics, arrangement, performance, or significant editing—those elements can be protected. Document your input and use a rights ledger to support your claim.",
  },
  {
    question: "How do I prove I own AI-assisted music?",
    answer:
      "Document prompts, edits, and licenses; attach metadata (authors, tool, license type); and maintain a rights ledger per track. Use tools that export prompt history and license certificates so you can show proof if challenged.",
  },
  {
    question: "Does ownership differ by country?",
    answer:
      "Yes. The US, EU, UK, and other regions treat AI-generated and AI-assisted works differently. Human authorship is central everywhere, but rules vary. Document your workflow and consider legal advice for cross-border distribution.",
  },
  {
    question: "Can I monetize AI-generated music?",
    answer:
      "It depends on the tool's license and your human input. Commercial use requires a clear license from the AI provider. Adding human creativity strengthens both ownership and monetization eligibility. See our licensing and monetization guides for workflows.",
  },
] as const;

export function getWhoOwnsFaqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: WHO_OWNS_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
