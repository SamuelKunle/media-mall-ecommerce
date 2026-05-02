import type { Product } from "@/components/ProductCard";

/** Demo cap per SKU so cart math stays realistic without a backend */
export const DEMO_MAX_UNITS_PER_SKU = 10;

/** Subtotals at or above this (USD) get free shipping in the demo rules */
export const FREE_SHIPPING_THRESHOLD_USD = 99;

/** Flat shipping when below threshold (USD, whole dollars) */
export const FLAT_SHIPPING_USD = 10;

/** ISO 4217 code used for all storefront prices. */
export const STORE_CURRENCY_CODE = "USD" as const;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: STORE_CURRENCY_CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function shippingFromSubtotal(subtotal: number): number {
  return subtotal > FREE_SHIPPING_THRESHOLD_USD ? 0 : FLAT_SHIPPING_USD;
}

export function lineSavings(product: Product, qty: number): number {
  const list = product.oldPrice ?? product.price;
  return Math.max(0, list - product.price) * qty;
}

export function cartSubtotal(
  items: { product: Product; qty: number }[],
): number {
  return items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
}

export function cartSavings(
  items: { product: Product; qty: number }[],
): number {
  return items.reduce((sum, i) => sum + lineSavings(i.product, i.qty), 0);
}

export function isPurchasable(product: Product): boolean {
  return product.inStock !== false;
}
