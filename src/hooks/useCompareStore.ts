import { useState, useCallback } from 'react';
import { Product, ProductColor } from '@/types/product';

export interface CompareItem {
  product: Product;
  color: ProductColor;
  variants: Record<string, string>;
  totalPrice: number;
}

export const useCompareStore = () => {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  const addToCompare = useCallback((
    product: Product,
    color: ProductColor,
    variants: Record<string, string>,
    totalPrice: number
  ) => {
    setCompareItems(prev => {
      if (prev.length >= 3) {
        return prev;
      }
      const exists = prev.some(item => item.product.id === product.id);
      if (exists) {
        return prev;
      }
      return [...prev, { product, color, variants, totalPrice }];
    });
  }, []);

  const removeFromCompare = useCallback((productId: string) => {
    setCompareItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareItems([]);
  }, []);

  const isInCompare = useCallback((productId: string) => {
    return compareItems.some(item => item.product.id === productId);
  }, [compareItems]);

  return {
    compareItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare
  };
};
