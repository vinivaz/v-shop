"use client"

// Hooks
import { useState, useEffect } from "react";

// Components
import { Input } from "@/Components/ui/Input";
import Image from "next/image";
import { Product } from "@/Components/Product";

import { searchProducts } from "@/lib/api/products";

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

export default function Search(){
  const [ search, setSearch ] = useState<string>("")


  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const [ searchResult, setSearchResult ] = useState<DatabaseProduct[] | null>(null)
  const [loading, setLoading] = useState(false);

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
    if (!debouncedSearch) return;
    setLoading(true)
    
    const searchProductsByText = async () => {
      try{
        
        const result = await searchProducts(debouncedSearch)
        console.log(result)
        setLoading(false)
        setSearchResult(result)
      }catch(error) {
        setLoading(false)
        console.log(error)
      }
    }

    searchProductsByText()
    

  }, [debouncedSearch]);

  return(
    <div className=" flex flex-col justify-center items-center w-full h-full mt-7">

      {/*search input */}
      <div
        className="w-full max-w-[400px] relative my-6"
      >
        <Input
          type="text"
          value={search}
          inputClass="bg-[#e6e6e6] py-1.5 pl-9"
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

      {search === "" && !loading && (
        <div className="flex flex-col items-center text-gray-500 mt-10">
          <Image src="/illustrations/search-illustration.svg" alt="search icon" width={205.66} height={119} />
          <h2 className="mt-2 text-lg font-semibold text-center">Procure por algum de nossos produtos!</h2>
          <p className="mt-2 text-center">Digite algo para começar a pesquisar</p>
        </div>
      )}

      {searchResult && searchResult.length > 0 && (
        <div
          className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-4"
        > 
          {searchResult.map((product, index) => (
            <Product key={index} data={product} rating={5}/>
          ))}
        </div>
      )}

      {searchResult && searchResult.length === 0 && (
        <div className="flex flex-col items-center text-gray-500 mt-10">
          <Image src="/illustrations/product-not-found-illustration.svg" alt="search icon" width={205.66} height={119} />
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