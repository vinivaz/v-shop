// import { getProductBySlug } from "@/lib/api/products";
import { getProductBySlugServerSide } from "@/lib/api/server/products";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string, variation: string }>,
};


export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  // const product = await  getProductBySlug(slug);
  const {data: product, error} = await  getProductBySlugServerSide(slug);

  if(error){
    console.log(error);
      return {
    title: `Produto | V-shop`,
    description: "Apresentação de produto.",
  };
  }
  return {
    title: `${product!.name} | V-shop`,
    description: product!.description,
  };
}


export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}