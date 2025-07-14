"use server"

// Components
import Image from "next/image";
import { RatingStars } from "@/Components/RatingStars";
import { Product } from "@/Components/Product";
import { Container } from "@/Components/ui/Container";
import { Carousel } from "@/Components/Carousel";
import { getProducts, getFavoriteProducts } from "@/lib/api/products";
import { Hero } from "@/Components/Hero";


import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { getFavoriteProductsForUser } from "@/lib/api/server/products";
import { ProductSections } from "@/Components/ProductSections";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

type Variation = {
  productId: string;
  id: string;
  main: boolean;
  name: string,
  stock: number
  price: number;
  images: string[]
}

type Product = {
  id: string,
  name: string,
  slug: string,
  category: string,
  description: string,
  mainImage?: string,
  variations: Variation[]
}

type FavoriteProduct = {
  id: string;
  createdAt: Date;
  productId: string;
  userId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    mainImage: string;
    createdAt: Date;
  };
}

type FirstPageProps = {
  smartphone: Product[],
  console: Product[],
  smartwatch: Product[],
  headphone: Product[]
}

export default async function Home() {
  const products : Product[] = await getProducts()

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
        <div
          className=""
        >
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/videogames-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </div>

        <div>
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/smartphones-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </div>
        <div>
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/watches-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </div>
        <div>
          <Image
            className="object-contain w-full max-w-52 rounded-3xl"
            src="/ad/headphones-mini-ad-background.png"
            width={259.82}
            height={222.41}
            quality={100}
            alt="mini ad background image"
          />
        </div>
      </div>
      <ProductSections products={productsGroupedByCategory}/>

      {/* <div
        className="w-full my-8 "
      >
        <div
          className="w-full h-full flex flex-col "
        >
          <h3 className="font-medium text-lg py-5">
            <Image
              src="/icons/smartphones-section-icon.svg"
              width={135.5}
              height={35.53}
              alt="Smartphones section icon"
            />
          </h3>
          <Carousel products={products.smartphones}/>
        </div>

        <div
          className="w-full h-full flex flex-col "
        >
          <h3 className="font-medium text-lg py-5">
            <Image
              src="/icons/videogames-section-icon.svg"
              width={129.52}
              height={35.53}
              alt="Videogames section icon"
            />
          </h3>
          <Carousel products={products.consoles}/>
        </div>
        <div
          className="w-full h-full flex flex-col "
        >
          <h3 className="font-medium text-lg py-5">
            <Image
              src="/icons/smartwatches-section-icon.svg"
              width={145.43}
              height={35.53}
              alt="Smartwatches section icon"
            />
          </h3>
          <Carousel products={products.smartwatches}/>
        </div>

        <div
          className="w-full h-full flex flex-col "
        >
          <h3 className="font-medium text-lg py-5">
            <Image
              src="/icons/headphones-section-icon.svg"
              width={127.6}
              height={35.53}
              alt="Headphones section icon"
            />
          </h3>
          <Carousel products={products.headphones}/>
        </div>
      </div> */}
    </>

  );
}




