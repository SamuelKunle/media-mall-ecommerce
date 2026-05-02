"use client";

import { useState, useMemo } from "react";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Grid3X3, List } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";
import ProductCard from "@/components/ProductCard";
import { sampleProducts, categories } from "@/data/products";

const allBrands = [...new Set(sampleProducts.map((p) => p.brand))].sort();

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();

    return sampleProducts.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.category?.toLowerCase() ?? "").includes(q) ||
        (p.specs && p.specs.some((s) => s.toLowerCase().includes(q)));

      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesBrand = !selectedBrand || p.brand === selectedBrand;

      return matchesQuery && matchesCategory && matchesBrand;
    });
  }, [query, selectedCategory, selectedBrand]);

  const sortedResults = useMemo(() => {
    const r = [...results];
    switch (sortBy) {
      case "price-low": return r.sort((a, b) => a.price - b.price);
      case "price-high": return r.sort((a, b) => b.price - a.price);
      case "rating": return r.sort((a, b) => b.rating - a.rating);
      case "reviews": return r.sort((a, b) => b.reviews - a.reviews);
      default: return r;
    }
  }, [results, sortBy]);

  const resultCategories = useMemo(() => {
    const slugs = [...new Set(results.map((p) => p.category))];
    return categories.filter((c) => slugs.includes(c.slug));
  }, [results]);

  const resultBrands = useMemo(() => {
    return [...new Set(results.map((p) => p.brand))].sort();
  }, [results]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSortBy("relevance");
  };

  const hasFilters = selectedCategory || selectedBrand || sortBy !== "relevance";

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Search className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">
              Search results for "<span className="text-primary">{query}</span>"
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">{sortedResults.length} products found</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-56 shrink-0 space-y-5">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Category</p>
              <div className="space-y-1">
                {resultCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.slug
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Brand</p>
              <div className="space-y-1">
                {resultBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedBrand === brand
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="text-xs font-semibold text-deal hover:underline flex items-center gap-1">
                <X className="w-3 h-3" /> Clear all filters
              </button>
            )}
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
                {hasFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
              </button>

              {/* Active Filters Pills */}
              {selectedCategory && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory(null)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedBrand && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {selectedBrand}
                  <button onClick={() => setSelectedBrand(null)}><X className="w-3 h-3" /></button>
                </span>
              )}

              <div className="ml-auto flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
                <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Drawer */}
            {showFilters && (
              <div className="lg:hidden bg-card rounded-xl border border-border p-4 mb-4 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {resultCategories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedCategory === cat.slug ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                        }`}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Brand</p>
                  <div className="flex flex-wrap gap-2">
                    {resultBrands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedBrand === brand ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {sortedResults.length > 0 ? (
              <div className={viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
                : "space-y-3"
              }>
                {sortedResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground mb-2">No products found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {hasFilters ? "Try removing some filters" : `We couldn't find anything matching "${query}"`}
                </p>
                {hasFilters && (
                  <button onClick={clearFilters} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default SearchResults;
