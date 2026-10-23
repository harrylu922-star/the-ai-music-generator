import { NextResponse } from "next/server";
import {
  ApiError,
  errorResponse,
  readJson,
} from "../../../../lib/server/api";
import { enforceRateLimit, requireUser } from "../../../../lib/server/auth";
import {
  BILLING_PRODUCTS,
  stripeEnv,
  stripeRequest,
} from "../../../../lib/server/billing";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    await enforceRateLimit(request, "billing-checkout", 10, 60_000);
    const body = await readJson<{ productId?: string }>(request);
    const product = BILLING_PRODUCTS[String(body.productId ?? "")];
    if (!product) throw new ApiError(400, "UNKNOWN_PRODUCT", "Select a valid plan or credit pack.");

    const env = await stripeEnv();
    const price = env[product.envKey];
    if (!price) {
      throw new ApiError(503, "PRICE_NOT_CONFIGURED", "This plan is not configured yet.");
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const params = new URLSearchParams({
      mode: product.mode,
      "line_items[0][price]": price,
      "line_items[0][quantity]": "1",
      customer_email: user.email,
      client_reference_id: user.id,
      "metadata[user_id]": user.id,
      "metadata[product_id]": product.id,
      "metadata[credit_units]": String(product.creditUnits),
      success_url: `${origin}/account?checkout=success`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      allow_promotion_codes: "true",
    });
    if (product.mode === "subscription") {
      params.set("subscription_data[metadata][user_id]", user.id);
      params.set("subscription_data[metadata][product_id]", product.id);
      params.set("subscription_data[metadata][credit_units]", String(product.creditUnits));
      params.set("subscription_data[metadata][plan]", product.plan ?? "");
    }

    const session = await stripeRequest(
      "checkout/sessions",
      params,
      `checkout:${user.id}:${product.id}:${Date.now()}`
    );
    return NextResponse.json({ ok: true, url: session.url, sessionId: session.id });
  } catch (error) {
    return errorResponse(error);
  }
}
