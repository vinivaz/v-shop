"use client"

// Components
import { Button } from "../../../../Components/ui/Button";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { ArcSpinner } from "../../../../Components/ui/ArcSpinner";

// Hooks
import { useCartStore } from "../../../../../store/cartStore";
import { useCheckoutStore } from "../../../../../store/checkoutStore";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from "react";
import { useWarningMessageStore } from "../../../../../store/warningMessageStore";

import { setFavoriteProduct, unsetFavoriteProduct } from "@/lib/api/products";

// Utils
import { getFirstAvailableVariation } from "@/utils/variationVerifier";

// Types
import type { Product as ProductType } from "@/types/product";
import type { CartProduct } from "@/types/cart";

// type ProductType = {
//   id: string,
//   name: string,
//   slug: string,
//   category: string,
//   description: string,
//   mainImage?: string,
//   variations: {
//     main: boolean;
//     name: string;
//     images: string[];
//     stock: number;
//     price: number;
//     id: string;
//     productId: string;
//   }[]
//   favorite: boolean;
// }


export function ProductButtons ({
  product: serverp, 
  variationIndex
}: {
  product: ProductType,
  variationIndex: number
}
) {

  const [ loading, setLoading ] = useState(false)

  const [ product, setProduct ] = useState(serverp)
  

  const { addProduct } = useCartStore()
  const { show } = useWarningMessageStore()
  const { showCheckoutScreen } = useCheckoutStore()

  const router = useRouter();
  
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const handleBuy = () => {

    const selectedVariation = product.variations[variationIndex];

    if (selectedVariation.stock < 1) {
      show("Produto esgotado", "Infelizmente esse produto não está disponível por enquanto :(")
      return;
    }

     showCheckoutScreen([{
      ...product,
      selectedVariation: {
        ...selectedVariation,
        quantity: 1
      }
    }]as CartProduct[])
  }

  const handleAddToCart = () => {
    const selectedVariation = product.variations[variationIndex];

    if (selectedVariation.stock < 1) {
      show("Produto esgotado", "Infelizmente esse produto não está disponível por enquanto :(")
      return;
    }


    addProduct({
      ...product,
      selectedVariation: {
        ...selectedVariation,
        quantity: 1
      }
    } as CartProduct)
  }

  const handleFavoriteClick = async (productId: string) => {

    if(!isLoggedIn){
      return router.push('/sign-in');
    }

    if(loading)return;

    setLoading(true);

    const action = !product.favorite ? setFavoriteProduct : unsetFavoriteProduct;
    const result = await action(productId);

    
    setLoading(false);

    if (result.error) return;

    setProduct({...product, favorite: !product.favorite})

  } 

  return(
  <div className="w-full max-w-[265px] flex gap-1">
    <Button
      onClick={handleBuy}
    >
      Comprar
    </Button>
    <Button
      variant="secondary"
        customStyle="max-w-[40px] p-1"
        onClick={handleAddToCart}
    //     {
    //     addProduct({
    //     ...product,
    //     selectedVariation: {
    //       ...product.variations[variationIndex],
    //       quantity: 1
    //     },
    //   } as CartProduct)}
    // }
    >
      <Image src="/icons/add-to-cart-icon.svg" width={25} height={25} alt="add to cart icon" />
    </Button>
    <Button
      variant="transparent"
      customStyle="max-w-[40px] text-2xl text-darker"
      onClick={() => handleFavoriteClick(product.id)}
    >
      {loading
        ?<ArcSpinner className="text-darker-text" size={17} />
        :<FontAwesomeIcon icon={product.favorite? fullHeart : emptyHeart} />
      }
    </Button>
  </div>
  )
}