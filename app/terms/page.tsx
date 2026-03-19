import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { TermsContent } from "../legal/sections/TermsContent";
import { getServerSiteConfig } from "../../lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getServerSiteConfig();
  return {
    title: `Terms of Service | ${config.siteName}`,
    description: `Terms of Service for ${config.siteName}: user accounts, subscriptions, refunds and legal terms. Read before using our AI music tools.`,
    alternates: { canonical: `${config.siteUrl}/terms` },
  };
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-semibold text-slate-100 mb-8">
          Terms of Service
        </h1>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <TermsContent />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
