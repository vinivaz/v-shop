"use client";

// Hooks
import { useSession } from "next-auth/react";
import { useCheckoutStore } from "../../../store/checkoutStore";
import { useWarningMessageStore } from "../../../store/warningMessageStore";
import { useCartStore } from "../../../store/cartStore";

// Components
import { Button } from "../ui/Button";
import Image from "next/image";


import { registerOrder } from "@/lib/api/orders";

export const Checkout = () => {

  const { visible, products, hideCheckoutScreen } = useCheckoutStore()
  const { show: showWarningMessage, } = useWarningMessageStore()
  const { removeManyProducts } = useCartStore()

  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const handleFinishOrder = async() => {

    if(!isLoggedIn){
      showWarningMessage("Você não está logado.", "É necessário estar em um conta para finalizar um pedido");
      return;
    }

    
    const items = products.map((singleProduct) => ({
      productId: singleProduct.id,
      variationId: singleProduct.selectedVariation.id,
      quantity: singleProduct.selectedVariation.quantity,
      price: singleProduct.selectedVariation.price,
    }));

    try{

      const {error} = await registerOrder({ items });

      if(error){
        showWarningMessage("Algo deu errado", error);
        return;
      }

      hideCheckoutScreen()
      removeManyProducts(items)
      showWarningMessage("Seu pedido foi concluído.", "Agora a avaliação desses produtos será liberada, veja os detalhes em minhas compras.");

    }catch(err){
      console.log(err)
      showWarningMessage("Falha ao tentar fazer o pedido", "Houve um erro inesperado, por favor tente novamente.");
    }

  }

  if (!visible) return null;

  return (
   <div
      // className={visible && visible? "": "hidden" }
    >
      <div
        onClick={() => hideCheckoutScreen()}
        className={"z-10 fixed inset-0 bg-black/50"}
      >
      </div>
      <div
        className={`z-11 w-full  max-sm:w-11/12 max-w-[400px] flex flex-col p-5 bg-white rounded-3xl fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`}
      >
        <div
          className="relative"
        >
          <button
            className="absolute right-0"
            onClick={() => hideCheckoutScreen()}
          >
            <Image
              className="pointer-events-none"
              src="/icons/dark-close-icon.svg"
              height={17}
              width={17}
              alt="close icon"
            />
          </button>            
          
        </div>

        <h1 className="text-lg font-bold mb-6 text-center">Finalizar Compra</h1>
        
              <div className="pt-4">
                <h2 className="text-base font-medium mb-2">Resumo do Pedido</h2>
                {products.length === 0 ? (
                  <p>Carrinho vazio</p>
                ) : (
                  <ul className="space-y-2 max-h-[50vh] overflow-auto">
                    {products.map((product) => (
                      <li
                        key={product.id}
                        className="flex justify-between items-center gap-2 p-2 "
                      >
                        <div
                          className="flex flex-row gap-2 items-center"
                        >
                          <Image
                            src={product.selectedVariation.images[0]}
                            width={35}
                            height={35}
                            alt="Product image"
                            className="object-contain w-[35px] h-[35px]"
                          />
                          <div className="flex flex-col justify-center">
                            <span className="line-clamp-1 max-sm:text-xs">x{product.selectedVariation.quantity} {product.name}</span>
                            <span
                              className="whitespace-nowrap flex  items-center"
                            >
                              R$ {product.selectedVariation.price.toFixed()}
                            </span>
                          </div>
                        </div>
                      </li>    
                    ))}
                  </ul>
                )}
        
                <p
                  className="text-right"
                >
                  Calcular frete
                </p>
                
                <p className="mt-4 font-bold">Total: R$ </p>
              </div>
        
              <div  className="space-y-4 mb-10">
        
                <Button
                  onClick={handleFinishOrder}
                >
                  Confirmar Pedido
                </Button>
              </div>
      </div>  
    </div>
  )
} 