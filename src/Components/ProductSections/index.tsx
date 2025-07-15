"use client"

// Hooks

// Components
import Image from "next/image";
import { Carousel } from "../Carousel";

// Types
import type { Product as ProductType } from "@/types/product";


type FirstPageProps = { 
  products: {
    smartphone: ProductType[],
    console: ProductType[],
    smartwatch: ProductType[],
    headphone: ProductType[]    
  };
}


export const ProductSections = ({products}: FirstPageProps) => {

  return (
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
          <Carousel products={products.smartphone}/>
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
          <Carousel products={products.console}/>
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
          <Carousel products={products.smartwatch}/>
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
          <Carousel products={products.headphone}/>
        </div>
      </div>
  )
}

