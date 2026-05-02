"use client";

import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const stores = [
  { name: "MediaMall Ikeja City Mall", address: "Alausa, Ikeja, Lagos", phone: "0812 345 6789", hours: "9am – 9pm", area: "Ikeja" },
  { name: "MediaMall Victoria Island", address: "Adeola Odeku St, VI, Lagos", phone: "0812 345 6790", hours: "10am – 8pm", area: "Victoria Island" },
  { name: "MediaMall Lekki", address: "Admiralty Way, Lekki Phase 1, Lagos", phone: "0812 345 6791", hours: "9am – 9pm", area: "Lekki" },
  { name: "MediaMall Abuja", address: "Jabi Lake Mall, Jabi, Abuja", phone: "0812 345 6792", hours: "10am – 8pm", area: "Abuja" },
  { name: "MediaMall Port Harcourt", address: "Aba Rd, Port Harcourt, Rivers", phone: "0812 345 6793", hours: "9am – 8pm", area: "Port Harcourt" },
  { name: "MediaMall Ibadan", address: "Ring Road, Ibadan, Oyo", phone: "0812 345 6794", hours: "9am – 7pm", area: "Ibadan" },
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
