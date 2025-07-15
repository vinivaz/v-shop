import { create } from "zustand";

// Types
import type { Product } from "@/types/product";

type SearchStore = {
  searchResult: Product[] | null;
  setSearchResult: (productsfromSearch: Product[] | null) => void;
  toggleFavorite: (product: Product, value: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchResult: null,
  setSearchResult: (productsfromSearch: Product[] | null) =>
    set((state) => {
      return {
        ...state,
        searchResult: productsfromSearch
      };
    }),
    toggleFavorite: (product: Product, value: boolean) =>
    set((state) => {

      return {
        ...state,
        searchResult: state.searchResult!.map((singleProduct) => singleProduct.id === product.id ? { ...singleProduct, favorite: value } : singleProduct) || []
      };
    }),
}))