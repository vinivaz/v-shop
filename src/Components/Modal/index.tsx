
// Hooks
import { useState } from "react";

// Components
import Image from "next/image";
import { Button } from "../ui/Button";

type VariationSelectorProps = {
  showing: boolean;
  setShowing: (value: boolean) => void;
  children: React.ReactNode;
  closeButton?: boolean;
}


const Modal = ({
  showing,
  setShowing,
  children,
  closeButton = true
}: VariationSelectorProps) => {
  return (
    <div
    >
      <div
        onClick={() => setShowing(false)}
        className={showing? "z-10 fixed inset-0 bg-black/50": "hidden"}
      >
      </div>
      <div
        className={`z-11 w-full  max-sm:w-11/12 max-w-[400px] flex flex-col p-5 bg-white rounded-3xl fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  ${showing? "":"hidden"}`}
      >

        <div
          className="relative"
        >
          {closeButton && (
          <button
            className="absolute right-0"
            onClick={() => setShowing(false)}
          >
            <Image
              className="pointer-events-none"
              src="/icons/dark-close-icon.svg"
              height={17}
              width={17}
              alt="close icon"/>
          </button>            
          )}

        </div>
        <div
          className=""
        >
          {children}
        </div>
      </div>  
    </div>
  )
}

export default Modal;