import Link from "@/components/Link";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-violet-400 mb-2">Error 404</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl mb-3">
            Page not found
          </h1>
          <p className="text-slate-400 mb-8">
            The page you’re looking for doesn’t exist or has been moved. Head back home or try one of our tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 transition"
            >
              Back to Home
            </Link>
            <Link
              href="/ai-music-generator"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800/60 px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-violet-500/50 hover:text-violet-200 transition"
            >
              AI Music Generator
            </Link>
            <Link
              href="/ai-lyrics-generator"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800/60 px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-violet-500/50 hover:text-violet-200 transition"
            >
              AI Lyrics Generator
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-500">
            <Link href="/pricing" className="text-violet-400 hover:text-violet-300">Pricing</Link>
            {" · "}
            <Link href="/resources" className="text-violet-400 hover:text-violet-300">Resources</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
