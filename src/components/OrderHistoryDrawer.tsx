import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Clock, CheckCircle, Truck } from 'lucide-react';
import { OrderItem } from '@/hooks/useOrderHistory';
import { getDeviceTypeIcon } from '@/data/categories';

interface OrderHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderItem[];
}

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
};

const statusColors = {
  pending: 'text-yellow-500',
  processing: 'text-blue-500',
  shipped: 'text-purple-500',
  delivered: 'text-green-500',
};

export const OrderHistoryDrawer = ({
  isOpen,
  onClose,
  orders,
}: OrderHistoryDrawerProps) => {
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
                <Package size={20} className="text-primary" />
                <h2 className="text-lg font-semibold">Order History ({orders.length})</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Orders */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {orders.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Package size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No orders yet</p>
                </div>
              ) : (
                orders.map((order) => {
                  const StatusIcon = statusIcons[order.status];
                  const Icon = getDeviceTypeIcon(order.product.deviceType);
                  return (
                    <motion.div
                      key={order.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-secondary/50 rounded-xl p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon size={18} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{order.product.name}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {order.id}
                            </p>
                          </div>
                        </div>
                        <span className="text-primary font-bold">
                          ${order.totalPrice.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {new Date(order.orderedAt).toLocaleDateString()}
                        </span>
                        <span className={`flex items-center gap-1 ${statusColors[order.status]}`}>
                          <StatusIcon size={14} />
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">
                          {order.selectedColor.name} • {Object.keys(order.selectedVariants).length} variants
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
