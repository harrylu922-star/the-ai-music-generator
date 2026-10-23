# The AI Music Generator

Next.js application deployed to Cloudflare Workers with OpenNext. The app now
includes persistent accounts, sessions, generation history, credits, R2 media
storage, Stripe checkout, AI lyrics, and a server-side music provider adapter.

## Architecture

- Next.js UI and API routes run in `the-ai-music-generator`.
- `the-ai-music-generator-db` is an internal Worker backed by a Durable Object
  with SQLite storage for users, sessions, jobs, rate limits, and purchases.
- Generated audio is stored privately in the
  `the-ai-music-generator-media` R2 bucket.
- Lyrics use the Cloudflare Workers AI binding.
- Music generation uses a generic authenticated HTTPS provider.
- Stripe Checkout and webhooks manage subscriptions and credit purchases.

## Requirements

- Node.js 22 or newer
- npm 11 or newer
- A Cloudflare account

## Local setup

```bash
npm ci
cp .dev.vars.example .dev.vars
```

Fill in the provider and Stripe values in `.dev.vars`. Run the internal database
Worker and application preview in separate terminals:

```bash
npx wrangler dev --config backend/wrangler.jsonc --port 8790 --persist-to .wrangler/state
```

```bash
npx opennextjs-cloudflare build
npx opennextjs-cloudflare preview --port 8787
```

The app is available at `http://localhost:8787`. The health endpoint at
`/api/health` reports which integrations are configured.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm audit --omit=dev
npx opennextjs-cloudflare build
```

## Deployment

Create the R2 bucket once:

```bash
npx wrangler r2 bucket create the-ai-music-generator-media
```

Deploy the internal database Worker first:

```bash
npm run deploy:db
```

Configure the production values documented in [.dev.vars.example](.dev.vars.example)
with `wrangler secret put`, then deploy the application:

```bash
npm run deploy:workers
```

The current Workers.dev URL is printed by Wrangler. Production is served by the
Worker on `theaimusicgenerator.com`, `www.theaimusicgenerator.com`, and
`app.theaimusicgenerator.com`. The Cloudflare Zone must be active in the same
account as the Worker before the routes can publish publicly.

## Music provider contract

See [docs/music-provider-contract.md](docs/music-provider-contract.md).

Never commit `.dev.vars`, API keys, Stripe secrets, user databases, or generated
media.
