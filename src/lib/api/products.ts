// import { headers } from "next/headers";

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

const rootURL = process.env.NEXT_PUBLIC_URL;

export async function searchProducts(term: string) {
  const res = await fetch(`${rootURL}/api/products/search?q=${encodeURIComponent(term)}`);
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
}

export async function getProductBySlug(slug: string) {

  const res = await fetch(`${rootURL}/api/products/${slug}`, {

    cache: "no-cache"
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export async function getProducts() {

  const res = await fetch(`${rootURL}/api/products`, {
    next: { revalidate: 60 },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export async function registerProduct(data: ReadyData) {
  return await fetch(`${rootURL}/api/products`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


export async function getFavoriteProducts() {
  const res = await fetch(`${rootURL}/api/products/favorites`);
  return res.json();
};

export async function getFavoritesClientSide(term?: string) {
  const query = term ? `?q=${encodeURIComponent(term)}` : '';

  const res = await fetch(`/api/products/favorites${query}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao buscar favoritos");
  return res.json();
}

// export async function getFavoriteProducts() {
//   const headersList = await headers();
//   const cookie = headersList.get("cookie");
  
//   const res = await fetch(`${rootURL}/api/products/favorites`);
//   return res.json();
// };


export async function setFavoriteProduct(productId: string) {
  const res = await fetch(`${rootURL}/api/products/favorites`, {
    method: 'POST',
    body: JSON.stringify({productId}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

export async function unsetFavoriteProduct(productId: string) {
  const res = await fetch(`${rootURL}/api/products/favorites`, {
    method: 'DELETE',
    body: JSON.stringify({productId}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};