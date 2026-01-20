import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'mobile',
    name: 'Quantum Phone',
    basePrice: 999,
    description: 'Next-gen smartphone with holographic display',
    icon: '📱',
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
  },
  {
    id: 'laptop',
    name: 'NovaPro Laptop',
    basePrice: 1499,
    description: 'Ultra-thin powerhouse for professionals',
    icon: '💻',
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
  {
    id: 'pc',
    name: 'TitanX Desktop',
    basePrice: 2499,
    description: 'Ultimate gaming and creative workstation',
    icon: '🖥️',
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
  {
    id: 'tablet',
    name: 'Canvas Pro',
    basePrice: 799,
    description: 'Creative tablet for artists and designers',
    icon: '📲',
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
  {
    id: 'watch',
    name: 'Pulse Ultra',
    basePrice: 399,
    description: 'Smart fitness watch with health monitoring',
    icon: '⌚',
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
  {
    id: 'tv',
    name: 'Visionary OLED',
    basePrice: 1999,
    description: 'Immersive 4K OLED smart television',
    icon: '📺',
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
];
