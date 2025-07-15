"use client"

import React, { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

// Components
import { Product } from '../Product';
import Image from 'next/image';

// Style
import "./Carousel.css";

// Types
import type { Product as ProductType } from '@/types/product';


export function Carousel({products: serverProducts}: {products: ProductType[]}) {

  const [ products, setProducts ] = useState(serverProducts)

  const toggleFavorite = (product: ProductType, value: boolean) => {
    setProducts(products!.map((singleProduct) => singleProduct.id === product.id ? { ...singleProduct, favorite: value } : singleProduct))
  }

  const [emblaRef, emblaApi] = useEmblaCarousel()

  const handleNext = () => {
    emblaApi?.scrollNext()
  }

  const handlePrev= () => {
    emblaApi?.scrollPrev()
  }

  return (
    <div className="relative">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {products.map((product, index) => (
            <div key={index} className="embla__slide">
              <Product
                data={product}
                rating={5}
                toggleFavorite={() => toggleFavorite(product, !product.favorite)}
              />
            </div>
          ))}
        </div>
      </div>
        
      <button
        className="rounded-full bg-darker flex justify-center items-center p-1 absolute top-50 -left-0"
        onClick={handlePrev}
      >
        <Image
          src="/icons/prev-arrow-icon.svg"
          width={20}
          height={20}
          alt="next icon"
        />
      </button>
      <button
        className="rounded-full bg-darker flex justify-center items-center p-1 absolute top-50 -right-0"
        onClick={handleNext}
      >
        <Image
          src="/icons/next-arrow-icon.svg"
          width={20}
          height={20}
          alt="next icon"
        />
      </button>
    </div>
 
  )
}