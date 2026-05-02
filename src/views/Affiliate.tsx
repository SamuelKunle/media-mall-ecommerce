"use client";

import { Handshake, TrendingUp, DollarSign, BarChart3, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const benefits = [
  { icon: DollarSign, title: "Competitive Commissions", desc: "Earn up to 8% commission on every sale you refer. Higher-value products mean bigger payouts." },
  { icon: BarChart3, title: "Real-Time Dashboard", desc: "Track clicks, conversions, and earnings with our affiliate dashboard — updated in real time." },
  { icon: TrendingUp, title: "30-Day Cookie", desc: "Your referral cookie lasts 30 days. If a customer buys within that window, you earn the commission." },
  { icon: Handshake, title: "Dedicated Support", desc: "Every affiliate gets a dedicated account manager to help maximize your earnings." },
];

const tiers = [
  { tier: "Starter", sales: "0–20 sales/month", commission: "5%", perks: "Access to banners & links" },
  { tier: "Growth", sales: "21–100 sales/month", commission: "6%", perks: "Priority support + early access deals" },
  { tier: "Pro", sales: "101–500 sales/month", commission: "7%", perks: "Custom landing pages + bonus campaigns" },
  { tier: "Elite", sales: "500+ sales/month", commission: "8%", perks: "Dedicated manager + exclusive rates" },
];

const steps = [
  { step: "1", title: "Apply Online", desc: "Fill out our simple application form — approval takes 24–48 hours" },
  { step: "2", title: "Get Your Links", desc: "Access your unique referral links, banners, and promotional materials" },
  { step: "3", title: "Share & Earn", desc: "Promote on your blog, YouTube, social media, or email list" },
  { step: "4", title: "Get Paid", desc: "Receive monthly payouts via bank transfer once you hit ₦10,000 minimum" },
];

const Affiliate = () => (
  <PageTransition>
    <SiteHeader />
    <main className="min-h-screen bg-background">
      <section className="gradient-hero text-primary-foreground py-16 md:py-24">
        <div className="container text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sm font-medium mb-6">
            <Handshake className="w-4 h-4" /> Affiliate Program
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-balance">Earn by Sharing Tech You Love</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
            Join the MediaMall Affiliate Program and earn commissions on every sale you refer. Perfect for bloggers, YouTubers, and tech influencers.
          </p>
          <a href="#how-it-works" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm hover:opacity-90 transition-opacity">
            Start Earning <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="container py-12 max-w-3xl">
        <h2 className="section-title text-center mb-10">Why Join?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-12">
        <div className="container max-w-3xl">
          <h2 className="section-title text-center mb-8">Commission Tiers</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Tier</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Sales/Month</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Commission</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Perks</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t, i) => (
                  <tr key={t.tier} className={i % 2 === 0 ? "" : "bg-secondary/30"}>
                    <td className="px-4 py-3 font-bold text-foreground">{t.tier}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.sales}</td>
                    <td className="px-4 py-3 font-bold text-primary">{t.commission}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{t.perks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="container py-12 max-w-3xl">
        <h2 className="section-title text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-10 h-10 rounded-full gradient-hero text-primary-foreground text-sm font-black flex items-center justify-center mx-auto mb-4">{s.step}</div>
              <h3 className="text-sm font-bold text-foreground mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border py-12 text-center">
        <div className="container max-w-xl">
          <h2 className="section-title mb-3">Ready to Get Started?</h2>
          <p className="text-sm text-muted-foreground mb-6">Applications are reviewed within 24–48 hours. No minimum audience required.</p>
          <Link href="/support" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity">
            Apply Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav />
  </PageTransition>
);

export default Affiliate;
