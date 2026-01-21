import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/hooks/useCartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  cartTotal: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  cartTotal,
  onUpdateQuantity,
  onRemove,
  onClear
}: CartDrawerProps) => {
  const handleCheckout = () => {
    console.log('🛒 Checkout:', { items, total: cartTotal });
    alert(`Checkout initiated!\nItems: ${items.length}\nTotal: $${cartTotal.toLocaleString()}`);
  };

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md glass-panel z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-primary" size={24} />
                <h2 className="text-xl font-display font-bold">Your Cart</h2>
                <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-sm">
                  {items.length}
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="glass-panel p-4 rounded-xl"
                  >
                    <div className="flex gap-4">
                      <div 
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl"
                        style={{ backgroundColor: `${item.color.hex}20` }}
                      >
                        {item.product.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.color.name}</p>
                        <p className="text-primary font-semibold mt-1">
                          ${item.totalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-muted-foreground">Total</span>
                  <span className="text-2xl font-display font-bold text-primary">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="order-button w-full"
                >
                  Checkout
                </motion.button>
                <button
                  onClick={onClear}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
