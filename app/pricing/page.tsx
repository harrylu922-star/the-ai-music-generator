import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { PricingPlansSection } from "./PricingPlansSection";

export const metadata: Metadata = {
  title: "Pricing | Free Trial & Plans for AI Music Generation",
  description: "Free trial and flexible plans for AI music generation. Create royalty-free music from text and your own lyrics. Affordable credits and commercial rights.",
};

const CREDIT_PACKS = [
  { name: "One-time Purchase", price: "$50", credits: "1,600 Credits (1,067 songs)", cta: "One-time Purchase", href: "/coming-soon" },
  { name: "One-time Purchase", price: "$100", credits: "4,000 Credits (2,667 songs)", cta: "One-time Purchase", href: "/coming-soon", popular: true },
];

const FAQ = [
  {
    q: "How secure are payments?",
    a: "All payments are processed through a secure, encrypted payment system. We use industry-standard security measures, and your payment details are never stored on our servers—they're handled directly by our trusted payment processor.",
  },
  {
    q: "What are the usage rights for generated songs?",
    a: "Free users can share songs with attribution. Monthly subscribers get full non-commercial rights including modification and distribution. Annual subscribers receive complete commercial rights with no restrictions.",
  },
  {
    q: "How does the credit system work?",
    a: "Free accounts receive credits daily, which refresh every 24 hours. Paid subscribers receive monthly credit allowances upon payment. Annual subscribers get their entire year's worth of credits added at once.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Go to your profile in the top-right corner, select 'Billing' from the menu. On the billing page you can cancel your subscription at any time.",
  },
  {
    q: "What's the credit cost per generation?",
    a: "Each generation uses a set number of credits and can produce song variations. Credit requirements are shown below each action button before you generate.",
  },
  {
    q: "Do I keep commercial rights after canceling?",
    a: "Yes, any songs created during your annual plan period keep their commercial rights permanently, even after cancellation.",
  },
  {
    q: "What's included in the commercial license?",
    a: "The commercial license allows use including copying, modification, distribution, and monetization of your generated songs across any platform or medium.",
  },
  {
    q: "How long are my songs stored?",
    a: "Storage duration varies by plan. Download your songs within the stated timeframe to keep them permanently.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />

      {/* Monthly / Annually 两个标签 + 对应价格卡片（同一页切换） */}
      <PricingPlansSection />

      {/* One-time credit packs */}
      <section className="border-b border-slate-800 bg-slate-950 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-semibold text-slate-100 text-center mb-6">
            One-time Credit Packs
          </h2>
          <p className="text-center text-sm text-slate-400 mb-8">
            Purchase additional credits. Never expire and can be used anytime.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {CREDIT_PACKS.map((pack) => (
              <article
                key={pack.credits}
                className={`relative rounded-2xl border p-6 ${
                  pack.popular ? "border-violet-500/50 bg-slate-900/60" : "border-slate-800 bg-slate-900/40"
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-0.5 text-xs font-medium text-white">
                    Popular
                  </span>
                )}
                <h3 className="text-base font-semibold text-slate-100">{pack.name}</h3>
                <p className="mt-2 text-2xl font-bold text-slate-50">{pack.price}</p>
                <p className="mt-1 text-sm text-slate-200">{pack.credits}</p>
                <p className="mt-1 text-xs text-slate-500">Never expires</p>
                <Link
                  href={pack.href}
                  className="mt-4 block w-full rounded-full border border-slate-600 py-2.5 text-center text-sm font-semibold text-slate-200 hover:border-violet-500/50 hover:text-violet-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:bg-slate-800 active:bg-slate-700 active:scale-[0.98]"
                >
                  {pack.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-800 bg-slate-950 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-xl font-semibold text-slate-100 text-center mb-2">Pricing FAQ</h2>
          <p className="text-center text-sm text-slate-400 mb-8">
            Frequently asked questions about pricing and plans.
          </p>
          <dl className="space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:p-5">
                <dt className="text-base font-semibold text-slate-100 mb-2">{item.q}</dt>
                <dd className="text-sm leading-relaxed text-slate-200">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-12">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl font-semibold text-slate-100 mb-2">Unleash your musical creativity</h2>
          <p className="text-slate-400 mb-6">
            Our AI Music Generator turns your ideas into unique melodies—no musical expertise required. Create your next track in minutes.
          </p>
          <Link
            href="/ai-music-generator"
            className="inline-flex rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white hover:bg-violet-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:bg-violet-700 active:bg-violet-800 active:scale-[0.98]"
          >
            Create Your Music Now
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
