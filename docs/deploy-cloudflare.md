# Deploy to Cloudflare Workers

The production application runs on Cloudflare Workers through OpenNext. API
routes, authentication, generation jobs, R2 media, and Stripe webhooks are not
supported by the previous static Cloudflare Pages deployment.

## 1. Prerequisites

- Node.js 22+
- A Cloudflare account
- A music generation provider matching
  [music-provider-contract.md](music-provider-contract.md)
- Stripe prices and webhook access

```bash
npm ci
npx wrangler login
```

The active `theaimusicgenerator.com` Zone and both Workers must belong to the
same Cloudflare account. Production custom domains are
`theaimusicgenerator.com`, `www.theaimusicgenerator.com`, and
`app.theaimusicgenerator.com`.

## 2. Storage

Create the private generated-media bucket once:

```bash
npx wrangler r2 bucket create the-ai-music-generator-media
```

## 3. Secrets

Set production values for the main Worker:

```bash
npx wrangler secret put NEXT_PUBLIC_SITE_URL
npx wrangler secret put MUSIC_PROVIDER
npx wrangler secret put MUSIC_MODEL
npx wrangler secret put MUSIC_GENERATE_URL
npx wrangler secret put MUSIC_STATUS_URL
npx wrangler secret put MUSIC_API_KEY
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put STRIPE_PRICE_BASIC_MONTHLY
npx wrangler secret put STRIPE_PRICE_ADVANCED_MONTHLY
npx wrangler secret put STRIPE_PRICE_BASIC_ANNUAL
npx wrangler secret put STRIPE_PRICE_ADVANCED_ANNUAL
npx wrangler secret put STRIPE_PRICE_CREDITS_1600
npx wrangler secret put STRIPE_PRICE_CREDITS_4000
```

Use `NEXT_PUBLIC_SITE_URL=https://theaimusicgenerator.com`, including the
scheme. Set `MUSIC_PROVIDER=cqtai` and `MUSIC_MODEL=v50`.

## 4. Deploy

Deploy the internal SQLite-backed Durable Object Worker first:

```bash
npm run deploy:db
```

Then build and deploy the application Worker:

```bash
npm run deploy:workers
```

`wrangler.jsonc` owns the custom-domain route. Do not use `npm run start` for
this deployment; it starts a Node production server and does not deploy the
Workers API routes.

The application Worker binds:

- `APP_DATABASE` to the `AppDatabase` Durable Object in
  `the-ai-music-generator-db`
- `MEDIA_BUCKET` to `the-ai-music-generator-media`
- `AI` to Cloudflare Workers AI

## 5. Stripe webhook

Create a webhook endpoint:

```text
https://your-production-origin.example/api/billing/webhook
```

Subscribe to:

- `checkout.session.completed`
- `invoice.paid`
- `customer.subscription.deleted`

Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

After moving a Zone from another Cloudflare account:

1. Reproduce the active DNS records in the destination Zone, including the
   apex and `www` Pages CNAMEs.
2. Update the registrar nameservers to the destination Zone's assigned pair.
3. Run **Check nameservers** in Cloudflare and wait for the Zone to become
   active.
4. Deploy the Worker again after activation so Cloudflare rebuilds the custom
   domain and certificate.
5. Recheck both the main site and the application health endpoint.

## 6. Verify

```bash
curl https://app.theaimusicgenerator.com/api/health
```

Expected integrations report `true` only when their secrets are configured.
Create a test account and verify sign-in, credit display, lyrics generation,
one failed music request with a credit refund, Stripe Checkout in test mode, and
the webhook delivery log.

## Local preview

Run the database Worker and application preview in separate terminals:

```bash
npx wrangler dev --config backend/wrangler.jsonc --port 8790 --persist-to .wrangler/state
```

```bash
npx opennextjs-cloudflare build
npx opennextjs-cloudflare preview --port 8787
```

Copy `.dev.vars.example` to `.dev.vars` before preview. The file is ignored by
Git.
