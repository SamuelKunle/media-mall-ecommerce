"use client";

import { ShieldCheck, Search, Clock, CheckCircle2 } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const plans = [
  { title: "Standard Warranty", duration: "1 Year", price: "Included", features: ["Manufacturing defects", "Hardware failures", "Free repairs"] },
  { title: "MediaMall Care+", duration: "2 Years", price: "From ₦15,000", features: ["Everything in Standard", "Accidental damage", "Battery replacement", "Priority service"] },
  { title: "Business Shield", duration: "3 Years", price: "From ₦25,000", features: ["Everything in Care+", "On-site support", "Loaner device", "Data recovery"] },
];

const Warranty = () => {
  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-8 pb-24 md:pb-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Warranty & Protection</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Protect your purchases with our warranty plans</p>

        <div className="bg-card rounded-xl border border-border p-5 mb-8">
          <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Check Warranty Status</h2>
          <div className="flex gap-2">
            <input placeholder="Enter order number or serial number..." className="flex-1 px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">Check</button>
          </div>
        </div>

        <h2 className="text-lg font-bold text-foreground mb-4">Protection Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <div key={plan.title} className={`rounded-xl border p-5 ${i === 1 ? 'bg-primary/5 border-primary' : 'bg-card border-border'}`}>
              <p className="text-sm font-bold text-foreground">{plan.title}</p>
              <div className="flex items-baseline gap-1 mt-1 mb-3">
                <span className="text-lg font-bold text-primary">{plan.price}</span>
                <span className="text-xs text-muted-foreground">/ {plan.duration}</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-4 w-full py-2 rounded-lg text-xs font-semibold transition-colors ${i === 1 ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-border text-foreground hover:bg-secondary'}`}>
                {i === 0 ? 'Included' : 'Add to Purchase'}
              </button>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default Warranty;
