"use server"

// Components
import Image from "next/image";
import { RatingStars } from "@/Components/RatingStars";
import { Product } from "@/Components/Product";
import { Container } from "@/Components/ui/Container";
import { Carousel } from "@/Components/Carousel";
import { getProducts } from "@/lib/api/products";
import { Hero } from "@/Components/Hero";


type Variation = {
  productId: string;
  id: string;
  main: boolean;
  name: string,
  stock: number
  price: number;
  images: string[]
}


type Product = {
  id: string,
  name: string,
  slug: string,
  category: string,
  description: string,
  mainImage?: string,
  variations: Variation[]
}

type FirstPageProps = {
  smartphones: Product[],
  consoles: Product[],
  smartwatches: Product[],
  headphones: Product[]
}

export default async function Home() {
  const products : FirstPageProps  = await getProducts()
  console.log(products)
  return (
    <>
      <Hero/>
      <div
        className="w-full flex flex-row justify-between my-5"
      >
        <div
          className=""
        >
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/videogames-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </div>

        <div>
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/smartphones-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </div>
        <div>
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/watches-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </div>
        <div>
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/headphones-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </div>
      </div>

      <div
        className="w-full my-8 "
      >
        <div
          className="w-full h-full flex flex-col "
        >
          <h3 className="font-medium text-lg py-5">
            <Image
              src="/icons/smartphones-section-icon.svg"
              width={135.5}
              height={35.53}
              alt="Smartphones section icon"
            />
          </h3>
          <Carousel products={products.smartphones}/>
        </div>

        <div
          className="w-full h-full flex flex-col "
        >
          <h3 className="font-medium text-lg py-5">
            <Image
              src="/icons/videogames-section-icon.svg"
              width={129.52}
              height={35.53}
              alt="Videogames section icon"
            />
          </h3>
          <Carousel products={products.consoles}/>
        </div>
        <div
          className="w-full h-full flex flex-col "
        >
          <h3 className="font-medium text-lg py-5">
            <Image
              src="/icons/smartwatches-section-icon.svg"
              width={145.43}
              height={35.53}
              alt="Smartwatches section icon"
            />
          </h3>
          <Carousel products={products.smartwatches}/>
        </div>

        <div
          className="w-full h-full flex flex-col "
        >
          <h3 className="font-medium text-lg py-5">
            <Image
              src="/icons/headphones-section-icon.svg"
              width={127.6}
              height={35.53}
              alt="Headphones section icon"
            />
          </h3>
          <Carousel products={products.headphones}/>
        </div>
      </div>
    </>

  );
}




