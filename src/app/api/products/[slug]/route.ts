import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteImageFromFirebase } from "@/services/firebase/storageService";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/authOptions';


export async function GET(
  request:Request,
  { params }: { params: Promise<{ slug: string }>}
) {
  try{

    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { slug: slug },
      include: { variations: true },
    });


    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    const ratings = await prisma.rating.aggregate({
      where: { productId: product.id },
      _avg: { value: true },
      _count: {
        _all: true
      }
    });

    const averageRating = ratings._avg.value ?? null;

    const ratingCount = ratings._count._all;

    console.log(ratings)

    const session = await getServerSession(authOptions);

    let favorite = false;

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user) {
        const favorited = await prisma.favorite.findFirst({
          where: {
            userId: user.id,
            productId: product.id,
          },
        });

        favorite = !!favorited;
      }
    }
    

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json({data:{...product, favorite, ratingCount, averageRating}}, { status: 200 });

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