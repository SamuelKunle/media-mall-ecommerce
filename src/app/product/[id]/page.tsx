import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/views/ProductDetail";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/commerce";

const site = "MediaMall";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const num = Number(id);
  if (!Number.isFinite(num)) {
    return { title: `Product | ${site}`, robots: { index: false, follow: false } };
  }
  const product = getProductById(num);
  if (!product) {
    return { title: `Product not found | ${site}`, robots: { index: false, follow: false } };
  }
  const title = `${product.name} | ${site}`;
  const description = `${product.brand} — ${formatPrice(product.price)}. ${
    product.specs?.slice(0, 2).join(" · ") ?? "Genuine electronics with warranty."
  }`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: product.image, width: 400, height: 400, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const num = Number(id);
  if (!Number.isFinite(num)) notFound();
  const product = getProductById(num);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
