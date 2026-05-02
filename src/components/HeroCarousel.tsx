import { ChevronRight, Zap, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      title: "Galaxy S24 Ultra",
      subtitle: "Intelligence at your fingertips",
      cta: "Shop Now",
      highlight: "Save up to 15%",
      gradient: "from-[hsl(228,88%,47%)] to-[hsl(228,72%,32%)]",
    },
    {
      title: "MacBook Pro M3",
      subtitle: "Supercharged for pros",
      cta: "Explore",
      highlight: "0% installment 24 months",
      gradient: "from-[hsl(220,30%,10%)] to-[hsl(220,20%,20%)]",
    },
    {
      title: "Flash Sale Weekend",
      subtitle: "Up to 40% off selected items",
      cta: "See Deals",
      highlight: "Ends Sunday",
      gradient: "from-[hsl(4,74%,46%)] to-[hsl(338,80%,40%)]",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`min-w-full aspect-[2.5/1] md:aspect-[3/1] bg-gradient-to-br ${slide.gradient} flex items-center justify-center p-6 md:p-12`}
          >
            <div className="text-center md:text-left max-w-lg">
              {slide.highlight && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-semibold mb-3">
                  <Zap className="w-3 h-3" /> {slide.highlight}
                </span>
              )}
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-2 tracking-tight">
                {slide.title}
              </h2>
              <p className="text-sm md:text-lg text-primary-foreground/80 mb-4">{slide.subtitle}</p>
              <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary-foreground text-primary text-sm font-semibold hover:opacity-90 transition-opacity">
                {slide.cta} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-6 bg-primary-foreground" : "w-1.5 bg-primary-foreground/40"
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

export const FlashSaleTimer = () => {
  const [time, setTime] = useState({ h: 5, m: 23, s: 47 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4 text-deal" />
      <span className="text-xs font-semibold text-muted-foreground">Ends in</span>
      <div className="flex items-center gap-1">
        {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
          <span key={i} className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-foreground text-background text-xs font-bold">
            {v}
          </span>
        ))}
      </div>
    </div>
  );
};
