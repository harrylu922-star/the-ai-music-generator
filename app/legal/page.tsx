import type { Metadata } from "next";
import Link from "@/components/Link";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { getServerSiteConfig, getSubPageMeta } from "../../lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getServerSiteConfig();
  const { title, description } = getSubPageMeta(config, "/legal", {
    title: "Legal | Privacy, Terms & Content License",
    description: `Privacy Policy, Terms of Service and Content License for ${config.siteName}. User rights, data use and royalty-free music license terms.`,
  });
  return {
    title,
    description,
    openGraph: { title, description, siteName: config.siteName },
    alternates: { canonical: `${config.siteUrl}/legal` },
  };
}

const LEGAL_LINKS = [
  { href: "/privacy", title: "Privacy Policy" },
  { href: "/terms", title: "Terms of Service" },
  { href: "/license", title: "Content License" },
];

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-semibold text-slate-100 mb-8">Legal</h1>
        <p className="text-slate-400 mb-10">
          Choose a document to read our Privacy Policy, Terms of Service, or
          Content License (refund policy is included in Terms of Service).
        </p>
        <ul className="space-y-4">
          {LEGAL_LINKS.map(({ href, title }) => (
            <li key={href}>
              <Link
                href={href}
                className="block rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-violet-300 hover:bg-slate-800/60 hover:text-violet-200 transition"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <SiteFooter />
    </main>
  );
}
