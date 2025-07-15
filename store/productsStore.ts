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
  id: string,
  name: string,
  slug: string,
  category: Category,
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
  toggleFavorite: (product: Product, value: boolean) => void;
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
toggleFavorite: (product, value) =>
  set((state) => {
    const updated = {
      ...state.products,
      [product.category]: state.products[product.category].map((p) =>
        p.id === product.id ? { ...p, favorite: value } : p
      ),
    };
    return { products: updated };
  }),
  // favoriteProducts: [],
  // setFavoriteProducts: (favoriteProducts: FavoriteProduct[]) => set({favoriteProducts})
}))