import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";

const footerLinks: Record<string, { label: string; to: string }[]> = {
  Shop: [
    { label: "Phones & Tablets", to: "/category/phones-tablets" },
    { label: "Laptops", to: "/category/laptops" },
    { label: "PCs & Components", to: "/category/pcs" },
    { label: "Audio", to: "/category/audio" },
    { label: "Gaming", to: "/category/gaming" },
    { label: "Accessories", to: "/category/accessories" },
    { label: "Deals", to: "/category/all" },
  ],
  Services: [
    { label: "Trade-in", to: "/trade-in" },
    { label: "Installment Plans", to: "/installment-plans" },
    { label: "Warranty", to: "/warranty" },
    { label: "Repair Center", to: "/support" },
    { label: "B2B Orders", to: "/b2b" },
    { label: "Student Program", to: "/student-program" },
  ],
  Support: [
    { label: "Contact Us", to: "/support" },
    { label: "FAQs", to: "/support/faqs" },
    { label: "Shipping Info", to: "/support/shipping" },
    { label: "Return Policy", to: "/support/returns" },
    { label: "Order Tracking", to: "/support/orders" },
    { label: "Store Locator", to: "/store-locator" },
  ],
  Company: [
    { label: "About MediaMall", to: "/about" },
    { label: "Careers", to: "/careers" },
    { label: "Press", to: "/press" },
    { label: "Blog", to: "/blog" },
    { label: "Affiliate Program", to: "/affiliate" },
    { label: "Investors", to: "/investors" },
  ],
};

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);

const SiteFooter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    setSubmitted(true);
    toast.success("You're subscribed! Watch your inbox for deals.");
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <footer className="bg-card text-card-foreground border-t border-border mt-12">
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <span className="text-sm font-black text-primary-foreground">MM</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight">MediaMall</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Nigeria's premium electronics destination. Official products, genuine warranty, best prices.
            </p>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> 0800 MEDIAMALL (Free)</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> support@mediamall.ng</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> 30+ stores nationwide</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Stay in the loop</h4>
              <p className="text-xs text-muted-foreground">Get exclusive deals, new arrivals & tech tips straight to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto gap-2">
              {submitted ? (
                <div className="flex items-center gap-2 text-sm font-medium text-success">
                  <CheckCircle className="w-4 h-4" /> Subscribed!
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 sm:w-64 px-4 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    maxLength={255}
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    Subscribe <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 MediaMall Nigeria. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
