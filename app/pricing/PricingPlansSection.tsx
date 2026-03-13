"use client";

import { useState } from "react";
import Link from "@/components/Link";
import { cn } from "../../lib/utils";

type BillingPeriod = "monthly" | "annually";

type PlanItem = {
  name: string;
  price: string;
  subPrice: string | null;
  credits: string;
  creditsNote: string | null;
  cta: string;
  ctaHref: string;
  highlight: boolean;
  badge?: string;
  features: string[];
};

const PLANS_MONTHLY: PlanItem[] = [
  {
    name: "Free",
    price: "Free",
    subPrice: null,
    credits: "6 Free Credits (4 songs) / Day",
    creditsNote: "Reset every 24 hours",
    cta: "Try Now",
    ctaHref: "/ai-music-generator",
    highlight: false,
    features: [
      "6 Free Credits (4 songs) / Day",
      "7-day cloud storage",
      "Shared generation queue",
      "Declare as Original Lyrics",
      "Recover deleted music",
      "Custom album sharing link",
      "Commercial License & Unrestricted Usage Rights",
      "Private Generations",
      "High-Quality Lossless Download",
    ],
  },
  {
    name: "Advanced",
    price: "$29",
    subPrice: "/month",
    credits: "1,500+ daily free Credits (1,000 songs) / Month",
    creditsNote: null,
    cta: "Subscribe Now",
    ctaHref: "/coming-soon",
    highlight: true,
    badge: "Popular",
    features: [
      "1,500+ daily free Credits (1,000 songs) / Month",
      "Commercial License & Unrestricted Usage Rights",
      "High-Quality Lossless Download",
      "Recover deleted music",
      "Declare as Original Lyrics",
      "Unlimited creation of album quantity",
      "Custom album sharing link",
      "Priority Support & Priority generation queue",
      "Private Generations",
      "365-day cloud storage",
    ],
  },
  {
    name: "Basic",
    price: "$15",
    subPrice: "/month",
    credits: "300 Credits (200 songs) / Month",
    creditsNote: null,
    cta: "Subscribe Now",
    ctaHref: "/coming-soon",
    highlight: false,
    features: [
      "300 Credits (200 songs) / Month",
      "High-Quality Lossless Download",
      "Commercial License & Unrestricted Usage Rights",
      "Recover deleted music",
      "Declare as Original Lyrics",
      "Unlimited creation of album quantity",
      "Custom album sharing link",
      "Priority Support & Priority generation queue",
      "Private Generations",
      "30-day cloud storage",
    ],
  },
];

const PLANS_ANNUALLY: PlanItem[] = [
  {
    name: "Free",
    price: "Free",
    subPrice: null,
    credits: "6 Free Credits (4 songs) / Day",
    creditsNote: "Reset every 24 hours",
    cta: "Try Now",
    ctaHref: "/ai-music-generator",
    highlight: false,
    features: [
      "6 Free Credits (4 songs) / Day",
      "7-day cloud storage",
      "Shared generation queue",
      "Declare as Original Lyrics",
      "Recover deleted music",
      "Custom album sharing link",
      "Commercial License & Unrestricted Usage Rights",
      "Private Generations",
      "High-Quality Lossless Download",
    ],
  },
  {
    name: "Advanced",
    price: "$14.5",
    subPrice: "/month billed annually",
    credits: "18,000 Credits (12,000 songs)",
    creditsNote: "Delivered at once for the whole year",
    cta: "Subscribe Now",
    ctaHref: "/coming-soon",
    highlight: true,
    badge: "Popular",
    features: [
      "1,500+ daily free Credits (1,000 songs) / Month",
      "Commercial License & Unrestricted Usage Rights",
      "High-Quality Lossless Download",
      "Recover deleted music",
      "Declare as Original Lyrics",
      "Unlimited creation of album quantity",
      "Custom album sharing link",
      "Priority Support & Priority generation queue",
      "Private Generations",
      "365-day cloud storage",
    ],
  },
  {
    name: "Basic",
    price: "$10",
    subPrice: "/month billed annually",
    credits: "3,600 Credits (2,400 songs)",
    creditsNote: "Delivered at once for the whole year",
    cta: "Subscribe Now",
    ctaHref: "/coming-soon",
    highlight: false,
    features: [
      "300 Credits (200 songs) / Month",
      "High-Quality Lossless Download",
      "Commercial License & Unrestricted Usage Rights",
      "Recover deleted music",
      "Declare as Original Lyrics",
      "Unlimited creation of album quantity",
      "Custom album sharing link",
      "Priority Support & Priority generation queue",
      "Private Generations",
      "30-day cloud storage",
    ],
  },
];

