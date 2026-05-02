"use client";

import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const stores = [
  { name: "MediaMall Austin — Domain Northside", address: "11410 Domain Dr, Austin, TX 78758", phone: "(512) 555-0100", hours: "9am – 9pm", area: "Austin" },
  { name: "MediaMall Seattle — University Village", address: "2623 NE University Village St, Seattle, WA 98105", phone: "(206) 555-0112", hours: "10am – 8pm", area: "Seattle" },
  { name: "MediaMall Denver — Cherry Creek", address: "3000 E 1st Ave, Denver, CO 80206", phone: "(303) 555-0144", hours: "9am – 9pm", area: "Denver" },
  { name: "MediaMall Dallas — NorthPark Center", address: "8687 North Central Expy, Dallas, TX 75225", phone: "(214) 555-0188", hours: "10am – 8pm", area: "Dallas" },
  { name: "MediaMall Phoenix — Scottsdale Fashion Square", address: "7014 E Camelback Rd, Scottsdale, AZ 85251", phone: "(480) 555-0199", hours: "9am – 8pm", area: "Scottsdale" },
  { name: "MediaMall Atlanta — Buckhead", address: "3393 Peachtree Rd NE, Atlanta, GA 30326", phone: "(404) 555-0166", hours: "9am – 7pm", area: "Atlanta" },
];

const StoreLocator = () => {
  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-8 pb-24 md:pb-8">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Store Locator</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Find a MediaMall store near you</p>

        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <input
            type="text"
            placeholder="Search by city or area..."
            className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <div key={store.name} className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors">
              <h3 className="text-sm font-bold text-foreground mb-3">{store.name}</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {store.address}</p>
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0" /> {store.phone}</p>
                <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 shrink-0" /> {store.hours}</p>
              </div>
              <button className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors">
                <Navigation className="w-3.5 h-3.5" /> Get Directions
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

export default StoreLocator;
