"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { getFavoriteProducts } from "@/lib/api/products";
import { getFavoriteProductsForUser } from "@/lib/api/server/products";
import { getFavoritesServerSide } from "@/lib/api/server/products";

// Components
import WishListClient from "@/app/wishlist/Components/WishListClient";

export default async function WishList({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}){

  const resolvedSearchParams = (await searchParams) ?? {};

  const query = resolvedSearchParams.q;

  const favs = await getFavoritesServerSide(query || undefined)
  console.log(favs)

  return(
    <div className=" flex flex-col justify-center items-center w-full h-full mt-7">
      <WishListClient serverSearchResult={favs} initialQuery={query ?? ''}/>
    </div>
  )
}