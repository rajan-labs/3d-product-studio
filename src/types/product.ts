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

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export interface Product {
  id: string;
  productType: ProductType;
  name: string;
  basePrice: number;
  description: string;
  brandId: string;
  brandName: string;
  deviceType: string;
  colors: ProductColor[];
  variants: ProductVariant[];
  reviews?: ProductReview[];
  averageRating?: number;
  reviewCount?: number;
}

export interface ConfiguredProduct {
  product: Product;
  selectedColor: ProductColor;
  selectedVariants: Record<string, string>;
  totalPrice: number;
}

export interface CheckoutFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Shipping Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  // Payment
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}
