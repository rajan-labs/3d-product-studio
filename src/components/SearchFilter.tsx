import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Product } from '@/types/product';

interface SearchFilterProps {
  products: Product[];
  onFilter: (filtered: Product[]) => void;
  onSearch: (query: string) => void;
}

export const SearchFilter = ({ products, onFilter, onSearch }: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
    
    if (query.trim() === '') {
      onFilter(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    onFilter(filtered);
  };

  const handlePriceFilter = (min: number, max: number) => {
    setPriceRange([min, max]);
    const filtered = products.filter(
      (product) => product.basePrice >= min && product.basePrice <= max
    );
    onFilter(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 10000]);
    onFilter(products);
    onSearch('');
  };

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-9 pr-10 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <SlidersHorizontal size={14} />
        Filters
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 bg-secondary/30 rounded-lg space-y-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceFilter(Number(e.target.value), priceRange[1])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceFilter(priceRange[0], Number(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="text-xs text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
