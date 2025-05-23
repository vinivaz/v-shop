import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { slugify } from '@/utils/slugify';
import { generateUniqueSlug } from '@/utils/generateUniqueSlug';

type UnparsedVariation = {
  name: string;
  stock: string;
  price: string;
  images: string[];
};

type Variation = {
  name: string;
  stock: number;
  price: number;
  images: string[];
};

export async function GET(request: Request) {

  try{

    const products = await prisma.product.findMany()

    const smartphones = products.filter(product => product.category === "smartphone")
    const consoles = products.filter(product => product.category === "console")
    const smartwatches = products.filter(product => product.category === "smartwatch")
    const headphones = products.filter(product => product.category === "headphone")

    return NextResponse.json({
      smartphones,
      consoles,
      smartwatches,
      headphones
    });

  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return new NextResponse('Erro ao criar produto', { status: 500 });
  }
}

export async function POST(request: Request) {
  try{

    const { price, stock, variations, ...body } = await request.json()

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock);

    const parsedVariations = variations?.map((variation: UnparsedVariation) => ({
      name: variation.name,
      price: parseFloat(variation.price),
      stock: parseInt(variation.stock),
      images: variation.images,
    }));

    const slug = await generateUniqueSlug(body.name)

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug,
        description: body.description,
        category: body.category,
        price: parsedPrice,
        stock: parsedStock,
        mainImage: body.mainImage || "",
        additionalImages: body.additionalImages?.map((img:string) => img) || [],
        variations: {
          create: parsedVariations?.map((variation:Variation) => ({
            name: variation.name,
            stock: variation.stock,
            price: variation.price,
            images: variation.images,
          })) || []
        }
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return new NextResponse('Erro ao criar produto', { status: 500 });
  }
}




// export async function GET(request: Request) {
//   try{
//     const products = await prisma.product.findMany({
//       where: { slug: { equals: undefined } },
//     });

//     for (const product of products) {

//       const slug = await generateUniqueSlug(product.name);

//       await prisma.product.update({
//         where: { id: product.id },
//         data: { slug },
//       });
      
//       console.log(`Slug adicionado ao product: ${product.name} -> ${slug}`);
//     }

//     console.log("Slugs atualizados com sucesso.");




//     const updates = [
//       { antiga: "smartphones", nova: "smartphone" },
//       { antiga: "videogame", nova: "console" },
//       { antiga: "watches", nova: "smartwatch" },
//       { antiga: "headphones", nova: "headphone" },
//     ];

//     for (const { antiga, nova } of updates) {
//       const atualizados = await prisma.product.updateMany({
//         where: { category: antiga },
//         data: { category: nova },
//       });

//       console.log(`Atualizados ${atualizados.count} produtos de '${antiga}' para '${nova}'`);
//     }
//     return new NextResponse('deu bom', { status: 200 });
//   }catch(error){
//     console.log(error)
//     return new NextResponse('Erro ao atualizar os produtos', { status: 500 });
//   }

// }