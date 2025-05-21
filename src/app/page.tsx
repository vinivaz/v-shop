
// Components
import Image from "next/image";
import { RatingStars } from "./Components/RatingStars";
import { Product } from "./Components/Product";

import { EmblaCarousel } from "./Components/CarouselTest";

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";

// Services
import { listAllProducts } from "@/services/products";


type Variations = {
  color?: string,
  picture: string,
  price: number,
  stock: number,

}

type Product = {
  id: string,
  brand: string,
  category: string,
  description: string,
  name: string,
  picture: string,
  variations: Variations[],
}

type FirstPageProps = {
  smartphones: Product[],
  videogames: Product[],
  watches: Product[],
  headphones: Product[]
}


const listVariations = async (productId: string) => {
  const variationsRef = collection(db, "product", productId, "variations");
  const snapshot = await getDocs(variationsRef);
  
  const variations = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const productRef = collection(db, "product")

  const productSnapshot = await getDocs(productRef);

  const products = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  console.log(variations);
};

export default async function Home() {

  // const test = await listVariations("YRdBwLjPwkwzDITh5yF1")

  const products = await listAllProducts()

  console.log(products)

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
        <h3>Smartphones</h3>
        <EmblaCarousel/>
      </div>
    </div>
  </div>
    
  );
}




