import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductSidebar } from '@/components/ProductSidebar';
import { CartDrawer } from '@/components/CartDrawer';
import { CompareModal } from '@/components/CompareModal';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { OrderHistoryDrawer } from '@/components/OrderHistoryDrawer';
import { BottomBar } from '@/components/BottomBar';
import { ProductReviews } from '@/components/ProductReviews';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ARPreview } from '@/components/ARPreview';
import { DemoBanner } from '@/components/DemoBanner';
import { PortfolioFooter } from '@/components/PortfolioFooter';
import { Header } from '@/components/Header';
import { ProductViewerSection } from '@/components/ProductViewerSection';
import { AccountSidebar } from '@/components/AccountSidebar';
import { useCartStore } from '@/hooks/useCartStore';
import { useCompareStore } from '@/hooks/useCompareStore';
import { useWishlistStore } from '@/hooks/useWishlistStore';
import { useOrderHistory } from '@/hooks/useOrderHistory';
import { useTheme } from '@/hooks/useTheme';
import { useIsMobile } from '@/hooks/use-mobile';
import { products } from '@/data/products';
import { getReviewsForProduct, getAverageRating, getReviewCount } from '@/data/reviews';
import { Product, ProductColor } from '@/types/product';
import { toast } from 'sonner';

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

  const isMobile = useIsMobile();
  const [isQuickViewExpanded, setIsQuickViewExpanded] = useState(false);
  const [isAccountSidebarOpen, setIsAccountSidebarOpen] = useState(false);

  const [cameraView, setCameraView] = useState('front');
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 6]);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0, 0]);

  const { theme, toggleTheme } = useTheme();

  const { items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount } = useCartStore();
  const { compareItems, addToCompare, removeFromCompare, isInCompare } = useCompareStore();
  const { wishlistItems, addToWishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlistStore();
  const { orders, addOrder, orderCount } = useOrderHistory();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAROpen, setIsAROpen] = useState(false);

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

  const handleAddToWishlist = useCallback(() => {
    addToWishlist(selectedProduct, selectedColor, selectedVariants, totalPrice);
  }, [selectedProduct, selectedColor, selectedVariants, totalPrice, addToWishlist]);

  const handleMoveToCart = useCallback((item: any) => {
    addToCart(item.product, item.selectedColor, item.selectedVariants, item.totalPrice);
    removeFromWishlist(item.id);
  }, [addToCart, removeFromWishlist]);

  const handleCheckoutComplete = useCallback(() => {
    toast.success('Order placed successfully!', {
      description: `Your ${selectedProduct.name} will be shipped within 3-5 business days.`,
    });
  }, [selectedProduct.name]);

  const averageRating = selectedProduct.averageRating || getAverageRating(selectedProduct.id);
  const reviewCount = selectedProduct.reviewCount || getReviewCount(selectedProduct.id);

  return (
    <div className="min-h-screen overflow-hidden">
      <DemoBanner />
      <PortfolioFooter />

      <ProductSidebar
        products={products}
        selectedProduct={selectedProduct}
        onSelectProduct={handleProductSelect}
      />

      <AccountSidebar
        isOpen={isAccountSidebarOpen}
        onClose={() => setIsAccountSidebarOpen(false)}
      />

      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        itemCount={itemCount}
        compareCount={compareItems.length}
        wishlistCount={wishlistCount}
        orderCount={orderCount}
        onCartClick={() => setIsCartOpen(true)}
        onCompareClick={() => setIsCompareOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onOrderHistoryClick={() => setIsOrderHistoryOpen(true)}
        onMenuClick={() => setIsAccountSidebarOpen(true)}
      />

      <ProductViewerSection
        product={selectedProduct}
        color={selectedColor}
        cameraView={cameraView}
        cameraPosition={cameraPosition}
        cameraTarget={cameraTarget}
        isMobile={isMobile}
        isQuickViewExpanded={isQuickViewExpanded}
        isInCompare={isInCompare(selectedProduct.id)}
        isWishlisted={wishlistItems.some(i => i.product.id === selectedProduct.id)}
        rating={averageRating}
        reviewCount={reviewCount}
        onViewChange={handleViewChange}
        onQuickViewToggle={() => setIsQuickViewExpanded(!isQuickViewExpanded)}
        onAddToWishlist={handleAddToWishlist}
        onOpenAR={() => setIsAROpen(true)}
        onOpenReviews={() => setIsReviewsOpen(true)}
      />

      <BottomBar
        product={selectedProduct}
        selectedColor={selectedColor}
        selectedVariants={selectedVariants}
        totalPrice={totalPrice}
        onColorSelect={handleColorSelect}
        onVariantSelect={handleVariantSelect}
        onOrder={() => setIsCheckoutOpen(true)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        cartTotal={cartTotal}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        items={compareItems}
        onRemove={removeFromCompare}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemove={removeFromWishlist}
        onMoveToCart={handleMoveToCart}
        onClear={clearWishlist}
      />

      <OrderHistoryDrawer
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
      />

      <ProductReviews
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        reviews={getReviewsForProduct(selectedProduct.id)}
        productName={selectedProduct.name}
        averageRating={averageRating}
      />

      {/* Checkout Modal - TODO: Fix types */}
      {/* <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={selectedProduct}
        onComplete={handleCheckoutComplete}
      />

      <ARPreview
        isOpen={isAROpen}
        onClose={() => setIsAROpen(false)}
        product={selectedProduct}
        color={selectedColor.hex}
      /> */}
    </div>
  );
};

export default Index;
