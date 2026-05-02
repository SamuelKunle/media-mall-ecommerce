"use client";

import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";
import {
  formatPrice,
  shippingFromSubtotal,
  FREE_SHIPPING_THRESHOLD_USD,
} from "@/lib/commerce";
import { useCart } from "@/contexts/CartContext";
import { recordDemoOrder } from "@/integrations/orders/demo";
import { z } from "zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, MapPin, Truck, CreditCard, Building2,
  Shield, Check, Package, ShoppingCart, Lock, BadgeCheck,
  Clock, Gift, ArrowLeft
} from "lucide-react";

const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().min(10, "Valid phone required").max(20),
  email: z.string().trim().email("Valid email required").max(255),
  street: z.string().trim().min(3, "Address is required").max(200),
  city: z.string().trim().min(2, "City is required").max(100),
  state: z.string().trim().min(2, "State is required").max(100),
});

/** Local validation only — real charges must go through Stripe (or similar) on the server */
const paymentCardSchema = z.object({
  cardNumber: z
    .string()
    .trim()
    .refine(
      (s) => {
        const d = s.replace(/\s/g, "");
        return d.length >= 13 && d.length <= 19 && /^\d+$/.test(d);
      },
      { message: "Enter a valid card number" },
    ),
  cardName: z.string().trim().min(2, "Cardholder name required"),
  cardExpiry: z
    .string()
    .trim()
    .regex(/^\d{2}\/\d{2}$/, "Use MM/YY"),
  cardCvv: z.string().trim().regex(/^\d{3,4}$/, "Valid CVV required"),
});

const steps = [
  { key: "info", label: "Delivery", icon: Truck },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "confirm", label: "Done", icon: Check },
] as const;

