"use client"

type OrderItem = {
  productId: string;
  variationId: string;
  quantity: number;
  price: number;
}

const rootURL = process.env.NEXT_PUBLIC_URL;


export async function registerOrder(data: {items: OrderItem[]}) {
  const newOrder =  await fetch(`${rootURL}/api/orders`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(newOrder)
  if (!newOrder.ok) throw new Error('Erro ao registrar pedidos');

  return newOrder.json();
}


// export async function getProductBySlug(slug: string) {

//   const res = await fetch(`${rootURL}/api/products/${slug}`, {

//     cache: "no-cache"
//   });

//   if (!res.ok) {
//     throw new Error("Erro ao buscar produtos");
//   }

//   return res.json();
// }

// export async function getProducts() {

//   console.log(rootURL)
//   const res = await fetch(`${rootURL}/api/products`, {
//     next: { revalidate: 60 },
//     cache: "force-cache",
//   });

//   console.log(res)
//   if (!res.ok) {
//     throw new Error("Erro ao buscar produtos");
//   }

//   return res.json();
// }

// export async function registerProduct(data: ReadyData) {
//   return await fetch(`${rootURL}/api/products`, {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }


// export async function getFavoriteProducts() {
//   const res = await fetch(`${rootURL}/api/products/favorites`);
//   return res.json();
// };

// export async function getFavoritesClientSide(term?: string) {
//   const query = term ? `?q=${encodeURIComponent(term)}` : '';

//   const res = await fetch(`/api/products/favorites${query}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) throw new Error("Erro ao buscar favoritos");
//   return res.json();
// }


// export async function setFavoriteProduct(productId: string) {
//   const res = await fetch(`${rootURL}/api/products/favorites`, {
//     method: 'POST',
//     body: JSON.stringify({productId}),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   return res.json();
// };

// export async function unsetFavoriteProduct(productId: string) {
//   const res = await fetch(`${rootURL}/api/products/favorites`, {
//     method: 'DELETE',
//     body: JSON.stringify({productId}),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   return res.json();
// };