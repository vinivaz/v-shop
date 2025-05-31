import { Carousel } from "../Components/Carousel";
import { getProducts } from "@/lib/api/products";
import { Input } from "../Components/ui/Input";
import { Button } from "../Components/ui/Button";
import Image from "next/image";
import { QuantityInput } from "../Components/ui/QuantityInput";

export default async function Cart(){

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
          >2 itens no carrinho</p>
        </div>

        <div
          className="w-full flex flex-col"
        >
          <div
            className="w-full h-[141px] bg-white flex flex-row rounded-3xl items-center px-2 gap-2"
          >
            <Input type="checkbox" containerClass="w-auto" />
            <div className="w-[90px] h-[90px] bg-input-background rounded-xl "></div>
            <div className="flex flex-col justify-between h-[90px] max-w-[200px]">
              <h2
                className=" text-sm font-medium leading-4"
              >
                JBL, Fone de Ouvido Over Ear, 770NC, Bluetooth preto
              </h2>

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
                R$ 365,99
              </span>
            </div>
            <div className="flex flex-col justify-between items-center h-[90px] max-w-[100px]">
              <span
                className="text-sm font-medium"
              >
                Quantidade
              </span>
              <QuantityInput stock={15}/>
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

        </div>

      </div>
      <div
        className="w-full max-w-[270px] flex h-[500px] bg-white rounded-3xl"
      ></div>
    </div>
  )
}