import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Product } from '@/types/product';

interface AdvancedFiltersProps {
  products: Product[];
  onFilter: (filtered: Product[]) => void;
}

interface FilterState {
  priceRange: [number, number];
  selectedBrands: string[];
  selectedDeviceTypes: string[];
  minRating: number;
}

export const AdvancedFilters = ({ products, onFilter }: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('price');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    selectedBrands: [],
    selectedDeviceTypes: [],
    minRating: 0,
  });

  // Get unique values for filters
  const brands = useMemo(() => 
    Array.from(new Set(products.map(p => p.brandName))).sort(),
    [products]
  );

  const deviceTypes = useMemo(() => 
    Array.from(new Set(products.map(p => p.deviceType))).sort(),
    [products]
  );

  const priceStats = useMemo(() => ({
    min: Math.min(...products.map(p => p.basePrice)),
    max: Math.max(...products.map(p => p.basePrice)),
  }), [products]);

  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    
    let filtered = [...products];
    
    // Price filter
    filtered = filtered.filter(
      p => p.basePrice >= newFilters.priceRange[0] && p.basePrice <= newFilters.priceRange[1]
    );
    
    // Brand filter
    if (newFilters.selectedBrands.length > 0) {
      filtered = filtered.filter(p => newFilters.selectedBrands.includes(p.brandName));
    }
    
    // Device type filter
    if (newFilters.selectedDeviceTypes.length > 0) {
      filtered = filtered.filter(p => newFilters.selectedDeviceTypes.includes(p.deviceType));
    }
    
    // Rating filter
    if (newFilters.minRating > 0) {
      filtered = filtered.filter(p => (p.averageRating || 0) >= newFilters.minRating);
    }
    
    onFilter(filtered);
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter(b => b !== brand)
      : [...filters.selectedBrands, brand];
    applyFilters({ ...filters, selectedBrands: newBrands });
  };

  const toggleDeviceType = (type: string) => {
    const newTypes = filters.selectedDeviceTypes.includes(type)
      ? filters.selectedDeviceTypes.filter(t => t !== type)
      : [...filters.selectedDeviceTypes, type];
    applyFilters({ ...filters, selectedDeviceTypes: newTypes });
  };

  const clearFilters = () => {
    const resetFilters: FilterState = {
      priceRange: [priceStats.min, priceStats.max],
      selectedBrands: [],
      selectedDeviceTypes: [],
      minRating: 0,
    };
    applyFilters(resetFilters);
  };

  const activeFilterCount = 
    (filters.selectedBrands.length > 0 ? 1 : 0) +
    (filters.selectedDeviceTypes.length > 0 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.priceRange[0] > priceStats.min || filters.priceRange[1] < priceStats.max ? 1 : 0);

  const FilterSection = ({ 
    id, 
    title, 
    children 
  }: { 
    id: string; 
    title: string; 
    children: React.ReactNode;
  }) => (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
        className="w-full flex items-center justify-between p-3 hover:bg-secondary/30 transition-colors"
      >
        <span className="text-sm font-medium">{title}</span>
        {expandedSection === id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      <AnimatePresence>
        {expandedSection === id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
          isOpen || activeFilterCount > 0
            ? 'bg-primary/10 text-primary border border-primary/30'
            : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
        }`}
      >
        <SlidersHorizontal size={14} />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-72 bg-background border border-border rounded-xl shadow-xl z-30 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-border bg-secondary/30">
              <span className="font-semibold text-sm">Filters</span>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-secondary rounded">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Price Range */}
            <FilterSection id="price" title="Price Range">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>${filters.priceRange[0].toLocaleString()}</span>
                  <span>${filters.priceRange[1].toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min={priceStats.min}
                    max={priceStats.max}
                    step="100"
                    value={filters.priceRange[0]}
                    onChange={(e) => applyFilters({
                      ...filters,
                      priceRange: [Number(e.target.value), filters.priceRange[1]]
                    })}
                    className="flex-1 accent-primary"
                  />
                  <input
                    type="range"
                    min={priceStats.min}
                    max={priceStats.max}
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => applyFilters({
                      ...filters,
                      priceRange: [filters.priceRange[0], Number(e.target.value)]
                    })}
                    className="flex-1 accent-primary"
                  />
                </div>
              </div>
            </FilterSection>

            {/* Brands */}
            <FilterSection id="brands" title="Brands">
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                      filters.selectedBrands.includes(brand)
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-secondary/50'
                    }`}
                  >
                    <span>{brand}</span>
                    {filters.selectedBrands.includes(brand) && <Check size={14} />}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Device Types */}
            <FilterSection id="types" title="Device Types">
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {deviceTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleDeviceType(type)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors capitalize ${
                      filters.selectedDeviceTypes.includes(type)
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-secondary/50'
                    }`}
                  >
                    <span>{type.replace('-', ' ')}</span>
                    {filters.selectedDeviceTypes.includes(type) && <Check size={14} />}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Rating */}
            <FilterSection id="rating" title="Minimum Rating">
              <div className="flex gap-1">
                {[0, 3, 3.5, 4, 4.5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => applyFilters({ ...filters, minRating: rating })}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                      filters.minRating === rating
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    {rating === 0 ? 'All' : `${rating}+`}
                  </button>
                ))}
              </div>
            </FilterSection>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
