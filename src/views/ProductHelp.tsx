"use client";

import { FileQuestion, Laptop, Smartphone, Headphones, Monitor, Gamepad2, Watch, ArrowRight, BookOpen, Video, MessageSquare } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const categories = [
  { icon: Smartphone, label: "Phones & Tablets", guides: ["Initial setup", "Data transfer", "Battery optimization", "Screen protector installation"] },
  { icon: Laptop, label: "Laptops", guides: ["First-time setup", "OS installation", "Driver updates", "Performance tuning"] },
  { icon: Headphones, label: "Audio", guides: ["Bluetooth pairing", "EQ settings", "Firmware update", "Multi-device connection"] },
  { icon: Monitor, label: "TVs & Monitors", guides: ["Wall mounting tips", "Picture calibration", "Smart TV setup", "Connect streaming apps"] },
  { icon: Gamepad2, label: "Gaming", guides: ["Console setup", "Controller pairing", "Network optimization", "Storage expansion"] },
  { icon: Watch, label: "Wearables", guides: ["Pairing with phone", "Watch face setup", "Health tracking", "Battery tips"] },
];

const troubleshooting = [
  { q: "My device won't turn on", a: "Try a hard reset: hold the power button for 15–20 seconds. If it still doesn't work, try a different charger. If the issue persists, visit a MediaMall store for diagnosis." },
  { q: "Device is running slow", a: "Close background apps, clear cache, and check for software updates. If the issue persists, consider a factory reset after backing up your data." },
  { q: "Can't connect to Wi-Fi", a: "Restart your device and router. Forget the network and reconnect. Ensure you're entering the correct password. Try moving closer to the router." },
  { q: "Bluetooth not pairing", a: "Make sure both devices are in pairing mode. Remove old pairings and try again. Update firmware on both devices if available." },
  { q: "Screen display issues", a: "Check brightness and display settings. Try restarting the device. If you notice dead pixels or physical damage, bring it in for warranty assessment." },
];

const ProductHelp = () => {
  const [expandedTrouble, setExpandedTrouble] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <PageTransition>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-card border-b border-border py-10 md:py-14">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <FileQuestion className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Product Help</h1>
            </div>
            <p className="text-sm text-muted-foreground">Setup guides, troubleshooting tips, and how-to resources for all your devices.</p>
          </div>
        </section>

        <section className="container max-w-3xl py-10">
          {/* Resources */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: BookOpen, title: "User Manuals", desc: "Download official manuals" },
              { icon: Video, title: "Video Guides", desc: "Watch step-by-step tutorials" },
              { icon: MessageSquare, title: "Community", desc: "Ask other MediaMall users" },
            ].map((r) => (
              <div key={r.title} className="bg-card border border-border rounded-xl p-5 text-center">
                <r.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <h3 className="text-sm font-bold text-foreground mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Setup Guides by Category */}
          <h2 className="section-title mb-6">Setup Guides</h2>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(i)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-primary/10"
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-12">
            {categories[selectedCategory].guides.map((guide) => (
              <div key={guide} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-foreground">{guide}</span>
              </div>
            ))}
          </div>

          {/* Troubleshooting */}
          <h2 className="section-title mb-6">Common Troubleshooting</h2>
          <div className="space-y-2">
            {troubleshooting.map((item, i) => (
              <button
                key={i}
                onClick={() => setExpandedTrouble(expandedTrouble === i ? null : i)}
                className="w-full text-left bg-card border border-border rounded-xl p-4 transition-colors hover:border-primary/20"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-foreground">{item.q}</span>
                  <ArrowRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${expandedTrouble === i ? "rotate-90" : ""}`} />
                </div>
                {expandedTrouble === i && (
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{item.a}</p>
                )}
              </button>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-3">Can't find what you need?</p>
            <Link href="/support" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
              Contact Support <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </PageTransition>
  );
};

export default ProductHelp;
