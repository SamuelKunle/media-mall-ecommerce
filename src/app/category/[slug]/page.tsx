import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage from "@/views/CategoryPage";
import { getCategoryBySlug } from "@/data/products";

const site = "MediaMall";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "all") {
    return {
      title: `All categories | ${site}`,
      description:
        "Browse phones, laptops, audio, gaming & more — curated electronics categories.",
      openGraph: {
        title: `All categories | ${site}`,
        description: "Browse Nigeria's widest range of genuine electronics.",
      },
    };
  }
  const cat = getCategoryBySlug(slug);
  if (!cat) {
    return { title: `Category | ${site}`, robots: { index: false, follow: false } };
  }
  const title = `${cat.name} | ${site}`;
  return {
    title,
    description: cat.description,
    openGraph: { title, description: cat.description },
    twitter: { card: "summary", title, description: cat.description },
  };
}

export default async function CategoryRoutePage({ params }: Props) {
  const { slug } = await params;
  if (slug !== "all" && !getCategoryBySlug(slug)) notFound();
  return <CategoryPage slug={slug} />;
}
