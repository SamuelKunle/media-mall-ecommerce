"use client";

import { Heart, Trash2, ShoppingCart } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";
import { sampleProducts } from "@/data/products";

const wishlistItems = sampleProducts.slice(0, 4);

const Wishlist = () => {
  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-8 pb-24 md:pb-8">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-deal" />
          <h1 className="text-2xl font-bold text-foreground">My Wishlist</h1>
          <span className="text-sm text-muted-foreground">({wishlistItems.length} items)</span>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlistItems.map((product) => (
              <div key={product.id} className="bg-card rounded-xl border border-border p-4 group">
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-square bg-secondary rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
                  </div>
                  <p className="text-sm font-medium text-foreground line-clamp-2 mb-1">{product.name}</p>
                  <p className="text-lg font-bold text-primary">{product.price}</p>
                </Link>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">
                    <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                  <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-deal hover:border-deal transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground mb-2">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground mb-6">Save items you love and come back to them later.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
              Start Shopping
            </Link>
          </div>
        )}
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default Wishlist;
