import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaMall — Electronics & Tech Store",
  description:
    "Shop genuine phones, laptops, gaming, audio & accessories. Prices in USD. Free shipping over $99 on qualifying orders, official warranty, installment options.",
  openGraph: {
    title: "MediaMall — Electronics & Tech Store",
    description:
      "Shop genuine phones, laptops, gaming, audio & accessories. USD pricing, free shipping on qualifying orders, official warranty.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
