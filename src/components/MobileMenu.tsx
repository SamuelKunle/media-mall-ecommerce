import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, User, MapPin, ShoppingCart, Package, ChevronRight, ChevronLeft,
  Flame, ArrowLeftRight, CreditCard, GraduationCap, Building2, Shield,
  Clock, Heart, Smartphone, Laptop, Headphones, Gamepad2, Camera, Watch,
  Tv, Home as HomeIcon, Wifi, Printer, Plug, Monitor, Tag, Sparkles,
  Truck, Store, Phone, MessageCircle, FileText, HelpCircle, CheckCircle,
  Zap, Star, Box, Search
} from "lucide-react";
import { categories, type CategoryInfo } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  "phones-tablets": <Smartphone className="w-5 h-5" />,
  "laptops": <Laptop className="w-5 h-5" />,
  "audio": <Headphones className="w-5 h-5" />,
  "gaming": <Gamepad2 className="w-5 h-5" />,
  "cameras": <Camera className="w-5 h-5" />,
  "wearables": <Watch className="w-5 h-5" />,
  "tvs": <Tv className="w-5 h-5" />,
  "smart-home": <HomeIcon className="w-5 h-5" />,
  "networking": <Wifi className="w-5 h-5" />,
  "office": <Printer className="w-5 h-5" />,
  "accessories": <Plug className="w-5 h-5" />,
  "monitors": <Monitor className="w-5 h-5" />,
  "pcs": <Box className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "phones-tablets": "bg-primary/10 text-primary",
  "laptops": "bg-blue-500/10 text-blue-600",
  "audio": "bg-purple-500/10 text-purple-600",
  "gaming": "bg-red-500/10 text-red-600",
  "cameras": "bg-amber-500/10 text-amber-600",
  "wearables": "bg-teal-500/10 text-teal-600",
  "tvs": "bg-indigo-500/10 text-indigo-600",
  "smart-home": "bg-green-500/10 text-green-600",
  "networking": "bg-cyan-500/10 text-cyan-600",
  "office": "bg-gray-500/10 text-gray-600",
  "accessories": "bg-orange-500/10 text-orange-600",
  "monitors": "bg-violet-500/10 text-violet-600",
  "pcs": "bg-slate-500/10 text-slate-600",
};

const quickActions = [
  { icon: <Flame className="w-5 h-5" />, label: "Deals", path: "/category/all", color: "text-deal", bg: "bg-deal/10" },
  { icon: <ArrowLeftRight className="w-5 h-5" />, label: "Trade-in", path: "/trade-in", color: "text-primary", bg: "bg-primary/10" },
  { icon: <CreditCard className="w-5 h-5" />, label: "Installment", path: "/installment-plans", color: "text-primary", bg: "bg-primary/10" },
  { icon: <GraduationCap className="w-5 h-5" />, label: "Students", path: "/student-program", color: "text-primary", bg: "bg-primary/10" },
  { icon: <Building2 className="w-5 h-5" />, label: "B2B", path: "/b2b", color: "text-primary", bg: "bg-primary/10" },
  { icon: <Shield className="w-5 h-5" />, label: "Warranty", path: "/warranty", color: "text-success", bg: "bg-success/10" },
  { icon: <Clock className="w-5 h-5" />, label: "Recent", path: "/", color: "text-muted-foreground", bg: "bg-secondary" },
  { icon: <Heart className="w-5 h-5" />, label: "Wishlist", path: "/wishlist", color: "text-deal", bg: "bg-deal/10" },
];

const featuredShortcuts = [
  { label: "iPhone", path: "/category/phones-tablets", icon: "🍎" },
  { label: "Samsung", path: "/category/phones-tablets", icon: "📱" },
  { label: "Laptop Deals", path: "/category/laptops", icon: "💻" },
  { label: "Gaming Setup", path: "/category/gaming", icon: "🎮" },
  { label: "Build a PC", path: "/category/pcs", icon: "🖥️" },
  { label: "Smart Home", path: "/category/smart-home", icon: "🏠" },
  { label: "Office Essentials", path: "/category/accessories", icon: "⌨️" },
  { label: "Flash Sale", path: "/category/all", icon: "⚡" },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const menuVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
  exit: { x: "-100%", transition: { duration: 0.25, ease: "easeInOut" as const } },
};

const drillVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1, transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.2 } },
};

const staggerContainer = {
  center: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
};

