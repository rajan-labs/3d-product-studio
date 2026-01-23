import { ProductReview } from '@/types/product';

// Pre-defined reviews for products
export const productReviews: Record<string, ProductReview[]> = {
  'mobile-quantum-pro': [
    {
      id: 'r1',
      userId: 'u1',
      userName: 'Michael Chen',
      rating: 5,
      title: 'Best phone I have ever used',
      comment: 'The holographic display is absolutely stunning. Battery life exceeds expectations and the camera quality is professional grade.',
      date: '2025-12-15',
      verified: true,
      helpful: 124,
    },
    {
      id: 'r2',
      userId: 'u2',
      userName: 'Sarah Williams',
      rating: 4,
      title: 'Great but pricey',
      comment: 'Amazing features and build quality. Only downside is the premium price point, but you get what you pay for.',
      date: '2025-12-10',
      verified: true,
      helpful: 89,
    },
    {
      id: 'r3',
      userId: 'u3',
      userName: 'James Rodriguez',
      rating: 5,
      title: 'Revolutionary device',
      comment: 'This phone has changed how I work and communicate. The 200MP camera is incredible for content creation.',
      date: '2025-11-28',
      verified: true,
      helpful: 67,
    },
  ],
  'laptop-novapro-ultra': [
    {
      id: 'r4',
      userId: 'u4',
      userName: 'Emily Zhang',
      rating: 5,
      title: 'Perfect for professionals',
      comment: 'Ultra-thin yet powerful. Runs all my design software flawlessly. The display is color-accurate and gorgeous.',
      date: '2025-12-20',
      verified: true,
      helpful: 156,
    },
    {
      id: 'r5',
      userId: 'u5',
      userName: 'David Park',
      rating: 4,
      title: 'Impressive performance',
      comment: 'Great laptop for development work. Battery lasts all day. Would love more ports though.',
      date: '2025-12-05',
      verified: true,
      helpful: 78,
    },
  ],
  'watch-pulse-ultra': [
    {
      id: 'r6',
      userId: 'u6',
      userName: 'Anna Thompson',
      rating: 5,
      title: 'Life-changing fitness tracker',
      comment: 'The health monitoring features are incredibly accurate. It literally saved my life by detecting an irregular heartbeat.',
      date: '2025-12-18',
      verified: true,
      helpful: 234,
    },
    {
      id: 'r7',
      userId: 'u7',
      userName: 'Robert Kim',
      rating: 5,
      title: 'Best smartwatch on the market',
      comment: 'Beautiful design, amazing battery life, and the titanium strap is worth every penny.',
      date: '2025-12-12',
      verified: true,
      helpful: 145,
    },
  ],
};

export const getReviewsForProduct = (productId: string): ProductReview[] => {
  return productReviews[productId] || [];
};

export const getAverageRating = (productId: string): number => {
  const reviews = getReviewsForProduct(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export const getReviewCount = (productId: string): number => {
  return getReviewsForProduct(productId).length;
};
