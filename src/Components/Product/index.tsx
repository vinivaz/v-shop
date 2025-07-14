"use client"

// Components
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { RatingStars } from "../RatingStars";
import { useCartStore } from "../../../store/cartStore";
import { setFavoriteProduct, unsetFavoriteProduct } from "@/lib/api/products";


// Hooks
import { useRouter } from 'next/navigation';
import { useProductsStore } from "../../../store/favoriteProductsStore";
import { useSession } from 'next-auth/react';

type DatabaseProduct = {
  id: string,
  name: string,
  slug: string,
  category: string,
  description: string,
  mainImage?: string,
  variations: {
    main: boolean;
    name: string;
    images: string[];
    stock: number;
    price: number;
    id: string;
    productId: string;
  }[]
}

type CartVariation = {
  main: boolean;
  name: string;
  images: string[];
  stock: number;
  price: number;
  id: string;
  productId: string;
  quantity: number;
}

type CartProduct = {
  id: string,
  name: string,
  slug: string,
  category: string,
  description: string,
  mainImage?: string,
  selectedVariation: CartVariation
  variations: CartVariation[]
};

type ProductProps = {
  rating: number,
  data: DatabaseProduct;
}


export function Product({rating, data}:ProductProps){
  const router = useRouter();

  const { data: session, status } = useSession();
  const isLoggedIn = !!session;


  const { products, setProducts, toggleFavorite } = useProductsStore()
  const { addProduct } = useCartStore()
  

  function isValidHttpUrl(str: string): boolean {
    try {
      const url = new URL(str);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  }

  const handleFavoriteClick = async (productId: string) => {
    if(!isLoggedIn){
      return router.push('/sign-in');
    }

    if(!data.favorite){
      const newFav = await setFavoriteProduct(productId);
      if(!newFav.error){
        toggleFavorite(data.category, data.id, true)
      }

      return;
    }

      const unfaved = await unsetFavoriteProduct(productId);
      console.log(unfaved)
      if(unfaved.error){
        return
      }

      toggleFavorite(data.category, data.id, false)

  } 

  return(
    <div
      className=" max-w-[208px] w-full h-[364px]"
    >
      <a
        className="max-w-[208px] w-full max-h-[208px] h-full bg-product-bg flex justify-center items-center rounded-t-xl"
        href={`products/${data.slug}`}
      >
        {data.mainImage && isValidHttpUrl(data.mainImage) &&(
          <Image
            className="object-cover max-w-[90px] w-full"
            src={data.mainImage}
            width={75}
            height={75}
            alt={data.name}
            quality={100}
            onError={(e) => {
              e.currentTarget.src = '/image-placeholder.svg';
            }}
          />
        )}
        
      </a>
      <div
        className="w-full flex flex-col justify-evenly p-2 rounded-b-xl min-h-[150px] bg-white"
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
        <span className="font-medium text-dark-text py-0.5">R$ {data.variations[0].price.toFixed(2)}</span>
        {/* <span className="text-xs font-medium text-green-500 py-0.5">R$ 3800 no PIX</span> */}
        <div className="flex gap-1">
          <button
            className="bg-darker px-3 py-[3px] text-white rounded-xl"
          >
            Comprar
          </button>
          <button
            className="bg-transparent flex items-center justify-center w-[32px] h-[32px] border rounded-xl border-gray-300"
            onClick={() => addProduct({
              ...data,
              selectedVariation: {
                ...data.variations[0],
                quantity: 1
              }
            } as CartProduct)}
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
            onClick={() => handleFavoriteClick(data.id)}
          >
            <FontAwesomeIcon icon={data.favorite? fullHeart : emptyHeart} />
          </button>
        </div>
      </div>
    </div>
  )
}