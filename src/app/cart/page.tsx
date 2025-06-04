"use client"

// Components
import { Input } from "../Components/ui/Input";
import { Button } from "../Components/ui/Button";
import { QuantityInput } from "../Components/ui/QuantityInput";
import { SelectOptions } from "../Components/ui/SelectOptions";
import Image from "next/image";
import Link from "next/link";

// Hooks
import { useCartStore } from "../../../store/cartStore";
import { useState } from "react";

// import { getProducts } from "@/lib/api/products";

export default function Cart(){
  const { products, updateProduct, removeProduct } = useCartStore();
  const [ isActive, setIsActive ] = useState<boolean>(false)

  return(
    <div
      className="w-full h-full max-w-[1000px]"
    >
      <div
        className="w-full flex flex-row items-start justify-center gap-3 py-5 max-md:px-2 max-md:pt-[45px] max-md:py-0 max-md:bg-void max-md:h-screen max-md:absolute top-0 left-0 max-md:gap-0 max-md:flex-col"
      >
        <div
          className="w-full flex flex-col h-full max-md:h-[calc(100%-147px)]"
        >
          <div
            className="w-full my-2"
          >
            <h1
              className="text-lg font-bold text-dark-text max-[500px]:text-base"
            >
              Carrinho de Compras
            </h1>
            <p
              className="text-dark-text text-sm"
            >{products.length} itens no carrinho</p>
          </div>

          <div
            className="w-full min-md:h-[calc(100vh-150px)] flex flex-col overflow-auto gap-y-2 max-md:pb-1"
          >
            {products && products.map((product, index) => (
              <div
                key={index}
                className="w-full bg-white flex shrink-0 h-[141px] flex-row rounded-3xl items-center justify-evenly px-2 gap-2 max-sm:h-[120px]"
              >
                <div
                  className="flex items-center gap-2 w-full max-w-[111px] max-md:max-w-[111px] max-sm:max-w-[97px] max-sm:gap-1"
                >
                  <Input type="checkbox" containerClass="w-auto" />
                  <Link
                    href={`products/${product.slug}?variation=${product.variation.id}`}
                    className="w-[90px] h-[90px] bg-input-background rounded-xl flex items-center justify-center max-sm:w-[80px] max-sm:h-[80px]"
                  >
                    <Image
                      className="object-contain w-2/3 "
                      src={product.variation.images[0] as string}
                      width={75}
                      height={75}
                      alt={product.name as string}
                      quality={100}
                    />
                  </Link>
                </div>
                <div
                  className="relative flex w-full max-w-[480px] gap-2 justify-between max-[860px]:flex-col max-[860px]:items-start  max-[860px]:justify-center max-sm:gap-0"
                >
                  <div className="flex flex-col justify-between min-[860px]:h-[90px] min:[860px]:max-w-[200px] max-[860px]:justify-center">
                    <Link
                      href={`products/${product.slug}?variation=${product.variation.id}`}
                      className=" text-sm font-medium leading-4 line-clamp-2 max-sm:text-xs"
                    >
                      {product.name}
                    </Link>

                    <Button
                      variant="secondary"
                      customStyle="border-1 py-0 px-1 max-w-[90px] rounded-lg mt-1 max-sm:px-0.2"
                    >
                      <Image
                        src="/icons/variations-icon.svg"
                        width={25}
                        height={25}
                        alt="variations icon" 
                      />
                      <span
                        className="text-sm max-sm:text-xs"
                      >
                        Variações
                      </span>
                    </Button>
                  </div>
                  <div className="flex flex-col justify-between flex-nowrap text-nowrap items-center h-[90px] max-w-[100px] max-[860px]:h-auto">
                    <span
                      className="text-sm font-medium max-[860px]:hidden"
                    >
                      Preço
                    </span>
                    <span
                      className="text-sm font-medium"
                    >
                      R$ {product.variation.price}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between items-center h-[90px] max-w-[100px] max-[860px]:h-auto max-[860px]:absolute -right-8 -bottom-3">
                    <span
                      className="text-sm font-medium max-[860px]:hidden"
                    >
                      Quantidade
                    </span>
                    <QuantityInput
                      onValueChange={(value) => updateProduct({
                        ...product,
                        quantity: value
                      })}
                      value={product.quantity}
                      stock={product.variation.stock}
                    />
                  </div>
                </div>
                <div
                  className="relative w-full max-w-[75px] max-[660px]:max-w-[30px]"
                >
                  <div
                    className="relative"
                  >
                    <button
                      className="absolute right-2 -top-13"
                      onClick={() => removeProduct(product.id)}
                    >
                      <Image
                        className="pointer-events-none"
                        src="/icons/dark-close-icon.svg"
                        height={15}
                        width={15}
                        alt="close icon"/>
                    </button>
                  </div>
                </div>
              </div>            
            ))}
          </div>

        </div>
        <div
          className="w-full min-md:max-w-[260px] min-md:mt-15 bg-white rounded-3xl py-3 px-5 "
        >
          <div>
              <div
                className="min-md:hidden relative"
              >
                <Button
                  variant="secondary"
                  className="absolute right-0"
                  onClick={() => setIsActive(true)}
                >
                  Calcular frete
                </Button>
              </div>
            <div
              onClick={() => setIsActive(false)}
              className={isActive? "max-md:absolute inset-0 bg-black/50": "hidden"}
            ></div>
            <div
              className={`w-full flex flex-col max-md:p-5 max-md:max-w-11/12 max-md:absolute top-1/2 left-1/2 max-md:translate-x-[-50%] max-md:translate-y-[-50%]  ${isActive? "bg-white rounded-3xl": "max-md:hidden"}`}
            >
              <h2
                className="font-bold text-lg"
              >
                Calcular Frete
              </h2>
              <div
                className="min-md:hidden relative"
              >
                <button
                  className="absolute right-0 -top-7"
                  onClick={() => setIsActive(false)}
                >
                  <Image
                    className="pointer-events-none"
                    src="/icons/dark-close-icon.svg"
                    height={17}
                    width={17}
                    alt="close icon"/>
                </button>
              </div>
              <div
                className=" min-md:border-b-2 pb-5 border-b-fading-text"
              >
                <SelectOptions
                  label="País"
                >

                </SelectOptions>

                <SelectOptions
                  label="Estado"
                >
                  
                </SelectOptions>
                <div
                  className="flex flex-row items-center gap-2"
                >
                  <SelectOptions
                    label="Cidade"
                  >
                    
                  </SelectOptions>
                  <Input
                    placeholder="CEP"
                    type="text"
                    label="Digite o CEP"
                  />
                </div>
                <Button>
                  Calcular
                </Button>
              </div>

              
            </div>            
          </div>

          <div className="w-full">
            <h2
              className="text-sm font-semibold"
            >
              Total
            </h2>
            <p
              className="text-sm"
            >
              frete: 0
            </p>
            <p
              className="text-sm"
            >
              produtos do carrinho: 0
            </p>
            <Button>
              Finalizar Compra
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}