import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Settings } from 'lucide-react';
import { useState } from 'react';
import { Product, ProductColor } from '@/types/product';
import { getDeviceTypeIcon } from '@/data/categories';

interface BottomBarProps {
  product: Product;
  selectedColor: ProductColor;
  selectedVariants: Record<string, string>;
  totalPrice: number;
  onColorSelect: (color: ProductColor) => void;
  onVariantSelect: (variantId: string, optionId: string) => void;
  onOrder: () => void;
  onAddToCart: () => void;
}

export const BottomBar = ({
  product,
  selectedColor,
  selectedVariants,
  totalPrice,
  onColorSelect,
  onVariantSelect,
  onOrder,
}: BottomBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = getDeviceTypeIcon(product.deviceType);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-30"
    >
      {/* Expandable Customization Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass-panel border-t border-border overflow-hidden"
          >
            <div className="max-w-4xl mx-auto p-4 space-y-4">
              {/* Colors */}
              <div>
                <h4 className="text-sm font-medium mb-2">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => onColorSelect(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor.id === color.id
                          ? 'border-primary scale-110 ring-2 ring-primary/30'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Variants */}
              {product.variants.map((variant) => (
                <div key={variant.id}>
                  <h4 className="text-sm font-medium mb-2">{variant.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => onVariantSelect(variant.id, option.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedVariants[variant.id] === option.id
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                      >
                        {option.label}
                        {option.price !== 0 && (
                          <span className="ml-1 opacity-70">
                            {option.price > 0 ? `+$${option.price}` : `-$${Math.abs(option.price)}`}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bar */}
      <div className="glass-panel border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Product Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Icon size={20} className="text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">{product.name}</h3>
              <p className="text-xs text-muted-foreground truncate">
                {selectedColor.name}
              </p>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2.5 rounded-xl transition-all ${
              isExpanded ? 'bg-primary/20 text-primary' : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            <Settings size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </motion.button>

          {/* Price */}
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total</p>
            <p className="text-lg font-bold text-primary">${totalPrice.toLocaleString()}</p>
          </div>

          {/* Order Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOrder}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Order Now</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
