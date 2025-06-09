"use client"

// Components
import { Button } from "../ui/Button";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';

// Hooks
import { useCartStore } from "../../../store/cartStore";

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

export function ProductButtons ({
  product, 
  variationIndex
}: {
  product: DatabaseProduct,
  variationIndex: number
}
) {
  const { addProduct } = useCartStore()



  return(
  <div className="w-full max-w-[265px] flex gap-1">
    <Button>Comprar</Button>
    <Button
      variant="secondary"
        customStyle="max-w-[40px] p-1"
        onClick={() => {
          addProduct({
          ...product,
          selectedVariation: {
            ...product.variations[variationIndex],
            quantity: 1
          },
        } as CartProduct)}
      }
    >
      <Image src="/icons/add-to-cart-icon.svg" width={25} height={25} alt="add to cart icon" />
    </Button>
    <Button variant="transparent" customStyle="max-w-[40px] text-2xl text-darker">
      <FontAwesomeIcon icon={emptyHeart} />
    </Button>
  </div>
  )
}