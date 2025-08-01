import { QuantityInput } from "@/Components/ui/QuantityInput";
import { Button } from "@/Components/ui/Button";
import Image from "next/image";

import type { CartProduct } from "@/types/cart";

import { Dispatch, SetStateAction } from "react";

type ChangingProductVariationProp = {
  prevProductId: string;
  prevVariationId: string;
  product: CartProduct;
};

type VariationSelectorProps = {
  data: ChangingProductVariationProp;
  setData: Dispatch<SetStateAction<ChangingProductVariationProp | null>>;
  selectVariation: (data: ChangingProductVariationProp) => void;
};

export function VariationSelector({
  data,
  setData,
  selectVariation,
}: VariationSelectorProps) {
  return(
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
              src={data?.product.selectedVariation?.images[0]|| ""}
              width={45}
              height={45}
              alt="variation picture"
            />
          </div>
          <div>
            <h2
              className="text-base font-medium leading-4 line-clamp-2 max-sm:text-sm"
            >
              {data.product.selectedVariation.name}
            </h2>
            <p
              className="text-base font-semibold"
            >
              R$ {data?.product.selectedVariation?.price}
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
            onValueChange={(value) => setData({
              ...data,
              product: {

                ...data.product,
                selectedVariation: {
                  ...data.product.selectedVariation,
                  quantity: value
                }
              }

            })}
            value={data.product.selectedVariation.quantity}
            stock={data.product.selectedVariation.stock}
          />
        </div>
      </div>
      <div
        className="inline-flex flex-row flex-wrap w-full  gap-1 my-4 border-1 border-[#ddd] p-2 rounded-xl"
      >

        {data.product?.variations?.map((singleVariation) => {
          const isSelected = data.product.selectedVariation.id === singleVariation.id;
          const isOutOfStock = singleVariation.stock === 0;

          return (
            <div
              key={singleVariation.id}
              className={`flex w-[50px] h-[50px] rounded-xl overflow-hidden relative transition-opacity duration-300
                ${isSelected ? "border-3 border-fading-text" : ""}
                ${isOutOfStock ? "pointer-events-none opacity-50 grayscale" : "cursor-pointer"}
              `}
              onClick={() => {
                if (isOutOfStock) return;
                setData(({
                  ...data,
                  product: {
                    ...data.product,
                    selectedVariation:{
                      ...singleVariation,
                      quantity: 1
                    }
                  }
                }));
              }}
            >
              <Image
                className="object-contain w-full h-full"
                src={singleVariation.images[0] || ""}
                width={45}
                height={45}
                alt="variation picture"
              />
              {isOutOfStock && (
                <div className="absolute inset-0 bg-white/60 text-xs text-red-600 flex items-center justify-center font-bold">
                  Esgotado
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Button
        onClick={() => {

          selectVariation(data)
          setData(null)
        }}
      >
        Concluir
      </Button>
    </div>
  )
}