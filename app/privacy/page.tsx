import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { PrivacyContent } from "../legal/sections/PrivacyContent";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://themusicgenerator.com";

export const metadata: Metadata = {
  title: "Privacy Policy | The AI Music Generator",
  description:
    "Privacy Policy for The AI Music Generator: how we collect, use and protect your information. Data and cookie practices for our AI music services.",
  alternates: { canonical: `${BASE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-semibold text-slate-100 mb-8">
          Privacy Policy
        </h1>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <PrivacyContent />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
