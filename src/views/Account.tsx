"use client";

import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const menuItems = [
  { icon: Package, label: "My Orders", description: "Track and manage your orders", href: "#" },
  { icon: Heart, label: "Wishlist", description: "Items you've saved", href: "/wishlist" },
  { icon: MapPin, label: "Addresses", description: "Manage delivery addresses", href: "#" },
  { icon: CreditCard, label: "Payment Methods", description: "Saved cards and wallets", href: "#" },
  { icon: Settings, label: "Settings", description: "Account preferences", href: "#" },
];

const Account = () => {
  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-8 pb-24 md:pb-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground mb-6">My Account</h1>

        <div className="bg-card rounded-xl border border-border p-6 mb-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">Guest User</p>
            <p className="text-sm text-muted-foreground">Sign in to access your account</p>
          </div>
          <button className="ml-auto px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            Sign In
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border divide-y divide-border">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/50 transition-colors"
            >
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </Link>
          ))}
          <button className="flex items-center gap-4 px-5 py-4 w-full text-left hover:bg-secondary/50 transition-colors text-deal">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
    </PageTransition>
  );
};

export default Account;
