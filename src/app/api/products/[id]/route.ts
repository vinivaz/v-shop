import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteImageFromFirebase } from "@/lib/firebase/storageService";


export async function GET(
  request:Request,
  { params }: { params: Promise<{ id: string }>}
) {
  try{

    const { id: productId } = await params;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { variations: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });

  }catch(error){
    console.log(error)
    return NextResponse.json({ error: "Produto não encontrado" }, { status: 500 });
  }
}

export async function DELETE(
  request:Request,
  { params }: { params: Promise<{ id: string }>}
) {
  try{

    const { id: productId } = await params;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { variations: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    const allImagesUrls = [
      ...(product.mainImage? [product.mainImage]: []),
      ...product.additionalImages,
      ...product.variations.flatMap(v => v.images),
    ]

    for (const url of allImagesUrls) {
      await deleteImageFromFirebase(url);
    }

    await prisma.variation.deleteMany({
      where: { productId },
    });

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: "Produto deletado com sucesso." });

  }catch(error){
    console.log(error)
    return NextResponse.json({ error: "Produto não encontrado" }, { status: 500 });
  }
}