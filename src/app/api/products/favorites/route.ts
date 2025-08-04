
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth/authOptions";
import { getFavoriteProductsForUser, getFavoriteProductsBySearch } from "@/lib/api/server/products";

export async function GET(request: Request) { 
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const term = searchParams.get('q') || '';
 
    const favorites = term ? await getFavoriteProductsBySearch(user.id, term) : await getFavoriteProductsForUser(user.id);

    return NextResponse.json({data:favorites.map(f => ({...f.product, favorite: true}))}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Falha ao buscar favoritos"}, { status: 500 });
  }
}


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { productId } = body;

  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const favorite = await prisma.favorite.create({
      data: {
        userId: user.id,
        productId,
      },
    });

    return NextResponse.json({data:favorite}, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Already favorited or error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { productId } = body;

  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });

    return NextResponse.json({message: "Produto retirado de suas lista de desejos."}, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Not favorited or error"}, { status: 500 });
  }
}
