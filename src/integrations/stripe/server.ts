/**
 * Server-only Stripe Checkout stub. Import from Route Handlers / Server Actions only.
 *
 * Example flow when wired:
 * 1. Client collects cart + shipping.
 * 2. POST /api/checkout-session → createCheckoutSession().
 * 3. Redirect user to session.url.
 */

export async function createCheckoutSession(input: {
  lineItems: { price_data?: unknown; quantity: number }[];
  successUrl: string;
  cancelUrl: string;
}): Promise<{ url: string }> {
  void input;
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret?.startsWith("sk_")) {
    throw new Error(
      "Stripe is not configured. Set STRIPE_SECRET_KEY and implement checkout in integrations/stripe/server.ts — see README.",
    );
  }
  throw new Error(
    "Stripe SDK not wired — replace this stub with stripe.checkout.sessions.create(...)",
  );
}
