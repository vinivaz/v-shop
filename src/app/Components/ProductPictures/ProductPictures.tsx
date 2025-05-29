import Image from "next/image"

  type Variations = {
    id: string;
    main: boolean;
    name: string,
    stock: number;
    price: number;
    images: string[]
  }



  type ProductPicturesProps = {
    variation: Variations;
    selectedVariation: Variations;
  }




export function ProductPictures({variation, selectedVariation}: ProductPicturesProps){

  return(
  <>
    {variation.images.map((image, index) => (
      <div
        key={index}
        className={`w-full max-w-[70px] flex justify-center overflow-hidden h-[70px] bg-white rounded-xl ${index === 0 && "border-2 border-darker"}`}
      >
        <Image
          className="object-contain w-full max-w-[70px]"
          src={image||""}
          width={70}
          height={70}
          alt={variation.name}
          quality={10}
        />
      </div>
    ))}
  </>
    

  )
} 