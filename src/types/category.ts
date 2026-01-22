import { LucideIcon } from 'lucide-react';

export interface Brand {
  id: string;
  name: string;
  slug: string;
}

export interface DeviceType {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  brands: Brand[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  deviceTypes: DeviceType[];
}

export interface CategoryPath {
  category?: Category;
  deviceType?: DeviceType;
  brand?: Brand;
}
