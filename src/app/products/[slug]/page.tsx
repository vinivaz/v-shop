"use server"

import { Container } from "@/Components/ui/Container";
import { getProductBySlug } from "@/lib/api/products";

import Image from "next/image";
import Link from "next/link";
import { RatingStars } from "@/Components/RatingStars";
import { Button } from "@/Components/ui/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { ProductButtons } from "@/Components/ProductButtons";

  type Variations = {
    id: string;
    productId: string;
    main: boolean;
    name: string;
    stock: number;
    price: number;
    images: string[];
  }

  type Product = {
    id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    mainImage?: string;
    variations: Variations[];
  }
  

  export default async function Product({
    params,
    searchParams
  }: {
    params: Promise<{ slug: string, variation: string }>,
    searchParams: Promise<{ [key: string]: string | undefined }>
  }){

    const { slug } = await params;
    const { variation, image } = await searchParams;

    const product: Product = await getProductBySlug(slug);

    function getValidVariationIndex(
      value: string | null |undefined,
      variations: Variations[]
    ): number {
      if (!value) return 0;

      const asIndex = parseInt(value);
      if (!isNaN(asIndex) && variations[asIndex]) return asIndex;

      const variationIndexById = variations.findIndex(v => v.id === value);
      if (variationIndexById !== -1) return variationIndexById;

      return 0;
    }

    function getValidImageIndex(
      value: string | null | undefined,
      images: string[]
    ): number {
      const asIndex = parseInt(value || '');
      if (!isNaN(asIndex) && images[asIndex]) return asIndex;

      return 0;
    }

  const variationIndex = getValidVariationIndex(variation, product.variations)
  const imageIndex = getValidImageIndex(image, product.variations[variationIndex].images);
    // const variationFromParams = product.variations.find((v) => v.id === vId);
    // const selectedVariation =
    //   variationFromParams ||
    //   product.variations.find((v) => v.main) ||
    //   product.variations[0];

    if (!product) {
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
            sku: product.id,
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
        {/* <ProductDetails
          product={product}
          selectedVariationFromServer={selectedVariation}
        />     */}
        <div className="flex flex-row gap-3 items-start justify-center w-full max-w-[640px] my-5 max-[556px]:flex-col">
          <div className="flex flex-col w-full">
            <div className="bg-white flex items-center justify-center w-full h-[320px] max-h-[320px] rounded-3xl">
              {product.variations[variationIndex].images[imageIndex] && (
                <Image
                  className="object-contain max-w-[100px] w-full max-h-[95%]"
                  src={product.variations[variationIndex].images[imageIndex] as string}
                  width={75}
                  height={75}
                  alt={product.name as string}
                  quality={100}
                />
              )}
              

            </div>

            <div className="inline-flex flex-row flex-wrap w-full max-w-[290px] gap-1 my-4">
            {product.variations[variationIndex].images.map((image, index) => {
              const isActive = index === imageIndex;
              return(
                <Link
                  key={index}
                  aria-label="select image"
                  href={`${slug}?variation=${variationIndex}&image=${index}`}
                  scroll={false}
                  className={`w-full max-w-[66px] flex justify-center overflow-hidden h-[66px] bg-white rounded-xl ${isActive && "border-2 border-darker"}`}
                >
                  <Image
                    className=" object-contain w-full max-w-[66px] pointer-none:*"
                    src={image||""}
                    width={70}
                    height={70}
                    alt={product.name as string}
                    quality={10}
                  />
                </Link>
              )
            })}
              
            
            </div>
          </div>

          <div className="flex flex-col bg-white w-full rounded-3xl p-4">
            <h1 className="text-dark-text text-xl font-medium">{product.name}</h1>

            <div className="flex text-sm my-2">
              <RatingStars rating={5} />5.0 (15635)
            </div>

            <div className="flex flex-col w-full py-5">
              <span className="font-medium">Variações</span>

              <div
                className="inline-flex flex-row flex-wrap w-full max-w-[290px] max gap-1 items-end py-2" 
              >
                {product.variations.map((variation, index) => {
                  const isActive = index === variationIndex;
                  const variationSearchParams = new URLSearchParams(searchParams.toString());
                  variationSearchParams.set("variation", index.toString());
                  variationSearchParams.set("image", "0");

                  return(
                    <Link
                      key={index}
                      aria-label="select variation"
                      href={`${slug}?variation=${index}&image=0`}
                      scroll={false}
                      className="flex flex-col max-w-[80px] items-center"
                    >
                      <span
                        className='line-clamp-2 leading-4 text-center'
                      >
                        {variation.name}
                      </span>
                      <div
                        className={`flex w-[53px] h-[53px] rounded-xl overflow-hidden border ${
                          isActive ? "border-darker" : "border-[#DDDDDD]"
                        }`}
                      >
                        <Image
                          className="object-contain w-full max-w-[70px]"
                          src={variation.images[0] as string}
                          width={53}
                          height={53}
                          alt={variation.name}
                          quality={50}
                        />
                      </div>
                    </Link>
                  )
                }

                )}
              </div>

              <div className="text-dark-text font-bold text-lg my-5">
                R$ {product.variations[variationIndex].price}
              </div>

              <ProductButtons product={product} variationIndex={variationIndex}/>
            </div>

            <div className="w-full border-t-2 border-t-secondary-border pt-4">
              <p className="text-sm leading-4.5 text-dark-text">{product.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
     
    )
  }