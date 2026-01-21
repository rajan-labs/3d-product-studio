import { useState, useCallback } from 'react';
import { Product, ProductColor } from '@/types/product';

export interface CartItem {
  id: string;
  product: Product;
  color: ProductColor;
  variants: Record<string, string>;
  totalPrice: number;
  quantity: number;
}

export const useCartStore = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((
    product: Product,
    color: ProductColor,
    variants: Record<string, string>,
    totalPrice: number
  ) => {
    const id = `${product.id}-${color.id}-${JSON.stringify(variants)}`;
    
    setItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, product, color, variants, totalPrice, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== id));
    } else {
      setItems(prev => prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartTotal = items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    itemCount
  };
};
