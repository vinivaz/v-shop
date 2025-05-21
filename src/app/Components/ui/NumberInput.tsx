"use client"

import { InputHTMLAttributes, ChangeEvent } from "react";




type PriceInputProps = {
  label?: string;
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;


export function NumberInput(props: PriceInputProps){
  const { label, ...rest } = props;

  return(
    <div className="w-full my-1">
      {label && <label className="ml-3 pb-2 text-sm font-medium">{label}</label>}
      <input
        type="number"
        step="0.01"
        min="0"
        inputMode="decimal"
        className="outline-hidden bg-input-background w-full py-2 px-3 rounded-xl"
        {...rest}
      />
    </div>
  )
}