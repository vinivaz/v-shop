// utils/generateUniqueSlug.ts
import { prisma } from "@/lib/prisma";
import { slugify } from "./slugify";

export async function generateUniqueSlug(name: string): Promise<string> {
  const baseSlug = slugify(name);

  const produtos = await prisma.product.findMany({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
    select: { slug: true },
  });

  const slugsExistentes = produtos.map(p => p.slug);

  if (!slugsExistentes.includes(baseSlug)) {
    return baseSlug;
  }

  let sufixo = 1;
  let novoSlug = `${baseSlug}-${sufixo}`;

  while (slugsExistentes.includes(novoSlug)) {
    sufixo++;
    novoSlug = `${baseSlug}-${sufixo}`;
  }

  return novoSlug;
}
