import { create } from "zustand";

type Variation = {
  productId: string;
  id: string;
  main: boolean;
  name: string;
  stock: number;
  price: number;
  images: string[];
  // quantity: number;
}

type Product = {
  id: string,
  name: string,
  slug: string,
  category: 'smartphone' | 'console' | 'smartwatch' | 'headphone';
  description: string,
  mainImage?: string,
  variations: {
    main: boolean;
    name: string;
    images: string[];
    stock: number;
    price: number;
    id: string;
    productId: string;
  }[];
  favorite: boolean;
}

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