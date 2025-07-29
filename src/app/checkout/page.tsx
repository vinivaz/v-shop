"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "../../../store/cartStore";
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import Image from "next/image";

export default function CheckoutPage() {
  const { products, clearCart } = useCartStore();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const total = products.reduce(
    (acc, product) => acc + (product.selectedVariation.price * product.selectedVariation.quantity),
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode simular o envio ou salvar no localStorage
    clearCart();
    router.push("/checkout/confirmed");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-white my-5 rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>

      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-2">Resumo do Pedido</h2>
        {products.length === 0 ? (
          <p>Carrinho vazio</p>
        ) : (
          <ul className="space-y-2 overflow-auto">
            {products.map((product) => (
              <li
                key={product.id + product.selectedVariation.id}
                className="flex justify-between items-center gap-2 bg-white p-2 rounded-xl"
              >
                <div
                  className="flex flex-row gap-2 "
                >
                  <Image
                    src={"/products/iphone16e.png"}
                    width={35}
                    height={35}
                    alt="Product image"
                  />
                  <span className="line-clamp-1 max-sm:text-xs">{product.name}</span>
                  <span>
                   x{" "}
                    {product.selectedVariation.quantity}
                  </span>
                </div>

                <div>
                  <span>
                    R$ {product.selectedVariation.price * product.selectedVariation.quantity}
                  </span>
                </div>

              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 font-bold">Total: R$ {total}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <Button type="submit">Confirmar Pedido</Button>
      </form>


    </div>
  );
}
