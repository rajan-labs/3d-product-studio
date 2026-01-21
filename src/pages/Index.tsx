import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, GitCompare } from 'lucide-react';
import { ProductScene } from '@/components/3d/ProductScene';
import { ProductSidebar } from '@/components/ProductSidebar';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { ProductGallery } from '@/components/ProductGallery';
import { CartDrawer } from '@/components/CartDrawer';
import { CompareModal } from '@/components/CompareModal';
import { useCartStore } from '@/hooks/useCartStore';
import { useCompareStore } from '@/hooks/useCompareStore';
import { products } from '@/data/products';
import { Product, ProductColor } from '@/types/product';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(products[0].colors[0]);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    products[0].variants.forEach((v) => {
      initial[v.id] = v.options[0].id;
    });
    return initial;
  });

  // Camera controls
  const [cameraView, setCameraView] = useState('front');
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 6]);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0, 0]);

  // Cart & Compare
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount } = useCartStore();
  const { compareItems, addToCompare, removeFromCompare, clearCompare, isInCompare } = useCompareStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
    const newVariants: Record<string, string> = {};
    product.variants.forEach((v) => {
      newVariants[v.id] = v.options[0].id;
    });
    setSelectedVariants(newVariants);
    // Reset camera view
    setCameraView('front');
    setCameraPosition([0, 0, 6]);
    setCameraTarget([0, 0, 0]);
  }, []);

  const handleColorSelect = useCallback((color: ProductColor) => {
    setSelectedColor(color);
  }, []);

  const handleVariantSelect = useCallback((variantId: string, optionId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantId]: optionId,
    }));
  }, []);

  const handleViewChange = useCallback((viewId: string, position: [number, number, number], target: [number, number, number]) => {
    setCameraView(viewId);
    setCameraPosition(position);
    setCameraTarget(target);
  }, []);

  const totalPrice = useMemo(() => {
    let price = selectedProduct.basePrice + selectedColor.price;
    
    selectedProduct.variants.forEach((variant) => {
      const selectedOptionId = selectedVariants[variant.id];
      const option = variant.options.find((o) => o.id === selectedOptionId);
      if (option) {
        price += option.price;
      }
    });
    
    return price;
  }, [selectedProduct, selectedColor, selectedVariants]);

  const handleAddToCart = useCallback(() => {
    addToCart(selectedProduct, selectedColor, selectedVariants, totalPrice);
    setIsCartOpen(true);
  }, [selectedProduct, selectedColor, selectedVariants, totalPrice, addToCart]);

  const handleAddToCompare = useCallback(() => {
    addToCompare(selectedProduct, selectedColor, selectedVariants, totalPrice);
    if (compareItems.length >= 1) {
      setIsCompareOpen(true);
    }
  }, [selectedProduct, selectedColor, selectedVariants, totalPrice, addToCompare, compareItems.length]);

  const handleOrder = useCallback(() => {
    const configuredProduct = {
      product: selectedProduct.name,
      productId: selectedProduct.id,
      color: selectedColor.name,
      variants: Object.entries(selectedVariants).map(([variantId, optionId]) => {
        const variant = selectedProduct.variants.find((v) => v.id === variantId);
        const option = variant?.options.find((o) => o.id === optionId);
        return {
          variant: variant?.name,
          option: option?.label,
          price: option?.price,
        };
      }),
      totalPrice,
      timestamp: new Date().toISOString(),
    };
    
    console.log('🛒 Order Placed:', configuredProduct);
    alert(`Order placed! Check console for details.\n\nProduct: ${selectedProduct.name}\nColor: ${selectedColor.name}\nTotal: $${totalPrice.toLocaleString()}`);
  }, [selectedProduct, selectedColor, selectedVariants, totalPrice]);

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="text-center flex-1">
          <h1 className="text-3xl lg:text-5xl font-display font-bold mb-2">
            <span className="glow-text">Virtual</span>{' '}
            <span className="text-foreground">Product Studio</span>
          </h1>
          <p className="text-muted-foreground">Configure your dream device in 3D</p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {/* Compare Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCompareOpen(true)}
            className="relative p-3 glass-panel rounded-xl hover:bg-secondary/50 transition-colors"
          >
            <GitCompare size={22} />
            {compareItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {compareItems.length}
              </span>
            )}
          </motion.button>

          {/* Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 glass-panel rounded-xl hover:bg-secondary/50 transition-colors"
          >
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-[1800px] mx-auto">
        {/* Product Sidebar */}
        <ProductSidebar
          products={products}
          selectedProduct={selectedProduct}
          onSelectProduct={handleProductSelect}
        />

        {/* 3D Viewer */}
        <motion.main
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 glass-panel rounded-2xl overflow-hidden min-h-[400px] lg:min-h-[600px] relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedProduct.id}-${selectedColor.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ProductScene 
                productType={selectedProduct.id} 
                color={selectedColor.hex}
                cameraPosition={cameraPosition}
                cameraTarget={cameraTarget}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Product name overlay */}
          <div className="absolute bottom-4 left-4 pointer-events-none">
            <motion.div
              key={selectedProduct.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="glass-panel px-4 py-2 rounded-lg"
            >
              <span className="text-2xl mr-2">{selectedProduct.icon}</span>
              <span className="font-display font-semibold">{selectedProduct.name}</span>
            </motion.div>
          </div>

          {/* Product Gallery with sync */}
          <div className="absolute bottom-4 right-4 w-64">
            <ProductGallery 
              productName={selectedProduct.name} 
              colorName={selectedColor.name}
              selectedView={cameraView}
              onViewChange={handleViewChange}
            />
          </div>

          {/* Compare indicator */}
          {isInCompare(selectedProduct.id) && (
            <div className="absolute top-4 right-4">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <GitCompare size={14} />
                In Compare
              </span>
            </div>
          )}
        </motion.main>

        {/* Customization Panel */}
        <CustomizationPanel
          product={selectedProduct}
          selectedColor={selectedColor}
          selectedVariants={selectedVariants}
          totalPrice={totalPrice}
          onColorSelect={handleColorSelect}
          onVariantSelect={handleVariantSelect}
          onOrder={handleOrder}
          onAddToCart={handleAddToCart}
          onAddToCompare={handleAddToCompare}
          isInCompare={isInCompare(selectedProduct.id)}
        />
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8 text-sm text-muted-foreground"
      >
        <p>© 2026 Virtual Product Studio. All products are for demonstration purposes.</p>
      </motion.footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        cartTotal={cartTotal}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
      />

      {/* Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        items={compareItems}
        onRemove={removeFromCompare}
      />
    </div>
  );
};

export default Index;
