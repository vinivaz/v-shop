"use server"

import { headers } from "next/headers";
import { fetchWithHandler } from "@/lib/fetchWithHandler";

// Types
import type { OrderType } from "@/types/order";


const rootURL = process.env.NEXT_PUBLIC_URL;

export async function getOrders() {

  const headersList = await headers();
  const cookie = headersList.get("cookie");

  return await fetchWithHandler<OrderType[]>(`${rootURL}/api/orders`,{
    headers: { Cookie: cookie ?? "" },
    cache: "no-store",
  });
}

