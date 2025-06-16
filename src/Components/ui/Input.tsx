"use client"

import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type InputProps = {
  label?: string,
  inputClass?: string;
  containerClass?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>

export function Input(props:InputProps){
  const {label, containerClass = "", inputClass = "", error = "", ...rest } = props;

  const containerClassName = twMerge("w-full my-1 ", containerClass)
  
  const inputClassName = twMerge("outline-hidden bg-input-background w-full py-2 px-3 rounded-xl", inputClass)


  return(
    <div className={containerClassName}>
      <div className="w-full flex justify-between items-end">
        {label && <label className="ml-3 pb-2 text-sm font-medium">{label}</label>}
        {error && <p className="text-red-500 pb-1 text-sm ">{error}</p>}
      </div>
      <input
        className={inputClassName}
        {...rest}
      />
    </div>
  )
}