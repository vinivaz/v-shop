"use client"

import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type InputProps = {
  label?: string,
  inputClass?: string;
  containerClass?: string;
} & InputHTMLAttributes<HTMLInputElement>

export function Input(props:InputProps){
  const {label, containerClass = "", inputClass = "", ...rest } = props;

  const containerClassName = twMerge("w-full my-1 ", containerClass)
  
  const inputClassName = twMerge("outline-hidden bg-input-background w-full py-2 px-3 rounded-xl", inputClass)


  return(
    <div className={containerClassName}>
      {label && <label className="ml-3 pb-2 text-sm font-medium">{label}</label>}
      <input
        className={inputClassName}
        {...rest}
      />
    </div>
  )
}