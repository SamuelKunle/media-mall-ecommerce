import { ArrowRight, Building2, GraduationCap, RefreshCw, Wrench } from "lucide-react";
import Link from "next/link";

const PromoSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <Link href="/category/laptops" className="product-card p-5 flex flex-col gap-3 group cursor-pointer gradient-hero text-primary-foreground">
        <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold">Student Offers</h3>
          <p className="text-xs opacity-80 mt-0.5">Exclusive discounts with student ID</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold mt-auto">
          Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>

      <Link href="/b2b" className="product-card p-5 flex flex-col gap-3 group cursor-pointer bg-card">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">Business / B2B</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Bulk orders, VAT invoicing, dedicated support</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-primary mt-auto">
          Get Quote <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>

      <Link href="/trade-in" className="product-card p-5 flex flex-col gap-3 group cursor-pointer bg-card">
        <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
          <RefreshCw className="w-5 h-5 text-success" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">Trade-in & Upgrade</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Get value for your old device</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-success mt-auto">
          Estimate Value <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>

      <Link href="/warranty" className="product-card p-5 flex flex-col gap-3 group cursor-pointer bg-card">
        <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
          <Wrench className="w-5 h-5 text-warning" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">Warranty Center</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Check warranty, request repair</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-warning mt-auto">
          Check Status <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </div>
  );
};

export default PromoSection;
