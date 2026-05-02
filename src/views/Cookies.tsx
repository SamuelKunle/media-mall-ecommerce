"use client";

import { Cookie, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const cookieTypes = [
  { name: "Essential Cookies", required: true, desc: "Required for the website to function properly. These enable core features like page navigation, secure login, and shopping cart functionality. They cannot be disabled.", examples: "Session ID, authentication tokens, cart contents, CSRF protection" },
  { name: "Analytics Cookies", required: false, desc: "Help us understand how visitors interact with our website by collecting anonymous usage data. This information helps us improve our platform and user experience.", examples: "Page views, bounce rate, traffic sources, popular products, session duration" },
  { name: "Marketing Cookies", required: false, desc: "Used to deliver relevant advertisements and measure campaign effectiveness. These may be set by our advertising partners and track your browsing activity across sites.", examples: "Ad targeting, retargeting pixels, conversion tracking, social media sharing" },
  { name: "Preference Cookies", required: false, desc: "Remember your settings and choices to provide a personalized experience. These store things like your preferred language, region, and display preferences.", examples: "Theme preference (light/dark), language, recently viewed products, currency" },
];

const sections = [
  { title: "What Are Cookies?", content: "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the site. MediaMall uses cookies and similar technologies (like local storage and pixels) to provide, protect, and improve our services." },
  { title: "How Long Do Cookies Last?", content: "Session cookies are temporary and deleted when you close your browser. Persistent cookies remain on your device for a set period (typically 30 days to 2 years) or until you delete them. Essential cookies generally last for your session, while preference cookies may persist longer to remember your settings." },
  { title: "Third-Party Cookies", content: "Some cookies are placed by third-party services that appear on our pages. These include analytics providers (e.g., Google Analytics), payment processors, and advertising networks. We do not control these third-party cookies — please refer to their respective privacy policies for more information." },
  { title: "Managing Cookies", content: "You can control and delete cookies through your browser settings. Most browsers allow you to block or delete cookies, though this may affect website functionality. Essential cookies cannot be disabled as they are necessary for the site to work. You can also use our cookie preferences to manage non-essential cookies." },
  { title: "Updates to This Policy", content: "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will post the updated policy on this page with a revised 'last updated' date." },
];

const Cookies = () => (
  <PageTransition>
    <SiteHeader />
    <main className="min-h-screen bg-background">
      <section className="bg-card border-b border-border py-10 md:py-14">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <Cookie className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Cookie Policy</h1>
          </div>
          <p className="text-sm text-muted-foreground">Last updated: March 1, 2026</p>
        </div>
      </section>

      <section className="container max-w-3xl py-10">
        <p className="text-sm text-muted-foreground leading-relaxed mb-10">
          This Cookie Policy explains how MediaMall uses cookies and similar tracking technologies when you visit our website or use our services.
        </p>

        {/* Cookie Types */}
        <h2 className="text-lg font-bold text-foreground mb-6">Types of Cookies We Use</h2>
        <div className="space-y-4 mb-12">
          {cookieTypes.map((c) => (
            <div key={c.name} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-foreground">{c.name}</h3>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${c.required ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  {c.required ? "Required" : "Optional"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">{c.desc}</p>
              <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Examples:</span> {c.examples}</p>
            </div>
          ))}
        </div>

        {/* Info Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-bold text-foreground mb-2">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center mb-10">
          <h3 className="text-sm font-bold text-foreground mb-2">Questions About Cookies?</h3>
          <p className="text-xs text-muted-foreground mb-4">If you have any questions about our use of cookies, contact our Data Protection Officer.</p>
          <p className="text-sm font-semibold text-primary">privacy@mediamall.com</p>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/privacy" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Privacy Policy <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/terms" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav />
  </PageTransition>
);

export default Cookies;
