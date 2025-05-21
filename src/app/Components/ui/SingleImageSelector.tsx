"use client"
 
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type SelectedImage = {
  file: File;
  dataURL: string;
};

type Props = {
  onImageChange: (images:SelectedImage| undefined) => void;
};


export function SingleImagesSelector({onImageChange}: Props){

  const [ image, setImage ] = useState<SelectedImage>();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(()=> {
    onImageChange(image)

    console.log(image)
  },[image])

  const handleSelectFile = async(event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (event.target.files === null) return;
    console.log("PASSOU DA DIO")
    const file = event.target.files[0];
  

    if (!file.type.startsWith("image/")) {
      alert("Por favor, envie apenas arquivos de imagem.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage({ file, dataURL: reader.result as string })
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // necessário para permitir drop
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    console.log(e)

    const files = e.dataTransfer.files;

    if (files.length === 0) return;

    const file = files[0];

    // Verifica se é imagem
    if (!file.type.startsWith("image/")) {
      alert("Por favor, envie apenas arquivos de imagem.");
      return;
    }

    // Lê a imagem
    const reader = new FileReader();

    reader.onload = () => {
      setImage({ file, dataURL: reader.result as string });
    };

    reader.readAsDataURL(file);

  };

  function handleRemoveImage(indexToRemove: number) {
    setImage(undefined);
  }

  return(
    <div className="relative flex flex-col my-2">
      {image && <span
        className="absolute -top-2 -right-2 text-white text-sm rounded-md bg-darker"
        onClick={() => setImage(undefined)}
      >
        &#x2716;
      </span>}
      <label >
      <div
        className={`w-full max-h-[200px] h-[200px] flex items-center justify-center rounded-xl ${image?"bg-[#F4F4F4]" :"bg-[#FBFBFB] border-2 border-[#D3D3D3] border-dashed"} `}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        {image?.dataURL ? (
          <Image
            className="object-contain max-w-[110px] w-full max-h-[110px] h-full"
            src={image.dataURL}
            width={110}
            height={110}
            alt="product image"
          />
        ):(
          <p>add image</p>
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