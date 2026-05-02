"use client";

import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";
import ProductCard, { formatPrice, type Product } from "@/components/ProductCard";
import { sampleProducts } from "@/data/products";
import {
  DEMO_MAX_UNITS_PER_SKU,
  isPurchasable,
  FREE_SHIPPING_THRESHOLD_USD,
  STORE_CURRENCY_CODE,
} from "@/lib/commerce";
import { motion } from "framer-motion";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import RecentlyViewed from "@/components/RecentlyViewed";
import ReviewsSection from "@/components/ReviewsSection";
import {
  Star, Heart, BarChart2, ShoppingCart, Truck, Shield, RefreshCw,
  CreditCard, MapPin, ChevronRight, Minus, Plus, Check, ChevronLeft,
  Share2, Eye, Zap, BadgeCheck, Package
} from "lucide-react";

type ProductDetailProps = { product: Product };

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { addItem } = useCart();
  const router = useRouter();
  const purchasable = isPurchasable(product);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { recentIds } = useRecentlyViewed(product.id);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const images = [product.image];
  const related = sampleProducts.filter((p) => p.id !== product.id).slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: STORE_CURRENCY_CODE,
      price: product.price,
      availability: purchasable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  const freeDeliveryLabel = `Free delivery over ${formatPrice(FREE_SHIPPING_THRESHOLD_USD)}`;

  const fullSpecs = [
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.name },
    ...(product.specs?.map((s) => {
      const [label, ...rest] = s.split(" ");
      return { label: label || "Feature", value: rest.join(" ") || s };
    }) || []),
    { label: "Warranty", value: "12 Months Official" },
    { label: "In the Box", value: "Device, Charger, Cable, Documentation" },
  ];

  const bumpQty = (delta: number) => {
    setQty((q) => {
      const next = q + delta;
      if (next < 1) return 1;
      if (next > DEMO_MAX_UNITS_PER_SKU) return DEMO_MAX_UNITS_PER_SKU;
      return next;
    });
  };

  return (
    <PageTransition>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="min-h-screen bg-background pb-mobile-nav md:pb-0">
      <SiteHeader />

      <main className="container py-4 md:py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-3">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative aspect-square rounded-2xl bg-card border border-border overflow-hidden group cursor-zoom-in"
            >
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
              />
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {product.badges?.map((badge) => {
                  const cls = badge.toLowerCase().includes("flash") ? "badge-flash"
                    : badge.toLowerCase().includes("new") ? "badge-new"
                    : badge.toLowerCase().includes("best") ? "badge-bestseller"
                    : badge.toLowerCase().includes("official") ? "badge-official"
                    : "badge-deal";
                  return <span key={badge} className={cls}>{badge}</span>;
                })}
                {discount > 0 && <span className="badge-deal">-{discount}%</span>}
              </div>
              {/* Floating actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button
                  type="button"
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                    isWishlisted ? "bg-deal text-deal-foreground" : "bg-card/90 backdrop-blur text-foreground hover:bg-card"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label="Share product"
                  className="w-9 h-9 rounded-full bg-card/90 backdrop-blur text-foreground flex items-center justify-center hover:bg-card transition-all shadow-sm"
                >
                  <Share2 className="w-4 h-4" aria-hidden />
                </button>
              </div>
              {/* View count hint */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground/60 backdrop-blur text-background text-[10px] font-semibold">
                <Eye className="w-3 h-3" /> 42 viewing now
              </div>
            </motion.div>
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  aria-label={`View product image ${i + 1}`}
                  aria-current={i === activeImage ? "true" : undefined}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden bg-card transition-all ${
                    i === activeImage ? "border-primary shadow-sm" : "border-border hover:border-primary/30"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-5">
            {/* Brand & Title */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">{product.brand}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                  <BadgeCheck className="w-3 h-3" /> Official Store
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground leading-tight">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-warning text-warning" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              <span className="text-xs text-muted-foreground hidden sm:inline">· 500+ sold</span>
            </div>

            {/* Specs chips */}
            {product.specs && (
              <div className="flex flex-wrap gap-2">
                {product.specs.map((s) => (
                  <span key={s} className="filter-chip">{s}</span>
                ))}
              </div>
            )}

            {/* Price Block */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-extrabold text-deal">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="price-old text-base">{formatPrice(product.oldPrice)}</span>
                )}
              </div>
              {discount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-deal/10 text-deal text-xs font-bold">
                    <Zap className="w-3 h-3" /> Save {formatPrice(product.oldPrice! - product.price)}
                  </span>
                  <span className="text-xs text-muted-foreground">Limited time offer</span>
                </div>
              )}
              {product.installment && (
                <p className="text-sm font-medium text-success flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" /> {product.installment}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Prices in USD. Tax and fees, if any, are shown at checkout. Official warranty included.
              </p>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  purchasable ? "bg-success animate-pulse" : "bg-destructive"
                }`}
              />
              <span
                className={`text-sm font-semibold ${
                  purchasable ? "text-success" : "text-destructive"
                }`}
              >
                {purchasable ? "In Stock" : "Out of stock"}
              </span>
              {purchasable && (
                <span className="text-xs text-muted-foreground">· Ships within 24 hours</span>
              )}
            </div>

            {/* Quantity + CTA */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-xl overflow-hidden bg-card">
                  <button
                    type="button"
                    disabled={!purchasable}
                    onClick={() => bumpQty(-1)}
                    className="p-3 hover:bg-secondary transition-colors disabled:opacity-40"
                  >
                    <Minus className="w-4 h-4 text-foreground" />
                  </button>
                  <span className="px-5 text-sm font-bold text-foreground min-w-[40px] text-center">{qty}</span>
                  <button
                    type="button"
                    disabled={!purchasable || qty >= DEMO_MAX_UNITS_PER_SKU}
                    onClick={() => bumpQty(1)}
                    className="p-3 hover:bg-secondary transition-colors disabled:opacity-40"
                  >
                    <Plus className="w-4 h-4 text-foreground" />
                  </button>
                </div>
                <button
                  type="button"
                  disabled={!purchasable}
                  onClick={() => purchasable && addItem(product, qty)}
                  className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <ShoppingCart className="w-4 h-4" />{" "}
                  {purchasable ? "Add to Cart" : "Unavailable"}
                </button>
              </div>
              <button
                type="button"
                disabled={!purchasable}
                onClick={() => {
                  if (!purchasable) return;
                  addItem(product, qty);
                  router.push("/checkout");
                }}
                className="w-full py-3.5 rounded-xl gradient-deal text-deal-foreground text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                <Zap className="w-4 h-4" /> Buy Now — {formatPrice(product.price * qty)}
              </button>
              <p className="text-[11px] text-muted-foreground">
                Demo limit: up to {DEMO_MAX_UNITS_PER_SKU} units per item.
              </p>
            </div>

            {/* Secondary actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
                  isWishlisted ? "border-deal text-deal bg-deal/5" : "border-border text-foreground hover:bg-secondary"
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} aria-hidden /> {isWishlisted ? "Wishlisted" : "Wishlist"}
              </button>
              <button type="button" className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-1.5">
                <BarChart2 className="w-4 h-4" aria-hidden /> Compare
              </button>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { icon: Truck, text: freeDeliveryLabel, highlight: true },
                { icon: Shield, text: "100% genuine products" },
                { icon: RefreshCw, text: "30-day easy returns" },
                { icon: CreditCard, text: "0% installment plans" },
                { icon: MapPin, text: "Store pickup available" },
                { icon: Package, text: "Tracked & insured shipping" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                    <f.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-xs text-foreground font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs Table */}
        <section className="mt-12">
          <h2 className="section-title mb-5 flex items-center gap-2">
            <div className="w-1 h-6 rounded-full bg-primary" />
            Specifications
          </h2>
          <div className="product-card overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {fullSpecs.map((spec, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? "bg-secondary/30" : ""} hover:bg-secondary/50 transition-colors`}>
                    <td className="px-5 py-3.5 font-semibold text-muted-foreground w-1/3">{spec.label}</td>
                    <td className="px-5 py-3.5 text-foreground">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Reviews */}
        <ReviewsSection
          productRating={product.rating}
          productReviews={product.reviews}
          productName={product.name}
        />

        {/* Recently Viewed */}
        <RecentlyViewed recentIds={recentIds} />

        {/* Related Products */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title flex items-center gap-2">
              <div className="w-1 h-6 rounded-full bg-primary" />
              You May Also Like
            </h2>
            <Link href="/" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Sticky CTA - Enhanced */}
      <div className="fixed bottom-14 left-0 right-0 md:hidden bg-card/95 backdrop-blur-md border-t border-border px-3 py-2.5 z-40">
        <div className="flex items-center gap-2.5">
          <div className="flex-1 min-w-0">
            <p className="text-lg font-extrabold text-deal leading-tight">{formatPrice(product.price)}</p>
            {product.oldPrice && <p className="price-old text-[11px]">{formatPrice(product.oldPrice)}</p>}
          </div>
          <button
            type="button"
            disabled={!purchasable}
            onClick={() => purchasable && addItem(product, qty)}
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Add
          </button>
          <button
            type="button"
            disabled={!purchasable}
            onClick={() => {
              if (!purchasable) return;
              addItem(product, qty);
              router.push("/checkout");
            }}
            className="px-4 py-2.5 rounded-xl gradient-deal text-deal-foreground text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5" /> Buy Now
          </button>
        </div>
      </div>

      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default ProductDetail;
