import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Star, DollarSign } from 'lucide-react';
import { CompareItem } from '@/hooks/useCompareStore';

interface ComparisonChartsProps {
  items: CompareItem[];
}

const chartColors = [
  'hsl(var(--primary))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
];

export const ComparisonCharts = ({ items }: ComparisonChartsProps) => {
  // Calculate max values for normalization
  const maxPrice = useMemo(() => 
    items.length > 0 ? Math.max(...items.map(i => i.totalPrice)) : 0, 
    [items]
  );

  // Extract numerical specs for comparison
  const specs = useMemo(() => {
    const allSpecs: { name: string; values: (number | null)[] }[] = [];
    
    // Price comparison
    allSpecs.push({
      name: 'Price',
      values: items.map(i => i.totalPrice),
    });
    
    // Rating comparison
    allSpecs.push({
      name: 'Rating',
      values: items.map(i => i.product.averageRating || 0),
    });
    
    // Extract storage/RAM values from variants
    const storageValues = items.map(item => {
      const storageVariant = item.product.variants.find(v => 
        v.name.toLowerCase().includes('storage')
      );
      if (storageVariant) {
        const selectedId = item.variants[storageVariant.id];
        const option = storageVariant.options.find(o => o.id === selectedId);
        if (option) {
          const match = option.label.match(/(\d+)/);
          if (match) {
            const num = parseInt(match[1]);
            // Normalize TB to GB
            if (option.label.includes('TB')) return num * 1000;
            return num;
          }
        }
      }
      return null;
    });
    
    if (storageValues.some(v => v !== null)) {
      allSpecs.push({
        name: 'Storage (GB)',
        values: storageValues,
      });
    }
    
    return allSpecs;
  }, [items]);

  if (items.length === 0) return null;

  const BarChart = ({ 
    label, 
    values, 
    unit = '',
    formatValue = (v: number) => v.toLocaleString(),
  }: { 
    label: string; 
    values: (number | null)[];
    unit?: string;
    formatValue?: (v: number) => string;
  }) => {
    const max = Math.max(...values.filter((v): v is number => v !== null));
    
    return (
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">{label}</h4>
        <div className="space-y-2">
          {items.map((item, index) => {
            const value = values[index];
            const percentage = value !== null ? (value / max) * 100 : 0;
            
            return (
              <div key={item.product.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="truncate max-w-[120px]">{item.product.name}</span>
                  <span className="font-medium">
                    {value !== null ? `${formatValue(value)}${unit}` : 'N/A'}
                  </span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: chartColors[index] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const RadarChart = () => {
    const categories = ['Price', 'Rating', 'Features', 'Value'];
    const centerX = 100;
    const centerY = 100;
    const radius = 70;
    
    // Calculate points for each product
    const getPoints = (item: CompareItem, index: number) => {
      const priceScore = 1 - (item.totalPrice / maxPrice); // Lower price = higher score
      const ratingScore = (item.product.averageRating || 0) / 5;
      const featureScore = item.product.variants.length / 5;
      const valueScore = ratingScore * priceScore;
      
      const scores = [priceScore, ratingScore, featureScore, valueScore];
      
      return scores.map((score, i) => {
        const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
        const x = centerX + radius * score * Math.cos(angle);
        const y = centerY + radius * score * Math.sin(angle);
        return { x, y };
      });
    };
    
    return (
      <div className="relative">
        <svg viewBox="0 0 200 200" className="w-full h-48">
          {/* Grid circles */}
          {[0.25, 0.5, 0.75, 1].map((scale, i) => (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={radius * scale}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.3}
            />
          ))}
          
          {/* Grid lines */}
          {categories.map((_, i) => {
            const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity={0.3}
              />
            );
          })}
          
          {/* Category labels */}
          {categories.map((cat, i) => {
            const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
            const x = centerX + (radius + 20) * Math.cos(angle);
            const y = centerY + (radius + 20) * Math.sin(angle);
            return (
              <text
                key={cat}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] fill-muted-foreground"
              >
                {cat}
              </text>
            );
          })}
          
          {/* Product areas */}
          {items.map((item, index) => {
            const points = getPoints(item, index);
            const pathData = points.map((p, i) => 
              `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
            ).join(' ') + ' Z';
            
            return (
              <motion.path
                key={item.product.id}
                d={pathData}
                fill={chartColors[index]}
                fillOpacity={0.2}
                stroke={chartColors[index]}
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 mt-2">
          {items.map((item, index) => (
            <div key={item.product.id} className="flex items-center gap-1.5 text-xs">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: chartColors[index] }}
              />
              <span className="truncate max-w-[80px]">{item.product.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-4 bg-secondary/20 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={20} className="text-primary" />
        <h3 className="font-semibold">Visual Comparison</h3>
      </div>
      
      {/* Radar/Spider Chart */}
      <div className="bg-background/50 rounded-xl p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
          <TrendingUp size={14} />
          Overall Comparison
        </h4>
        <RadarChart />
      </div>
      
      {/* Bar Charts */}
      <div className="grid gap-4">
        <div className="bg-background/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={14} className="text-primary" />
            <span className="text-sm font-medium">Price Comparison</span>
          </div>
          <BarChart 
            label="" 
            values={items.map(i => i.totalPrice)}
            formatValue={(v) => `$${v.toLocaleString()}`}
          />
        </div>
        
        <div className="bg-background/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Star size={14} className="text-primary" />
            <span className="text-sm font-medium">Rating Comparison</span>
          </div>
          <BarChart 
            label="" 
            values={items.map(i => i.product.averageRating || 0)}
            formatValue={(v) => v.toFixed(1)}
          />
        </div>
      </div>
    </div>
  );
};
