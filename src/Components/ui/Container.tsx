import { ReactNode } from "react";

export function Container({children}: {children: ReactNode}){
  return(
    <div
      className="z-3 w-full max-w-[1000px] min-h-[85vh] flex flex-col items-center justify-start max-[1000px]:px-3"
    >
      {children}
    </div>
  )

}