export function PricingPlansSection() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const plans = billingPeriod === "monthly" ? PLANS_MONTHLY : PLANS_ANNUALLY;

  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
          Flexible and affordable plans for all creators
        </h1>
        <p className="mt-3 text-slate-400">
          Experience The AI Music Generator with a free trial, then choose a subscription that suits your music creation needs.
        </p>
        {/* Monthly / Annually 同一页的两个可切换标签，选中为深色 */}
        <div className="mt-6 flex items-center justify-center gap-0 rounded-xl border border-slate-800 bg-slate-900/50 p-1 inline-flex" role="tablist" aria-label="Billing period">
          <button
            type="button"
            role="tab"
            id="tab-monthly"
            aria-selected={billingPeriod === "monthly"}
            aria-controls="panel-plans"
            tabIndex={billingPeriod === "monthly" ? 0 : -1}
            onClick={() => setBillingPeriod("monthly")}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                setBillingPeriod("annually");
              }
            }}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
              billingPeriod === "monthly"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            role="tab"
            id="tab-annually"
            aria-selected={billingPeriod === "annually"}
            aria-controls="panel-plans"
            tabIndex={billingPeriod === "annually" ? 0 : -1}
            onClick={() => setBillingPeriod("annually")}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                setBillingPeriod("monthly");
              }
            }}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
              billingPeriod === "annually"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
            )}
          >
            Annually -50%
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          ✓ Cancel anytime · ✓ Unused credits roll over {billingPeriod === "monthly" ? "monthly" : "annually"}
        </p>
      </div>

      {/* 根据当前标签展示对应价格卡片，切换 Monthly/Annually 时内容联动更新 */}
      <div id="panel-plans" role="tabpanel" aria-labelledby={billingPeriod === "monthly" ? "tab-monthly" : "tab-annually"} className="mx-auto max-w-6xl px-4 pb-12">
        <div key={billingPeriod} className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
                plan.highlight
                  ? "border-violet-500/50 bg-slate-900/60 shadow-[0_0_40px_rgba(139,92,246,0.15)]"
                  : "border-slate-800 bg-slate-900/40"
              )}
            >
              {plan.badge && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-0.5 text-xs font-medium text-white">
                  {plan.badge}
                </span>
              )}
              <h2 className="text-lg font-semibold text-slate-100">{plan.name}</h2>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-50">{plan.price}</span>
                {plan.subPrice && <span className="text-sm text-slate-400">{plan.subPrice}</span>}
              </div>
              <p className="mt-1 text-sm text-slate-200">{plan.credits}</p>
              {plan.creditsNote && <p className="text-xs text-slate-500">{plan.creditsNote}</p>}
              <Link
                href={plan.ctaHref}
                className={cn(
                  "mt-6 block w-full rounded-full py-2.5 text-center text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-[0.98]",
                  plan.highlight
                    ? "bg-violet-600 text-white hover:bg-violet-500 focus-visible:bg-violet-700 active:bg-violet-800"
                    : "border border-slate-600 text-slate-200 hover:border-violet-500/50 hover:text-violet-200 focus-visible:border-violet-500 focus-visible:bg-slate-800 active:bg-slate-700"
                )}
              >
                {plan.cta}
              </Link>
              <ul className="mt-6 space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                    <span className="mt-0.5 text-violet-400" aria-hidden>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
