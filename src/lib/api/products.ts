// import { headers } from "next/headers";


import { error } from "console";
import { fetchWithHandler } from "@/lib/fetchWithHandler";

import type { CartProduct } from "@/types/cart";
import type { Product as ProductType } from "@/types/product";
type ReadyData = {
  name: string;
  category: string;
  description: string;
  mainImage?: string;
  variations: {
    main: boolean;
    name: string;
    stock: string;
    price: string;
    images: string[];
  }[]
}

type ProductRegister =  {
  id: string;
  name: string;
  slug: string | null;
  description: string;
  category: string;
  mainImage: string | null;
  createdAt: Date;
};

type FavoriteType = {
  id: string;
  createdAt: Date;
  productId: string;
  userId: string;
}



const rootURL = process.env.NEXT_PUBLIC_URL;


export async function searchProducts(term: string) {
  return await fetchWithHandler<ProductType[]>(
    `${rootURL}/api/products/search?q=${encodeURIComponent(term)}`
  );
}


export async function getProducts(){

  return await fetchWithHandler<ProductType[]>(
    `${rootURL}/api/products`,
    {
      cache: "force-cache",
      next: { revalidate: 60 },
    }
  );
}

export async function getProductsToSyncInCart(productsFromCart: CartProduct[]) {

  return await fetchWithHandler<ProductType[]>(
    "/api/products/cart",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: productsFromCart.map(p => ({
          productId: p.id,
        }))
      })
    }
  );
}

export async function registerProduct(data: ReadyData) {
  return await fetchWithHandler<ProductRegister>(`${rootURL}/api/products`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


export async function getFavoritesClientSide(term?: string) {
  const query = term ? `?q=${encodeURIComponent(term)}` : '';

  return await fetchWithHandler<ProductType[]>(`/api/products/favorites${query}`, {
    cache: "no-store",
  });
}


export async function setFavoriteProduct(productId: string) {
  return await fetchWithHandler<FavoriteType>(`${rootURL}/api/products/favorites`, {
    method: 'POST',
    body: JSON.stringify({productId}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function unsetFavoriteProduct(productId: string) {
 return await fetchWithHandler<undefined>(`${rootURL}/api/products/favorites`, {
    method: 'DELETE',
    body: JSON.stringify({productId}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};