import { useState, useRef, useEffect, useMemo } from "react";
import { Search, ArrowRight, TrendingUp, Clock, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sampleProducts, categories } from "@/data/products";
import { formatPrice } from "@/lib/commerce";

const trendingSearches = ["iPhone 15", "MacBook Pro", "AirPods", "PS5", "Galaxy S24", "RTX 4060"];

interface SearchDropdownProps {
  onClose: () => void;
}

const SearchDropdown = ({ onClose }: SearchDropdownProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const results = useMemo(() => {
    if (query.length < 2) return { products: [], categories: [], brands: [] };
    const q = query.toLowerCase();

    const products = sampleProducts
      .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      .slice(0, 5);

    const matchedCategories = categories
      .filter((c) => c.name.toLowerCase().includes(q) || c.subcategories.some((s) => s.toLowerCase().includes(q)))
      .slice(0, 3);

    const allBrands = [...new Set(sampleProducts.map((p) => p.brand))];
    const matchedBrands = allBrands.filter((b) => b.toLowerCase().includes(q)).slice(0, 4);

    return { products, categories: matchedCategories, brands: matchedBrands };
  }, [query]);

  const hasResults = results.products.length > 0 || results.categories.length > 0 || results.brands.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSuggestionClick = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <div ref={containerRef} className="absolute left-0 right-0 top-full z-50 mt-1">
      <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden max-h-[70vh] overflow-y-auto">
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phones, laptops, accessories..."
            className="flex-1 text-sm text-foreground bg-transparent outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} className="p-1 text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {query.length < 2 ? (
          /* Trending / Suggestions */
          <div className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Trending Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSuggestionClick(term)}
                  className="px-3 py-1.5 rounded-lg bg-secondary text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : hasResults ? (
          <div>
            {/* Brand Matches */}
            {results.brands.length > 0 && (
              <div className="px-4 pt-3 pb-2">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Brands</p>
                <div className="flex flex-wrap gap-1.5">
                  {results.brands.map((brand) => (
                    <Link
                      key={brand}
                      href={`/brand/${brand.toLowerCase()}`}
                      onClick={onClose}
                      className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Category Matches */}
            {results.categories.length > 0 && (
              <div className="px-4 pt-3 pb-2">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Categories</p>
                {results.categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span className="text-sm font-medium text-foreground">{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                  </Link>
                ))}
              </div>
            )}

            {/* Product Matches */}
            {results.products.length > 0 && (
              <div className="px-4 pt-3 pb-2">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Products</p>
                {results.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-secondary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                    </div>
                    <span className="text-sm font-bold text-primary whitespace-nowrap">{formatPrice(product.price)}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* View All */}
            <div className="border-t border-border px-4 py-3">
              <button
                onClick={() => handleSuggestionClick(query)}
                className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-primary hover:underline"
              >
                View all results for "{query}" <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
            <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
