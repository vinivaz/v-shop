"use client"
 
import { useState } from "react";
import Image from "next/image";

type SelectedImage = {
  file: File;
  dataURL: string;
};

type Props = {
  value?: SelectedImage,
  onChange: (images:SelectedImage| undefined) => void;
};


export function SingleImagesSelector({value, onChange}: Props){

  const [isDragging, setIsDragging] = useState(false);

  const handleSelectFile = async(event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (!event.target.files?.[0]) return;

    const file = event.target.files[0];
  

    if (!file.type.startsWith("image/")) {
      alert("Por favor, envie apenas arquivos de imagem.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      onChange({ file, dataURL: reader.result as string });
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);


    const file = e.dataTransfer.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      alert("Por favor, envie apenas arquivos de imagem.");
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      onChange({ file, dataURL: reader.result as string });
    };

    reader.readAsDataURL(file);

  };

  return(
    <div className="relative flex flex-col my-2">
      {value && <span
        className="absolute -top-2 -right-2 rounded-md bg-lighter p-1"
        onClick={() => onChange(undefined)}
      >
        <Image
          src="/icons/light-close-icon.svg"
          width={10}
          height={10}
          alt="close icon"
        />
      </span>}
      <label >
      <div
        className={`w-full max-h-[200px] h-[200px] flex items-center justify-center rounded-xl ${
        value ? "bg-[#F4F4F4]" : "bg-[#FBFBFB] border-2 border-[#D3D3D3] border-dashed"
        }`}
        onDrop={handleDrop}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        {value?.dataURL ? (
          <Image
            className="object-contain max-w-[110px] w-full max-h-[110px] h-full"
            src={value.dataURL}
            width={110}
            height={110}
            alt="product image"
          />
        ):(
          <p
            className="text-sm w-full max-w-[70%] text-center font-medium text-fading-text"
          >Arraste uma imagem ou clique para adicionar</p>
        )}

      </div>
        <input
          className="hidden"
          type="file"
          name="image"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          onChange={handleSelectFile}
        />
      </label>

    </div>
  )
}