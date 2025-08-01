import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
import type { Product as ProductType } from "@/types/product";
import type { CartProduct } from "@/types/cart";


type changingProductVariationProp = {
  prevProductId: string;
  prevVariationId: string;
  product: CartProduct;
}

export type CartStore = {
  products: CartProduct[];
  addProduct: (product: CartProduct) => void;
  updateProduct: (product: CartProduct) => void;
  removeProduct: (productId: string, variationId: string) => void;
  removeManyProducts: (toRemove: {productId: string, variationId: string}[]) => void;
  changeProductVariation: (data: changingProductVariationProp) => void;
  clearCart: () => void;
  syncCartWithServer: (serverProducts: ProductType[]) => void;

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
          removeManyProducts: (toRemove: {productId: string, variationId: string}[]) =>
            set((state) => {
              return {
                products: state.products.filter((productItem) => {
                  const match = toRemove.some(
                    (removeItem) =>
                      removeItem.productId === productItem.id &&
                      removeItem.variationId === productItem.selectedVariation.id
                  );
                  return !match; // mantém os produtos que não estão na lista de remoção
                })
              };
            }),
          syncCartWithServer: (serverProducts) => set((state) => {

            const merged = state.products.map((localProduct) => {
              
              const serverProduct = serverProducts.find((singleServerProduct: any) => singleServerProduct.id === localProduct.id);
              if (!serverProduct) return null;// reject

              const verifiedVariation = serverProduct.variations.find((v: any) => v.id === localProduct.selectedVariation.id) || { ...localProduct.selectedVariation, stock: 0 };

              const quantity = localProduct.selectedVariation.quantity <= verifiedVariation.stock
                ? localProduct.selectedVariation.quantity
                : verifiedVariation.stock > 0
                  ? 1
                  : 0;
              return {
                ...localProduct,
                
                name: serverProduct.name,
                slug: serverProduct.slug,
                variations: serverProduct.variations,
                selectedVariation:{
                  ...localProduct.selectedVariation,
                  price: verifiedVariation.price,
                  stock: verifiedVariation.stock,
                  images: verifiedVariation.images,
                  quantity,
                },
              };
            })
            .filter(Boolean) as CartProduct[];

            return {
              products: merged
            }
          }),

        clearCart: () => 
          set(() => {
          return {products: []}
        })
      
    }), { name: "cart"}
));
