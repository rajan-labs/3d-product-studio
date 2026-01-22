export type ProductType = 'mobile' | 'laptop' | 'pc' | 'tablet' | 'watch' | 'tv' | 'camera' | 'drone' | 'vr' | 'audio' | 'gaming' | 'accessories';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  price: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: {
    id: string;
    label: string;
    price: number;
  }[];
}

export interface Product {
  id: ProductType;
  name: string;
  basePrice: number;
  description: string;
  brandId: string;
  brandName: string;
  deviceType: string;
  colors: ProductColor[];
  variants: ProductVariant[];
}

export interface ConfiguredProduct {
  product: Product;
  selectedColor: ProductColor;
  selectedVariants: Record<string, string>;
  totalPrice: number;
}
