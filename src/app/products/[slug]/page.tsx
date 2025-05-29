  "use server"

  import { RatingStars } from "@/app/Components/RatingStars";
  import { Button } from "@/app/Components/ui/Button";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
  import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
  import { Container } from "@/app/Components/ui/Container";
  import Image from "next/image";
  import { getProductBySlug } from "@/lib/api/products";
import { validators } from "tailwind-merge";
import { ProductPictures } from "@/app/Components/ProductPictures/ProductPictures";
import { VariationSelector } from "@/app/Components/VariationSelector.tsx/VariationSelector";

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
    // price: number,
    // stock: number,
    description: string,
    mainImage?: string,
    // additionalImages: string[],
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
      <Container>
        <div
          className="flex flex-row gap-3 items-start justify-center w-full max-w-[640px] my-5"
        >
          <div
            className="flex flex-col w-full"
          >
            <div
              className="bg-white flex items-center justify-center w-full h-[320px] max-h-[320px] rounded-3xl"
            >
              <Image
                className="object-cover max-w-[100px] w-full"
                src={selectedVariation.images[0]||""}
                width={75}
                height={75}
                alt={product.name}
                quality={100}
              />

            </div>
            {product.variations.map((variation) => (
              <div
                key={variation.id}
                data-variation={variation.id}
                className={`flex flex-row w-full gap-1 my-4 ${
                  variation.id !== selectedVariation?.id ? "hidden" : ""
                }`}
              >
                <ProductPictures variation={variation} selectedVariation={selectedVariation}/>
              </div>
              
            ))}


          </div>
          <div
            className="flex flex-col bg-white w-full rounded-3xl p-4"
          >
            <h1
              className="text-dark-text text-xl font-medium"
            >
              {product?.name}
            </h1>

            <div
              className="flex text-sm my-2"
            >
              <RatingStars rating={5}/>5.0  (15635)
            </div>

            <div
              className="flex flex-col w-full py-5"
            >
              <span
                className="font-medium"
              >
                Variações
              </span>
              <div
                className="flex flex-row w-full gap-1" 
              >
                {product.variations.map((variation, index) => (
                  <VariationSelector
                    key={index}
                    variation={variation}
                    selectedVariation={selectedVariation}
                  />
                ))}

              </div>
              <span
                className="text-dark-text font-bold text-lg my-5"
              >
                R$ {selectedVariation.price}
              </span>

              <div
                className="w-full max-w-[265px] flex gap-1"
              >
                <Button>
                  Comprar
                </Button>

                <Button
                  variant="secondary"
                  customStyle="max-w-[40px] p-1"
                >
                  <Image
                    className=""
                    src="/icons/add-to-cart-icon.svg"
                    width={25}
                    height={25}
                    alt="add to cart icon"
                  />
                </Button>
                <Button
                  variant="transparent"
                  customStyle="max-w-[40px] text-2xl text-darker"
                >
                  <FontAwesomeIcon icon={emptyHeart}/>
                </Button>
                
              </div>

            </div>

            <div
              className="w-full border-t-2 border-t-secondary-border pt-4"
            >
              <p
                className="text-sm leading-4.5 text-dark-text"
              >
                {product.description}
              </p>
            </div>

          </div>

        </div>
      </Container>
    )

  }