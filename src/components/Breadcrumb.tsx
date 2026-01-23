import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { Product } from '@/types/product';
import { getDeviceTypeIcon, deviceTypeLabels } from '@/data/categories';

interface BreadcrumbProps {
  product: Product;
  className?: string;
}

export const Breadcrumb = ({ product, className = '' }: BreadcrumbProps) => {
  const DeviceIcon = getDeviceTypeIcon(product.deviceType);

  const crumbs = [
    { label: 'Electronics', icon: Home },
    { label: deviceTypeLabels[product.deviceType] || product.deviceType, icon: DeviceIcon },
    { label: product.brandName },
    { label: product.name, isActive: true },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-1 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {crumbs.map((crumb, index) => {
        const Icon = crumb.icon;
        return (
          <div key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight size={14} className="text-muted-foreground/50" />}
            <span
              className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                crumb.isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {Icon && <Icon size={14} />}
              <span className="hidden sm:inline">{crumb.label}</span>
              {!Icon && <span className="sm:hidden">{crumb.label.substring(0, 3)}</span>}
            </span>
          </div>
        );
      })}
    </motion.nav>
  );
};
