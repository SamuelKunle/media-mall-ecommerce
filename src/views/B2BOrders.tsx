"use client";

import { Building2, FileText, Users, PhoneCall } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const benefits = [
  { icon: FileText, title: "VAT Invoicing", description: "Get proper tax invoices for all business purchases" },
  { icon: Users, title: "Dedicated Account Manager", description: "Personal support for your business needs" },
  { icon: Building2, title: "Volume Discounts", description: "Special pricing on bulk orders of 10+ units" },
  { icon: PhoneCall, title: "Priority Support", description: "Fast-track support for business-critical orders" },
];

const B2BOrders = () => {
  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-8 pb-24 md:pb-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">B2B Orders</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Business purchasing solutions for companies of all sizes</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {benefits.map((b) => (
            <div key={b.title} className="bg-card rounded-xl border border-border p-5">
              <b.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-sm font-bold text-foreground mb-1">{b.title}</h3>
              <p className="text-xs text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Request a B2B Account</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input placeholder="Company Name" className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input placeholder="Contact Person" className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="email" placeholder="Business Email" className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="tel" placeholder="Phone Number" className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <textarea placeholder="Tell us about your business needs..." rows={3} className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Submit Request
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default B2BOrders;
