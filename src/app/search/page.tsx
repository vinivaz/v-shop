

import { searchProducts } from "@/lib/api/products";
import SearchClient from "@/app/search/Components/SearchClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { getFavoriteProductsForUser } from "@/lib/api/server/products";
import { prisma } from "@/lib/prisma";


import type { Product as DatabaseProduct } from "@/types/product";



async function getServerSearchResult(query?: string) {
  if (!query) return null;

  const { data, error } = await searchProducts(query);
  if (error) throw new Error("Erro ao buscar produtos.");
  return data!;
}

export default async function Search({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}){

  const resolvedSearchParams = (await searchParams) ?? {};

  const query = resolvedSearchParams.q;

  let serverSearchResult : DatabaseProduct[] | null = await getServerSearchResult(query);

  const session = await getServerSession(authOptions);

  const user = session?.user
    ? await prisma.user.findUnique({ where: { email: session.user.email! }, omit: {password: true, passwordResetToken: true} })
    : null;

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



  return( 
    <div className=" flex flex-col justify-center items-center w-full h-full mt-7">
      <SearchClient initialQuery={query ?? ''} serverSearchResult={serverSearchResult} favoriteProductIds={favoriteProductIds}/>
    </div>
  )
}