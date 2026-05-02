"use client";

import { BarChart3, TrendingUp, DollarSign, Users, Globe, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const highlights = [
  { icon: TrendingUp, value: "45%", label: "YoY Revenue Growth" },
  { icon: Users, value: "500K+", label: "Active Customers" },
  { icon: Globe, value: "30+", label: "Retail Locations" },
  { icon: DollarSign, value: "$120M+", label: "Annual GMV" },
];

const reasons = [
  "Fast-growing omnichannel electronics retail brand",
  "Strong unit economics with improving margins quarter over quarter",
  "Diversified revenue: retail, B2B, services (warranty, trade-in)",
  "Asset-light e-commerce model supplemented by strategic physical stores",
  "Exclusive partnerships with Apple, Samsung, Sony, and 50+ brands",
  "Proven management team with deep retail and tech expertise",
];

const timeline = [
  { round: "Seed", year: "2018", amount: "$2M", desc: "Initial store launch and team build" },
  { round: "Series A", year: "2020", amount: "$15M", desc: "E-commerce platform and multi-city expansion" },
  { round: "Series B", year: "2023", amount: "$45M", desc: "Nationwide scale, B2B launch, brand partnerships" },
  { round: "Series C", year: "2025", amount: "Ongoing", desc: "Pan-African expansion and fintech integration" },
];

const Investors = () => (
  <PageTransition>
    <SiteHeader />
    <main className="min-h-screen bg-background">
      <section className="gradient-hero text-primary-foreground py-16 md:py-24">
        <div className="container text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sm font-medium mb-6">
            <BarChart3 className="w-4 h-4" /> Investors
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-balance">Invest in Africa's Electronics Future</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            MediaMall is reshaping electronics retail with a hybrid online-offline model built for scale.
          </p>
        </div>
      </section>

      <section className="container py-12 max-w-3xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {highlights.map((h) => (
            <div key={h.label} className="bg-card border border-border rounded-xl p-6 text-center">
              <h.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-black text-primary mb-1">{h.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{h.label}</p>
            </div>
          ))}
        </div>

        <h2 className="section-title text-center mb-8">Why Invest in MediaMall?</h2>
        <div className="bg-card border border-border rounded-xl p-6 mb-16">
          <ul className="space-y-3">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm text-foreground">
                <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <h2 className="section-title text-center mb-8">Funding History</h2>
        <div className="max-w-2xl mx-auto mb-16">
          {timeline.map((t, i) => (
            <div key={t.round} className="flex gap-4 mb-6 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex flex-col items-center justify-center shrink-0 leading-tight">
                  <span>{t.round}</span>
                </div>
                {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-foreground">{t.amount}</span>
                  <span className="text-xs text-muted-foreground">({t.year})</span>
                </div>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border py-12 text-center">
        <div className="container max-w-xl">
          <h2 className="section-title mb-3">Interested in Investing?</h2>
          <p className="text-sm text-muted-foreground mb-4">We're currently raising our Series C. Reach out to our investor relations team for our pitch deck and financials.</p>
          <p className="text-sm font-semibold text-primary mb-6">investors@mediamall.com</p>
          <Link href="/support" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
            Contact Us <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav />
  </PageTransition>
);

export default Investors;
