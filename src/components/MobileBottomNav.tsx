import { Home, LayoutGrid, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: LayoutGrid, label: "Categories", path: "/category/all" },
  { icon: Search, label: "Search", path: "/search?q=" },
  { icon: ShoppingCart, label: "Cart", path: "/cart", hasBadge: true },
  { icon: User, label: "Account", path: "/account" },
];

const MobileBottomNav = () => {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav className="bottom-nav md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const active =
            tab.path.startsWith("/search")
              ? pathname === "/search"
              : tab.path !== "#" && pathname === tab.path;
          return (
            <Link
              key={tab.label}
              href={tab.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 relative transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {tab.hasBadge && totalItems > 0 && (
                <span className="absolute -top-0.5 right-1 w-4 h-4 rounded-full bg-deal text-deal-foreground text-[10px] font-bold flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
