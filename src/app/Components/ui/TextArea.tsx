"use client"

import { TextareaHTMLAttributes } from "react";



type TextareaProps = {
  label?: string;
  showMessageOnInput?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;


export function TextArea(props:TextareaProps){
  const { value, label, ...rest } = props;

  const showSpan = typeof value === "string" && value.trim() !== "";

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