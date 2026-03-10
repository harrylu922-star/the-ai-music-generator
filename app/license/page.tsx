import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { LicenseContent } from "../legal/sections/LicenseContent";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://themusicgenerator.com";

export const metadata: Metadata = {
  title: "Content License | Royalty-Free & Commercial Use",
  description:
    "Content License for The AI Music Generator: royalty-free and commercial use rights for AI-generated music. Read full terms and usage rights.",
  alternates: { canonical: `${BASE_URL}/license` },
};

export default function LicensePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-semibold text-slate-100 mb-8">
          Content License
        </h1>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <LicenseContent />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
