import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import { SearchFilter } from './SearchFilter';

interface ProductSidebarProps {
  products: Product[];
  selectedProduct: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductSidebar = ({ products, selectedProduct, onSelectProduct }: ProductSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Toggle Button - visible when collapsed */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => setIsCollapsed(false)}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-20 p-3 glass-panel rounded-full hover:bg-secondary/50 transition-colors"
          >
            <ChevronRight size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-72 glass-panel z-20 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-display font-bold glow-text">Products</h2>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
            </div>

            {/* Search & Filters */}
            <div className="p-4 border-b border-border">
              <SearchFilter
                products={products}
                onFilter={setFilteredProducts}
                onSearch={setSearchQuery}
              />
            </div>

            {/* Product List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
              {filteredProducts.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-4">
                  No products found
                </p>
              ) : (
                filteredProducts.map((product, index) => (
                  <motion.button
                    key={product.id}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectProduct(product)}
                    className={`product-card w-full text-left ${
                      selectedProduct.id === product.id ? 'active' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{product.icon}</span>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-sm truncate">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">${product.basePrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>

            {/* Tip */}
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-semibold">Tip:</span> Drag to rotate. Scroll to zoom.
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
