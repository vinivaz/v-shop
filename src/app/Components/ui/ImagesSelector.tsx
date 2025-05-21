"use client"
 
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type SelectedImage = {
  file: File;
  dataURL: string;
};

type Props = {
  onImagesChange: (images:SelectedImage[]) => void;
};


export function ImagesSelector({onImagesChange}: Props){

  const [ images, setImages ] = useState<SelectedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(()=> {
    onImagesChange(images)
  },[images])

  const handleSelectFile = async(event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const files = event.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter(file =>
      file.type.startsWith("image/")
    );

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => [...prev, { file, dataURL: reader.result as string }])
      };
      reader.readAsDataURL(file);
    });

    event.target.value = "";
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // necessário para permitir drop
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith("image/")
    );

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => [...prev, { file, dataURL: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });
  };

  function handleRemoveImage(indexToRemove: number) {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  }

  return(
    <div className="w-full my-2">
      <label >
        <div className="px-2 size-fit border rounded-lg border-[#DDDDDD]  my-2">
          add
        </div>
        <input
          className="hidden"
          type="file"
          name="image"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          multiple
          onChange={handleSelectFile}
        />
      </label>
      <div
        className="w-full flex flex-row bg-[#FBFBFB] border-2 border-[#D3D3D3] border-dashed rounded-xl max-h-[68px] h-full"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className="relative rounded-xl max-h-[68px] m-2"
            >
              <span
                className="absolute -top-2 -right-2 text-white text-sm rounded-md bg-darker"
                onClick={() => handleRemoveImage(index)}
              >
                &#x2716;
              </span>
              <div
                className="max-w-[50px] max-h-[50px] h-full rounded-xl overflow-hidden bg-[#D9D9D9]"
              >
                <Image
                  className="object-cover w-full h-full"
                  src={image.dataURL}
                  width={50}
                  height={50}
                  alt={`Preview ${index}`}
                />
              </div>
              
            </div>
          ))
        ) : (
          <div
            className=" flex justify-center items-center w-full m-2 text-dark-text font-medium"
          >
            <p className="text-sm">Arraste imagens aqui</p>
          </div>
        )}
      
      </div>
    </div>
  )
}