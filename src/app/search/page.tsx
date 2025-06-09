

import { searchProducts } from "@/lib/api/products";
import SearchClient from "@/Components/SearchClient";

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

export default async function Search({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}){

  const resolvedSearchParams = (await searchParams) ?? {};

  const query = resolvedSearchParams.q;

  let serverSearchResult: DatabaseProduct[] | null = null;

  if(query){
    serverSearchResult = await searchProducts(query);
  }

  return( 
    <div className=" flex flex-col justify-center items-center w-full h-full mt-7">
      <SearchClient initialQuery={query ?? ''} serverSearchResult={serverSearchResult}/>
    </div>
  )
}