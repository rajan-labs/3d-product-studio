import { Product } from '@/types/product';

export const products: Product[] = [
  // MOBILE PHONES
  {
    id: 'mobile',
    name: 'Quantum Phone Pro',
    basePrice: 999,
    description: 'Next-gen smartphone with holographic display',
    brandId: 'quantum',
    brandName: 'Quantum',
    deviceType: 'mobile',
    colors: [
      { id: 'midnight', name: 'Midnight Black', hex: '#1a1a2e', price: 0 },
      { id: 'arctic', name: 'Arctic Silver', hex: '#c0c0c0', price: 0 },
      { id: 'ocean', name: 'Ocean Blue', hex: '#0ea5e9', price: 50 },
      { id: 'sunset', name: 'Sunset Gold', hex: '#f59e0b', price: 100 },
      { id: 'rose', name: 'Rose Pink', hex: '#ec4899', price: 50 },
    ],
    variants: [
      {
        id: 'storage',
        name: 'Storage',
        options: [
          { id: '128gb', label: '128 GB', price: 0 },
          { id: '256gb', label: '256 GB', price: 100 },
          { id: '512gb', label: '512 GB', price: 200 },
          { id: '1tb', label: '1 TB', price: 400 },
        ],
      },
      {
        id: 'ram',
        name: 'RAM',
        options: [
          { id: '8gb', label: '8 GB', price: 0 },
          { id: '12gb', label: '12 GB', price: 50 },
          { id: '16gb', label: '16 GB', price: 100 },
        ],
      },
      {
        id: 'camera',
        name: 'Camera',
        options: [
          { id: '12mp', label: '12 MP', price: 0 },
          { id: '48mp', label: '48 MP', price: 100 },
          { id: '108mp', label: '108 MP Pro', price: 200 },
          { id: '200mp', label: '200 MP Ultra', price: 400 },
        ],
      },
    ],
  },
  // LAPTOPS
  {
    id: 'laptop',
    name: 'NovaPro Laptop',
    basePrice: 1499,
    description: 'Ultra-thin powerhouse for professionals',
    brandId: 'novapro',
    brandName: 'NovaPro',
    deviceType: 'laptop',
    colors: [
      { id: 'space', name: 'Space Gray', hex: '#374151', price: 0 },
      { id: 'silver', name: 'Pure Silver', hex: '#e5e7eb', price: 0 },
      { id: 'midnight', name: 'Midnight Blue', hex: '#1e3a5f', price: 100 },
      { id: 'gold', name: 'Champagne Gold', hex: '#d4af37', price: 150 },
    ],
    variants: [
      {
        id: 'processor',
        name: 'Processor',
        options: [
          { id: 'i5', label: 'Intel i5', price: 0 },
          { id: 'i7', label: 'Intel i7', price: 200 },
          { id: 'i9', label: 'Intel i9', price: 500 },
          { id: 'm3', label: 'Apple M3', price: 300 },
        ],
      },
      {
        id: 'ram',
        name: 'RAM',
        options: [
          { id: '8gb', label: '8 GB', price: 0 },
          { id: '16gb', label: '16 GB', price: 100 },
          { id: '32gb', label: '32 GB', price: 300 },
          { id: '64gb', label: '64 GB', price: 600 },
        ],
      },
      {
        id: 'storage',
        name: 'Storage',
        options: [
          { id: '256gb', label: '256 GB SSD', price: 0 },
          { id: '512gb', label: '512 GB SSD', price: 100 },
          { id: '1tb', label: '1 TB SSD', price: 200 },
          { id: '2tb', label: '2 TB SSD', price: 400 },
        ],
      },
    ],
  },
  // DESKTOP PCs
  {
    id: 'pc',
    name: 'TitanX Desktop',
    basePrice: 2499,
    description: 'Ultimate gaming and creative workstation',
    brandId: 'titanx',
    brandName: 'TitanX',
    deviceType: 'pc',
    colors: [
      { id: 'obsidian', name: 'Obsidian Black', hex: '#0f0f0f', price: 0 },
      { id: 'white', name: 'Arctic White', hex: '#f8fafc', price: 50 },
      { id: 'rgb', name: 'RGB Gaming', hex: '#8b5cf6', price: 100 },
    ],
    variants: [
      {
        id: 'gpu',
        name: 'Graphics Card',
        options: [
          { id: 'rtx4060', label: 'RTX 4060', price: 0 },
          { id: 'rtx4070', label: 'RTX 4070', price: 200 },
          { id: 'rtx4080', label: 'RTX 4080', price: 500 },
          { id: 'rtx4090', label: 'RTX 4090', price: 1000 },
        ],
      },
      {
        id: 'processor',
        name: 'Processor',
        options: [
          { id: 'r7', label: 'Ryzen 7', price: 0 },
          { id: 'r9', label: 'Ryzen 9', price: 300 },
          { id: 'i9', label: 'Intel i9', price: 400 },
        ],
      },
      {
        id: 'cooling',
        name: 'Cooling',
        options: [
          { id: 'air', label: 'Air Cooling', price: 0 },
          { id: 'aio', label: 'AIO Liquid', price: 100 },
          { id: 'custom', label: 'Custom Loop', price: 400 },
        ],
      },
    ],
  },
  // TABLETS
  {
    id: 'tablet',
    name: 'Canvas Pro',
    basePrice: 799,
    description: 'Creative tablet for artists and designers',
    brandId: 'canvas',
    brandName: 'Canvas',
    deviceType: 'tablet',
    colors: [
      { id: 'slate', name: 'Slate Gray', hex: '#64748b', price: 0 },
      { id: 'white', name: 'Pearl White', hex: '#f1f5f9', price: 0 },
      { id: 'purple', name: 'Cosmic Purple', hex: '#7c3aed', price: 50 },
      { id: 'green', name: 'Forest Green', hex: '#059669', price: 50 },
    ],
    variants: [
      {
        id: 'size',
        name: 'Display Size',
        options: [
          { id: '11', label: '11 inch', price: 0 },
          { id: '12.9', label: '12.9 inch', price: 200 },
        ],
      },
      {
        id: 'storage',
        name: 'Storage',
        options: [
          { id: '128gb', label: '128 GB', price: 0 },
          { id: '256gb', label: '256 GB', price: 100 },
          { id: '512gb', label: '512 GB', price: 200 },
          { id: '1tb', label: '1 TB', price: 400 },
        ],
      },
      {
        id: 'stylus',
        name: 'Stylus',
        options: [
          { id: 'none', label: 'No Stylus', price: 0 },
          { id: 'basic', label: 'Basic Stylus', price: 99 },
          { id: 'pro', label: 'Pro Stylus', price: 199 },
        ],
      },
    ],
  },
  // SMART WATCHES
  {
    id: 'watch',
    name: 'Pulse Ultra',
    basePrice: 399,
    description: 'Smart fitness watch with health monitoring',
    brandId: 'pulse',
    brandName: 'Pulse',
    deviceType: 'watch',
    colors: [
      { id: 'graphite', name: 'Graphite', hex: '#1f2937', price: 0 },
      { id: 'silver', name: 'Silver', hex: '#d1d5db', price: 0 },
      { id: 'gold', name: 'Rose Gold', hex: '#fbbf24', price: 100 },
      { id: 'titanium', name: 'Titanium', hex: '#78716c', price: 200 },
    ],
    variants: [
      {
        id: 'size',
        name: 'Case Size',
        options: [
          { id: '41mm', label: '41mm', price: 0 },
          { id: '45mm', label: '45mm', price: 50 },
          { id: '49mm', label: '49mm Ultra', price: 200 },
        ],
      },
      {
        id: 'strap',
        name: 'Strap Type',
        options: [
          { id: 'sport', label: 'Sport Band', price: 0 },
          { id: 'leather', label: 'Leather', price: 99 },
          { id: 'metal', label: 'Metal Link', price: 199 },
          { id: 'titanium', label: 'Titanium', price: 349 },
        ],
      },
      {
        id: 'connectivity',
        name: 'Connectivity',
        options: [
          { id: 'gps', label: 'GPS Only', price: 0 },
          { id: 'cellular', label: 'GPS + Cellular', price: 100 },
        ],
      },
    ],
  },
  // SMART TVs
  {
    id: 'tv',
    name: 'Visionary OLED',
    basePrice: 1999,
    description: 'Immersive 4K OLED smart television',
    brandId: 'visionary',
    brandName: 'Visionary',
    deviceType: 'tv',
    colors: [
      { id: 'black', name: 'Classic Black', hex: '#171717', price: 0 },
      { id: 'silver', name: 'Brushed Silver', hex: '#a1a1aa', price: 100 },
    ],
    variants: [
      {
        id: 'size',
        name: 'Screen Size',
        options: [
          { id: '55', label: '55 inch', price: 0 },
          { id: '65', label: '65 inch', price: 500 },
          { id: '77', label: '77 inch', price: 1500 },
          { id: '83', label: '83 inch', price: 3000 },
        ],
      },
      {
        id: 'panel',
        name: 'Panel Type',
        options: [
          { id: 'oled', label: 'OLED', price: 0 },
          { id: 'qled', label: 'QLED', price: -200 },
          { id: 'microled', label: 'MicroLED', price: 2000 },
        ],
      },
      {
        id: 'audio',
        name: 'Audio System',
        options: [
          { id: 'built-in', label: 'Built-in Speakers', price: 0 },
          { id: 'soundbar', label: 'Soundbar Bundle', price: 299 },
          { id: 'dolby', label: 'Dolby Atmos System', price: 799 },
        ],
      },
    ],
  },
  // CAMERAS
  {
    id: 'camera',
    name: 'ProShot DSLR',
    basePrice: 1299,
    description: 'Professional mirrorless camera for creators',
    brandId: 'proshot',
    brandName: 'ProShot',
    deviceType: 'camera',
    colors: [
      { id: 'black', name: 'Classic Black', hex: '#1a1a1a', price: 0 },
      { id: 'silver', name: 'Silver Chrome', hex: '#c0c0c0', price: 100 },
      { id: 'titanium', name: 'Titanium Gray', hex: '#6b7280', price: 150 },
      { id: 'vintage', name: 'Vintage Brown', hex: '#8b4513', price: 200 },
    ],
    variants: [
      {
        id: 'sensor',
        name: 'Sensor',
        options: [
          { id: 'apsc', label: 'APS-C 24MP', price: 0 },
          { id: 'fullframe', label: 'Full Frame 45MP', price: 800 },
          { id: 'medium', label: 'Medium Format 100MP', price: 2500 },
        ],
      },
      {
        id: 'lens',
        name: 'Lens Kit',
        options: [
          { id: 'body', label: 'Body Only', price: 0 },
          { id: '24-70', label: '24-70mm f/2.8', price: 800 },
          { id: '70-200', label: '70-200mm f/2.8', price: 1200 },
          { id: 'prime', label: '50mm f/1.2 Prime', price: 1500 },
        ],
      },
      {
        id: 'video',
        name: 'Video',
        options: [
          { id: '4k30', label: '4K 30fps', price: 0 },
          { id: '4k60', label: '4K 60fps', price: 200 },
          { id: '8k30', label: '8K 30fps', price: 600 },
        ],
      },
    ],
  },
  // DRONES
  {
    id: 'drone',
    name: 'SkyPro X1',
    basePrice: 899,
    description: 'Professional aerial photography drone',
    brandId: 'skypro',
    brandName: 'SkyPro',
    deviceType: 'drone',
    colors: [
      { id: 'gray', name: 'Stealth Gray', hex: '#4b5563', price: 0 },
      { id: 'white', name: 'Arctic White', hex: '#f1f5f9', price: 0 },
      { id: 'orange', name: 'Rescue Orange', hex: '#f97316', price: 50 },
      { id: 'camo', name: 'Forest Camo', hex: '#365314', price: 100 },
    ],
    variants: [
      {
        id: 'camera',
        name: 'Camera Resolution',
        options: [
          { id: '1080p', label: '1080p HD', price: 0 },
          { id: '4k', label: '4K Ultra HD', price: 200 },
          { id: '6k', label: '6K Pro', price: 500 },
          { id: '8k', label: '8K Cinema', price: 1000 },
        ],
      },
      {
        id: 'flight',
        name: 'Flight Time',
        options: [
          { id: '20min', label: '20 Minutes', price: 0 },
          { id: '35min', label: '35 Minutes', price: 150 },
          { id: '45min', label: '45 Minutes', price: 300 },
        ],
      },
      {
        id: 'range',
        name: 'Control Range',
        options: [
          { id: '2km', label: '2 km', price: 0 },
          { id: '5km', label: '5 km', price: 100 },
          { id: '10km', label: '10 km', price: 250 },
        ],
      },
    ],
  },
  // VR HEADSETS
  {
    id: 'vr',
    name: 'VisionX Pro',
    basePrice: 499,
    description: 'Immersive virtual reality headset',
    brandId: 'visionx',
    brandName: 'VisionX',
    deviceType: 'vr',
    colors: [
      { id: 'black', name: 'Matte Black', hex: '#1a1a1a', price: 0 },
      { id: 'white', name: 'Pure White', hex: '#f8fafc', price: 0 },
      { id: 'blue', name: 'Electric Blue', hex: '#2563eb', price: 75 },
      { id: 'red', name: 'Racing Red', hex: '#dc2626', price: 75 },
    ],
    variants: [
      {
        id: 'display',
        name: 'Display Resolution',
        options: [
          { id: '2k', label: '2K per Eye', price: 0 },
          { id: '4k', label: '4K per Eye', price: 300 },
          { id: '8k', label: '8K per Eye', price: 800 },
        ],
      },
      {
        id: 'refresh',
        name: 'Refresh Rate',
        options: [
          { id: '72hz', label: '72 Hz', price: 0 },
          { id: '90hz', label: '90 Hz', price: 100 },
          { id: '120hz', label: '120 Hz', price: 200 },
        ],
      },
      {
        id: 'controllers',
        name: 'Controllers',
        options: [
          { id: 'standard', label: 'Standard Controllers', price: 0 },
          { id: 'haptic', label: 'Haptic Controllers', price: 150 },
          { id: 'pro', label: 'Pro Controllers', price: 250 },
        ],
      },
    ],
  },
  // AUDIO - Headphones
  {
    id: 'audio',
    name: 'Sonic Elite Pro',
    basePrice: 349,
    description: 'Premium wireless noise-canceling headphones',
    brandId: 'sonic',
    brandName: 'Sonic',
    deviceType: 'audio',
    colors: [
      { id: 'black', name: 'Stealth Black', hex: '#171717', price: 0 },
      { id: 'white', name: 'Pearl White', hex: '#f5f5f5', price: 0 },
      { id: 'navy', name: 'Navy Blue', hex: '#1e3a5f', price: 25 },
      { id: 'olive', name: 'Olive Green', hex: '#556b2f', price: 25 },
    ],
    variants: [
      {
        id: 'driver',
        name: 'Driver Size',
        options: [
          { id: '40mm', label: '40mm Drivers', price: 0 },
          { id: '50mm', label: '50mm Drivers', price: 50 },
          { id: '60mm', label: '60mm Planar', price: 150 },
        ],
      },
      {
        id: 'anc',
        name: 'Noise Cancellation',
        options: [
          { id: 'passive', label: 'Passive Only', price: 0 },
          { id: 'active', label: 'Active ANC', price: 80 },
          { id: 'adaptive', label: 'Adaptive ANC Pro', price: 150 },
        ],
      },
      {
        id: 'battery',
        name: 'Battery Life',
        options: [
          { id: '20hr', label: '20 Hours', price: 0 },
          { id: '40hr', label: '40 Hours', price: 50 },
          { id: '60hr', label: '60 Hours', price: 100 },
        ],
      },
    ],
  },
  // GAMING - Console
  {
    id: 'gaming',
    name: 'NexPlay Station',
    basePrice: 499,
    description: 'Next-generation gaming console',
    brandId: 'nexplay',
    brandName: 'NexPlay',
    deviceType: 'gaming',
    colors: [
      { id: 'black', name: 'Cosmic Black', hex: '#0a0a0a', price: 0 },
      { id: 'white', name: 'Stellar White', hex: '#fafafa', price: 0 },
      { id: 'blue', name: 'Deep Blue', hex: '#1e40af', price: 50 },
      { id: 'red', name: 'Volcano Red', hex: '#b91c1c', price: 50 },
    ],
    variants: [
      {
        id: 'storage',
        name: 'Storage',
        options: [
          { id: '512gb', label: '512 GB SSD', price: 0 },
          { id: '1tb', label: '1 TB SSD', price: 100 },
          { id: '2tb', label: '2 TB SSD', price: 250 },
        ],
      },
      {
        id: 'edition',
        name: 'Edition',
        options: [
          { id: 'standard', label: 'Standard', price: 0 },
          { id: 'digital', label: 'Digital Only', price: -50 },
          { id: 'pro', label: 'Pro Edition', price: 200 },
        ],
      },
      {
        id: 'controller',
        name: 'Extra Controller',
        options: [
          { id: 'none', label: 'No Extra', price: 0 },
          { id: 'one', label: '+1 Controller', price: 70 },
          { id: 'two', label: '+2 Controllers', price: 130 },
        ],
      },
    ],
  },
  // ACCESSORIES - Keyboard
  {
    id: 'accessories',
    name: 'TechMate Pro Keys',
    basePrice: 199,
    description: 'Mechanical wireless keyboard with RGB',
    brandId: 'techmate',
    brandName: 'TechMate',
    deviceType: 'accessories',
    colors: [
      { id: 'black', name: 'Stealth Black', hex: '#1a1a1a', price: 0 },
      { id: 'white', name: 'Arctic White', hex: '#f5f5f5', price: 0 },
      { id: 'pink', name: 'Sakura Pink', hex: '#f9a8d4', price: 30 },
      { id: 'mint', name: 'Mint Green', hex: '#a7f3d0', price: 30 },
    ],
    variants: [
      {
        id: 'switches',
        name: 'Switch Type',
        options: [
          { id: 'linear', label: 'Linear Red', price: 0 },
          { id: 'tactile', label: 'Tactile Brown', price: 0 },
          { id: 'clicky', label: 'Clicky Blue', price: 0 },
          { id: 'silent', label: 'Silent Pink', price: 20 },
        ],
      },
      {
        id: 'layout',
        name: 'Layout',
        options: [
          { id: 'full', label: 'Full Size', price: 0 },
          { id: 'tkl', label: 'TKL (87 Keys)', price: 0 },
          { id: '75', label: '75% Compact', price: 20 },
          { id: '60', label: '60% Mini', price: 30 },
        ],
      },
      {
        id: 'keycaps',
        name: 'Keycaps',
        options: [
          { id: 'abs', label: 'ABS Standard', price: 0 },
          { id: 'pbt', label: 'PBT Premium', price: 40 },
          { id: 'pudding', label: 'Pudding Caps', price: 50 },
        ],
      },
    ],
  },
];

export const getProductsByDeviceType = (deviceType: string): Product[] => {
  return products.filter(p => p.deviceType === deviceType);
};

export const getProductsByBrand = (brandId: string): Product[] => {
  return products.filter(p => p.brandId === brandId);
};
