import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // ajuste esse path conforme seu projeto

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('q') || '';

  if (!term) {
    return NextResponse.json([], { status: 200 });
  }

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
    },
    take: 10,
  });

  return NextResponse.json(products);
}