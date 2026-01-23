import { Product, ProductType } from '@/types/product';

export const products: Product[] = [
  // ========== MOBILE PHONES ==========
  {
    id: 'mobile-quantum-pro',
    productType: 'mobile',
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
    ],
    averageRating: 4.8,
    reviewCount: 156,
  },
  {
    id: 'mobile-nexus-ultra',
    productType: 'mobile',
    name: 'Nexus Ultra X',
    basePrice: 1199,
    description: 'Flagship phone with 200MP camera system',
    brandId: 'nexus',
    brandName: 'Nexus',
    deviceType: 'mobile',
    colors: [
      { id: 'phantom', name: 'Phantom Black', hex: '#0f0f0f', price: 0 },
      { id: 'cream', name: 'Cream White', hex: '#f5f5dc', price: 0 },
      { id: 'burgundy', name: 'Burgundy Red', hex: '#722f37', price: 75 },
    ],
    variants: [
      {
        id: 'storage',
        name: 'Storage',
        options: [
          { id: '256gb', label: '256 GB', price: 0 },
          { id: '512gb', label: '512 GB', price: 150 },
          { id: '1tb', label: '1 TB', price: 350 },
        ],
      },
      {
        id: 'camera',
        name: 'Camera',
        options: [
          { id: '108mp', label: '108 MP', price: 0 },
          { id: '200mp', label: '200 MP Pro', price: 200 },
        ],
      },
    ],
    averageRating: 4.6,
    reviewCount: 89,
  },
  {
    id: 'mobile-zenith-fold',
    productType: 'mobile',
    name: 'Zenith Fold Pro',
    basePrice: 1799,
    description: 'Revolutionary foldable smartphone',
    brandId: 'zenith',
    brandName: 'Zenith',
    deviceType: 'mobile',
    colors: [
      { id: 'graphite', name: 'Graphite', hex: '#383838', price: 0 },
      { id: 'ice', name: 'Ice Blue', hex: '#a5d8ff', price: 100 },
    ],
    variants: [
      {
        id: 'storage',
        name: 'Storage',
        options: [
          { id: '512gb', label: '512 GB', price: 0 },
          { id: '1tb', label: '1 TB', price: 300 },
        ],
      },
    ],
    averageRating: 4.4,
    reviewCount: 45,
  },
  
  // ========== LAPTOPS ==========
  {
    id: 'laptop-novapro-ultra',
    productType: 'laptop',
    name: 'NovaPro Ultra',
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
        ],
      },
      {
        id: 'ram',
        name: 'RAM',
        options: [
          { id: '16gb', label: '16 GB', price: 0 },
          { id: '32gb', label: '32 GB', price: 200 },
          { id: '64gb', label: '64 GB', price: 500 },
        ],
      },
      {
        id: 'storage',
        name: 'Storage',
        options: [
          { id: '512gb', label: '512 GB SSD', price: 0 },
          { id: '1tb', label: '1 TB SSD', price: 150 },
          { id: '2tb', label: '2 TB SSD', price: 350 },
        ],
      },
    ],
    averageRating: 4.9,
    reviewCount: 234,
  },
  {
    id: 'laptop-titan-gaming',
    productType: 'laptop',
    name: 'Titan Gaming X',
    basePrice: 2299,
    description: 'Ultimate gaming laptop with RTX graphics',
    brandId: 'titan',
    brandName: 'Titan',
    deviceType: 'laptop',
    colors: [
      { id: 'black', name: 'Stealth Black', hex: '#0a0a0a', price: 0 },
      { id: 'rgb', name: 'RGB Edition', hex: '#7c3aed', price: 100 },
    ],
    variants: [
      {
        id: 'gpu',
        name: 'Graphics',
        options: [
          { id: 'rtx4070', label: 'RTX 4070', price: 0 },
          { id: 'rtx4080', label: 'RTX 4080', price: 400 },
          { id: 'rtx4090', label: 'RTX 4090', price: 800 },
        ],
      },
      {
        id: 'display',
        name: 'Display',
        options: [
          { id: '144hz', label: '15.6" 144Hz', price: 0 },
          { id: '240hz', label: '17.3" 240Hz', price: 300 },
        ],
      },
    ],
    averageRating: 4.7,
    reviewCount: 112,
  },
  {
    id: 'laptop-spectre-elite',
    productType: 'laptop',
    name: 'Spectre Elite 360',
    basePrice: 1899,
    description: 'Convertible laptop with OLED display',
    brandId: 'spectre',
    brandName: 'Spectre',
    deviceType: 'laptop',
    colors: [
      { id: 'nightfall', name: 'Nightfall Black', hex: '#1a1a1a', price: 0 },
      { id: 'poseidon', name: 'Poseidon Blue', hex: '#1e4d6b', price: 50 },
    ],
    variants: [
      {
        id: 'processor',
        name: 'Processor',
        options: [
          { id: 'i7', label: 'Intel i7', price: 0 },
          { id: 'i9', label: 'Intel i9', price: 400 },
        ],
      },
      {
        id: 'storage',
        name: 'Storage',
        options: [
          { id: '512gb', label: '512 GB', price: 0 },
          { id: '1tb', label: '1 TB', price: 200 },
        ],
      },
    ],
    averageRating: 4.5,
    reviewCount: 78,
  },

  // ========== DESKTOP PCs ==========
  {
    id: 'pc-titanx-workstation',
    productType: 'pc',
    name: 'TitanX Workstation',
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
          { id: 'rtx4070', label: 'RTX 4070', price: 0 },
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
    averageRating: 4.8,
    reviewCount: 67,
  },
  {
    id: 'pc-aurora-creator',
    productType: 'pc',
    name: 'Aurora Creator Pro',
    basePrice: 3499,
    description: 'Professional content creation workstation',
    brandId: 'aurora',
    brandName: 'Aurora',
    deviceType: 'pc',
    colors: [
      { id: 'lunar', name: 'Lunar White', hex: '#f0f0f0', price: 0 },
      { id: 'cosmic', name: 'Cosmic Black', hex: '#0d0d0d', price: 0 },
    ],
    variants: [
      {
        id: 'processor',
        name: 'Processor',
        options: [
          { id: 'threadripper', label: 'Threadripper Pro', price: 0 },
          { id: 'xeon', label: 'Intel Xeon', price: 500 },
        ],
      },
      {
        id: 'ram',
        name: 'RAM',
        options: [
          { id: '64gb', label: '64 GB ECC', price: 0 },
          { id: '128gb', label: '128 GB ECC', price: 600 },
        ],
      },
    ],
    averageRating: 4.9,
    reviewCount: 34,
  },

  // ========== TABLETS ==========
  {
    id: 'tablet-canvas-pro',
    productType: 'tablet',
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
    averageRating: 4.6,
    reviewCount: 189,
  },
  {
    id: 'tablet-slate-air',
    productType: 'tablet',
    name: 'Slate Air Ultra',
    basePrice: 599,
    description: 'Lightweight tablet for everyday productivity',
    brandId: 'slate',
    brandName: 'Slate',
    deviceType: 'tablet',
    colors: [
      { id: 'silver', name: 'Silver', hex: '#c0c0c0', price: 0 },
      { id: 'blue', name: 'Sky Blue', hex: '#38bdf8', price: 30 },
      { id: 'pink', name: 'Rose', hex: '#f472b6', price: 30 },
    ],
    variants: [
      {
        id: 'storage',
        name: 'Storage',
        options: [
          { id: '64gb', label: '64 GB', price: 0 },
          { id: '128gb', label: '128 GB', price: 80 },
          { id: '256gb', label: '256 GB', price: 160 },
        ],
      },
      {
        id: 'connectivity',
        name: 'Connectivity',
        options: [
          { id: 'wifi', label: 'Wi-Fi', price: 0 },
          { id: 'cellular', label: 'Wi-Fi + Cellular', price: 130 },
        ],
      },
    ],
    averageRating: 4.4,
    reviewCount: 256,
  },

  // ========== SMART WATCHES ==========
  {
    id: 'watch-pulse-ultra',
    productType: 'watch',
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
    averageRating: 4.7,
    reviewCount: 312,
  },
  {
    id: 'watch-chronos-elite',
    productType: 'watch',
    name: 'Chronos Elite',
    basePrice: 599,
    description: 'Luxury smartwatch with sapphire crystal',
    brandId: 'chronos',
    brandName: 'Chronos',
    deviceType: 'watch',
    colors: [
      { id: 'platinum', name: 'Platinum', hex: '#e5e4e2', price: 0 },
      { id: 'black', name: 'Obsidian Black', hex: '#0a0a0a', price: 0 },
    ],
    variants: [
      {
        id: 'size',
        name: 'Case Size',
        options: [
          { id: '44mm', label: '44mm', price: 0 },
          { id: '48mm', label: '48mm', price: 100 },
        ],
      },
      {
        id: 'strap',
        name: 'Strap',
        options: [
          { id: 'leather', label: 'Premium Leather', price: 0 },
          { id: 'titanium', label: 'Titanium Bracelet', price: 300 },
        ],
      },
    ],
    averageRating: 4.8,
    reviewCount: 87,
  },

  // ========== SMART TVs ==========
  {
    id: 'tv-visionary-oled',
    productType: 'tv',
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
    ],
    averageRating: 4.9,
    reviewCount: 156,
  },
  {
    id: 'tv-lumix-gaming',
    productType: 'tv',
    name: 'Lumix Gaming Display',
    basePrice: 1499,
    description: 'High refresh rate gaming TV with VRR',
    brandId: 'lumix',
    brandName: 'Lumix',
    deviceType: 'tv',
    colors: [
      { id: 'black', name: 'Matte Black', hex: '#1a1a1a', price: 0 },
    ],
    variants: [
      {
        id: 'size',
        name: 'Screen Size',
        options: [
          { id: '48', label: '48 inch', price: 0 },
          { id: '55', label: '55 inch', price: 300 },
          { id: '65', label: '65 inch', price: 600 },
        ],
      },
      {
        id: 'refresh',
        name: 'Refresh Rate',
        options: [
          { id: '120hz', label: '120Hz', price: 0 },
          { id: '144hz', label: '144Hz', price: 200 },
        ],
      },
    ],
    averageRating: 4.6,
    reviewCount: 89,
  },

  // ========== CAMERAS ==========
  {
    id: 'camera-proshot-dslr',
    productType: 'camera',
    name: 'ProShot DSLR',
    basePrice: 1299,
    description: 'Professional mirrorless camera for creators',
    brandId: 'proshot',
    brandName: 'ProShot',
    deviceType: 'camera',
    colors: [
      { id: 'black', name: 'Classic Black', hex: '#1a1a1a', price: 0 },
      { id: 'silver', name: 'Silver Chrome', hex: '#c0c0c0', price: 100 },
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
        ],
      },
    ],
    averageRating: 4.8,
    reviewCount: 124,
  },
  {
    id: 'camera-vision-vlog',
    productType: 'camera',
    name: 'Vision Vlog Pro',
    basePrice: 899,
    description: 'Compact camera optimized for vlogging',
    brandId: 'vision',
    brandName: 'Vision',
    deviceType: 'camera',
    colors: [
      { id: 'black', name: 'Stealth Black', hex: '#0a0a0a', price: 0 },
      { id: 'white', name: 'Pearl White', hex: '#fafafa', price: 50 },
    ],
    variants: [
      {
        id: 'video',
        name: 'Video Quality',
        options: [
          { id: '4k60', label: '4K 60fps', price: 0 },
          { id: '4k120', label: '4K 120fps', price: 300 },
        ],
      },
      {
        id: 'stabilization',
        name: 'Stabilization',
        options: [
          { id: 'ois', label: 'OIS', price: 0 },
          { id: 'ibis', label: 'IBIS + OIS', price: 200 },
        ],
      },
    ],
    averageRating: 4.5,
    reviewCount: 78,
  },

  // ========== DRONES ==========
  {
    id: 'drone-skypro-x1',
    productType: 'drone',
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
    ],
    variants: [
      {
        id: 'camera',
        name: 'Camera Resolution',
        options: [
          { id: '4k', label: '4K Ultra HD', price: 0 },
          { id: '6k', label: '6K Pro', price: 300 },
          { id: '8k', label: '8K Cinema', price: 700 },
        ],
      },
      {
        id: 'flight',
        name: 'Flight Time',
        options: [
          { id: '30min', label: '30 Minutes', price: 0 },
          { id: '45min', label: '45 Minutes', price: 200 },
        ],
      },
    ],
    averageRating: 4.6,
    reviewCount: 67,
  },
  {
    id: 'drone-falcon-mini',
    productType: 'drone',
    name: 'Falcon Mini',
    basePrice: 449,
    description: 'Compact foldable drone for travel',
    brandId: 'falcon',
    brandName: 'Falcon',
    deviceType: 'drone',
    colors: [
      { id: 'gray', name: 'Dark Gray', hex: '#374151', price: 0 },
      { id: 'orange', name: 'Sunset Orange', hex: '#fb923c', price: 30 },
    ],
    variants: [
      {
        id: 'camera',
        name: 'Camera',
        options: [
          { id: '1080p', label: '1080p HD', price: 0 },
          { id: '4k', label: '4K', price: 100 },
        ],
      },
      {
        id: 'battery',
        name: 'Battery Pack',
        options: [
          { id: 'single', label: 'Single Battery', price: 0 },
          { id: 'triple', label: 'Triple Pack', price: 80 },
        ],
      },
    ],
    averageRating: 4.3,
    reviewCount: 145,
  },

  // ========== VR HEADSETS ==========
  {
    id: 'vr-visionx-pro',
    productType: 'vr',
    name: 'VisionX Pro',
    basePrice: 499,
    description: 'Immersive virtual reality headset',
    brandId: 'visionx',
    brandName: 'VisionX',
    deviceType: 'vr',
    colors: [
      { id: 'black', name: 'Matte Black', hex: '#1a1a1a', price: 0 },
      { id: 'white', name: 'Pure White', hex: '#f8fafc', price: 0 },
    ],
    variants: [
      {
        id: 'display',
        name: 'Display Resolution',
        options: [
          { id: '2k', label: '2K per Eye', price: 0 },
          { id: '4k', label: '4K per Eye', price: 300 },
        ],
      },
      {
        id: 'controllers',
        name: 'Controllers',
        options: [
          { id: 'standard', label: 'Standard Controllers', price: 0 },
          { id: 'haptic', label: 'Haptic Pro Controllers', price: 150 },
        ],
      },
    ],
    averageRating: 4.5,
    reviewCount: 89,
  },
  {
    id: 'vr-immerse-quest',
    productType: 'vr',
    name: 'Immerse Quest',
    basePrice: 699,
    description: 'Standalone VR with mixed reality',
    brandId: 'immerse',
    brandName: 'Immerse',
    deviceType: 'vr',
    colors: [
      { id: 'black', name: 'Obsidian', hex: '#0f0f0f', price: 0 },
    ],
    variants: [
      {
        id: 'storage',
        name: 'Storage',
        options: [
          { id: '128gb', label: '128 GB', price: 0 },
          { id: '256gb', label: '256 GB', price: 100 },
          { id: '512gb', label: '512 GB', price: 200 },
        ],
      },
      {
        id: 'headstrap',
        name: 'Head Strap',
        options: [
          { id: 'standard', label: 'Standard Strap', price: 0 },
          { id: 'elite', label: 'Elite Strap', price: 50 },
          { id: 'battery', label: 'Battery Strap', price: 100 },
        ],
      },
    ],
    averageRating: 4.7,
    reviewCount: 156,
  },

  // ========== AUDIO ==========
  {
    id: 'audio-sonic-elite',
    productType: 'audio',
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
    ],
    variants: [
      {
        id: 'driver',
        name: 'Driver Size',
        options: [
          { id: '40mm', label: '40mm Drivers', price: 0 },
          { id: '50mm', label: '50mm Drivers', price: 50 },
        ],
      },
      {
        id: 'anc',
        name: 'Noise Cancellation',
        options: [
          { id: 'active', label: 'Active ANC', price: 0 },
          { id: 'adaptive', label: 'Adaptive ANC Pro', price: 80 },
        ],
      },
    ],
    averageRating: 4.6,
    reviewCount: 234,
  },
  {
    id: 'audio-harmony-buds',
    productType: 'audio',
    name: 'Harmony Buds Pro',
    basePrice: 199,
    description: 'True wireless earbuds with spatial audio',
    brandId: 'harmony',
    brandName: 'Harmony',
    deviceType: 'audio',
    colors: [
      { id: 'white', name: 'Cloud White', hex: '#fafafa', price: 0 },
      { id: 'black', name: 'Midnight', hex: '#0f0f0f', price: 0 },
      { id: 'coral', name: 'Coral', hex: '#f97171', price: 20 },
    ],
    variants: [
      {
        id: 'tips',
        name: 'Ear Tips',
        options: [
          { id: 'silicone', label: 'Silicone Tips', price: 0 },
          { id: 'foam', label: 'Memory Foam', price: 20 },
        ],
      },
      {
        id: 'case',
        name: 'Charging Case',
        options: [
          { id: 'standard', label: 'Standard Case', price: 0 },
          { id: 'wireless', label: 'Wireless Charging', price: 30 },
        ],
      },
    ],
    averageRating: 4.4,
    reviewCount: 567,
  },

  // ========== GAMING ==========
  {
    id: 'gaming-nexplay-station',
    productType: 'gaming',
    name: 'NexPlay Station',
    basePrice: 499,
    description: 'Next-generation gaming console',
    brandId: 'nexplay',
    brandName: 'NexPlay',
    deviceType: 'gaming',
    colors: [
      { id: 'black', name: 'Cosmic Black', hex: '#0a0a0a', price: 0 },
      { id: 'white', name: 'Stellar White', hex: '#fafafa', price: 0 },
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
    ],
    averageRating: 4.8,
    reviewCount: 456,
  },
  {
    id: 'gaming-victrix-controller',
    productType: 'gaming',
    name: 'Victrix Pro Controller',
    basePrice: 179,
    description: 'Professional esports controller',
    brandId: 'victrix',
    brandName: 'Victrix',
    deviceType: 'gaming',
    colors: [
      { id: 'black', name: 'Onyx Black', hex: '#0f0f0f', price: 0 },
      { id: 'white', name: 'Arctic White', hex: '#f5f5f5', price: 0 },
      { id: 'purple', name: 'Pro Purple', hex: '#7c3aed', price: 20 },
    ],
    variants: [
      {
        id: 'platform',
        name: 'Platform',
        options: [
          { id: 'pc', label: 'PC', price: 0 },
          { id: 'playstation', label: 'PlayStation', price: 0 },
          { id: 'xbox', label: 'Xbox', price: 0 },
        ],
      },
      {
        id: 'triggers',
        name: 'Triggers',
        options: [
          { id: 'standard', label: 'Standard', price: 0 },
          { id: 'adjustable', label: 'Adjustable', price: 30 },
        ],
      },
    ],
    averageRating: 4.7,
    reviewCount: 189,
  },

  // ========== ACCESSORIES ==========
  {
    id: 'accessories-techmate-keyboard',
    productType: 'accessories',
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
    ],
    variants: [
      {
        id: 'switches',
        name: 'Switch Type',
        options: [
          { id: 'linear', label: 'Linear Red', price: 0 },
          { id: 'tactile', label: 'Tactile Brown', price: 0 },
          { id: 'clicky', label: 'Clicky Blue', price: 0 },
        ],
      },
      {
        id: 'layout',
        name: 'Layout',
        options: [
          { id: 'full', label: 'Full Size', price: 0 },
          { id: 'tkl', label: 'TKL (87 Keys)', price: 0 },
          { id: '75', label: '75% Compact', price: 20 },
        ],
      },
    ],
    averageRating: 4.5,
    reviewCount: 312,
  },
  {
    id: 'accessories-prime-mouse',
    productType: 'accessories',
    name: 'Prime Gaming Mouse',
    basePrice: 129,
    description: 'Ultra-lightweight gaming mouse',
    brandId: 'prime',
    brandName: 'Prime',
    deviceType: 'accessories',
    colors: [
      { id: 'black', name: 'Matte Black', hex: '#0f0f0f', price: 0 },
      { id: 'white', name: 'Ghost White', hex: '#fafafa', price: 0 },
    ],
    variants: [
      {
        id: 'dpi',
        name: 'DPI',
        options: [
          { id: '16000', label: '16,000 DPI', price: 0 },
          { id: '25000', label: '25,000 DPI', price: 30 },
        ],
      },
      {
        id: 'connectivity',
        name: 'Connectivity',
        options: [
          { id: 'wired', label: 'Wired', price: 0 },
          { id: 'wireless', label: 'Wireless', price: 40 },
        ],
      },
    ],
    averageRating: 4.6,
    reviewCount: 234,
  },
];

export const getProductsByDeviceType = (deviceType: string): Product[] => {
  return products.filter(p => p.deviceType === deviceType);
};

export const getProductsByBrand = (brandId: string): Product[] => {
  return products.filter(p => p.brandId === brandId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};
