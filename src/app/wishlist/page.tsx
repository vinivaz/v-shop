"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { getFavoriteProducts } from "@/lib/api/products";
import { getFavoriteProductsForUser } from "@/lib/api/server/products";


export default async function WishList(){
  const session = await getServerSession(authOptions);
  const user = session?.user
    ? await prisma.user.findUnique({ where: { email: session.user.email! } })
    : null;
  
  const favoriteProducts = user ? await getFavoriteProductsForUser(user.id) : [];
  

  return(
    <div className=" flex flex-col justify-center items-center w-full h-full mt-7">
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
    </div>
  )
}