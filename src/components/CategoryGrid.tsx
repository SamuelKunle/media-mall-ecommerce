import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Smartphone, Monitor, Headphones, Gamepad2, Camera, Watch, Wifi, Zap } from "lucide-react";

const categoriesData = [
  { name: "Phones & Tablets", slug: "phones-tablets", icon: Smartphone, count: "1,240+", color: "bg-primary/10 text-primary" },
  { name: "Laptops & MacBooks", slug: "laptops", icon: Monitor, count: "860+", color: "bg-primary/10 text-primary" },
  { name: "Audio & Headphones", slug: "audio", icon: Headphones, count: "520+", color: "bg-primary/10 text-primary" },
  { name: "Gaming", slug: "gaming", icon: Gamepad2, count: "430+", color: "bg-primary/10 text-primary" },
  { name: "Cameras", slug: "cameras", icon: Camera, count: "310+", color: "bg-primary/10 text-primary" },
  { name: "Wearables", slug: "wearables", icon: Watch, count: "280+", color: "bg-primary/10 text-primary" },
  { name: "Networking", slug: "networking", icon: Wifi, count: "190+", color: "bg-primary/10 text-primary" },
  { name: "Accessories", slug: "accessories", icon: Zap, count: "2,100+", color: "bg-primary/10 text-primary" },
];

const CategoryGrid = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Shop by Category</h2>
        <Link href="/category/all" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categoriesData.map((cat) => (
          <Link
            key={cat.name}
            href={`/category/${cat.slug}`}
            className="product-card p-4 flex flex-col items-center gap-2.5 text-center group cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <cat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground leading-tight">{cat.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{cat.count} products</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
