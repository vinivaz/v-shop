import { create } from "zustand";

import type { Product, Category } from "@/types/product";

type Products = {
  [key in Category]: Product[];
};

type ProductsStore = {
  products: Products;
  setProducts: (Products: Products) => void;
  toggleFavorite: (product: Product, value: boolean) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: {
    smartphone: [],
    console: [],
    smartwatch: [],
    headphone: []
  },
  setProducts: (products: Products) => set({products}),
  toggleFavorite: (product, value) => set((state) => {
    const updated = {
      ...state.products,
      [product.category]: state.products[product.category].map((p) =>
        p.id === product.id ? { ...p, favorite: value } : p
      ),
    };

    return { products: updated };
  }),
}))