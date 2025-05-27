import { ReactNode } from "react";

export function Container({children}: {children: ReactNode}){
  return(
    <div
      className="z-1 w-full max-w-[1000px] flex flex-col items-center justify-center max-[1000px]:px-4"
    >
      {children}
    </div>
  )

}