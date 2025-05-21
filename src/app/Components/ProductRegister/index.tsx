"use client"
import { useState, useEffect } from "react";

import { InputText } from "../ui/InputText";
import { SelectOptions } from "../ui/SelectOptions";
import { NumberInput } from "../ui/NumberInput";
import { TextArea } from "../ui/TextArea";
import { ImagesSelector } from "../ui/ImagesSelector";
import { SingleImagesSelector } from "../ui/SingleImageSelector";
import Image from "next/image";

type SelectedImage = {
  file: File;
  dataURL: string;
};

type Variation = {
  name: string,
  stock: number | string,
  images: SelectedImage[]
}

export function ProductRegister(){
  const [name, setName ] = useState("")
  const [selected, setSelected] = useState("default");
  const [price, setPrice] = useState("");
  const [descricao, setDescricao] = useState("");
  const [images, setImages ] = useState<SelectedImage[]>([])
  const [image, setImage ] = useState<SelectedImage>()
  const [ variations, setVariations ] = useState<Variation[]>([])


  useEffect(()=> {
    console.log(variations)
  },[variations])

  const handleChangeVariation = (index: number, variation: Variation) => {
    setVariations(prevItems =>
      prevItems.map((item, i) =>
        i === index ? variation : item
      )
    );
  }

  return(
    <div
      className="max-w-[680px] w-full p-6 flex bg-white rounded-lg my-5 max-[521px]:overflow-auto"
    >
      <form className="w-full flex flex-row max-[521px]:flex-col">
        <div
          className="min-[521px]:max-w-[200px] w-full flex flex-col max-[521px]:justify-center max-[521px]:mb-7"
        >
          <SingleImagesSelector onImageChange={setImage}/>
          <ImagesSelector
            onImagesChange={setImages}
          />
        </div>
        <div
          className="flex flex-col w-full min-[521px]:pl-5"
        >
          <InputText
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            label="Name"
          />
          <SelectOptions label="Category" value={selected} onChange={(e) => setSelected(e.target.value)}>
            <option value="default" disabled>Choose the category</option>
            <option value="smartphones">smartphone</option>
            <option value="videogames">videogames</option>
            <option value="watches">watches</option>
            <option value="headphones">headphones</option>
          </SelectOptions>
          

          <NumberInput
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="R$ 0,00"
          />

          <TextArea
            label="Descrição do produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite os detalhes..."
            rows={2}
          />

          <div
            className="w-full flex flex-col  border-b-input-background rounded-xl"
          >
            <div
              className="w-full flex flex-col"
            >
              <p
                onClick={() => setVariations([...variations,{
                  name: "",
                  stock: 0,
                  images: []
                }])}
                className=" flex flex-row items-center justify-center w-fit py-1 px-2 text-sm border border-[#CDCDCD] rounded-lg"
              >
                <Image
                  src="/icons/variations-icon.svg"
                  width={25}
                  height={25}
                  alt="variations icon"
                />
                Adicionar Variações
              </p>
              <div
                className="w-full flex flex-col border border-[#DDDDDD] rounded-xl max-h-[196px] mt-2 pb-7 px-3 min-[521px]:overflow-auto"
              >
                {variations.length > 0 && variations.map((variation, index) =>
                  < >
                    <div
                      key={index}
                      className="w-full flex flex-col mt-5 mb-10"
                    >
                      <div
                        className="w-full flex flex-row gap-x-3"
                      >
                        <InputText
                          value={variation.name || ""}
                          onChange={(e) => handleChangeVariation(index, {
                            ...variation,
                            name: e.target.value
                          })}
                          label="Name"
                        />

                        <NumberInput
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
                  </>
                )}

              </div>

              
            </div>


          </div>
        </div>
        


      </form>
    </div>
  )
}