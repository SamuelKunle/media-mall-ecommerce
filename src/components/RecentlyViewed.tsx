import ProductCard from "@/components/ProductCard";
import { sampleProducts } from "@/data/products";
import { ChevronRight, Clock } from "lucide-react";
import Link from "next/link";

interface RecentlyViewedProps {
  recentIds: number[];
}

const RecentlyViewed = ({ recentIds }: RecentlyViewedProps) => {
  if (recentIds.length === 0) return null;

  const recentProducts = recentIds
    .map((id) => sampleProducts.find((p) => p.id === id))
    .filter(Boolean) as typeof sampleProducts;

  if (recentProducts.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title flex items-center gap-2">
          <div className="w-1 h-6 rounded-full bg-muted-foreground" />
          <Clock className="w-5 h-5 text-muted-foreground" />
          Recently Viewed
        </h2>
        <Link href="/" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {recentProducts.slice(0, 5).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
