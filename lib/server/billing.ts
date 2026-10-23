import { getCloudflareContext } from "@opennextjs/cloudflare";
import { ApiError } from "./api";

export type BillingProduct = {
  id: string;
  mode: "payment" | "subscription";
  creditUnits: number;
  plan?: "basic" | "advanced";
  envKey:
    | "STRIPE_PRICE_BASIC_MONTHLY"
    | "STRIPE_PRICE_ADVANCED_MONTHLY"
    | "STRIPE_PRICE_BASIC_ANNUAL"
    | "STRIPE_PRICE_ADVANCED_ANNUAL"
    | "STRIPE_PRICE_CREDITS_1600"
    | "STRIPE_PRICE_CREDITS_4000";
};

export const BILLING_PRODUCTS: Record<string, BillingProduct> = {
  basic_monthly: {
    id: "basic_monthly",
    mode: "subscription",
    creditUnits: 600,
    plan: "basic",
    envKey: "STRIPE_PRICE_BASIC_MONTHLY",
  },
  advanced_monthly: {
    id: "advanced_monthly",
    mode: "subscription",
    creditUnits: 3000,
    plan: "advanced",
    envKey: "STRIPE_PRICE_ADVANCED_MONTHLY",
  },
  basic_annual: {
    id: "basic_annual",
    mode: "subscription",
    creditUnits: 7200,
    plan: "basic",
    envKey: "STRIPE_PRICE_BASIC_ANNUAL",
  },
  advanced_annual: {
    id: "advanced_annual",
    mode: "subscription",
    creditUnits: 36000,
    plan: "advanced",
    envKey: "STRIPE_PRICE_ADVANCED_ANNUAL",
  },
  credits_1600: {
    id: "credits_1600",
    mode: "payment",
    creditUnits: 3200,
    envKey: "STRIPE_PRICE_CREDITS_1600",
  },
  credits_4000: {
    id: "credits_4000",
    mode: "payment",
    creditUnits: 8000,
    envKey: "STRIPE_PRICE_CREDITS_4000",
  },
};

export async function stripeEnv() {
  const { env } = await getCloudflareContext({ async: true });
  return env;
}

export async function stripeRequest(
  path: string,
  body?: URLSearchParams,
  idempotencyKey?: string
): Promise<Record<string, unknown>> {
  const env = await stripeEnv();
  if (!env.STRIPE_SECRET_KEY) {
    throw new ApiError(503, "BILLING_NOT_CONFIGURED", "Payments are not configured yet.");
  }
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "content-type": "application/x-www-form-urlencoded",
      ...(idempotencyKey ? { "idempotency-key": idempotencyKey } : {}),
    },
    body,
  });
  const data = (await response.json()) as Record<string, unknown>;
  if (!response.ok) {
    console.error("Stripe request failed", response.status, data.error);
    throw new ApiError(502, "BILLING_PROVIDER_ERROR", "The payment provider rejected this request.");
  }
  return data;
}

export function productForPrice(priceId: string, env: CloudflareEnv): BillingProduct | null {
  const entry = Object.values(BILLING_PRODUCTS).find(
    (product) => env[product.envKey] === priceId
  );
  return entry ?? null;
}
