import { Shield, Truck, RefreshCw, Headphones, CreditCard, Award } from "lucide-react";

const features = [
  { icon: Shield, label: "100% Genuine", sub: "Authorized retailer" },
  { icon: Truck, label: "Free Delivery", sub: "Orders over $99" },
  { icon: RefreshCw, label: "Easy Returns", sub: "30-day policy" },
  { icon: CreditCard, label: "0% Installment", sub: "Up to 12 months" },
  { icon: Award, label: "Official Warranty", sub: "Full manufacturer" },
  { icon: Headphones, label: "24/7 Support", sub: "Always available" },
];

const TrustStrip = () => {
  return (
    <div className="trust-strip">
      <div className="container">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-1">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground whitespace-nowrap">{f.label}</p>
                <p className="text-[10px] text-muted-foreground whitespace-nowrap">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
