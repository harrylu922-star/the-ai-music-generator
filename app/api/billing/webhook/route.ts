import { NextResponse } from "next/server";
import { ApiError, errorResponse } from "../../../../lib/server/api";
import { stripeEnv } from "../../../../lib/server/billing";
import { databaseRpc } from "../../../../lib/server/db";

type StripeEventObject = {
  id?: string;
  customer?: string;
  subscription?: string;
  mode?: string;
  client_reference_id?: string;
  metadata?: Record<string, string>;
  subscription_details?: { metadata?: Record<string, string> };
  lines?: {
    data?: Array<{
      price?: { id?: string };
      period?: { end?: number };
    }>;
  };
  current_period_end?: number;
};

type StripeEvent = {
  id: string;
  type: string;
  data: { object: StripeEventObject };
};

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function verifyStripeSignature(
  payload: string,
  signatureHeader: string,
  secret: string
): Promise<void> {
  const parts = signatureHeader.split(",").map((part) => part.trim().split("="));
  const timestamp = parts.find(([key]) => key === "t")?.[1];
  const signatures = parts.filter(([key]) => key === "v1").map(([, value]) => value);
  if (!timestamp || signatures.length === 0) {
    throw new ApiError(400, "INVALID_SIGNATURE", "Missing Stripe signature.");
  }
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
    throw new ApiError(400, "STALE_SIGNATURE", "Stripe signature has expired.");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const digest = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${payload}`)
  );
  const expected = bytesToHex(new Uint8Array(digest));
  if (!signatures.includes(expected)) {
    throw new ApiError(400, "INVALID_SIGNATURE", "Invalid Stripe signature.");
  }
}

async function grantEventCredits(event: StripeEvent, object: StripeEventObject) {
  const metadata = object.metadata ?? object.subscription_details?.metadata ?? {};
  const userId = metadata.user_id ?? object.client_reference_id;
  const productId = metadata.product_id;
  const creditUnits = Number(metadata.credit_units);
  if (!userId || !productId || !Number.isFinite(creditUnits) || creditUnits <= 0) return;

  await databaseRpc("recordPurchase", {
    eventId: event.id,
    userId,
    productId,
    creditUnits,
    stripeSessionId: object.id ?? null,
  });
  if (metadata.plan) {
    await databaseRpc("setSubscription", {
      userId,
      plan: metadata.plan,
      planPeriodEnd:
        object.current_period_end ??
        object.lines?.data?.[0]?.period?.end ??
        null,
      stripeCustomerId: object.customer ?? null,
    });
  }
}

export async function POST(request: Request) {
  try {
    const env = await stripeEnv();
    if (!env.STRIPE_WEBHOOK_SECRET) {
      throw new ApiError(503, "BILLING_NOT_CONFIGURED", "Stripe webhooks are not configured.");
    }
    const signature = request.headers.get("stripe-signature");
    if (!signature) throw new ApiError(400, "INVALID_SIGNATURE", "Missing Stripe signature.");
    const rawBody = await request.text();
    await verifyStripeSignature(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
    const event = JSON.parse(rawBody) as StripeEvent;

    if (event.type === "checkout.session.completed" || event.type === "invoice.paid") {
      await grantEventCredits(event, event.data.object);
    }
    if (event.type === "customer.subscription.deleted") {
      const metadata = event.data.object.metadata ?? {};
      const userId = metadata.user_id;
      if (userId) {
        await databaseRpc("setSubscription", {
          userId,
          plan: "free",
          planPeriodEnd: null,
          stripeCustomerId: event.data.object.customer ?? null,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return errorResponse(error);
  }
}
