import type { Product } from "@/components/ProductCard";

/** Demo cap per SKU so cart math stays realistic without a backend */
export const DEMO_MAX_UNITS_PER_SKU = 10;

export const FREE_SHIPPING_THRESHOLD_NGN = 50_000;
export const FLAT_SHIPPING_NGN = 3_500;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export function shippingFromSubtotal(subtotal: number): number {
  return subtotal > FREE_SHIPPING_THRESHOLD_NGN ? 0 : FLAT_SHIPPING_NGN;
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
