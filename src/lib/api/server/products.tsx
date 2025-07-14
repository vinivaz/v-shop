import { prisma } from "@/lib/prisma";

export async function getFavoriteProductsForUser(userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    include: { product: true },
  });
}