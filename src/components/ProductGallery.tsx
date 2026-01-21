import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ZoomIn, Layers, Eye, LucideIcon } from 'lucide-react';

interface ViewAngle {
  id: string;
  label: string;
  icon: LucideIcon;
  position: [number, number, number];
  target: [number, number, number];
}

const viewAngles: ViewAngle[] = [
  { id: 'front', label: 'Front', icon: Eye, position: [0, 0, 6], target: [0, 0, 0] },
  { id: 'side', label: 'Side', icon: Layers, position: [6, 0, 0], target: [0, 0, 0] },
  { id: 'top', label: 'Top', icon: ZoomIn, position: [0, 6, 0], target: [0, 0, 0] },
  { id: 'back', label: 'Back', icon: RotateCcw, position: [0, 0, -6], target: [0, 0, 0] },
];

interface ProductGalleryProps {
  productName: string;
  colorName: string;
  selectedView: string;
  onViewChange: (viewId: string, position: [number, number, number], target: [number, number, number]) => void;
}

export const ProductGallery = ({ productName, colorName, selectedView, onViewChange }: ProductGalleryProps) => {
  const currentView = viewAngles.find(v => v.id === selectedView) || viewAngles[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-4 rounded-xl"
    >
      <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Quick Views</h4>
      
      <div className="flex gap-2">
        {viewAngles.map((angle) => {
          const Icon = angle.icon;
          return (
            <motion.button
              key={angle.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewChange(angle.id, angle.position, angle.target)}
              className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                selectedView === angle.id
                  ? 'bg-primary/20 text-primary border border-primary/50'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
              }`}
            >
              <Icon size={16} />
              <span className="text-xs">{angle.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedView}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="mt-3 p-3 bg-secondary/30 rounded-lg"
        >
          <p className="text-xs text-center text-muted-foreground">
            <span className="text-foreground font-medium">{productName}</span>
            <br />
            {colorName} • {currentView.label} View
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
