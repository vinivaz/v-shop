"use client"

import { InputHTMLAttributes } from "react";



type InputTextProps = {
  label: string,
}& InputHTMLAttributes<HTMLInputElement>


export function InputText(props:InputTextProps){
  const { value, className, label, type, ...rest } = props;

  const showSpan = typeof value === "string" && value.trim() !== "";

  return(
    <div className="w-full my-1">
      {label && <label className="ml-3 pb-2 text-sm font-medium">{label}</label>}
      <input
        type="text"
        className="outline-hidden bg-input-background w-full py-2 px-3 rounded-xl"
        {...props}
      />
    </div>
  )
}