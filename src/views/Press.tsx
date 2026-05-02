"use client";

import { Newspaper, Calendar, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const pressReleases = [
  { date: "Feb 2026", title: "MediaMall Surpasses 500,000 Customers Milestone", summary: "The retailer marks half a million customers served across its growing store and online network." },
  { date: "Jan 2026", title: "MediaMall Launches Same-Day Delivery in Major Metro Areas", summary: "Express delivery now reaches more customers with eligible orders fulfilled within hours in select cities." },
  { date: "Nov 2025", title: "Partnership with Samsung: Official Authorized Reseller", summary: "MediaMall strengthens its Samsung assortment with expanded authorized retail coverage." },
  { date: "Sep 2025", title: "MediaMall Opens 30th Retail Location", summary: "Continued expansion brings premium electronics retail to more neighborhoods nationwide." },
  { date: "Jul 2025", title: "Student Program Reaches 50,000 Enrollments", summary: "MediaMall's student discount program continues strong adoption at colleges and universities." },
  { date: "Apr 2025", title: "B2B Division Records Strong Enterprise Sales Growth", summary: "Corporate and institutional clients drive momentum in MediaMall's business segment." },
];

const mediaFeatures = [
  { outlet: "Tech Retail Weekly", title: "How MediaMall Blends Stores and E‑commerce", date: "Jan 2026" },
  { outlet: "Commerce Today", title: "MediaMall CEO on the Future of Electronics Retail", date: "Dec 2025" },
  { outlet: "Startup Chronicle", title: "Retail Tech Brands to Watch in 2026", date: "Nov 2025" },
  { outlet: "Customer Loyalty Journal", title: "MediaMall's Student Program: A Loyalty Case Study", date: "Sep 2025" },
];

const Press = () => (
  <PageTransition>
    <SiteHeader />
    <main className="min-h-screen bg-background">
      <section className="bg-card border-b border-border py-10 md:py-14">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Press & Media</h1>
          </div>
          <p className="text-sm text-muted-foreground">Latest news, press releases, and media coverage about MediaMall.</p>
        </div>
      </section>

      <section className="container max-w-3xl py-10">
        <h2 className="section-title mb-6">Press Releases</h2>
        <div className="space-y-3 mb-14">
          {pressReleases.map((pr) => (
            <div key={pr.title} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Calendar className="w-3 h-3" /> {pr.date}
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">{pr.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{pr.summary}</p>
            </div>
          ))}
        </div>

        <h2 className="section-title mb-6">In the Media</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-14">
          {mediaFeatures.map((m) => (
            <div key={m.title} className="bg-card border border-border rounded-xl p-5">
              <span className="inline-block px-2 py-0.5 rounded-md bg-secondary text-xs font-semibold text-foreground mb-2">{m.outlet}</span>
              <h3 className="text-sm font-bold text-foreground mb-1">{m.title}</h3>
              <p className="text-xs text-muted-foreground">{m.date}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <h3 className="text-sm font-bold text-foreground mb-2">Media Inquiries</h3>
          <p className="text-xs text-muted-foreground mb-4">For press inquiries, interviews, or media kit requests, contact our communications team.</p>
          <p className="text-sm font-semibold text-primary">press@mediamall.com</p>
        </div>
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav />
  </PageTransition>
);

export default Press;
