"use client";

import { useState, useMemo } from "react";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { useParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";
import ProductCard from "@/components/ProductCard";
import { BrandLogo } from "@/components/BrandShowcase";
import { sampleProducts } from "@/data/products";
import { getBrandLogo } from "@/data/brandLogos";
import {
  ChevronRight, Grid3X3, List, ArrowRight, Shield, Truck, Award
} from "lucide-react";

const allBrands = [
  { name: "Apple", tagline: "Think Different" },
  { name: "Samsung", tagline: "Do What You Can't" },
  { name: "Sony", tagline: "Be Moved" },
  { name: "ASUS", tagline: "In Search of Incredible" },
  { name: "Dell", tagline: "Technologies" },
  { name: "Lenovo", tagline: "Smarter Technology for All" },
  { name: "LG", tagline: "Life's Good" },
  { name: "Xiaomi", tagline: "Make Friends with Users" },
  { name: "Bose", tagline: "Better Sound Through Research" },
  { name: "JBL", tagline: "Dare to Listen" },
  { name: "HP", tagline: "Keep Reinventing" },
  { name: "Acer", tagline: "Explore Beyond Limits" },
  { name: "Canon", tagline: "Delighting You Always" },
  { name: "Logitech", tagline: "Designed to Move You" },
  { name: "Anker", tagline: "Charge Fast. Live More." },
  { name: "TP-Link", tagline: "Reliably Smart" },
  { name: "Nintendo", tagline: "Putting Smiles on Faces" },
  { name: "Garmin", tagline: "Beat Yesterday" },
];

const BrandPage = () => {
  const params = useParams();
  const name = params.name as string | undefined;
  const isBrandDetail = !!name;
  const decodedName = name ? decodeURIComponent(name) : "";

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const brand = allBrands.find((b) => b.name === decodedName);

  const products = useMemo(() => {
    if (!isBrandDetail) return [];
    const filtered = sampleProducts.filter((p) => p.brand === decodedName);
    switch (sortBy) {
      case "price-low": return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high": return [...filtered].sort((a, b) => b.price - a.price);
      case "rating": return [...filtered].sort((a, b) => b.rating - a.rating);
      default: return [...filtered].sort((a, b) => b.reviews - a.reviews);
    }
  }, [decodedName, isBrandDetail, sortBy]);

  return (
    <PageTransition>
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <SiteHeader />

      <main className="container py-4 md:py-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          {isBrandDetail ? (
            <>
              <Link href="/brand" className="hover:text-primary">Brands</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{decodedName}</span>
            </>
          ) : (
            <span className="text-foreground font-medium">All Brands</span>
          )}
        </nav>

        {isBrandDetail ? (
          <>
            {/* Brand Header */}
            <div className="rounded-2xl bg-card border border-border p-6 md:p-8 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden shrink-0">
                  <BrandLogo brand={decodedName} size="w-12 h-12" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{decodedName}</h1>
                  {brand?.tagline && (
                    <p className="text-sm text-muted-foreground mt-1 italic">"{brand.tagline}"</p>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs font-semibold text-primary">{products.length} products available</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Authorized Retailer
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t border-border">
                {[
                  { icon: Shield, text: "100% Genuine Products" },
                  { icon: Award, text: "Official Warranty" },
                  { icon: Truck, text: "Free Delivery Available" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <f.icon className="w-3.5 h-3.5 text-primary" />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-sm text-muted-foreground">
                {products.length} product{products.length !== 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode("grid")} className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"}`}>
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode("list")} className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-secondary flex items-center justify-center mb-4">
                  <BrandLogo brand={decodedName} size="w-10 h-10" />
                </div>
                <p className="text-lg font-semibold text-foreground mb-2">{decodedName} products coming soon</p>
                <p className="text-sm text-muted-foreground mb-6">We're adding new {decodedName} products. Check back soon!</p>
                <div className="flex items-center justify-center gap-3">
                  <Link href="/brand" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">Browse All Brands</Link>
                  <Link href="/" className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors">Back to Home</Link>
                </div>
              </div>
            ) : viewMode === "list" ? (
              <div className="space-y-3">
                {products.map((p) => <ProductCard key={p.id} product={p} variant="list" />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}

            {/* Other Brands */}
            <section className="mt-10">
              <h2 className="section-title mb-4">Explore Other Brands</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {allBrands.filter((b) => b.name !== decodedName).slice(0, 12).map((b) => (
                  <Link key={b.name} href={`/brand/${encodeURIComponent(b.name)}`} className="product-card p-3 flex flex-col items-center justify-center gap-2 aspect-square group">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                      <BrandLogo brand={b.name} />
                    </div>
                    <span className="text-[11px] font-semibold text-foreground">{b.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* All Brands Landing */}
            <div className="relative rounded-2xl overflow-hidden gradient-hero p-8 md:p-12 mb-8">
              <div className="relative z-10 max-w-lg">
                <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground tracking-tight mb-3">All Brands</h1>
                <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                  Shop from {allBrands.length}+ authorized brands. Every product is 100% genuine with official warranty.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {allBrands.map((b) => {
                const count = sampleProducts.filter((p) => p.brand === b.name).length;
                return (
                  <Link key={b.name} href={`/brand/${encodeURIComponent(b.name)}`} className="product-card p-5 flex flex-col items-center gap-3 text-center group cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                      <BrandLogo brand={b.name} size="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{b.name}</p>
                      {b.tagline && <p className="text-[10px] text-muted-foreground mt-0.5 italic line-clamp-1">"{b.tagline}"</p>}
                      {count > 0 && <p className="text-[11px] font-medium text-primary mt-1">{count} products</p>}
                    </div>
                    <span className="text-xs font-medium text-primary flex items-center gap-1 mt-auto">
                      Shop <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </main>

      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default BrandPage;
