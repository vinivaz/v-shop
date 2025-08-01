import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { products: cartClientProducts } = body as { products: { productId: string;}[] };

    // Buscar todos os produtos/variações correspondentes
    const products = await prisma.product.findMany({
      where: {
        id: { in: cartClientProducts.map(i => i.productId) }
      },
      include: {
        variations: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}