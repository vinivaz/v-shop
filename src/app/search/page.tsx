"use client"

// Hooks
import { useState, useEffect } from "react";

// Components
import { Input } from "../Components/ui/Input";
import Image from "next/image";
import { Product } from "../Components/Product";

import { searchProducts } from "@/lib/api/products";


export default function Search(){
  const [ search, setSearch ] = useState<string>("")


  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const [ searchResult, setSearchResult ] = useState([])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // Espera 500ms após o último caractere digitado

    return () => {
      clearTimeout(handler); // Limpa se o usuário continuar digitando
    };
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch) return;
    
    const searchProductsByText = async () => {
      try{
        const result = await searchProducts(debouncedSearch)
        console.log(result)
        setSearchResult(result)
      }catch(error) {
        console.log(error)
      }
    }

    searchProductsByText()
    

  }, [debouncedSearch]);

  return(
    <div className=" flex flex-col justify-center items-center w-full h-full mt-7">

      {/*search input */}
      <div
        className="w-full max-w-[400px] relative"
      >
        <Input
          type="text"
          value={search}
          inputClass="bg-[#e6e6e6] py-1.5 pl-9"
          onChange={(e) => setSearch(e.target.value)}
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
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        {searchResult && searchResult.length > 0 && searchResult.map((product, index) => (
          <Product key={index} data={product} rating={5}/>
        ))}
      </div>
    </div>
  )
}