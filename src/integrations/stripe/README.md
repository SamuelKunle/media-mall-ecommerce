# Stripe (optional)

This repo ships **UI-only** checkout. To take real payments:

1. Create a [Stripe](https://stripe.com) account and get API keys.
2. Add to `.env.local`:
   - `STRIPE_SECRET_KEY` — server only; never commit.
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — if you use Stripe.js on the client.
3. Implement `createCheckoutSession` in `server.ts` using the official `stripe` package.
4. Add a Route Handler (e.g. `app/api/checkout/route.ts`) that calls `createCheckoutSession` and returns the session URL.
5. From checkout, `fetch` that route and redirect with `window.location.href = url`.

Card fields on the demo checkout are validated locally for UX; **always** finalize payment with Stripe (or Paystack, etc.) on the server.
