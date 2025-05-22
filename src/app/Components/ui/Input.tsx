"use client"

import { InputHTMLAttributes } from "react";

type InputProps = {
  label: string,
} & InputHTMLAttributes<HTMLInputElement>

export function Input(props:InputProps){
  const {label, ...rest } = props;

  return(
    <div className="w-full my-1">
      {label && <label className="ml-3 pb-2 text-sm font-medium">{label}</label>}
      <input
        className="outline-hidden bg-input-background w-full py-2 px-3 rounded-xl"
        {...rest}
      />
    </div>
  )
}