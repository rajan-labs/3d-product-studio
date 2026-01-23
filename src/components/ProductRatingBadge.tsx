import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';

interface ProductRatingBadgeProps {
  rating: number;
  reviewCount: number;
  onClick?: () => void;
}

export const ProductRatingBadge = ({ rating, reviewCount, onClick }: ProductRatingBadgeProps) => {
  if (reviewCount === 0) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors"
      >
        <MessageSquare size={14} />
        <span>No reviews yet</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
    >
      <div className="flex items-center gap-1">
        <Star size={14} className="fill-yellow-400 text-yellow-400" />
        <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
      </div>
      <span className="text-sm text-muted-foreground">
        ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
      </span>
    </motion.button>
  );
};
