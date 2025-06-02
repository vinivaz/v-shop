import { create } from "zustand";
import { persist } from "zustand/middleware";

type Variation = {
  id: string;
  main: boolean;
  name: string;
  stock: number;
  price: number;
  images: string[];
}

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  variation: Variation;
  quantity: number;
}

export type CartStore = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) => 
        set((state) => {
          const existing = state.products.find((productItem) => productItem.id === product.id  && productItem.variation.id === product.variation.id );

          if(existing) {
            return {
              products: state.products.map((productItem) => 
                productItem.id === product.id?
                  {
                    ...productItem,
                    quantity: productItem.quantity + 1 > product.variation.stock ?
                      product.variation.stock
                    :
                      productItem.quantity + 1
                  }
                :
                  productItem
              )
            };
          }

          return { products: [...state.products, product]}
        }),
        updateProduct: (product) =>
          set((state) => {
            return {
              products: state.products.map((productItem) => 
                productItem.id === product.id  &&
                productItem.variation.id === product.variation.id
                ? product
                : productItem
              )
            }
          }),
        removeProduct: (productId) =>
          set((state) =>{
            return {
              products: state.products.filter((productItem) => productItem.id !== productId)
            }
          }),
        clearCart: () => 
          set(() => {
          return {products: []}
        })
      
    }), { name: "cart"}
));
