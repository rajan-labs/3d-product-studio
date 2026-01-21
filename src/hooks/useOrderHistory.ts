import { useState, useCallback } from 'react';
import { Product, ProductColor } from '@/types/product';

export interface OrderItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedVariants: Record<string, string>;
  totalPrice: number;
  orderedAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

export const useOrderHistory = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const addOrder = useCallback((
    product: Product,
    selectedColor: ProductColor,
    selectedVariants: Record<string, string>,
    totalPrice: number
  ) => {
    const newOrder: OrderItem = {
      id: `ORD-${Date.now()}`,
      product,
      selectedColor,
      selectedVariants,
      totalPrice,
      orderedAt: new Date().toISOString(),
      status: 'pending',
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const clearOrders = useCallback(() => {
    setOrders([]);
  }, []);

  return {
    orders,
    addOrder,
    clearOrders,
    orderCount: orders.length,
  };
};
