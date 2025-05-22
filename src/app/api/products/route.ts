import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // o caminho pode variar

type FormData = {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  mainImage?: string; // imagem principal já com URL
  additionalImages?: string[]; // imagens adicionais
  variations?: {
    name: string;
    stock: string;
    price: string;
    images: string[];
  }[];
}

type UnparsedVariation = {
    name: string;
    stock: string;
    price: string;
    images: string[];
  };

type Variation = {
    name: string;
    stock: number;
    price: number;
    images: string[];
  };

type Variations = {
    name: string;
    stock: number;
    price: number;
    images: string[];
  }[];

export async function POST(request: Request) {
  const {

      price,
      stock,
      variations,
      ...body
    } = await request.json()

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock);

    const parsedVariations = variations?.map((variation: UnparsedVariation) => ({
      name: variation.name,
      price: parseFloat(variation.price),
      stock: parseInt(variation.stock),
      images: variation.images,
    }));

  try {
    const product = await prisma.product.create({

      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        price: parsedPrice,
        stock: parsedStock,
        mainImage: body.mainImage || "",
        additionalImages: body.additionalImages?.map((img:string) => img) || [],
        variations: {
          create: parsedVariations?.map((variation:Variation) => ({
            name: variation.name,
            stock: variation.stock,
            price: variation.price,
            images: variation.images,
          })) || []
        }
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return new NextResponse('Erro ao criar produto', { status: 500 });
  }
}