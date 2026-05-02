import { Heart, BarChart2, ShoppingCart, Star, Eye } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerItem } from "@/components/StaggerGrid";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, isPurchasable } from "@/lib/commerce";

export interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  specs?: string[];
  badges?: string[];
  inStock?: boolean;
  installment?: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "compact" | "list" | "featured" | "horizontal";
}

const getBadgeClass = (badge: string) => {
  switch (badge.toLowerCase()) {
    case "flash sale": return "badge-flash";
    case "new": return "badge-new";
    case "best seller": return "badge-bestseller";
    case "official": return "badge-official";
    default: return "badge-deal";
  }
};

const ProductCard = ({ product, variant = "grid" }: ProductCardProps) => {
  const { addItem } = useCart();
  const purchasable = isPurchasable(product);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  if (variant === "compact") {
    return (
      <Link href={`/product/${product.id}`} className="product-card p-3 flex flex-col gap-2">
        <div className="relative aspect-square rounded-lg bg-secondary overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" loading="lazy" />
          {discount > 0 && (
            <span className="absolute top-1.5 left-1.5 badge-deal text-[10px] px-1.5">-{discount}%</span>
          )}
        </div>
        <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">{product.name}</p>
        <div>
          <p className="price-current text-sm">{formatPrice(product.price)}</p>
          {product.oldPrice && <p className="price-old text-xs">{formatPrice(product.oldPrice)}</p>}
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/product/${product.id}`} className="product-card p-3 flex gap-3 group">
        <div className="relative w-24 h-24 shrink-0 rounded-lg bg-secondary overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" loading="lazy" />
          {discount > 0 && (
            <span className="absolute top-1 left-1 badge-deal text-[9px] px-1">-{discount}%</span>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center gap-1 min-w-0">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">{product.brand}</p>
          <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">{product.name}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-warning text-warning" />
            <span className="text-[10px] text-muted-foreground">{product.rating} ({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="price-current text-sm">{formatPrice(product.price)}</p>
            {product.oldPrice && <p className="price-old text-xs">{formatPrice(product.oldPrice)}</p>}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <Link href={`/product/${product.id}`} className="product-card p-4 flex gap-4 group">
        <div className="relative w-36 h-36 md:w-44 md:h-44 shrink-0 rounded-lg bg-secondary overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" loading="lazy" />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {product.badges?.map((badge) => (
              <span key={badge} className={getBadgeClass(badge)}>{badge}</span>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">{product.brand}</p>
          <p className="text-sm font-semibold text-foreground line-clamp-2">{product.name}</p>
          {product.specs && (
            <p className="text-xs text-muted-foreground">{product.specs.join(" · ")}</p>
          )}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.round(product.rating) ? "fill-warning text-warning" : "text-border"}`} />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="price-current">{formatPrice(product.price)}</p>
            {product.oldPrice && <p className="price-old">{formatPrice(product.oldPrice)}</p>}
            {discount > 0 && <span className="badge-deal text-[10px]">-{discount}%</span>}
          </div>
          {product.installment && (
            <p className="text-[11px] text-success font-medium">{product.installment}</p>
          )}
          <div className="flex items-center gap-2 mt-auto pt-2">
            <button
              type="button"
              disabled={!purchasable}
              onClick={(e) => {
                e.preventDefault();
                if (purchasable) addItem(product);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-opacity flex items-center gap-1.5 ${
                purchasable
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" /> {purchasable ? "Add to Cart" : "Out of stock"}
            </button>
            <button type="button" aria-label={`Save ${product.name} to wishlist`} onClick={(e) => e.preventDefault()} className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors">
              <Heart className="w-3.5 h-3.5 text-foreground" aria-hidden />
            </button>
            <button type="button" aria-label={`Compare ${product.name}`} onClick={(e) => e.preventDefault()} className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors">
              <BarChart2 className="w-3.5 h-3.5 text-foreground" aria-hidden />
            </button>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <div className="product-card p-0 flex flex-col md:flex-row">
        <div className="relative md:w-1/2 aspect-square md:aspect-auto bg-secondary overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-6" loading="lazy" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {product.badges?.map((badge) => (
              <span key={badge} className={getBadgeClass(badge)}>{badge}</span>
            ))}
          </div>
        </div>
        <div className="flex-1 p-5 flex flex-col justify-center gap-3">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">{product.brand}</p>
          <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? "fill-warning text-warning" : "text-border"}`} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          {product.specs && (
            <ul className="text-xs text-muted-foreground space-y-1">
              {product.specs.map((s) => <li key={s}>• {s}</li>)}
            </ul>
          )}
          <div className="flex items-baseline gap-2">
            <p className="price-current text-xl">{formatPrice(product.price)}</p>
            {product.oldPrice && <p className="price-old">{formatPrice(product.oldPrice)}</p>}
            {discount > 0 && <span className="badge-deal">-{discount}%</span>}
          </div>
          {product.installment && (
            <p className="text-xs text-success font-medium">{product.installment}</p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <Link href={`/product/${product.id}`} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity text-center">
              View Product
            </Link>
            <button type="button" aria-label={`Save ${product.name} to wishlist`} className="p-2.5 rounded-xl border border-border hover:bg-secondary transition-colors">
              <Heart className="w-4 h-4 text-foreground" aria-hidden />
            </button>
            <button type="button" aria-label={`Compare ${product.name}`} className="p-2.5 rounded-xl border border-border hover:bg-secondary transition-colors">
              <BarChart2 className="w-4 h-4 text-foreground" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default grid
  return (
    <motion.div variants={staggerItem}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Link href={`/product/${product.id}`} className="product-card p-3 flex flex-col gap-2.5 group">
          <div className="relative aspect-square rounded-lg bg-secondary overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {product.badges?.map((badge) => (
                <span key={badge} className={getBadgeClass(badge)}>{badge}</span>
              ))}
            </div>
            {!purchasable && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-[1px] z-[1]">
                <span className="text-xs font-bold text-destructive px-2 py-1 rounded-md bg-card border border-border">Out of stock</span>
              </div>
            )}
            <div className="absolute top-2 right-2 flex flex-col gap-1 max-sm:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                aria-label={`Save ${product.name} to wishlist`}
                onClick={(e) => { e.preventDefault(); }}
                className="p-1.5 rounded-lg bg-card/90 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Heart className="w-3.5 h-3.5" aria-hidden />
              </button>
              <button
                type="button"
                aria-label={`Quick view ${product.name}`}
                onClick={(e) => { e.preventDefault(); }}
                className="p-1.5 rounded-lg bg-card/90 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Eye className="w-3.5 h-3.5" aria-hidden />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">{product.brand}</p>
            <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">{product.name}</p>
            {product.specs && (
              <p className="text-[11px] text-muted-foreground line-clamp-1">{product.specs.join(" · ")}</p>
            )}
            <div className="flex items-center gap-1 mt-auto">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.round(product.rating) ? "fill-warning text-warning" : "text-border"}`} />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <p className="price-current">{formatPrice(product.price)}</p>
              {product.oldPrice && <p className="price-old">{formatPrice(product.oldPrice)}</p>}
            </div>
            {discount > 0 && (
              <span className="text-[11px] font-semibold text-deal">Save {discount}%</span>
            )}
            {product.installment && (
              <p className="text-[11px] text-success font-medium">{product.installment}</p>
            )}
          </div>
          <button
            type="button"
            disabled={!purchasable}
            onClick={(e) => {
              e.preventDefault();
              if (purchasable) addItem(product);
            }}
            className={`w-full py-2.5 sm:py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-opacity min-h-[44px] sm:min-h-0 ${
              purchasable
                ? "bg-primary text-primary-foreground max-sm:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-100"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" /> {purchasable ? "Add to Cart" : "Out of stock"}
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export { formatPrice } from "@/lib/commerce";
export default ProductCard;
