'use client';


import { useRouter, usePathname, useSearchParams, ReadonlyURLSearchParams } from 'next/navigation';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { RatingStars } from '@/app/Components/RatingStars';
import { Button } from '@/app/Components/ui/Button';

import { useCartStore } from '../../../../store/cartStore';

import Link from 'next/link';


type Variations = {
  id: string;
  main: boolean;
  name: string;
  stock: number;
  price: number;
  images: string[];
};

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  variations: Variations[];
};


const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function ProductDetails({
  product,
  selectedVariationFromServer,
}: {
  product: Product;
  selectedVariationFromServer: Variations;
}) {

  const { addProduct } = useCartStore()

  const pathname = usePathname();
  const searchParams = useSearchParams();

  function getValidVariationIndex(
    value: string | null,
    variations: Variations[]
  ): number {
    if (!value) return 0;

    const asIndex = parseInt(value);
    if (!isNaN(asIndex) && variations[asIndex]) return asIndex;

    const variationIndexById = variations.findIndex(v => v.id === value);
    if (variationIndexById !== -1) return variationIndexById;

    return 0;
  }

  function getValidImageIndex(
    value: string | null,
    images: string[]
  ): number {
    const asIndex = parseInt(value || '');
    if (!isNaN(asIndex) && images[asIndex]) return asIndex;

    return 0;
  }

  const variationSearchParam = searchParams.get('variation');
  const variationIndex = getValidVariationIndex(variationSearchParam, product.variations);
 
  const imageSearchParam = searchParams.get('image');
  const imageIndex = getValidImageIndex(imageSearchParam, product.variations[variationIndex].images);


  // const nextSearchParams = new URLSearchParams(searchParams.toString());
  // const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  // nextSearchParams.set('image', nextImageIndex.toString());
  // const nextUrl = createUrl(pathname, nextSearchParams);


  return (
    <div className="flex flex-row gap-3 items-start justify-center w-full max-w-[640px] my-5 max-[556px]:flex-col">
      <div className="flex flex-col w-full">
        <div className="bg-white flex items-center justify-center w-full h-[320px] max-h-[320px] rounded-3xl">
          {product.variations[variationIndex].images[imageIndex] && (
            <Image
              className="object-cover max-w-[100px] w-full"
              src={product.variations[variationIndex].images[imageIndex] as string}
              width={75}
              height={75}
              alt={product.name as string}
              quality={100}
            />
          )}
          

        </div>

        <div className="inline-flex flex-row flex-wrap w-full max-w-[290px]  gap-1 my-4">
        {product.variations[variationIndex].images.map((image, index) => {
          const isActive = index === imageIndex;
          const imageSearchParams = new URLSearchParams(searchParams.toString());
          imageSearchParams.set('image', index.toString());

          return(
            <Link
              key={index}
              aria-label="select image"
              href={createUrl(pathname, imageSearchParams)}
              scroll={false}
              className={`w-full max-w-[66px] flex justify-center overflow-hidden h-[66px] bg-white rounded-xl ${isActive && "border-2 border-darker"}`}
            >
              <Image
                className=" object-contain w-full max-w-[66px] pointer-none:*"
                src={image||""}
                width={70}
                height={70}
                alt={product.name as string}
                quality={10}
                // objectFit="contain"
              />
            </Link>
                  

          )
        })}
          
        
        </div>
      </div>

      <div className="flex flex-col bg-white w-full rounded-3xl p-4">
        <h1 className="text-dark-text text-xl font-medium">{product.name}</h1>

        <div className="flex text-sm my-2">
          <RatingStars rating={5} />5.0 (15635)
        </div>

        <div className="flex flex-col w-full py-5">
          <span className="font-medium">Variações</span>

          <div
            className="inline-flex flex-row flex-wrap w-full max-w-[290px] max gap-1 items-end py-2" 
          >
            {product.variations.map((variation, index) => {
              const isActive = index === variationIndex;
              const variationSearchParams = new URLSearchParams(searchParams.toString());
              variationSearchParams.set("variation", index.toString());
              variationSearchParams.set("image", "0");

              return(
                <Link
                  key={index}
                  aria-label="select variation"
                  href={createUrl(pathname, variationSearchParams)}
                  scroll={false}
                  className="flex flex-col max-w-[80px] items-center"
                >
                  <span
                    className='line-clamp-2 leading-4 text-center'
                  >
                    {variation.name}
                  </span>
                  <div
                    className={`flex w-[53px] h-[53px] rounded-xl overflow-hidden border ${
                      isActive ? "border-darker" : "border-[#DDDDDD]"
                    }`}
                  >
                    <Image
                      className="object-contain w-full max-w-[70px]"
                      src={variation.images[0] as string}
                      width={53}
                      height={53}
                      alt={variation.name}
                      quality={50}
                    />
                  </div>
                </Link>
              )
            }

            )}
          </div>

          <div className="text-dark-text font-bold text-lg my-5">
            R$ {product.variations[variationIndex].price}
          </div>

          <div className="w-full max-w-[265px] flex gap-1">
            <Button>Comprar</Button>
            <Button
              variant="secondary"
              customStyle="max-w-[40px] p-1"
              onClick={() => {
                console.log({
                ...product,
                variation: product.variations[variationIndex],
                quantity: 1
              })
                addProduct({
                ...product,
                variation: product.variations[variationIndex],
                quantity: 1
              })}
            }
            >
              <Image src="/icons/add-to-cart-icon.svg" width={25} height={25} alt="add to cart icon" />
            </Button>
            <Button variant="transparent" customStyle="max-w-[40px] text-2xl text-darker">
              <FontAwesomeIcon icon={emptyHeart} />
            </Button>
          </div>
        </div>

        <div className="w-full border-t-2 border-t-secondary-border pt-4">
          <p className="text-sm leading-4.5 text-dark-text">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
