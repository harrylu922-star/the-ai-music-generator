import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { AuthForm } from "./AuthForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to generate music, manage credits, and keep your creation history.",
  robots: { index: false, follow: true },
};

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />
      <section className="mx-auto max-w-md px-4 py-16">
        <h1 className="mb-2 text-center text-3xl font-semibold text-slate-50">Your music workspace</h1>
        <p className="mb-8 text-center text-sm text-slate-400">
          Sign in or create an account to use generation credits and save your history.
        </p>
        <AuthForm initialMode="login" />
      </section>
      <SiteFooter />
    </main>
  );
}
