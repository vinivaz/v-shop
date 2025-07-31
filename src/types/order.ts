import type { Variation } from "./product";

export type OrderProductType = {
  id: string;
  name: string;
  slug: string;
  category: 'smartphone' | 'console' | 'smartwatch' | 'headphone';
  description: string;
  mainImage?: string;
  favorite: boolean;
}

export type OrderItemType = {
  id: string;
  orderId: string;
  price: number;
  product: OrderProductType;
  productId: string;
  quantity: number;
  variation: Variation;
  variationId: string;
}

export type OrderType = {
  id: string;
  totalPrice: number;
  userId: string;
  items: OrderItemType[];
  createdAt: Date
}