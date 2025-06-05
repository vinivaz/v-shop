"use client"

// Components
import { Button } from "../ui/Button";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';

// Hooks
import { useCartStore } from "../../../../store/cartStore";

type Variations = {
  id: string;
  main: boolean;
  name: string;
  stock: number;
  price: number;
  images: string[];
  productId: string;
  quantity: number;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  variations: Variations[];
};

export function ProductButtons ({
  product, 
  variationIndex
}: {
  product: Product,
  variationIndex: number
}
) {
  const { addProduct } = useCartStore()

  console.log({product, variationIndex})

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
        })}
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