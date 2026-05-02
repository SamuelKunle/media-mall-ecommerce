"use client";

import { RefreshCw, Smartphone, Laptop, Headphones, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const tradeCategories = [
  { icon: Smartphone, label: "Smartphones", examples: "iPhone, Samsung Galaxy, Pixel", value: "Up to $350" },
  { icon: Laptop, label: "Laptops", examples: "MacBook, ThinkPad, XPS", value: "Up to $500" },
  { icon: Headphones, label: "Audio & Wearables", examples: "AirPods, Galaxy Watch", value: "Up to $120" },
];

const steps = [
  { step: "1", title: "Select your device", desc: "Tell us the brand, model, and condition" },
  { step: "2", title: "Get an instant quote", desc: "We'll give you a fair trade-in value" },
  { step: "3", title: "Ship or drop off", desc: "Send it to us or visit a store" },
  { step: "4", title: "Get paid", desc: "Credit applied to your next purchase" },
];

const TradeIn = () => {
  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-8 pb-24 md:pb-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <RefreshCw className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Trade-In Program</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Trade in your old devices and save on your next purchase</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {steps.map((s) => (
            <div key={s.step} className="bg-card rounded-xl border border-border p-4 text-center">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mx-auto mb-2">{s.step}</div>
              <p className="text-xs font-semibold text-foreground mb-1">{s.title}</p>
              <p className="text-[11px] text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-bold text-foreground mb-4">Eligible Devices</h2>
        <div className="space-y-3 mb-8">
          {tradeCategories.map((cat) => (
            <div key={cat.label} className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
              <cat.icon className="w-8 h-8 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{cat.examples}</p>
              </div>
              <span className="text-sm font-semibold text-success whitespace-nowrap">{cat.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 text-center">
          <p className="text-lg font-bold text-foreground mb-2">Ready to trade in?</p>
          <p className="text-sm text-muted-foreground mb-4">Get an instant quote for your device</p>
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            Start Trade-In <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default TradeIn;
