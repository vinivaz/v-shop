"use server"

// Components
import Image from "next/image";
import { getProducts, getFavoriteProducts } from "@/lib/api/products";
import { Hero } from "@/Components/Hero";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { getFavoriteProductsForUser } from "@/lib/api/server/products";
import { ProductSections } from "@/Components/ProductSections";


import type { Product as ProductType } from "@/types/product";


type FirstPageProps = {
  smartphone: ProductType[],
  console: ProductType[],
  smartwatch: ProductType[],
  headphone: ProductType[]
}

export default async function Home() {
  const products : ProductType[] = await getProducts()

  const session = await getServerSession(authOptions);
  const user = session?.user
    ? await prisma.user.findUnique({ where: { email: session.user.email! } })
    : null;

  let favoriteProductIds: string[] = [];

  if (user) {
    const favorites = await getFavoriteProductsForUser(user.id);
    favoriteProductIds = favorites.map((fav) => fav.productId);
  }

  const enrichedProducts = products.map((product) => ({
    ...product,
    favorite: favoriteProductIds.includes(product.id),
  }));

  const productsGroupedByCategory = {
    smartphone:  enrichedProducts.filter(product => product.category === "smartphone"),
    console:  enrichedProducts.filter(product => product.category === "console"),
    smartwatch:  enrichedProducts.filter(product => product.category === "smartwatch"),
    headphone:  enrichedProducts.filter(product => product.category === "headphone")
  }
  // const favoriteProducts = user ? await getFavoriteProductsForUser(user.id) : [];

  // console.log(favoriteProducts)
  return (
    <>
      <Hero/>
      <div
        className="w-full flex flex-row justify-between my-5"
      >
        <Link
          href="/search?q=console"
        >
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/videogames-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </Link>

        <Link
          href="/search?q=smartphone"
        >
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/smartphones-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </Link>
        <Link
          href="/search?q=smartwatch"
        >
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/watches-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </Link>
        <Link
          href="/search?q=headphone"
        >
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/headphones-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </Link>
      </div>
      <ProductSections products={productsGroupedByCategory}/>
    </>

  );
}




