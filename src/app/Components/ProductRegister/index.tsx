"use client"
import { useState, useEffect } from "react";

import { Input } from "../ui/Input";
import { SelectOptions } from "../ui/SelectOptions";
import { TextArea } from "../ui/TextArea";
import { ImagesSelector } from "../ui/ImagesSelector";
import { SingleImagesSelector } from "../ui/SingleImageSelector";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useForm, useFieldArray } from "react-hook-form";
import { Controller } from "react-hook-form";
import { uploadFile, uploadMultipleImages } from "@/lib/firebase/upload";

type SelectedImage = {
  file: File;
  dataURL: string;
};

type Variation = {
  name: string,
  stock: number | string,
  images: SelectedImage[]
}

type FormData = {
  name: string,
  category: string,
  price: number,
  stock: number,
  description: string,
  mainImage?: SelectedImage,
  additionalImages: SelectedImage[],
  variations: {
    name: string,
    stock: number | string,
    price: number;
    images: SelectedImage[]
  }[]
}

export function ProductRegister(){
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>()

  const { fields: variationFields, append, remove, update } = useFieldArray({
    control,
    name: "variations"
  })

  const onSubmit = async(data: FormData) => {
    try{
      const mainImageUrl = data.mainImage
      ? await uploadFile(data.mainImage.file, 'product_image')
      : undefined;

      const additionalImageUrls = data.additionalImages
      ? await uploadMultipleImages(data.additionalImages, 'product_image')
      : [];

      const variations = await Promise.all(
        (data.variations || []).map(async (variation, index) => {
          const uploadedVariationImages = await uploadMultipleImages(
            variation.images,
            "product_image"
          );

          return {
            name: variation.name,
            price: variation.price,
            stock: variation.stock,
            images: uploadedVariationImages,
          };
        })
      );

        const res = await fetch('/api/products', {
          method: 'POST',
          body: JSON.stringify({
            ...data,
            mainImage: mainImageUrl,
            additionalImages: additionalImageUrls,
            variations
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      console.log(res)
    }catch(error){
      console.log(error)
    }

  }

  return(
    <div
      className="max-w-[680px] w-full p-6 flex bg-white rounded-lg my-5"
    >
      <div className="w-full flex flex-row h-full max-[521px]:flex-col">
        <div
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
                onImagesChange={field.onChange}
                initialImages={field.value || []}
              />
            )}
          />
        </div>
        <div
          className="flex flex-col w-full min-[521px]:pl-5"
        >
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
            <option value="smartphones">smartphone</option>
            <option value="videogames">videogames</option>
            <option value="watches">watches</option>
            <option value="headphones">headphones</option>
          </SelectOptions>
          
          <div
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
          </div>
          <TextArea
            label="Descrição do produto"
            placeholder="Digite os detalhes..."
            rows={2}
            {...register("description")}
          />

          <div
            className="w-full flex flex-col  border-b-input-background rounded-xl"
          >
            <div
              className="w-full flex flex-col"
            >
              <p
                onClick={() => append({
                  name: "",
                  stock: 0,
                  price: 0,
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
              {variationFields.length > 0 && (
                <div
                className="w-full flex flex-col border border-[#DDDDDD] rounded-xl  mt-2 pb-7 px-3 min-[521px]:max-h-[196px] min-[521px]:overflow-auto"
                >
                  {variationFields.map((variation, index) => (
                    <div key={variation.id} className="relative w-full flex flex-col mt-3 mb-8 py-7 border-b border-[#DDDDDD]">
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
                            onImagesChange={field.onChange}
                            initialImages={field.value || []}
                          />
                        )}
                      />
                    </div>
                  ))}

                  {/* {variations.map((variation, index) =>
                    <div key={index}>
                      <div
                        className="relative w-full flex flex-col mt-3 mb-8 py-7 border-b border-[#DDDDDD]"
                      >
                        <span
                          className="absolute top-2 right-0 p-1"
                          onClick={() => handleRemoveVariation(index)}
                        >
                          <Image
                            src="/icons/dark-close-icon.svg"
                            width={13}
                            height={13}
                            alt="close icon"
                          />
                        </span>
                        <div
                          className="w-full flex flex-row gap-x-3"
                        >
                          <Input
                            type="text"
                            value={variation.name || ""}
                            onChange={(e) => handleChangeVariation(index, {
                              ...variation,
                              name: e.target.value
                            })}
                            label="Name"
                          />

                          <Input
                            label="Estoque"
                            min="0"
                            step="1"
                            value={variation.stock}
                            type="number"
                            onChange={(e) => handleChangeVariation(index, {
                              ...variation,
                              stock: e.target.value
                            })}
                            placeholder="0"
                          />
                        </div>
                        <ImagesSelector
                          onImagesChange={(images) => handleChangeVariation(index, {
                            ...variation,
                            images
                          })}
                        />
                      </div>                  
                    </div>
                  )} */}

                </div>
              )}
            </div>
          </div>
          <Button
            onClick={() => handleSubmit(onSubmit)()}
          >
            Concluir
          </Button>
        </div>
      </div>
    </div>
  )
}