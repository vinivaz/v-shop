// Firebase
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import clientPromise from "@/lib/mongodb";

type Variations = {
  color?: string,
  picture: string,
  price: number,
  stock: number,

}

type Product = {
  id: string,
  brand: string,
  category: string,
  description: string,
  name: string,
  picture: string,
  variations: Variations[],
}

type FirstPageProps = {
  smartphones: Product[],
  videogames: Product[],
  watches: Product[],
  headphones: Product[]
}

export async function listAllProducts() : Promise<FirstPageProps | void> {
  try {
    const client = await clientPromise
    const db = client.db('v-shop')
    const produtos = await db.collection('products').find({}).toArray()
    console.log(produtos)
  } catch (e) {
    console.error(e)
  }

  const finalData: FirstPageProps = {
    smartphones: [],
    videogames: [],
    watches: [],
    headphones: []
  }

 

  return finalData;

}


// export async function listAllProducts() : Promise<FirstPageProps | void> {

//   const q = query(collection(db, 'products'));

//   const finalData: FirstPageProps = {
//     smartphones: [],
//     videogames: [],
//     watches: [],
//     headphones: []
//   }

//   const querySnapshot = await getDocs(q);

//   querySnapshot.docs.map((doc) => {
//     if(doc.data().category === "smartphone"){
//       finalData.smartphones.push({ id: doc.id, ...doc.data() } as Product)
//     }
//     if(doc.data().category === "videogame"){
//       finalData.videogames.push({ id: doc.id, ...doc.data() }as Product)
//     }
//     if(doc.data().category === "watch"){
//       finalData.watches.push({ id: doc.id, ...doc.data() }as Product)
//     }
//     if(doc.data().category === "headphone"){
//       finalData.headphones.push({ id: doc.id, ...doc.data() }as Product)
//     }
//   });

//   return finalData;

// }