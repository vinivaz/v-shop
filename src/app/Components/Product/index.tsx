// Components
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-solid-svg-icons";
import { RatingStars } from "../RatingStars";


type ProductType = {
  _id: string,
  name: string,
  slug: string,
  category: string,
  price: number,
  stock: number,
  description: string,
  mainImage?: string,
  additionalImages: string[],
};

type ProductProps = {
  rating: number,
  data: ProductType;
}


export function Product({rating, data}:ProductProps){
  return(
    <div
      className=" max-w-[208px] w-full h-[364px]"
    >
      <a
        className="max-w-[208px] w-full max-h-[208px] h-full bg-product-bg flex justify-center items-center rounded-t-xl"
        href={`products/${data.slug}`}
      >
        {data.mainImage &&(
          <Image
          className="object-cover max-w-[90px] w-full"
          src={data.mainImage}
          width={75}
          height={75}
          alt={data.name}
          quality={100}
        />
        )}
        
      </a>
      <div
        className="w-full flex flex-col justify-evenly p-2 rounded-b-xl min-h-[156px] bg-white"
      >
        <div className="flex flex-row w-full">
          <div
            className="flex flex-row text-[11px]"
          >
            <RatingStars rating={rating}/>
            <span className="font-semibold">5.0 (15635)</span>
          </div>
        </div>
        <a
          className="leading-4 font-semibold text-dark-text"
          href={`products/${data.slug}`}
        >
          {data.name}
        </a>
        <span className="font-medium text-dark-text py-0.5">R$ {data.price}</span>
        <span className="text-xs font-medium text-green-500 py-0.5">R$ 3800 no PIX</span>
        <div className="flex gap-1">
          <button
            className="bg-darker px-3 py-[3px] text-white rounded-xl"
          >
            Comprar
          </button>
          <button
            className="bg-transparent flex items-center justify-center w-[32px] h-[32px] border rounded-xl border-gray-300"
          >
            <Image
              src="/icons/add-to-cart-icon.svg"
              width={20}
              height={20}
              alt="add to cart icon"
            />
          </button>
          <button
            className="bg-transparent w-[32px] h-[32px] border rounded-xl border-gray-300"
          >
            <FontAwesomeIcon icon={fullHeart} />
          </button>
        </div>
      </div>
    </div>
  )
}