"use client";

import { RotateCcw, Clock, CheckCircle, XCircle, AlertTriangle, ArrowRight, Package } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const returnSteps = [
  { step: "1", title: "Initiate Return", desc: "Go to Account → My Orders, select the item and click 'Request Return'" },
  { step: "2", title: "Pack the Item", desc: "Place the item in its original packaging with all accessories and documentation" },
  { step: "3", title: "Ship or Drop Off", desc: "Use our free pickup service or drop it off at any MediaMall store" },
  { step: "4", title: "Get Your Refund", desc: "Refund processed within 3–7 business days after we receive and inspect the item" },
];

const returnable = [
  "Phones, tablets & laptops (unopened or with defect)",
  "TVs & monitors (within 7 days, original packaging required)",
  "Gaming consoles & accessories",
  "Audio equipment (sealed / defective)",
  "Computer peripherals & components",
  "Smart home devices",
];

const nonReturnable = [
  "In-ear earphones & earbuds (hygiene reasons)",
  "Opened software, games & digital content",
  "Customized or engraved products",
  "Items with physical or water damage caused by the buyer",
  "Products purchased more than 7 days ago (unless defective)",
  "Consumables (batteries, ink cartridges, etc.)",
];

const faqs = [
  { q: "How long do I have to return an item?", a: "You have 7 calendar days from delivery to initiate a return for most products. Defective items can be returned within the warranty period." },
  { q: "Who pays for return shipping?", a: "If the return is due to a defect or our error, we cover all shipping costs. For change-of-mind returns, a ₦2,000 pickup fee applies, or you can drop off for free at any store." },
  { q: "Can I exchange instead of getting a refund?", a: "Yes! You can exchange for the same product in a different variant (color, size, storage) or a different product. If the new item costs more, you pay the difference." },
  { q: "What if my item arrived damaged?", a: "Contact us within 24 hours with photos of the damage. We'll arrange a free pickup and send a replacement or issue a full refund — your choice." },
  { q: "Is there a restocking fee?", a: "Opened electronics are subject to a 10% restocking fee for change-of-mind returns. This does not apply to defective items or items returned sealed." },
];

const ReturnPolicy = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <PageTransition>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-card border-b border-border py-10 md:py-14">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <RotateCcw className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Return Policy</h1>
            </div>
            <p className="text-sm text-muted-foreground">Easy, hassle-free returns. Here's everything you need to know.</p>
          </div>
        </section>

        <section className="container max-w-3xl py-10">
          {/* Key Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Clock, title: "7-Day Window", desc: "Return within 7 days of delivery" },
              { icon: Package, title: "Free Pickup", desc: "For defective items or our errors" },
              { icon: RotateCcw, title: "Refund or Exchange", desc: "Your choice — full flexibility" },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-5 text-center">
                <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <h3 className="text-sm font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* How to Return */}
          <h2 className="section-title mb-6">How to Return an Item</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {returnSteps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full gradient-hero text-primary-foreground text-sm font-black flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Returnable vs Non-Returnable */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" /> Returnable Items
              </h3>
              <ul className="space-y-2.5">
                {returnable.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" /> Non-Returnable Items
              </h3>
              <ul className="space-y-2.5">
                {nonReturnable.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <XCircle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-warning/10 border border-warning/20 rounded-xl p-5 mb-12 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-foreground mb-1">Important</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All returned items must include original packaging, accessories, manuals, and proof of purchase. Items that fail inspection due to missing components or customer-caused damage may be rejected or subject to a reduced refund.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <h2 className="section-title mb-6">Return FAQs</h2>
          <div className="space-y-2 mb-10">
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

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">Need to start a return?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/account" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Go to My Orders <ArrowRight className="w-3.5 h-3.5" />
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

export default ReturnPolicy;
