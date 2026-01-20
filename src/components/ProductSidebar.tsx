import { motion } from 'framer-motion';
import { Product } from '@/types/product';

interface ProductSidebarProps {
  products: Product[];
  selectedProduct: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductSidebar = ({ products, selectedProduct, onSelectProduct }: ProductSidebarProps) => {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel w-full lg:w-80 p-6 rounded-2xl overflow-hidden"
    >
      <h2 className="text-xl font-display font-bold mb-6 glow-text">Products</h2>
      
      <div className="space-y-3">
        {products.map((product, index) => (
          <motion.button
            key={product.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectProduct(product)}
            className={`product-card w-full text-left ${
              selectedProduct.id === product.id ? 'active' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{product.icon}</span>
              <div>
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground">${product.basePrice.toLocaleString()}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-4 rounded-xl bg-secondary/50"
      >
        <p className="text-sm text-muted-foreground">
          <span className="text-primary font-semibold">Tip:</span> Drag to rotate the 3D model. 
          Scroll to zoom in/out.
        </p>
      </motion.div>
    </motion.aside>
  );
};
