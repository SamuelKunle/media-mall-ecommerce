"use client";

import { Package, Truck, Clock, RotateCcw, Search, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const orderIdSchema = z.string().trim().min(5, "Enter a valid order ID").max(30);

const faqs = [
  { q: "How long does delivery take?", a: "Standard delivery usually takes 2–5 business days. Express options may be available in select metro areas—see checkout for eligibility." },
  { q: "Can I modify my order after placing it?", a: "You can modify your order within 1 hour of placing it. After that, contact our support team for assistance." },
  { q: "How do I cancel an order?", a: "Go to your Account → Orders, select the order, and click 'Cancel'. If the order has shipped, you'll need to initiate a return instead." },
  { q: "What happens if my delivery is delayed?", a: "If your order exceeds the estimated delivery window, contact us and we'll investigate. You may be eligible for a shipping refund." },
  { q: "Do you deliver to all states?", a: "Yes, we deliver to all 36 states and the FCT. Remote areas may take an additional 2–3 days." },
];

const OrdersDelivery = () => {
  const [trackingId, setTrackingId] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const result = orderIdSchema.safeParse(trackingId);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    toast.info("Order tracking is not connected to a backend yet. This is a demo.");
  };

  return (
    <PageTransition>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-card border-b border-border py-10 md:py-14">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Orders & Delivery</h1>
            </div>
            <p className="text-sm text-muted-foreground mb-8">Track your order, check delivery status, or manage recent purchases.</p>

            {/* Tracker */}
            <form onSubmit={handleTrack} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter order or tracking ID"
                  maxLength={30}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Track
              </button>
            </form>
          </div>
        </section>

        {/* Quick Info */}
        <section className="container max-w-3xl py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Truck, title: "Free Delivery", desc: "On qualifying orders over $99" },
              { icon: Clock, title: "Express Available", desc: "Same-day in select metros" },
              { icon: RotateCcw, title: "Easy Returns", desc: "7-day return window" },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-5 text-center">
                <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <h3 className="text-sm font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <h2 className="section-title mb-6">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full text-left bg-card border border-border rounded-xl p-4 transition-colors hover:border-primary/20"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-foreground">{faq.q}</span>
                  <ArrowRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${expandedFaq === i ? "rotate-90" : ""}`} />
                </div>
                {expandedFaq === i && (
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{faq.a}</p>
                )}
              </button>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-3">Still need help?</p>
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

export default OrdersDelivery;
