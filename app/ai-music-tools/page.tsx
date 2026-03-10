import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "AI Music Tools | Instrumentals, Loops & More | The AI Music Generator",
  description: "Explore AI music tools: text-to-music, lyrics generator, instrumentals, and loops. One platform for creators.",
};

const TOOLS = [
  { href: "/ai-music-generator", label: "AI Music Generator", desc: "Full tracks from text or your own lyrics." },
  { href: "/text-to-music", label: "Text to Music", desc: "Turn descriptions into songs in seconds." },
  { href: "/ai-lyrics-generator", label: "AI Lyrics Generator", desc: "Write song lyrics with AI, then turn them into music." },
];

export default function AiMusicToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-semibold text-slate-100 mb-2">AI Music Tools</h1>
        <p className="text-slate-400 mb-10">One platform for full tracks, lyrics, and focused tools.</p>
        <ul className="space-y-4">
          {TOOLS.map(({ href, label, desc }) => (
            <li key={href}>
              <Link
                href={href}
                className="block rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-violet-500/40 hover:bg-slate-900/80 transition"
              >
                <span className="font-medium text-violet-300">{label}</span>
                <p className="mt-1 text-sm text-slate-400">{desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <SiteFooter />
    </main>
  );
}
