

import { searchProducts } from "@/lib/api/products";
import SearchClient from "@/Components/SearchClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { getFavoriteProductsForUser } from "@/lib/api/server/products";
import { prisma } from "@/lib/prisma";

type DatabaseProduct = {
  id: string,
  name: string,
  slug: string,
  category: 'smartphone' | 'console' | 'smartwatch' | 'headphone';
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
  }[];
  favorite: boolean;
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

  const session = await getServerSession(authOptions);

  const user = session?.user
    ? await prisma.user.findUnique({ where: { email: session.user.email! } })
    : null;

  console.log(user);

  let favoriteProductIds: string[] = [];

  if (user) {

    const favorites = await getFavoriteProductsForUser(user.id);
    favoriteProductIds = favorites.map((fav) => fav.productId);

    if(serverSearchResult){
      serverSearchResult = serverSearchResult.map((product) => ({
        ...product,
        favorite: favoriteProductIds.includes(product.id),
      }));
    }
  }

  console.log(serverSearchResult);

  return( 
    <div className=" flex flex-col justify-center items-center w-full h-full mt-7">
      <SearchClient initialQuery={query ?? ''} serverSearchResult={serverSearchResult} favoriteProductIds={favoriteProductIds}/>
    </div>
  )
}