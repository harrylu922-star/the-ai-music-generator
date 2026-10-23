# Backend Status

## Implemented

| Capability | Implementation |
|------------|----------------|
| Authentication | Email/password sign-up and login with PBKDF2 hashes and HTTP-only session cookies |
| Persistent data | Internal Worker using Durable Object SQLite |
| Users and sessions | Persistent users, 30-day sessions, daily free credits |
| Generation jobs | Persistent queued, generating, completed, and failed jobs |
| Credits | Atomic reservation, failure refunds, subscription and one-time grants |
| Lyrics API | `POST /api/lyrics/generate` using Cloudflare Workers AI |
| Music API | `POST /api/music/generate`, `GET /api/music/status` |
| Media storage | Private R2 storage and authenticated range-capable media route |
| Payments | Stripe Checkout, signed webhooks, subscriptions, credit packs |
| Rate limiting | Durable Object counters for auth, generation, and checkout |
| Account UI | `/auth` and `/account` with credits, history, lyrics, and audio playback |

## External configuration still required

1. Supply a music provider matching
   [music-provider-contract.md](music-provider-contract.md).
2. Create Stripe products/prices and set the documented price IDs.
3. Set Stripe secret and webhook signing keys.
4. Confirm the production domain and custom-domain route.

## Operational follow-ups

- Add transactional email verification and password reset.
- Store subscription/customer mappings in dedicated records rather than user
  fields if multiple concurrent subscriptions are supported.
- Add product analytics and provider cost/latency monitoring.
- Configure deletion jobs for expired R2 media according to plan limits.
