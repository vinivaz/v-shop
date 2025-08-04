import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // ajuste esse path conforme seu projeto
import { error } from 'console';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('q') || '';

  if (!term) {
    return NextResponse.json([], { status: 200 });
  }

  try{

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: { contains: term, mode: 'insensitive' },
          },
          {
            category: { contains: term, mode: 'insensitive' },
          },
        ],
      },
      include: {
        variations: true,
      }
    });

    return NextResponse.json({data: products});

  }catch(err){
    console.log(err);
    return NextResponse.json({error: "Houve um erro ao tentar a busca."}, {status: 401});
  }

}