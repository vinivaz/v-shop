"use client"

import { TextareaHTMLAttributes } from "react";

type TextareaProps = {
  label?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;


export function TextArea(props:TextareaProps){
  const {label, ...rest } = props;
  return(
    <div className=" w-full my-1">
      {label && <label className="ml-3 pb-2 text-sm font-medium">{label}</label>}
      <textarea
        className="w-full p-2 outline-hidden bg-input-background rounded-xl "
        {...rest}
      />
    </div>
  )
}