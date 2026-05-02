import Link from "next/link";
import { getBrandLogo } from "@/data/brandLogos";

const brands = [
  "Apple", "Samsung", "Sony", "ASUS", "Dell", "Lenovo",
  "LG", "Xiaomi", "Bose", "JBL", "HP", "Acer",
  "Canon", "Logitech", "Nintendo",
];

const BrandLogo = ({ brand, size = "w-7 h-7" }: { brand: string; size?: string }) => {
  const logo = getBrandLogo(brand);
  if (logo) {
    return (
      <img
        src={logo}
        alt={brand}
        className={`${size} object-contain`}
        loading="lazy"
      />
    );
  }
  return (
    <span className="text-xs font-extrabold text-foreground tracking-tight">
      {brand}
    </span>
  );
};

const BrandShowcase = () => {
  return (
    <section>
      <h2 className="section-title mb-4">Featured Brands</h2>
      <div className="flex flex-wrap gap-2">
        {brands.map((brand) => (
          <Link
            key={brand}
            href={`/brand/${encodeURIComponent(brand)}`}
            className="flex items-center justify-center px-5 py-3 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <BrandLogo brand={brand} size="h-6 w-auto max-w-[100px]" />
          </Link>
        ))}
      </div>
    </section>
  );
};
export { BrandLogo };
export default BrandShowcase;
