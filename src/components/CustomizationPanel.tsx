import { motion } from 'framer-motion';
import { ShoppingCart, GitCompare } from 'lucide-react';
import { Product, ProductColor } from '@/types/product';

interface CustomizationPanelProps {
  product: Product;
  selectedColor: ProductColor;
  selectedVariants: Record<string, string>;
  totalPrice: number;
  onColorSelect: (color: ProductColor) => void;
  onVariantSelect: (variantId: string, optionId: string) => void;
  onOrder: () => void;
  onAddToCart: () => void;
  onAddToCompare: () => void;
  isInCompare: boolean;
}

export const CustomizationPanel = ({
  product,
  selectedColor,
  selectedVariants,
  totalPrice,
  onColorSelect,
  onVariantSelect,
  onOrder,
  onAddToCart,
  onAddToCompare,
  isInCompare,
}: CustomizationPanelProps) => {
  return (
    <motion.aside
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel w-full lg:w-96 p-6 rounded-2xl overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-hide"
    >
      {/* Product Info */}
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-display font-bold mb-2">{product.name}</h2>
        <p className="text-muted-foreground">{product.description}</p>
      </motion.div>

      {/* Color Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Color
        </h3>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <motion.button
              key={color.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onColorSelect(color)}
              className={`color-swatch ${selectedColor.id === color.id ? 'active' : ''}`}
              style={{ backgroundColor: color.hex }}
              title={`${color.name}${color.price > 0 ? ` (+$${color.price})` : ''}`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {selectedColor.name}
          {selectedColor.price > 0 && (
            <span className="text-primary ml-2">+${selectedColor.price}</span>
          )}
        </p>
      </div>

      {/* Variants */}
      {product.variants.map((variant) => (
        <motion.div
          key={variant.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {variant.name}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {variant.options.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onVariantSelect(variant.id, option.id)}
                className={`option-button ${
                  selectedVariants[variant.id] === option.id ? 'active' : ''
                }`}
              >
                <span className="block">{option.label}</span>
                {option.price !== 0 && (
                  <span className="text-xs text-muted-foreground">
                    {option.price > 0 ? `+$${option.price}` : `-$${Math.abs(option.price)}`}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Price & Order */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 pt-6 border-t border-border"
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg text-muted-foreground">Total Price</span>
          <span className="price-display">${totalPrice.toLocaleString()}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAddToCart}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAddToCompare}
            disabled={isInCompare}
            className={`p-3 rounded-xl transition-colors ${
              isInCompare 
                ? 'bg-primary/20 text-primary cursor-not-allowed' 
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            <GitCompare size={18} />
          </motion.button>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOrder}
          className="order-button"
        >
          Order Now
        </motion.button>
        
        <p className="text-xs text-center text-muted-foreground mt-4">
          Free shipping • 30-day returns • 2-year warranty
        </p>
      </motion.div>
    </motion.aside>
  );
};
