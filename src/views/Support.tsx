"use client";

import { HelpCircle, MessageSquare, Phone, Mail, FileQuestion, Package, CreditCard, ShieldCheck } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const topics = [
  { icon: Package, label: "Orders & Delivery", description: "Track, modify, or cancel orders", href: "/support/orders" },
  { icon: CreditCard, label: "Payments & Refunds", description: "Payment issues and refund status", href: "/support/payments" },
  { icon: ShieldCheck, label: "Warranty Claims", description: "File or check a warranty claim", href: "/warranty" },
  { icon: FileQuestion, label: "Product Help", description: "Setup guides and troubleshooting", href: "/support/product-help" },
];

const contactMethods = [
  { icon: MessageSquare, label: "Live Chat", detail: "Available 8am – 10pm", action: "Start Chat" },
  { icon: Phone, label: "Call Us", detail: "1-800-MEDIA-123", action: "Call Now" },
  { icon: Mail, label: "Email", detail: "support@mediamall.com", action: "Send Email" },
];

const Support = () => {
  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-8 pb-24 md:pb-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">How can we help you today?</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {topics.map((t) => (
            <Link
              key={t.label}
              href={t.href || "#"}
              className="bg-card rounded-xl border border-border p-5 flex items-start gap-4 hover:border-primary/30 transition-colors"
            >
              <t.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-foreground">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-lg font-bold text-foreground mb-4">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactMethods.map((m) => (
            <div key={m.label} className="bg-card rounded-xl border border-border p-5 text-center">
              <m.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm font-bold text-foreground">{m.label}</p>
              <p className="text-xs text-muted-foreground mb-3">{m.detail}</p>
              <button className="px-4 py-2 rounded-lg border border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors">
                {m.action}
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

export default Support;
