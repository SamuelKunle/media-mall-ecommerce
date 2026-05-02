"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "@/components/ProductCard";
import {
  cartSubtotal,
  cartSavings,
  DEMO_MAX_UNITS_PER_SKU,
  isPurchasable,
} from "@/lib/commerce";
import { toast } from "sonner";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  savings: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "mediamall-cart";

const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, qty = 1) => {
    if (!isPurchasable(product)) {
      toast.error(`${product.name} is currently out of stock`);
      return;
    }
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const nextQty = (existing?.qty ?? 0) + qty;
      if (nextQty > DEMO_MAX_UNITS_PER_SKU) {
        toast.error(`Maximum ${DEMO_MAX_UNITS_PER_SKU} units per item in this demo storefront`);
        return prev;
      }
      if (existing) {
        toast.success(`Updated ${product.name} quantity in cart`);
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      toast.success(`${product.name} added to cart`);
      return [...prev, { product, qty }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
    toast.info("Item removed from cart");
  };

  const updateQty = (productId: number, qty: number) => {
    const line = items.find((i) => i.product.id === productId);
    if (line && !isPurchasable(line.product)) {
      toast.error("This item is out of stock");
      return;
    }
    if (qty > DEMO_MAX_UNITS_PER_SKU) {
      toast.error(`Maximum ${DEMO_MAX_UNITS_PER_SKU} units per item`);
      return;
    }
    if (qty < 1) return removeItem(productId);
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty } : i)),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartSubtotal(items);
  const savings = cartSavings(items);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        subtotal,
        savings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
