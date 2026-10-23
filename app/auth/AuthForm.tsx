"use client";

import { useState } from "react";
import Link from "@/components/Link";
import { useSession } from "@/components/SessionProvider";

export function AuthForm({ initialMode }: { initialMode: "login" | "signup" }) {
  const { user } = useSession();
  const [mode, setMode] = useState(initialMode);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const nextPath =
    typeof window !== "undefined"
      ? (() => {
          const requested = new URLSearchParams(window.location.search).get("next") ?? "/account";
          return requested.startsWith("/") && !requested.startsWith("//") ? requested : "/account";
        })()
      : "/account";

  if (user) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
        <h1 className="text-2xl font-semibold text-slate-50">You are signed in</h1>
        <p className="mt-2 text-sm text-slate-400">Continue to your credits and generated music.</p>
        <Link href="/account" className="mt-6 inline-flex rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500">
          Open Account
        </Link>
      </div>
    );
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ displayName, email, password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Could not sign in.");
      window.location.assign(nextPath);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not sign in.");
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
      <div className="mb-6 flex rounded-xl border border-slate-800 bg-slate-950 p-1" role="tablist" aria-label="Account action">
        {(["login", "signup"] as const).map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={mode === option}
            onClick={() => {
              setMode(option);
              setError("");
            }}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium ${
              mode === option ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {option === "login" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label htmlFor="display-name" className="mb-1 block text-sm text-slate-300">Display name</label>
            <input
              id="display-name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              maxLength={80}
              autoComplete="name"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-slate-300">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-slate-300">Password</label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            maxLength={128}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          />
          {mode === "signup" && <p className="mt-1 text-xs text-slate-400">Use 8–128 characters.</p>}
        </div>
        {error && (
          <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-wait disabled:opacity-60"
        >
          {submitting ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
        </button>
      </form>
    </div>
  );
}
