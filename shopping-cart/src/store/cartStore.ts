import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/lib/api";
import { getProductInrPrice } from "@/lib/pricing";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product: Product) =>
        set((state) => {
          // Normalize product with consistent INR pricing
          const inrPrice = getProductInrPrice(product);
          const normalizedProduct: Product = {
            ...product,
            price: inrPrice,
          };

          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      product: normalizedProduct,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product: normalizedProduct, quantity: 1 }],
          };
        }),

      removeFromCart: (productId: number) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      increaseQuantity: (productId: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (productId: number) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
    }),
    {
      name: "cartify-cart-storage",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persistedState: unknown) => {
        const state = (persistedState && typeof persistedState === "object"
          ? persistedState
          : {}) as { items?: CartItem[] };

        if (state?.items && Array.isArray(state.items)) {
          return {
            ...state,
            items: state.items
              .filter(
                (item) => item?.product && typeof item.product.id === "number"
              )
              .map((item) => ({
                ...item,
                quantity: Math.max(1, item.quantity || 1),
                product: {
                  ...item.product,
                  price: getProductInrPrice(item.product),
                },
              })),
          } as CartStore;
        }
        return { items: [] } as unknown as CartStore;
      },
    }
  )
);
