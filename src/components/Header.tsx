import { motion } from 'framer-motion';
import { ShoppingCart, GitCompare, Heart, Package, Sun, Moon, Menu } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  itemCount: number;
  compareCount: number;
  wishlistCount: number;
  orderCount: number;
  onCartClick: () => void;
  onCompareClick: () => void;
  onWishlistClick: () => void;
  onOrderHistoryClick: () => void;
  onMenuClick: () => void;
}

export const Header = ({
  theme,
  onToggleTheme,
  itemCount,
  compareCount,
  wishlistCount,
  orderCount,
  onCartClick,
  onCompareClick,
  onWishlistClick,
  onOrderHistoryClick,
  onMenuClick,
}: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 right-0 left-0 z-10 p-3 lg:p-4 flex items-center justify-between glass-panel border-b border-border"
      role="banner"
    >
      <div className="ml-14 lg:ml-80">
        <h1 className="text-lg lg:text-2xl font-display font-bold">
          <span className="glow-text">Virtual</span>{' '}
          <span className="text-foreground hidden sm:inline">Product Studio</span>
        </h1>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1.5 lg:gap-2">
        {/* Menu Button (Mobile) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMenuClick}
          className="p-2 lg:p-2.5 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={16} className="lg:w-[18px] lg:h-[18px]" />
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleTheme}
          className="p-2 lg:p-2.5 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun size={16} className="lg:w-[18px] lg:h-[18px]" />
          ) : (
            <Moon size={16} className="lg:w-[18px] lg:h-[18px]" />
          )}
        </motion.button>

        {/* Order History */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOrderHistoryClick}
          className="relative p-2 lg:p-2.5 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          aria-label="View order history"
        >
          <Package size={16} className="lg:w-[18px] lg:h-[18px]" />
          {orderCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center" aria-hidden="true">
              {orderCount}
            </span>
          )}
        </motion.button>

        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onWishlistClick}
          className="relative p-2 lg:p-2.5 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          aria-label="View wishlist"
        >
          <Heart size={16} className="lg:w-[18px] lg:h-[18px]" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center" aria-hidden="true">
              {wishlistCount}
            </span>
          )}
        </motion.button>

        {/* Compare */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCompareClick}
          className="relative p-2 lg:p-2.5 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          aria-label="Open comparison"
        >
          <GitCompare size={16} className="lg:w-[18px] lg:h-[18px]" />
          {compareCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center" aria-hidden="true">
              {compareCount}
            </span>
          )}
        </motion.button>

        {/* Cart */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCartClick}
          className="relative p-2 lg:p-2.5 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          aria-label="Open shopping cart"
        >
          <ShoppingCart size={16} className="lg:w-[18px] lg:h-[18px]" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center" aria-hidden="true">
              {itemCount}
            </span>
          )}
        </motion.button>
      </div>
    </motion.header>
  );
};
