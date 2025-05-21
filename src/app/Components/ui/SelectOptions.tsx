"use client"

import { SelectHTMLAttributes } from "react";



type SelectOptionsProps = {
  label: string
} & SelectHTMLAttributes<HTMLSelectElement>


export function SelectOptions(props:SelectOptionsProps){
  const { label, value, className, children, ...rest } = props;

  const showSpan = value !== "" && value !== "default";

  return(
    <div
      className="w-full flex flex-col "
    >
      {label && <label className="ml-3 pb-1 text-sm font-medium">{label}</label>}
      <div className=" bg-input-background w-full rounded-xl pr-3">
      <select
        {...rest}
        value={value}
        className="w-full p-2 outline-hidden"
      >
        {children}
      </select>
    </div>
    </div>
    
  )
}