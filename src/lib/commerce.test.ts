import { describe, it, expect } from "vitest";
import {
  formatPrice,
  shippingFromSubtotal,
  lineSavings,
  cartSubtotal,
  cartSavings,
  FREE_SHIPPING_THRESHOLD_USD,
  FLAT_SHIPPING_USD,
  DEMO_MAX_UNITS_PER_SKU,
  isPurchasable,
} from "./commerce";
import type { Product } from "@/components/ProductCard";

const p = (overrides: Partial<Product> & Pick<Product, "id" | "name" | "price">): Product => ({
  brand: "Test",
  image: "https://example.com/i.jpg",
  rating: 4,
  reviews: 1,
  ...overrides,
});

describe("commerce", () => {
  it("formatPrice uses USD", () => {
    expect(formatPrice(1299)).toMatch(/\$/);
    expect(formatPrice(1000)).toMatch(/1,000/);
  });

  it("shippingFromSubtotal matches free threshold", () => {
    expect(shippingFromSubtotal(FREE_SHIPPING_THRESHOLD_USD + 1)).toBe(0);
    expect(shippingFromSubtotal(FREE_SHIPPING_THRESHOLD_USD)).toBe(FLAT_SHIPPING_USD);
    expect(shippingFromSubtotal(0)).toBe(FLAT_SHIPPING_USD);
  });

  it("lineSavings respects oldPrice", () => {
    const product = p({
      id: 1,
      name: "X",
      price: 100,
      oldPrice: 150,
    });
    expect(lineSavings(product, 2)).toBe(100);
  });

  it("cartSubtotal and cartSavings aggregate lines", () => {
    const items = [
      { product: p({ id: 1, name: "A", price: 100, oldPrice: 120 }), qty: 2 },
      { product: p({ id: 2, name: "B", price: 50 }), qty: 1 },
    ];
    expect(cartSubtotal(items)).toBe(250);
    expect(cartSavings(items)).toBe(40);
  });

  it("isPurchasable treats missing inStock as true", () => {
    expect(isPurchasable(p({ id: 1, name: "A", price: 1 }))).toBe(true);
    expect(isPurchasable(p({ id: 1, name: "A", price: 1, inStock: true }))).toBe(true);
    expect(isPurchasable(p({ id: 1, name: "A", price: 1, inStock: false }))).toBe(false);
  });

  it("DEMO_MAX_UNITS_PER_SKU is a positive integer", () => {
    expect(DEMO_MAX_UNITS_PER_SKU).toBeGreaterThan(0);
  });
});
