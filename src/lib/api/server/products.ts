import { prisma } from "@/lib/prisma";

import { headers } from "next/headers";

const rootURL = process.env.NEXT_PUBLIC_URL;

export async function getFavoriteProductsForUser(userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    include: {  
      product: {
        include: {
          variations: true,
        },
      },
    },
  });
}

export async function getFavoriteProductsBySearch(userId: string, search: string) {
  return await prisma.favorite.findMany({
    where: {
      userId,
      product: {
        OR: [
          {
            name: { contains: search, mode: 'insensitive' },
          },
          {
            category: { contains: search, mode: 'insensitive' },
          },
        ],
      },
    },
    include: {  
      product: {
        include: {
          variations: true,
        },
      },
    },
  });
}


export async function getFavoritesServerSide(term?: string) {
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  const query = term ? `?q=${encodeURIComponent(term)}` : '';

  const res = await fetch(`${rootURL}/api/products/favorites${query}`, {
    headers: { Cookie: cookie ?? "" },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao buscar favoritos");
  return res.json();
}

export async function getProductBySlugServerSide(slug: string) {
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  const res = await fetch(`${rootURL}/api/products/${slug}`, {
    headers: { Cookie: cookie ?? "" },
    cache: "no-cache"
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}