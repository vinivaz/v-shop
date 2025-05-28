type SelectedImage = {
  file: File;
  dataURL: string;
};

type ImagesSelectorProps = {
  value: SelectedImage[];
  onChange: (images: SelectedImage[]) => void;
};

import Image from "next/image";

export function ImagesSelector({ value = [], onChange }: ImagesSelectorProps) {
  
  const handleAddImage = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(file =>
      file.type.startsWith("image/")
    );

    const newImages = Array.from(validFiles).map((file) => ({
      file,
      dataURL: URL.createObjectURL(file),
    }));

    onChange([...value, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = value.filter((_, i) => i !== index);
    onChange(updatedImages);
  };

  return (
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
          onChange={(e) => {
            handleAddImage(e.target.files)
            e.target.value = "";
          }}
        />
      </label>
      <div
        className="w-full flex flex-row bg-[#FBFBFB] border-2 border-[#D3D3D3] border-dashed rounded-xl max-h-[68px] h-full"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          handleAddImage(e.dataTransfer.files)
        }}
      >
        {value.length > 0 ? (
          value.map((image, index) => (
            <div
              key={index}
              className="relative rounded-xl max-h-[68px] m-2"
            >
              <span
                className="absolute -top-2 -right-2 rounded-md bg-lighter p-1"
                onClick={() => handleRemoveImage(index)}
              >
                <Image
                  src="/icons/light-close-icon.svg"
                  width={10}
                  height={10}
                  alt="close icon"
                />
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
            className="flex justify-center items-center w-full h-[50px] m-2 text-fading-text font-medium"
          >
            <span className="text-sm">Arraste imagens aqui</span>
          </div>
        )}
      </div>
    </div>
  );
}
