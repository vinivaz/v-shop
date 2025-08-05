import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request){
  try{

    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
      return NextResponse.json({error: "É necessário estar autenticado para acessar esse recurso."}, {status: 401})
    }
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') || '';

    if(!productId){
      return NextResponse.json({error: "Id do produto é não fornecido."}, {status: 401})
    }
    
    const rating = await prisma.rating.findFirst({
      where: {
        userId: user.id,
        productId: productId,
      }
    })

    return NextResponse.json({data: rating}, {status: 200})

  }catch(error){
    console.log(error)
    return NextResponse.json({error: "Falha ao buscar avaliações"})
  }
}


export async function POST(request: Request){
  try{

    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
      return NextResponse.json({error: "É necessário estar autenticado para acessar esse recurso."}, {status: 401})
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }
   
    const body = await request.json()

    const { productId, value } = body;

    if(!productId){
      return NextResponse.json({error: "Id do produto é não fornecido."})
    }

    console.log({userId: user.id, productId})
    
    const rating = await prisma.rating.upsert({
      where: {
        userId_productId: {
          userId: user.id,
          productId: productId,
        },
      },
      update: {
        value: value,
      },
      create: {
        userId: user.id,
        productId,
        value: value,
      },
    });

    // const { _avg, _count } = await prisma.rating.aggregate({
    //   where: { productId },
    //   _avg: { value: true },
    //   _count: true,
    // });

    // await prisma.product.update({
    //   where: { id: productId },
    //   data: {
    //     averageRating: _avg.value ?? 0,
    //     ratingCount: _count,
    //   },
    // });

    return NextResponse.json({data: rating }, {status: 200})


  }catch(error){
    console.log(error)
    return NextResponse.json({error: "Falha ao tentar criar/modificar avaliações"}, {status: 500})
  }
}