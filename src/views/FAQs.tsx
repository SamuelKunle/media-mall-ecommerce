"use client";

import { HelpCircle, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const faqCategories = [
  {
    title: "Orders & Delivery",
    faqs: [
      { q: "How do I track my order?", a: "Log into your account, go to 'My Orders', and click on the order to see real-time tracking. You'll also receive SMS and email updates at each stage." },
      { q: "How long does delivery take?", a: "Standard delivery takes 2–5 business days in Lagos and 5–10 days nationwide. Express delivery (Lagos only) arrives within 24 hours for an additional ₦3,000." },
      { q: "Can I change my delivery address?", a: "You can update your delivery address within 1 hour of placing the order. After that, contact support — changes depend on whether the order has shipped." },
      { q: "Do you deliver on weekends?", a: "Yes, Saturday deliveries are available in Lagos, Abuja, and Port Harcourt. Sunday deliveries are not currently offered." },
      { q: "What areas do you deliver to?", a: "We deliver to all 36 states and the FCT. Some remote areas may require an extra 2–3 business days." },
    ],
  },
  {
    title: "Payments",
    faqs: [
      { q: "What payment methods do you accept?", a: "We accept bank transfers, debit/credit cards (Visa, Mastercard, Verve), USSD payments, and Pay on Delivery (Lagos only, cash or POS)." },
      { q: "Is my payment information secure?", a: "Absolutely. All transactions are encrypted with 256-bit SSL. We never store your full card details — payments are processed by PCI-compliant providers." },
      { q: "Can I pay in installments?", a: "Yes! Select products support installment payments through our financing partners. Look for the 'Pay in Installments' badge on eligible product pages." },
      { q: "I was debited but my order wasn't confirmed", a: "This is usually a temporary hold. The funds are auto-reversed within 24 hours. If not, contact us with the transaction reference for a manual resolution." },
    ],
  },
  {
    title: "Returns & Refunds",
    faqs: [
      { q: "What is your return policy?", a: "Most items can be returned within 7 days of delivery in their original packaging and condition. Some categories like earphones and personal care devices are non-returnable for hygiene reasons." },
      { q: "How do I initiate a return?", a: "Go to Account → My Orders → select the order → 'Request Return'. Choose your reason and preferred resolution (refund or exchange). Our team reviews requests within 24–48 hours." },
      { q: "How long do refunds take?", a: "Approved refunds are processed within 3–7 business days. Bank transfer refunds may take an additional 1–2 days to reflect in your account." },
      { q: "Can I exchange instead of refund?", a: "Yes, you can choose to exchange for the same item (different color/variant) or a different product of equal or higher value (you pay the difference)." },
    ],
  },
  {
    title: "Warranty & Repairs",
    faqs: [
      { q: "How do I make a warranty claim?", a: "Visit our Warranty page, enter your product serial number, and submit a claim. You can also bring the item to any MediaMall store with your purchase receipt." },
      { q: "What does the warranty cover?", a: "Manufacturer warranty covers defects in materials and workmanship. It does not cover physical damage, water damage, or unauthorized modifications." },
      { q: "How long is the warranty?", a: "Standard manufacturer warranty is 12 months. MediaMall Extended Warranty adds an extra 6–12 months depending on the product category." },
      { q: "Do you offer out-of-warranty repairs?", a: "Yes. Our certified technicians can diagnose and repair out-of-warranty devices. Visit a store or contact support for a repair quote." },
    ],
  },
  {
    title: "Account",
    faqs: [
      { q: "How do I create an account?", a: "Click 'Account' in the header and select 'Sign Up'. You can register with your email address or phone number." },
      { q: "I forgot my password", a: "Click 'Forgot Password' on the login page. We'll send a reset link to your registered email within minutes." },
      { q: "How do I update my profile information?", a: "Log in, go to Account → Profile Settings, and update your name, email, phone number, or delivery addresses." },
    ],
  },
];

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = faqCategories
    .map((cat) => ({
      ...cat,
      faqs: cat.faqs.filter(
        (f) =>
          f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.faqs.length > 0);

  return (
    <PageTransition>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <section className="bg-card border-b border-border py-10 md:py-14">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Frequently Asked Questions</h1>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Find answers to the most common questions about shopping at MediaMall.</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                maxLength={100}
              />
            </div>
          </div>
        </section>

        <section className="container max-w-3xl py-10">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground mb-3">No results found for "{searchQuery}"</p>
              <Link href="/support" className="text-sm font-semibold text-primary hover:underline">Contact Support instead</Link>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.title} className="mb-10">
                <h2 className="text-lg font-bold text-foreground mb-4">{cat.title}</h2>
                <div className="space-y-2">
                  {cat.faqs.map((faq, i) => {
                    const key = `${cat.title}-${i}`;
                    return (
                      <button
                        key={key}
                        onClick={() => toggleItem(key)}
                        className="w-full text-left bg-card border border-border rounded-xl p-4 transition-colors hover:border-primary/20"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-foreground">{faq.q}</span>
                          <ArrowRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${expandedItems[key] ? "rotate-90" : ""}`} />
                        </div>
                        {expandedItems[key] && (
                          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{faq.a}</p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">Still have questions?</p>
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

export default FAQs;