const staggerItem = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0 },
};

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const { totalItems } = useCart();
  const [drillCategory, setDrillCategory] = useState<CategoryInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClose = () => {
    setDrillCategory(null);
    setSearchQuery("");
    onClose();
  };

  const handleLink = () => {
    setDrillCategory(null);
    setSearchQuery("");
    onClose();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const filteredCategories = searchQuery
    ? categories.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : categories;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 top-0 bottom-0 w-[88vw] max-w-[380px] bg-background flex flex-col overflow-hidden"
            style={{ boxShadow: "var(--shadow-elevated)" }}
          >
            {/* ─── TOP HEADER ─── */}
            <div className="shrink-0 gradient-hero p-4 pb-5 relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-primary-foreground" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-primary-foreground/15 flex items-center justify-center ring-2 ring-primary-foreground/10">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">Welcome back!</p>
                  <Link
                    href="/account"
                    onClick={handleLink}
                    className="text-xs text-primary-foreground/80 hover:text-primary-foreground underline"
                  >
                    Sign in or Register →
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/store-locator" onClick={handleLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground text-xs font-medium transition-colors">
                  <MapPin className="w-3.5 h-3.5" /> Austin, TX
                </Link>
                <Link href="/cart" onClick={handleLink}
                  className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground text-xs font-medium transition-colors">
                  <ShoppingCart className="w-3.5 h-3.5" /> Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-deal text-deal-foreground text-[10px] font-bold flex items-center justify-center">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </Link>
                <Link href="/account" onClick={handleLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground text-xs font-medium transition-colors">
                  <Package className="w-3.5 h-3.5" /> Orders
                </Link>
              </div>
            </div>

            {/* ─── SEARCH BAR ─── */}
            <div className="shrink-0 px-4 py-3 border-b border-border bg-card">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search categories, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            {/* ─── SCROLLABLE BODY ─── */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              <AnimatePresence mode="wait">
                {drillCategory ? (
                  <motion.div
                    key="drill"
                    variants={drillVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="min-h-full"
                  >
                    <button
                      onClick={() => setDrillCategory(null)}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm font-semibold text-primary bg-secondary/50 border-b border-border active:bg-secondary transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back to Categories
                    </button>

                    <motion.div className="p-4" variants={staggerContainer} initial="enter" animate="center">
                      <div className="flex items-center gap-3 mb-1">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${categoryColors[drillCategory.slug] || "bg-primary/10 text-primary"}`}>
                          {categoryIcons[drillCategory.slug] || <Tag className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{drillCategory.name}</h3>
                          <p className="text-xs text-muted-foreground">{drillCategory.count} products</p>
                        </div>
                      </div>
                      <Link
                        href={`/category/${drillCategory.slug}`}
                        onClick={handleLink}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-2 mb-5 hover:underline"
                      >
                        View All {drillCategory.name} <ChevronRight className="w-3 h-3" />
                      </Link>

                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">Subcategories</p>
                      <div className="grid grid-cols-2 gap-2 mb-5">
                        {drillCategory.subcategories.map((sub) => (
                          <motion.div key={sub} variants={staggerItem}>
                            <Link
                              href={`/category/${drillCategory.slug}`}
                              onClick={handleLink}
                              className="block px-3 py-3 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all active:scale-[0.98]"
                            >
                              {sub}
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">Top Brands</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {drillCategory.brands.map((brand) => (
                          <motion.div key={brand} variants={staggerItem}>
                            <Link
                              href={`/category/${drillCategory.slug}`}
                              onClick={handleLink}
                              className="px-3.5 py-2 rounded-xl border border-border text-xs font-semibold text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all active:scale-[0.97]"
                            >
                              {brand}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  >
                    {/* QUICK ACTIONS */}
                    {!searchQuery && (
                      <div className="p-4 pb-2">
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</p>
                        <div className="grid grid-cols-4 gap-2">
                          {quickActions.map((action) => (
                            <Link
                              key={action.label}
                              href={action.path}
                              onClick={handleLink}
                              className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-secondary/80 transition-colors active:scale-[0.96]"
                            >
                              <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center`}>
                                <div className={action.color}>{action.icon}</div>
                              </div>
                              <span className="text-[10px] font-semibold text-foreground text-center leading-tight">{action.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CATEGORIES */}
                    <div className="px-4 pt-3 pb-2">
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        {searchQuery ? `Results for "${searchQuery}"` : "Shop by Category"}
                      </p>
                    </div>
                    <div className="px-2">
                      {filteredCategories.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-6">No categories found</p>
                      )}
                      {filteredCategories.map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() => { setDrillCategory(cat); setSearchQuery(""); }}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-secondary transition-colors active:bg-secondary/80"
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${categoryColors[cat.slug] || "bg-primary/10 text-primary"}`}>
                            {categoryIcons[cat.slug] || <Tag className="w-4.5 h-4.5" />}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                            <p className="text-[11px] text-muted-foreground">{cat.count} products</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </button>
                      ))}
                    </div>

                    {/* FEATURED SHORTCUTS */}
                    {!searchQuery && (
                      <>
                        <div className="p-4 pt-3">
                          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Popular Shortcuts</p>
                          <div className="flex flex-wrap gap-2">
                            {featuredShortcuts.map((s) => (
                              <Link
                                key={s.label}
                                href={s.path}
                                onClick={handleLink}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-card border border-border text-xs font-semibold text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all active:scale-[0.97]"
                              >
                                <span>{s.icon}</span> {s.label}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* PROMO BANNER */}
                        <div className="px-4 pb-3">
                          <Link
                            href="/category/all"
                            onClick={handleLink}
                            className="block rounded-2xl gradient-deal p-4 relative overflow-hidden active:opacity-90 transition-opacity"
                          >
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 60%)' }} />
                            <div className="relative z-10">
                              <div className="flex items-center gap-1.5 mb-1">
                                <Zap className="w-4 h-4 text-deal-foreground" />
                                <span className="text-[11px] font-bold text-deal-foreground uppercase tracking-wider">Flash Deals</span>
                              </div>
                              <p className="text-sm font-bold text-deal-foreground">Up to 40% off electronics</p>
                              <p className="text-xs text-deal-foreground/80 mt-0.5">Limited time only — shop now →</p>
                            </div>
                          </Link>
                        </div>

                        {/* SUPPORT & SERVICES */}
                        <div className="px-4 pt-2 pb-2">
                          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Support & Trust</p>
                        </div>
                        <div className="px-2 pb-2">
                          {[
                            { icon: <CheckCircle className="w-4 h-4 text-success" />, label: "100% Genuine Products", sub: "Official warranty", bg: "bg-success/8" },
                            { icon: <Truck className="w-4 h-4 text-primary" />, label: "Fast Delivery", sub: "Free over $99", path: "/shipping", bg: "bg-primary/8" },
                            { icon: <Shield className="w-4 h-4 text-primary" />, label: "Warranty Center", sub: "Check & claim", path: "/warranty", bg: "bg-primary/8" },
                            { icon: <Store className="w-4 h-4 text-primary" />, label: "Store Pickup", sub: "Collect in-store", path: "/store-locator", bg: "bg-primary/8" },
                            { icon: <HelpCircle className="w-4 h-4 text-primary" />, label: "Help Center", sub: "FAQs & support", path: "/support", bg: "bg-primary/8" },
                          ].map((item) => {
                            const content = (
                              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors active:bg-secondary/80">
                                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>{item.icon}</div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                                  <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                                </div>
                              </div>
                            );
                            return item.path ? (
                              <Link key={item.label} href={item.path} onClick={handleLink}>{content}</Link>
                            ) : (
                              <div key={item.label}>{content}</div>
                            );
                          })}
                        </div>

                        {/* BUSINESS & UTILITY */}
                        <div className="px-4 pt-2 pb-2">
                          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Business & More</p>
                        </div>
                        <div className="px-2 pb-4">
                          {[
                            { icon: <Building2 className="w-4 h-4" />, label: "B2B / Business Orders", path: "/b2b" },
                            { icon: <FileText className="w-4 h-4" />, label: "Request a Quote", path: "/b2b" },
                            { icon: <Package className="w-4 h-4" />, label: "Track My Order", path: "/account" },
                            { icon: <Store className="w-4 h-4" />, label: "Store Locator", path: "/store-locator" },
                            { icon: <Phone className="w-4 h-4" />, label: "Contact Us", path: "/support" },
                            { icon: <MessageCircle className="w-4 h-4" />, label: "Live Chat Support", path: "/support" },
                            { icon: <Star className="w-4 h-4" />, label: "Affiliate Program", path: "/affiliate" },
                          ].map((item) => (
                            <Link
                              key={item.label}
                              href={item.path}
                              onClick={handleLink}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary text-sm text-foreground transition-colors active:bg-secondary/80"
                            >
                              <span className="text-muted-foreground">{item.icon}</span>
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          ))}
                        </div>

                        {/* POLICIES */}
                        <div className="px-4 py-3 border-t border-border flex flex-wrap gap-x-4 gap-y-1">
                          {[
                            { label: "Privacy", path: "/privacy" },
                            { label: "Terms", path: "/terms" },
                            { label: "Cookies", path: "/cookies" },
                            { label: "Return Policy", path: "/return-policy" },
                          ].map((p) => (
                            <Link key={p.label} href={p.path} onClick={handleLink} className="text-xs text-muted-foreground hover:text-primary py-1">
                              {p.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>

            {/* ─── STICKY BOTTOM ─── */}
            <div className="shrink-0 border-t border-border bg-card p-3 flex gap-2">
              <Link
                href="/category/all"
                onClick={handleLink}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-deal text-deal-foreground text-sm font-bold transition-colors active:opacity-90"
              >
                <Flame className="w-4 h-4" /> Shop Deals
              </Link>
              <Link
                href="/account"
                onClick={handleLink}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary text-foreground text-sm font-semibold transition-colors active:bg-secondary/80"
              >
                <Package className="w-4 h-4" /> Track Order
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
