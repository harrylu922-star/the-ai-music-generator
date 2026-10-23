import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { AccountDashboard } from "./AccountDashboard";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your music generation account, credits, and recent creations.",
  robots: { index: false, follow: false },
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { checkout } = await searchParams;
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <AccountDashboard checkout={checkout} />
      </section>
      <SiteFooter />
    </main>
  );
}
