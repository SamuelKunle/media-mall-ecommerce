"use client";

import { CreditCard, RefreshCw, ShieldCheck, AlertCircle, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const paymentMethods = [
  { name: "Bank Transfer", desc: "Direct transfer to our bank account" },
  { name: "Card Payment", desc: "Visa, Mastercard & American Express accepted" },
  { name: "Digital wallets", desc: "Apple Pay and Google Pay where available" },
  { name: "Pay on delivery", desc: "Cash or card on delivery in eligible areas" },
];

const faqs = [
  { q: "How long do refunds take?", a: "Refunds are processed within 3–7 business days after approval. Bank transfers may take an additional 1–2 days to reflect." },
  { q: "My payment failed but I was debited. What do I do?", a: "Failed transactions are auto-reversed within 24 hours. If not, contact your bank with the transaction reference, or reach out to our support team." },
  { q: "Can I pay in installments?", a: "Yes! We offer installment plans on select products through our partner platforms. Look for the 'Pay in Installments' badge on eligible items." },
  { q: "What is your refund policy?", a: "Items returned within 7 days in original condition qualify for a full refund. Opened electronics are subject to a 10% restocking fee." },
  { q: "Why was my payment declined?", a: "Common reasons include insufficient funds, incorrect card details, or bank-side restrictions. Try another payment method or contact your bank." },
];

const PaymentsRefunds = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <PageTransition>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-card border-b border-border py-10 md:py-14">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Payments & Refunds</h1>
            </div>
            <p className="text-sm text-muted-foreground">Everything about payment options, failed transactions, and refund processes.</p>
          </div>
        </section>

        <section className="container max-w-3xl py-10">
          {/* Payment Methods */}
          <h2 className="section-title mb-6">Accepted Payment Methods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
            {paymentMethods.map((m) => (
              <div key={m.name} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Refund Process */}
          <h2 className="section-title mb-6">Refund Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { step: "1", icon: AlertCircle, title: "Request Refund", desc: "Go to Account → Orders and select 'Request Refund'" },
              { step: "2", icon: RefreshCw, title: "Review", desc: "Our team reviews your request within 24–48 hours" },
              { step: "3", icon: ShieldCheck, title: "Refund Processed", desc: "Approved refunds credited in 3–7 business days" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full gradient-hero text-primary-foreground text-sm font-black flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <h2 className="section-title mb-6">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full text-left bg-card border border-border rounded-xl p-4 transition-colors hover:border-primary/20"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-foreground">{faq.q}</span>
                  <ArrowRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${expandedFaq === i ? "rotate-90" : ""}`} />
                </div>
                {expandedFaq === i && (
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{faq.a}</p>
                )}
              </button>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-3">Need more help with a payment issue?</p>
            <Link href="/support" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
              Contact Support <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </PageTransition>
  );
};

export default PaymentsRefunds;
