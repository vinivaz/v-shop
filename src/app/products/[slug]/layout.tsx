import { getProductBySlug } from "@/lib/api/products";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};


export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const product = await  getProductBySlug(params.slug);

  return {
    title: `${product.name} | V-shop`,
    description: product.description,
  };
}


export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}