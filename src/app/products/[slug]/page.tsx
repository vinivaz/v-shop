  "use server"

  import { RatingStars } from "@/app/Components/RatingStars";
  import { Button } from "@/app/Components/ui/Button";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
  import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
  import { Container } from "@/app/Components/ui/Container";
  import Image from "next/image";
  import { getProductBySlug } from "@/lib/api/products";

  type Variations = {
    name: string,
    stock: number
    price: number;
    images: string[]
  }[]



  type Product = {
    _id: string,
    name: string,
    slug: string,
    category: string,
    price: number,
    stock: number,
    description: string,
    mainImage?: string,
    additionalImages: string[],
  }

  export default async function Product({
    params,
  }: {
    params: Promise<{ slug: string }>
  }){

    const { slug } = await params;

    const product: Product = await getProductBySlug(slug)
    console.log(product)
    

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
              src={product.mainImage||""}
              width={75}
              height={75}
              alt={product.name}
              quality={100}
            />

            </div>
            <div
              className="flex flex-row w-full gap-1 my-4"
            >
              {product.additionalImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full max-w-[70px] flex justify-center overflow-hidden h-[70px] bg-white rounded-xl"
                >
                  <Image
                    className="object-contain w-full max-w-[70px]"
                    src={image||""}
                    width={70}
                    height={70}
                    alt={product.name}
                    quality={50}
                  />
                </div>
              ))}
            </div>

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
                <div
                  className="flex flex-col max-w-[80px]"
                >
                  <span>Black</span>
                  <div
                    className="flex w-[53px] h-[53px] rounded-xl border"
                  >

                  </div>
                </div>
                <div
                  className="flex flex-col max-w-[80px]"
                >
                  <span>Black</span>
                  <div
                    className="flex w-[53px] h-[53px] rounded-xl border"
                  >

                  </div>
                </div>
              </div>
              <span
                className="text-dark-text font-bold text-lg my-5"
              >
                R$ {product.price}
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