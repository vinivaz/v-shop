import { create } from 'zustand';
import type { CartProduct } from '@/types/cart';

type useCheckoutStore = {
  visible: boolean;
  products: CartProduct[];
  shipping: number | null;
  showCheckoutScreen: (products: CartProduct[]) => void;
  hideCheckoutScreen: () => void;
  setShipping: (value: number) => void;
}

export const useCheckoutStore = create<useCheckoutStore>((set) => ({
  visible: false,
  products: [],
  shipping: null,
  setShipping: (value) => set({shipping: value}),
  showCheckoutScreen: (products) => set({visible: true,  products}),
  hideCheckoutScreen: () => set({shipping: null, visible: false,})
}))