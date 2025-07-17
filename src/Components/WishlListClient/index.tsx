"use client"

// Hooks
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Components
import Image from 'next/image';
import { Input } from '../ui/Input';
import { Product } from '../Product';

import { getFavoritesClientSide } from '@/lib/api/products';

// Types
import type { Product as ProductType } from "@/types/product";

const WishListClient = ({
  initialQuery,
  serverSearchResult,
}
:
{
  serverSearchResult: ProductType[] | null;
  initialQuery: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ search, setSearch ] = useState<string>(initialQuery);
  const [ searchResult , setSearchResult ] = useState<ProductType[] | null>(serverSearchResult);
  const [ debouncedSearch, setDebouncedSearch ] = useState<string>('');
  const [ loading, setLoading ] = useState(false);

  const handleClick = async() => {
    const favs = await getFavoritesClientSide("switch")
    console.log(favs)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setLoading(false)
    }, 500);

    return () => {
      
      clearTimeout(handler);
    };
  }, [search]);

    useEffect(() => {

      const searchProductsByText = async (text?:string) => {
        try{
          
          const result = await getFavoritesClientSide( text || undefined)
  
          setLoading(false)
          setSearchResult(result.map((product:ProductType) => ({
            ...product,
          })))
  
        }catch(error) {
          setLoading(false)
          console.log(error)
        }
      };

      setLoading(true)
      if (!debouncedSearch) {
        searchProductsByText()
        return;
      }
  
      const newParams = new URLSearchParams(searchParams.toString());
      console.log(initialQuery);
  
      if (search) newParams.set('q', search);
  
      else newParams.delete('q');
  
      router.push(`/wishlist?${newParams.toString()}`);
          
      searchProductsByText(debouncedSearch);
      
    }, [debouncedSearch]);

  const toggleFavorite = (product: ProductType, value: boolean) => {
    setSearchResult(searchResult!.filter((singleProduct) => singleProduct.id !== product.id ))
  }

  return (
    <div className=" flex flex-col justify-center items-center w-full h-full mt-7">
      {/*search input */}
      <div
        className="w-full max-w-[400px] relative my-6"
      >
        <Input

          type="text"
          value={search}
          placeholder="Pesquisar entre sua lista de desejos"
          inputClass="bg-[#e6e6e6] py-1.5 pl-9 text-dark-text"
          onChange={(e) => {
            setSearchResult(null)
            setLoading(true)
            setSearch(e.target.value)
          }}
        />
        <button
         className="absolute top-3 left-2"
        >
          <Image
            src="/icons/search-icon.svg"
            width={20}
            height={20}
            alt="Search icon"
          />
        </button>
      </div>

      {searchResult && searchResult.length > 0 && (
        <div
          className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-4"
        > 
          {searchResult.map((product, index) => (
            <Product
              key={index}
              data={product}
              rating={5}
              toggleFavorite={() => toggleFavorite(product, !product.favorite)}
            />
          ))}
        </div>
      )}

      {searchResult !== null && searchResult.length === 0 && (
        <div className="flex flex-col items-center text-gray-500 mt-10">
          <Image src="/illustrations/product-not-found-illustration.svg" alt="search icon" width={100} height={105.15} />
          <h2 className="mt-2 text-lg font-semibold text-center">Ops... nenhum produto encontrado</h2>
          <p className="mt-2 text-center">Digite algo para começar a pesquisar</p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="w-full max-w-[208px] h-[364px] bg-white rounded-xl shadow-sm animate-pulse"
            >
              <div className="w-full h-[208px] bg-gray-200 rounded-t-xl" />
              <div className="flex flex-col gap-2 p-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
                <div className="flex gap-2 mt-2">
                  <div className="h-8 w-16 bg-gray-200 rounded-xl" />
                  <div className="h-8 w-8 bg-gray-200 rounded-xl" />
                  <div className="h-8 w-8 bg-gray-200 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default WishListClient
