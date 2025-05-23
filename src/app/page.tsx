"use server"

// Components
import Image from "next/image";
import { RatingStars } from "./Components/RatingStars";
import { Product } from "./Components/Product";

import { Carousel } from "./Components/Carousel";
import { getProducts } from "@/lib/api/products";


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

type FirstPageProps = {
  smartphones: Product[],
  consoles: Product[],
  smartwatches: Product[],
  headphones: Product[]
}




export default async function Home() {
  const products : FirstPageProps  = await getProducts()


  return (
  <div className="w-full max-w-[1120px] flex flex-col justify-center">
    <div
      className="w-full h-full max-h-[417.24px] flex justify-center items-start"
    >
      <div className="w-full relative flex justify-center items-center ">
        <Image
          className="z-1 absolute object-contain "
          src="/ad/smartphones-hero-background.png"
          width={1120}
          height={359.64}
          alt="hero image background"
        />
        <div className="z-2 w-full max-h-[417.24px] flex items-center justify-center">
          <div>
            <h1
              className="text-white font-[Zen_Dots] text-3xl max-w-[311.9px] w-full max-[880px]:text-2xl max-[880px]:max-w-[270px] max-[750px]:text-xl max-[750px]:leading-5 max-[750px]:max-w-[200px]"
            >
              Ut enim ad minim veniam
            </h1>
            <p
              className="max-w-[310px] w-full text-white text-wrap text-sm my-2 max-[880px]:text-xs max-[880px]:my-1 max-[880px]:max-w-[205px]"
            >
              All this running around, try to cover my shadows, something trying to get out, but all the others seem shalow
            </p>
            <button
              className="text-white py-2 mt-5 px-17 rounded-2xl bg-lighter max-[880px]:mt-3 max-[800px]:py-1 max-[800px]:px-13 max-[800px]:rounded-lg max-[650px]:text-xs"
            >
              Conferir
            </button>
          </div>
          <div className="h-full w-[33%]">
          <img
            className="object-contain w-full "
            src="/ad/smartphone-hero-image.png"

            alt="smartphone image"
    
          />          
          </div>
        </div>

      </div>
    </div>

    <div
      className="w-full flex flex-row justify-between my-5"
    >
      <div>
        <Image
          src="/ad/videogames-mini-ad-background.png"
          width={259.82}
          height={222.41}
          quality={100}
          alt="mini ad background image"
        />
      </div>

      <div>
        <Image
          src="/ad/smartphones-mini-ad-background.png"
          width={259.82}
          height={222.41}
          quality={100}
          alt="mini ad background image"
        />
      </div>
      <div>
        <Image
          src="/ad/watches-mini-ad-background.png"
          width={259.82}
          height={222.41}
          quality={100}
          alt="mini ad background image"
        />
      </div>
            <div>
        <Image
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
        <h3 className="font-medium text-lg py-5">Smartphones</h3>
        <Carousel products={products.smartphones}/>
      </div>

      <div
        className="w-full h-full flex flex-col "
      >
        <h3 className="font-medium text-lg py-5">Videogames</h3>
        <Carousel products={products.consoles}/>
      </div>
      <div
        className="w-full h-full flex flex-col "
      >
        <h3 className="font-medium text-lg py-5">Smartwatches</h3>
        <Carousel products={products.smartwatches}/>
      </div>

      <div
        className="w-full h-full flex flex-col "
      >
        <h3 className="font-medium text-lg py-5">Headphones</h3>
        <Carousel products={products.headphones}/>
      </div>
    </div>
  </div>
    
  );
}




