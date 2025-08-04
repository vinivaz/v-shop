import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 
import { getServerSession } from "next-auth";
import { authOptions } from '@/auth/authOptions';
import { z } from "zod";


export const orderItemSchema = z.object({
    productId: z.string(),
    variationId: z.string(),
    quantity: z.number().min(1),
    price: z.number()
});

type OrderItemType = z.infer<typeof orderItemSchema>;

const OrderSchema = z.object({
  userId: z.string(),
  totalPrice: z.number(),
  items: z.array(orderItemSchema),
});

const BodyDataSchema = z.object({
  items: z.array(orderItemSchema),
})

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try{

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

   const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        items: {
          include: {
            product: true,
            variation: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
  });
  
  return NextResponse.json({data: orders}, { status: 200 });

  }catch(error){
    console.log(error);
    return NextResponse.json({ error: "Error" }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();

  const parsed = BodyDataSchema.safeParse(body);
  console.log(parsed)
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos", issues: parsed.error.issues }, { status: 400 });
  }

  try {
    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    const { items } = body;

    const newOrder = await prisma.$transaction(async (tx) => {
      // Verify the stock
      for (const item of items) {
        const variation = await tx.variation.findUnique({
          where: { id: item.variationId },
          select: { stock: true },
        });

        if (!variation || variation.stock < item.quantity) {
          return NextResponse.json({ error: "Estoque insuficiente :(" }, { status: 401 });
        }
      }

      // Creates an order
      const order = await tx.order.create({
        data: {
          userId:user.id,
          totalPrice: items.reduce((sum:number, i: OrderItemType) => sum + i.price * i.quantity, 0),
          items: {
            create: items.map((item: OrderItemType) => ({
              productId: item.productId,
              variationId: item.variationId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      // Updated the stock based on the quantity of the order
      for (const item of items) {
        await tx.variation.update({
          where: { id: item.variationId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order;
    });

    return NextResponse.json({data:newOrder}, { status: 201 });
  } catch (error) {
    console.error("[ORDER_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}