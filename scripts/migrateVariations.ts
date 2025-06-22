// import { prisma } from "../src/lib/prisma";

// async function migrateVariations() {
//   const products = await prisma.product.findMany({
//     include: { variations: true }
//   });

//   for (const product of products) {
//     const { id, price, stock, mainImage, additionalImages } = product;


//     await prisma.variation.updateMany({
//       where: { productId: id },
//       data: { main: false },
//     });

//     await prisma.variation.create({
//       data: {
//         productId: id,
//         name: "black",
//         price,
//         stock,
//         main: true,
//         images: [mainImage!, ...additionalImages],
//       },
//     });

//     console.log(`Atualizado produto: ${product.name}`);
//   }

//   console.log("Migração concluída!");
// }

// migrateVariations()
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   })
//   .finally(() => prisma.$disconnect());
