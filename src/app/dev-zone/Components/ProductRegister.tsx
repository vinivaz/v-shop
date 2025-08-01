"use client"

// Components
import Image from "next/image";
import { Input } from "../../../Components/ui/Input";
import { SelectOptions } from "../../../Components/ui/SelectOptions";
import { TextArea } from "../../../Components/ui/TextArea";
import { ImagesSelector } from "../../../Components/ui/ImagesSelector";
import { registerProduct } from "@/lib/api/products";
import { Button } from "../../../Components/ui/Button";
import { Controller } from "react-hook-form";

// Hooks
import { useForm, useFieldArray } from "react-hook-form";

// Firebase Actions
import { uploadFile, uploadMultipleImages } from "@/services/firebase/storageService";

type SelectedImage = {
  file: File;
  dataURL: string;
};

type FormData = {
  name: string,
  category: string,
  // price: string,
  // stock: string,
  description: string,
  // mainImage?: SelectedImage,
  // images: SelectedImage[],
  variations: {
    // mainImage: SelectedImage,
    main: boolean,
    name: string,
    stock: string,
    price: string;
    images: SelectedImage[]
  }[]
}

type ReadyData = {
  name: string;
  category: string;
  description: string;
  mainImage?: string;
  variations: {
    main: boolean;
    name: string;
    stock: string;
    price: string;
    images: string[];
  }[]
}

export function ProductRegister(){
  const initialFormValues = {
    name: '',
    category: 'default',
    // price: '',
    // stock: '',
    description: '',
    mainImage: undefined,
    // additionalImages: [],
    variations: [{
      main: true,
      name: "",
      stock: "0",
      price: "0",
      images: []
    }],
  }

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    defaultValues: initialFormValues,
  })

  const { fields: variationFields, append, remove, update,  } = useFieldArray({
    control,
    name: "variations"
  })

  const onSubmit = async(data: FormData) => {
    console.log(data)
    try{
      // const mainImageUrl = data.mainImage
      // ? await uploadFile(data.mainImage.file, 'product_image')
      // : undefined;

      // const additionalImageUrls = data.additionalImages
      // ? await uploadMultipleImages(data.additionalImages, 'product_image')
      // : [];

      const variations = await Promise.all(
        (data.variations || []).map(async (variation, index) => {
          const uploadedVariationImages = await uploadMultipleImages(
            variation.images,
            "product_image"
          );

          return {
            ...variation,
            images: uploadedVariationImages,
          };
        })
      );

      // const res = await fetch('/api/products', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     ...data,
      //     mainImage: variations[0].images[0],
      //     // additionalImages: additionalImageUrls,
      //     variations
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      const res = await registerProduct({
        ...data,
        mainImage: variations[0].images[0],
        variations
      })
      console.log(res)
      
      reset(initialFormValues);

    }catch(error){
      console.log(error)
    }
    
  }

  return(
    <div
      className="max-w-[680px] w-full p-6 flex bg-white rounded-lg my-5"
    >
      <div className="w-full flex flex-row h-full max-[521px]:flex-col">
        {/* <div
          className="min-[521px]:max-w-[200px] w-full flex flex-col max-[521px]:justify-center max-[521px]:mb-7"
        >
          <Controller
            name="mainImage"
            control={control}
            render={({ field }) => (
              <SingleImagesSelector
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="additionalImages"
            render={({ field }) => (
              <ImagesSelector
                value={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
        </div> */}
        <div
          className="flex flex-col w-full min-[521px]:pl-5"
        >
          <div>
            <Input
            label="Name"
            type="text"
            {...register("name", {required: true, minLength: 7})}
          />
          <SelectOptions
            label="Category"
            {...register("category", {validate: (value) => {
              return value !== "default"
            }})}
          >
            <option value="default" disabled>Choose the category</option>
            <option value="smartphone">Smartphone</option>
            <option value="console">Console</option>
            <option value="smartwatch">Smartwatch</option>
            <option value="headphone">Headphone</option>
          </SelectOptions>
          
          {/* <div
            className="w-full flex flex-row gap-x-3"
          >
            <Input
              label="Price"
              placeholder="R$ 0,00"
              type="number"
              step="0.01"
              min="0"
              inputMode="decimal"
              {...register("price")}
            />
            <Input
              label="Estoque"
              min="0"
              step="1"
              type="number"
              placeholder="0"
              {...register("stock")}
            />
          </div> */}
          <TextArea
            label="Descrição do produto"
            placeholder="Digite os detalhes..."
            rows={2}
            {...register("description")}
          />
          <Controller
            control={control}
            name="variations.0.images"
            render={({ field }) => (
              <ImagesSelector
                value={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
          <Input
                          type="text"
                          label="Name"
                          placeholder="ex: Black Edition"
                          {...register(`variations.0.name`, {required:true})}
                        />

                        <div className="w-full flex flex-row gap-x-3">
                          <Input
                            label="Price"
                            placeholder="R$ 0,00"
                            type="number"
                            step="0.01"
                            min="0"
                            inputMode="decimal"
                            {...register(`variations.0.price`)}
                          />

                          <Input
                            label="Estoque"
                            type="number"
                            min="0"
                            step="1"
                            {...register(`variations.0.stock`)}
                          />
                        </div>
        </div>
          

          <div
            className="w-full flex flex-col  border-b-input-background rounded-xl"
          >
            <div
              className="w-full flex flex-col"
            >
              <p
                onClick={() => append({
                  main: false,
                  name: "",
                  stock: "0",
                  price: "0",
                  images: []
                })}
                className="flex flex-row items-center justify-center w-fit py-1 px-2 text-sm border border-[#CDCDCD] rounded-lg"
              >
                <Image
                  src="/icons/variations-icon.svg"
                  width={25}
                  height={25}
                  alt="variations icon" 
                />
                Adicionar Variação
              </p>
              {variationFields.length > 1 && (
                <div
                className="w-full flex flex-col border border-[#DDDDDD] rounded-xl  mt-2 pb-7 px-3 min-[521px]:max-h-[196px] min-[521px]:overflow-auto"
                >
                  {variationFields.map((variation, index) => 
                    <div key={variation.id}>{index !== 0 && (
                      <div 
                        className="relative w-full flex flex-col mt-3 mb-8 py-7 border-b border-[#DDDDDD]">
                        <span
                          className="absolute top-2 right-0 p-1"
                          onClick={() => remove(index)}
                        >
                          <Image
                            src="/icons/dark-close-icon.svg"
                            width={13}
                            height={13}
                            alt="close icon"
                          />
                        </span>
                        <Input
                          type="text"
                          label="Name"
                          placeholder="ex: Black Edition"
                          {...register(`variations.${index}.name`, {required:true})}
                        />

                        <div className="w-full flex flex-row gap-x-3">
                          <Input
                            label="Price"
                            placeholder="R$ 0,00"
                            type="number"
                            step="0.01"
                            min="0"
                            inputMode="decimal"
                            {...register(`variations.${index}.price`)}
                          />

                          <Input
                            label="Estoque"
                            type="number"
                            min="0"
                            step="1"
                            {...register(`variations.${index}.stock`)}
                          />
                        </div>
                        <Controller
                          control={control}
                          name={`variations.${index}.images`}
                          render={({ field }) => (
                            <ImagesSelector
                              value={field.value || []}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    )}</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <Button
            disabled={isSubmitting}
            onClick={() => handleSubmit(onSubmit)()}
          >
            {isSubmitting ? 'Enviando...' : 'Concluir'}
          </Button>
        </div>
      </div>
    </div>
  )
}