const Checkout = () => {
  const { items, subtotal, savings, clearCart } = useCart();
  const [step, setStep] = useState<"info" | "payment" | "confirm">("info");
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "payondelivery">("card");
  const [selectedStore, setSelectedStore] = useState("");
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", street: "", city: "", state: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

  const shipping = shippingFromSubtotal(subtotal);
  const total = subtotal + shipping;
  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  if (items.length === 0 && step !== "confirm") {
    return (
      <div className="min-h-screen bg-background pb-16 md:pb-0">
        <SiteHeader />
        <div className="container py-20 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6">
            <ShoppingCart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add items to your cart before checking out</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Continue Shopping
          </Link>
        </div>
        <SiteFooter />
        <MobileBottomNav />
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const handleContinueToPayment = () => {
    if (deliveryMethod === "delivery") {
      const result = addressSchema.safeParse(form);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((e) => {
          const key = e.path[0];
          if (key !== undefined) fieldErrors[String(key)] = e.message;
        });
        setErrors(fieldErrors);
        toast.error("Please fill in all required fields");
        return;
      }
    } else if (!selectedStore) {
      toast.error("Please select a pickup store");
      return;
    }
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCardChange = (field: keyof typeof cardForm, value: string) => {
    setCardForm((prev) => ({ ...prev, [field]: value }));
    if (paymentErrors[field]) {
      setPaymentErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "card") {
      const parsed = paymentCardSchema.safeParse(cardForm);
      if (!parsed.success) {
        const fieldErrors: Record<string, string> = {};
        parsed.error.issues.forEach((e) => {
          const key = e.path[0];
          if (key !== undefined) fieldErrors[String(key)] = e.message;
        });
        setPaymentErrors(fieldErrors);
        toast.error("Please complete card details (demo validation only)");
        return;
      }
      setPaymentErrors({});
    }

    recordDemoOrder({
      deliveryMethod,
      paymentMethod,
      subtotal,
      shipping,
      total,
      itemIds: items.map((i) => ({ id: i.product.id, qty: i.qty })),
    });

    setStep("confirm");
    clearCart();
    toast.success("Order placed successfully!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stepIndex = steps.findIndex((s) => s.key === step);

  const inputClass = "w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all";

  return (
    <PageTransition>
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <SiteHeader />
      <main className="container py-4 md:py-6 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/cart" className="hover:text-primary">Cart</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">Checkout</span>
        </nav>

        <p className="mb-6 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Demo checkout</span> — no payment is charged.
          Card fields are validated locally for UX only. To go live, wire{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">integrations/stripe</code>{" "}
          and move order creation to your API.
        </p>

        {/* Enhanced Stepper */}
        <div className="relative flex items-center justify-center mb-10">
          <div className="flex items-center gap-0 w-full max-w-md">
            {steps.map((s, i) => {
              const isCompleted = i < stepIndex;
              const isCurrent = i === stepIndex;
              const StepIcon = s.icon;
              return (
                <div key={s.key} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex flex-col items-center relative">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                        backgroundColor: isCompleted ? "hsl(var(--success))" : isCurrent ? "hsl(var(--primary))" : "hsl(var(--secondary))",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-success-foreground" />
                      ) : (
                        <StepIcon className={`w-5 h-5 ${isCurrent ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      )}
                    </motion.div>
                    <span className={`text-xs font-semibold mt-2 ${isCurrent ? "text-foreground" : isCompleted ? "text-success" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 mt-[-20px] rounded-full overflow-hidden bg-border">
                      <motion.div
                        initial={false}
                        animate={{ width: isCompleted ? "100%" : "0%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="h-full bg-success rounded-full"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Security banner */}
        <div className="flex items-center justify-center gap-4 mb-6 py-2.5 px-4 rounded-xl bg-success/5 border border-success/15">
          <div className="flex items-center gap-1.5 text-xs text-success font-medium">
            <Lock className="w-3.5 h-3.5" /> SSL Encrypted
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1.5 text-xs text-success font-medium">
            <Shield className="w-3.5 h-3.5" /> Secure Checkout
          </div>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-success font-medium">
            <BadgeCheck className="w-3.5 h-3.5" /> Verified Seller
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <AnimatePresence mode="wait">
            {step === "info" && (
              <motion.div key="info" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="space-y-5">
                {/* Delivery Method */}
                <div className="product-card p-5 space-y-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-primary" />
                    </div>
                    Delivery Method
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "delivery", label: "Home Delivery", desc: "2-5 business days", icon: Truck, extra: `Free over ${formatPrice(FREE_SHIPPING_THRESHOLD_USD)}` },
                      { key: "pickup", label: "Store Pickup", desc: "Ready in 2 hours", icon: MapPin, extra: "Free always" },
                    ].map((m) => (
                      <button key={m.key} onClick={() => setDeliveryMethod(m.key as "delivery" | "pickup")}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          deliveryMethod === m.key
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/30 hover:bg-secondary/30"
                        }`}>
                        <div className="flex items-center justify-between mb-2">
                          <m.icon className={`w-5 h-5 ${deliveryMethod === m.key ? "text-primary" : "text-muted-foreground"}`} />
                          {deliveryMethod === m.key && (
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-foreground">{m.label}</p>
                        <p className="text-xs text-muted-foreground">{m.desc}</p>
                        <p className="text-[11px] font-medium text-success mt-1">{m.extra}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address / Pickup */}
                <div className="product-card p-5 space-y-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    {deliveryMethod === "delivery" ? "Delivery Address" : "Pickup Location"}
                  </h2>
                  {deliveryMethod === "delivery" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { field: "fullName", label: "Full Name", placeholder: "Jane Smith", full: false },
                        { field: "phone", label: "Phone Number", placeholder: "+1 (555) 010-2030", full: false },
                        { field: "email", label: "Email Address", placeholder: "jane@example.com", full: true },
                        { field: "street", label: "Street Address", placeholder: "123 Main Street, Apt 4", full: true },
                        { field: "city", label: "City", placeholder: "Austin", full: false },
                        { field: "state", label: "State", placeholder: "TX", full: false },
                      ].map((f) => (
                        <div key={f.field} className={f.full ? "sm:col-span-2" : ""}>
                          <label className="text-xs font-semibold text-foreground mb-1.5 block">{f.label} <span className="text-deal">*</span></label>
                          <input type="text" placeholder={f.placeholder} value={form[f.field as keyof typeof form]}
                            onChange={(e) => handleChange(f.field, e.target.value)} maxLength={200}
                            className={`${inputClass} ${errors[f.field] ? "border-destructive ring-1 ring-destructive/20" : ""}`} />
                          {errors[f.field] && <p className="text-xs text-destructive mt-1 flex items-center gap-1">{errors[f.field]}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {[
                        { name: "MediaMall Austin — Domain Northside", hours: "Mon–Sat: 9AM – 8PM" },
                        { name: "MediaMall Seattle — University Village", hours: "Mon–Sat: 10AM – 8PM" },
                        { name: "MediaMall Denver — Cherry Creek", hours: "Mon–Sat: 9AM – 7PM" },
                      ].map((store) => (
                        <button key={store.name} onClick={() => setSelectedStore(store.name)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                            selectedStore === store.name ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"
                          }`}>
                          <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${selectedStore === store.name ? "text-primary" : "text-muted-foreground"}`} />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">{store.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" /> {store.hours}
                            </p>
                          </div>
                          {selectedStore === store.name && (
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Extras */}
                <div className="product-card p-5 space-y-3">
                  <label className="flex items-center gap-2.5 text-sm text-foreground cursor-pointer">
                    <input type="checkbox" className="rounded border-border w-4 h-4 accent-primary" />
                    I need a VAT invoice for this order
                  </label>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">Order Notes <span className="text-muted-foreground font-normal">(optional)</span></label>
                    <textarea placeholder="Any special delivery instructions..." maxLength={500}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none h-20" />
                  </div>
                </div>

                <button onClick={handleContinueToPayment}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Continue to Payment <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div key="payment" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="space-y-5">
                <div className="product-card p-5 space-y-4">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-primary" />
                    </div>
                    Payment Method
                  </h2>
                  <div className="space-y-2">
                    {[
                      { key: "card", label: "Debit / Credit Card", desc: "Visa, Mastercard, Amex", icon: CreditCard },
                      { key: "transfer", label: "Bank Transfer", desc: "Direct bank transfer", icon: Building2 },
                      { key: "payondelivery", label: "Pay on Delivery", desc: "Cash or POS on delivery", icon: Package },
                    ].map((m) => (
                      <button key={m.key} onClick={() => setPaymentMethod(m.key as "card" | "transfer" | "payondelivery")}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                          paymentMethod === m.key ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"
                        }`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          paymentMethod === m.key ? "bg-primary/10" : "bg-secondary"
                        }`}>
                          <m.icon className={`w-5 h-5 ${paymentMethod === m.key ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">{m.label}</p>
                          <p className="text-xs text-muted-foreground">{m.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === m.key ? "border-primary bg-primary" : "border-border"}`}>
                          {paymentMethod === m.key && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                  {paymentMethod === "card" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border">
                        {(
                          [
                            {
                              field: "cardNumber" as const,
                              label: "Card Number",
                              placeholder: "0000 0000 0000 0000",
                              full: true,
                              maxLength: 24,
                            },
                            {
                              field: "cardName" as const,
                              label: "Cardholder Name",
                              placeholder: "Jane Smith",
                              full: true,
                              maxLength: 80,
                            },
                            {
                              field: "cardExpiry" as const,
                              label: "Expiry Date",
                              placeholder: "MM/YY",
                              full: false,
                              maxLength: 5,
                            },
                            {
                              field: "cardCvv" as const,
                              label: "CVV",
                              placeholder: "•••",
                              full: false,
                              maxLength: 4,
                            },
                          ] as const
                        ).map((f) => (
                          <div key={f.field} className={f.full ? "sm:col-span-2" : ""}>
                            <label className="text-xs font-semibold text-foreground mb-1.5 block">{f.label}</label>
                            <input
                              type="text"
                              autoComplete="off"
                              placeholder={f.placeholder}
                              maxLength={f.maxLength}
                              value={cardForm[f.field]}
                              onChange={(e) => handleCardChange(f.field, e.target.value)}
                              className={`${inputClass} ${paymentErrors[f.field] ? "border-destructive ring-1 ring-destructive/20" : ""}`}
                            />
                            {paymentErrors[f.field] && (
                              <p className="text-xs text-destructive mt-1">{paymentErrors[f.field]}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "transfer" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="rounded-xl bg-secondary/50 border border-border p-4 space-y-2.5 text-sm mt-2">
                        <p className="font-bold text-foreground text-base">Bank Transfer Details</p>
                        <div className="space-y-1.5">
                          <div className="flex justify-between"><span className="text-muted-foreground">Bank</span><span className="text-foreground font-semibold">Demo Community Bank</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Account</span><span className="text-foreground font-semibold font-mono">0123456789</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="text-foreground font-semibold">MediaMall Inc.</span></div>
                        </div>
                        <p className="text-xs text-muted-foreground pt-1 border-t border-border">Transfer exactly <span className="font-bold text-foreground">{formatPrice(total)}</span> and use your order number as reference.</p>
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => { setStep("info"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="py-3.5 px-6 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button onClick={handlePlaceOrder}
                    className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Place Order — {formatPrice(total)}
                  </button>
                </div>
              </motion.div>
            )}

            {step === "confirm" && (
              <motion.div key="confirm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <div className="product-card p-8 md:p-12 text-center space-y-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center"
                  >
                    <Check className="w-10 h-10 text-success" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Order Confirmed! 🎉</h2>
                    <p className="text-muted-foreground mt-2">Order #MM-{new Date().getFullYear()}-{String(Date.now()).slice(-6)}</p>
                  </div>
                  <div className="max-w-sm mx-auto space-y-2 text-sm text-muted-foreground">
                    <p>We'll send a confirmation email with tracking details shortly.</p>
                    <p className="text-success font-medium flex items-center justify-center gap-1.5">
                      <Gift className="w-4 h-4" /> Thank you for shopping with MediaMall!
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-4">
                    <Link href="/" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity">
                      Continue Shopping
                    </Link>
                    <Link href="/support/orders" className="px-6 py-3 rounded-xl border-2 border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
                      Track Order
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          {step !== "confirm" && (
            <div className="space-y-4">
              <div className="product-card p-5 space-y-4 lg:sticky lg:top-20">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" /> Order Summary
                  <span className="ml-auto text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{totalItems} items</span>
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="w-14 h-14 rounded-xl bg-secondary overflow-hidden shrink-0 border border-border">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground font-medium line-clamp-2 leading-tight">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.qty}</p>
                      </div>
                      <p className="text-xs font-bold text-foreground shrink-0">{formatPrice(item.product.price * item.qty)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-success font-medium">You save</span>
                      <span className="text-success font-semibold">-{formatPrice(savings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? "text-success" : "text-foreground"}`}>{shipping === 0 ? "Free ✓" : formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-xl font-extrabold text-deal">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Trust signals */}
              <div className="product-card p-4 space-y-3">
                {[
                  { icon: Shield, text: "Secure checkout — 256-bit SSL encryption", color: "text-success" },
                  { icon: BadgeCheck, text: "100% genuine products guaranteed", color: "text-primary" },
                  { icon: Building2, text: "VAT invoice available on request", color: "text-primary" },
                  { icon: Truck, text: "Free returns within 30 days", color: "text-primary" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <f.icon className={`w-4 h-4 ${f.color} shrink-0`} />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default Checkout;
