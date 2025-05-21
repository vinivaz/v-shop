// Components
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-solid-svg-icons";
import { RatingStars } from "../RatingStars";


type StarRatingProps = {
  rating: number;
};


export function Product({rating}:StarRatingProps){
  return(
    <div
      className=" max-w-[208px] w-full h-[364px]"
    >
      <div
        className="max-w-[208px] w-full max-h-[208px] h-full bg-product-bg flex justify-center items-center rounded-t-xl"
      >
        <Image
          src="/products/iphone16e.png"
          width={75}
          height={75}
          alt="iphone16e"
        />
      </div>
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
        <p
          className="leading-4 font-semibold text-dark-text"
        >
          Apple iPhone 16e 128GB Branco 6,1" 48MP iOS 5G
        </p>
        <span className="font-medium text-dark-text py-0.5">R$ 4000.00</span>
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