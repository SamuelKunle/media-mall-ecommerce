"use client";

import { GraduationCap, Laptop, Headphones, Monitor, Percent, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";
import PageTransition from "@/components/PageTransition";

const benefits = [
  { icon: Percent, title: "Up to 15% Off", desc: "Exclusive student discounts on laptops, tablets & accessories" },
  { icon: Laptop, title: "Free Setup", desc: "We'll configure your device with essential apps before pickup" },
  { icon: Headphones, title: "Free Accessories", desc: "Get a free starter kit (sleeve, mouse or earbuds) with select laptops" },
  { icon: Monitor, title: "Extended Warranty", desc: "Extra 6 months warranty on all student program purchases" },
];

const picks = [
  { name: "MacBook Air M3", price: "₦1,150,000", img: "💻", slug: "laptops" },
  { name: "iPad 10th Gen", price: "₦385,000", img: "📱", slug: "phones-tablets" },
  { name: "Galaxy Tab S9 FE", price: "₦320,000", img: "📱", slug: "phones-tablets" },
  { name: "Lenovo IdeaPad Slim 3", price: "₦485,000", img: "💻", slug: "laptops" },
  { name: "AirPods Pro 2", price: "₦185,000", img: "🎧", slug: "audio" },
  { name: "Logitech MX Keys Mini", price: "₦68,000", img: "⌨️", slug: "accessories" },
];

const steps = [
  { step: "1", title: "Verify Your Status", desc: "Upload a valid student ID or admission letter" },
  { step: "2", title: "Browse & Shop", desc: "Student prices apply automatically at checkout" },
  { step: "3", title: "Pick Up or Deliver", desc: "Collect in-store or get free delivery to your campus" },
];

const StudentProgram = () => {
  return (
    <PageTransition>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="gradient-hero text-primary-foreground py-16 md:py-24">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" /> Student Program
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-balance">
              Tech for Students,<br />Priced for Students
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-8">
              Exclusive discounts, free accessories & extended warranty — just verify your student status and start saving.
            </p>
            <a href="#how-it-works" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm hover:opacity-90 transition-opacity">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Benefits */}
        <section className="container py-12 md:py-16">
          <h2 className="section-title text-center mb-10">Why Join the Student Program?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top Picks */}
        <section className="bg-secondary/50 py-12 md:py-16">
          <div className="container">
            <h2 className="section-title text-center mb-10">Top Student Picks</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {picks.map((p) => (
                <Link
                  key={p.name}
                  href={`/category/${p.slug}`}
                  className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <span className="text-3xl block mb-3">{p.img}</span>
                  <h3 className="text-xs font-semibold text-foreground mb-1 line-clamp-1">{p.name}</h3>
                  <p className="text-sm font-bold text-primary">{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="container py-12 md:py-16">
          <h2 className="section-title text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full gradient-hero text-primary-foreground text-sm font-black flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <section className="bg-card border-y border-border py-12 md:py-16">
          <div className="container max-w-2xl text-center">
            <h2 className="section-title mb-6">Who's Eligible?</h2>
            <ul className="space-y-3 text-left inline-block">
              {[
                "Full-time or part-time university / polytechnic students",
                "NYSC corps members with valid ID",
                "Postgraduate & PhD students",
                "Students of accredited online programs with proof of enrollment",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="container py-12 md:py-16 text-center">
          <h2 className="section-title mb-3">Ready to Save?</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Visit any MediaMall store with your student ID or apply online in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/store-locator"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Find a Store Near You
            </Link>
            <Link
              href="/support"
              className="px-6 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </PageTransition>
  );
};

export default StudentProgram;
