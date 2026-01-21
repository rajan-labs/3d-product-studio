import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { CompareItem } from '@/hooks/useCompareStore';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CompareItem[];
  onRemove: (productId: string) => void;
}

export const CompareModal = ({ isOpen, onClose, items, onRemove }: CompareModalProps) => {
  const allVariantNames = Array.from(
    new Set(items.flatMap(item => item.product.variants.map(v => v.name)))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-4 lg:inset-12 glass-panel z-50 rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-display font-bold">
                Compare Products <span className="text-primary">({items.length}/3)</span>
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Add products to compare (max 3)</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr>
                        <th className="text-left p-4 bg-secondary/30 rounded-tl-lg">Feature</th>
                        {items.map((item, index) => (
                          <th key={item.product.id} className={`text-center p-4 bg-secondary/30 ${index === items.length - 1 ? 'rounded-tr-lg' : ''}`}>
                            <div className="flex flex-col items-center gap-2">
                              <button
                                onClick={() => onRemove(item.product.id)}
                                className="absolute top-2 right-2 p-1 hover:bg-destructive/20 rounded text-destructive"
                              >
                                <X size={14} />
                              </button>
                              <span className="text-4xl">{item.product.icon}</span>
                              <span className="font-semibold">{item.product.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Price */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 text-muted-foreground">Price</td>
                        {items.map(item => (
                          <td key={item.product.id} className="p-4 text-center">
                            <span className="text-xl font-bold text-primary">
                              ${item.totalPrice.toLocaleString()}
                            </span>
                          </td>
                        ))}
                      </tr>
                      
                      {/* Color */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 text-muted-foreground">Color</td>
                        {items.map(item => (
                          <td key={item.product.id} className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span 
                                className="w-4 h-4 rounded-full border border-border"
                                style={{ backgroundColor: item.color.hex }}
                              />
                              {item.color.name}
                            </div>
                          </td>
                        ))}
                      </tr>
                      
                      {/* Variants */}
                      {allVariantNames.map(variantName => (
                        <tr key={variantName} className="border-b border-border/50">
                          <td className="p-4 text-muted-foreground">{variantName}</td>
                          {items.map(item => {
                            const variant = item.product.variants.find(v => v.name === variantName);
                            const selectedOptionId = variant ? item.variants[variant.id] : null;
                            const option = variant?.options.find(o => o.id === selectedOptionId);
                            
                            return (
                              <td key={item.product.id} className="p-4 text-center">
                                {option ? (
                                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                    {option.label}
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
