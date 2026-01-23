import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, CheckCircle, X } from 'lucide-react';
import { ProductReview } from '@/types/product';
import { useState } from 'react';

interface ProductReviewsProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  reviews: ProductReview[];
  averageRating: number;
}

const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}
        />
      ))}
    </div>
  );
};

const RatingBreakdown = ({ reviews }: { reviews: ProductReview[] }) => {
  const breakdown = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100 : 0,
  }));

  return (
    <div className="space-y-2">
      {breakdown.map(({ rating, count, percentage }) => (
        <div key={rating} className="flex items-center gap-3 text-sm">
          <span className="w-12 text-muted-foreground">{rating} star</span>
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, delay: rating * 0.1 }}
              className="h-full bg-yellow-400 rounded-full"
            />
          </div>
          <span className="w-8 text-right text-muted-foreground">{count}</span>
        </div>
      ))}
    </div>
  );
};

export const ProductReviews = ({ isOpen, onClose, productName, reviews, averageRating }: ProductReviewsProps) => {
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('helpful');

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 lg:inset-[10%] z-50 glass-panel rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 lg:p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl lg:text-2xl font-display font-bold">Customer Reviews</h2>
                <p className="text-sm text-muted-foreground">{productName}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
              {reviews.length > 0 ? (
                <div className="grid lg:grid-cols-[300px_1fr] gap-6">
                  {/* Summary */}
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/30 rounded-xl text-center">
                      <div className="text-4xl font-bold text-primary mb-1">{averageRating}</div>
                      <StarRating rating={Math.round(averageRating)} size={20} />
                      <p className="text-sm text-muted-foreground mt-2">
                        Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                      </p>
                    </div>

                    <RatingBreakdown reviews={reviews} />
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {/* Sort */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortBy('helpful')}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          sortBy === 'helpful' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                        }`}
                      >
                        Most Helpful
                      </button>
                      <button
                        onClick={() => setSortBy('recent')}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          sortBy === 'recent' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                        }`}
                      >
                        Most Recent
                      </button>
                    </div>

                    {/* Individual Reviews */}
                    {sortedReviews.map((review) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-secondary/20 rounded-xl space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{review.userName}</span>
                              {review.verified && (
                                <span className="flex items-center gap-1 text-xs text-green-500">
                                  <CheckCircle size={12} />
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <StarRating rating={review.rating} size={14} />
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          </div>
                        </div>

                        <h4 className="font-medium">{review.title}</h4>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <ThumbsUp size={14} />
                          <span>{review.helpful} found this helpful</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                  <p className="text-muted-foreground">Be the first to review this product!</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
