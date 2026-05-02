import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Heart, User, MapPin, ChevronDown, Menu, X, Phone, ChevronRight, ArrowRight, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/products";
import SearchDropdown from "@/components/SearchDropdown";
import { useCart } from "@/contexts/CartContext";
import MobileMenu from "@/components/MobileMenu";

const headerCategories = [
  { label: "Phones & Tablets", slug: "phones-tablets" },
  { label: "Laptops", slug: "laptops" },
  { label: "PCs & Components", slug: "pcs" },
  { label: "Monitors", slug: "monitors" },
  { label: "TVs", slug: "tvs" },
  { label: "Audio", slug: "audio" },
  { label: "Gaming", slug: "gaming" },
  { label: "Cameras", slug: "cameras" },
  { label: "Wearables", slug: "wearables" },
  { label: "Smart Home", slug: "smart-home" },
  { label: "Accessories", slug: "accessories" },
  { label: "Deals", slug: "all" },
];

const SiteHeader = () => {
  const { totalItems } = useCart();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // Close mega menu on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        megaRef.current && !megaRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
        setActiveCategory(null);
      }
    };
    if (megaOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen]);

  const activeCat = categories.find((c) => c.slug === activeCategory);

  return (
    <>
      {/* Utility Bar */}
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Lagos, Nigeria</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> 0800 MEDIAMALL</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/store-locator" className="hover:underline">Store Locator</Link>
            <Link href="/b2b" className="hover:underline">B2B Orders</Link>
            <Link href="/trade-in" className="hover:underline">Trade-in</Link>
            <Link href="/warranty" className="hover:underline">Warranty</Link>
            <Link href="/support" className="hover:underline">Support</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky-header">
        <div className="container flex items-center gap-2 py-2.5">
          <button
            className="md:hidden p-2 -ml-2 text-foreground shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <span className="text-sm font-black text-primary-foreground">MM</span>
            </div>
            <span className="hidden sm:block text-lg font-extrabold text-foreground tracking-tight">MediaMall</span>
          </Link>

          <div className="flex-1 min-w-0 relative">
            <div
              onClick={() => setSearchOpen(true)}
              className={`flex items-center w-full pl-9 pr-3 py-2 rounded-xl bg-secondary border border-border text-sm cursor-text transition-all ${searchOpen ? 'ring-2 ring-primary/30 border-primary' : ''}`}
            >
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground truncate text-xs sm:text-sm">Search phones, laptops...</span>
            </div>
            {searchOpen && (
              <SearchDropdown onClose={() => setSearchOpen(false)} />
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleDark}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link href="/wishlist" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
              <Heart className="w-4 h-4" />
              <span className="hidden lg:inline">Wishlist</span>
            </Link>
            <Link href="/cart" className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden lg:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-deal text-deal-foreground text-[10px] font-bold flex items-center justify-center">{totalItems > 99 ? "99+" : totalItems}</span>
              )}
            </Link>
            <Link href="/account" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">Account</span>
            </Link>
          </div>
        </div>

        {/* Category Nav */}
        <nav className="hidden md:block border-t border-border relative">
          <div className="container flex items-center gap-0 overflow-x-auto scrollbar-hide">
            <button
              ref={triggerRef}
              onClick={() => {
                setMegaOpen(!megaOpen);
                if (!megaOpen && categories.length > 0) setActiveCategory(categories[0].slug);
              }}
              className={`flex items-center gap-1 px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                megaOpen ? "text-primary bg-secondary" : "text-primary hover:bg-secondary"
              }`}
            >
              <Menu className="w-4 h-4" /> All Categories <ChevronDown className={`w-3 h-3 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
            </button>
            {headerCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  cat.label === "Deals" ? "text-deal font-semibold" : "text-foreground hover:text-primary"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Mega Menu Dropdown */}
          {megaOpen && (
            <div
              ref={megaRef}
              className="absolute left-0 right-0 top-full z-50 bg-card border-b border-border"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              <div className="container flex min-h-[380px]">
                {/* Left: Category List */}
                <div className="w-60 shrink-0 border-r border-border py-2 overflow-y-auto max-h-[420px]">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onMouseEnter={() => setActiveCategory(cat.slug)}
                      onClick={() => {
                        setMegaOpen(false);
                        setActiveCategory(null);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        activeCategory === cat.slug
                          ? "bg-primary/5 text-primary border-r-2 border-primary"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm font-medium flex-1">{cat.name}</span>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-colors ${activeCategory === cat.slug ? "text-primary" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>

                {/* Right: Category Details */}
                <div className="flex-1 p-6 overflow-y-auto max-h-[420px]">
                  {activeCat ? (
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{activeCat.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{activeCat.description}</p>
                        </div>
                        <Link
                          href={`/category/${activeCat.slug}`}
                          onClick={() => { setMegaOpen(false); setActiveCategory(null); }}
                          className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline shrink-0"
                        >
                          View All {activeCat.count} <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {/* Subcategories Grid */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Subcategories</p>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                          {activeCat.subcategories.map((sub) => (
                            <Link
                              key={sub}
                              href={`/category/${activeCat.slug}`}
                              onClick={() => { setMegaOpen(false); setActiveCategory(null); }}
                              className="px-3 py-2.5 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary text-sm text-foreground font-medium transition-colors"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Top Brands */}
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Top Brands</p>
                        <div className="flex flex-wrap gap-2">
                          {activeCat.brands.map((brand) => (
                            <Link
                              key={brand}
                              href={`/category/${activeCat.slug}`}
                              onClick={() => { setMegaOpen(false); setActiveCategory(null); }}
                              className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                            >
                              {brand}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                      Hover over a category to explore
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="border-t border-border bg-secondary/30">
                <div className="container flex items-center justify-between py-2.5">
                  <Link
                    href="/category/all"
                    onClick={() => { setMegaOpen(false); setActiveCategory(null); }}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    Browse All Categories <ArrowRight className="w-3 h-3" />
                  </Link>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>🔥 Free delivery on orders over ₦50K</span>
                    <span>✅ 100% genuine products</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Premium Mobile Menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default SiteHeader;
