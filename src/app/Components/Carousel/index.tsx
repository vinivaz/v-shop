"use client"

import React, {useEffect} from 'react'
import useEmblaCarousel from 'embla-carousel-react'

// Components
import { Product } from '../Product';
import Image from 'next/image';

// Style
import "./Carousel.css"

type ProductType = {
  id: string,
  name: string,
  slug: string,
  category: string,
  price: number,
  stock: number,
  description: string,
  mainImage?: string,
  additionalImages: string[],
};

type CarouselProps = {
  products: ProductType[];
}

export function Carousel({products}: CarouselProps) {
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
              <Product data={product} rating={5}/>
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