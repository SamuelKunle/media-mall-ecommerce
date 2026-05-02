/**
 * Client-side Stripe helpers. Install `stripe` and add keys to `.env` when ready.
 * See `integrations/stripe/README.md`.
 */

export function isStripePublishableConfigured(): boolean {
  const k = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  return typeof k === "string" && k.startsWith("pk_");
}
