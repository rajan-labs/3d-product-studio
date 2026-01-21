import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { WishlistItem } from '@/hooks/useWishlistStore';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemove: (id: string) => void;
  onMoveToCart: (item: WishlistItem) => void;
  onClear: () => void;
}

export const WishlistDrawer = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onMoveToCart,
  onClear,
}: WishlistDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md glass-panel z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-primary" />
                <h2 className="text-lg font-semibold">Wishlist ({items.length})</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Heart size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Your wishlist is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="bg-secondary/50 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          <span>{item.product.icon}</span>
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedColor.name}
                        </p>
                      </div>
                      <span className="text-primary font-bold">
                        ${item.totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => onMoveToCart(item)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm"
                      >
                        <ShoppingCart size={14} />
                        Move to Cart
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="p-2 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-border">
                <button
                  onClick={onClear}
                  className="w-full py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear Wishlist
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
