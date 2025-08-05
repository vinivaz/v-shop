import type { Variation, Category } from '@/types/product';

type CartVariation = Variation & {
  quantity: number;
};

export type CartProduct = {
  id: string;
  name: string;
  slug: string;
  category: Category;
  description: string;
  mainImage?: string;
  variations: CartVariation[];
  selectedVariation: CartVariation;
  favorite: boolean;
  ratingCount: number;
  averageRating: number | null;
};