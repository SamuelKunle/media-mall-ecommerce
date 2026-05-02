"use client";

import { Calculator, CheckCircle, ShieldCheck, Clock, ArrowRight, AlertTriangle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const plans = [
  { months: 3, interest: "0%", minOrder: "₦100,000", badge: "Most Popular" },
  { months: 6, interest: "5%", minOrder: "₦200,000", badge: null },
  { months: 9, interest: "8%", minOrder: "₦300,000", badge: null },
  { months: 12, interest: "12%", minOrder: "₦500,000", badge: "Best Value" },
];

const eligibility = [
  "Valid government-issued ID (NIN, driver's license, or international passport)",
  "Proof of income (pay slip, bank statement, or employment letter)",
  "Active Nigerian bank account with debit card",
  "Minimum 6 months employment history or business registration",
  "No outstanding defaults with our financing partners",
];

const steps = [
  { step: "1", title: "Choose Your Product", desc: "Browse and select any eligible product marked with the 'Pay in Installments' badge" },
  { step: "2", title: "Select Your Plan", desc: "Choose a 3, 6, 9, or 12-month payment plan at checkout" },
  { step: "3", title: "Quick Verification", desc: "Upload your ID and proof of income — approval takes under 10 minutes" },
  { step: "4", title: "Pay & Receive", desc: "Pay the first installment and receive your product immediately" },
];

const faqs = [
  { q: "What products are eligible for installments?", a: "Most electronics over ₦100,000 are eligible, including phones, laptops, TVs, and gaming consoles. Look for the 'Pay in Installments' badge on product pages." },
  { q: "Is there a down payment?", a: "Yes, a minimum down payment of 25% is required for all installment plans. The remaining balance is spread across your chosen plan duration." },
  { q: "What happens if I miss a payment?", a: "A late fee of ₦2,500 applies after 7 days. After 30 days of non-payment, the account is referred to our collections partner. We always try to work with you first — contact us if you're having difficulty." },
  { q: "Can I pay off my plan early?", a: "Absolutely! You can pay off your remaining balance at any time with no early repayment penalties. Any unaccrued interest will be waived." },
  { q: "How is approval determined?", a: "Approval is based on your income, employment stability, and credit history with our financing partners. Most applications are approved within 10 minutes." },
];

const InstallmentPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [amount, setAmount] = useState("500000");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const plan = plans[selectedPlan];
  const principal = parseInt(amount) || 0;
  const interestRate = parseFloat(plan.interest) / 100;
  const totalAmount = principal + principal * interestRate;
  const monthlyPayment = plan.months > 0 ? Math.ceil(totalAmount / plan.months) : 0;
  const downPayment = Math.ceil(principal * 0.25);

  return (
    <PageTransition>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="gradient-hero text-primary-foreground py-16 md:py-24">
          <div className="container text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" /> Installment Plans
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-balance">
              Buy Now, Pay Over Time
            </h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Split the cost of your favorite gadgets into easy monthly payments. 0% interest available on 3-month plans.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="container max-w-3xl py-12 md:py-16">
          <h2 className="section-title text-center mb-10">Payment Calculator</h2>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="mb-6">
              <label className="text-xs font-semibold text-foreground mb-2 block">Product Price (₦)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100000"
                max="10000000"
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-lg font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {plans.map((p, i) => (
                <button
                  key={p.months}
                  onClick={() => setSelectedPlan(i)}
                  className={`relative rounded-xl p-4 text-center border transition-colors ${
                    selectedPlan === i
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary border-border text-foreground hover:border-primary/30"
                  }`}
                >
                  {p.badge && (
                    <span className={`absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap ${
                      selectedPlan === i ? "bg-white text-primary" : "bg-primary text-primary-foreground"
                    }`}>{p.badge}</span>
                  )}
                  <p className="text-2xl font-black">{p.months}</p>
                  <p className="text-xs font-medium opacity-80">months</p>
                  <p className="text-xs font-bold mt-1">{p.interest} interest</p>
                </button>
              ))}
            </div>

            {principal >= 100000 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-secondary/50 rounded-xl p-5">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Down Payment (25%)</p>
                  <p className="text-lg font-black text-foreground">₦{downPayment.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Monthly Payment</p>
                  <p className="text-lg font-black text-primary">₦{monthlyPayment.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                  <p className="text-lg font-black text-foreground">₦{(totalAmount + downPayment).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">Enter an amount of ₦100,000 or more to see payment breakdown</p>
              </div>
            )}
          </div>
        </section>

        {/* Available Plans */}
        <section className="bg-secondary/50 py-12 md:py-16">
          <div className="container max-w-3xl">
            <h2 className="section-title text-center mb-8">Available Plans</h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Duration</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Interest</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Min. Order</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((p, i) => (
                    <tr key={p.months} className={i % 2 === 0 ? "" : "bg-secondary/30"}>
                      <td className="px-4 py-3 font-medium text-foreground">{p.months} months</td>
                      <td className="px-4 py-3">
                        <span className={p.interest === "0%" ? "font-bold text-success" : "text-muted-foreground"}>{p.interest}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{p.minOrder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container max-w-3xl py-12 md:py-16">
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

        {/* Eligibility */}
        <section className="bg-card border-y border-border py-12 md:py-16">
          <div className="container max-w-2xl">
            <h2 className="section-title text-center mb-8">Eligibility Requirements</h2>
            <ul className="space-y-3">
              {eligibility.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="container max-w-3xl py-12 md:py-16">
          <h2 className="section-title text-center mb-8">Frequently Asked Questions</h2>
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
        </section>

        {/* Important Note */}
        <section className="container max-w-3xl pb-12">
          <div className="bg-warning/10 border border-warning/20 rounded-xl p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-foreground mb-1">Important Notice</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Installment plans are subject to credit approval. Defaulting on payments may affect your credit score and eligibility for future plans. All plans include a mandatory 25% down payment. MediaMall reserves the right to modify plan terms and interest rates.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-card border-y border-border py-12 text-center">
          <div className="container max-w-xl">
            <h2 className="section-title mb-3">Ready to Get Started?</h2>
            <p className="text-sm text-muted-foreground mb-6">Browse our catalog and select "Pay in Installments" at checkout.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/category/all" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity">
                Shop Now
              </Link>
              <Link href="/support" className="px-6 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </PageTransition>
  );
};

export default InstallmentPlans;
