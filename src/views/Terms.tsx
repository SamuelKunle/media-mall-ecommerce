"use client";

import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const sections = [
  { title: "1. Acceptance of Terms", content: "By accessing or using the MediaMall website, mobile application, or any of our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services. We reserve the right to modify these terms at any time, with changes effective upon posting." },
  { title: "2. Account Registration", content: "To place orders, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. You must be at least 18 years old to create an account. Notify us immediately if you suspect unauthorized access." },
  { title: "3. Products & Pricing", content: "All products listed are subject to availability. Prices are displayed in U.S. dollars (USD) unless otherwise noted and may exclude tax until checkout where applicable. We reserve the right to modify prices without prior notice. In the event of a pricing error, we will notify you and offer the option to proceed at the correct price or cancel your order for a full refund." },
  { title: "4. Orders & Payment", content: "Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order. Payment must be made in full at the time of purchase unless an installment plan is selected. We accept bank transfers, debit/credit cards, and other methods shown at checkout. All transactions are processed through PCI-compliant payment providers." },
  { title: "5. Shipping & Delivery", content: "Delivery timelines are estimates and not guarantees. Risk of loss transfers to you upon delivery. You or an authorized representative must be present to receive delivery. For high-value items, identification verification may be required. See our Shipping Information page for detailed delivery options and timelines." },
  { title: "6. Returns & Refunds", content: "Most items may be returned within 7 calendar days of delivery in original condition and packaging. Certain items (in-ear earphones, opened software, customized products) are non-returnable. Refunds are processed within 3–7 business days after approval. A 10% restocking fee may apply to opened electronics for change-of-mind returns. See our Return Policy for full details." },
  { title: "7. Warranty", content: "Products sold by MediaMall carry the manufacturer's warranty. MediaMall Extended Warranty is available for additional coverage. Warranty does not cover damage from misuse, accidents, unauthorized modifications, or natural disasters. Warranty claims must include proof of purchase." },
  { title: "8. Intellectual Property", content: "All content on our platform — including logos, text, images, graphics, and software — is the property of MediaMall or its licensors and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission." },
  { title: "9. Limitation of Liability", content: "MediaMall shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount you paid for the specific product or service giving rise to the claim. This limitation applies to the fullest extent permitted by applicable law." },
  { title: "10. Dispute Resolution", content: "Any disputes arising from these terms shall first be resolved through good-faith negotiation. If unresolved, disputes may be submitted to binding arbitration or courts as described in our supplemental dispute notice, consistent with applicable rules." },
  { title: "11. Contact", content: "For questions about these Terms of Service, contact us at legal@mediamall.com or call 1-800-MEDIA-123." },
];

const Terms = () => (
  <PageTransition>
    <SiteHeader />
    <main className="min-h-screen bg-background">
      <section className="bg-card border-b border-border py-10 md:py-14">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Terms of Service</h1>
          </div>
          <p className="text-sm text-muted-foreground">Last updated: March 1, 2026</p>
        </div>
      </section>

      <section className="container max-w-3xl py-10">
        <p className="text-sm text-muted-foreground leading-relaxed mb-10">
          These Terms of Service govern your use of the MediaMall website, applications, and services. Please read them carefully before using our platform.
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

export default Terms;
