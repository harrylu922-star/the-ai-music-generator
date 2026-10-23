# Production Integration Checklist

## Application

- [x] Next.js API routes run on OpenNext Workers.
- [x] Registration, login, logout, and session lookup use server-side cookies.
- [x] Music and lyrics workspaces call the BFF instead of local timers.
- [x] Pricing buttons call Stripe Checkout.
- [x] Account page loads credits and persistent generation history.
- [x] Failed generation jobs refund reserved credits.

## Cloudflare

- [x] Internal Durable Object database Worker is implemented.
- [x] R2 bucket is created.
- [x] R2, AI, and database bindings are configured.
- [x] The production Zone is active and the application is attached at
  `theaimusicgenerator.com`, `www.theaimusicgenerator.com`, and
  `app.theaimusicgenerator.com`.
- [x] The legacy Harrylu922 Pages production domains are removed and its Git
  automatic deployment integration is disconnected.
- [x] Wrangler OAuth has Worker, route, Zone, and TLS scopes for deployment.

## AI provider

- [x] Lyrics generation uses Workers AI.
- [x] Generic server-side music provider adapter is implemented.
- [x] Supplier-specific `MUSIC_GENERATE_URL`, `MUSIC_STATUS_URL`, and API key
  are configured.
- [x] Provider output, polling, R2 persistence, and authenticated playback are
  verified in production.

See [music-provider-contract.md](music-provider-contract.md).

## Stripe

- [x] Server-side Checkout endpoint and signed webhook handler are implemented.
- [x] One-time credits and subscription products map to credit amounts.
- [x] Stripe Test products and prices are created.
- [x] `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are configured.
- [x] Test-mode Checkout opens with the expected price, and the production
  endpoint accepts a correctly signed webhook.
- [ ] Stripe Live onboarding and a Live-mode payment are completed by the
  account holder.

## Launch verification

```bash
npm ci
npm run lint
npx tsc --noEmit
npm audit --omit=dev
npx opennextjs-cloudflare build
```

Then deploy both Workers and test `/api/health`, account creation, lyric
generation, failed-music credit refunds, checkout, webhook idempotency, audio
streaming, and logout.
