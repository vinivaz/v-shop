import type { Product as ProductType, Variation } from "@/types/product"; 
 
  export function getFirstAvailableVariation(product: ProductType) {

    // return product.variations[0];
    return product.variations.find(variation => variation.stock > 0) || null;
  }