"use client"

import { InputHTMLAttributes, useState, useEffect } from "react";
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

  useEffect(() => {
    if(quantity <= stock && quantity > 0)return;
      onValueChange(1)
      setQuantity(1)
  },[stock])

  useEffect(() => {
      setQuantity(value)
  },[value])

  if(stock < 1){
    return <p>Esgotado</p>
  }

  return(
    <div
      className="flex flex-col justify-between items-center">
      <div
        className="flex h-[24px] max-sm:h-[20px]">
        <button
          className="w-[24px] h-full flex justify-center items-center bg-darker rounded-s-lg text-white max-sm:w-[20px]"
          onClick={() => {
            if((quantity - 1) < 1)return;
            setQuantity(quantity - 1)
            onValueChange((quantity - 1))
          }}
        >
          -
        </button>
        <div
          className="flex items-center justify-center max-w-[60px] min-w-[30px] h-full"
        >
          {quantity}
        </div>
        <button
          className="w-[24px] h-full flex justify-center items-center bg-darker rounded-e-lg text-white max-sm:w-[20px]"
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