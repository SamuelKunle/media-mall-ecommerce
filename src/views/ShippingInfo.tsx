"use client";

import { Truck, Clock, MapPin, Package, Shield, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const deliveryOptions = [
  {
    icon: Truck,
    title: "Standard Delivery",
    time: "2–5 business days",
    price: "₦2,500",
    note: "Free on orders over ₦50,000",
    areas: "Nationwide (all 36 states + FCT)",
  },
  {
    icon: Clock,
    title: "Express Delivery",
    time: "Within 24 hours",
    price: "₦5,500",
    note: "Order before 2pm for same-day dispatch",
    areas: "Lagos, Abuja, Port Harcourt",
  },
  {
    icon: MapPin,
    title: "Store Pickup",
    time: "Same day (if in stock)",
    price: "Free",
    note: "Collect from any of our 30+ stores",
    areas: "All MediaMall locations",
  },
];

const shippingZones = [
  { zone: "Lagos", standard: "2–3 days", express: "Same day / Next day" },
  { zone: "Abuja / PH", standard: "3–4 days", express: "Next day" },
  { zone: "South-West", standard: "3–5 days", express: "—" },
  { zone: "South-East / South-South", standard: "4–6 days", express: "—" },
  { zone: "North-Central", standard: "5–7 days", express: "—" },
  { zone: "North-East / North-West", standard: "6–10 days", express: "—" },
];

const policies = [
  "Orders are processed within 24 hours (excluding weekends and public holidays)",
  "You'll receive a tracking number via SMS and email once your order ships",
  "Someone must be available to receive the delivery at the provided address",
  "Delivery personnel will verify your identity before handover for high-value items",
  "If you're not available, we'll attempt redelivery the next business day",
  "Damaged packaging? Refuse delivery and contact us immediately",
];

const ShippingInfo = () => {
  return (
    <PageTransition>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-card border-b border-border py-10 md:py-14">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Shipping Information</h1>
            </div>
            <p className="text-sm text-muted-foreground">Everything you need to know about delivery options, timelines, and shipping policies.</p>
          </div>
        </section>

        <section className="container max-w-3xl py-10">
          {/* Delivery Options */}
          <h2 className="section-title mb-6">Delivery Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {deliveryOptions.map((opt) => (
              <div key={opt.title} className="bg-card border border-border rounded-xl p-5">
                <opt.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="text-sm font-bold text-foreground mb-1">{opt.title}</h3>
                <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                  <p className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {opt.time}</p>
                  <p className="flex items-center gap-1.5"><Package className="w-3 h-3" /> {opt.price}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {opt.areas}</p>
                </div>
                <p className="text-xs font-medium text-primary">{opt.note}</p>
              </div>
            ))}
          </div>

          {/* Shipping Zones */}
          <h2 className="section-title mb-6">Estimated Delivery Times by Region</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden mb-12">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Region</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Standard</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Express</th>
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((z, i) => (
                  <tr key={z.zone} className={i % 2 === 0 ? "" : "bg-secondary/30"}>
                    <td className="px-4 py-3 font-medium text-foreground">{z.zone}</td>
                    <td className="px-4 py-3 text-muted-foreground">{z.standard}</td>
                    <td className="px-4 py-3 text-muted-foreground">{z.express}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Policies */}
          <h2 className="section-title mb-6">Shipping Policies</h2>
          <div className="bg-card border border-border rounded-xl p-6 mb-10">
            <ul className="space-y-3">
              {policies.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Insurance */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1">Shipping Insurance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All orders over ₦100,000 are automatically insured against damage or loss during transit at no extra cost. For orders below this threshold, you can add shipping insurance for ₦1,500 at checkout.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">Have a question about your delivery?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/support/orders" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Track Your Order <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/support" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </PageTransition>
  );
};

export default ShippingInfo;
