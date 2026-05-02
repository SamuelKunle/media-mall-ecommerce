import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaMall — Nigeria's Premium Electronics Store",
  description:
    "Shop genuine phones, laptops, gaming, audio & accessories at Nigeria's most trusted electronics retailer. Free delivery, official warranty, 0% installment.",
  openGraph: {
    title: "MediaMall — Nigeria's Premium Electronics Store",
    description:
      "Shop genuine phones, laptops, gaming, audio & accessories. Free delivery, official warranty, 0% installment.",
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
