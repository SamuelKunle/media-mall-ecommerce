"use client";

import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";
import ProductCard, { formatPrice } from "@/components/ProductCard";
import { sampleProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, Tag, Truck, Shield, ChevronRight, ShoppingCart } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const { items, updateQty, removeItem, totalItems, subtotal, savings } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const shipping = subtotal > 50000 ? 0 : 3500;
  const total = subtotal + shipping;

  const recommended = sampleProducts.filter((p) => !items.some((i) => i.product.id === p.id)).slice(0, 5);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-16 md:pb-0">
        <SiteHeader />
        <div className="container py-20 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Discover our latest deals and top products</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Continue Shopping
          </Link>

          {recommended.length > 0 && (
            <section className="mt-12 text-left">
              <h2 className="section-title mb-4">Popular Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {recommended.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
        <SiteFooter />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SiteHeader />

      <main className="container py-4 md:py-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">Cart ({totalItems})</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h1 className="text-xl font-bold text-foreground">Shopping Cart</h1>

            {items.map((item) => {
              const discount = item.product.oldPrice
                ? Math.round(((item.product.oldPrice - item.product.price) / item.product.oldPrice) * 100)
                : 0;
              return (
                <div key={item.product.id} className="product-card p-4 flex gap-4">
                  <Link href={`/product/${item.product.id}`} className="w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-lg bg-secondary overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-2" />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-semibold text-primary uppercase">{item.product.brand}</p>
                        <Link href={`/product/${item.product.id}`} className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
                          {item.product.name}
                        </Link>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-deal">{formatPrice(item.product.price)}</span>
                      {item.product.oldPrice && <span className="price-old text-xs">{formatPrice(item.product.oldPrice)}</span>}
                      {discount > 0 && <span className="text-[10px] font-semibold text-deal">-{discount}%</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="p-1.5 hover:bg-secondary transition-colors">
                          <Minus className="w-3.5 h-3.5 text-foreground" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-foreground">{item.qty}</span>
                        <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="p-1.5 hover:bg-secondary transition-colors">
                          <Plus className="w-3.5 h-3.5 text-foreground" />
                        </button>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Subtotal: <span className="font-semibold text-foreground">{formatPrice(item.product.price * item.qty)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="product-card p-5 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Order Summary</h2>

              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input type="text" placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} maxLength={30}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
                <button className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">Apply</button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-success">Savings</span>
                    <span className="font-medium text-success">-{formatPrice(savings)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-muted-foreground">Free delivery on orders over ₦50,000</p>
                )}
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-xl font-extrabold text-deal">{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity text-center">
                Proceed to Checkout
              </Link>
              <Link href="/" className="block w-full py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors text-center">
                Continue Shopping
              </Link>
            </div>

            <div className="product-card p-4 space-y-3">
              {[
                { icon: Shield, text: "100% genuine products guaranteed" },
                { icon: Truck, text: "Fast nationwide delivery" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <f.icon className="w-4 h-4 text-primary shrink-0" />
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="section-title mb-4">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-14 left-0 right-0 md:hidden bg-card border-t border-border p-3 flex items-center gap-3 z-40">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{totalItems} items</p>
          <p className="text-lg font-extrabold text-deal">{formatPrice(total)}</p>
        </div>
        <Link href="/checkout" className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold">
          Checkout
        </Link>
      </div>

      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default Cart;
