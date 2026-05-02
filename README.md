# MediaMall

[![CI](https://github.com/SamuelKunle/media-mall-ecommerce/actions/workflows/ci.yml/badge.svg)](https://github.com/SamuelKunle/media-mall-ecommerce/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Frontend for an electronics ecommerce experience: product browsing, categories, cart, and checkout UI. Built with **Next.js** (App Router), **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

Catalog and pricing are **sample data** for demonstration. There is **no live payment or inventory backend** unless you connect your own services.

## Architecture (quick map)

| Area | Location |
|------|-----------|
| Routes (App Router) | `src/app/` |
| Page UI | `src/views/` |
| Cart & providers | `src/contexts/`, `src/app/providers.tsx` |
| Catalog sample data | `src/data/products.ts` |
| Pricing / shipping helpers | `src/lib/commerce.ts` |
| Optional Stripe / auth / orders | `src/integrations/` |

## Deploy (Vercel)

1. Fork or push this repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com) → framework **Next.js** (auto-detected).
3. Build command: `npm run build` · Output: Next defaults · Install: `npm ci`.
4. Add env vars from `.env.example` only when you wire Supabase or Stripe.

Optional: set **Install Command** to `npm ci` for reproducible installs.

## Screenshots

Add your own hero image here after deployment (e.g. home + product page) so visitors see the UI immediately.

## Forking / going live

- **Payments:** stubs and notes live under `src/integrations/stripe/` (optional Stripe Checkout hook-up).
- **Auth:** `src/integrations/auth/session.ts` returns no session until you wire Supabase Auth, NextAuth, etc.
- **Orders:** `recordDemoOrder` in `src/integrations/orders/demo.ts` is a dev-only hook — replace with your API.
- Copy **`.env.example`** to `.env.local` for Supabase or Stripe keys when you add them.

## Prerequisites

- **Node.js** 20+ (see `engines` in `package.json`)
- npm

## Setup

```sh
npm install
npm run dev
```

Development server: **http://localhost:8080** (see `package.json`).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest) |

## Environment variables

Optional — for Supabase integration, create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

See **`.env.example`** for optional Stripe keys.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE).

## Stack

Next.js, React, TypeScript, Tailwind CSS, TanStack Query, Vitest.
