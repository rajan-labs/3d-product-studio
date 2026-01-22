import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, GitCompare, Heart, Package, Sun, Moon } from 'lucide-react';
import { ProductScene } from '@/components/3d/ProductScene';
import { ProductSidebar } from '@/components/ProductSidebar';
import { ProductGallery } from '@/components/ProductGallery';
import { CartDrawer } from '@/components/CartDrawer';
import { CompareModal } from '@/components/CompareModal';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { OrderHistoryDrawer } from '@/components/OrderHistoryDrawer';
import { BottomBar } from '@/components/BottomBar';
import { useCartStore } from '@/hooks/useCartStore';
import { useCompareStore } from '@/hooks/useCompareStore';
import { useWishlistStore } from '@/hooks/useWishlistStore';
import { useOrderHistory } from '@/hooks/useOrderHistory';
import { useTheme } from '@/hooks/useTheme';
import { useIsMobile } from '@/hooks/use-mobile';
import { products } from '@/data/products';
import { getDeviceTypeIcon } from '@/data/categories';
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

  // Mobile Quick View state
  const isMobile = useIsMobile();
  const [isQuickViewExpanded, setIsQuickViewExpanded] = useState(false);

  // Camera controls
  const [cameraView, setCameraView] = useState('front');
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 6]);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0, 0]);

  // Theme
  const { theme, toggleTheme } = useTheme();

  // Cart & Compare
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount } = useCartStore();
  const { compareItems, addToCompare, removeFromCompare, isInCompare } = useCompareStore();
  const { wishlistItems, addToWishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlistStore();
  const { orders, addOrder, orderCount } = useOrderHistory();

  // Drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
    const newVariants: Record<string, string> = {};
    product.variants.forEach((v) => {
      newVariants[v.id] = v.options[0].id;
    });
    setSelectedVariants(newVariants);
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
    // Auto-collapse on mobile after selection
    if (isMobile) {
      setIsQuickViewExpanded(false);
    }
  }, [isMobile]);

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

  const handleAddToWishlist = useCallback(() => {
    addToWishlist(selectedProduct, selectedColor, selectedVariants, totalPrice);
  }, [selectedProduct, selectedColor, selectedVariants, totalPrice, addToWishlist]);

  const handleMoveToCart = useCallback((item: any) => {
    addToCart(item.product, item.selectedColor, item.selectedVariants, item.totalPrice);
    removeFromWishlist(item.id);
  }, [addToCart, removeFromWishlist]);

  const handleOrder = useCallback(() => {
    addOrder(selectedProduct, selectedColor, selectedVariants, totalPrice);
    
    console.log('Order Placed:', {
      product: selectedProduct.name,
      color: selectedColor.name,
      totalPrice,
    });
    
    alert(`Order placed!\n\nProduct: ${selectedProduct.name}\nColor: ${selectedColor.name}\nTotal: $${totalPrice.toLocaleString()}`);
  }, [selectedProduct, selectedColor, selectedVariants, totalPrice, addOrder]);

  const ProductIcon = getDeviceTypeIcon(selectedProduct.deviceType);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Sidebar */}
      <ProductSidebar
        products={products}
        selectedProduct={selectedProduct}
        onSelectProduct={handleProductSelect}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 right-0 left-0 z-10 p-3 lg:p-4 flex items-center justify-between glass-panel border-b border-border"
      >
        <div className="ml-14 lg:ml-80">
          <h1 className="text-lg lg:text-2xl font-display font-bold">
            <span className="glow-text">Virtual</span>{' '}
            <span className="text-foreground hidden sm:inline">Product Studio</span>
          </h1>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1.5 lg:gap-2">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 lg:p-2.5 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          >
            {theme === 'dark' ? <Sun size={16} className="lg:w-[18px] lg:h-[18px]" /> : <Moon size={16} className="lg:w-[18px] lg:h-[18px]" />}
          </motion.button>

          {/* Order History */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOrderHistoryOpen(true)}
            className="relative p-2 lg:p-2.5 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          >
            <Package size={16} className="lg:w-[18px] lg:h-[18px]" />
            {orderCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                {orderCount}
              </span>
            )}
          </motion.button>

          {/* Wishlist */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 lg:p-2.5 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          >
            <Heart size={16} className="lg:w-[18px] lg:h-[18px]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </motion.button>

          {/* Compare */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCompareOpen(true)}
            className="relative p-2 lg:p-2.5 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          >
            <GitCompare size={16} className="lg:w-[18px] lg:h-[18px]" />
            {compareItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                {compareItems.length}
              </span>
            )}
          </motion.button>

          {/* Cart */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 lg:p-2.5 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          >
            <ShoppingCart size={16} className="lg:w-[18px] lg:h-[18px]" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* Full-screen 3D Viewer */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 pt-14 lg:pt-16 pb-20"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedProduct.id}-${selectedColor.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <ProductScene 
              productType={selectedProduct.id} 
              color={selectedColor.hex}
              cameraPosition={cameraPosition}
              cameraTarget={cameraTarget}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Product name overlay - Responsive */}
        <div className="absolute bottom-24 lg:bottom-28 left-4 lg:left-80 pointer-events-none">
          <motion.div
            key={selectedProduct.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-panel px-3 py-2 lg:px-4 lg:py-2 rounded-lg flex items-center gap-2"
          >
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <ProductIcon size={16} className="text-primary lg:w-5 lg:h-5" />
            </div>
            <div>
              <span className="font-display font-semibold text-sm lg:text-base">{selectedProduct.name}</span>
              <p className="text-[10px] lg:text-xs text-muted-foreground">{selectedProduct.brandName}</p>
            </div>
          </motion.div>
        </div>

        {/* Product Gallery - RESPONSIVE: Desktop fixed, Mobile bottom sheet */}
        {!isMobile ? (
          // Desktop: Fixed position on the right
          <div className="absolute bottom-28 right-4 w-56">
            <ProductGallery 
              productName={selectedProduct.name} 
              colorName={selectedColor.name}
              selectedView={cameraView}
              onViewChange={handleViewChange}
            />
          </div>
        ) : (
          // Mobile: Collapsible floating button + bottom sheet
          <>
            {/* Floating Quick View Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsQuickViewExpanded(!isQuickViewExpanded)}
              className="absolute bottom-24 right-4 p-3 glass-panel rounded-full shadow-lg z-10"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${isQuickViewExpanded ? 'rotate-180' : ''}`}
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </motion.button>

            {/* Mobile Quick View Bottom Sheet */}
            <AnimatePresence>
              {isQuickViewExpanded && (
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="absolute bottom-20 left-4 right-4 glass-panel rounded-2xl p-4 z-10 shadow-2xl"
                >
                  <ProductGallery 
                    productName={selectedProduct.name} 
                    colorName={selectedColor.name}
                    selectedView={cameraView}
                    onViewChange={handleViewChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Wishlist button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToWishlist}
          className="absolute top-16 lg:top-20 right-4 p-2.5 lg:p-3 glass-panel rounded-full hover:bg-secondary/50 transition-colors"
        >
          <Heart size={18} className={`lg:w-5 lg:h-5 ${wishlistItems.some(i => i.product.id === selectedProduct.id) ? 'fill-primary text-primary' : ''}`} />
        </motion.button>

        {/* Compare indicator */}
        {isInCompare(selectedProduct.id) && (
          <div className="absolute top-16 lg:top-20 right-14 lg:right-16">
            <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <GitCompare size={12} />
              <span className="hidden sm:inline">In Compare</span>
            </span>
          </div>
        )}
      </motion.main>

      {/* Bottom Bar with Price & Order */}
      <BottomBar
        product={selectedProduct}
        selectedColor={selectedColor}
        selectedVariants={selectedVariants}
        totalPrice={totalPrice}
        onColorSelect={handleColorSelect}
        onVariantSelect={handleVariantSelect}
        onOrder={handleOrder}
        onAddToCart={handleAddToCart}
      />

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

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemove={removeFromWishlist}
        onMoveToCart={handleMoveToCart}
        onClear={clearWishlist}
      />

      {/* Order History Drawer */}
      <OrderHistoryDrawer
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
      />
    </div>
  );
};

export default Index;
