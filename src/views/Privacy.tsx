"use client";

import { Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const sections = [
  { title: "1. Information We Collect", content: "We collect information you provide directly (name, email, phone, delivery address, payment details) when you create an account, place an order, or contact support. We also automatically collect device information, IP address, browser type, pages visited, and interaction data through cookies and similar technologies." },
  { title: "2. How We Use Your Information", content: "We use your information to process and deliver orders, manage your account, provide customer support, send order updates and delivery notifications, personalize your shopping experience, improve our products and services, prevent fraud and unauthorized transactions, and comply with legal obligations." },
  { title: "3. Information Sharing", content: "We do not sell your personal data. We share information only with: payment processors to complete transactions, logistics partners to deliver your orders, authorized service partners for warranty and repair services, and law enforcement when required by Nigerian law. All partners are bound by strict data protection agreements." },
  { title: "4. Data Security", content: "We implement industry-standard security measures including 256-bit SSL encryption for all data transmission, PCI-compliant payment processing through certified partners, secure data storage with access controls and monitoring, and regular security audits and vulnerability assessments." },
  { title: "5. Your Rights", content: "Under the Nigeria Data Protection Regulation (NDPR), you have the right to access your personal data, request correction of inaccurate data, request deletion of your data, withdraw consent for marketing communications, and lodge a complaint with the National Information Technology Development Agency (NITDA)." },
  { title: "6. Data Retention", content: "We retain your personal data for as long as your account is active or as needed to provide services. Order records are kept for 7 years for tax and legal compliance. You may request deletion of your account and associated data at any time by contacting support." },
  { title: "7. Children's Privacy", content: "Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we learn that we have collected data from a child, we will delete it promptly." },
  { title: "8. Changes to This Policy", content: "We may update this privacy policy from time to time. We will notify you of significant changes via email or a prominent notice on our website. Continued use of our services after changes constitutes acceptance of the updated policy." },
  { title: "9. Contact Us", content: "For privacy-related questions or to exercise your rights, contact our Data Protection Officer at privacy@mediamall.ng or call 0800 MEDIAMALL." },
];

const Privacy = () => (
  <PageTransition>
    <SiteHeader />
    <main className="min-h-screen bg-background">
      <section className="bg-card border-b border-border py-10 md:py-14">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Privacy Policy</h1>
          </div>
          <p className="text-sm text-muted-foreground">Last updated: March 1, 2026</p>
        </div>
      </section>

      <section className="container max-w-3xl py-10">
        <p className="text-sm text-muted-foreground leading-relaxed mb-10">
          MediaMall Nigeria ("we", "us", "our") is committed to protecting your privacy. This policy explains how we collect, use, store, and protect your personal information in compliance with the Nigeria Data Protection Regulation (NDPR).
        </p>

        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-bold text-foreground mb-2">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
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

export default Privacy;
