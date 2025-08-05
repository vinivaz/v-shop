import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";


export async function GET(
  request:Request,
  { params }: { params: Promise<{ productId: string }>}
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Você precisa estar logado para acessar esse recurso." }, { status: 401 });
    }

    // const { productId: productId } = await params;
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') || '';

    if (!productId) {
      return NextResponse.json({ error: "O id do produto é necessário." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado."  }, { status: 404 });
    }

    const orderItem = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId: user.id,
        },
      },
    });

    return NextResponse.json({ data: !!orderItem });
  } catch (error) {
    console.error("Erro ao verificar compra:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
