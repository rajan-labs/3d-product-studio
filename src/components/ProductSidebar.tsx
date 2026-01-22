import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Search, X, Cpu } from 'lucide-react';
import { Product } from '@/types/product';
import { categories } from '@/data/categories';
import { getDeviceTypeIcon } from '@/data/categories';

interface ProductSidebarProps {
  products: Product[];
  selectedProduct: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductSidebar = ({ products, selectedProduct, onSelectProduct }: ProductSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('electronics');
  const [expandedDeviceType, setExpandedDeviceType] = useState<string | null>(selectedProduct.deviceType);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brandName.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const groupedProducts = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    filteredProducts.forEach((product) => {
      if (!grouped[product.deviceType]) {
        grouped[product.deviceType] = [];
      }
      grouped[product.deviceType].push(product);
    });
    return grouped;
  }, [filteredProducts]);

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
            className="fixed left-0 top-0 h-full w-72 lg:w-80 glass-panel z-20 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu size={20} className="text-primary" />
                <h2 className="text-lg font-display font-bold">Electronics</h2>
              </div>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-10 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Tree */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
              {searchQuery ? (
                // Search Results
                <div className="space-y-1">
                  {filteredProducts.length === 0 ? (
                    <p className="text-center text-muted-foreground text-sm py-8">No products found</p>
                  ) : (
                    filteredProducts.map((product) => {
                      const Icon = getDeviceTypeIcon(product.deviceType);
                      return (
                        <motion.button
                          key={product.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => onSelectProduct(product)}
                          className={`w-full text-left p-3 rounded-xl transition-all ${
                            selectedProduct.id === product.id
                              ? 'bg-primary/10 border border-primary/30'
                              : 'hover:bg-secondary/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${selectedProduct.id === product.id ? 'bg-primary/20' : 'bg-secondary'}`}>
                              <Icon size={16} className={selectedProduct.id === product.id ? 'text-primary' : 'text-muted-foreground'} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-medium text-sm truncate">{product.name}</h3>
                              <p className="text-xs text-muted-foreground">{product.brandName} - ${product.basePrice.toLocaleString()}</p>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })
                  )}
                </div>
              ) : (
                // Category Tree
                categories.map((category) => (
                  <div key={category.id} className="mb-2">
                    {/* Category Header */}
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <category.icon size={18} className="text-primary" />
                        <span className="font-semibold text-sm">{category.name}</span>
                      </div>
                      {expandedCategory === category.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {/* Device Types */}
                    <AnimatePresence>
                      {expandedCategory === category.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-2"
                        >
                          {category.deviceTypes.map((deviceType) => {
                            const DeviceIcon = deviceType.icon;
                            const deviceProducts = groupedProducts[deviceType.id] || [];
                            const hasProducts = deviceProducts.length > 0;
                            
                            return (
                              <div key={deviceType.id} className="mb-1">
                                {/* Device Type Header */}
                                <button
                                  onClick={() => setExpandedDeviceType(expandedDeviceType === deviceType.id ? null : deviceType.id)}
                                  disabled={!hasProducts}
                                  className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-colors ${
                                    hasProducts ? 'hover:bg-secondary/50' : 'opacity-50 cursor-not-allowed'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <DeviceIcon size={14} className="text-muted-foreground" />
                                    <span className="text-sm">{deviceType.name}</span>
                                    {hasProducts && (
                                      <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full">
                                        {deviceProducts.length}
                                      </span>
                                    )}
                                  </div>
                                  {hasProducts && (
                                    expandedDeviceType === deviceType.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                                  )}
                                </button>

                                {/* Products */}
                                <AnimatePresence>
                                  {expandedDeviceType === deviceType.id && hasProducts && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden pl-4 space-y-1"
                                    >
                                      {deviceProducts.map((product) => (
                                        <motion.button
                                          key={product.id}
                                          whileHover={{ x: 4 }}
                                          whileTap={{ scale: 0.98 }}
                                          onClick={() => onSelectProduct(product)}
                                          className={`w-full text-left p-2.5 rounded-lg transition-all ${
                                            selectedProduct.id === product.id
                                              ? 'bg-primary/15 border-l-2 border-primary'
                                              : 'hover:bg-secondary/30 border-l-2 border-transparent'
                                          }`}
                                        >
                                          <div className="flex items-center justify-between">
                                            <div className="min-w-0">
                                              <p className={`text-sm truncate ${selectedProduct.id === product.id ? 'font-medium text-primary' : ''}`}>
                                                {product.name}
                                              </p>
                                              <p className="text-xs text-muted-foreground">{product.brandName}</p>
                                            </div>
                                            <span className={`text-xs font-medium ${selectedProduct.id === product.id ? 'text-primary' : 'text-muted-foreground'}`}>
                                              ${product.basePrice.toLocaleString()}
                                            </span>
                                          </div>
                                        </motion.button>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-secondary/20">
              <p className="text-xs text-muted-foreground text-center">
                <span className="text-primary font-medium">{products.length}</span> Products Available
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
