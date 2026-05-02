/**
 * Demo-only order hook — replace with POST /api/orders + Stripe confirmation.
 * Safe to call from the client for this static storefront; production code should
 * create orders on the server only.
 */
export function recordDemoOrder(payload: unknown): void {
  if (process.env.NODE_ENV === "development") {
    console.info("[MediaMall demo] Order payload (no backend):", payload);
  }
}
