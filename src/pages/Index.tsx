import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductScene } from '@/components/3d/ProductScene';
import { ProductSidebar } from '@/components/ProductSidebar';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { ProductGallery } from '@/components/ProductGallery';
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

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
    const newVariants: Record<string, string> = {};
    product.variants.forEach((v) => {
      newVariants[v.id] = v.options[0].id;
    });
    setSelectedVariants(newVariants);
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
        className="text-center mb-8"
      >
        <h1 className="text-3xl lg:text-5xl font-display font-bold mb-2">
          <span className="glow-text">Virtual</span>{' '}
          <span className="text-foreground">Product Studio</span>
        </h1>
        <p className="text-muted-foreground">Configure your dream device in 3D</p>
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
              <ProductScene productType={selectedProduct.id} color={selectedColor.hex} />
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

          {/* Product Gallery */}
          <div className="absolute bottom-4 right-4 w-64">
            <ProductGallery 
              productName={selectedProduct.name} 
              colorName={selectedColor.name} 
            />
          </div>
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
    </div>
  );
};

export default Index;
