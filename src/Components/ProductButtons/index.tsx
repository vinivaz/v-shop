"use client"

// Components
import { Button } from "../ui/Button";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { ArcSpinner } from "../ui/ArcSpinner";

// Hooks
import { useCartStore } from "../../../store/cartStore";
import { useCheckoutStore } from "../../../store/checkoutStore";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from "react";


import { setFavoriteProduct, unsetFavoriteProduct } from "@/lib/api/products";

// Types
import type { CartProduct } from "@/types/cart";

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
  favorite: boolean;
}


export function ProductButtons ({
  product: serverp, 
  variationIndex
}: {
  product: DatabaseProduct,
  variationIndex: number
}
) {

  const [ loading, setLoading ] = useState(false)

    const [ product, setProduct ] = useState(serverp)
  

  const { addProduct } = useCartStore()
  const { showCheckoutScreen } = useCheckoutStore()

  const router = useRouter();
  
  const { data: session } = useSession();
  const isLoggedIn = !!session;


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
      onClick={()=> showCheckoutScreen([{
        ...product,
        selectedVariation: {
          ...product.variations[0],
          quantity: 1
        }}]as CartProduct[])}
    >
      Comprar
    </Button>
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