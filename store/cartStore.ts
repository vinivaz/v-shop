import { create } from "zustand";
import { persist } from "zustand/middleware";

type Variation = {
  productId: string;
  id: string;
  main: boolean;
  name: string;
  stock: number;
  price: number;
  images: string[];
  quantity: number;
}

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  selectedVariation: Variation;
  variations: Variation[]
}

type changingProductVariationProp = {
  prevProductId: string;
  prevVariationId: string;
  product: Product;
}

export type CartStore = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (productId: string, variationId: string) => void;
  changeProductVariation: (data: changingProductVariationProp) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) => 
        set((state) => {
          const existing = state.products.find((productItem) => productItem.id === product.id  && productItem.selectedVariation.id === product.selectedVariation.id );

          if(existing) {
            return {
              products: state.products.map((productItem) => 
                productItem.id === product.id?
                  {
                    ...productItem,
                    selectedVariation: {
                      ...productItem.selectedVariation,
                      quantity: productItem.selectedVariation.quantity + 1 > product.selectedVariation.stock ?
                        product.selectedVariation.stock
                      :
                        productItem.selectedVariation.quantity + 1
                    } 
                      
                  }
                :
                  productItem
              )
            };
          }

          return { products: [...state.products, product]}
        }),
          changeProductVariation: (data) =>
          set((state) => {
            const { product, prevProductId, prevVariationId } = data;

            const existing = state.products.find((productItem) => 
              productItem.id === product.id
            && 
              productItem.selectedVariation.id === product.selectedVariation.id
            );

            if(existing) {
              

              return {
                products: [
                  ...state.products.filter((singleProduct) => (singleProduct.id !== existing.id || singleProduct.selectedVariation.id !== existing.selectedVariation.id) && (singleProduct.id !== prevProductId || singleProduct.selectedVariation.id !== prevVariationId)),
                  product
                ]
              };
            }
            return {
              products: state.products.map((productItem) => 
                productItem.id === product.id
                ? product
                : productItem
              )
            }
          }),
          // updateProductQuantity: (product:Product) =>
          // set((state) => {
          //   const existing = state.products.find((productItem) => 
          //     productItem.id === product.id
          //   && 
          //     productItem.selectedVariation.id === product.selectedVariation.id
          //   );

          //   return {
          //     products: state.products.map((productItem) => 
          //       productItem.id === product.id  &&
          //       productItem.selectedVariation.id === product.selectedVariation.id
          //       ? {
          //           ...product,
          //           selectedVariation:{
          //             ...product.selectedVariation,
          //             quantity: product.selectedVariation.quantity
          //           }

          //         }
          //       : productItem
          //     )
          //   }
          // }),
        updateProduct: (product) =>
          set((state) => {
            return {
              products: state.products.map((productItem) => 
                productItem.id === product.id  &&
                productItem.selectedVariation.id === product.selectedVariation.id
                ? product
                : productItem
              )
            }
          }),
        removeProduct: (productId, variationId) =>
          set((state) =>{
            return {
              products: state.products.filter((productItem) => productItem.id !== productId || productItem.selectedVariation.id !== variationId)
            }
          }),
        clearCart: () => 
          set(() => {
          return {products: []}
        })
      
    }), { name: "cart"}
));
