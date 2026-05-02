"use client";

import { useState, useMemo } from "react";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";
import TrustStrip from "@/components/TrustStrip";
import ProductCard from "@/components/ProductCard";
import { sampleProducts, categories } from "@/data/products";
import {
  ChevronRight, SlidersHorizontal, Grid3X3, List, X, Star,
  ArrowRight, ShoppingBag, Sparkles, TrendingUp, Tag
} from "lucide-react";

type SortOption = "popular" | "price-low" | "price-high" | "rating" | "newest";

/* ─── All Categories Landing ─── */
const AllCategoriesView = () => {
  // Group: featured (large cards) vs rest
  const featured = categories.slice(0, 4);
  const rest = categories.slice(4);
  const topProducts = sampleProducts.slice(0, 10);

  return (
    <>
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden gradient-hero p-8 md:p-12 mb-8">
        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-semibold mb-4">
            <ShoppingBag className="w-3.5 h-3.5" /> Browse 6,000+ Products
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground tracking-tight mb-3">
            All Categories
          </h1>
          <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
            Explore a wide range of genuine electronics. From smartphones to smart homes — find exactly what you need.
          </p>
        </div>
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 rounded-full bg-primary-foreground/5 translate-y-1/2" />
      </div>

      {/* Featured Categories (large cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {featured.map((cat) => {
          const catProducts = sampleProducts.filter((p) => p.category === cat.slug);
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="product-card p-0 overflow-hidden group cursor-pointer flex flex-col"
            >
              <div className="p-6 pb-4 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground mb-0.5">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{cat.description}</p>
                  <span className="text-xs font-semibold text-primary mt-2 inline-flex items-center gap-1">
                    {cat.count} products <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
              {/* Subcategory chips */}
              <div className="px-6 pb-4 flex flex-wrap gap-1.5">
                {cat.subcategories.slice(0, 4).map((sub) => (
                  <span key={sub} className="px-2.5 py-1 rounded-lg bg-secondary text-[11px] font-medium text-muted-foreground">
                    {sub}
                  </span>
                ))}
                {cat.subcategories.length > 4 && (
                  <span className="px-2.5 py-1 rounded-lg bg-secondary text-[11px] font-medium text-primary">
                    +{cat.subcategories.length - 4} more
                  </span>
                )}
              </div>
              {/* Mini product previews */}
              {catProducts.length > 0 && (
                <div className="border-t border-border px-6 py-3 flex items-center gap-2 bg-secondary/30">
                  {catProducts.slice(0, 3).map((p) => (
                    <div key={p.id} className="w-10 h-10 rounded-lg bg-card border border-border overflow-hidden shrink-0">
                      <img src={p.image} alt="" className="w-full h-full object-contain p-0.5" />
                    </div>
                  ))}
                  <span className="text-[11px] text-muted-foreground ml-1">
                    {catProducts.length > 3 ? `+${catProducts.length - 3} more` : ""}
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Rest of Categories (compact grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
        {rest.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="product-card p-5 flex flex-col items-center gap-3 text-center group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{cat.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{cat.count} products</p>
            </div>
            <div className="flex flex-wrap justify-center gap-1">
              {cat.subcategories.slice(0, 3).map((sub) => (
                <span key={sub} className="px-2 py-0.5 rounded-md bg-secondary text-[10px] text-muted-foreground">
                  {sub}
                </span>
              ))}
            </div>
            <span className="text-xs font-medium text-primary flex items-center gap-1 mt-auto">
              Browse <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>

      {/* Popular Brands */}
      <section className="mb-10">
        <h2 className="section-title flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" /> Shop by Brand
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {["Apple", "Samsung", "Sony", "ASUS", "Dell", "Lenovo", "LG", "Xiaomi", "Bose", "JBL", "HP", "Canon"].map((brand) => (
            <div key={brand} className="product-card p-4 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <span className="text-sm font-semibold text-foreground">{brand}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section>
        <h2 className="section-title flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-warning" /> Trending Right Now
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {topProducts.slice(0, 10).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
};

/* ─── Category Listing Page ─── */
const CategoryPage = ({ slug }: { slug: string }) => {
  const category = categories.find((c) => c.slug === slug);
  const allMode = slug === "all";

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const products = useMemo(() => {
    let filtered = allMode
      ? sampleProducts
      : sampleProducts.filter((p) => p.category === slug);

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    switch (sortBy) {
      case "price-low": return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high": return [...filtered].sort((a, b) => b.price - a.price);
      case "rating": return [...filtered].sort((a, b) => b.rating - a.rating);
      case "newest": return [...filtered].sort((a, b) => b.id - a.id);
      default: return [...filtered].sort((a, b) => b.reviews - a.reviews);
    }
  }, [slug, allMode, selectedBrands, sortBy]);

  const availableBrands = useMemo(() => {
    const pool = allMode ? sampleProducts : sampleProducts.filter((p) => p.category === slug);
    return [...new Set(pool.map((p) => p.brand))].sort();
  }, [slug, allMode]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const title = category?.name || "Category";
  const description = category?.description || "";
  const subcategories = category?.subcategories || [];
  const categoryBrands = category?.brands || availableBrands;

  return (
    <PageTransition>
    <div className="min-h-screen bg-background pb-mobile-nav md:pb-0">
      <SiteHeader />

      <main className="container py-4 md:py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          {allMode ? (
            <span className="text-foreground font-medium">All Categories</span>
          ) : (
            <>
              <Link href="/category/all" className="hover:text-primary">Categories</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{title}</span>
            </>
          )}
        </nav>

        {allMode ? (
          <AllCategoriesView />
        ) : (
          <>
            {/* Category Header */}
            <div className="mb-6">
              <div className="rounded-2xl bg-card border border-border p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl shrink-0">
                  {category?.icon}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs font-semibold text-primary">{category?.count} products</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{categoryBrands.length} brands</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subcategory Chips */}
            {subcategories.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-5 pb-1">
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className={`filter-chip shrink-0 ${!selectedSub ? "active" : ""}`}
                >
                  All
                </button>
                {subcategories.map((sub) => (
                  <button
                    type="button"
                    key={sub}
                    onClick={() => setSelectedSub(selectedSub === sub ? null : sub)}
                    className={`filter-chip shrink-0 ${selectedSub === sub ? "active" : ""}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                  {selectedBrands.length > 0 && (
                    <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {selectedBrands.length}
                    </span>
                  )}
                </button>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {products.length} product{products.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 rounded-lg border border-border text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    type="button"
                    aria-pressed={viewMode === "grid"}
                    aria-label="Grid view"
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-pressed={viewMode === "list"}
                    aria-label="List view"
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Filters */}
            {selectedBrands.length > 0 && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {selectedBrands.map((brand) => (
                  <button
                    type="button"
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className="filter-chip active flex items-center gap-1"
                  >
                    {brand} <X className="w-3 h-3" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSelectedBrands([])}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Clear all
                </button>
              </div>
            )}

            <div className="flex gap-6">
              {/* Filter Sidebar */}
              {showFilters && (
                <aside className="hidden md:block w-56 shrink-0 space-y-5">
                  <div className="product-card p-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">Brand</h3>
                      <div className="space-y-1.5">
                        {categoryBrands.map((brand) => (
                          <label key={brand} className="flex items-center gap-2 text-sm text-foreground cursor-pointer hover:text-primary transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={() => toggleBrand(brand)}
                              className="rounded border-border"
                            />
                            {brand}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-border pt-4">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Rating</h3>
                      <div className="space-y-1.5">
                        {[4, 3, 2].map((r) => (
                          <label key={r} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                            <input type="checkbox" className="rounded border-border" />
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < r ? "fill-warning text-warning" : "text-border"}`} />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">& up</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-border pt-4">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Availability</h3>
                      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        In Stock Only
                      </label>
                    </div>
                  </div>
                </aside>
              )}

              {/* Product Grid */}
              <div className="flex-1">
                {products.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-secondary flex items-center justify-center mb-4">
                      <Tag className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-semibold text-foreground mb-2">Products coming soon</p>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                      We're adding new products to {title} every day. Check back soon or browse other categories.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <Link href="/category/all" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                        Browse All Categories
                      </Link>
                      <Link href="/" className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                        Back to Home
                      </Link>
                    </div>
                    {/* Show related categories */}
                    <div className="mt-10">
                      <p className="text-sm font-semibold text-foreground mb-3">Explore other categories</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {categories.filter((c) => c.slug !== slug).slice(0, 6).map((c) => (
                          <Link
                            key={c.slug}
                            href={`/category/${c.slug}`}
                            className="filter-chip flex items-center gap-1.5 hover:border-primary transition-colors"
                          >
                            <span>{c.icon}</span> {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : viewMode === "list" ? (
                  <div className="space-y-3">
                    {products.map((p) => (
                      <ProductCard key={p.id} product={p} variant="list" />
                    ))}
                  </div>
                ) : (
                  <div className={`grid grid-cols-2 ${showFilters ? "md:grid-cols-3 lg:grid-cols-4" : "sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"} gap-3`}>
                    {products.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Related Categories at Bottom */}
            {products.length > 0 && (
              <section className="mt-10">
                <h2 className="section-title mb-4">Related Categories</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {categories.filter((c) => c.slug !== slug).slice(0, 4).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="product-card p-4 flex items-center gap-3 group cursor-pointer"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{c.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{c.name}</p>
                        <p className="text-[11px] text-muted-foreground">{c.count} products</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default CategoryPage;
