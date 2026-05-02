"use client";

import { BookOpen, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const categories = ["All", "Buying Guides", "Tips & Tricks", "Industry News", "Reviews", "How-To"];

const posts = [
  { title: "Best Laptops for Students in 2026: Our Top Picks", category: "Buying Guides", date: "Feb 28, 2026", readTime: "6 min", excerpt: "Whether you're studying engineering or liberal arts, here are the best laptops that balance performance, portability, and price." },
  { title: "How to Transfer Data from Your Old Phone to a New One", category: "How-To", date: "Feb 20, 2026", readTime: "4 min", excerpt: "Switching phones? Follow our step-by-step guide to move contacts, photos, apps, and WhatsApp chats seamlessly." },
  { title: "5 Tips to Extend Your Laptop Battery Life", category: "Tips & Tricks", date: "Feb 15, 2026", readTime: "3 min", excerpt: "Simple habits that can dramatically improve how long your laptop lasts between charges." },
  { title: "Samsung Galaxy S26 vs iPhone 17: Which Should You Buy?", category: "Reviews", date: "Feb 10, 2026", readTime: "8 min", excerpt: "We compare the two flagship titans across design, camera, performance, and value." },
  { title: "Global Smartphone Sales Trends in 2025", category: "Industry News", date: "Jan 30, 2026", readTime: "5 min", excerpt: "New data shows continued growth in smartphone adoption driven by affordable 5G devices and expanding mobile broadband." },
  { title: "How to Choose the Right TV Size for Your Room", category: "Buying Guides", date: "Jan 22, 2026", readTime: "4 min", excerpt: "Our simple formula helps you pick the perfect TV size based on your viewing distance and room layout." },
  { title: "Setting Up Your Smart Home: A Beginner's Guide", category: "How-To", date: "Jan 15, 2026", readTime: "7 min", excerpt: "From smart bulbs to security cameras, here's how to start building your connected home without breaking the bank." },
  { title: "Why You Should Consider Extended Warranty", category: "Tips & Tricks", date: "Jan 8, 2026", readTime: "3 min", excerpt: "Is extended warranty worth it? We break down the numbers and scenarios where it pays for itself." },
];

const Blog = () => {
  const [filter, setFilter] = useState("All");

  const filtered = posts.filter((p) => filter === "All" || p.category === filter);

  return (
    <PageTransition>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <section className="bg-card border-b border-border py-10 md:py-14">
          <div className="container max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">MediaMall Blog</h1>
            </div>
            <p className="text-sm text-muted-foreground">Buying guides, tech tips, reviews, and industry news from the MediaMall team.</p>
          </div>
        </section>

        <section className="container max-w-4xl py-10">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  filter === c ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-primary/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((post) => (
              <article key={post.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold">
                    <Tag className="w-2.5 h-2.5" /> {post.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <span className="text-primary font-semibold flex items-center gap-1">Read <ArrowRight className="w-3 h-3" /></span>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground">No posts in this category yet.</p>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </PageTransition>
  );
};

export default Blog;
