"use client";

// Hooks
import { useState, useEffect } from "react"

// Components
import RatingInput from "@/Components/RatingInput"
import { RatingStars } from "@/Components/RatingStars"
import { Button } from "@/Components/ui/Button";
import Image from "next/image";



// Type
import type { Product as ProductType } from "@/types/product";
import { createOrUpdateRating, getRating } from "@/lib/api/products";
import { get } from "http";

function RatingPopOver({product}: {product: ProductType}) {
  
  const [ isShowing, setIsShowing ] = useState(false);

  const [ rating, setRating] = useState({
    hasRated: false,
    value: 0
  })

  useEffect(() => {
    const getUserRating = async () => {
      const { data, error } = await getRating(product.id);
      console.log("getUserRating")

      if(error){
        return;
      }
      console.log(!data === null)

      setRating({
        hasRated: !data === null,
        value: data?.value || 0
      })
    }

    getUserRating()

  }, [])

  const handleClickRate = async() => {
    await createOrUpdateRating({productId: product.id, value: rating.value})
  }


  return (
    <div
      className="relative z-30"
    >
      <button
        className="px-1 border-1 border-product-bg ml-3 text-primary-text rounded-lg"
        onClick={() => setIsShowing(!isShowing)}
      >
        {rating && rating.hasRated? "Avaliado": "Avaliar"}
      </button>
      {isShowing?
            <div
        className="absolute bg-white p-2 rounded-2xl top-7 right-0 shadow-sm"
      >

        <div
          className="relative"
        >
          <button
            className="absolute right-0"
             onClick={() => setIsShowing(false)}
          >
            <Image
              className="pointer-events-none"
              src="/icons/dark-close-icon.svg"
              height={11}
              width={11}
              alt="close icon"
            />
          </button>

        </div>
        <span
         className="font-semibold"
        >
          Avalie
        </span>


        <RatingInput
          value={rating.value}
          onChange={(value) => setRating({
            ...rating,
            value
          })}
        />
        <div
          className="flex w-full justify-end"
        >
          <Button
            onClick={() => {
              handleClickRate()
              setRating({
                ...rating,
                hasRated: true
              })
              setIsShowing(false);
            }}
            customStyle="rounded hover:bg-lighter transition max-w-[52px] justify-end rounded-lg mt-2 font-semibold text-xs pr-2 text-xs py-1"
          >
            Ok
          </Button>
        </div>

      </div>
      :
      ""
      }

      {/* <RatingStars rating={rating}/> */}
    </div>
  )
}

export default RatingPopOver