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

type Category = 'smartphone' | 'console' | 'smartwatch' | 'headphone';

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  // selectedVariation: Variation;
  variations: Variation[]
}

type Products = {
  [key in Category]: Product[];
};

type FavoriteProduct = {
  id: string;
  createdAt: Date;
  productId: string;
  userId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    mainImage: string;
    createdAt: Date;
  };
}

type ProductsStore = {
  products: Products;
  setProducts: (Products: Products) => void;
  toggleFavorite: (category: Category, productId: string, value: boolean) => void;
  // favoriteProducts: FavoriteProduct[],
  // setFavoriteProducts: (favoriteProducts: FavoriteProduct[]) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: {
    smartphone: [],
    console: [],
    smartwatch: [],
    headphone: []
  },
  setProducts: (products: Products) => set({products}),
  toggleFavorite: (category: Category, productId: string, value: boolean) =>
    set((state) => {
      const updatedCategoryProducts = state.products[category]?.map((product) =>
        product.id === productId ? { ...product, favorite: value } : product
      ) || [];

      return {
        products: {
          ...state.products,
          [category]: updatedCategoryProducts
        }
      };
    }),
  // favoriteProducts: [],
  // setFavoriteProducts: (favoriteProducts: FavoriteProduct[]) => set({favoriteProducts})
}))