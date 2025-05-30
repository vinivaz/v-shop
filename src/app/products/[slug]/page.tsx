"use server"

import { Container } from "@/app/Components/ui/Container";
import { getProductBySlug } from "@/lib/api/products";
import { ProductDetails } from "@/app/Components/ProductDetails";

  type Variations = {
    id: string;
    main: boolean;
    name: string,
    stock: number
    price: number;
    images: string[]
  }

  type Product = {
    _id: string,
    name: string,
    slug: string,
    category: string,
    description: string,
    mainImage?: string,
    variations: Variations[]
  }
  

  export default async function Product({
    params,
    searchParams
  }: {
    params: Promise<{ slug: string, variation: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }){

    const { slug } = await params;
    const { vId } = await searchParams;

    const product: Product = await getProductBySlug(slug);

    const variationFromParams = product.variations.find((v) => v.id === vId);
    const selectedVariation =
      variationFromParams ||
      product.variations.find((v) => v.main) ||
      product.variations[0];

    if (!selectedVariation) {
      return <div>Produto sem variações disponíveis no momento.</div>;
    }

    return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.variations.find((v) => v.main)?.images[0] ||
            product.variations[0].images[0],
          //image: product.variations.find((variation) => variation.main)?.images[0] || product.variations[0]?.images[0],
            sku: product._id,
            category: product.category,
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "BRL",
              lowPrice: Math.min(...product.variations.map(v => v.price)),
              highPrice: Math.max(...product.variations.map(v => v.price)),
              offerCount: product.variations.length,
              offers: product.variations.map(variation => ({
                "@type": "Offer",
                price: variation.price,
                priceCurrency: "BRL",
                availability: variation.stock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
                sku: variation.id,
                itemCondition: "https://schema.org/NewCondition"
              }))
            }
          })
        }}
      />
      <Container>
        <ProductDetails
          product={product}
          selectedVariationFromServer={selectedVariation}
        />    
      </Container>
    </>
     
    )
  }