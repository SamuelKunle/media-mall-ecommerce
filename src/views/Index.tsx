"use client";

import SiteHeader from "@/components/SiteHeader";
import MobileBottomNav from "@/components/MobileBottomNav";
import HeroCarousel, { FlashSaleTimer } from "@/components/HeroCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import BrandShowcase from "@/components/BrandShowcase";
import PromoSection from "@/components/PromoSection";
import TrustStrip from "@/components/TrustStrip";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import PageTransition from "@/components/PageTransition";
import StaggerGrid from "@/components/StaggerGrid";
import RecentlyViewed from "@/components/RecentlyViewed";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { sampleProducts, categoryShortcuts, getProductById } from "@/data/products";
import { formatPrice } from "@/lib/commerce";
import { ChevronRight, Zap, TrendingUp, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Index = () => {
  const { recentIds } = useRecentlyViewed();
  const promoAirPods = getProductById(10);
  const promoGalaxy = getProductById(2);
  const flashSaleProducts = sampleProducts.filter((p) => p.badges?.includes("Flash Sale") || p.oldPrice);
  const bestSellers = sampleProducts.filter((p) => p.badges?.includes("Best Seller"));
  const newArrivals = sampleProducts.filter((p) => p.badges?.includes("New") || p.badges?.includes("Official"));

  return (
    <PageTransition>
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <SiteHeader />
      <TrustStrip />

      <main className="container space-y-8 py-6">
        {/* Hero + Side Promos */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            <HeroCarousel />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <Link href="/product/10" className="gradient-deal rounded-2xl p-5 flex flex-col justify-between text-primary-foreground">
              <div>
                <span className="badge-flash mb-2 inline-block">🔥 Hot Deal</span>
                <h3 className="text-sm font-bold mt-2">{promoAirPods?.name ?? "AirPods Pro 2"}</h3>
                <p className="text-xs opacity-80 mt-0.5">USB-C, Active Noise Cancel</p>
              </div>
              <p className="text-lg font-extrabold mt-3">
                {promoAirPods ? formatPrice(promoAirPods.price) : formatPrice(249)}
              </p>
            </Link>
            <Link href="/product/2" className="bg-card rounded-2xl border border-border p-5 flex flex-col justify-between">
              <div>
                <span className="badge-new mb-2 inline-block">New Arrival</span>
                <h3 className="text-sm font-bold text-foreground mt-2">{promoGalaxy?.name ?? "Galaxy S24 Ultra"}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Titanium, 200MP Camera</p>
              </div>
              <p className="price-current mt-3">
                {promoGalaxy ? formatPrice(promoGalaxy.price) : formatPrice(1299)}
              </p>
            </Link>
          </div>
        </section>

        {/* Quick Category Shortcuts */}
        <section>
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
            {categoryShortcuts.map((cat) => (
              <Link key={cat.name} href={`/category/${cat.slug}`} className="category-chip shrink-0">
                <span>{cat.icon}</span> {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Sale */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="section-title flex items-center gap-2">
                <Zap className="w-5 h-5 text-deal" /> Flash Sale
              </h2>
              <FlashSaleTimer />
            </div>
            <Link href="/category/all" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {flashSaleProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerGrid>
        </section>

        <CategoryGrid />

        {/* Best Sellers */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-warning" /> Best Sellers
            </h2>
            <Link href="/category/all" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {bestSellers.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerGrid>
        </section>

        {/* Featured Product */}
        <section>
          <h2 className="section-title flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-primary" /> Featured
          </h2>
          <ProductCard product={sampleProducts[0]} variant="featured" />
        </section>

        <PromoSection />

        {/* New Arrivals */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> New Arrivals
            </h2>
            <Link href="/category/all" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {newArrivals.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerGrid>
        </section>

        <BrandShowcase />

        {/* Recently Viewed */}
        <RecentlyViewed recentIds={recentIds} />

        {/* Use Case Shopping */}
        <section>
          <h2 className="section-title mb-4">Shop by Use Case</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { title: "Work from Home", desc: "Monitors, keyboards, webcams", emoji: "🏠", slug: "monitors" },
              { title: "Gaming Setup", desc: "Consoles, laptops, peripherals", emoji: "🎮", slug: "gaming" },
              { title: "Content Creation", desc: "Cameras, mics, editing tools", emoji: "🎬", slug: "cameras" },
              { title: "Back to School", desc: "Laptops, tablets, accessories", emoji: "📚", slug: "laptops" },
            ].map((uc) => (
              <Link key={uc.title} href={`/category/${uc.slug}`} className="product-card p-5 flex items-start gap-3 group cursor-pointer">
                <span className="text-2xl">{uc.emoji}</span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{uc.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{uc.desc}</p>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary mt-2">
                    Shop Now <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Products Grid */}
        <section>
          <h2 className="section-title mb-4">Recommended for You</h2>
          <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerGrid>
        </section>
      </main>

      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default Index;
