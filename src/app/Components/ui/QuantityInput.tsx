"use client"

import { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type InputProps = {
  stock: number;
  value?: number;
  inputClass?: string;
  containerClass?: string;
  onValueChange: (value: number) => void;
} & InputHTMLAttributes<HTMLInputElement>

export function QuantityInput(props:InputProps){
  const { stock, value = 1, onValueChange, containerClass = "", inputClass = "", ...rest } = props;

  const [quantity, setQuantity] = useState<number>(value)

  return(
    <div
      className="flex flex-col justify-between items-center">
      <div
        className="flex">
        <button
          className="w-[24px] h-[24px] bg-darker rounded-s-lg text-white"
          onClick={() => {
            if((quantity - 1) < 1)return;
            setQuantity(quantity - 1)
            onValueChange((quantity - 1))
          }}
        >
          -
        </button>
        <div
          className=" flex items-center justify-center max-w-[60px] min-w-[30px]"
        >
          {quantity}
        </div>
        <button
          className="w-[24px] h-[24px] bg-darker rounded-e-lg text-white"
          onClick={() => {
            if((quantity + 1) > stock)return;
            setQuantity(quantity + 1)
            onValueChange((quantity + 1))
          }}
        >
          +
        </button>
      </div>

      {stock && <span className="text-xs text-fading-text">{stock} unidades.</span>}
    </div>
  )
}