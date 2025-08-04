"use client";

import { fetchWithHandler } from "../fetchWithHandler";

type OrderItem = {
  productId: string;
  variationId: string;
  quantity: number;
  price: number;
}

type NewOrdertype = {
  id: string;
  createdAt: Date;
  userId: string;
  totalPrice: number;
}



const rootURL = process.env.NEXT_PUBLIC_URL;


export async function registerOrder(data: {items: OrderItem[]}) {
  return  await fetchWithHandler<NewOrdertype>(`${rootURL}/api/orders`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
