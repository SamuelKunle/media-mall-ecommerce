"use client";

import { Building2, Users, ShieldCheck, MapPin, Target, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const stats = [
  { value: "30+", label: "Stores Nationwide" },
  { value: "500K+", label: "Happy Customers" },
  { value: "50+", label: "Brand Partners" },
  { value: "8+", label: "Years in Business" },
];

const values = [
  { icon: ShieldCheck, title: "Authenticity", desc: "Every product is 100% genuine with official manufacturer warranty. No grey market, no fakes — ever." },
  { icon: Heart, title: "Customer First", desc: "From pre-purchase advice to after-sales support, we're obsessed with delivering an exceptional experience." },
  { icon: Target, title: "Best Prices", desc: "We negotiate directly with manufacturers to bring you competitive pricing without compromising on quality." },
  { icon: Users, title: "Community", desc: "We're building a community of tech enthusiasts who trust MediaMall as their go-to electronics destination." },
];

const milestones = [
  { year: "2018", event: "MediaMall opens its first flagship store in Austin, Texas" },
  { year: "2019", event: "Launched e-commerce platform, expanded to 5 locations" },
  { year: "2020", event: "Became authorized reseller for Apple, Samsung & Sony" },
  { year: "2021", event: "Reached 100K customers, opened Denver and Seattle stores" },
  { year: "2022", event: "Launched B2B division and Student Program" },
  { year: "2023", event: "Expanded to 20+ stores, introduced Trade-in & Warranty services" },
  { year: "2024", event: "500K+ customers served, 30+ stores nationwide" },
  { year: "2025", event: "Launched installment payments and same-day delivery in major metros" },
];

const About = () => (
  <PageTransition>
    <SiteHeader />
    <main className="min-h-screen bg-background">
      <section className="gradient-hero text-primary-foreground py-16 md:py-24">
        <div className="container text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" /> About Us
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-balance">
            Your Trusted Electronics Destination
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            We started with a simple mission: make genuine, quality electronics accessible at fair prices with world-class service.
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-6 text-center">
              <p className="text-2xl md:text-3xl font-black text-primary mb-1">{s.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <h2 className="section-title text-center mb-10">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {values.map((v) => (
            <div key={v.title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <v.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="section-title text-center mb-10">Our Journey</h2>
        <div className="max-w-2xl mx-auto">
          {milestones.map((m, i) => (
            <div key={m.year} className="flex gap-4 mb-6 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{m.year}</div>
                {i < milestones.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
              </div>
              <p className="text-sm text-foreground pt-2.5">{m.event}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border py-12 text-center">
        <div className="container max-w-xl">
          <h2 className="section-title mb-3">Want to Join Our Team?</h2>
          <p className="text-sm text-muted-foreground mb-6">We're always looking for passionate people to help shape the future of electronics retail in Africa.</p>
          <Link href="/careers" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity">
            View Open Positions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav />
  </PageTransition>
);

export default About;
