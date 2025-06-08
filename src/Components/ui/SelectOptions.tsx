"use client"

import { SelectHTMLAttributes } from "react";

type SelectOptionsProps = {
  label: string
} & SelectHTMLAttributes<HTMLSelectElement>


export function SelectOptions(props:SelectOptionsProps){
  const { label, children, ...rest } = props;

  return(
    <div
      className="w-full flex flex-col "
    >
      {label && <label className="ml-3 pb-1 text-sm font-medium">{label}</label>}
      <div className=" bg-input-background w-full rounded-xl pr-3">
        <select
          {...rest}
          className="w-full p-2 outline-hidden"
        >
          {children}
        </select>
      </div>
    </div>
    
  )
}