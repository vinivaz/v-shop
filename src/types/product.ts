export type Category = 'smartphone' | 'console' | 'smartwatch' | 'headphone';

export type Variation = {
  main: boolean;
  name: string;
  images: string[];
  stock: number;
  price: number;
  id: string;
  productId: string;
}

export type Product = {
  id: string,
  name: string,
  slug: string,
  category: Category;
  description: string,
  mainImage?: string,
  variations: Variation[];
  favorite: boolean;
}