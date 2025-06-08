import Image from "next/image";

export function Hero() {
  return(
    <div
      className=" w-full min-[780px]:aspect-[1000/380] max-[780px]:min-h-[240px] max-[488px]:min-h-[180px] my-6 flex justify-center items-center"
    >
      <div
        className="w-full relative flex justify-center items-center max-h-[320px]"
      >
        <div
          className="w-full absolute flex justify-center items-center max-[768px]:min-h-[200px] max-[488px]:min-h-[160px] max-md:overflow-hidden max-md:rounded-4xl"
        >
          <Image
            className="z-1  object-contain w-full max-md:object-cover max-[768px]:min-h-[200px] max-[488px]:min-h-[160px]"
            src="/ad/smartphones-hero-background.png"
            width={1120}
            height={359.64}
            alt="hero image background"
          />
        </div>
        <div
          className="relative z-2 w-full max-h-[320px] flex items-center justify-center max-[743px]:justify-start"
        >
          <div
            className="max-[743px]:w-[50%] flex justify-end max-[499px]:w-[60%] max-[413px]:w-[71%]"
          >
          <div className="max-[743px]:aspect[699/205]">
            <h1
              className="text-white font-[Zen_Dots] text-3xl max-w-[311.9px] w-full max-[880px]:text-2xl max-[880px]:max-w-[270px] max-[750px]:text-xl max-[750px]:leading-5 max-[750px]:max-w-[200px]"
            >
              Ut enim ad minim veniam
            </h1>
            <p
              className="max-w-[310px] w-full text-white text-wrap text-sm my-2 max-[880px]:text-xs max-[880px]:my-1 max-[880px]:max-w-[205px]"
            >
              All this running around, try to cover my shadows, something trying
            </p>
            <button
              className="text-white py-2 mt-5 px-14 rounded-2xl bg-lighter max-[880px]:mt-3 max-[800px]:py-1.5 max-[800px]:px-9 max-[800px]:rounded-lg max-[650px]:text-xs"
            >
              Conferir
            </button>
          </div>            
          </div>
          
          <div
          className=" z-2 w-[34%] h-full max-[738px]:absolute max-[738px]:w-[215px] max-[738px]:h-auto max-[738px]:right-23 max-[624px]:right-9 max-[499px]:-right-4 max-[488px]:w-[180px] max-[413px]:w-[120px]"
        >
          <div className="w-full h-full flex justify-center items-center ">
            <img
              className="object-contain w-full h-[100%] max-[738px]:w-[100%]"
              src="/ad/smartphone-hero-image.png"

              alt="smartphone image"
      
            />          
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}