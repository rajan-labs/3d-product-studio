import { useState, useCallback } from 'react';
import { Product, ProductColor } from '@/types/product';

export interface WishlistItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedVariants: Record<string, string>;
  totalPrice: number;
  addedAt: string;
}

export const useWishlistStore = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToWishlist = useCallback((
    product: Product,
    selectedColor: ProductColor,
    selectedVariants: Record<string, string>,
    totalPrice: number
  ) => {
    const newItem: WishlistItem = {
      id: `${product.id}-${selectedColor.id}-${Date.now()}`,
      product,
      selectedColor,
      selectedVariants,
      totalPrice,
      addedAt: new Date().toISOString(),
    };
    setWishlistItems((prev) => [...prev, newItem]);
  }, []);

  const removeFromWishlist = useCallback((itemId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistItems.some((item) => item.product.id === productId);
  }, [wishlistItems]);

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount: wishlistItems.length,
  };
};
