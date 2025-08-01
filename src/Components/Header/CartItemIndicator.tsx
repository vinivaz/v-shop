"use client";


// Hooks
import { useCartStore } from "../../../store/cartStore";


// Components


export function CartItemIndicatior(){
  const { products } = useCartStore();

  return (
    <>
      {products && products.length > 0 && <span className="absolute flex items-center justify-center w-[17px] h-[17px] rounded-md -top-1 -right-2 max-md:right-2 text-xs bg-darker text-white">{products.length}</span>}
    </>
)
}