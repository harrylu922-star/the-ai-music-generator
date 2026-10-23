"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CheckoutButton({
  productId,
  children,
  className,
}: {
  productId: string;
  children: React.ReactNode;
  className: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkout = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (response.status === 401) {
        router.push("/auth?next=%2Fpricing");
        return;
      }
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error ?? "Could not start checkout.");
      window.location.assign(data.url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not start checkout.");
      setLoading(false);
    }
  };

  return (
    <>
      <button type="button" onClick={checkout} disabled={loading} className={`${className} disabled:cursor-wait disabled:opacity-60`}>
        {loading ? "Opening checkout…" : children}
      </button>
      {error && <p role="alert" className="mt-2 text-xs text-red-300">{error}</p>}
    </>
  );
}
