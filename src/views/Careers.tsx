"use client";

import { Briefcase, MapPin, Clock, ArrowRight, Search, Building2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const perks = [
  "Competitive salary & performance bonuses",
  "Health insurance for you and your family",
  "Staff discounts on all products",
  "Learning & development budget",
  "Flexible work arrangements",
  "Career growth opportunities",
];

const openings = [
  { title: "Senior Frontend Developer", dept: "Engineering", location: "Lagos (Hybrid)", type: "Full-time", slug: "senior-frontend-developer" },
  { title: "Product Manager", dept: "Product", location: "Lagos", type: "Full-time", slug: "product-manager" },
  { title: "Store Manager", dept: "Retail", location: "Abuja", type: "Full-time", slug: "store-manager" },
  { title: "Customer Experience Lead", dept: "Support", location: "Remote", type: "Full-time", slug: "customer-experience-lead" },
  { title: "Digital Marketing Specialist", dept: "Marketing", location: "Lagos (Hybrid)", type: "Full-time", slug: "digital-marketing-specialist" },
  { title: "Supply Chain Analyst", dept: "Operations", location: "Lagos", type: "Full-time", slug: "supply-chain-analyst" },
  { title: "Retail Sales Associate", dept: "Retail", location: "Multiple Locations", type: "Full-time", slug: "retail-sales-associate" },
  { title: "UI/UX Designer", dept: "Design", location: "Remote", type: "Contract", slug: "ui-ux-designer" },
];

const departments = ["All", "Engineering", "Product", "Retail", "Support", "Marketing", "Operations", "Design"];

const Careers = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = openings.filter(
    (j) =>
      (filter === "All" || j.dept === filter) &&
      j.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <section className="gradient-hero text-primary-foreground py-16 md:py-24">
          <div className="container text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" /> Careers
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-balance">Build the Future of Tech Retail</h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">Join a fast-growing team that's reshaping how Nigerians buy electronics. We're passionate, ambitious, and always shipping.</p>
          </div>
        </section>

        {/* Perks */}
        <section className="container py-12 max-w-3xl">
          <h2 className="section-title text-center mb-8">Why Work at MediaMall?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className="text-sm text-foreground">{p}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Openings */}
        <section className="bg-secondary/50 py-12">
          <div className="container max-w-3xl">
            <h2 className="section-title text-center mb-8">Open Positions</h2>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search roles..."
                maxLength={100}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
              {departments.map((d) => (
                <button
                  key={d}
                  onClick={() => setFilter(d)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                    filter === d ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-primary/10"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground">No positions found. Try a different filter.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((job) => (
                  <div key={job.title} className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{job.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {job.dept}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                      </div>
                    </div>
                    <Link href={`/careers/${job.slug}`} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity shrink-0">
                      Apply Now
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="container py-12 text-center max-w-xl">
          <p className="text-sm text-muted-foreground mb-3">Don't see your role? Send us your CV anyway.</p>
          <Link href="/support" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
            Contact Us <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </PageTransition>
  );
};

export default Careers;
