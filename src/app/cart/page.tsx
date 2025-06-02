"use client"
import { Carousel } from "../Components/Carousel";
import { getProducts } from "@/lib/api/products";
import { Input } from "../Components/ui/Input";
import { Button } from "../Components/ui/Button";
import Image from "next/image";
import { QuantityInput } from "../Components/ui/QuantityInput";
import { useCartStore } from "../../../store/cartStore";
import Link from "next/link";
import { SelectOptions } from "../Components/ui/SelectOptions";


export default function Cart(){
  const { products, addProduct, updateProduct, removeProduct } = useCartStore();

  return(
    <div
      className=" w-full h-full max-w-[1000px] flex flex-row items-center justify-center gap-5 py-5"
    >
      <div
        className="w-full flex flex-col h-[550px]"
      >
        <div
          className="w-full my-2"
        >
          <h1
            className="text-lg font-bold text-dark-text"
          >
            Carrinho de Compras
          </h1>
          <p
            className="text-dark-text text-sm"
          >{products.length} itens no carrinho</p>
        </div>

        <div
          className="w-full max-h-[450px] flex flex-col overflow-auto gap-y-2"
        >
          {products && products.map((product, index) => (
            <div
              key={index}
              className="w-full h-[141px] bg-white flex shrink-0 flex-row rounded-3xl items-center justify-evenly px-2 gap-2"
            >
              <Input type="checkbox" containerClass="w-auto" />
              <Link
                href={`products/${product.slug}?variation=${product.variation.id}`}
                className="w-[90px] h-[90px] bg-input-background rounded-xl flex items-center justify-center"
              >
                <Image
                  className="object-contain max-w-[70px] w-full"
                  src={product.variation.images[0] as string}
                  width={75}
                  height={75}
                  alt={product.name as string}
                  quality={100}
                />
              </Link>
              <div className="flex flex-col justify-between h-[90px] max-w-[200px]">
                <Link
                  href={`products/${product.slug}?variation=${product.variation.id}`}
                  className=" text-sm font-medium leading-4"
                >
                  {product.name}
                </Link>

                <Button
                  variant="secondary"
                  customStyle="border-1 py-0.5 max-w-[107px] rounded-lg"
                >
                  <Image
                    src="/icons/variations-icon.svg"
                    width={25}
                    height={25}
                    alt="variations icon" 
                  />
                  Variações
                </Button>
              </div>
              <div className="flex flex-col justify-between items-center h-[90px] max-w-[100px]">
                <span
                  className="text-sm font-medium"
                >
                  Preço
                </span>
                <span
                  className="text-sm font-medium"
                >
                  R$ {product.variation.price}
                </span>
              </div>
              <div className="flex flex-col justify-between items-center h-[90px] max-w-[100px]">
                <span
                  className="text-sm font-medium"
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
              <div className="flex flex-col justify-between items-center h-[90px] max-w-[100px]">
                <span
                  className="text-sm font-medium"
                >
                  Total
                </span>
                <span
                  className="text-sm font-medium"
                >
                  R$ 365,99
                </span>
              </div>
                <Button
                  onClick={() => removeProduct(product.id)}
                  variant="secondary"
                  customStyle="border-1 py-0.5 max-w-[83px] rounded-lg"
                >
                  <Image
                    src="/icons/trash-icon.svg"
                    width={20}
                    height={20}
                    alt="trash icon" 
                  />
                  Apagar
                </Button>
              
            </div>            
          ))}


        </div>

      </div>
      <div
        className="w-full max-w-[260px] flex flex-col h-[500px] bg-white rounded-3xl py-3 px-5"
      >
        <h2
          className="font-bold text-lg"
        >
          Calcular Frete
        </h2>

        <div
          className=" border-b-2 pb-5 border-b-fading-text"
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
  )
}