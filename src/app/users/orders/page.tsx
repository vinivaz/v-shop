"use server"

import { getOrders } from "@/lib/api/server/orders";
import Image from "next/image";

import type { OrderType } from "@/types/order";

export default async function Orders () {
  const orders: OrderType[] = await getOrders()
  console.log(orders)


  return (
  <div
    className="flex flex-col w-full "
  >
    <h1
      className="text-lg font-bold text-dark-text mt-4 text-left"
    >
      Minhas Compras
    </h1>

    <div className="w-full flex flex-col justify-center">
      {orders.map((order) => (
        <div
          className="p-3 my-1"
        >
          <span
            className="font-semibold text-lighter"
          >
            Efetuada no dia 9, sex
          </span>
          <div
            className="bg-white rounded-xl"
          >
          {order.items.map((item) => (

            <div
              className="flex justify-between items-center gap-2 p-2 "
            >
              <div
                className="flex flex-row gap-2 items-center"
              >
                <Image
                  src={item.variation.images[0]}
                  width={35}
                  height={35}
                  alt="Product image"
                  className="object-contain w-[35px] h-[35px]"
                />
                <div className="flex flex-col justify-center">
                  <span className="line-clamp-1 max-sm:text-xs">{item.product.name}</span>
                  <span
                    className="whitespace-nowrap flex  items-center"
                  >
                    R$ {item.price.toFixed()}
                  </span>
                </div>

              </div>

              <div
                className="flex justify-center items-center h-full"
              >
                <span
                className="whitespace-nowrap flex items-center"
                >
                  x{item.quantity}
                </span>
              </div>
            </div>    
         
          ))}
          </div>   

          <span
            className="text-sm font-semibold text-fading-text"
          >
            Agora você pode avaliar esses produtos.
          </span>
        </div>
      ))}
    </div>

  </div>
  )
}