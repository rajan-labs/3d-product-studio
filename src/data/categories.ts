import { 
  Cpu, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Monitor, 
  Watch, 
  Camera, 
  Tv, 
  Headphones,
  Gamepad2,
  Plane,
  Glasses,
  Speaker,
  Keyboard,
  Mouse,
  HardDrive,
  Wifi,
  Battery
} from 'lucide-react';
import { Category } from '@/types/category';

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: Cpu,
    deviceTypes: [
      {
        id: 'mobile',
        name: 'Mobile Phones',
        slug: 'mobile-phones',
        icon: Smartphone,
        brands: [
          { id: 'quantum', name: 'Quantum', slug: 'quantum' },
          { id: 'nexus', name: 'Nexus', slug: 'nexus' },
          { id: 'nova', name: 'Nova', slug: 'nova' },
          { id: 'zenith', name: 'Zenith', slug: 'zenith' },
          { id: 'apex', name: 'Apex', slug: 'apex' },
        ],
      },
      {
        id: 'laptop',
        name: 'Laptops',
        slug: 'laptops',
        icon: Laptop,
        brands: [
          { id: 'novapro', name: 'NovaPro', slug: 'novapro' },
          { id: 'titan', name: 'Titan', slug: 'titan' },
          { id: 'pulse', name: 'Pulse', slug: 'pulse' },
          { id: 'zenbook', name: 'ZenBook', slug: 'zenbook' },
          { id: 'spectre', name: 'Spectre', slug: 'spectre' },
        ],
      },
      {
        id: 'tablet',
        name: 'Tablets',
        slug: 'tablets',
        icon: Tablet,
        brands: [
          { id: 'canvas', name: 'Canvas', slug: 'canvas' },
          { id: 'slate', name: 'Slate', slug: 'slate' },
          { id: 'prism', name: 'Prism', slug: 'prism' },
          { id: 'pad', name: 'Pad', slug: 'pad' },
        ],
      },
      {
        id: 'pc',
        name: 'Desktop PCs',
        slug: 'desktop-pcs',
        icon: Monitor,
        brands: [
          { id: 'titanx', name: 'TitanX', slug: 'titanx' },
          { id: 'vortex', name: 'Vortex', slug: 'vortex' },
          { id: 'aurora', name: 'Aurora', slug: 'aurora' },
          { id: 'nexgen', name: 'NexGen', slug: 'nexgen' },
        ],
      },
      {
        id: 'watch',
        name: 'Smart Watches',
        slug: 'smart-watches',
        icon: Watch,
        brands: [
          { id: 'pulse', name: 'Pulse', slug: 'pulse' },
          { id: 'fitmax', name: 'FitMax', slug: 'fitmax' },
          { id: 'chronos', name: 'Chronos', slug: 'chronos' },
          { id: 'vita', name: 'Vita', slug: 'vita' },
        ],
      },
      {
        id: 'camera',
        name: 'Cameras',
        slug: 'cameras',
        icon: Camera,
        brands: [
          { id: 'proshot', name: 'ProShot', slug: 'proshot' },
          { id: 'capture', name: 'Capture', slug: 'capture' },
          { id: 'vision', name: 'Vision', slug: 'vision' },
          { id: 'optix', name: 'Optix', slug: 'optix' },
        ],
      },
      {
        id: 'tv',
        name: 'Smart TVs',
        slug: 'smart-tvs',
        icon: Tv,
        brands: [
          { id: 'visionary', name: 'Visionary', slug: 'visionary' },
          { id: 'lumix', name: 'Lumix', slug: 'lumix' },
          { id: 'brilliance', name: 'Brilliance', slug: 'brilliance' },
          { id: 'vivid', name: 'Vivid', slug: 'vivid' },
        ],
      },
      {
        id: 'drone',
        name: 'Drones',
        slug: 'drones',
        icon: Plane,
        brands: [
          { id: 'skypro', name: 'SkyPro', slug: 'skypro' },
          { id: 'aero', name: 'Aero', slug: 'aero' },
          { id: 'falcon', name: 'Falcon', slug: 'falcon' },
          { id: 'phantom', name: 'Phantom', slug: 'phantom' },
        ],
      },
      {
        id: 'vr',
        name: 'VR Headsets',
        slug: 'vr-headsets',
        icon: Glasses,
        brands: [
          { id: 'visionx', name: 'VisionX', slug: 'visionx' },
          { id: 'immerse', name: 'Immerse', slug: 'immerse' },
          { id: 'realm', name: 'Realm', slug: 'realm' },
          { id: 'oasis', name: 'Oasis', slug: 'oasis' },
        ],
      },
      {
        id: 'audio',
        name: 'Audio',
        slug: 'audio',
        icon: Headphones,
        brands: [
          { id: 'sonic', name: 'Sonic', slug: 'sonic' },
          { id: 'bass', name: 'Bass', slug: 'bass' },
          { id: 'harmony', name: 'Harmony', slug: 'harmony' },
          { id: 'echo', name: 'Echo', slug: 'echo' },
        ],
      },
      {
        id: 'gaming',
        name: 'Gaming',
        slug: 'gaming',
        icon: Gamepad2,
        brands: [
          { id: 'nexplay', name: 'NexPlay', slug: 'nexplay' },
          { id: 'prozone', name: 'ProZone', slug: 'prozone' },
          { id: 'victrix', name: 'Victrix', slug: 'victrix' },
          { id: 'razer', name: 'Razer', slug: 'razer' },
        ],
      },
      {
        id: 'accessories',
        name: 'Accessories',
        slug: 'accessories',
        icon: Keyboard,
        brands: [
          { id: 'techmate', name: 'TechMate', slug: 'techmate' },
          { id: 'connect', name: 'Connect', slug: 'connect' },
          { id: 'prime', name: 'Prime', slug: 'prime' },
          { id: 'essential', name: 'Essential', slug: 'essential' },
        ],
      },
    ],
  },
];

export const deviceTypeLabels: Record<string, string> = {
  mobile: 'Mobile Phones',
  laptop: 'Laptops',
  tablet: 'Tablets',
  pc: 'Desktop PCs',
  watch: 'Smart Watches',
  camera: 'Cameras',
  tv: 'Smart TVs',
  drone: 'Drones',
  vr: 'VR Headsets',
  audio: 'Audio',
  gaming: 'Gaming',
  accessories: 'Accessories',
};

export const getDeviceTypeIcon = (deviceTypeId: string) => {
  const iconMap: Record<string, typeof Smartphone> = {
    mobile: Smartphone,
    laptop: Laptop,
    tablet: Tablet,
    pc: Monitor,
    watch: Watch,
    camera: Camera,
    tv: Tv,
    drone: Plane,
    vr: Glasses,
    audio: Headphones,
    gaming: Gamepad2,
    accessories: Keyboard,
  };
  return iconMap[deviceTypeId] || Cpu;
};
