"use client"

// Components
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import { QuantityInput } from "../../Components/ui/QuantityInput";
import { SelectOptions } from "../../Components/ui/SelectOptions";
import Image from "next/image";
import Link from "next/link";

// Hooks
import { useCartStore } from "../../../store/cartStore";
import { useState, useEffect } from "react";
import Modal from "../../Components/Modal";

import { useSession, signIn, signOut } from 'next-auth/react';



// import { getProducts } from "@/lib/api/products";

type CartVariation = {
  id: string;
  main: boolean;
  name: string;
  stock: number;
  price: number;
  images: string[];
  productId: string;
  quantity: number;
};

type CartProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  selectedVariation: CartVariation;
  variations: CartVariation[];
}

type changingProductVariationProp = {
  prevProductId: string;
  prevVariationId: string;
  product: CartProduct;
}

export default function Cart(){
  const { products, changeProductVariation, updateProduct, removeProduct, clearCart } = useCartStore();
  const [ isActive, setIsActive ] = useState<boolean>(false);
  const [ showing, setShowing ] = useState(false);
  const [ selectingProductVariation, setSelectingProductVariation ] = useState<changingProductVariationProp|null>(null)

  const getVariations = (productId: string) => {

  }

  return(
    <div
      className="w-full h-full max-w-[1000px]"
    >
      <div
        className="w-full flex flex-row items-start justify-center gap-3 py-5 max-md:px-2 max-md:pt-[45px] max-md:py-0 max-md:bg-void max-md:h-screen max-md:fixed top-0 left-0 max-md:gap-0 max-md:flex-col"
      >
        <div
          className="w-full flex flex-col h-full max-md:h-[calc(100%-147px)]"
        >
          <div
            className="w-full flex justify-between items-end"
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

            {products.length > 0 && <Button
              onClick={() => clearCart()}
              variant="transparent"
              customStyle="w-auto text-sm font-semibold text-darker-text mt-0"
            >
              Limpar
            </Button>}
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
                    href={`products/${product.slug}?variation=${product.selectedVariation.id}`}
                    className="w-[90px] h-[90px] bg-input-background rounded-xl flex items-center justify-center max-sm:w-[80px] max-sm:h-[80px]"
                  >
                    <Image
                      className="object-contain w-2/3 h-11/12"
                      src={product.selectedVariation.images[0] as string}
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
                      href={`products/${product.slug}?variation=${product.selectedVariation.id}`}
                      className=" text-sm font-medium leading-4 line-clamp-2 max-sm:text-xs"
                    >
                      {product.name}
                    </Link>
                    
                    <div>
                      
                      <Button
                        onClick={() => {
                          setShowing(true)
                          console.log(product)
                          setSelectingProductVariation({
                            prevProductId:product.id,
                            prevVariationId: product.selectedVariation.id,
                            product
                          })
                        }}
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

                  </div>
                  <div className="flex flex-col justify-between flex-nowrap text-nowrap items-center h-[90px] max-w-[100px] max-[860px]:h-auto">
                    <span
                      className="text-sm font-medium max-[860px]:showing"
                    >
                      Preço
                    </span>
                    <span
                      className="text-sm font-medium"
                    >
                      R$ {product.selectedVariation.price}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between items-center h-[90px] max-w-[100px] max-[860px]:h-auto max-[860px]:absolute -right-8 -bottom-3">
                    <span
                      className="text-sm font-medium max-[860px]:showing"
                    >
                      Quantidade
                    </span>
                    <QuantityInput
                      onValueChange={(value) => updateProduct({
                        ...product,
                        selectedVariation: {
                          ...product.selectedVariation,
                          quantity: value
                        }
                      })}
                      value={product.selectedVariation.quantity}
                      stock={product.selectedVariation.stock}
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
                      onClick={() => removeProduct(product.id, product.selectedVariation.id)}
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
            <Button
              onClick={() => signIn("google")}
            >
              Finalizar Compra
            </Button>
          </div>
        </div>
      </div>
      {selectingProductVariation && (
      <Modal
        showing={showing}
        setShowing={setShowing}
      >
        
          <div
            className="w-full"
          >
            <h2
              className="font-bold text-lg"
            >
              Escolha a variação
            </h2>
            
            <div
              className="flex flex-row w-full justify-between"
            >
              <div
                className="flex py-2 gap-1 items-center w-full"
              >
                <div
                  className="w-[60px] h-[60px] rounded-2xl"
                >
                  <Image
                    className="object-contain w-full h-full"
                    src={selectingProductVariation?.product.selectedVariation?.images[0]|| ""}
                    width={45}
                    height={45}
                    alt="variation picture"
                  />
                </div>
                <div>
                  <h2
                    className="text-base font-medium leading-4 line-clamp-2 max-sm:text-sm"
                  >
                    {selectingProductVariation.product.selectedVariation.name}
                  </h2>
                  <p
                    className="text-base font-semibold"
                  >
                    R$ {selectingProductVariation?.product.selectedVariation?.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between items-center  max-w-[100px] max-[860px]:h-auto">
                <span
                  className="text-sm font-medium max-[860px]:showing"
                >
                  Quantidade
                </span>
                <QuantityInput
                  onValueChange={(value) => setSelectingProductVariation({
                    ...selectingProductVariation,
                    product: {

                      ...selectingProductVariation.product,
                      selectedVariation: {
                        ...selectingProductVariation.product.selectedVariation,
                        quantity: value
                      }
                    }
       
                  })}
                  value={selectingProductVariation.product.selectedVariation.quantity}
                  stock={selectingProductVariation.product.selectedVariation.stock}
                />
              </div>
            </div>
            <div
              className="inline-flex flex-row flex-wrap w-full  gap-1 my-4 border-1 border-[#ddd] p-2 rounded-xl"
            >
              {selectingProductVariation.product?.variations?.map((singleVariation) => (
                <div
                  key={singleVariation.id}
                  className={`flex w-[50px] h-[50px] rounded-xl overflow-hidden
                    ${selectingProductVariation.product.selectedVariation.id === singleVariation.id? "border-3 border-fading-text": ""
                  }`}
                  onClick={() => setSelectingProductVariation(({
                    ...selectingProductVariation,
                    product: {
                      ...selectingProductVariation.product,
                      selectedVariation:{
                        ...singleVariation,
                        quantity: 1
                      }
                    }
                  }))}
                >
                  <Image
                    className="object-contain w-full h-full"
                    src={singleVariation.images[0]|| ""}
                    width={45}
                    height={45}
                    alt="variation picture"
                  />
                </div>
              ))}

            </div>

            <Button
              onClick={() => {
                // console.log((selectingProductVariation))
                changeProductVariation(selectingProductVariation)
                setSelectingProductVariation(null)
              }}
            >
              Concluir
            </Button>
          </div>
       

      </Modal> )}
    </div>
  )
}