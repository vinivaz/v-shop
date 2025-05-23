import { Carousel } from "../Components/Carousel";
import { getProducts } from "@/lib/api/products";

export default async function Cart(){
    const products  = await getProducts()

  return(
    <div>
      <Carousel products={products.headphones}/>
    </div>
  )
}