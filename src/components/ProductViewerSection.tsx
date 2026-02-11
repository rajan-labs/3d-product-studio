import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Camera, GitCompare } from 'lucide-react';
import { ProductScene } from '@/components/3d/ProductScene';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ProductRatingBadge } from '@/components/ProductRatingBadge';
import { ProductGallery } from '@/components/ProductGallery';
import { Product, ProductColor } from '@/types/product';
import { getDeviceTypeIcon } from '@/data/categories';

interface ProductViewerSectionProps {
  product: Product;
  color: ProductColor;
  cameraView: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  isMobile: boolean;
  isQuickViewExpanded: boolean;
  isInCompare: boolean;
  isWishlisted: boolean;
  rating: number;
  reviewCount: number;
  onViewChange: (id: string, pos: [number, number, number], target: [number, number, number]) => void;
  onQuickViewToggle: () => void;
  onAddToWishlist: () => void;
  onOpenAR: () => void;
  onOpenReviews: () => void;
}

export const ProductViewerSection = ({
  product,
  color,
  cameraView,
  cameraPosition,
  cameraTarget,
  isMobile,
  isQuickViewExpanded,
  isInCompare,
  isWishlisted,
  rating,
  reviewCount,
  onViewChange,
  onQuickViewToggle,
  onAddToWishlist,
  onOpenAR,
  onOpenReviews,
}: ProductViewerSectionProps) => {
  const ProductIcon = getDeviceTypeIcon(product.deviceType);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 pt-14 lg:pt-16 pb-20"
      role="main"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${product.id}-${color.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <ProductScene
            productType={product.productType}
            color={color.hex}
            cameraPosition={cameraPosition}
            cameraTarget={cameraTarget}
          />
        </motion.div>
      </AnimatePresence>

      {/* Breadcrumb Navigation */}
      <div className="absolute top-2 left-4 lg:left-80 z-10">
        <Breadcrumb product={product} />
      </div>

      {/* Product name overlay */}
      <div className="absolute bottom-24 lg:bottom-28 left-4 lg:left-80 pointer-events-none">
        <motion.div
          key={product.id}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-panel px-3 py-2 lg:px-4 lg:py-2 rounded-lg flex items-center gap-2"
        >
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <ProductIcon size={16} className="text-primary lg:w-5 lg:h-5" />
          </div>
          <div>
            <span className="font-display font-semibold text-sm lg:text-base">{product.name}</span>
            <p className="text-[10px] lg:text-xs text-muted-foreground">{product.brandName}</p>
          </div>
        </motion.div>

        {/* Rating Badge */}
        <div className="mt-2 pointer-events-auto">
          <ProductRatingBadge
            rating={rating}
            reviewCount={reviewCount}
            onClick={onOpenReviews}
          />
        </div>
      </div>

      {/* Product Gallery - RESPONSIVE */}
      {!isMobile ? (
        <div className="absolute bottom-28 right-4 w-56">
          <ProductGallery
            productName={product.name}
            colorName={color.name}
            selectedView={cameraView}
            onViewChange={onViewChange}
          />
        </div>
      ) : (
        <>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onQuickViewToggle}
            className="absolute bottom-24 right-4 p-3 glass-panel rounded-full shadow-lg z-10"
            aria-label="Toggle quick view"
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
                  productName={product.name}
                  colorName={color.name}
                  selectedView={cameraView}
                  onViewChange={onViewChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Wishlist & AR buttons */}
      <div className="absolute top-16 lg:top-20 right-4 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddToWishlist}
          className="p-2.5 lg:p-3 glass-panel rounded-full hover:bg-secondary/50 transition-colors"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Bookmark
            size={18}
            className={`lg:w-5 lg:h-5 ${isWishlisted ? 'fill-primary text-primary' : ''}`}
          />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenAR}
          className="p-2.5 lg:p-3 glass-panel rounded-full hover:bg-secondary/50 transition-colors group"
          aria-label="Open AR preview"
        >
          <Camera size={18} className="lg:w-5 lg:h-5 group-hover:text-primary transition-colors" />
        </motion.button>
      </div>

      {/* Compare indicator */}
      {isInCompare && (
        <div className="absolute top-32 lg:top-36 right-4">
          <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs flex items-center gap-1" aria-live="polite">
            <GitCompare size={12} />
            <span className="hidden sm:inline">In Compare</span>
          </span>
        </div>
      )}
    </motion.main>
  );
};
