"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@/components/Link";
import { useSession, type SessionUser } from "@/components/SessionProvider";

type Job = {
  id: string;
  type: "music" | "lyrics";
  status: string;
  title: string;
  result: { lyrics?: string; audioUrl?: string } | null;
  error: string | null;
  createdAt: number;
};

type Purchase = {
  productId: string;
  credits: number;
  createdAt: number;
};

type Summary = {
  user: SessionUser;
  jobs: Job[];
  purchases: Purchase[];
};

export function AccountDashboard({ checkout }: { checkout?: string }) {
  const router = useRouter();
  const { user, loading, logout } = useSession();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/api/account/summary", { cache: "no-store" });
        if (response.status === 401) {
          router.replace("/auth?next=/account");
          return;
        }
        const data = (await response.json()) as Summary & { error?: string };
        if (!response.ok) throw new Error(data.error ?? "Could not load your account.");
        if (active) setSummary(data);
      } catch (caught) {
        if (active) setError(caught instanceof Error ? caught.message : "Could not load your account.");
      }
    };
    if (!loading) void load();
    return () => {
      active = false;
    };
  }, [loading, router]);

  if (loading) return <p className="text-slate-400">Loading account…</p>;
  if (!user) return <Link href="/auth?next=/account" className="text-violet-300 underline">Sign in to view your account</Link>;
  if (error) return <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">{error}</p>;
  if (!summary) return <p className="text-slate-400">Loading your creations…</p>;

  const signOut = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="space-y-8">
      {checkout === "success" && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          Payment received. Credits appear after Stripe confirms the webhook.
        </p>
      )}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:col-span-2">
          <p className="text-sm text-slate-400">{summary.user.email}</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-50">{summary.user.displayName}</h1>
          <p className="mt-2 text-sm capitalize text-violet-300">{summary.user.plan} plan</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Available credits</p>
          <p className="mt-1 text-3xl font-semibold text-slate-50">{summary.user.credits.toFixed(1)}</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/ai-music-generator" className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">Create music</Link>
        <Link href="/pricing" className="rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-violet-400">Buy credits</Link>
        <button type="button" onClick={signOut} className="rounded-full border border-slate-700 px-5 py-2.5 text-sm text-slate-300 hover:border-red-500/50 hover:text-red-300">Sign out</button>
      </div>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-slate-100">Recent creations</h2>
        {summary.jobs.length === 0 ? (
          <p className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-slate-400">No generations yet.</p>
        ) : (
          <div className="space-y-3">
            {summary.jobs.map((job) => (
              <article key={job.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium text-slate-100">{job.title}</h3>
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-xs capitalize text-slate-300">{job.status}</span>
                </div>
                {job.error && <p className="mt-2 text-sm text-red-300">{job.error}</p>}
                {job.type === "music" && job.result?.audioUrl && job.status === "completed" && (
                  <audio controls preload="none" src={job.result.audioUrl} className="mt-3 w-full" />
                )}
                {job.type === "lyrics" && job.result?.lyrics && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm text-violet-300">View lyrics</summary>
                    <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">{job.result.lyrics}</pre>
                  </details>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {summary.purchases.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-100">Purchases</h2>
          <ul className="space-y-2">
            {summary.purchases.map((purchase) => (
              <li key={`${purchase.productId}-${purchase.createdAt}`} className="flex justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm">
                <span className="text-slate-300">{purchase.productId.replaceAll("_", " ")}</span>
                <span className="text-slate-100">+{purchase.credits} credits</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
