"use client"

import Image from "next/image"

  type Variations = {
    id: string;
    main: boolean;
    name: string,
    stock: number;
    price: number;
    images: string[]
  }



  type VariationSelectorProps = {
    variation: Variations;
    selectedVariation: Variations;
  }




export function VariationSelector({variation, selectedVariation}: VariationSelectorProps){

  const handleClick = (variationId: string) => {
  document.querySelectorAll('[data-variation]').forEach(el => {
    el.classList.add('hidden');
  });
  document.querySelector(`[data-variation="${variationId}"]`)?.classList.remove('hidden');

  // Atualiza URL (sem reload)
  const url = new URL(window.location.href);
  url.searchParams.set('vId', variationId);
  window.history.replaceState({}, '', url.toString());
};

  return(
  <div
    key={variation.id}
    onClick={() =>handleClick(variation.id)}
    className="flex flex-col max-w-[80px]"
  >
    <span>{variation.name}</span>
    <div
      className={`flex w-[53px] h-[53px] rounded-xl  ${
        variation.id === selectedVariation?.id ? "border-2" : ""
      }`}
    >
      <Image
        className="object-contain w-full max-w-[70px]"
        src={variation.images[0]||""}
        width={53}
        height={53}
        alt={variation.name}
        quality={50}
      />
    </div>
  </div>
  )
} 