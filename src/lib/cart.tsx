"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "./products";
import { getProductBySlug } from "./products";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  limited: boolean;
  maxStock: number;
};

export type AddToCartResult =
  | { ok: true }
  | { ok: false; message: string };

type CartContextValue = {
  items: CartItem[];
  addItem: (
    product: Product,
    size: string,
    quantity?: number
  ) => AddToCartResult;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    quantity: number
  ) => AddToCartResult;
  clearCart: () => void;
  subtotal: number;
  shippingEstimate: number;
  total: number;
  count: number;
};

const STORAGE_KEY = "hc-pet-fashion-cart";

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function getMaxForProduct(product: Product): number {
  return product.limited ? product.stock : 99;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCart(items);
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: Product, size: string, quantity = 1): AddToCartResult => {
      const max = getMaxForProduct(product);
      let blocked = false;
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.productId === product.id && i.size === size
        );
        const nextQty = (existing?.quantity ?? 0) + quantity;
        if (nextQty > max) {
          blocked = true;
          return prev;
        }
        if (existing) {
          return prev.map((i) =>
            i.productId === product.id && i.size === size
              ? { ...i, quantity: nextQty }
              : i
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            size,
            quantity,
            image: product.image,
            limited: product.limited,
            maxStock: max,
          },
        ];
      });
      if (blocked) {
        return {
          ok: false,
          message: product.limited
            ? "Only one piece available"
            : "Quantity limit reached",
        };
      }
      return { ok: true };
    },
    []
  );

  const removeItem = useCallback((productId: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number): AddToCartResult => {
      const product = getProductBySlug(
        items.find((i) => i.productId === productId)?.slug ?? ""
      );
      const max = product ? getMaxForProduct(product) : quantity;

      if (quantity <= 0) {
        setItems((prev) =>
          prev.filter((i) => !(i.productId === productId && i.size === size))
        );
        return { ok: true };
      }
      if (quantity > max) {
        return {
          ok: false,
          message: product?.limited
            ? "Only one piece available"
            : "Quantity limit reached",
        };
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, quantity }
            : i
        )
      );
      return { ok: true };
    },
    [items]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const shippingEstimate = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= 75 ? 0 : 8;
  }, [items.length, subtotal]);

  const total = subtotal + shippingEstimate;

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      shippingEstimate,
      total,
      count,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      shippingEstimate,
      total,
      count,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
